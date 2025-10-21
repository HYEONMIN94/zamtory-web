/**
 * Zamtory Design System - Color Tokens
 *
 * 잼토리 디자인 시스템의 컬러 팔레트를 정의합니다.
 * - Primary: 인터랙티브 스토리 테마 (파랑)
 * - Secondary: 창작 테마 (보라)
 * - Neutral: 배경/텍스트
 * - Status: 성공/경고/에러/정보
 */

export const colors = {
  // Primary - 인터랙티브 스토리 테마
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9', // 메인 컬러
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
    950: '#082f49',
  },

  // Secondary - 창작 테마
  secondary: {
    50: '#fdf4ff',
    100: '#fae8ff',
    200: '#f5d0fe',
    300: '#f0abfc',
    400: '#e879f9',
    500: '#d946ef', // 메인 컬러
    600: '#c026d3',
    700: '#a21caf',
    800: '#86198f',
    900: '#701a75',
    950: '#4a044e',
  },

  // Neutral - 배경/텍스트
  neutral: {
    0: '#ffffff',
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0a0a0a',
  },

  // Status Colors
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
  },

  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
  },

  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
  },

  info: {
    50: '#eff6ff',
    100: '#dbeafe',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
  },
} as const

// 타입 추출을 위한 헬퍼
export type ColorScale = keyof typeof colors
export type ColorShade<T extends ColorScale> = keyof (typeof colors)[T]

// 사용 편의를 위한 별칭
export const semanticColors = {
  // Background
  background: {
    primary: colors.neutral[0],
    secondary: colors.neutral[50],
    tertiary: colors.neutral[100],
  },

  // Text
  text: {
    primary: colors.neutral[900],
    secondary: colors.neutral[700],
    tertiary: colors.neutral[500],
    disabled: colors.neutral[400],
    inverse: colors.neutral[0],
  },

  // Border
  border: {
    default: colors.neutral[200],
    hover: colors.neutral[300],
    focus: colors.primary[500],
  },

  // Interactive
  interactive: {
    primary: colors.primary[500],
    primaryHover: colors.primary[600],
    primaryActive: colors.primary[700],
    secondary: colors.secondary[500],
    secondaryHover: colors.secondary[600],
    secondaryActive: colors.secondary[700],
  },

  // Status
  status: {
    success: colors.success[500],
    successBg: colors.success[50],
    warning: colors.warning[500],
    warningBg: colors.warning[50],
    error: colors.error[500],
    errorBg: colors.error[50],
    info: colors.info[500],
    infoBg: colors.info[50],
  },
} as const
