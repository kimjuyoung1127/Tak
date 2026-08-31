import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingCTA from "@/components/layout/FloatingCTA";
import { ArrowUpRight } from "lucide-react";
import { getAllPortfolios, getExternalWorks } from "@/lib/content/portfolio";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "포트폴리오",
  description:
    "기획부터 납품까지, 설득의 구조로 완성한 상세페이지·웹사이트 작업들. 탁디장 포트폴리오.",
  alternates: { canonical: "/portfolio" },
  openGraph: {
    title: "포트폴리오 | 탁디장",
    description: "설득의 구조로 완성한 상세페이지·웹사이트 작업들.",
    type: "website",
    locale: "ko_KR",
  },
};

export default function PortfolioIndexPage() {
  const portfolios = getAllPortfolios();
  const externalWorks = getExternalWorks();

  return (
    <>
      <Header />
      <main className="pt-32 pb-20">
        <section className="section-padding pt-0">
          <div className="container-main">
            <div className="mb-12">
              <span className="text-sm font-semibold tracking-wide text-primary">
                PORTFOLIO
              </span>
              <h1 className="mt-3 text-display-sm md:text-display-md font-bold text-foreground">
                Selected Works
              </h1>
              <p className="mt-3 text-muted-foreground max-w-xl">
                기획부터 납품까지, 설득의 구조로 완성한 상세페이지·웹사이트
                작업들입니다.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolios.map((item, index) => (
                <Link
                  key={item.slug}
                  href={`/portfolio/${item.slug}`}
                  className="group block rounded-none overflow-hidden bg-white border border-border transition-[transform,border-color] duration-200 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                    {item.thumbnail ? (
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        priority={index === 0}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-sm font-medium text-muted-foreground">
                          {item.title}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {item.tags.slice(0, 2).map((tag) => (
                        <Badge
                          key={tag}
                          variant="accent"
                          size="sm"
                          className="px-2.5 py-0.5"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <h2 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                      {item.title}
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.industry} · {item.kpi}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {/* ── 외부 채널 작업 ── */}
            {externalWorks.length > 0 && (
              <div className="mt-16">
                <h2 className="text-sm font-semibold tracking-wide text-muted-foreground mb-4">
                  외부 채널 작업
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {externalWorks.map((item) => {
                    const isInternal = Boolean(item.productHref);
                    const href = item.productHref ?? item.externalUrl;
                    const linkProps = isInternal
                      ? {}
                      : {
                          target: "_blank" as const,
                          rel: "noopener noreferrer",
                        };
                    return (
                      <a
                        key={item.slug}
                        href={href}
                        {...linkProps}
                        className="group flex flex-col justify-between rounded-card bg-primary-50 border border-primary/20 p-6 transition-[transform,border-color] duration-200 hover:-translate-y-1 hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex flex-wrap gap-1.5">
                              {item.tags.slice(0, 2).map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="accent"
                                  size="sm"
                                  className="px-2.5 py-0.5"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:rotate-12">
                              <ArrowUpRight
                                size={18}
                                strokeWidth={2.5}
                                aria-hidden="true"
                              />
                            </span>
                          </div>
                          <h3 className="mt-4 text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                            {item.title}
                          </h3>
                          <p className="mt-1.5 text-sm text-muted-foreground">
                            {item.industry} · {item.kpi}
                          </p>
                        </div>
                        <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                          {item.externalLabel ?? "바로가기"}
                          <ArrowUpRight
                            size={15}
                            strokeWidth={2.5}
                            aria-hidden="true"
                          />
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
