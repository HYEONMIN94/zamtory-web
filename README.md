# Zamtory Web - Monorepo

Zamtory 프론트엔드 모노레포 프로젝트 - Turborepo + Yarn Workspaces

> **백엔드**: 별도 저장소 [`zamtory-api`](https://github.com/HYEONMIN94/zamtory)에서 관리

## 🏗️ 프로젝트 구조

이 모노레포는 3개의 애플리케이션과 6개의 공유 패키지로 구성되어 있습니다.

### 애플리케이션 (apps/)

- **`apps/zamtory`** - 사용자 앱 (zamtory) → http://localhost:3000
- **`apps/editor`** - 콘텐츠 에디터 → http://localhost:3001
- **`apps/admin`** - 관리자 대시보드 → http://localhost:3002

### 공유 패키지 (packages/)

- **`@zamtory/ui`** - 공통 UI 컴포넌트 (Button, Input, Card 등)
- **`@zamtory/types`** - 공유 타입 정의
- **`@zamtory/utils`** - 유틸리티 함수
- **`@zamtory/api-client`** - API 클라이언트
- **`@zamtory/webview-bridge`** - 웹뷰 네이티브 브릿지
- **`@zamtory/config`** - 공통 설정 (TypeScript, ESLint, Tailwind)

## 🚀 시작하기

### 필수 요구사항

- Node.js 20+
- Yarn 1.22+

### 설치

```bash
yarn install
```

### 개발 서버 실행

```bash
# 모든 앱 동시 실행
yarn dev

# 개별 앱 실행
yarn dev:zamtory # 사용자 앱 (http://localhost:3000)
yarn dev:editor  # 에디터 앱 (http://localhost:3001)
yarn dev:admin   # 관리자 앱 (http://localhost:3002)
```

### 빌드

```bash
# 모든 앱 빌드
yarn build

# 개별 앱 빌드
yarn build:zamtory
yarn build:editor
yarn build:admin
```

### 기타 스크립트

```bash
# 린트
yarn lint

# 타입 체크
yarn type-check

# 클린업
yarn clean
```

## 📦 기술 스택

### 프레임워크 & 라이브러리

- **Next.js** 15.5 - React 프레임워크 (App Router)
- **React** 19.1 - UI 라이브러리
- **TypeScript** 5.x - 타입 안전성
- **Tailwind CSS** 4.x - 유틸리티 기반 CSS

### 모노레포 도구

- **Turborepo** 2.x - 빌드 시스템 & 태스크 러너
- **Yarn Workspaces** - 패키지 관리

## 📂 디렉토리 구조

```
zamtory-web/
├── apps/                     # 애플리케이션
│   ├── editor/              # 콘텐츠 에디터
│   ├── zamtory/             # 사용자 앱
│   └── admin/               # 관리자 대시보드
│
├── packages/                # 공유 패키지
│   ├── ui/                 # UI 컴포넌트
│   ├── types/              # 타입 정의
│   ├── utils/              # 유틸리티
│   ├── api-client/         # API 클라이언트
│   ├── webview-bridge/     # 웹뷰 브릿지
│   └── config/             # 공통 설정
│
├── package.json            # 루트 패키지
├── turbo.json             # Turborepo 설정
└── DESIGN.md              # 설계 문서
```

## 🔧 개발 가이드

### 새 패키지 추가

```bash
# packages/ 디렉토리에 새 패키지 생성
mkdir -p packages/new-package/src

# package.json 생성
cat > packages/new-package/package.json << EOF
{
  "name": "@zamtory/new-package",
  "version": "0.1.0",
  "private": true,
  "main": "./src/index.ts"
}
EOF

# 의존성 재설치
yarn install
```

### 패키지 간 의존성

Yarn Workspaces를 사용하여 내부 패키지를 참조합니다:

```json
{
  "dependencies": {
    "@zamtory/ui": "*",
    "@zamtory/types": "*"
  }
}
```

### TypeScript 경로 설정

각 앱의 `tsconfig.json`:

```json
{
  "extends": "@zamtory/config/typescript/nextjs.json",
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@zamtory/ui": ["../../packages/ui/src"],
      "@zamtory/types": ["../../packages/types/src"]
    }
  }
}
```

## 🌐 웹뷰 통합

각 앱은 웹뷰 버전을 지원합니다:

```typescript
import { getWebViewBridge } from '@zamtory/webview-bridge'

const bridge = getWebViewBridge()

// 네이티브 기능 호출
await bridge.openCamera()
await bridge.share({ message: 'Hello' })

// 네이티브 앱 감지
if (bridge.isNativeApp()) {
  // 웹뷰 전용 로직
}
```

## 📝 환경 변수

각 앱의 `.env.local`:

```bash
# apps/zamtory/.env.local
NEXT_PUBLIC_API_URL=https://api.zamtory.com
NEXT_PUBLIC_APP_NAME=zamtory

# apps/editor/.env.local
NEXT_PUBLIC_API_URL=https://api.zamtory.com
NEXT_PUBLIC_APP_NAME=editor
```

## 🚀 배포

### Vercel 배포

각 앱을 독립적으로 배포:

1. Vercel 프로젝트 생성
2. Root Directory 설정: `apps/zamtory` (또는 editor, admin)
3. Build Command: `cd ../.. && yarn build:zamtory`
4. Output Directory: `.next`

### 배포 도메인 구조

- **editor.zamtory.com** → apps/editor
- **zamtory.com** → apps/zamtory
- **admin.zamtory.com** → apps/admin

## 🔗 참고 자료

- [Turborepo 문서](https://turbo.build/repo/docs)
- [Next.js 문서](https://nextjs.org/docs)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
