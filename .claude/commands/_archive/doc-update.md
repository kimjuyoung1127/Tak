# /doc-update — 문서 동기화

문서 관리 체계에 따라 어떤 파일을 갱신할지 결정한다.

## 언제 쓰는가

코드 변경 후 "어떤 문서를 고쳐야 하지?" 할 때.

## Flow

1. **변경 클래스 분류** (change-class-doc-sync 하네스)
   - route/surface → `PROJECT-STATUS`, `DECISION-LOG`
   - schema/model → `project-context.md`
   - feature/flow → `PROJECT-STATUS`, `project-context.md`
   - config/env → `.env.local.example`, `DECISION-LOG`

2. **가장 가까운 정본 수정**
   - Tier 2 문서 우선 (`docs/status/`, `ai-context/`)
   - Tier 3은 참고만

3. **파생 문서 동기화**
   - `PROJECT-STATUS.md`: 주요 변경만 1~2줄
   - `DECISION-LOG.md`: 구조 결정은 전체 기록

4. **검증**
   - `npm run build`
   - 상태 문서 일관성 확인

## 참고

- `docs/governance/document-management.md` — Tier 모델
- `harnesses/change-class-doc-sync.md` — 변경 클래스 매트릭스
