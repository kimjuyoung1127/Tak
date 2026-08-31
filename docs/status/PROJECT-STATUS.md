# Tak Djang Design Studio — Project Status

기준일: 2026-06-23
정본: `docs/prd.md` + `ai-context/master-plan.md`  
검증: `npm run build` (35개 라우트 통과)

## 현재 단계

**배포 완료 → 운영 모드 (점증적 개선)**

- [x] Next.js 14 App Router + TypeScript + Tailwind + Framer Motion 세팅 완료
- [x] 핵심 라우팅 (/, /portfolio/[slug], /services, /pricing, /portfolio, /blog-management, /contact, /contact/form, /contact/form/thank-you, /privacy) + sitemap.xml, robots.txt
- [x] 랜딩 7섹션 (Hero/Services/WebsiteLinkage/Pricing/Portfolio/Process/About/FAQ/Contact/FinalCTA)
- [x] **제작+홍보 연계 포지셔닝** (devfive 벤치마킹): `/services` `/pricing` `/portfolio` + 홈 신규 3섹션 완성
- [x] 포트폴리오 SSG (TS 레지스트리, 내부 상세 15개 + 외부 링크 1개: 탁몽 와디즈 펀딩 상세페이지)
- [x] 블로그운영 허브 (`/blog-management`, 금강이지스 현관중문 운영 사례 분리, 네비·푸터·sitemap 반영)
- [x] 문의 폼 (React Hook Form + Zod + EmailJS + honeypot)
- [x] **무료 진단 위저드** (`/contact/form`, 13문항 5단계, localStorage 저장, sendDiagnosis)
- [x] **디자인 에디토리얼 리디자인**: 오프화이트 배경, 근접 블랙 본문, Rose 브랜드, 카드 radius 축소, 플랫 그림자
- [x] **카피 정제**: Hero/FinalCTA/Services/Pricing에서 AI 티(은유·부정병렬·막연한 마무리) 제거
- [x] **블랙 완전 제거**: primary 로즈·footer 라이트·FinalCTA 라이트·FloatingCTA 로즈톤
- [x] 모션 토큰 (SSOT: `src/lib/motion.ts`, duration/easing)
- [x] UI 프리미티브 (Button, Badge, Card, Section, Reveal, MediaFrame)
- [x] **SEO 강화** (JSON-LD 35개 라우트 주입, OG 이미지 동적 생성, sitemap/robots SSOT)
- [x] 모바일/데스크톱 레이아웃 + 접근성 개선

## 활성 트랙

1. **색인 반영 모니터링** (구글/네이버 며칠~2주 소요)
   - Google Search Console: 소유확인 통과, sitemap 제출 완료
   - Naver Search Advisor: 소유확인 통과, sitemap 제출 완료
   - IndexNow: 키파일 배포, 202 Accepted (6 URL)
2. **분석 데이터 반영 모니터링** (GA4/네이버 관리 화면)
   - GA4 (G-QE6BN0V7VM): gtag.js 200, google-analytics/g/collect 204 확인, `generate_lead` 주요 이벤트 표시 대기
   - 네이버 wcs (443e9d63b3a7d): wcs.pstatic.net/wcslog.js 라이브 주입 확인
   - 메타픽셀: 미사용(ID 미입력, 정상 no-op)
3. **포트폴리오 실데이터**: 내부 상세 15개 운영 (멀티스트랩 → 트레이커버 → 베이비룸 → 워터젤리 → 유아침대 → 유아매트 → 유아 헤어핀 우선 노출)

## 라우팅 현황

| Route | Status | Notes |
|---|---|---|
| `/` | ✓ 완료 | 원페이지 랜딩 (Hero + Services + WebsiteLinkage + PricingTeaser + Portfolio + **Testimonials** + Process + About + FAQ + Contact + FinalCTA) |
| `/services` | ✓ 완료 | 제작+홍보 연계 4-서비스 모델 (devfive 벤치마킹) |
| `/takmong` | ✓ 완료 | AI 템플릿 스토어 (탁몽 제품 펀딩 성과 · 리워드 4종 + 스마트스토어 판매 2종) |
| `/templates/[slug]` | ✓ 완료 | AI 템플릿 상세 (SSG) |
| `/pricing` | ✓ 완료 | build/care/ads 가격 + 비교표 + FAQ |
| `/portfolio` | ✓ 완료 | 포트폴리오 목록 |
| `/portfolio/[slug]` | ✓ 완료 | SSG, MDX 파싱 |
| `/blog-management` | ✓ 완료 | 블로그운영 사례 허브 (금강이지스 현관중문) |
| `/contact` | ✓ 완료 | 진단 상담 카드 랜딩 |
| `/contact/form` | ✓ 완료 | 13문항 5단계 무료 진단 위저드 (localStorage, sendDiagnosis) |
| `/contact/form/thank-you` | ✓ 완료 | 감사 페이지 |
| `/privacy` | ✓ 완료 | 법률 텍스트 |
| `/sitemap.xml` | ✓ 완료 | SEO |
| `/robots.txt` | ✓ 완료 | SEO |

## 웹 품질 (2026-08-31 실측)

`addyosmani/web-quality-skills` 감사 기준. 로컬 프로덕션 빌드 Lighthouse 12.8.2 모바일.
재현: `bash scripts/quality-gate.sh / /portfolio/baby-hairpin ...` → `.audit/*.json`
계약: `docs/goals/GOAL-web-quality.md`

| 지표 | 이전(운영 실측) | 현재 |
|---|---|---|
| `/portfolio/baby-hairpin` 전송량 | 82,612 KiB | **1,332 KiB** |
| 상세 페이지 CLS | 1.656 | **0** |
| 홈 FCP (모바일) | 5.4s | **0.9s** |
| Accessibility (전 라우트) | 85 | **100** |
| SEO | 100 | **100** |
| Best Practices | 79 | 79 (Google Ads 쿠키가 상한 — 코드로 못 올림) |

- GIF 36개 → mp4+webm 전환 (134.6MB → 12.6MB), 원본은 `assets-src/gif-originals/` 보존
- Pretendard 자체 호스팅 (`next/font/local`) — jsdelivr 렌더 차단 제거
- 보안 헤더 5종 적용, CSP 는 **Report-Only** (운영 위반 0 확인 후 강제로 승격)

## 검증 상태

- `npm run build`: **성공** (라우트 증가, 타입체크, 린트 포함)
- `npm run lint`: **클린**
- `npx tsc --noEmit`: **클린**
- 모바일 (375px) smoke: **양호**
- 데스크톱 (1440px) smoke: **양호**
- 위저드 e2e (검증 차단/단계 진행): **확인됨**
- 문의 폼: **EmailJS 실연동 완료** (HTTP 200, reply-to·to_email 지원)
- 무료 진단: **실제 발송 검증** (E2E 통과)
- 카카오톡 채널: **실제 링크 연결** (open.kakao.com/o/suSdZzs)

## 다음 액션 (우선순위 순)

1. **SEO 색인 모니터링** (완료: 검색엔진 등록·소유확인·sitemap 제출)
   - [x] Google Search Console 소유확인 통과
   - [x] Naver Search Advisor 소유확인 통과
   - [x] Sitemap 제출 완료 (구글/네이버)
   - [x] IndexNow 키파일 배포 + 색인 통보
   - [ ] 색인 반영 확인 (며칠~2주 소요)

2. **스마트스토어 판매 채널 운영**
   - [x] 스마트스토어 상품 2종 등록 (AI 템플릿 99,000원 / 상담 29,000원)
   - [x] 템플릿 상세 페이지 SSG 구현 및 상품 링크 연결
   - [ ] 판매 분석 및 리뷰 모니터링

3. **포트폴리오 실데이터 운영**
   - [x] 신규 6개 포토셋 추가 (유아 헤어핀, 유아매트, 쿠키, 베이비룸, 멀티스트랩, 트레이커버)
   - [x] 랜딩/목록 최상단 우선순위 적용
   - [x] 주요 썸네일 5장 교체
   - [ ] 이미지 용량 예산 추가 점검

4. **성능 모니터링**
   - [x] 운영 배포 점검(2026-06-18): 하이드레이션·캐싱·이미지·TTFB 실측 양호. 1차 자동점검 오진 2건 교차검증 기각(정적자산 max-age 오진·캐러셀 속도 cold-start 과장)
   - [ ] Vercel Analytics (LCP/CLS/INP 점검) — 수집 대기 중
   - [ ] Lighthouse 실측 (desktop/mobile) — 선택사항

## 최근 변경 요약 (최근 5개)

**포트폴리오 썸네일·순서 재고정(2026-06-23)**: 멀티스트랩·트레이커버·베이비룸·유아매트·유아 헤어핀 썸네일 5장을 운영자 제공 이미지로 교체. 랜딩/목록 순서는 멀티스트랩 → 트레이커버 → 베이비룸 → 워터젤리 → 유아침대 → 유아매트 → 유아 헤어핀으로 재고정. Codex 전역 서비스 티어를 fast에서 normal로 전환. `npm run build` 성공(35개 라우트), Vercel production 배포 완료(`dpl_4jv8VVzKENuWWc5Y6prPcpt85yJD`).

**포트폴리오 신규 6개 추가(2026-06-23)**: 유아 헤어핀·유아매트·쿠키·베이비룸·스트랩·트레이커버 상세페이지를 내부 SSG 포트폴리오로 추가. 랜딩/목록 최상단 순서는 유아 헤어핀 → 유아매트 → 쿠키 → 베이비룸 → 스트랩 → 트레이커버 → 유아침대 → 워터젤리 → 메밀베개. 서비스 섹션 모바일 줄맞춤 수정. `npm run build` 성공(35개 라우트).

**블로그운영 허브 분리(2026-06-23)**: 금강이지스 현관중문 블로그 운영 사례를 `/portfolio` 외부 카드에서 제거하고 `/blog-management` 허브로 분리. `npm run build` 성공(29개 라우트).

**운영 배포 점검(2026-06-18)**: https://takdijang.com 커밋 f80dc10 기준 배포 반영·하이드레이션·캐싱·속도·이미지 전부 건강 확인. Opus 직접 curl -sI/-w 교차검증 결과 1차 자동점검 오진 2건 기각(정적 자산 max-age·캐러셀 속도 cold-start 과장). 상세 실측값·오진 근거 `ai-context/worklog.md` 기록.

**고객 후기 섹션 신규 추가(2026-06-17)**: 랜딩 AboutSection 다음·PricingTeaserSection 앞에 `<TestimonialsSection>` 배선. 신규 데이터 SSOT(`src/lib/content/testimonials.ts`, 5개 항목 원문 보존+강점 태그), framer-motion 드래그/자동재생 캐러셀(`TestimonialCarousel.tsx`, 6초·hover/포커스 정지) + 접근성(aria-live/prefers-reduced-motion 존중). `npm run build` 성공(28개 라우트), 로컬 dev 후기 섹션 서버 렌더 확인.

**이전 변경**: 포트폴리오 컬러화, SEO 셋업(JSON-LD 28개·도메인 정정 takdjang→takdijang), 가격 개편(490k·990k 패키지), 사업자 정보·로고·히어로 배경영상·EmailJS·Vercel 배포. 상세: `ai-context/worklog.md`·`docs/status/DECISION-LOG.md`

## Handoff Capsule

**진입 체크리스트**:
- `ai-context/master-plan.md` (우선순위 백로그)
- `docs/prd.md` (제품 정본)
- `.env.local` 설정 후 `npm run build` (35개 라우트 + JSON-LD 검증)

**문서 계층**:
- 정본: `docs/prd.md` (제품)
- 협업: `ai-context/` (계획·로그)
- 현황: 이 파일 (얇은 대시보드, 60~110줄)
- 증거: `worklog.md` + `DECISION-LOG.md`
