Tak Djang Design Studio — Product Requirements Document (PRD)

Version: 1.1.0
Last Updated: 2026-02-10
Status: 기획 단계
Target: 디자인 에이전시 웹사이트 (Portfolio & Lead Generation)
Goal: SEO 최적화 및 고관여 잠재고객의 문의(Lead) 전환 유도

목차

1. 프로젝트 개요
2. 기술 스택
3. 시스템 아키텍처
4. DB 스키마 설계
5. 공통 컴포넌트 명세
6. 핵심 기능 명세
7. 상태 관리 및 API
8. 개발 페이즈 계획
9. 레퍼런스 디자인 반영 가이드

1. 프로젝트 개요
1.1 목표

본 프로젝트는 온라인 셀러가 “팔리는 상세페이지”를 만들기 위해 신뢰할 수 있는 디자이너를 빠르게 판단하고, 상담 문의까지 자연스럽게 이어지도록 돕는 포트폴리오 + 리드 전환 웹사이트 구축을 목표로 한다.
벤치마킹 대상은 **포트폴리오 중심의 개인 스튜디오/에이전시 사이트(국내외)**이며, 차별점은 “예쁜 디자인”이 아니라 “매출·설득·비즈니스” 언어로 전문성을 증명하고, 문의 전환까지의 마찰을 최소화하는 것이다.

1.2 핵심 가치 (USP)

기획 중심 디자인: 시장조사·트렌드 분석 기반의 “매출 상승” 기획

효율적 프로세스: 1차 콘티(스케치) 제공으로 수정 시간을 절약

올인원 서비스: 기획 + 촬영 + 디자인 + 원본파일 제공

명확한 견적: 길이 단위가 아닌 프로젝트(세트) 단위의 정가제

1.3 핵심 기능
기능	설명
포트폴리오 갤러리(계단식 스크롤)	긴 JPG(상세페이지)를 “물 흐르듯” 탐색 가능한 레이아웃(스테어/워터폴 느낌)
포트폴리오 상세 페이지	선택한 작업의 큰 이미지(긴 JPG) + 기획 의도/성과/제작 범위/후기/CTA
문의(Lead) 전환 시스템	문의 폼 → EmailJS 전송 + 고정 카카오톡 채널 버튼 + 폼 유효성/스팸 방지
SEO 최적화 패키지	SSR/SSG, 메타/OG, sitemap/robots, 구조화 데이터, Core Web Vitals 최적화
브랜드 카피 시스템	“전문가·진정성·전략가·파트너십” 톤으로 전 페이지 카피 일관 유지
1.4 개발 전략 (SEO & Maintenance)

Framework: Next.js 14+ (App Router)로 SSR/SSG 기반 SEO 점수 극대화

Data Management: DB 없이 로컬 MDX/JSON으로 포트폴리오 관리 (개발자 수정)

Lead Gen: 문의 폼(EmailJS) + 고정 CTA(카카오톡 채널) + 최종 CTA 배너

운영 편의: 포트폴리오 12개는 “긴 JPG + 메타데이터(frontmatter)”만 교체하면 반영되도록 설계

2. 기술 스택
2.1 Core Stack
구분	기술	버전/비고
Framework	Next.js	14+ (App Router)
Language	TypeScript	타입 안정성
Styling	Tailwind CSS	디자인 시스템 일관화
UI Lib	Shadcn/UI (Radix 기반)	접근성/일관 컴포넌트
Animation	Framer Motion	스크롤/전환 인터랙션
Form	React Hook Form + Zod	문의 폼 유효성
Image	next/image	LCP/CLS 최적화
Content	MDX + Gray-matter	포트폴리오/카피 관리
2.2 Backend & Infra
구분	기술	설명
Server	없음(정적/SSR)	필요 시 Next Route Handler만 사용
Database	없음	로컬 파일 기반
Auth	없음	관리자 페이지 없음(파일 편집 운영)
Email	EmailJS	Client-side 메일 발송
Deploy	Vercel	Next.js 최적 배포
3. 시스템 아키텍처
3.1 디렉토리 구조 (권장)
[root]/
├── public/
│   ├── fonts/
│   ├── og/
│   └── portfolio/
│       ├── project-a/   # 긴 JPG + 썸네일
│       └── project-b/
├── content/
│   ├── portfolio/       # 12개 포트폴리오 MDX
│   └── copy/            # Hero/CTA/About 카피 분리(선택)
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx                 # 랜딩(원페이지 구조)
│   │   ├── portfolio/
│   │   │   ├── page.tsx             # 포트폴리오 리스트(옵션: 별도 페이지)
│   │   │   └── [slug]/page.tsx      # 상세
│   │   ├── privacy/page.tsx         # 개인정보 처리방침
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── ui/                      # shadcn ui
│   │   ├── layout/                  # Header/Footer/FloatingCTA
│   │   ├── sections/                # Hero/Portfolio/Process/About/Contact
│   │   └── portfolio/               # GalleryCard, MasonryGrid, DetailHeader
│   ├── lib/
│   │   ├── seo/                     # metadata helpers, schema builders
│   │   ├── content/                 # mdx loader, portfolio parser
│   │   └── utils/
│   ├── styles/
│   └── types/
└── next.config.js / tailwind.config.ts / etc

3.2 라우팅 맵 (Sitemap)
URL 경로	페이지 명	권한/비고
/	랜딩(원페이지: Hero/Portfolio/Process/About/Contact)	전체 공개
/portfolio	포트폴리오 리스트(옵션)	전체 공개
/portfolio/[slug]	포트폴리오 상세	전체 공개 (SSG)
/privacy	개인정보 처리방침	필수(문의 폼)
/sitemap.xml	사이트맵	자동 생성
/robots.txt	로봇 정책	자동 제공
4. DB 스키마 설계

실제 DB는 사용하지 않으며, 로컬 콘텐츠 스키마를 “DB 대체”로 정의한다.

4.1 ERD 개요(대체 구조)

PortfolioItem(12) —(1:1)→ AssetSet(images)
PortfolioItem —(N)→ Tag (선택)

4.2 주요 콘텐츠 스키마 상세
content/portfolio/[slug].mdx (Frontmatter)
---
slug: "project-a"
title: "상세페이지 리뉴얼 — 전환율을 설계한 구조"
client_type: "온라인 셀러"       # 공개 가능한 범위로
category: ["상세페이지", "촬영", "기획"]
industry: "뷰티/식품/리빙 등"
deliverables: ["기획", "촬영", "디자인", "원본 제공"]
kpi: "구매전환 최적화"           # 수치 공개 불가 시 문장형
thumbnail: "/portfolio/project-a/thumb.jpg"
heroImage: "/portfolio/project-a/long.jpg"   # 긴 JPG
publishedAt: "2026-02-01"
featured: true
tags: ["설득구조", "상세페이지", "기획"]
---
(선택) 본문에 추가 설명/후기/FAQ/세부 캡션

5. 공통 컴포넌트 명세
5.1 AppLayout

용도: 전 페이지 공통 레이아웃(헤더/푸터/고정 CTA 포함)

주요 기능: 스크롤 시 헤더 축소, 섹션 앵커 이동, 접근성(키보드 포커스)

구성: Header, Main, Footer, FloatingCTA

5.2 PortfolioMasonryGrid

용도: 계단식(워터폴) 스크롤 갤러리

주요 기능:

이미지 비율 기반 카드 높이 자동 배치(“계단식” 느낌)

스크롤/호버 시 미세 모션(Framer Motion)

클릭 → /portfolio/[slug] 이동

Props: items, onItemClick?, variant(dense|airy)

5.3 PortfolioCard

용도: 썸네일 카드(제목/태그/한 줄 가치)

주요 기능: hover 시 “성과/기획 포인트” 한 줄 노출

Props: title, thumbnail, tags, oneLiner, href

5.4 ProcessStepper

용도: 4-Step Workflow 섹션

주요 기능: 단계별 “산출물” 강조, 신뢰 포인트(콘티 제공 등)

Props: steps[]

5.5 InquiryForm

용도: 문의 전환 폼

주요 기능: 유효성 검사(Zod), EmailJS 전송, 성공/실패 토스트, 스팸 방지(honeypot)

필드: 이름/브랜드(또는 스토어)/연락처/문의유형/예산범위/마감일/요청사항

5.6 FinalCTABanner

용도: 페이지 하단 최종 전환 유도

주요 기능: 강한 한 문장 + “15분 무료 상담” 버튼 + 카카오 버튼 병렬 배치

5.7 FAQSection

용도: 문의 직전의 불확실성 해소 섹션

주요 기능: 질문 5~8개 아코디언, 단일 확장(동시 다중 확장 금지), CTA 연결

Props: items[], defaultOpenItem?, ctaLabel?, ctaHref?

5.8 SocialProofSection

용도: 랜딩 상단/중단 신뢰 증거 제시

주요 기능: 후기/평점/KPI/클라이언트 유형 배지 노출, 카드형 레이아웃 일관성 유지

Props: rating, highlights[], testimonials[]

6. 핵심 기능 명세
6.0 브랜드 포지셔닝 & 카피 규칙 (핵심 추가)
톤 & 금지어

톤: 전문가 / 진정성 / 전략가 / 파트너십

금지: “예쁜, 감성, 화려한” 단독 강조

권장 키워드: 매출, 전환, 설득, 구조, 전략, 근거, 고객 이해, 실행

HERO 카피 (교체안 — 적용 기본)

H1: 사장님의 상품이 고객에게 닿는 가장 정확한 언어로 디자인합니다

Sub: 겉만 화려한 페이지가 아닌, 브랜드의 가치를 담아 고객을 설득하는 상세페이지를 만듭니다.

CTA: 무료 상담으로 가능성 확인하기 →

FINAL CTA 배너 (교체안 — 적용 기본)

메인: 당신의 브랜드에 날개를 달아줄 파트너, 탁디장입니다.

서브: 15분 무료 상담으로 프로젝트 가능성을 먼저 확인해보세요.

버튼: 무료 상담 신청 / 카카오톡으로 빠르게 문의

6.1 랜딩 원페이지 (/) — 섹션별 상세
6.1.1 Hero Section
UI 요소	타입	기능 설명
헤드카피(H1)	Text	핵심 USP를 “매출/설득” 언어로 선언
서브카피	Text	“겉만 화려함” 대비로 포지셔닝 강화
CTA 버튼	Button	클릭 시 Contact 섹션으로 스크롤 + 폼 포커스
신뢰 요소	Badge/List	제공 범위(기획/촬영/원본/콘티) 1줄 요약

로직

CTA 클릭 → #contact로 스무스 스크롤

첫 화면 LCP 최적화: 폰트 preload, hero 텍스트 우선, 이미지 최소

6.1.2 Portfolio Section (계단식 스크롤)
UI 요소	타입	기능 설명
Masonry Grid	Grid	“계단식/워터폴” 배치로 자연스러운 탐색
카드 Hover	Motion	미세 확대/그림자 + “기획 포인트 한 줄” 노출
카드 Click	Link	/portfolio/[slug] 이동(SSG)

구현 가이드

CSS Columns 기반(가벼움) 또는 Masonry 유틸(필요 시)

카드 내부 이미지는 next/image + sizes 지정

썸네일은 가볍게, 상세는 긴 JPG 1장을 핵심으로

6.1.3 Process Section (4-Step Workflow)

권장 4단계

진단(상품/고객/경쟁 분석)

설계(구매 논리/구조/카피 콘티)

제작(촬영 + 디자인)

납품(원본 제공 + 운영 가이드)

6.1.4 About Section (요청 파트 — 바로 적용 가능한 원고)

섹션 목적: “디자이너”가 아니라 “매출 파트너”라는 정체성을 10초 안에 이해시키기

타이틀(예시)

“저는 예쁜 화면이 아니라, 설득되는 구조를 만듭니다.”

본문(예시 원고)

탁디장은 디자인을 ‘작업’으로 보지 않습니다.
상품이 선택받기까지의 흐름을 읽고, 고객이 망설이는 지점을 근거로 설계합니다.

그래서 결과물은 늘 한 가지 질문으로 시작합니다.
“이 페이지는 구매를 ‘설득’하고 있는가?”

시장조사와 트렌드 분석으로 방향을 잡고,
**1차 콘티(스케치)**로 먼저 구조를 합의한 뒤 제작에 들어가
수정에 소모되는 시간을 줄이고 완성도를 끌어올립니다.

한 줄 신뢰 포인트(불릿)

기획부터 촬영/디자인/원본까지 한 번에

콘티로 먼저 방향을 맞추는 효율적 프로세스

길이 기준이 아닌 “프로젝트 단위” 정가 운영

About 내 CTA(소형)

“지금 상품에 필요한 설득 포인트를 15분 안에 정리해드립니다.”

6.1.5 Contact Section (Inquiry Form)
UI 요소	타입	기능 설명
입력 필드	Input/Textarea	필수값 검증, 예산/일정 선택
개인정보 동의	Checkbox	/privacy 링크 필수
제출 버튼	Button	EmailJS 전송 + 성공 토스트
대체 CTA	Button	카카오 채널로 문의(고정 CTA와 동일)

성공/실패 처리

성공: “접수 완료 — 24시간 내 회신” 메시지 + 카카오 CTA 노출

실패: 네트워크/전송 실패 시 “카카오 문의” 우선 안내

6.1.6 FAQ Section
UI 요소	타입	기능 설명
FAQ 아코디언	Accordion	질문 5~8개, 단일 확장, 클릭 시 부드러운 열림/닫힘
질문 문구	Text	가격/일정/수정/운영/제공 범위 중심의 의사결정 문장
보조 CTA	Button	FAQ 하단에서 문의 폼 또는 카카오 CTA로 연결

콘텐츠 규칙

- 질문과 문의 폼 필드 의미를 일치시켜 사용자 인지부하를 낮춘다.
- 가격 질문은 “상담 후 개별 견적” 원칙을 명확히 유지한다.

6.2 포트폴리오 상세 (/portfolio/[slug])
페이지 구조

상단: 프로젝트 타이틀 + 한 줄 성과/의도(문장형) + 태그

메인: 긴 JPG(Full width)

컨텍스트: “문제 → 전략 → 구조 → 결과” 순서로 짧게

제공 범위: 기획/촬영/디자인/원본 등 체크리스트

유사 프로젝트 추천: 2~3개

CTA: 무료 상담 / 카카오 문의

SEO 규칙

title, description을 프로젝트별로 동적 생성

OG 이미지: 기본 템플릿(프로젝트명 + 한 줄 USP) 또는 썸네일 사용

구조화 데이터: CreativeWork 또는 Article 형태로 최소 적용(선택)

6.3 와이어프레임(텍스트)
(1) 홈(/)

Header: 로고 / 포트폴리오 / 프로세스 / 소개 / 문의

Hero: H1 + Sub + CTA + 신뢰 배지

Portfolio: Masonry Grid 12개

Process: 4-step + 산출물

About: 포지셔닝 원고 + 신뢰 불릿 + 소형 CTA

FAQ: 아코디언 5~8개 + 보조 CTA

Contact: 문의 폼 + 카카오 버튼

Final CTA: 다크 섹션 + 2버튼(주/보조)

Footer: 사업 정보(선택) + privacy

(2) 포트폴리오 상세(/portfolio/[slug])

상단: 제목/태그/한 줄 요약

본문: 긴 JPG 1장(필요 시 추가 이미지)

하단: 컨텍스트 + 제공 범위 + CTA

7. 상태 관리 및 API
7.1 전역 상태 (Store) — 최소화 원칙

UIStore(선택): 토스트, 모달, 로딩 상태

나머지는 서버 컴포넌트/정적 로딩 우선(SEO/성능)

7.2 API 엔드포인트 전략 (선택)

본 프로젝트는 “무백엔드”가 원칙이지만, 필요 시 아래를 허용:

메소드	엔드포인트	설명
POST	/api/inquiry	EmailJS 키 노출을 줄이기 위한 프록시(원하면)
GET	/sitemap.xml	정적/동적 사이트맵 생성
8. 개발 페이즈 계획
1주차

Next.js 세팅(SEO 기본), Tailwind/Shadcn/UI 구축

IA 확정, 섹션 컴포넌트 뼈대(Hero/Portfolio/Process/About/Contact)

포트폴리오 콘텐츠 스키마(MDX) 확정

디자인 토큰 초안 확정(컬러/타이포/간격/카드 라운드·그림자)

2주차

Portfolio Masonry(계단식) 구현 + 상세 라우팅(/portfolio/[slug])

이미지 최적화(thumb/long 분리), 전환 애니메이션 적용

문의 폼(React Hook Form + Zod + EmailJS) 완성 + 스팸 방지

FAQ 섹션 구현(질문 5~8개, 단일 확장, 보조 CTA 연결)

3주차

SEO 고도화: 메타/OG, sitemap/robots, 구조화 데이터(선택)

카피/문구 전체 적용(브랜드 톤 가이드 반영)

접근성/모바일 UX(고정 CTA, 폼 UX) 다듬기

랜딩 퍼스트뷰 시안 3안 비교 후 최종안 1개 확정

4주차

성능 점검(LCP/CLS/INP), 이미지 용량 최적화

QA: 폼 전송, 라우팅, 404, 공유(OG) 테스트

Vercel 배포 + 도메인 연결 + Search Console 등록 가이드 정리

PRD 9.5 품질 게이트 5개 항목 최종 점검 및 리뷰 로그 기록

9. 레퍼런스 디자인 반영 가이드
9.1 참고 레퍼런스 해석 원칙

목표는 레퍼런스와 "유사 복제"가 아니라, 정보 구조와 전환 흐름의 강점을 현재 브랜드 톤으로 재해석하는 것이다.

반영 대상:

- 밝은 중립 배경 위 고대비 카드 중심 레이아웃
- 워터폴(계단식) 포트폴리오 섹션의 탐색성
- FAQ 아코디언의 낮은 인지부하(짧은 질문 + 즉시 확장)
- 하단 다크톤 Final CTA로 집중 전환

비반영 대상:

- 특정 색 조합/카피/카드 비율의 1:1 복사
- 레퍼런스 브랜드 고유 요소(로고/문구/정확한 UI 모양)

9.2 비주얼 시스템 기준 (Reference-Inspired)

컬러 시스템(권장):

- Base: 라이트 그레이 계열 배경 (`#F3F4F6` 근사)
- Surface: 화이트 카드 + 약한 그림자
- Accent Primary: 전략/전환 강조용 블루 계열
- Accent Secondary: CTA/하이라이트용 옐로우-오렌지 계열
- Final CTA Zone: 네이비/딥 블루 계열 다크 섹션

타이포 시스템:

- 헤드라인: 굵은 고대비 산세리프, 핵심 단어 컬러 강조(예: "Answers" 톤 강조)
- 본문: 가독성 우선 중간 굵기, 섹션 간 line-height 여유 확보
- 숫자/평점/성과: 시선 유도용 대형 스케일(예: 4.9/5 유형 KPI 카드)

레이아웃 시스템:

- 전체 폭은 여백 중심(넓은 좌우 패딩)으로 신뢰감 형성
- Portfolio는 "밀도 높은 Masonry + 카드별 정보 밀도 차등" 구조
- FAQ는 한 줄 질문 중심의 저마찰 아코디언 리스트
- Final CTA는 페이지 하단에서 명확히 분위기를 전환하는 독립 블록

9.3 섹션별 상세 반영 규칙

Header:

- 좌측 로고, 우측 핵심 내비 + Primary CTA 버튼
- 스크롤 시 헤더 높이/배경의 미세 전환(가독성 우선)

Hero:

- `Our Work & Answers` 유형의 "성과 + 신뢰" 메시지 구조 적용
- H1은 2행 이내, 서브카피는 2문장 이내로 제한

Portfolio Masonry:

- 카드 라운드 강도 통일(예: 20~24px), 그림자는 약하게 일관 유지
- 카드 타입 최소 4종:
  1) 이미지 중심 사례 카드
  2) 카피 중심 메시지 카드
  3) 신뢰/평점 KPI 카드
  4) 고객/프로젝트 메타 카드
- 카드 클릭 영역 전체를 링크로 처리하여 탐색 마찰 최소화

FAQ:

- 질문 5~8개 고정, 아코디언 단일 확장(동시 다중 확장 금지)
- 질문 문장은 실무 의사결정 언어로 작성 (가격, 일정, 운영, 수정, 제공 범위)

Final CTA:

- 다크 배경 + 2버튼 구조(주 CTA/보조 CTA)
- 문구는 "즉시 문의 압박"보다 "리스크 낮은 상담 제안" 톤 유지

9.4 모션/인터랙션 품질 기준

- Hover: 카드 리프트(translateY -2~-4px) + 그림자/테두리 미세 변화
- Entrance: 섹션 진입 시 120~220ms 지연 스태거
- FAQ: 열림/닫힘 전환 180~260ms, 콘텐츠 점프 현상 금지
- Reduced Motion 환경에서 애니메이션 최소화 필수

9.5 "디자이너가 봐도 와" 품질 게이트 (필수)

디자인 게이트 통과 조건:

1. 첫 화면 5초 내 전달되는 핵심 메시지가 1문장으로 요약 가능하다.
2. 스크린샷 3장(히어로/포트폴리오/최종 CTA)만 봐도 동일 브랜드로 인식된다.
3. 카드 컴포넌트의 라운드/그림자/간격/타이포 규칙이 전 섹션에서 일관된다.
4. FAQ와 문의 폼 사이의 전환 흐름이 끊기지 않고, CTA가 명확히 1순위/2순위로 구분된다.
5. 모바일(375px)에서도 카드 정보 위계가 유지되고 CTA 버튼 터치 영역이 충분하다.

리뷰 체크리스트(완료 전 필수):

- [ ] 랜딩 퍼스트뷰 캡처 3안 비교 후 1안 확정
- [ ] 컬러 토큰/타이포 스케일/간격 토큰 문서화
- [ ] CTA 버튼 대비(명도/크기/카피) 점검
- [ ] FAQ 질문 문장과 실제 문의 폼 필드의 의미 일치 점검
- [ ] Lighthouse/수동 점검 시 접근성 치명 이슈 없음
