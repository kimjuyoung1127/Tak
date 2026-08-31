import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, Check, MessageCircle } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingCTA from "@/components/layout/FloatingCTA";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { KAKAO_CHANNEL_URL } from "@/lib/constants";
import {
  TEMPLATE_PRODUCTS,
  discountRate,
  formatPrice,
} from "@/lib/content/templates";
import { getTemplateImages } from "@/lib/content/template-images";
import { DetailMedia } from "@/components/ui/DetailMedia";
import { JsonLd } from "@/components/seo/JsonLd";
import { productSchema, breadcrumbSchema } from "@/lib/seo/schema";

export function generateStaticParams() {
  return TEMPLATE_PRODUCTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const product = TEMPLATE_PRODUCTS.find((p) => p.slug === params.slug);
  if (!product) return { title: "AI 템플릿" };
  return {
    title: `${product.name} · AI 템플릿`,
    description: product.summary,
    alternates: { canonical: `/templates/${params.slug}` },
    openGraph: {
      title: product.name,
      description: product.summary,
      type: "website",
      locale: "ko_KR",
      images: product.image ? [{ url: product.image }] : undefined,
    },
  };
}

export default function TemplateDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = TEMPLATE_PRODUCTS.find((p) => p.slug === params.slug);
  if (!product) notFound();

  const images = getTemplateImages(product.slug);
  const rate = discountRate(product);

  return (
    <>
      <JsonLd
        data={[
          productSchema({
            name: product.name,
            description: product.summary,
            price: product.price,
            image: product.image,
            storeUrl: product.storeUrl,
          }),
          breadcrumbSchema([
            { name: "홈", path: "/" },
            { name: "AI 템플릿", path: "/takmong" },
            { name: product.name, path: `/templates/${product.slug}` },
          ]),
        ]}
      />
      <Header />
      <main className="pt-24 pb-20">
        <article className="container-main max-w-3xl px-5 md:px-8">
          {/* Back */}
          <Link
            href="/takmong"
            className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={16} />
            AI 템플릿 스토어로 돌아가기
          </Link>

          {/* Header */}
          <header className="mb-10">
            <div className="flex items-center gap-2">
              <Badge variant="solid" size="sm">
                {product.category}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {product.brand}
              </span>
            </div>
            <h1 className="mt-4 text-display-sm md:text-display-md font-bold leading-tight text-foreground">
              {product.name}
            </h1>
            <p className="mt-3 text-base text-muted-foreground md:text-lg">
              {product.summary}
            </p>

            <ul className="mt-6 space-y-2.5">
              {product.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-2 text-sm text-foreground/90 md:text-base"
                >
                  <Check size={18} className="mt-0.5 shrink-0 text-primary" />
                  {h}
                </li>
              ))}
            </ul>

            {product.freebie && (
              <p className="mt-5 rounded-md bg-primary-50 px-4 py-3 text-sm text-primary-700">
                🎁 {product.freebie}
              </p>
            )}

            {/* Price + Buy */}
            <div className="mt-8 flex flex-col gap-4 rounded-card border border-border bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-baseline gap-2">
                  {rate > 0 && (
                    <span className="text-base font-bold text-primary">
                      {rate}%
                    </span>
                  )}
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-muted-foreground line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-3xl font-bold text-foreground">
                  {formatPrice(product.price)}
                </p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button
                  href={product.storeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  size="md"
                  trailingIcon={<ArrowUpRight size={16} />}
                >
                  스마트스토어에서 구매
                </Button>
                <Button
                  href={KAKAO_CHANNEL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="kakao"
                  size="md"
                  leadingIcon={<MessageCircle size={16} />}
                >
                  문의
                </Button>
              </div>
            </div>
          </header>

          {/* 세로로 긴 상세 이미지 (순서대로 스택) */}
          {images.length > 0 ? (
            <div className="overflow-hidden rounded-card-lg bg-white">
              {images.map((asset, i) => (
                <DetailMedia
                  key={asset.src || i}
                  asset={asset}
                  alt={`${product.name} 상세 ${i + 1}`}
                  sizes="(max-width: 768px) 100vw, 768px"
                  priority={i === 0}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-card border border-dashed border-border bg-muted py-20 text-center text-sm text-muted-foreground">
              상세 이미지 준비중
            </div>
          )}

          {/* 하단 구매 CTA */}
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button
              href={product.storeUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="lg"
              fullWidth
              trailingIcon={<ArrowUpRight size={18} />}
            >
              스마트스토어에서 구매하기
            </Button>
          </div>
        </article>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
