"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { ABOUT_COPY } from "@/lib/constants";

export default function AboutSection() {
  return (
    <section id="about" className="section-padding">
      <div className="container-main max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Title */}
          <h2 className="text-display-sm md:text-display-md font-bold text-foreground leading-tight">
            &ldquo;{ABOUT_COPY.title}&rdquo;
          </h2>

          {/* Paragraphs */}
          <div className="mt-8 space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
            {ABOUT_COPY.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* Trust Bullets */}
          <ul className="mt-8 space-y-3">
            {ABOUT_COPY.bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex items-start gap-3 text-foreground"
              >
                <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary">
                  <Check size={12} strokeWidth={3} />
                </span>
                <span className="text-sm md:text-base">{bullet}</span>
              </li>
            ))}
          </ul>

          {/* Micro CTA */}
          <div className="mt-10">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-50 text-primary-700 text-sm font-semibold hover:bg-primary-100 transition-colors"
            >
              {ABOUT_COPY.cta}
              <ArrowRight size={16} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
