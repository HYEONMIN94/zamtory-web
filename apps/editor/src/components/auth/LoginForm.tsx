'use client'

import { useState, type FormEvent } from 'react'
import { Button } from '@zamtory/ui'
import { useAuth } from '@/hooks/useAuth'
import { isValidEmail, isValidPassword } from '@/lib/auth'
import type { User } from '@zamtory/types'

interface LoginFormProps {
  onSuccess?: (user: User) => void
  onError?: (error: Error) => void
  redirectTo?: string
}

export function LoginForm({ onSuccess, onError }: LoginFormProps) {
  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [emailError, setEmailError] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setEmailError(null)
    setPasswordError(null)

    // 유효성 검증
    let hasError = false

    if (!email) {
      setEmailError('이메일을 입력해주세요.')
      hasError = true
    } else if (!isValidEmail(email)) {
      setEmailError('유효한 이메일 주소를 입력해주세요.')
      hasError = true
    }

    if (!password) {
      setPasswordError('비밀번호를 입력해주세요.')
      hasError = true
    } else if (!isValidPassword(password)) {
      setPasswordError('비밀번호는 최소 8자 이상이어야 합니다.')
      hasError = true
    }

    if (hasError) return

    try {
      setIsLoading(true)
      await login({ email, password, rememberMe })
      onSuccess?.({ id: '', email, username: '', createdAt: '', updatedAt: '' })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '로그인에 실패했습니다.'
      setError(errorMessage)
      onError?.(err instanceof Error ? err : new Error(errorMessage))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* 이메일 입력 */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          이메일
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          className={`
            w-full px-3 py-2 border rounded-md shadow-sm
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
            disabled:bg-gray-100 disabled:cursor-not-allowed
            ${emailError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}
          `}
          placeholder="your@email.com"
          autoComplete="email"
        />
        {emailError && <p className="mt-1 text-sm text-red-600">{emailError}</p>}
      </div>

      {/* 비밀번호 입력 */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          비밀번호
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          className={`
            w-full px-3 py-2 border rounded-md shadow-sm
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
            disabled:bg-gray-100 disabled:cursor-not-allowed
            ${passwordError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}
          `}
          placeholder="••••••••"
          autoComplete="current-password"
        />
        {passwordError && <p className="mt-1 text-sm text-red-600">{passwordError}</p>}
      </div>

      {/* 로그인 유지 */}
      <div className="flex items-center">
        <input
          id="rememberMe"
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          disabled={isLoading}
          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
        />
        <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
          로그인 유지
        </label>
      </div>

      {/* 에러 메시지 */}
      {error && (
        <div className="p-3 rounded-md bg-red-50 border border-red-200">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* 로그인 버튼 */}
      <Button type="submit" variant="primary" size="md" fullWidth disabled={isLoading}>
        {isLoading ? '로그인 중...' : '로그인'}
      </Button>

      {/* 추가 링크 */}
      <div className="flex justify-center items-center gap-4 text-sm text-gray-600">
        <button type="button" className="hover:text-primary-600 transition-colors">
          비밀번호 찾기
        </button>
        <span className="text-gray-300">|</span>
        <button type="button" className="hover:text-primary-600 transition-colors">
          회원가입
        </button>
      </div>
    </form>
  )
}
