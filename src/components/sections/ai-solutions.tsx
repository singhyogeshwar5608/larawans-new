"use client";

import { motion } from "framer-motion";
import { ArrowRight, Cpu } from "lucide-react";
import { aiSolutions } from "@/lib/site-data";
import { SectionHeading } from "../section-heading";
import { MagneticButton } from "../magnetic-button";

export function AISolutions() {
  return (
    <section id="ai-solutions" className="relative bg-[#f8f9fc] py-24 sm:py-32">
      {/* Light theme AI glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[1] opacity-50"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(124,92,255,0.08), transparent 60%), radial-gradient(ellipse 50% 50% at 50% 100%, rgba(0,224,198,0.06), transparent 60%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Light-theme heading overrides */}
        <div className="[&_.rounded-full]:border-neutral-200 [&_.rounded-full]:bg-white [&_.rounded-full]:text-neutral-500 [&_h2]:text-neutral-900 [&_p]:text-neutral-600">
          <SectionHeading
            eyebrow="AI Solutions"
            title="Intelligent systems that"
            highlight="do the work for you"
            description="AI isn't a feature we add at the end — it's the foundation. These six AI capabilities can be deployed standalone or woven into any of our software products to multiply their impact."
          />
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {aiSolutions.map((sol, i) => (
            <motion.article
              key={sol.title}
              initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
                delay: (i % 3) * 0.08,
              }}
              className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[#0d1030] via-[#0a0c24] to-[#0a0c24] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[#00e0c6]/40 interactive sm:p-7"
            >
              {/* Animated conic border glow on hover */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "conic-gradient(from 180deg at 50% 50%, transparent 0deg, rgba(124,92,255,0.4) 90deg, transparent 180deg, rgba(0,224,198,0.4) 270deg, transparent 360deg)",
                  filter: "blur(8px)",
                }}
              />

              <div className="relative">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-[#7c5cff]/30 to-[#00e0c6]/20">
                  <sol.icon className="h-5.5 w-5.5 text-[#00e0c6]" strokeWidth={1.8} />
                </div>

                <h3 className="font-display text-xl font-semibold tracking-tight">
                  {sol.title}
                </h3>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted-foreground">
                  {sol.description}
                </p>

                <div className="mt-5 flex items-center gap-2 text-[12.5px] font-semibold text-violet-200/80">
                  <Cpu className="h-3.5 w-3.5" />
                  <span>Powered by LLM + RAG</span>
                </div>
              </div>

              {/* Decorative circuit lines */}
              <svg
                aria-hidden
                className="pointer-events-none absolute -bottom-2 -right-2 h-24 w-24 opacity-20 transition-opacity duration-500 group-hover:opacity-50"
                viewBox="0 0 100 100"
                fill="none"
              >
                <circle cx="50" cy="50" r="40" stroke="#7c5cff" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="28" stroke="#00e0c6" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="16" stroke="#ff4dd2" strokeWidth="0.5" />
                <line x1="10" y1="50" x2="90" y2="50" stroke="#7c5cff" strokeWidth="0.5" />
                <line x1="50" y1="10" x2="50" y2="90" stroke="#00e0c6" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="3" fill="#00e0c6" />
              </svg>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 flex justify-center"
        >
          <MagneticButton href="#contact" variant="glass" className="px-7 py-3.5">
            Explore AI strategy session
            <ArrowRight className="h-4 w-4" />
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
