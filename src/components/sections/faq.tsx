"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { faqs } from "@/lib/site-data";
import { SectionHeading } from "../section-heading";
import { MagneticButton } from "../magnetic-button";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative overflow-hidden bg-[#050614] pt-[30px] pb-[30px]">
      {/* Dark gradient orbs — hero-style background */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        {/* Large violet orb */}
        <div className="absolute -left-20 -top-10 h-[500px] w-[500px] rounded-full" style={{ background: 'rgba(124,92,255,0.25)', filter: 'blur(120px)' }} />
        {/* Cyan orb */}
        <div className="absolute -right-16 top-1/4 h-[420px] w-[420px] rounded-full" style={{ background: 'rgba(0,224,198,0.2)', filter: 'blur(110px)' }} />
        {/* Magenta orb */}
        <div className="absolute bottom-0 left-1/3 h-[350px] w-[350px] rounded-full" style={{ background: 'rgba(255,77,210,0.12)', filter: 'blur(100px)' }} />
        {/* Central aurora glow */}
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: 'radial-gradient(ellipse at center, rgba(124,92,255,0.35) 0%, rgba(0,224,198,0.2) 40%, rgba(255,77,210,0.1) 65%, transparent 85%)', filter: 'blur(60px)' }} />
      </div>

      <div className="relative z-10 mx-auto w-[97%] px-4 sm:px-6 md:w-[70%]">
        <SectionHeading
          title="Answers to the"
          highlight="questions that matter"
          titleStyle={{ color: '#eef1ff' }}
        />

        <div className="mt-14 flex flex-col gap-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.04 }}
                className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 interactive ${
                  isOpen
                    ? "border-[#7c5cff]/40"
                    : "border-white/[0.08] bg-white/[0.02] hover:border-white/15"
                }`}
                style={isOpen ? { background: 'linear-gradient(to bottom, rgba(124,92,255,0.08), transparent)' } : undefined}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`font-display text-base font-semibold tracking-tight transition-colors sm:text-lg ${
                      isOpen ? "text-gradient-aurora" : "text-foreground"
                    }`}
                  >
                    {faq.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors ${
                      isOpen
                        ? "border-[#00e0c6]/50 bg-[#00e0c6]/10 text-[#00e0c6]"
                        : "border-white/10 bg-white/[0.04] text-muted-foreground group-hover:text-foreground"
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-[13.5px] leading-relaxed text-muted-foreground sm:px-6 sm:text-[14.5px]">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Bottom accent when open */}
                {isOpen && (
                  <motion.span
                    layoutId="faq-accent"
                    className="absolute inset-x-0 bottom-0 h-px"
                    style={{
                      background:
                        "linear-gradient(90deg,transparent,#7c5cff,#00e0c6,transparent)",
                    }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 flex flex-col items-center justify-center gap-4 rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 text-center sm:flex-row sm:text-left"
        >
          <div>
            <h3 className="font-display text-xl font-semibold tracking-tight">
              Still have questions?
            </h3>
            <p className="mt-1 text-[13.5px] text-muted-foreground">
              Book a 30-minute call. No pitch, just answers.
            </p>
          </div>
          <MagneticButton href="#contact" variant="neon" className="px-6 py-3">
            Talk to an engineer
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
