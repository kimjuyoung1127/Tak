"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { HERO_COPY } from "@/lib/constants";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative section-padding pt-32 md:pt-40 lg:pt-48 pb-16 lg:pb-24"
    >
      <div className="container-main text-center">
        {/* Headline */}
        <motion.h1
          className="text-display-sm md:text-display-md lg:text-display-lg tracking-tight text-foreground"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {HERO_COPY.headline}
          <br />
          <span className="text-primary">{HERO_COPY.headlineAccent}</span>
          {HERO_COPY.headlineSuffix}
        </motion.h1>

        {/* Sub */}
        <motion.p
          className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {HERO_COPY.sub}
        </motion.p>

        {/* CTA */}
        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 md:px-8 md:py-4 min-h-[48px] rounded-xl bg-primary text-primary-foreground text-sm md:text-base font-semibold hover:bg-primary-600 transition-colors shadow-cta"
          >
            {HERO_COPY.cta}
            <ArrowRight size={18} />
          </a>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          className="mt-12 flex flex-wrap items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          {HERO_COPY.trustBadges.map((badge) => (
            <span
              key={badge}
              className="px-4 py-1.5 rounded-full bg-primary-50 text-primary-700 text-sm font-medium"
            >
              {badge}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
