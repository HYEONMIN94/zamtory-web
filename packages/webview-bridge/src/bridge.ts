/**
 * 웹뷰 네이티브 브릿지
 */

import type {
  NativeMessage,
  WebMessage,
  NativeMessageType,
  CameraOptions,
  ShareOptions,
  DeviceInfo
} from './types'

declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage: (message: string) => void
    }
    webkit?: {
      messageHandlers?: {
        nativeHandler?: {
          postMessage: (message: unknown) => void
        }
      }
    }
    Android?: {
      postMessage: (message: string) => void
    }
  }
}

export class WebViewBridge {
  private messageId = 0
  private callbacks = new Map<string, (data: unknown) => void>()

  constructor() {
    // 네이티브로부터 메시지 수신
    if (typeof window !== 'undefined') {
      window.addEventListener('message', this.handleNativeMessage.bind(this))
    }
  }

  private handleNativeMessage(event: MessageEvent) {
    try {
      const message = JSON.parse(event.data) as NativeMessage
      const callback = this.callbacks.get(message.id || '')
      if (callback) {
        callback(message.payload)
        this.callbacks.delete(message.id || '')
      }
    } catch (error) {
      console.error('Failed to parse native message:', error)
    }
  }

  private sendToNative<T>(type: NativeMessageType, payload?: T): Promise<unknown> {
    return new Promise((resolve, reject) => {
      const id = `msg_${++this.messageId}`
      const message: NativeMessage<T> = { type, payload, id }

      this.callbacks.set(id, resolve)

      // Timeout after 30s
      setTimeout(() => {
        if (this.callbacks.has(id)) {
          this.callbacks.delete(id)
          reject(new Error('Native call timeout'))
        }
      }, 30000)

      const messageStr = JSON.stringify(message)

      // React Native WebView
      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(messageStr)
      }
      // iOS WKWebView
      else if (window.webkit?.messageHandlers?.nativeHandler) {
        window.webkit.messageHandlers.nativeHandler.postMessage(message)
      }
      // Android WebView
      else if (window.Android) {
        window.Android.postMessage(messageStr)
      }
      // Fallback for web
      else {
        console.warn('No native bridge available')
        reject(new Error('No native bridge'))
      }
    })
  }

  async openCamera(options?: CameraOptions): Promise<string> {
    const result = await this.sendToNative('OPEN_CAMERA', options)
    return result as string
  }

  async pickImage(): Promise<string> {
    const result = await this.sendToNative('PICK_IMAGE')
    return result as string
  }

  async share(options: ShareOptions): Promise<void> {
    await this.sendToNative('SHARE', options)
  }

  async openExternalBrowser(url: string): Promise<void> {
    await this.sendToNative('OPEN_EXTERNAL_BROWSER', { url })
  }

  async getDeviceInfo(): Promise<DeviceInfo> {
    const result = await this.sendToNative('GET_DEVICE_INFO')
    return result as DeviceInfo
  }

  sendWebMessage<T>(type: WebMessage['type'], payload?: T) {
    const message: WebMessage<T> = { type, payload }
    this.sendToNative(message.type as NativeMessageType, payload)
  }

  isNativeApp(): boolean {
    return !!(
      window.ReactNativeWebView ||
      window.webkit?.messageHandlers?.nativeHandler ||
      window.Android
    )
  }
}

let bridgeInstance: WebViewBridge | null = null

export function getWebViewBridge(): WebViewBridge {
  if (!bridgeInstance) {
    bridgeInstance = new WebViewBridge()
  }
  return bridgeInstance
}
