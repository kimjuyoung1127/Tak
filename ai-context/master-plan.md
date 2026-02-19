# Tak Master Plan

기준일: 2026-02-10 (KST)
프로젝트: Tak Djang Design Studio
협업 폴더: `ai-context`

## 1) 시작 문서 경로 (레포 루트 기준)
1. `ai-context/master-plan.md`
2. `ai-context/project-context.md`
3. `ai-context/claude-coding-guideline.md`
4. `ai-context/codex-review-guideline.md`
5. `ai-context/worklog.md`
6. `ai-context/review-log.md`
7. `ai-context/day-close-checklist.md`
8. `ai-context/handover.md`

## 2) 제품 기준 문서 (Source of Truth)
1. `docs/prd.md`

## 3) 현재 단계와 목표
- 현재 단계: 구현 단계 (핵심 기능 구현 완료, 코드리뷰 수정 대기)
- 완료 항목:
  - [x] Next.js 14 App Router + TypeScript + Tailwind + shadcn 세팅
  - [x] IA/라우팅 구조 확정 (10개 라우트, `npm run build` 성공)
  - [x] 랜딩 7섹션 (Hero/Portfolio/Process/About/FAQ/Contact/FinalCTA)
  - [x] Portfolio 9슬롯(3-3-3) + 그룹 사이 멘트카드(계단식) 반영
  - [x] `/portfolio/[slug]` SSG + MDX frontmatter 파싱 (샘플 3개)
  - [x] 문의 폼 (RHF + Zod + EmailJS `service_yinltre` + honeypot)
  - [x] SEO 메타/OG/sitemap.xml/robots.txt
  - [x] 디자인 토큰 초안 (컬러/타이포/간격/카드 라운드·그림자)
  - [x] 모바일/접근성 안정화 (CTA 48px 터치, ARIA, 반응형)
  - [x] EmailJS 연동 (`service_yinltre` + 테스트 템플릿 + 환경변수)
- 현재 목표:
  - Codex 리뷰 이슈 수정 후 머지 판단
  - 비주얼 정교화 (퍼스트뷰 시안 비교)
  - 포트폴리오 실데이터 9개 확장 (현재 3개를 9슬롯으로 순환 노출)
  - EmailJS 커스텀 템플릿 교체 (현재 테스트 템플릿)
  - 카카오톡 채널 URL 확정
  - 배포 전 전환 경로(문의 전송/포트폴리오 링크/상세 카피) 안정화

## 4) 핵심 규칙
- 문서 충돌 시 `docs/prd.md`를 최우선으로 따른다.
- 역할 고정:
  - Claude: 구현 담당
  - Codex: 리뷰/리스크 검증 담당
- 협업 기준은 PRD 목표 아키텍처(Next.js 중심)를 따른다.
- 레퍼런스 디자인은 복제가 아니라 구조/전환 전략 재해석 원칙으로 적용한다.
- `docs/prd.md`의 `9. 레퍼런스 디자인 반영 가이드`와 `9.5 품질 게이트`는 필수 준수 항목이다.
- 현재 정적 코드(`index.html`, `style.css`, `js/app.js`)는 초기 상태로만 기록한다.
- 검증 명령은 Node/npm 도입 기준으로 문서화한다 (`npm run build` 중심).

## 5) 우선순위 백로그
1. [긴급] EmailJS 미설정 시 성공 처리되는 문의 폼 오동작 수정
2. [긴급] `/portfolio` 라우트 부재로 인한 404 링크 수정 (`/portfolio` 페이지 추가 또는 링크 제거)
3. [긴급] `src/app/portfolio/[slug]/page.tsx` 인코딩 깨짐 텍스트 정정
4. [중요] 상세 페이지 Hero 이미지 TODO 제거 (`next/image` 실제 렌더링 적용)
5. [중요] 카카오 채널 URL 확정 및 전체 CTA 연결
6. [중요] 포트폴리오 MDX 실데이터 9개 확장 (중복 슬롯 제거)
7. 디자인 품질 게이트 점검(퍼스트뷰 3안 비교 + 최종안 확정)
8. EmailJS 커스텀 템플릿 생성 및 교체
9. 성능 점검 (LCP/CLS/INP) 및 이미지 최적화
10. Vercel 배포 + 도메인 연결
11. 완료 항목 정리:
    - App Router 기준 IA/폴더 구조 설계
    - 비주얼 시스템 토큰 초안 확정
    - 랜딩 섹션 7종 컴포넌트화
    - Portfolio 9슬롯(3-3-3) 및 태그 기반 멘트카드 적용
    - `/portfolio/[slug]` 상세 라우팅 및 콘텐츠 스키마 연결
    - 문의 폼(React Hook Form + Zod + EmailJS) 구현
    - SEO 기본 세트(메타/OG/sitemap/robots) 반영
    - 모바일/데스크톱 레이아웃 안정화 및 접근성 보완

## 6) Phase 전환 기준
- 기획 -> 구현 진입 조건:
  - 섹션 구조, 라우팅, 콘텐츠 스키마가 `docs/prd.md` 기준으로 확정됨
  - 문의 전환 플로우와 SEO 기준이 작업 항목으로 명시됨
- 구현 -> 안정화 진입 조건:
  - 핵심 사용자 플로우(랜딩 -> 포트폴리오 -> 문의)가 끊기지 않음
  - `npm run build` 기준 오류 없이 빌드 가능
  - `docs/prd.md` 9.5 품질 게이트 5개 항목 모두 충족

## 7) 문서 신선도 규칙
- 협업 기준은 `ai-context` 문서만 사용한다.
- 제품 기준 변경 시 당일 `master-plan.md`와 `project-context.md`를 동기화한다.
- 작업 종료 시 `worklog.md`와 `review-log.md`를 같은 턴에 갱신한다.
- 절대경로 대신 레포 루트 상대경로만 사용한다.

## 8) 완료 보고 형식
- 변경 요약
  1. 파일/기능
  2. 핵심 로직
  3. 영향 범위
- 검증
  1. 실행 명령 (`npm run build`, 필요 시 `npm run dev`)
  2. 결과(성공/실패 + 핵심 로그)
- 리스크
  1. 남은 이슈
  2. 후속 작업
