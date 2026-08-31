import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check, MessageCircle } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingCTA from "@/components/layout/FloatingCTA";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { KAKAO_CHANNEL_URL } from "@/lib/constants";
import { TAKMONG } from "@/lib/content/takmong";
import {
  TEMPLATE_PRODUCTS,
  discountRate,
  formatPrice,
} from "@/lib/content/templates";
import { getTemplateImages } from "@/lib/content/template-images";

export const metadata: Metadata = {
  title: "탁몽 · AI 상세페이지 제작 서비스",
  description:
    "AI로 브랜딩부터 기획·촬영까지 — 셀러가 직접 상세페이지를 완성하는 실무형 서비스. 와디즈 펀딩 740% 달성.",
  alternates: { canonical: "/takmong" },
  openGraph: {
    title: "탁몽 · AI 상세페이지 제작 서비스",
    description: "와디즈 펀딩 740% 달성. 단계별 리워드로 필요한 만큼 시작하세요.",
    type: "website",
    locale: "ko_KR",
  },
};

const FUNDING_STATS = [
  { label: "펀딩 달성률", value: TAKMONG.funding.rate },
  { label: "모인 금액", value: TAKMONG.funding.amount },
  { label: "서포터", value: TAKMONG.funding.backers },
];

export default function TakmongPage() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-20">
        {/* ── Hero ── */}
        <Section bg="none">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            포트폴리오로 돌아가기
          </Link>

          <Reveal y={24} immediate className="max-w-2xl">
            <span className="text-sm font-semibold tracking-wide text-primary">
              {TAKMONG.eyebrow}
            </span>
            <h1 className="mt-3 text-display-md md:text-display-lg font-bold text-foreground leading-tight">
              {TAKMONG.title}
            </h1>
            <p className="mt-4 text-lg md:text-xl text-foreground font-medium">
              {TAKMONG.tagline}
            </p>
            <p className="mt-3 text-muted-foreground text-base leading-relaxed">
              {TAKMONG.body}
            </p>
          </Reveal>

          {/* 펀딩 성과 */}
          <Reveal y={24} delay={0.1} className="mt-10">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="solid" size="md">
                와디즈 펀딩 성공 · {TAKMONG.funding.closedAt} 종료
              </Badge>
            </div>
            <div className="mt-5 grid grid-cols-3 max-w-xl divide-x divide-border rounded-card border border-border bg-white">
              {FUNDING_STATS.map((s) => (
                <div key={s.label} className="px-1 py-5 text-center sm:px-2 md:px-4">
                  <p className="text-sm sm:text-xl md:text-3xl font-bold text-primary whitespace-nowrap tracking-tight">
                    {s.value}
                  </p>
                  <p className="mt-1 text-[11px] sm:text-xs text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </Section>

        {/* ── AI 템플릿 스토어 (스마트스토어 판매 상품) ── */}
        <Section bg="muted">
          <div className="mb-10">
            <span className="text-sm font-semibold tracking-wide text-primary">
              AI 템플릿 스토어
            </span>
            <h2 className="mt-3 text-display-sm font-bold text-foreground">
              지금 바로 구매 가능
            </h2>
            <p className="mt-2 text-muted-foreground">
              탁디장·탁몽 스마트스토어에서 판매 중인 상품입니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TEMPLATE_PRODUCTS.map((p) => {
              const rate = discountRate(p);
              const detailImages = getTemplateImages(p.slug);
              const thumb = p.image ?? detailImages[0]?.src;
              const hasDetail = detailImages.length > 0;
              const detailHref = `/templates/${p.slug}`;
              return (
                <div
                  key={p.slug}
                  className={
                    p.featured
                      ? "flex flex-col overflow-hidden rounded-card border-2 border-primary bg-white"
                      : "flex flex-col overflow-hidden rounded-card border border-border bg-white"
                  }
                >
                  {hasDetail ? (
                    <Link href={detailHref} className="group block">
                      <MediaFrame
                        src={thumb}
                        alt={p.name}
                        aspect="aspect-[16/10]"
                        label="상세 이미지 준비중"
                      />
                    </Link>
                  ) : (
                    <MediaFrame
                      src={thumb}
                      alt={p.name}
                      aspect="aspect-[16/10]"
                      label="상세 이미지 준비중"
                    />
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-2">
                      <Badge variant={p.featured ? "solid" : "accent"} size="sm">
                        {p.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {p.brand}
                      </span>
                    </div>
                    <h3 className="mt-3 text-lg font-bold text-foreground">
                      {p.name}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {p.summary}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {p.highlights.map((h) => (
                        <li
                          key={h}
                          className="flex items-start gap-2 text-sm text-foreground/90"
                        >
                          <Check
                            size={16}
                            className="mt-0.5 shrink-0 text-primary"
                          />
                          {h}
                        </li>
                      ))}
                    </ul>
                    {p.freebie && (
                      <p className="mt-4 rounded-md bg-primary-50 px-3 py-2 text-xs text-primary-700">
                        🎁 {p.freebie}
                      </p>
                    )}
                    <div className="mt-auto pt-6">
                      <div className="flex items-baseline gap-2">
                        {rate > 0 && (
                          <span className="text-sm font-bold text-primary">
                            {rate}%
                          </span>
                        )}
                        {p.originalPrice > p.price && (
                          <span className="text-sm text-muted-foreground line-through">
                            {formatPrice(p.originalPrice)}
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-2xl font-bold text-foreground">
                        {formatPrice(p.price)}
                      </p>
                      <div className="mt-4 flex gap-2">
                        {hasDetail && (
                          <Button
                            href={detailHref}
                            variant="outline"
                            size="sm"
                            fullWidth
                          >
                            상세 보기
                          </Button>
                        )}
                        <Button
                          href={p.storeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="primary"
                          size="sm"
                          fullWidth
                          trailingIcon={<ArrowUpRight size={16} />}
                        >
                          구매하기
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mt-6 text-xs text-muted-foreground">
            * 구매·결제는 네이버 스마트스토어에서 진행됩니다. 세로로 긴 상세
            이미지는 추후 추가됩니다.
          </p>
        </Section>

        {/* ── 리워드(가격) 4종 ── */}
        <Section bg="none">
          <div className="mb-10">
            <h2 className="text-display-sm font-bold text-foreground">
              단계별 구성
            </h2>
            <p className="mt-2 text-muted-foreground">
              필요한 만큼만. 흐름 이해부터 1:1 코칭까지 4단계로 시작합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TAKMONG.tiers.map((tier) => (
              <div
                key={tier.name}
                className={
                  tier.featured
                    ? "flex flex-col rounded-card border-2 border-primary bg-primary-50 p-6"
                    : "flex flex-col rounded-card border border-border bg-white p-6"
                }
              >
                <div className="flex items-center gap-2 mb-3 min-h-[24px]">
                  {tier.badge && (
                    <Badge
                      variant={tier.featured ? "solid" : "accent"}
                      size="sm"
                    >
                      {tier.badge}
                    </Badge>
                  )}
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  {tier.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground flex-1">
                  {tier.desc}
                </p>
                <p className="mt-4 text-2xl font-bold text-foreground">
                  {tier.price}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-xs text-muted-foreground">
            * 가격은 와디즈 펀딩 리워드 기준입니다. 정식 운영 구성은 상담 시
            안내드립니다.
          </p>
        </Section>

        {/* ── CTA ── */}
        <Section bg="muted" containerClassName="text-center">
          <Reveal y={24} className="max-w-2xl mx-auto">
            <h2 className="text-display-sm md:text-display-md font-bold leading-tight text-foreground">
              상세페이지, 직접 만들어볼까요
            </h2>
            <p className="mt-4 text-muted-foreground text-base md:text-lg">
              지금 필요한 단계부터 15분 무료 상담으로 짚어드립니다.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
              <Button href="/contact" variant="primary" size="lg" fullWidth>
                무료 상담 신청
              </Button>
              <Button
                href={TAKMONG.wadizUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="lg"
                fullWidth
                trailingIcon={<ArrowUpRight size={18} />}
              >
                와디즈에서 보기
              </Button>
              <Button
                href={KAKAO_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                variant="kakao"
                size="lg"
                fullWidth
                leadingIcon={<MessageCircle size={18} />}
              >
                카카오톡 문의
              </Button>
            </div>
          </Reveal>
        </Section>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
