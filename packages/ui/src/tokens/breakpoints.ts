/**
 * Zamtory Design System - Breakpoint Tokens
 *
 * 반응형 디자인을 위한 브레이크포인트를 정의합니다.
 * Mobile-first 접근 방식을 사용합니다.
 */

export const breakpoints = {
  sm: '640px', // 모바일 (≥640px)
  md: '768px', // 태블릿 (≥768px)
  lg: '1024px', // 데스크탑 (≥1024px)
  xl: '1280px', // 대형 데스크탑 (≥1280px)
  '2xl': '1536px', // 초대형 데스크탑 (≥1536px)
} as const

// 숫자 값 (계산용)
export const breakpointValues = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

// 미디어 쿼리 헬퍼
export const media = {
  // Mobile first (min-width)
  sm: `@media (min-width: ${breakpoints.sm})`,
  md: `@media (min-width: ${breakpoints.md})`,
  lg: `@media (min-width: ${breakpoints.lg})`,
  xl: `@media (min-width: ${breakpoints.xl})`,
  '2xl': `@media (min-width: ${breakpoints['2xl']})`,

  // Max-width (역방향)
  maxSm: `@media (max-width: ${breakpointValues.sm - 1}px)`,
  maxMd: `@media (max-width: ${breakpointValues.md - 1}px)`,
  maxLg: `@media (max-width: ${breakpointValues.lg - 1}px)`,
  maxXl: `@media (max-width: ${breakpointValues.xl - 1}px)`,
  max2xl: `@media (max-width: ${breakpointValues['2xl'] - 1}px)`,

  // Between (범위)
  smToMd: `@media (min-width: ${breakpoints.sm}) and (max-width: ${breakpointValues.md - 1}px)`,
  mdToLg: `@media (min-width: ${breakpoints.md}) and (max-width: ${breakpointValues.lg - 1}px)`,
  lgToXl: `@media (min-width: ${breakpoints.lg}) and (max-width: ${breakpointValues.xl - 1}px)`,
  xlTo2xl: `@media (min-width: ${breakpoints.xl}) and (max-width: ${breakpointValues['2xl'] - 1}px)`,

  // 특수 미디어 쿼리
  portrait: '@media (orientation: portrait)',
  landscape: '@media (orientation: landscape)',
  touch: '@media (hover: none) and (pointer: coarse)',
  mouse: '@media (hover: hover) and (pointer: fine)',
  reducedMotion: '@media (prefers-reduced-motion: reduce)',
  darkMode: '@media (prefers-color-scheme: dark)',
  lightMode: '@media (prefers-color-scheme: light)',
} as const

// 컨테이너 최대 너비
export const containerMaxWidth = {
  sm: breakpoints.sm,
  md: breakpoints.md,
  lg: breakpoints.lg,
  xl: breakpoints.xl,
  '2xl': '1400px', // 2xl은 약간 작게 제한
  full: '100%',
} as const

// 앱별 레이아웃 브레이크포인트
export const appBreakpoints = {
  // 에디터 앱 - 데스크탑 우선
  editor: {
    mobile: breakpoints.md, // 768px 이하는 모바일 경고
    tablet: breakpoints.lg, // 1024px 이하는 간소화 UI
    desktop: breakpoints.xl, // 1280px 이상 풀 기능
  },

  // 플레이어 앱 - 모바일 우선
  player: {
    mobile: breakpoints.sm, // 640px 이하 최적화
    tablet: breakpoints.md, // 768px 이상 여백 추가
    desktop: breakpoints.lg, // 1024px 이상 중앙 정렬
    maxWidth: '480px', // 최대 너비 제한
  },

  // 관리자 앱 - 데스크탑 전용
  admin: {
    minWidth: breakpoints.md, // 768px 이하 접근 제한
    sidebar: breakpoints.lg, // 1024px 이상 사이드바 고정
    fullLayout: breakpoints.xl, // 1280px 이상 풀 레이아웃
  },
} as const

export type Breakpoint = keyof typeof breakpoints
export type MediaQuery = keyof typeof media
