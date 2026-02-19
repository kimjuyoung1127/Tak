import type { ProcessStep, FAQItem, NavLink } from "@/types";

/* ── 내비게이션 ── */
export const NAV_LINKS: NavLink[] = [
  { label: "포트폴리오", href: "#portfolio" },
  { label: "프로세스", href: "#process" },
  { label: "소개", href: "#about" },
  { label: "FAQ", href: "#faq" },
];

/* ── Hero 카피 (PRD 6.0) ── */
export const HERO_COPY = {
  headline: "사장님의 상품이 고객에게 닿는",
  headlineAccent: "가장 정확한 언어",
  headlineSuffix: "로 디자인합니다",
  sub: "겉만 화려한 페이지가 아닌, 브랜드의 가치를 담아 고객을 설득하는 상세페이지를 만듭니다.",
  cta: "무료 상담으로 가능성 확인하기",
  trustBadges: ["기획", "촬영", "디자인", "원본 제공"],
} as const;

/* ── Final CTA 카피 (PRD 6.0) ── */
export const FINAL_CTA_COPY = {
  headline: "당신의 브랜드에 날개를 달아줄 파트너, 탁디장입니다.",
  sub: "15분 무료 상담으로 프로젝트 가능성을 먼저 확인해보세요.",
  primaryCta: "무료 상담 신청",
  secondaryCta: "카카오톡으로 빠르게 문의",
} as const;

/* ── About 카피 (PRD 6.1.4) ── */
export const ABOUT_COPY = {
  title: "저는 예쁜 화면이 아니라, 설득되는 구조를 만듭니다.",
  paragraphs: [
    "탁디장은 디자인을 '작업'으로 보지 않습니다. 상품이 선택받기까지의 흐름을 읽고, 고객이 망설이는 지점을 근거로 설계합니다.",
    "그래서 결과물은 늘 한 가지 질문으로 시작합니다. \"이 페이지는 구매를 '설득'하고 있는가?\"",
    "시장조사와 트렌드 분석으로 방향을 잡고, 1차 콘티(스케치)로 먼저 구조를 합의한 뒤 제작에 들어가 수정에 소모되는 시간을 줄이고 완성도를 끌어올립니다.",
  ],
  bullets: [
    "기획부터 촬영/디자인/원본까지 한 번에",
    "콘티로 먼저 방향을 맞추는 효율적 프로세스",
    "길이 기준이 아닌 \"프로젝트 단위\" 정가 운영",
  ],
  cta: "지금 상품에 필요한 설득 포인트를 15분 안에 정리해드립니다.",
} as const;

/* ── 프로세스 (PRD 6.1.3) ── */
export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: 1,
    title: "진단",
    description: "상품·고객·경쟁 분석으로 설득 포인트를 찾습니다.",
    deliverable: "시장조사 리포트",
    icon: "Search",
  },
  {
    step: 2,
    title: "설계",
    description: "구매 논리와 구조를 콘티(스케치)로 먼저 합의합니다.",
    deliverable: "1차 콘티(스케치)",
    icon: "PenTool",
  },
  {
    step: 3,
    title: "제작",
    description: "촬영과 디자인을 한 번에 진행합니다.",
    deliverable: "촬영 + 디자인 시안",
    icon: "Palette",
  },
  {
    step: 4,
    title: "납품",
    description: "원본 파일과 운영 가이드를 함께 제공합니다.",
    deliverable: "원본 + 운영 가이드",
    icon: "Package",
  },
];

/* ── FAQ (PRD 6.1.6) ── */
export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "상세페이지 제작 비용은 어떻게 되나요?",
    answer:
      "프로젝트 단위 정가제로 운영합니다. 길이가 아닌 기획 범위와 촬영 포함 여부에 따라 견적이 달라지며, 15분 무료 상담에서 정확한 금액을 안내드립니다.",
  },
  {
    question: "작업 기간은 보통 얼마나 걸리나요?",
    answer:
      "기획부터 납품까지 평균 2~3주 소요됩니다. 촬영 일정과 피드백 속도에 따라 달라질 수 있으며, 상담 시 예상 일정을 안내드립니다.",
  },
  {
    question: "수정은 몇 번까지 가능한가요?",
    answer:
      "1차 콘티(스케치) 단계에서 방향을 확정한 뒤 제작에 들어가므로 대규모 수정이 거의 발생하지 않습니다. 디자인 시안 단계에서 1~2회 수정을 포함합니다.",
  },
  {
    question: "촬영도 함께 진행할 수 있나요?",
    answer:
      "네, 기획에 맞는 촬영 콘셉트를 설계하고 촬영까지 원스톱으로 진행합니다. 촬영 없이 디자인만 의뢰하는 것도 가능합니다.",
  },
  {
    question: "완성 후 원본 파일을 받을 수 있나요?",
    answer:
      "모든 프로젝트는 PSD/AI 원본 파일과 운영 가이드를 함께 납품합니다. 이후 내부에서 수정하거나 활용하실 수 있습니다.",
  },
  {
    question: "어떤 플랫폼(쇼핑몰)에서도 적용 가능한가요?",
    answer:
      "스마트스토어, 쿠팡, 자사몰 등 모든 플랫폼에 맞춰 제작합니다. 플랫폼별 가이드라인을 반영하여 최적화된 결과물을 제공합니다.",
  },
];

/* ── 카카오 채널 ── */
export const KAKAO_CHANNEL_URL = "https://pf.kakao.com/_placeholder";

/* ── 문의 유형 옵션 ── */
export const INQUIRY_TYPE_OPTIONS = [
  "상세페이지 제작",
  "상세페이지 리뉴얼",
  "촬영 + 디자인 패키지",
  "디자인만 의뢰",
  "기타 문의",
] as const;

/* ── 예산 범위 옵션 ── */
export const BUDGET_RANGE_OPTIONS = [
  "50만원 이하",
  "50~100만원",
  "100~200만원",
  "200만원 이상",
  "상담 후 결정",
] as const;
