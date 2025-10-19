/**
 * Domain 모델 타입
 */

import type { ID, Timestamp } from '../common'

export interface User {
  id: ID
  email: string
  username: string
  displayName?: string
  avatar?: string
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface Content {
  id: ID
  title: string
  body: string
  authorId: ID
  author?: User
  status: 'draft' | 'published' | 'archived'
  createdAt: Timestamp
  updatedAt: Timestamp
  publishedAt?: Timestamp
}

export interface Comment {
  id: ID
  contentId: ID
  authorId: ID
  author?: User
  body: string
  createdAt: Timestamp
  updatedAt: Timestamp
}
