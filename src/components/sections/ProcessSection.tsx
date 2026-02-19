"use client";

import { motion } from "framer-motion";
import { Search, PenTool, Palette, Package } from "lucide-react";
import { PROCESS_STEPS } from "@/lib/constants";

const ICONS: Record<string, React.ElementType> = {
  Search,
  PenTool,
  Palette,
  Package,
};

export default function ProcessSection() {
  return (
    <section id="process" className="section-padding bg-white">
      <div className="container-main">
        <div className="text-center mb-16">
          <h2 className="text-display-sm md:text-display-md font-bold text-foreground">
            프로세스
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            체계적인 4단계 워크플로우로 수정을 줄이고 완성도를 끌어올립니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROCESS_STEPS.map((step, i) => {
            const Icon = ICONS[step.icon];
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.12 }}
                className="relative rounded-card bg-background p-6 text-center"
              >
                {/* Step Number */}
                <span className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                  {String(step.step).padStart(2, "0")}
                </span>

                {/* Icon */}
                <div className="mt-4 mb-5 mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary">
                  {Icon && <Icon size={28} />}
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>

                {/* Deliverable */}
                <div className="mt-4 inline-block px-3 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground">
                  {step.deliverable}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
