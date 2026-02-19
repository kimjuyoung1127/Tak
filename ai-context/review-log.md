# 리뷰 로그 (Tak)

기준 폴더: `ai-context`
기준 시간: KST

## 작성 규칙
- 심각도 순: 치명적 -> 높음 -> 보통 -> 낮음
- 형식: `[심각도] 파일:라인 - 문제 - 영향 - 수정 제안`
- 리뷰 결론(머지 가능/조건부/불가)을 반드시 기록

## 템플릿
### [YYYY-MM-DD HH:mm KST] 리뷰 대상
- 범위:
- 전체 위험도:
- 최종 판단:

#### 이슈
- [심각도] `파일:라인` - 문제 - 영향 - 수정 제안

#### 검증 항목
1. 라우팅/핵심 플로우 확인
2. 폼 전환/실패 처리 확인
3. SEO/메타/링크 확인

#### 잔여 리스크
- 코드 미구현 영역 또는 추후 검증 필요 항목 명시

## 기록
### [2026-02-11 02:00 KST] 코드리뷰 긴급 이슈 수정 완료
- 범위: `src/lib/emailjs.ts`, `src/components/sections/PortfolioSection.tsx`, `src/app/portfolio/[slug]/page.tsx`
- 전체 위험도: 낮음 (긴급 3건 해소)
- 최종 판단: 머지 가능 (중요 이슈 2건은 후속 작업)

#### 수정 내역
- [해결] `src/lib/emailjs.ts:18` - `throw new Error()`로 변경하여 ContactSection이 에러 상태를 정상 노출
- [해결] `src/components/sections/PortfolioSection.tsx:79,189` - 존재하지 않는 `/portfolio` 링크 2개 제거
- [확인] `src/app/portfolio/[slug]/page.tsx` - BOM 없음, UTF-8 한글 텍스트 정상. 인코딩 깨짐 현재 재현 불가

#### 미해결 (중요)
- [보통] `src/app/portfolio/[slug]/page.tsx:89` - Hero 이미지 TODO 상태 → 실제 이미지 적용 필요
- [보통] `src/lib/constants.ts:112` - 카카오 채널 URL 플레이스홀더 → 운영 URL 확정 대기

#### 검증 항목
1. `npm run build` 성공 (10개 라우트 정상 생성, 에러 없음)
2. EmailJS 환경변수 미설정 시 에러 throw → catch → 에러 UI 노출 흐름 확인
3. `/portfolio` 404 링크 제거 확인

#### 잔여 리스크
- 자동화 테스트 부재 (회귀 리스크)
- Hero 이미지 플레이스홀더 (포트폴리오 증거력 부족)
- 카카오 채널 CTA 미연결

### [2026-02-11 01:20 KST] 코드리뷰 (핵심 전환 플로우/라우팅/상세 페이지)
- 범위: `src/app/page.tsx`, `src/components/sections/ContactSection.tsx`, `src/lib/emailjs.ts`, `src/components/sections/PortfolioSection.tsx`, `src/app/portfolio/[slug]/page.tsx`, `src/lib/constants.ts`
- 전체 위험도: 높음
- 최종 판단: 조건부 (긴급 이슈 수정 후 머지 가능)

#### 이슈
- [높음] `src/lib/emailjs.ts:18` - EmailJS 환경변수 미설정 시 전송 실패를 성공처럼 처리 - 문의 전환 데이터 손실/오인 - 환경변수 미설정 시 예외 throw 또는 실패 상태 반환으로 수정
- [높음] `src/components/sections/PortfolioSection.tsx:79` - `/portfolio` 링크가 존재하지만 라우트 없음 - 사용자 404 유입 - `/portfolio` 페이지 추가 또는 CTA 링크 제거/대체
- [높음] `src/app/portfolio/[slug]/page.tsx:27` - 상세 페이지 주요 텍스트 인코딩 깨짐 - 신뢰도 저하 및 가독성 손상 - 깨진 문자열 전면 교체(UTF-8 정규화)
- [보통] `src/app/portfolio/[slug]/page.tsx:89` - Hero 이미지 TODO 상태로 실제 이미지 미노출 - 핵심 포트폴리오 증거 약화 - `next/image`로 실제 이미지 렌더링 적용
- [보통] `src/lib/constants.ts:112` - 카카오 채널 URL 플레이스홀더 - 전환 CTA 실효성 저하 - 운영 URL 확정 후 상수 교체

#### 검증 항목
1. `npm run build` 성공 확인 (Next.js 14.2.35, 정적/SSG 10개 라우트 생성)
2. 홈 → 포트폴리오 → 문의 플로우 수동 점검
3. 문의 전송 성공/실패 상태 분기 확인

#### 잔여 리스크
- 자동화 테스트 부재로 링크/폼/카피 회귀 재발 가능성 존재

### [2026-02-11 01:00 KST] 핵심 기능 구현 완료 — Codex 리뷰 요청
- 범위: 전체 코드베이스 (Next.js 14 초기 구현)
- 전체 위험도: 리뷰 대기
- 최종 판단: Codex 리뷰 대기

#### 리뷰 대상 파일 (신규)
**설정 (7개)**
- `package.json` — 의존성 정의
- `tsconfig.json` — TypeScript 설정
- `next.config.mjs` — Next.js 설정
- `tailwind.config.ts` — 디자인 토큰 (컬러/타이포/간격/라운드/그림자)
- `postcss.config.mjs` — PostCSS
- `components.json` — shadcn/ui 설정
- `.eslintrc.json` — 린트 규칙

**핵심 소스 (20개)**
- `src/app/layout.tsx` — 루트 레이아웃 (Pretendard CDN + 메타/OG + metadataBase)
- `src/app/globals.css` — 글로벌 스타일 (포커스 링 + reduced motion)
- `src/app/page.tsx` — 랜딩 (서버 컴포넌트, MDX 데이터 → 7섹션)
- `src/app/not-found.tsx` — 404
- `src/app/privacy/page.tsx` — 개인정보처리방침
- `src/app/sitemap.ts` — 동적 sitemap (정적 + 포트폴리오 slug)
- `src/app/robots.ts` — robots.txt
- `src/app/portfolio/[slug]/page.tsx` — 포트폴리오 상세 (SSG + 동적 메타 + 유사 추천)
- `src/components/layout/Header.tsx` — 반응형 헤더 (스크롤 축소 + 모바일 메뉴 + ARIA)
- `src/components/layout/Footer.tsx` — 4열 푸터
- `src/components/layout/FloatingCTA.tsx` — 고정 카카오톡 CTA
- `src/components/sections/HeroSection.tsx` — Hero (PRD 카피 + Framer Motion)
- `src/components/sections/PortfolioSection.tsx` — Masonry 4종 카드 (MDX 연동)
- `src/components/sections/ProcessSection.tsx` — 4단계 프로세스
- `src/components/sections/AboutSection.tsx` — 소개 (PRD 6.1.4 카피)
- `src/components/sections/FAQSection.tsx` — FAQ 아코디언 (단일 확장)
- `src/components/sections/ContactSection.tsx` — 문의 폼 (RHF + Zod + EmailJS + 스팸 방지)
- `src/components/sections/FinalCTASection.tsx` — 다크 최종 CTA
- `src/lib/content/portfolio.ts` — MDX frontmatter 파싱/조회/추천
- `src/lib/emailjs.ts` — EmailJS 전송 (환경변수 미설정 시 fallback)
- `src/lib/utils.ts` — cn() 유틸
- `src/lib/constants.ts` — 브랜드 카피/프로세스/FAQ/옵션 상수
- `src/types/index.ts` — PortfolioItem/InquiryPayload 등 타입

**콘텐츠 (3개)**
- `content/portfolio/beauty-skincare-renewal.mdx`
- `content/portfolio/food-smartstore-launch.mdx`
- `content/portfolio/living-brand-package.mdx`

#### Codex 검증 요청 항목 (`codex-review-guideline.md` 기준)
1. **라우팅 정상성** — `/`, `/portfolio/[slug]` 3개, `/privacy`, `/sitemap.xml`, `/robots.txt`
2. **CTA → 문의 폼 전환 플로우** — Hero CTA, About CTA, FAQ CTA, FinalCTA → `#contact` 스크롤
3. **문의 폼 성공/실패/스팸 방지** — Zod 유효성 + EmailJS 전송 + honeypot + 실패 시 카카오 안내
4. **메타/OG/sitemap/robots** — `metadataBase` + 동적 포트폴리오 메타 + sitemap 자동 생성
5. **모바일/데스크톱 레이아웃** — 전 CTA min-h-[48px] + 모바일 nav ARIA + 반응형 그리드
6. **콘텐츠 스키마 정합성** — MDX frontmatter ↔ PortfolioItem 타입 일치
7. **디자인 시스템 일관성** — tailwind.config.ts 토큰 기준 컬러/라운드/그림자 적용
8. **PRD 9.2~9.5 반영** — 비주얼 시스템/섹션 규칙/모션 기준/품질 게이트

#### 알려진 미완료 항목
- EmailJS Template ID가 테스트용 (`__ejs-test-mail-service__`) — 커스텀 템플릿 교체 필요
- 카카오톡 채널 URL 플레이스홀더 상태
- 포트폴리오 이미지 미적용 (플레이스홀더)
- PRD 9.5 품질 게이트 1~4번 (퍼스트뷰 시안 비교) 미수행
- 성능 점검 (Lighthouse) 미수행
- 기존 정적 파일 (`index.html`, `style.css`, `js/app.js`) 정리 미수행

### [2026-02-10 22:30 KST] ai-context 문서 전환 리뷰 (Tak 기준)
- 범위: `ai-context/*.md`
- 전체 위험도: 낮음
- 최종 판단: 머지 가능

#### 확인 결과
- `docs/prd.md` 단일 기준으로 문서 우선순위가 통일됨
- 역할 인터페이스가 Claude(구현)/Codex(리뷰)로 고정됨
- 타 프로젝트 문맥 제거 확인

#### 잔여 리스크
- 실제 Next.js 코드가 아직 미구현이므로 기능 검증은 후속 구현 단계에서 필요
