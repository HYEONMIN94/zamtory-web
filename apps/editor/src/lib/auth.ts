/**
 * 인증 관련 유틸리티 함수
 */

const ACCESS_TOKEN_KEY = 'zamtory_access_token'
const REFRESH_TOKEN_KEY = 'zamtory_refresh_token'
const USER_KEY = 'zamtory_user'

/**
 * 토큰 저장
 */
export function saveTokens(accessToken: string, refreshToken: string, rememberMe: boolean = false) {
  // Access token은 항상 sessionStorage (보안)
  sessionStorage.setItem(ACCESS_TOKEN_KEY, accessToken)

  // Refresh token은 rememberMe 여부에 따라 저장소 선택
  if (rememberMe) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
  } else {
    sessionStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
  }
}

/**
 * Access token 가져오기
 */
export function getAccessToken(): string | null {
  return sessionStorage.getItem(ACCESS_TOKEN_KEY)
}

/**
 * Refresh token 가져오기
 */
export function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_TOKEN_KEY) || sessionStorage.getItem(REFRESH_TOKEN_KEY)
}

/**
 * 토큰 제거
 */
export function clearTokens() {
  sessionStorage.removeItem(ACCESS_TOKEN_KEY)
  sessionStorage.removeItem(REFRESH_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
  sessionStorage.removeItem(USER_KEY)
  localStorage.removeItem(USER_KEY)
}

/**
 * 사용자 정보 저장
 */
export function saveUser(user: unknown, rememberMe: boolean = false) {
  const userJson = JSON.stringify(user)
  if (rememberMe) {
    localStorage.setItem(USER_KEY, userJson)
  } else {
    sessionStorage.setItem(USER_KEY, userJson)
  }
}

/**
 * 사용자 정보 가져오기
 */
export function getUser<T>(): T | null {
  const userJson = localStorage.getItem(USER_KEY) || sessionStorage.getItem(USER_KEY)
  if (!userJson) return null

  try {
    return JSON.parse(userJson) as T
  } catch {
    return null
  }
}

/**
 * 이메일 유효성 검사
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * 비밀번호 유효성 검사
 */
export function isValidPassword(password: string): boolean {
  return password.length >= 8
}
