# 협업 인수인계 (Tak)

기준일: 2026-02-11 (KST)  
기준 문서: `docs/prd.md`  
협업 기준: `ai-context/*`

## 1) 현재 상태 요약
- Next.js 14 App Router 기반 구현 완료
- `npm run build` 성공 (정적/SSG 라우트 생성 확인)
- 랜딩 7섹션 + 포트폴리오 상세 + 문의 폼 + SEO(sitemap/robots) 구현
- PortfolioSection은 9슬롯 구성 + 그룹 사이 Strategy 카드 반영 상태

## 2) 배포 전 필수 확인
1. `npm run lint`
2. `npm run build`
3. 환경변수 3개 설정 확인
- `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`

## 3) 남은 중요 작업
1. `src/app/portfolio/[slug]/page.tsx` Hero 이미지 TODO 제거
2. `src/lib/constants.ts` 카카오 채널 URL 플레이스홀더 교체
3. EmailJS 테스트 템플릿 -> 운영 템플릿 교체
4. PRD 9.5 디자인 게이트(퍼스트뷰 3안 비교) 수행

## 4) Vercel 배포 체크
1. Vercel 프로젝트 Import 후 Framework `Next.js` 확인
2. Preview/Production 환경변수 등록
3. 배포 후 경로 확인:
- `/`
- `/portfolio/[slug]`
- `/privacy`
- `/robots.txt`
- `/sitemap.xml`

## 5) 참고 문서
1. `ai-context/master-plan.md`
2. `ai-context/project-context.md`
3. `ai-context/claude-coding-guideline.md`
4. `ai-context/codex-review-guideline.md`
5. `ai-context/review-log.md`
6. `docs/prd.md`
7. `docs/deploy-vercel.md`
