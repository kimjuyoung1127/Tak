# /handoff — 이관 캡슐

세션 종료 또는 다른 에이전트에게 넘길 때 작성.

## 내용

- **진입점**: 어디서 시작할지 (AGENTS.md → PROJECT-STATUS → 현 상태 다음 액션)
- **블로커**: 현재 막혀 있는 것 (외부 대기, 결정 필요, 데이터 미확보)
- **첫 검증**: 들어와서 바로 확인할 것 (npm run build, 폼 테스트)
- **컨텍스트**: 오늘의 결정/깨달음 (ai-context/worklog.md 참고)

## Template

```
## 진입점
1. docs/status/PROJECT-STATUS.md (다음 액션)
2. harnesses/REGISTRY.md (사용할 하네스)
3. ...

## 현 블로커
- [ ] 카카오톡 채널 URL 미확정 (CTA 완성 못함)
- [ ] EmailJS 커스텀 템플릿 (테스트 템플릿 중)

## 첫 검증
1. npm run build 성공
2. 문의 폼 EmailJS 테스트 (로컬)
3. robots.txt, sitemap.xml 200 응답

## 컨텍스트
- 2026-06-15: 하네스/문서 거버넌스 이식 (DECISION-LOG 참고)
- 다음: post-MVP IA 확장 (socratic-review 권장)
```

## 파일 위치

`ai-context/handover.md` — append-only 이관 로그
