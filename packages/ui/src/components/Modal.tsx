/**
 * Modal Component
 * 모달 다이얼로그
 */

import React, { useEffect } from 'react'
import { colors, spacing, fontSize, fontWeight, fontFamily, borderRadius, shadows, zIndex } from '../tokens'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  footer?: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  closeOnBackdropClick?: boolean
  closeOnEsc?: boolean
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  closeOnBackdropClick = true,
  closeOnEsc = true,
}) => {
  // ESC 키 핸들링
  useEffect(() => {
    if (!isOpen || !closeOnEsc) return

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [isOpen, closeOnEsc, onClose])

  // Body 스크롤 제어
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  const sizeMap = {
    sm: '400px',
    md: '600px',
    lg: '800px',
    xl: '1000px',
  }

  const backdropStyles: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: zIndex.modal,
    animation: 'fadeIn 200ms ease-in',
  }

  const modalStyles: React.CSSProperties = {
    backgroundColor: colors.neutral[0],
    borderRadius: borderRadius.lg,
    boxShadow: shadows.xl,
    width: '90%',
    maxWidth: sizeMap[size],
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    animation: 'slideInUp 300ms ease-out',
  }

  const headerStyles: React.CSSProperties = {
    padding: spacing[6],
    borderBottom: `1px solid ${colors.neutral[200]}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }

  const titleStyles: React.CSSProperties = {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.semibold,
    color: colors.neutral[900],
  }

  const closeButtonStyles: React.CSSProperties = {
    background: 'none',
    border: 'none',
    fontSize: fontSize['2xl'],
    color: colors.neutral[500],
    cursor: 'pointer',
    padding: spacing[2],
    lineHeight: 1,
    transition: 'color 0.2s',
  }

  const contentStyles: React.CSSProperties = {
    padding: spacing[6],
    overflowY: 'auto',
    flex: 1,
  }

  const footerStyles: React.CSSProperties = {
    padding: spacing[6],
    borderTop: `1px solid ${colors.neutral[200]}`,
    display: 'flex',
    gap: spacing[3],
    justifyContent: 'flex-end',
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div style={backdropStyles} onClick={handleBackdropClick}>
      <div style={modalStyles} role="dialog" aria-modal="true">
        {title && (
          <div style={headerStyles}>
            <h2 style={titleStyles}>{title}</h2>
            <button
              onClick={onClose}
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
        )}
        <div style={contentStyles}>{children}</div>
        {footer && <div style={footerStyles}>{footer}</div>}
      </div>
    </div>
  )
}
