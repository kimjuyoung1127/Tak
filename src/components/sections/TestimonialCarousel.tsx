"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { DURATION, EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/lib/content/testimonials";

const AUTOPLAY_MS = 6000;
const SWIPE_THRESHOLD = 80;

/**
 * 후기 캐러셀 — framer-motion drag/자동재생만으로 구성(새 라이브러리 0).
 * 한 번에 한 후기를 크게 보여주고, 드래그·화살표·점으로 전환한다.
 * "use client" 경계를 이 컴포넌트로 모아 섹션은 서버 컴포넌트로 남긴다.
 */
export function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = items.length;

  const go = useCallback(
    (dir: number) => {
      setDirection(dir);
      setIndex((prev) => (prev + dir + count) % count);
    },
    [count]
  );

  const goTo = useCallback(
    (next: number) => {
      setDirection(next > index ? 1 : -1);
      setIndex(next);
    },
    [index]
  );

  // 자동재생 — hover/포커스/드래그 시 정지, 모션 최소화 설정 시 비활성
  useEffect(() => {
    if (paused || reduceMotion) return;
    const timer = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % count);
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [paused, reduceMotion, count]);

  const active = items[index];

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: reduceMotion ? 0 : dir * 60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: reduceMotion ? 0 : dir * -60 }),
  };

  return (
    <div
      className="relative mx-auto max-w-2xl"
      role="group"
      aria-roledescription="carousel"
      aria-label="고객 후기"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="relative min-h-[360px] overflow-hidden sm:min-h-[320px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.blockquote
            key={active.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: DURATION.md, ease: EASE.out }}
            drag={reduceMotion ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x < -SWIPE_THRESHOLD) go(1);
              else if (info.offset.x > SWIPE_THRESHOLD) go(-1);
            }}
            className="cursor-grab rounded-card border border-border bg-white p-8 shadow-card active:cursor-grabbing md:p-10"
          >
            <div className="flex items-center justify-between">
              <Quote size={28} className="text-primary/30" aria-hidden />
              <Badge variant="accent" size="sm">
                {active.valueTag}
              </Badge>
            </div>
            <p className="mt-5 text-pretty break-keep text-base leading-relaxed text-foreground md:text-lg">
              {active.quote}
            </p>
            <footer className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-border pt-4">
              <span className="break-keep font-bold text-foreground">
                {active.author}
              </span>
              <span className="text-border" aria-hidden>
                ·
              </span>
              <span className="break-keep text-sm text-muted-foreground">
                {active.project}
              </span>
            </footer>
          </motion.blockquote>
        </AnimatePresence>
      </div>

      {/* 컨트롤 — 이전/다음 + 점 */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="이전 후기"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex items-center gap-2" role="tablist" aria-label="후기 선택">
          {items.map((item, i) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`${i + 1}번째 후기 보기`}
              onClick={() => goTo(i)}
              /* 점은 8px 그대로 보이되 누를 수 있는 면적은 24px — WCAG 2.2 타깃 크기 */
              className="group flex h-6 w-6 items-center justify-center"
            >
              <span
                className={cn(
                  "block h-2 rounded-full transition-all",
                  i === index
                    ? "w-6 bg-primary"
                    : "w-2 bg-border group-hover:bg-muted-foreground"
                )}
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(1)}
          aria-label="다음 후기"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <p aria-live="polite" className="sr-only">
        후기 {index + 1} / {count}
      </p>
    </div>
  );
}
