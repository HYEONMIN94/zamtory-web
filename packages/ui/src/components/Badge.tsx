/**
 * Badge Component
 * 상태 표시 뱃지 컴포넌트
 */

import React from 'react'
import { colors, spacing, fontSize, fontWeight, fontFamily, borderRadius } from '../tokens'

export interface BadgeProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'neutral'
  size?: 'sm' | 'md' | 'lg'
  dot?: boolean
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  dot = false,
}) => {
  // Variant styles
  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      backgroundColor: colors.primary[100],
      color: colors.primary[700],
    },
    secondary: {
      backgroundColor: colors.secondary[100],
      color: colors.secondary[700],
    },
    success: {
      backgroundColor: colors.success[100],
      color: colors.success[700],
    },
    warning: {
      backgroundColor: colors.warning[100],
      color: colors.warning[700],
    },
    error: {
      backgroundColor: colors.error[100],
      color: colors.error[700],
    },
    info: {
      backgroundColor: colors.info[100],
      color: colors.info[700],
    },
    neutral: {
      backgroundColor: colors.neutral[100],
      color: colors.neutral[700],
    },
  }

  // Size styles
  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: {
      padding: dot ? spacing[1] : `${spacing[0.5]} ${spacing[2]}`,
      fontSize: fontSize.xs,
      minWidth: dot ? '6px' : 'auto',
      minHeight: dot ? '6px' : 'auto',
    },
    md: {
      padding: dot ? spacing[1.5] : `${spacing[1]} ${spacing[3]}`,
      fontSize: fontSize.sm,
      minWidth: dot ? '8px' : 'auto',
      minHeight: dot ? '8px' : 'auto',
    },
    lg: {
      padding: dot ? spacing[2] : `${spacing[2]} ${spacing[4]}`,
      fontSize: fontSize.base,
      minWidth: dot ? '10px' : 'auto',
      minHeight: dot ? '10px' : 'auto',
    },
  }

  const badgeStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: dot ? borderRadius.full : borderRadius.full,
    fontWeight: fontWeight.medium,
    fontFamily: fontFamily.sans,
    ...variantStyles[variant],
    ...sizeStyles[size],
  }

  return (
    <span style={badgeStyles}>
      {!dot && children}
    </span>
  )
}
