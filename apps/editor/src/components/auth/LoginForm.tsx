'use client'

import { useState, type FormEvent } from 'react'
import { Button } from '@zamtory/ui'
import { useAuth } from '@/hooks/useAuth'
import { isValidEmail, isValidPassword } from '@/lib/auth'

interface LoginFormProps {
  onSuccess?: () => void
  onError?: (error: Error) => void
}

interface FormErrors {
  email: string | null
  password: string | null
  general: string | null
}

export function LoginForm({ onSuccess, onError }: LoginFormProps) {
  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({
    email: null,
    password: null,
    general: null,
  })

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      email: null,
      password: null,
      general: null,
    }

    if (!email) {
      newErrors.email = '이메일을 입력해주세요.'
    } else if (!isValidEmail(email)) {
      newErrors.email = '유효한 이메일 주소를 입력해주세요.'
    }

    if (!password) {
      newErrors.password = '비밀번호를 입력해주세요.'
    } else if (!isValidPassword(password)) {
      newErrors.password = '비밀번호는 최소 8자 이상이어야 합니다.'
    }

    setErrors(newErrors)
    return !newErrors.email && !newErrors.password
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      setIsLoading(true)
      await login({ email, password, rememberMe })
      onSuccess?.()
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '로그인에 실패했습니다.'
      setErrors((prev) => ({ ...prev, general: errorMessage }))
      onError?.(err instanceof Error ? err : new Error(errorMessage))
    } finally {
      setIsLoading(false)
    }
  }

  const inputClassName = (hasError: boolean) =>
    `w-full px-3 py-2 border rounded-md shadow-sm
     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
     disabled:bg-gray-100 disabled:cursor-not-allowed
     ${hasError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}`

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
          className={inputClassName(!!errors.email)}
          placeholder="your@email.com"
          autoComplete="email"
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
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
          className={inputClassName(!!errors.password)}
          placeholder="••••••••"
          autoComplete="current-password"
        />
        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
      </div>

      {/* 로그인 유지 */}
      <div className="flex items-center">
        <input
          id="rememberMe"
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          disabled={isLoading}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
          로그인 유지
        </label>
      </div>

      {/* 에러 메시지 */}
      {errors.general && (
        <div className="p-3 rounded-md bg-red-50 border border-red-200">
          <p className="text-sm text-red-600">{errors.general}</p>
        </div>
      )}

      {/* 로그인 버튼 */}
      <Button type="submit" variant="primary" size="md" fullWidth disabled={isLoading}>
        {isLoading ? '로그인 중...' : '로그인'}
      </Button>

      {/* 추가 링크 */}
      <div className="flex justify-center items-center gap-4 text-sm text-gray-600">
        <button type="button" className="hover:text-blue-600 transition-colors">
          비밀번호 찾기
        </button>
        <span className="text-gray-300">|</span>
        <button type="button" className="hover:text-blue-600 transition-colors">
          회원가입
        </button>
      </div>
    </form>
  )
}
