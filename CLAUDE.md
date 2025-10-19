# CLAUDE.md

이 파일은 Claude Code(claude.ai/code)가 이 저장소에서 작업할 때 참고할 가이드입니다.

## 프로젝트 개요

**Zamtory Web**은 Zamtory 서비스의 프론트엔드 애플리케이션입니다.

> **백엔드**: 별도 저장소 [`zamtory-api`](https://github.com/HYEONMIN94/zamtory)에서 관리

## 기술 스택

- **Framework**: Next.js 15.5 (App Router)
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 4.x
- **React**: React 19.1
- **Package Manager**: Yarn

## 프로젝트 구조

```
zamtory-web/
├── src/
│   └── app/              # Next.js App Router
│       ├── layout.tsx    # 루트 레이아웃
│       ├── page.tsx      # 홈 페이지
│       └── globals.css   # 글로벌 스타일
├── public/               # 정적 파일
└── package.json
```

## 개발 명령어

### 개발 서버 실행

```bash
yarn dev
```

개발 서버는 기본적으로 http://localhost:3000 에서 실행됩니다.

### 프로덕션 빌드

```bash
# 빌드
yarn build

# 빌드된 앱 실행
yarn start
```

### Linting

```bash
yarn lint
```

## 환경 변수

환경 변수가 필요한 경우 `.env.local` 파일을 생성하세요:

```bash
# .env.local 예시
NEXT_PUBLIC_API_URL=http://localhost:3000
```

> **참고**: `NEXT_PUBLIC_` 접두사가 있는 환경 변수만 브라우저에서 접근 가능합니다.

## API 연동

백엔드 API(`zamtory-api`)와 연동 시:

```typescript
// 예시: API 호출
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

async function fetchData() {
  const response = await fetch(`${API_URL}/api/endpoint`);
  return response.json();
}
```

## 코딩 컨벤션

### 디렉토리 구조 권장사항

```
src/
├── app/                  # Next.js 페이지 (App Router)
│   ├── (auth)/          # 라우트 그룹 (인증 관련)
│   ├── dashboard/       # 대시보드 페이지
│   └── ...
├── components/          # 재사용 가능한 컴포넌트
│   ├── ui/             # 기본 UI 컴포넌트
│   └── features/       # 기능별 컴포넌트
├── lib/                # 유틸리티 함수, 헬퍼
├── hooks/              # 커스텀 React 훅
├── types/              # TypeScript 타입 정의
└── styles/             # 추가 스타일 파일
```

### 컴포넌트 작성 가이드

```typescript
// 함수형 컴포넌트 사용
export default function ComponentName() {
  return <div>...</div>;
}

// 또는 named export (재사용 컴포넌트)
export function Button({ children }: { children: React.ReactNode }) {
  return <button>{children}</button>;
}
```

### Import Alias

`@/*` 패턴을 사용하여 절대 경로로 import 가능:

```typescript
// tsconfig.json에 설정됨
import { Component } from '@/components/Component';
import { helper } from '@/lib/helper';
```

## 타입 공유 (향후)

백엔드 API와 타입을 공유하려면:

1. **옵션 A**: `zamtory-api`의 `packages/types` 패키지 사용
```bash
yarn add file:../zamtory-api/packages/types
```

2. **옵션 B**: API 응답 타입을 `src/types/api.ts`에 정의

```typescript
// src/types/api.ts
export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse {
  accessToken: string;
  refreshToken: string;
}
```

## 배포

### Vercel (권장)

```bash
# Vercel CLI 설치
yarn global add vercel

# 배포
vercel
```

### 다른 플랫폼
- **Netlify**: Next.js 지원
- **Cloudflare Pages**: Static Export 사용
- **Self-hosted**: Docker + Node.js 서버

## 주요 참고사항

- Next.js 15는 App Router가 기본입니다 (Pages Router 아님)
- React 19의 새로운 기능 사용 가능 (Server Components, Actions 등)
- Tailwind CSS 4 사용 중 (최신 버전)
- 모든 페이지는 기본적으로 Server Components입니다
- 클라이언트 상태가 필요한 경우 `'use client'` 디렉티브 사용

## 추가 리소스

- [Next.js 문서](https://nextjs.org/docs)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
- [React 19 문서](https://react.dev)
