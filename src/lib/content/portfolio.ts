import type { PortfolioItem } from "@/types";
import { PORTFOLIO_ITEMS } from "./portfolio-data";
import { getPortfolioImages } from "./portfolio-images";

/** 정적 레지스트리 → PortfolioItem 변환 (이미지 경로 포함) */
function resolveItem(data: (typeof PORTFOLIO_ITEMS)[number]): PortfolioItem {
  const images = getPortfolioImages(data.slug);
  return {
    slug: data.slug,
    title: data.title,
    clientType: data.clientType,
    category: data.category,
    industry: data.industry,
    deliverables: data.deliverables,
    kpi: data.kpi,
    thumbnail: images.thumbnail,
    heroImage: "",
    publishedAt: data.publishedAt,
    featured: data.featured,
    tags: data.tags,
    detailImages: images.detailImages,
  };
}

/** 전체 포트폴리오 목록 (최신순) */
export function getAllPortfolios(): PortfolioItem[] {
  return PORTFOLIO_ITEMS.map(resolveItem).sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

/** slug 기준 단일 조회 */
export function getPortfolioBySlug(
  slug: string
): { item: PortfolioItem; content: string } | null {
  const data = PORTFOLIO_ITEMS.find((p) => p.slug === slug);
  if (!data) return null;

  return {
    item: resolveItem(data),
    content: "",
  };
}

/** 모든 slug 목록 (SSG용 generateStaticParams) */
export function getAllPortfolioSlugs(): string[] {
  return PORTFOLIO_ITEMS.map((p) => p.slug);
}

/** 유사 프로젝트 추천 (같은 카테고리, 최대 3개) */
export function getRelatedPortfolios(
  currentSlug: string,
  limit = 3
): PortfolioItem[] {
  const all = getAllPortfolios();
  const current = all.find((p) => p.slug === currentSlug);
  if (!current)
    return all.filter((p) => p.slug !== currentSlug).slice(0, limit);

  return all
    .filter(
      (p) =>
        p.slug !== currentSlug &&
        p.category.some((c) => current.category.includes(c))
    )
    .slice(0, limit);
}
