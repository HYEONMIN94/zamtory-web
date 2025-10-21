/**
 * Toast Component
 * 알림 토스트 컴포넌트
 */

import React, { useEffect, useState } from 'react'
import { colors, spacing, fontSize, fontWeight, fontFamily, borderRadius, shadows, zIndex } from '../tokens'

export interface ToastProps {
  message: string
  type?: 'success' | 'error' | 'warning' | 'info'
  duration?: number
  onClose?: () => void
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  duration = 3000,
  onClose,
  position = 'top-right',
}) => {
  const [isVisible, setIsVisible] = useState(true)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [duration])

  const handleClose = () => {
    setIsExiting(true)
    setTimeout(() => {
      setIsVisible(false)
      onClose?.()
    }, 300)
  }

  if (!isVisible) return null

  // Type styles
  const typeStyles: Record<string, { bg: string; icon: string; color: string }> = {
    success: {
      bg: colors.success[50],
      icon: '✓',
      color: colors.success[700],
    },
    error: {
      bg: colors.error[50],
      icon: '✕',
      color: colors.error[700],
    },
    warning: {
      bg: colors.warning[50],
      icon: '⚠',
      color: colors.warning[700],
    },
    info: {
      bg: colors.info[50],
      icon: 'ℹ',
      color: colors.info[700],
    },
  }

  // Position styles
  const getPositionStyles = (): React.CSSProperties => {
    const basePosition: React.CSSProperties = {
      position: 'fixed',
      zIndex: zIndex.toast,
    }

    switch (position) {
      case 'top-left':
        return { ...basePosition, top: spacing[6], left: spacing[6] }
      case 'top-center':
        return { ...basePosition, top: spacing[6], left: '50%', transform: 'translateX(-50%)' }
      case 'top-right':
        return { ...basePosition, top: spacing[6], right: spacing[6] }
      case 'bottom-left':
        return { ...basePosition, bottom: spacing[6], left: spacing[6] }
      case 'bottom-center':
        return { ...basePosition, bottom: spacing[6], left: '50%', transform: 'translateX(-50%)' }
      case 'bottom-right':
        return { ...basePosition, bottom: spacing[6], right: spacing[6] }
      default:
        return { ...basePosition, top: spacing[6], right: spacing[6] }
    }
  }

  const toastStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[3],
    padding: `${spacing[4]} ${spacing[5]}`,
    backgroundColor: typeStyles[type].bg,
    border: `1px solid ${typeStyles[type].color}`,
    borderRadius: borderRadius.lg,
    boxShadow: shadows.lg,
    minWidth: '300px',
    maxWidth: '500px',
    animation: isExiting ? 'slideOut 300ms ease-out' : 'slideIn 300ms ease-out',
    ...getPositionStyles(),
  }

  const iconStyles: React.CSSProperties = {
    fontSize: fontSize.xl,
    color: typeStyles[type].color,
    fontWeight: fontWeight.bold,
  }

  const messageStyles: React.CSSProperties = {
    flex: 1,
    fontSize: fontSize.sm,
    color: colors.neutral[800],
    fontFamily: fontFamily.sans,
  }

  const closeButtonStyles: React.CSSProperties = {
    background: 'none',
    border: 'none',
    fontSize: fontSize.xl,
    color: colors.neutral[500],
    cursor: 'pointer',
    padding: 0,
    lineHeight: 1,
  }

  return (
    <>
      <style>
        {`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateX(100%);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          @keyframes slideOut {
            from {
              opacity: 1;
              transform: translateX(0);
            }
            to {
              opacity: 0;
              transform: translateX(100%);
            }
          }
        `}
      </style>
      <div style={toastStyles} role="alert">
        <span style={iconStyles}>{typeStyles[type].icon}</span>
        <span style={messageStyles}>{message}</span>
        <button
          onClick={handleClose}
          style={closeButtonStyles}
          aria-label="닫기"
          onMouseEnter={(e) => {
            e.currentTarget.style.color = colors.neutral[700]
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = colors.neutral[500]
          }}
        >
          ×
        </button>
      </div>
    </>
  )
}
