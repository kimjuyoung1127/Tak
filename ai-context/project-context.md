# 프로젝트 컨텍스트 (Tak)

기준일: 2026-02-10 (KST)
프로젝트명: Tak Djang Design Studio
기준 문서: `docs/prd.md`

## 1) 한 줄 정의
온라인 셀러가 신뢰할 수 있는 디자이너를 빠르게 판단하고 상담 문의로 전환하도록 돕는 포트폴리오 중심 리드 전환 웹사이트.

## 2) 왜 만드는가
- 포트폴리오 노출만으로는 고관여 잠재고객의 문의 전환이 낮음
- "예쁜 디자인" 중심 메시지 대신 "매출/설득/전략" 언어로 차별화 필요
- SEO 기반 유입과 문의 폼/고정 CTA 기반 전환 흐름을 함께 설계해야 함

## 3) 대상 사용자
- 상세페이지 품질을 높이고 싶은 온라인 셀러
- 브랜드 담당자/소상공인
- 상담 후 프로젝트 진행 가능성을 검토하는 잠재 고객

## 4) 핵심 가치 (USP)
1. 기획 중심 디자인: 시장조사/트렌드 분석 기반 설계
2. 효율적 프로세스: 1차 콘티로 방향 합의 후 제작
3. 올인원 제공: 기획 + 촬영 + 디자인 + 원본 제공
4. 명확한 견적: 길이 단위가 아닌 프로젝트 단위 정가 운영

## 5) 현재 상태와 기준선
- 현재 코드베이스: Next.js 14 App Router 기반 구현 완료 (빌드 성공, 10개 라우트)
- 구현 완료 항목:
  - 랜딩 7섹션 (Hero/Portfolio/Process/About/FAQ/Contact/FinalCTA)
  - `/portfolio/[slug]` SSG (MDX frontmatter 파싱, 샘플 3개)
  - 문의 폼 (React Hook Form + Zod + EmailJS + honeypot 스팸 방지)
  - SEO (메타/OG/sitemap.xml/robots.txt)
  - 디자인 토큰 (컬러/타이포/간격/라운드/그림자)
- 협업 기준: `docs/prd.md`의 Next.js 목표 구조를 기준으로 계획/구현/리뷰 수행
- 결정 규칙: 문서 간 충돌 발생 시 `docs/prd.md` 우선

## 6) 핵심 도메인 모델 (PRD 기준)
- PortfolioItem
  - slug, title, category[], industry, deliverables[], kpi, thumbnail, heroImage, publishedAt, featured, tags[]
- Tag
  - name, slug
- InquiryPayload
  - name, brandOrStore, contact, inquiryType, budgetRange, deadline, message, privacyConsent

## 7) 라우팅 목표
- `/`: 랜딩 원페이지 (Hero/Portfolio/Process/About/Contact)
- `/portfolio/[slug]`: 포트폴리오 상세
- `/privacy`: 개인정보 처리방침
- `/sitemap.xml`, `/robots.txt`: SEO 운영 경로

## 8) 외부 서비스 연동
- EmailJS (문의 폼 전송)
  - Service ID: `service_yinltre` (Gmail API)
  - Template ID: `__ejs-test-mail-service__` (테스트용 — 운영 시 커스텀 템플릿 교체 필요)
  - Public Key: `VTk3S8YfWWEyaL4Fu`
  - 수신 메일: `gmdqn2tp@gmail.com`
  - 설정 파일: `.env.local` (git 미추적)
  - 운영 전 TODO: EmailJS 대시보드에서 커스텀 템플릿 생성 후 Template ID 교체
- 카카오톡 채널: URL 미확정 (`src/lib/constants.ts` KAKAO_CHANNEL_URL 플레이스홀더)

## 9) 비기능/운영 원칙
- SEO: SSR/SSG, 메타/OG, sitemap/robots 우선
- 성능: LCP/CLS/INP와 이미지 최적화 중심
- 접근성: 키보드 포커스/명확한 CTA/폼 오류 메시지 준수
- 유지보수: 콘텐츠 스키마 일관성, 상대경로 기준 문서화 유지

## 10) 협업 역할 고정
- Claude: 구현 담당
- Codex: 리뷰/검증 담당

## 11) 문서 운영 원칙
- 협업 기준 문서는 `ai-context`만 사용
- 작업 종료 시 `worklog.md`, `review-log.md` 갱신
- 날짜는 `YYYY-MM-DD` 형식 사용
