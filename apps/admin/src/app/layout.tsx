import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Zamtory Admin - 관리자 대시보드',
  description: '잼토리 관리자 시스템 - 콘텐츠 및 사용자 관리',
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
