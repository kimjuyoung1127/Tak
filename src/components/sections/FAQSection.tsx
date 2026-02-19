"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { FAQ_ITEMS } from "@/lib/constants";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section id="faq" className="section-padding bg-white">
      <div className="container-main max-w-3xl">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">
            Got Questions?
          </span>
          <h2 className="mt-2 text-display-sm md:text-display-md font-bold text-foreground">
            자주 묻는 질문
          </h2>
        </div>

        {/* Accordion */}
        <div className="divide-y divide-border rounded-card-lg border border-border overflow-hidden bg-white">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i}>
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-muted/50 transition-colors"
                aria-expanded={openIndex === i}
              >
                <span className="text-sm md:text-base font-medium text-foreground pr-4">
                  {item.question}
                </span>
                <ChevronDown
                  size={20}
                  className={cn(
                    "flex-shrink-0 text-muted-foreground transition-transform duration-200",
                    openIndex === i && "rotate-180"
                  )}
                />
              </button>

              {/* Content — 단일 확장 (PRD 6.1.6) */}
              <motion.div
                initial={false}
                animate={{
                  height: openIndex === i ? "auto" : 0,
                  opacity: openIndex === i ? 1 : 0,
                }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed">
                  {item.answer}
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* 보조 CTA */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            원하는 답을 찾지 못하셨나요?
          </p>
          <a
            href="#contact"
            className="mt-3 inline-flex items-center text-sm font-semibold text-primary hover:text-primary-700 transition-colors"
          >
            문의 폼으로 직접 질문하기 &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
