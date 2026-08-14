"use client";

import { motion } from "framer-motion";
import { processSteps } from "@/lib/site-data";
import { SectionHeading } from "../section-heading";

export function DevelopmentProcess() {
  return (
    <section id="process" className="relative pt-[30px] sm:pt-[50px] pb-[30px]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="How We Work"
          title="A proven process from"
          highlight="idea to impact"
          description={undefined}
        />

        <div className="relative mx-auto mt-16 max-w-4xl">
          {/* Center vertical line (desktop) */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-[2px] -translate-x-1/2 lg:block"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(124,92,255,0.4), transparent)' }}
          />
          {/* Left vertical line (mobile) */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-6 top-0 h-full w-[2px] lg:hidden"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(124,92,255,0.4), transparent)' }}
          />

          <ol className="relative space-y-6 lg:space-y-2">
            {processSteps.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <li key={step.title} className="relative">
                  <div className="lg:grid lg:grid-cols-2 lg:gap-12">
                    {/* Mobile layout */}
                    <div className="relative pl-16 lg:hidden">
                      <NodeMarker index={i} isMobile />
                      <StepCard step={step} index={i} />
                    </div>

                    {/* Desktop layout */}
                    {isLeft ? (
                      <>
                        <div className="hidden lg:block">
                          <StepCard step={step} index={i} align="right" />
                        </div>
                        <div className="hidden lg:block">
                          <NodeMarker index={i} />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="hidden lg:block">
                          <NodeMarker index={i} />
                        </div>
                        <div className="hidden lg:block">
                          <StepCard step={step} index={i} align="left" />
                        </div>
                      </>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

function NodeMarker({ index, isMobile = false }: { index: number; isMobile?: boolean }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute z-10 flex h-12 w-12 items-center justify-center rounded-full border border-[#7c5cff]/40 bg-[#0a0c20] text-sm font-bold text-[#00e0c6] shadow-[0_0_24px_rgba(124,92,255,0.4)] ${
        isMobile
          ? "left-0 top-0"
          : "left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2"
      }`}
    >
      <span className="font-mono">{String(index + 1).padStart(2, "0")}</span>
      <span
        aria-hidden
        className="absolute inset-0 -z-10 animate-pulse-glow rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(124,92,255,0.4) 0%, transparent 70%)",
        }}
      />
    </motion.div>
  );
}

function StepCard({
  step,
  index,
  align = "left",
}: {
  step: (typeof processSteps)[number];
  index: number;
  align?: "left" | "right";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, x: align === "left" ? 20 : -20 }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
      className={`group relative overflow-hidden rounded-3xl border border-black/[0.06] p-6 interactive ${
        align === "right" ? "lg:text-right" : ""
      }`}
      style={{ background: "#F3F3EE", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}
    >
      <div
        className={`flex items-center gap-3 ${
          align === "right" ? "lg:flex-row-reverse" : ""
        }`}
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ border: "1px solid rgba(0,0,0,0.08)", background: "linear-gradient(135deg, rgba(124,92,255,0.12), rgba(0,224,198,0.08))", color: "#7c5cff" }}>
          <step.icon className="h-5 w-5" strokeWidth={1.8} />
        </div>
        <div className={`flex flex-col ${align === "right" ? "lg:items-end" : ""}`}>
          <span className="font-mono text-[10.5px] uppercase tracking-[0.2em]" style={{ color: "#6B7280" }}>
            Stage {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="font-display text-lg font-semibold tracking-tight" style={{ color: "#1A1A2E" }}>
            {step.title}
          </h3>
        </div>
      </div>
      <p className="mt-3 text-[13.5px] leading-relaxed" style={{ color: "#4B5563" }}>
        {step.description}
      </p>
    </motion.div>
  );
}
