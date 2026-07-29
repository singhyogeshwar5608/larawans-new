"use client";

import { motion } from "framer-motion";
import { Counter } from "../counter";
import { stats } from "@/lib/site-data";
import { SectionHeading } from "../section-heading";

const HIGHLIGHTS = [
  {
    title: "AI-First by Default",
    body: "Every project ships with LLMs, RAG, and automation baked into the architecture — not bolted on later. Your software gets smarter the longer you use it.",
    icon: "✦",
    accent: "#7c5cff",
  },
  {
    title: "Senior-Only Engineers",
    body: "No juniors learning on your budget. Every line of code is written by engineers with 6+ years of production experience across 12+ industries.",
    icon: "◆",
    accent: "#00e0c6",
  },
  {
    title: "Transparent Delivery",
    body: "Weekly demos, GitHub access, Slack channels, and real-time dashboards. You always know what we're building, why, and how it maps to your KPIs.",
    icon: "▲",
    accent: "#ff4dd2",
  },
  {
    title: "Long-Term Partnership",
    body: "92% of our clients renew after the first project. We're not a vendor — we're the team you call when something needs to ship, scale, or survive.",
    icon: "●",
    accent: "#ffb14d",
  },
];

export function WhyLarawans() {
  return (
    <section id="why-larawans" className="relative bg-[#f8f9fc] pt-24 sm:pt-32 pb-[30px] sm:pb-[50px]">
      {/* Soft glow background — light theme */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-[120px]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(124,92,255,0.12), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Light-theme heading overrides */}
        <div className="[&_.rounded-full]:border-neutral-200 [&_.rounded-full]:bg-white [&_.rounded-full]:text-neutral-500 [&_h2]:text-neutral-900 [&_p]:text-neutral-600">
          <SectionHeading
            eyebrow="Why Larawans"
            title="The team behind"
            highlight="compounding outcomes"
            description={undefined}
          />
        </div>

        {/* Animated stats */}
        <div className="mt-16 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
                delay: i * 0.1,
              }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a1a] p-6 text-center shadow-[0_2px_12px_rgba(0,0,0,0.06)] sm:p-8"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 -top-px h-px opacity-50"
                style={{
                  background:
                    "linear-gradient(90deg,transparent,#7c5cff,#00e0c6,transparent)",
                }}
              />
              <div className="font-display text-5xl font-extrabold tracking-tight sm:text-6xl">
                <span className="text-gradient-aurora">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </span>
              </div>
              <div className="mt-3 text-sm font-medium uppercase tracking-[0.16em] text-neutral-400">
                {stat.label}
              </div>
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-12 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-50"
                style={{ background: "#7c5cff" }}
              />
            </motion.div>
          ))}
        </div>

        {/* Highlight pillars */}
        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {HIGHLIGHTS.map((h, i) => (
            <motion.div
              key={h.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
              className="group relative flex h-full flex-col rounded-3xl border border-white/10 bg-[#0a0a1a] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-colors hover:border-white/20"
            >
              <div
                className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl text-base font-bold"
                style={{
                  color: h.accent,
                  background: `${h.accent}1a`,
                  boxShadow: `0 0 18px ${h.accent}55`,
                }}
              >
                {h.icon}
              </div>
              <h4 className="font-display text-base font-semibold tracking-tight text-white">
                {h.title}
              </h4>
              <p className="mt-auto text-[13px] leading-relaxed text-neutral-400">
                {h.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
