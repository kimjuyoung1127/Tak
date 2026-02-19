# Claude Coding Guideline (Tak)

기준 폴더: `ai-context`
제품 기준 문서: `docs/prd.md`

## 1) 시작 순서
1. `ai-context/master-plan.md`
2. `ai-context/project-context.md`
3. `ai-context/worklog.md`
4. `ai-context/review-log.md`
5. `docs/prd.md`

## 2) 역할
- Claude는 구현 담당
- 기능 구현과 구조 정리는 `docs/prd.md` 기준으로 수행

## 3) 구현 원칙
- Next.js App Router 구조를 기본으로 사용
- TypeScript/Tailwind/shadcn-ui 기준으로 컴포넌트 일관성 유지
- 폼은 React Hook Form + Zod 기반 유효성 검증 적용
- 콘텐츠 데이터 구조(frontmatter/payload)는 PRD 정의와 일치시킴
- 하드코딩 문자열은 상수 또는 콘텐츠 레이어로 분리
- 레퍼런스 디자인은 복제가 아닌 재해석 원칙으로 적용 (`docs/prd.md` 9.1)
- 비주얼 시스템(컬러/타이포/간격/라운드/그림자)은 토큰 기준으로 먼저 확정

## 4) 필수 구현 체크
- 랜딩 섹션 구조: Hero/Portfolio/Process/About/Contact
- 포트폴리오 상세 라우팅: `/portfolio/[slug]`
- 문의 폼: 유효성/전송/실패 처리 경로
- SEO: 메타/OG/sitemap/robots 반영
- `docs/prd.md` 9.2~9.4 반영(비주얼 시스템/섹션 규칙/모션 기준)
- 퍼스트뷰 시안 3안 비교 후 1안 확정 기록
- `docs/prd.md` 9.5 품질 게이트 5개 항목 충족

## 5) 구현 전 필수 산출물
1. 디자인 토큰 초안
   - 컬러: Base/Surface/Accent/CTA Zone
   - 타이포: 헤드라인/본문/숫자 스케일
   - 레이아웃: 간격, 카드 라운드, 그림자 강도
2. 랜딩 퍼스트뷰 시안 3안
   - Hero/Portfolio/Final CTA가 포함된 동일 기준 캡처
3. 최종안 선택 근거 3줄
   - 무엇을 살리고 무엇을 버렸는지 명시

## 6) 완료 보고 형식
- 변경 요약
  1. 변경 파일
  2. 핵심 로직
  3. 영향 범위
- 검증
  1. 실행 명령 (`npm run build`, 필요 시 `npm run dev`)
  2. 결과
- 디자인 게이트 검증
  1. `docs/prd.md` 9.5 항목별 통과/미통과
  2. 퍼스트뷰/포트폴리오/Final CTA 캡처 링크 또는 경로
- 리스크/후속 작업

## 7) 기록 규칙
- 구현 완료 즉시 `ai-context/worklog.md` 업데이트
- Codex 리뷰 피드백 반영 시 `ai-context/review-log.md` 상태 갱신
- 문서 충돌 시 `docs/prd.md` 우선
