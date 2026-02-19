"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { FINAL_CTA_COPY, KAKAO_CHANNEL_URL } from "@/lib/constants";

export default function FinalCTASection() {
  return (
    <section className="bg-cta-dark text-cta-dark-foreground">
      <div className="container-main section-padding text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-display-sm md:text-display-md font-bold leading-tight">
            {FINAL_CTA_COPY.headline}
          </h2>

          <p className="mt-4 text-gray-300 text-base md:text-lg">
            {FINAL_CTA_COPY.sub}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
            {/* Primary CTA */}
            <a
              href="#contact"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 min-h-[48px] rounded-xl bg-primary text-primary-foreground text-sm md:text-base font-semibold hover:bg-primary-600 transition-colors shadow-cta"
            >
              {FINAL_CTA_COPY.primaryCta}
            </a>

            {/* Secondary CTA */}
            <a
              href={KAKAO_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 min-h-[48px] rounded-xl border border-gray-600 text-gray-200 text-sm md:text-base font-semibold hover:border-gray-400 hover:text-white transition-colors"
            >
              <MessageCircle size={18} />
              {FINAL_CTA_COPY.secondaryCta}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
