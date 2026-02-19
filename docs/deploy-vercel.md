# Vercel Deployment Guide

기준일: 2026-02-11  
프로젝트: `tak-djang-design-studio`

## 1) 배포 전 로컬 확인
1. `npm install`
2. `npm run lint`
3. `npm run build`
4. 주요 경로 확인
- `/`
- `/portfolio/[slug]` (SSG 3개 샘플)
- `/privacy`
- `/robots.txt`
- `/sitemap.xml`

## 2) Vercel 프로젝트 생성
1. Vercel Dashboard에서 GitHub 저장소 Import
2. Framework Preset: `Next.js`
3. Root Directory: `/` (repo root)
4. Build Command: 기본값(`next build`) 사용
5. Output 설정: 기본값 사용

## 3) 환경변수 설정 (Production/Preview)
아래 3개를 Vercel Environment Variables에 등록:
- `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`

권장:
- Preview/Production 모두 동일 키를 먼저 설정
- 운영 전 `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`를 테스트 템플릿에서 운영 템플릿으로 교체

## 4) 배포 후 스모크 테스트
1. 홈 진입 후 CTA 클릭 -> 문의 섹션 이동 확인
2. 문의 폼 유효성/실패 UI 확인
3. 포트폴리오 카드 클릭 -> 상세 페이지 이동 확인
4. `robots.txt`, `sitemap.xml` 접근 확인
5. 모바일(375px)에서 CTA 터치 영역/레이아웃 확인

## 5) 오픈 이슈(배포 차단 아님, 권장)
1. `src/app/portfolio/[slug]/page.tsx` Hero 이미지 TODO 제거
2. `src/lib/constants.ts` 카카오 채널 URL 플레이스홀더 교체
3. PRD 9.5 디자인 게이트(퍼스트뷰 3안 비교) 수행
