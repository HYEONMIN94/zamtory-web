/**
 * 웹뷰 브릿지 메시지 타입
 */

export type NativeMessageType =
  | 'OPEN_CAMERA'
  | 'PICK_IMAGE'
  | 'SHARE'
  | 'OPEN_EXTERNAL_BROWSER'
  | 'REQUEST_PERMISSION'
  | 'GET_DEVICE_INFO'

export type WebMessageType =
  | 'READY'
  | 'NAVIGATION'
  | 'ERROR'

export interface NativeMessage<T = unknown> {
  type: NativeMessageType
  payload?: T
  id?: string
}

export interface WebMessage<T = unknown> {
  type: WebMessageType
  payload?: T
  id?: string
}

export interface CameraOptions {
  quality?: number
  allowsEditing?: boolean
}

export interface ShareOptions {
  title?: string
  message: string
  url?: string
}

export interface DeviceInfo {
  platform: 'ios' | 'android' | 'web'
  version: string
  model?: string
}
