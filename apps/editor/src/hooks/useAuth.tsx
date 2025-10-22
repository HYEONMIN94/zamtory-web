'use client'

import { useContext } from 'react'
import { AuthContext, type AuthContextValue } from '@/contexts/AuthContext'

/**
 * 인증 훅
 * AuthContext를 사용하기 위한 커스텀 훅
 */
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
