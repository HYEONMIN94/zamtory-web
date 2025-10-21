/**
 * Loading Component
 * 로딩 스피너 컴포넌트
 */

import React from 'react'
import { colors, spacing, fontSize, fontWeight, fontFamily } from '../tokens'

export interface LoadingProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: string
  text?: string
  fullScreen?: boolean
}

export const Loading: React.FC<LoadingProps> = ({
  size = 'md',
  color = colors.primary[500],
  text,
  fullScreen = false,
}) => {
  // Size mapping
  const sizeMap = {
    sm: '20px',
    md: '40px',
    lg: '60px',
    xl: '80px',
  }

  const spinnerSize = sizeMap[size]

  const containerStyles: React.CSSProperties = fullScreen
    ? {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        zIndex: 9999,
      }
    : {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing[3],
      }

  const spinnerStyles: React.CSSProperties = {
    width: spinnerSize,
    height: spinnerSize,
    animation: 'spin 1s linear infinite',
  }

  const textStyles: React.CSSProperties = {
    marginTop: spacing[3],
    fontSize: fontSize.sm,
    color: colors.neutral[600],
    fontFamily: fontFamily.sans,
  }

  return (
    <>
      <style>
        {`
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
      <div style={containerStyles}>
        <svg
          style={spinnerStyles}
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="25"
            cy="25"
            r="20"
            stroke={colors.neutral[200]}
            strokeWidth="4"
          />
          <circle
            cx="25"
            cy="25"
            r="20"
            stroke={color}
            strokeWidth="4"
            strokeDasharray="80"
            strokeDashoffset="60"
            strokeLinecap="round"
          />
        </svg>
        {text && <p style={textStyles}>{text}</p>}
      </div>
    </>
  )
}
