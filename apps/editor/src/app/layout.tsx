import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Zamtory Editor - AI 인터랙티브 스토리 에디터',
  description: '잼토리 스토리 제작 도구 - AI 기반 노드 비주얼 에디터',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
      </head>
      <body style={{ margin: 0, fontFamily: 'Pretendard Variable, -apple-system, sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
