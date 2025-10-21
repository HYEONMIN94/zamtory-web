/**
 * Input Component
 * 텍스트 입력 필드
 */

import React from 'react'
import { colors, spacing, fontSize, fontWeight, fontFamily, borderRadius } from '../tokens'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  fullWidth?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      fullWidth = false,
      leftIcon,
      rightIcon,
      className = '',
      style = {},
      ...props
    },
    ref
  ) => {
    const containerStyles: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: spacing[1],
      width: fullWidth ? '100%' : 'auto',
    }

    const inputContainerStyles: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      width: '100%',
    }

    const inputStyles: React.CSSProperties = {
      width: '100%',
      padding: `${spacing[2]} ${spacing[3]}`,
      paddingLeft: leftIcon ? spacing[10] : spacing[3],
      paddingRight: rightIcon ? spacing[10] : spacing[3],
      fontSize: fontSize.sm,
      fontFamily: fontFamily.sans,
      borderRadius: borderRadius.md,
      border: `1px solid ${error ? colors.error[500] : colors.neutral[300]}`,
      outline: 'none',
      transition: 'all 0.2s',
      backgroundColor: colors.neutral[0],
    }

    const labelStyles: React.CSSProperties = {
      fontSize: fontSize.sm,
      fontWeight: fontWeight.medium,
      color: colors.neutral[700],
    }

    const errorStyles: React.CSSProperties = {
      fontSize: fontSize.xs,
      color: colors.error[600],
    }

    return (
      <div style={containerStyles}>
        {label && <label style={labelStyles}>{label}</label>}
        <div style={inputContainerStyles}>
          {leftIcon && (
            <span style={{ position: 'absolute', left: spacing[3], color: colors.neutral[500] }}>
              {leftIcon}
            </span>
          )}
          <input ref={ref} style={{ ...inputStyles, ...style }} {...props} />
          {rightIcon && (
            <span style={{ position: 'absolute', right: spacing[3], color: colors.neutral[500] }}>
              {rightIcon}
            </span>
          )}
        </div>
        {error && <span style={errorStyles}>{error}</span>}
        {!error && helperText && (
          <span style={{ fontSize: fontSize.xs, color: colors.neutral[600] }}>
            {helperText}
          </span>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
