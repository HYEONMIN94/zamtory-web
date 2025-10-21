# 잼토리(Zamtory) 구현 가이드

이 문서는 잼토리 프로젝트의 구현 방법을 안내합니다.

---

## ✅ 완료된 작업

### 1. 디자인 토큰 시스템 ✅

다음 파일들이 생성되었습니다:

```
packages/ui/src/tokens/
├── colors.ts          # 컬러 팔레트 (Primary, Secondary, Neutral, Status)
├── spacing.ts         # 4px 기반 간격 체계
├── typography.ts      # 폰트 시스템 (Pretendard, JetBrains Mono)
├── breakpoints.ts     # 반응형 브레이크포인트 (sm, md, lg, xl, 2xl)
└── index.ts           # 통합 export + 추가 토큰 (shadows, borderRadius, zIndex, etc.)
```

**사용 방법**:
```typescript
import { colors, spacing, typography, breakpoints } from '@zamtory/ui/tokens'

// 컬러 사용
const primaryColor = colors.primary[500]

// 간격 사용
const padding = spacing[4] // 16px

// 타이포그래피 사용
const h1Style = typography.h1

// 브레이크포인트 사용
const isMobile = window.innerWidth < breakpointValues.md
```

---

## 🚀 다음 단계: UI 컴포넌트 구현

### 2. 기본 UI 컴포넌트 (진행 중)

아래 컴포넌트들을 구현해야 합니다:

#### **2.1 Button 컴포넌트**

`packages/ui/src/components/Button.tsx` 파일이 생성되었습니다.

**완전한 구현이 필요한 사항**:
```typescript
// Button.tsx에 추가 필요한 기능들:
// 1. Hover 스타일
// 2. Active 스타일
// 3. Focus 스타일 (접근성)
// 4. Ripple effect (옵션)
```

**권장 구현 방법**:
```bash
cd packages/ui
yarn add class-variance-authority clsx
```

```typescript
// CVA를 사용한 더 나은 스타일 관리
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-semibold transition-all',
  {
    variants: {
      variant: {
        primary: 'bg-primary-500 text-white shadow-sm hover:bg-primary-600',
        secondary: 'bg-secondary-500 text-white shadow-sm hover:bg-secondary-600',
        outline: 'border border-primary-500 text-primary-600 hover:bg-primary-50',
        ghost: 'text-neutral-700 hover:bg-neutral-100',
        danger: 'bg-error-500 text-white shadow-sm hover:bg-error-600',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)
```

---

#### **2.2 Card 컴포넌트**

`packages/ui/src/components/Card.tsx` 생성 필요:

```typescript
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
```

---

#### **2.3 Input 컴포넌트**

`packages/ui/src/components/Input.tsx` 생성 필요:

```typescript
/**
 * Input Component
 * 텍스트 입력 필드
 */

import React from 'react'
import { colors, spacing, typography, borderRadius } from '../tokens'

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
      fontSize: typography.fontSize.sm,
      fontFamily: typography.fontFamily.sans,
      borderRadius: borderRadius.md,
      border: `1px solid ${error ? colors.error[500] : colors.neutral[300]}`,
      outline: 'none',
      transition: 'all 0.2s',
      backgroundColor: colors.neutral[0],
    }

    const labelStyles: React.CSSProperties = {
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.medium,
      color: colors.neutral[700],
    }

    const errorStyles: React.CSSProperties = {
      fontSize: typography.fontSize.xs,
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
          <span style={{ fontSize: typography.fontSize.xs, color: colors.neutral[600] }}>
            {helperText}
          </span>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
```

---

#### **2.4 Modal 컴포넌트**

`packages/ui/src/components/Modal.tsx` 생성 필요:

```typescript
/**
 * Modal Component
 * 모달 다이얼로그
 */

import React, { useEffect } from 'react'
import { colors, spacing, shadows, borderRadius, zIndex } from '../tokens'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  footer?: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
}) => {
  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const sizeMap = {
    sm: '400px',
    md: '600px',
    lg: '800px',
    xl: '1000px',
  }

  const backdropStyles: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: zIndex.modal,
    animation: 'fadeIn 0.2s ease-out',
  }

  const modalStyles: React.CSSProperties = {
    backgroundColor: colors.neutral[0],
    borderRadius: borderRadius.xl,
    boxShadow: shadows['2xl'],
    maxWidth: sizeMap[size],
    width: '90%',
    maxHeight: '90vh',
    overflow: 'auto',
    animation: 'slideInUp 0.3s ease-out',
  }

  const headerStyles: React.CSSProperties = {
    padding: spacing[6],
    borderBottom: `1px solid ${colors.neutral[200]}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }

  const contentStyles: React.CSSProperties = {
    padding: spacing[6],
  }

  const footerStyles: React.CSSProperties = {
    padding: spacing[6],
    borderTop: `1px solid ${colors.neutral[200]}`,
    display: 'flex',
    gap: spacing[2],
    justifyContent: 'flex-end',
  }

  return (
    <>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideInUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        `}
      </style>
      <div style={backdropStyles} onClick={onClose}>
        <div style={modalStyles} onClick={(e) => e.stopPropagation()}>
          {title && (
            <div style={headerStyles}>
              <h2 style={{ fontSize: '20px', fontWeight: 600 }}>{title}</h2>
              <button
                onClick={onClose}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: colors.neutral[500],
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
    </>
  )
}
```

---

### 3. 컴포넌트 Export 설정

`packages/ui/src/components/index.ts` 생성:

```typescript
/**
 * UI Components Index
 * 모든 컴포넌트를 여기서 export합니다
 */

export * from './Button'
export * from './Card'
export * from './Input'
export * from './Modal'

// 추후 추가할 컴포넌트들
// export * from './Select'
// export * from './Badge'
// export * from './Toast'
// export * from './Loading'
// export * from './ProgressBar'
// export * from './StoryNode'
```

`packages/ui/src/index.ts` 업데이트:

```typescript
/**
 * @zamtory/ui Package Entry
 */

// Tokens
export * from './tokens'

// Components
export * from './components'
```

---

## 📦 다음 단계: 앱 레이아웃 구축

### 4. 에디터 앱 레이아웃

`apps/editor/src/app/layout.tsx`:

```typescript
import type { Metadata } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: '잼토리 에디터 - AI 기반 인터랙티브 스토리 제작',
  description: 'AI를 활용한 인터랙티브 스토리 제작 도구',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}
```

`apps/editor/src/app/page.tsx`:

```typescript
'use client'

import { Button } from '@zamtory/ui'

export default function EditorHomePage() {
  return (
    <div style={{ padding: '24px' }}>
      <h1>잼토리 에디터</h1>
      <p>AI 기반 인터랙티브 스토리 제작 도구</p>

      <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
        <Button variant="primary">새 스토리 만들기</Button>
        <Button variant="outline">템플릿 선택</Button>
      </div>
    </div>
  )
}
```

---

### 5. 플레이어 앱 레이아웃

`apps/zamtory/src/app/layout.tsx`:

```typescript
import type { Metadata } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: '잼토리 - 인터랙티브 스토리 플랫폼',
  description: '당신의 선택으로 만들어가는 이야기',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}
```

`apps/zamtory/src/app/page.tsx`:

```typescript
'use client'

import { Button, Card } from '@zamtory/ui'

export default function HomePage() {
  return (
    <div style={{ padding: '24px' }}>
      <h1>잼토리</h1>
      <p>인터랙티브 스토리 플랫폼</p>

      <div style={{ marginTop: '32px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '16px' }}>
        <Card
          title="로맨스 스토리"
          description="평범한 고등학생이 어느 날 갑자기..."
          footer={<div>⭐ 4.8 | 👁️ 1.2k</div>}
        />
        <Card
          title="판타지 모험"
          description="마법 세계로 떨어진 주인공의 이야기"
          footer={<div>⭐ 4.6 | 👁️ 856</div>}
        />
      </div>
    </div>
  )
}
```

---

## 🛠️ 설치 및 실행

### 의존성 설치

```bash
# 루트 디렉토리에서
yarn install

# UI 패키지에 추가 의존성 설치 (선택사항)
cd packages/ui
yarn add class-variance-authority clsx
```

### 개발 서버 실행

```bash
# 모든 앱 동시 실행
yarn dev

# 개별 앱 실행
yarn dev:editor   # http://localhost:3001
yarn dev:zamtory  # http://localhost:3000
yarn dev:admin    # http://localhost:3002
```

---

## 📚 추가 필요한 컴포넌트

다음 컴포넌트들을 순차적으로 구현하세요:

1. **Select** - 드롭다운 선택 컴포넌트
2. **Badge** - 상태 표시 배지
3. **Toast** - 알림 메시지
4. **Loading** - 로딩 스피너
5. **ProgressBar** - 진행률 표시
6. **StoryNode** - 노드 에디터용 노드 컴포넌트

---

## 🎨 스타일링 권장사항

### Tailwind CSS 설정

`tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
        },
        secondary: {
          50: '#fdf4ff',
          100: '#fae8ff',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
        },
      },
      fontFamily: {
        sans: ['Pretendard', 'system-ui', 'sans-serif'],
      },
    },
  },
}
```

---

## ✅ 체크리스트

- [x] 디자인 토큰 시스템 구현
- [x] Button 컴포넌트 기본 구조
- [ ] Card 컴포넌트 구현
- [ ] Input 컴포넌트 구현
- [ ] Modal 컴포넌트 구현
- [ ] 에디터 앱 기본 레이아웃
- [ ] 플레이어 앱 기본 레이아웃
- [ ] 관리자 앱 기본 레이아웃
- [ ] 노드 에디터 프로토타입

---

## 📝 다음 회의 전 준비사항

1. 위 컴포넌트들을 구현하고 Storybook 설정 고려
2. 에디터 앱의 노드 에디터를 위해 `react-flow` 라이브러리 검토
3. API 클라이언트 (`@zamtory/api-client`) 구조 설계
4. 타입 정의 (`@zamtory/types`) 설계

---

이 가이드를 따라 구현을 진행하시면 됩니다! 🚀
