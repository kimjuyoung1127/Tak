"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  PenTool,
  Camera,
  Clock,
  FileText,
  MessageCircle,
  Gift,
  type LucideIcon,
} from "lucide-react";
import type { PortfolioItem } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

interface PortfolioSectionProps {
  portfolios: PortfolioItem[];
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.08 },
  }),
};

const BG_COLORS = [
  "bg-orange-50",
  "bg-blue-50",
  "bg-amber-50",
  "bg-emerald-50",
  "bg-violet-50",
  "bg-rose-50",
  "bg-pink-50",
  "bg-cyan-50",
  "bg-yellow-50",
];

const STAIR_ASPECTS_LEFT_TO_RIGHT = [
  "aspect-[4/5] md:aspect-[4/5]",
  "aspect-[4/5] md:aspect-[4/5]",
  "aspect-[4/5] md:aspect-[4/5]",
];

const STAIR_ASPECTS_RIGHT_TO_LEFT = [
  "aspect-[4/5] md:aspect-[4/5]",
  "aspect-[4/5] md:aspect-[3/5]",
  "aspect-[4/5] md:aspect-[4/5]",
];

const DESIGNER_TAGS = [
  "부산상세페이지",
  "상세페이지",
  "상세페이지제작",
  "상세페이지디자인",
  "상세페이지소스",
  "상세페이지만들기",
  "상세페이지외주",
  "상세페이지후기",
  "제품페이지",
  "랜딩페이지",
  "상품페이지",
  "Ai상세페이지제작",
  "제품촬영스튜디오",
  "스마트스토어상세페이지",
  "쿠팡상세페이지",
  "상세페이지촬영",
  "피그마상세페이지",
];

interface StrengthCard {
  icon: LucideIcon;
  title: string;
  description: string;
}

const STUDIO_STRENGTHS: StrengthCard[][] = [
  [
    { icon: PenTool, title: "콘티 먼저, 디자인은 그 다음", description: "스케치로 방향을 합의한 뒤 제작해 수정을 줄입니다" },
    { icon: Camera, title: "촬영부터 디자인까지 원스톱", description: "기획·촬영·디자인을 한 번에" },
  ],
  [
    { icon: Clock, title: "평균 2~3주 완성", description: "기획부터 납품까지 체계적으로 진행합니다" },
    { icon: FileText, title: "바로 쓰는 완성본 납품", description: "플랫폼 규격에 맞춘 완성 이미지와 운영 가이드를 함께 드립니다" },
  ],
  [
    { icon: Gift, title: "15분 무료 상담", description: "프로젝트 가능성을 부담 없이 확인하세요" },
    { icon: MessageCircle, title: "24시간 내 회신", description: "빠른 소통으로 프로젝트를 원활하게" },
  ],
];

const LANDING_PRIORITY_SLUGS = [
  "strap",
  "tray-cover",
  "baby-room",
  "water-jelly",
  "baby-bed",
  "baby-mat",
  "baby-hairpin",
];

type StairDirection = "leftToRight" | "rightToLeft";

function getRowDirection(rowIndex: number): StairDirection {
  return rowIndex % 2 === 0 ? "leftToRight" : "rightToLeft";
}

function getStairAspects(direction: StairDirection): string[] {
  return direction === "leftToRight"
    ? STAIR_ASPECTS_LEFT_TO_RIGHT
    : STAIR_ASPECTS_RIGHT_TO_LEFT;
}

/** 랜딩에는 우선순위 기준 최대 9개를 중복 없이 노출 */
function buildSlots(portfolios: PortfolioItem[], count = 9): PortfolioItem[] {
  if (portfolios.length === 0) return [];

  const seen = new Set<string>();
  const prioritized = LANDING_PRIORITY_SLUGS.map((slug) =>
    portfolios.find((item) => item.slug === slug)
  )
    .filter((item): item is PortfolioItem => Boolean(item))
    .filter((item) => {
      if (seen.has(item.slug)) return false;
      seen.add(item.slug);
      return true;
    });

  const rest = portfolios.filter((item) => {
    if (seen.has(item.slug)) return false;
    seen.add(item.slug);
    return true;
  });

  return [...prioritized, ...rest].slice(0, count);
}

interface MessageCardData {
  title: string;
  body: string;
  tags: string[];
}

function buildMessageCard(groupIndex: number): MessageCardData {
  if (groupIndex === 0) {
    return {
      title: "검색되는 언어로\n설득 구조를 설계합니다",
      body: "상세페이지 키워드를 단순 나열하지 않고, 전환 문맥에 맞춰 배치합니다.",
      tags: DESIGNER_TAGS.slice(0, 8),
    };
  }

  return {
    title: "플랫폼별 흐름에 맞춘\n판매 페이지를 만듭니다",
    body: "스마트스토어/쿠팡/랜딩 문법에 맞춰 같은 상품도 다르게 설계합니다.",
    tags: DESIGNER_TAGS.slice(8, 17),
  };
}

export default function PortfolioSection({ portfolios }: PortfolioSectionProps) {
  const slots = buildSlots(portfolios, 9);

  // 3개씩 그룹: [0-2], [3-5], [6-8]
  const groups = Array.from({ length: 3 }, (_, g) =>
    slots.slice(g * 3, g * 3 + 3)
  );

  let idx = 0;

  return (
    <section id="portfolio" className="section-padding">
      <div className="container-main">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-display-sm md:text-display-md font-bold text-foreground break-keep text-balance">
            Selected Works
          </h2>
          <p className="mt-2 text-muted-foreground break-keep text-pretty">
            기획부터 납품까지, 설득의 구조로 완성한 작업들
          </p>
        </div>

        {/* 3그룹 × (이미지 행 + 메타 행) = 6행 */}
        <div className="space-y-5">
          {groups.map((group, g) => (
            <div key={g} className="space-y-5">
              {/* ── 포트폴리오 이미지 카드 행 ── 모바일: 가로 스와이프 / md+: 계단식 그리드 */}
              <div className="flex md:grid md:grid-cols-3 gap-5 items-end overflow-x-auto md:overflow-visible snap-x snap-mandatory -mx-5 px-5 md:mx-0 md:px-0 pb-2 md:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {group.map((item, col) => {
                  const i = idx++;
                  const imageRowDirection = getRowDirection(g * 2);
                  const imageAspects = getStairAspects(imageRowDirection);

                  return (
                    <motion.div
                      key={`img-${g}-${col}`}
                      custom={i}
                      variants={cardVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-40px" }}
                      className="shrink-0 min-w-[78%] snap-start md:min-w-0 md:shrink"
                    >
                      <Link
                        href={`/portfolio/${item.slug}`}
                        className={`group relative block rounded-none overflow-hidden ${BG_COLORS[(g * 3 + col) % BG_COLORS.length]} transition-transform duration-200 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2`}
                      >
                        <div className={`${imageAspects[col]} relative overflow-hidden`}>
                          {item.thumbnail ? (
                            <Image
                              src={item.thumbnail}
                              alt={item.title}
                              fill
                              sizes="(max-width: 768px) 100vw, 33vw"
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              priority={g === 0 && col === 0}
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                              <p className="text-sm font-medium text-muted-foreground">
                                {item.title}
                              </p>
                            </div>
                          )}
                        </div>
                        <div className="absolute bottom-4 left-4 flex gap-1.5">
                          {item.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 rounded-full bg-white/80 text-xs font-medium text-foreground backdrop-blur-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* ── 스튜디오 강점 카드 행 ── 모바일: 2열 압축 / md+: 2장=가운데, 3장=3열 */}
              {(() => {
                const strengthCount = STUDIO_STRENGTHS[g].length;
                const gridClassName =
                  strengthCount === 2
                    ? "grid grid-cols-2 gap-3 md:gap-5 items-stretch md:max-w-2xl md:mx-auto"
                    : "grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 items-stretch";
                return (
                  <div className={gridClassName}>
                    {STUDIO_STRENGTHS[g].map((strength, col) => {
                      const i = idx++;
                      const Icon = strength.icon;
                      return (
                        <motion.div
                          key={`strength-${g}-${col}`}
                          custom={i}
                          variants={cardVariants}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, margin: "-40px" }}
                          className="h-full"
                        >
                          <Card padded={false} className="h-full">
                            <div className="p-5 h-full flex flex-col">
                              <div className="flex items-center gap-3 mb-2">
                                <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center text-primary">
                                  <Icon className="w-4 h-4" />
                                </div>
                                <p className="text-sm font-semibold text-foreground break-keep">
                                  {strength.title}
                                </p>
                              </div>
                              <p className="text-xs text-muted-foreground break-keep text-pretty flex-1">
                                {strength.description}
                              </p>
                            </div>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </div>
                );
              })()}

              {/* ── 그룹 사이 멘트카드 (2개 고정) ── */}
              {g < groups.length - 1 && (
                <motion.div
                  custom={idx++}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  className="mt-4 md:mt-12"
                >
                  {(() => {
                    const message = buildMessageCard(g);

                    return (
                      <div className="flex justify-start md:justify-center">
                        <div className="w-full md:max-w-2xl rounded-card p-5 md:p-6 bg-white border border-border shadow-card transition-[box-shadow,transform] duration-200 hover:shadow-card-hover hover:-translate-y-3">
                          <div className="text-left">
                            <span className="text-xs font-medium uppercase tracking-widest text-primary/80">
                              Strategy Note
                            </span>
                            <p className="mt-3 text-xl md:text-2xl font-bold whitespace-pre-line leading-tight text-foreground break-keep text-balance">
                              {message.title}
                            </p>
                            <p className="mt-3 text-sm text-muted-foreground break-keep text-pretty">
                              {message.body}
                            </p>
                          </div>
                          <div className="mt-4 flex flex-wrap gap-2 justify-start">
                            {message.tags.slice(0, 5).map((tag) => (
                              <Badge key={`${g}-${tag}`} variant="accent" size="sm">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* 전체 포트폴리오 보기 (/portfolio index) */}
        <div className="mt-12 text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-600 transition-colors"
          >
            전체 포트폴리오 보기
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
