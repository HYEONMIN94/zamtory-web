/**
 * API 요청/응답 타입
 */

import type { User, Content } from '../models'

// Auth
export interface SignInRequest {
  email: string
  password: string
}

export interface SignInResponse {
  accessToken: string
  refreshToken: string
  user: User
}

export interface SignUpRequest {
  email: string
  password: string
  username: string
}

export interface SignUpResponse {
  user: User
}

// Content
export interface CreateContentRequest {
  title: string
  body: string
}

export interface UpdateContentRequest {
  title?: string
  body?: string
  status?: Content['status']
}

export interface ContentResponse {
  content: Content
}

export interface ContentListResponse {
  contents: Content[]
  total: number
  page: number
  pageSize: number
}
