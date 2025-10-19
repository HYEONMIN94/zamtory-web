# Zamtory Web

Zamtory 프론트엔드 애플리케이션 - Next.js 15 (App Router)

> **백엔드**: 별도 저장소 [`zamtory-api`](https://github.com/HYEONMIN94/zamtory)에서 관리

## 시작하기

### 필수 요구사항

- Node.js 20+
- Yarn

### 설치

```bash
yarn install
```

### 개발 서버 실행

```bash
yarn dev
```

브라우저에서 http://localhost:3000 을 열어주세요.

### 프로덕션 빌드

```bash
# 빌드
yarn build

# 빌드된 앱 실행
yarn start
```

## 기술 스택

- **Next.js** 15.5 - React 프레임워크 (App Router)
- **React** 19.1 - UI 라이브러리
- **TypeScript** 5.x - 타입 안전성
- **Tailwind CSS** 4.x - 유틸리티 기반 CSS
- **ESLint** - 코드 품질 관리

## 프로젝트 구조

```
src/
└── app/              # Next.js App Router 페이지
    ├── layout.tsx    # 루트 레이아웃
    ├── page.tsx      # 홈 페이지
    └── globals.css   # 글로벌 스타일
```

## 환경 변수

`.env.local` 파일에 환경 변수를 설정하세요:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## 배포

[Vercel](https://vercel.com)을 통한 배포를 권장합니다.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## 개발 가이드

자세한 개발 가이드는 [CLAUDE.md](./CLAUDE.md)를 참고하세요.

## 추가 리소스

- [Next.js 문서](https://nextjs.org/docs)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
