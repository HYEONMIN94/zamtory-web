'use client'

import { createContext, useCallback, useEffect, useState, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { createApiClient } from '@zamtory/api-client'
import type { User, LoginCredentials, LoginResponse } from '@zamtory/types'
import { saveTokens, getAccessToken, getRefreshToken, clearTokens, saveUser, getUser } from '@/lib/auth'

interface AuthContextValue {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => Promise<void>
  refreshToken: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // API 클라이언트 초기화
  const apiClient = createApiClient({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  })

  /**
   * 초기 인증 상태 확인
   */
  const checkAuth = useCallback(async () => {
    try {
      const accessToken = getAccessToken()
      const storedUser = getUser<User>()

      if (accessToken && storedUser) {
        apiClient.setAccessToken(accessToken)
        setUser(storedUser)
      } else if (getRefreshToken()) {
        // Refresh token이 있으면 토큰 갱신 시도
        await refreshTokenInternal()
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      clearTokens()
    } finally {
      setIsLoading(false)
    }
  }, [])

  /**
   * 로그인
   */
  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true)

      const response = await apiClient.post<LoginResponse>('/auth/login', credentials)

      // 토큰 및 사용자 정보 저장
      saveTokens(response.accessToken, response.refreshToken, credentials.rememberMe)
      saveUser(response.user, credentials.rememberMe)
      apiClient.setAccessToken(response.accessToken)

      setUser(response.user)
      router.push('/')
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [router])

  /**
   * 로그아웃
   */
  const logout = useCallback(async () => {
    try {
      await apiClient.post('/auth/logout')
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
      clearTokens()
      setUser(null)
      apiClient.setAccessToken(null)
      router.push('/login')
    }
  }, [router])

  /**
   * 토큰 갱신 (내부 함수)
   */
  const refreshTokenInternal = useCallback(async () => {
    try {
      const refreshToken = getRefreshToken()
      if (!refreshToken) {
        throw new Error('No refresh token')
      }

      const response = await apiClient.post<{ accessToken: string; expiresIn: number }>('/auth/refresh', {
        refreshToken,
      })

      saveTokens(response.accessToken, refreshToken, true)
      apiClient.setAccessToken(response.accessToken)

      // 사용자 정보 재조회
      const userResponse = await apiClient.get<{ user: User }>('/auth/me')
      setUser(userResponse.user)
      saveUser(userResponse.user, true)
    } catch (error) {
      console.error('Token refresh failed:', error)
      clearTokens()
      setUser(null)
      throw error
    }
  }, [])

  /**
   * 토큰 갱신 (외부 호출용)
   */
  const refreshToken = useCallback(async () => {
    await refreshTokenInternal()
  }, [refreshTokenInternal])

  /**
   * 초기 인증 상태 확인
   */
  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  /**
   * 자동 토큰 갱신 (5분마다)
   */
  useEffect(() => {
    if (!user) return

    const interval = setInterval(() => {
      refreshTokenInternal().catch((error) => {
        console.error('Auto refresh failed:', error)
      })
    }, 5 * 60 * 1000) // 5분

    return () => clearInterval(interval)
  }, [user, refreshTokenInternal])

  const value: AuthContextValue = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    refreshToken,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
