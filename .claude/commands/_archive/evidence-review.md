# /evidence-review — 증거 검토

변경이 실제로 의도한 대로 작동하는지 실행 결과로 검증한다.

## When

- 배포 전 최종 점검
- 큰 리팩터 후
- 버그 수정 후 smoke test

## Flow

1. **빌드 검증**
   ```bash
   npm run build
   npm run lint
   npm run typecheck
   ```

2. **로컬 실행**
   ```bash
   npm run dev
   # localhost:3000 으로 열기
   ```

3. **Smoke Test**
   - [ ] 홈페이지 로드
   - [ ] 포트폴리오 섹션 보이기
   - [ ] 포트폴리오 상세 클릭 가능
   - [ ] 문의 폼 제출 (로컬)
   - [ ] sitemap.xml, robots.txt 접근 가능
   - [ ] 모바일 (375px) 반응형 확인

4. **SEO 점검** (배포 전)
   - [ ] /sitemap.xml 200, 포함 URL 확인
   - [ ] /robots.txt 200, sitemap 지시어 확인
   - [ ] 메인 페이지 OG 태그 확인 (DevTools 또는 curl)

5. **성능 점검**
   ```bash
   # Chrome DevTools → Lighthouse
   # 목표: LCP < 2.5s
   ```

## 체크리스트

- [ ] 빌드 성공 (no errors)
- [ ] 타입/린트 경고 설명 가능
- [ ] 주요 페이지/폼 작동
- [ ] 배포 경로 검증 (SEO endpoint)

## 실패 시

- 명확한 에러 메시지 기록
- 스택 트레이스 저장
- DECISION-LOG에 문제와 해결 책 기록
