'use client'

import { LoginForm } from '@/components/auth/LoginForm'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* 로고/타이틀 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Zamtory Editor</h1>
          <p className="text-gray-600">AI 인터랙티브 스토리 제작 도구</p>
        </div>

        {/* 로그인 카드 */}
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">로그인</h2>
          <LoginForm />
        </div>

        {/* 푸터 텍스트 */}
        <p className="text-center text-sm text-gray-500 mt-8">
          © 2025 Zamtory. All rights reserved.
        </p>
      </div>
    </div>
  )
}
