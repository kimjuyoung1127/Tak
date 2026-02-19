# Codex Review Guideline (Tak)

기준 폴더: `ai-context`
제품 기준 문서: `docs/prd.md`

## 1) 시작 순서
1. `ai-context/master-plan.md`
2. `ai-context/project-context.md`
3. `ai-context/worklog.md`
4. `ai-context/review-log.md`
5. `docs/prd.md`

## 2) 역할
- Codex는 리뷰/검증 전담
- 우선순위: 동작 오류 -> 전환 플로우 -> 시각 품질 회귀 -> SEO/접근성 회귀 -> 데이터 정합성 -> 테스트 누락

## 3) 필수 점검 항목
- 라우팅 정상성 (`/`, `/portfolio/[slug]`, `/privacy`)
- CTA -> 문의 폼 전환 플로우 정상 여부
- 문의 폼 성공/실패/스팸 방지 처리
- 메타/OG/sitemap/robots 반영 여부
- 모바일/데스크톱 레이아웃 파손 여부
- 콘텐츠 스키마(frontmatter/payload) 정합성
- 디자인 시스템 일관성(컬러/타이포/간격/라운드/그림자) 여부
- 레퍼런스 반영 품질(`docs/prd.md` 9.2~9.5) 충족 여부
- 퍼스트뷰/포트폴리오/Final CTA 3컷의 브랜드 일관성 여부

## 4) 리뷰 기록 형식
- `[심각도] 파일:라인 - 문제 - 영향 - 수정 제안`
- 심각도 순서: 치명적 -> 높음 -> 보통 -> 낮음

## 5) 판단 기준
- 머지 가능: 치명적/높음 이슈 없음 + PRD 9.5 품질 게이트 충족
- 조건부: 보통 이슈 허용, 후속 작업 명시
- 머지 불가: 치명적 이슈, 핵심 플로우 차단, 또는 디자인 게이트 미충족

## 6) 기록 규칙
- 리뷰 완료 즉시 `ai-context/review-log.md` 누적
- 동일 이슈 재발 시 "재발" 표기와 원인 메모 추가
- 문서 충돌 시 `docs/prd.md`를 기준으로 판정
