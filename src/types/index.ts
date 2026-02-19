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
  detailImages: string[];
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
