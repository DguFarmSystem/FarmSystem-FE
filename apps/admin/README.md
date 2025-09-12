# React + Typescript + Tailwind 템플릿

- 개인적으로 빠르게 시작하려고 만든 보일러 플레이트
- 리액트 + vite 기반 클라이언트 사이드 SPA 앱을 만들때 사용

## 종속성

![stacks](https://go-skill-icons.vercel.app/api/icons?i=react,typescript,tailwindcss,pnpm,reactquery,axios,zustand)

```
- tailwindcss 4.0
- pnpm
- react-router v7 (data mode)
- @tanstack-query/react
- zod
- zustand
- axios
```

- `@/pages/_Layout`같은 Next.js식 임포트 가능

## 프로젝트 구조

```
src/
 ├─ apis/            # API 관련 코드 (자세한 규칙은 아래 참고)
 ├─ components/      # 재사용 가능한 UI 컴포넌트
 ├─ constants/       # 전역 상수
 |  ├─ path.ts       # URL 라우팅 상수 (타입 안정성 보장을 위해)
 |  └─ query-keys.ts # 탄스택 쿼리의 쿼리 키들 모음
 ├─ hooks/           # 커스텀 훅
 ├─ layouts/         # 레이아웃 컴포넌트 (헤더, 푸터 포함)
 ├─ lib/             # 유틸리티 함수 모음
 ├─ pages/           # 라우트 단위 페이지
 ├─ routes/          # 라우팅 관련 로직
 ├─ stores/          # Zustand 전역 상태
 ├─ styles/          # 전역 스타일
 ├─ types/           # 앱 전역 타입 정의
 └─ main.tsx         # 진입점
```

### apis/ 규칙 (상세)

```
apis/
 ├─ auth/          # 도메인 단위 (ex. 인증)
 │  ├─ dto/        # API 요청/응답 스키마 (zod)
 │  ├─ queries/    # GET 요청
 │  └─ mutations/  # POST, PUT, DELETE 요청
 └─ instance.ts    # Axios 공통 인스턴스
```

- 도메인 단위: `/auth`, `/user`, `/post` 처럼 서버 API 기준으로 폴더 분리
- **dto/**: 서버와 송수신하는 데이터의 타입/스키마 정의
- **queries/ vs mutations/**: React Query의 용도에 맞게 API 호출 분리
- **instance.ts**: 인증, 에러 핸들링, 재시도 로직 포함한 Axios 인스턴스

## 시작

```
pnpm install
pnpm run dev
```
