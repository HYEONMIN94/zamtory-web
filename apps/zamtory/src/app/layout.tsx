import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Zamtory - AI 인터랙티브 스토리',
  description: '잼토리 - AI가 만드는 나만의 인터랙티브 스토리 경험',
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
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body style={{ margin: 0, fontFamily: 'Pretendard Variable, -apple-system, sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
