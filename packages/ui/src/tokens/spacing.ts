/**
 * Zamtory Design System - Spacing Tokens
 *
 * 4px 기반 간격 체계를 정의합니다.
 * 일관된 레이아웃과 여백을 위해 사용됩니다.
 */

export const spacing = {
  0: '0',
  px: '1px',
  0.5: '2px',
  1: '4px',
  1.5: '6px',
  2: '8px',
  2.5: '10px',
  3: '12px',
  3.5: '14px',
  4: '16px',
  5: '20px',
  6: '24px',
  7: '28px',
  8: '32px',
  9: '36px',
  10: '40px',
  11: '44px',
  12: '48px',
  14: '56px',
  16: '64px',
  20: '80px',
  24: '96px',
  28: '112px',
  32: '128px',
  36: '144px',
  40: '160px',
  44: '176px',
  48: '192px',
  52: '208px',
  56: '224px',
  60: '240px',
  64: '256px',
  72: '288px',
  80: '320px',
  96: '384px',
} as const

// 사용 편의를 위한 별칭
export const spacingAliases = {
  xs: spacing[1], // 4px
  sm: spacing[2], // 8px
  md: spacing[4], // 16px
  lg: spacing[6], // 24px
  xl: spacing[8], // 32px
  '2xl': spacing[12], // 48px
  '3xl': spacing[16], // 64px
  '4xl': spacing[24], // 96px
} as const

// 컴포넌트별 간격 프리셋
export const componentSpacing = {
  // 버튼 내부 여백
  button: {
    sm: { x: spacing[3], y: spacing[1.5] }, // 12px x 6px
    md: { x: spacing[4], y: spacing[2] }, // 16px x 8px
    lg: { x: spacing[6], y: spacing[3] }, // 24px x 12px
  },

  // 카드 여백
  card: {
    padding: spacing[4], // 16px
    gap: spacing[3], // 12px
  },

  // 입력 필드
  input: {
    padding: spacing[3], // 12px
    gap: spacing[2], // 8px
  },

  // 모달
  modal: {
    padding: spacing[6], // 24px
    gap: spacing[4], // 16px
  },

  // 섹션 간격
  section: {
    gap: spacing[8], // 32px
    marginBottom: spacing[12], // 48px
  },

  // 컨테이너
  container: {
    padding: {
      mobile: spacing[4], // 16px
      tablet: spacing[6], // 24px
      desktop: spacing[8], // 32px
    },
  },
} as const

export type Spacing = keyof typeof spacing
export type SpacingAlias = keyof typeof spacingAliases
