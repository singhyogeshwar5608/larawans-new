"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/site-data";
import { SectionHeading } from "../section-heading";

export function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="What We Do"
          title="Full-stack services for"
          highlight="AI-first businesses"
          description="From AI agents to enterprise ERPs, mobile apps, and growth marketing — Larawans Digital is your single partner for everything digital, engineered to compound ROI over time."
        />

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
                delay: (i % 4) * 0.07,
              }}
              className="group glass-card interactive relative overflow-hidden rounded-3xl p-6"
            >
              {/* Animated gradient glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-60"
                style={{ background: s.accent }}
              />

              {/* Icon */}
              <div
                className="relative mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10"
                style={{ background: s.accent }}
              >
                <s.icon className="h-5.5 w-5.5 text-white" strokeWidth={2} />
                <span className="absolute inset-0 rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]" />
              </div>

              <h3 className="font-display text-lg font-semibold leading-tight tracking-tight">
                {s.title}
              </h3>

              <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted-foreground">
                {s.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-0.5 text-[10.5px] font-medium uppercase tracking-wider text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex items-center gap-1.5 text-[12.5px] font-semibold text-violet-200/80 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                Learn more
                <ArrowUpRight className="h-3.5 w-3.5" />
              </div>

              {/* Hover bottom border accent */}
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                style={{ background: s.accent }}
              />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
