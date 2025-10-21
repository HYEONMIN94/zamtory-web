/**
 * Button Component
 * 잼토리 디자인 시스템의 버튼 컴포넌트입니다.
 */

import React, { useState } from 'react'
import { colors, spacing, fontSize, fontWeight, fontFamily, shadows, borderRadius, transitions } from '../tokens'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  loading?: boolean
  icon?: React.ReactNode
  iconOnly?: boolean
  children?: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    loading = false,
    disabled = false,
    icon,
    iconOnly = false,
    children,
    className = '',
    style = {},
    ...props
  }, ref) => {
    const [isHovered, setIsHovered] = useState(false)
    const [isActive, setIsActive] = useState(false)

    // Size styles
    const sizeStyles: Record<string, React.CSSProperties> = {
      sm: {
        padding: iconOnly ? spacing[2] : `${spacing[2]} ${spacing[3]}`,
        fontSize: fontSize.xs,
        minHeight: '32px',
      },
      md: {
        padding: iconOnly ? spacing[3] : `${spacing[3]} ${spacing[4]}`,
        fontSize: fontSize.sm,
        minHeight: '40px',
      },
      lg: {
        padding: iconOnly ? spacing[4] : `${spacing[4]} ${spacing[6]}`,
        fontSize: fontSize.base,
        minHeight: '48px',
      },
    }

    // Variant styles
    const getVariantStyles = (): React.CSSProperties => {
      const isDisabled = disabled || loading

      switch (variant) {
        case 'primary':
          return {
            backgroundColor: isActive
              ? colors.primary[700]
              : isHovered
              ? colors.primary[600]
              : colors.primary[500],
            color: colors.neutral[0],
            border: 'none',
            boxShadow: !isDisabled && !isActive ? shadows.sm : 'none',
          }

        case 'secondary':
          return {
            backgroundColor: isActive
              ? colors.secondary[700]
              : isHovered
              ? colors.secondary[600]
              : colors.secondary[500],
            color: colors.neutral[0],
            border: 'none',
            boxShadow: !isDisabled && !isActive ? shadows.sm : 'none',
          }

        case 'outline':
          return {
            backgroundColor: isActive
              ? colors.neutral[100]
              : isHovered
              ? colors.neutral[50]
              : 'transparent',
            color: colors.primary[600],
            border: `1px solid ${colors.primary[500]}`,
          }

        case 'ghost':
          return {
            backgroundColor: isActive
              ? colors.neutral[200]
              : isHovered
              ? colors.neutral[100]
              : 'transparent',
            color: colors.neutral[700],
            border: 'none',
          }

        case 'danger':
          return {
            backgroundColor: isActive
              ? colors.error[700]
              : isHovered
              ? colors.error[600]
              : colors.error[500],
            color: colors.neutral[0],
            border: 'none',
            boxShadow: !isDisabled && !isActive ? shadows.sm : 'none',
          }

        default:
          return {}
      }
    }

    const baseStyles: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing[2],
      borderRadius: borderRadius.md,
      fontFamily: fontFamily.sans,
      fontWeight: fontWeight.semibold,
      cursor: disabled || loading ? 'not-allowed' : 'pointer',
      transition: `all ${transitions.base}`,
      width: fullWidth ? '100%' : 'auto',
      opacity: disabled || loading ? 0.6 : 1,
      outline: 'none',
      userSelect: 'none',
      ...sizeStyles[size],
      ...getVariantStyles(),
    }

    // Loading spinner
    const LoadingSpinner = () => (
      <svg
        style={{
          animation: 'spin 1s linear infinite',
          width: '1em',
          height: '1em',
        }}
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
          strokeOpacity="0.25"
        />
        <path
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          opacity="0.75"
        />
      </svg>
    )

    return (
      <>
        <style>
          {`
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}
        </style>
        <button
          ref={ref}
          disabled={disabled || loading}
          style={{ ...baseStyles, ...style }}
          onMouseEnter={() => !disabled && !loading && setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false)
            setIsActive(false)
          }}
          onMouseDown={() => !disabled && !loading && setIsActive(true)}
          onMouseUp={() => setIsActive(false)}
          {...props}
        >
          {loading && <LoadingSpinner />}
          {!loading && icon && <span>{icon}</span>}
          {!iconOnly && children}
        </button>
      </>
    )
  }
)

Button.displayName = 'Button'
