/**
 * 공통 유틸리티 타입
 */

export type AsyncState<T> = {
  data: T | null
  loading: boolean
  error: Error | null
}

export type PaginatedResponse<T> = {
  data: T[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}

export type ID = string | number

export type Timestamp = string // ISO 8601 format
