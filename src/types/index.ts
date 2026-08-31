import type { MediaAsset } from "@/lib/content/media";

/** 포트폴리오 콘텐츠 스키마 (PRD 4.2) */
export interface PortfolioItem {
  slug: string;
  title: string;
  clientType: string;
  category: string[];
  industry: string;
  deliverables: string[];
  kpi: string;
  thumbnail: string;
  heroImage: string;
  publishedAt: string;
  featured: boolean;
  tags: string[];
  /** 목록/추천에서 먼저 보여줄 수동 우선순위. 낮을수록 먼저 노출 */
  displayOrder?: number;
  detailImages: MediaAsset[];
  /** 외부 링크 항목(와디즈 펀딩·블로그 운영 등). 있으면 내부 상세페이지 대신 외부로 연결 */
  externalUrl?: string;
  /** 외부 링크 버튼 라벨 (예: "와디즈에서 보기") */
  externalLabel?: string;
  /** 내부 전용 랜딩이 있으면 카드를 그쪽으로 연결 (예: 탁몽 → /takmong) */
  productHref?: string;
}

/** 포트폴리오 정적 데이터 레지스트리 항목 */
export interface PortfolioItemData {
  slug: string;
  title: string;
  clientType: string;
  category: string[];
  industry: string;
  deliverables: string[];
  kpi: string;
  publishedAt: string;
  featured: boolean;
  tags: string[];
  /** 목록/추천에서 먼저 보여줄 수동 우선순위. 낮을수록 먼저 노출 */
  displayOrder?: number;
  /** 외부 링크 항목이면 채운다(와디즈·네이버 블로그 등). 내부 상세페이지를 생성하지 않음 */
  externalUrl?: string;
  externalLabel?: string;
  /** 내부 전용 랜딩이 있으면 카드를 그쪽으로 연결 (예: 탁몽 → /takmong) */
  productHref?: string;
}

/** 블로그 운영 사례 콘텐츠 */
export interface BlogManagementCase {
  slug: string;
  title: string;
  clientType: string;
  industry: string;
  summary: string;
  deliverables: string[];
  kpi: string;
  publishedAt: string;
  featured: boolean;
  tags: string[];
  externalUrl: string;
  externalLabel: string;
}

/** 문의 폼 페이로드 (PRD InquiryPayload) */
export interface InquiryPayload {
  name: string;
  brandOrStore: string;
  contact: string;
  inquiryType: string;
  budgetRange: string;
  deadline: string;
  message: string;
  privacyConsent: boolean;
}

/** 프로세스 단계 */
export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  deliverable: string;
  icon: string;
}

/** FAQ 아이템 */
export interface FAQItem {
  question: string;
  answer: string;
}

/** 내비게이션 링크 */
export interface NavLink {
  label: string;
  href: string;
}

/** 서비스 항목 (제작 + 홍보 연계 4-서비스 모델) */
export interface ServiceItem {
  id: string;
  icon: string;
  eyebrow: string;
  title: string;
  summary: string;
  points: string[];
  deliverables: string[];
}

/** 제작→홍보 연계 흐름 단계 */
export interface LinkageStep {
  phase: string;
  label: string;
  desc: string;
}

/** 가격 플랜 */
export interface PricingPlan {
  id: string;
  category: "build" | "care" | "ads";
  label: string;
  price: string;
  period: string;
  originalPrice?: string;
  body: string;
  features: string[];
  cta: string;
  ctaHref: string;
  featured: boolean;
  badge?: string;
}
