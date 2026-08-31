# /self-review — 자기 리뷰

코드/문서 변경 후 스스로 체크하는 절차.

## Before Submit

- [ ] `npm run build` 성공
- [ ] 타입, 린트 에러 0건
- [ ] 주석/설명 문법 확인
- [ ] 민감 정보(secret, API key) 미포함
- [ ] Tier 2 문서 동기화 확인 (change-class-doc-sync)

## After Write/Edit (hooks)

자동 실행:
- `self-review-gate.sh` — 마크다운 형식 체크
- `doc-drift-reminder.sh` — 문서 동기화 리마인더

## 큰 변경 시

- `socratic-review` 하네스 사용 (5개 질문)
- `DECISION-LOG.md` 기록

## Reference

- `harnesses/claude-code-health.md` — 컨텍스트/보안 점검
- `docs/governance/document-management.md` — Tier 우선순위
