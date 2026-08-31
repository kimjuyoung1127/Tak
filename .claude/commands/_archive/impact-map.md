# /impact-map — 영향도 맵핑

코드 변경이 미치는 범위를 시각화한다.

## When

- 큰 리팩터 전
- 공유 컴포넌트/라이브러리 변경 시
- 외부 서비스 통합 변경 시

## Flow

1. **변경 파일 목록** (git diff 또는 수동)
   ```bash
   git diff --name-only HEAD~1
   ```

2. **영향받는 파일 추적**
   ```bash
   # 임포트 검색
   rg -l 'from.*@/lib/emailjs' src/
   rg -l 'import.*Contact' src/
   ```

3. **영향 단계**
   - Tier 0: 실제 코드 파일
   - Tier 1: 이 파일에 의존하는 컴포넌트
   - Tier 2: 영향받는 페이지/라우트
   - Tier 3: 문서 갱신 필요 여부

4. **테스트 범위**
   - 직접 변경된 파일
   - 1단계 의존처
   - 2단계 통합 페이지

## Output

표 또는 그래프:
```
emailjs.ts 변경
├─ Contact.tsx 영향
│  └─ / (메인 페이지)
│     └─ 폼 제출 smoke test
└─ docs 갱신: project-context.md
```

## 참고

- `harnesses/change-class-doc-sync.md` — 변경 클래스별 영향
- `docs/governance/document-management.md` — 문서 Tier
