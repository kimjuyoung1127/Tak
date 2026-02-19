import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowLeft, Check, MessageCircle } from "lucide-react";
import {
  getPortfolioBySlug,
  getAllPortfolioSlugs,
  getRelatedPortfolios,
} from "@/lib/content/portfolio";
import { KAKAO_CHANNEL_URL } from "@/lib/constants";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingCTA from "@/components/layout/FloatingCTA";

/* ── SSG: 모든 slug에 대해 정적 생성 ── */
export function generateStaticParams() {
  return getAllPortfolioSlugs().map((slug) => ({ slug }));
}

/* ── 동적 메타데이터 (PRD 6.2 SEO 규칙) ── */
export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const result = getPortfolioBySlug(params.slug);
  if (!result) return { title: "포트폴리오 | 탁디장" };

  const { item } = result;
  return {
    title: `${item.title} | 탁디장`,
    description: `${item.industry} 분야 ${item.category.join("/")} 프로젝트 — ${item.kpi}`,
    openGraph: {
      title: item.title,
      description: `${item.industry} 분야 ${item.category.join("/")} 프로젝트`,
      images: item.thumbnail ? [{ url: item.thumbnail }] : undefined,
    },
  };
}

export default function PortfolioDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const result = getPortfolioBySlug(params.slug);
  if (!result) notFound();

  const { item } = result;
  const related = getRelatedPortfolios(params.slug, 3);

  return (
    <>
      <Header />
      <main className="pt-24 pb-20">
        <article className="container-main max-w-4xl px-5 md:px-8">
          {/* Back link */}
          <Link
            href="/#portfolio"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            포트폴리오로 돌아가기
          </Link>

          {/* 상단: 타이틀 + 태그 + 한 줄 성과 */}
          <header className="mb-10">
            <div className="flex flex-wrap gap-2 mb-4">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-display-sm md:text-display-md font-bold text-foreground leading-tight">
              {item.title}
            </h1>
            <p className="mt-3 text-muted-foreground text-base md:text-lg">
              {item.industry} · {item.kpi}
            </p>
          </header>

          {/* ── 상세 이미지 갤러리 (상세페이지 스타일) ── */}
          {item.detailImages.length > 0 && (
            <div className="rounded-card-lg overflow-hidden bg-white mb-12">
              {item.detailImages.map((imgUrl, i) => {
                const isGif = imgUrl.toLowerCase().endsWith(".gif");
                return isGif ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    key={i}
                    src={imgUrl}
                    alt={`${item.title} ${i + 1}`}
                    className="w-full h-auto block"
                    loading="lazy"
                  />
                ) : (
                  <Image
                    key={i}
                    src={imgUrl}
                    alt={`${item.title} ${i + 1}`}
                    width={860}
                    height={0}
                    sizes="(max-width: 896px) 100vw, 860px"
                    className="w-full h-auto block"
                    style={{ height: "auto" }}
                    priority={i === 0}
                  />
                );
              })}
            </div>
          )}

          {/* 제공 범위 체크리스트 */}
          <div className="rounded-card bg-white shadow-card p-6 md:p-8 mb-12">
            <h3 className="text-lg font-bold text-foreground mb-4">
              제공 범위
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {item.deliverables.map((d) => (
                <div
                  key={d}
                  className="flex items-center gap-2 text-sm text-foreground"
                >
                  <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  {d}
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 mb-16">
            <a
              href="/#contact"
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-600 transition-colors shadow-cta"
            >
              무료 상담 신청
            </a>
            <a
              href={KAKAO_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#FEE500] text-[#3C1E1E] text-sm font-semibold hover:bg-[#F5DC00] transition-colors"
            >
              <MessageCircle size={16} />
              카카오톡 문의
            </a>
          </div>

          {/* 유사 프로젝트 추천 */}
          {related.length > 0 && (
            <section>
              <h3 className="text-xl font-bold text-foreground mb-6">
                유사 프로젝트
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/portfolio/${r.slug}`}
                    className="group rounded-card bg-white shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 overflow-hidden"
                  >
                    <div className="aspect-[4/3] relative overflow-hidden bg-gray-100">
                      {r.thumbnail ? (
                        <Image
                          src={r.thumbnail}
                          alt={r.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover"
                          unoptimized={r.thumbnail.endsWith(".gif")}
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-muted-foreground text-xs">
                          Thumbnail
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {r.title}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {r.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-full bg-muted text-xs text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
