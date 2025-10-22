'use client'

import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { createApiClient, type ApiClient } from '@zamtory/api-client'
import type { User, LoginCredentials, LoginResponse } from '@zamtory/types'
import { saveTokens, getAccessToken, getRefreshToken, clearTokens, saveUser, getUser } from '@/lib/auth'

export interface AuthContextValue {
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

const TOKEN_REFRESH_INTERVAL = 5 * 60 * 1000 // 5분

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // API 클라이언트를 useMemo로 메모이제이션
  const apiClient = useMemo<ApiClient>(
    () =>
      createApiClient({
        baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
      }),
    []
  )

  /**
   * 토큰 갱신 (내부 함수)
   */
  const refreshTokenInternal = useCallback(async () => {
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
  }, [apiClient])

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
        await refreshTokenInternal()
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      clearTokens()
    } finally {
      setIsLoading(false)
    }
  }, [apiClient, refreshTokenInternal])

  /**
   * 로그인
   */
  const login = useCallback(
    async (credentials: LoginCredentials) => {
      try {
        setIsLoading(true)

        // Mock 로그인 (서버 연결 전까지 사용)
        // TODO: 백엔드 API 연동 시 아래 코드로 교체
        const mockUser: User = {
          id: 'mock-user-1',
          email: credentials.email,
          username: credentials.email.split('@')[0],
          displayName: credentials.email.split('@')[0],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }

        const mockTokens = {
          accessToken: 'mock-access-token',
          refreshToken: 'mock-refresh-token',
        }

        // 토큰 및 사용자 정보 저장
        saveTokens(mockTokens.accessToken, mockTokens.refreshToken, credentials.rememberMe)
        saveUser(mockUser, credentials.rememberMe)
        apiClient.setAccessToken(mockTokens.accessToken)

        setUser(mockUser)

        // 약간의 지연으로 실제 로그인처럼 보이게
        await new Promise((resolve) => setTimeout(resolve, 500))

        router.push('/editor')

        /* 실제 API 연동 시 사용할 코드:
        const response = await apiClient.post<LoginResponse>('/auth/login', credentials)
        saveTokens(response.accessToken, response.refreshToken, credentials.rememberMe)
        saveUser(response.user, credentials.rememberMe)
        apiClient.setAccessToken(response.accessToken)
        setUser(response.user)
        router.push('/editor')
        */
      } catch (error) {
        console.error('Login failed:', error)
        throw error
      } finally {
        setIsLoading(false)
      }
    },
    [apiClient, router]
  )

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
  }, [apiClient, router])

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
   * 자동 토큰 갱신
   */
  useEffect(() => {
    if (!user) return

    const interval = setInterval(() => {
      refreshTokenInternal().catch((error) => {
        console.error('Auto refresh failed:', error)
      })
    }, TOKEN_REFRESH_INTERVAL)

    return () => clearInterval(interval)
  }, [user, refreshTokenInternal])

  const value: AuthContextValue = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout,
      refreshToken,
    }),
    [user, isLoading, login, logout, refreshToken]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
