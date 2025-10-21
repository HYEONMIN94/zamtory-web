/**
 * Card Component
 * 스토리 카드, 정보 표시 등에 사용되는 카드 컴포넌트
 */

import React from 'react'
import { colors, spacing, shadows, borderRadius } from '../tokens'

export interface CardProps {
  title?: string
  description?: string
  image?: string
  footer?: React.ReactNode
  onClick?: () => void
  children?: React.ReactNode
  variant?: 'default' | 'elevated' | 'outlined'
}

export const Card: React.FC<CardProps> = ({
  title,
  description,
  image,
  footer,
  onClick,
  children,
  variant = 'default',
}) => {
  const cardStyles: React.CSSProperties = {
    backgroundColor: colors.neutral[0],
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    cursor: onClick ? 'pointer' : 'default',
    transition: 'all 0.2s',
    ...(variant === 'elevated' && { boxShadow: shadows.md }),
    ...(variant === 'outlined' && { border: `1px solid ${colors.neutral[200]}` }),
  }

  const contentStyles: React.CSSProperties = {
    padding: spacing[4],
  }

  return (
    <div style={cardStyles} onClick={onClick}>
      {image && (
        <div style={{ width: '100%', height: '200px', overflow: 'hidden' }}>
          <img
            src={image}
            alt={title || ''}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      )}
      <div style={contentStyles}>
        {title && (
          <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: spacing[2] }}>
            {title}
          </h3>
        )}
        {description && (
          <p style={{ fontSize: '14px', color: colors.neutral[600], marginBottom: spacing[3] }}>
            {description}
          </p>
        )}
        {children}
      </div>
      {footer && (
        <div style={{ padding: spacing[4], borderTop: `1px solid ${colors.neutral[200]}` }}>
          {footer}
        </div>
      )}
    </div>
  )
}
