"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Cpu } from "lucide-react";
import { aiSolutions } from "@/lib/site-data";
import { MagneticButton } from "../magnetic-button";

/* ── Custom SVG icons for each AI card ── */
const AIIconMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  "AI Chatbots": (props) => (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <rect x="8" y="6" width="32" height="24" rx="4" stroke="currentColor" strokeWidth="2" />
      <path d="M16 32h16M24 32v6M18 38h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="18" cy="18" r="2.5" fill="currentColor" opacity="0.7" />
      <circle cx="30" cy="18" r="2.5" fill="currentColor" opacity="0.7" />
      <path d="M18 24c2 2 8 2 12 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  "AI Voice Agents": (props) => (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <path d="M14 24c0-5.5 4.5-10 10-10s10 4.5 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M10 24c0-7.7 6.3-14 14-14s14 6.3 14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <path d="M18 24c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <rect x="22" y="26" width="4" height="10" rx="2" fill="currentColor" opacity="0.6" />
      <circle cx="24" cy="38" r="2" fill="currentColor" />
    </svg>
  ),
  "AI Automation": (props) => (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <circle cx="24" cy="14" r="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="34" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="36" cy="34" r="4" stroke="currentColor" strokeWidth="2" />
      <line x1="21" y1="18" x2="14" y2="31" stroke="currentColor" strokeWidth="2" />
      <line x1="27" y1="18" x2="34" y2="31" stroke="currentColor" strokeWidth="2" />
      <path d="M8 14l4 4M40 14l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <circle cx="24" cy="14" r="1.5" fill="currentColor" />
      <circle cx="12" cy="34" r="1.5" fill="currentColor" />
      <circle cx="36" cy="34" r="1.5" fill="currentColor" />
    </svg>
  ),
  "AI Document Processing": (props) => (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <rect x="10" y="6" width="24" height="34" rx="3" stroke="currentColor" strokeWidth="2" />
      <path d="M34 14l6-2v28l-6 2V14z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <line x1="16" y1="16" x2="28" y2="16" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
      <line x1="16" y1="22" x2="28" y2="22" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
      <line x1="16" y1="28" x2="24" y2="28" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
      <path d="M18 6v-2h12v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <circle cx="37" cy="26" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M35 24l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "AI CRM": (props) => (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <circle cx="24" cy="14" r="6" stroke="currentColor" strokeWidth="2" />
      <circle cx="10" cy="22" r="4" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      <circle cx="38" cy="22" r="4" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      <path d="M18 22v4c0 4 6 8 6 8s6-4 6-8v-4" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <line x1="14" y1="24" x2="20" y2="22" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      <line x1="34" y1="24" x2="28" y2="22" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      <path d="M12 34c4 2 16 2 24 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <circle cx="24" cy="14" r="2" fill="currentColor" opacity="0.5" />
    </svg>
  ),
  "AI Customer Support": (props) => (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <path d="M12 20c0-6.6 5.4-12 12-12s12 5.4 12 12v4c0 1.1-.9 2-2 2h-2v6c0 2.2-1.8 4-4 4h-8c-2.2 0-4-1.8-4-4v-6h-2c-1.1 0-2-.9-2-2v-4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M16 28v-8M32 28v-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <circle cx="20" cy="22" r="2" fill="currentColor" opacity="0.7" />
      <circle cx="28" cy="22" r="2" fill="currentColor" opacity="0.7" />
      <path d="M22 26c0 1 1 1.5 2 1.5s2-.5 2-1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <circle cx="38" cy="14" r="5" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
      <path d="M36 14h4M38 12v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    </svg>
  ),
};

/** AI solution titles jo typewrite honge */
const ROTATING_WORDS = aiSolutions.map((s) => s.title);

const TYPING_SPEED = 70;
const DELETING_SPEED = 40;
const PAUSE_AFTER_TYPE = 1500;
const PAUSE_AFTER_DELETE = 350;

export function AISolutions() {
  const [displayedText, setDisplayedText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const currentWord = ROTATING_WORDS[wordIndex];

    const tick = () => {
      if (!isDeleting) {
        if (displayedText.length < currentWord.length) {
          setDisplayedText(currentWord.slice(0, displayedText.length + 1));
          timeoutRef.current = setTimeout(tick, TYPING_SPEED + Math.random() * 30);
        } else {
          timeoutRef.current = setTimeout(() => setIsDeleting(true), PAUSE_AFTER_TYPE);
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(displayedText.slice(0, -1));
          timeoutRef.current = setTimeout(tick, DELETING_SPEED);
        } else {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
          timeoutRef.current = setTimeout(tick, PAUSE_AFTER_DELETE);
        }
      }
    };

    timeoutRef.current = setTimeout(tick, isDeleting ? DELETING_SPEED : TYPING_SPEED);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [displayedText, wordIndex, isDeleting]);

  return (
    <section id="ai-solutions" className="relative bg-[#050614] py-[40px] sm:py-[70px]">
      {/* Dark theme AI glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[1] opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(124,92,255,0.15), transparent 60%), radial-gradient(ellipse 50% 50% at 50% 100%, rgba(0,224,198,0.1), transparent 60%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Custom heading with typewriter */}
        <div className="flex flex-col items-center gap-5 text-center">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-violet-200/80 backdrop-blur"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#7c5cff] shadow-[0_0_10px_#7c5cff]" />
            AI Solutions
          </motion.div>

          {/* Heading with typewriter */}
          <motion.h2
            initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
            className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-[3.4rem]"
          >
            AI Integration That{" "}
            <br className="hidden sm:block" />
            <span className="relative inline-block text-left">
              <span className="inline-block text-gradient-aurora">{displayedText}</span>
              <span className="typewriter-cursor text-gradient-aurora" aria-hidden="true" />
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
            className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            AI isn't a feature we add at the end — it's the foundation. These six AI capabilities can be deployed standalone or woven into any of our software products to multiply their impact.
          </motion.p>
        </div>

        {/* Mobile: horizontal swipe carousel | Desktop: grid */}
        <div className="ai-carousel mt-16 flex gap-4 overflow-x-auto snap-x snap-mandatory px-[calc((100vw-100%)/2)] sm:px-0 md:grid md:grid-cols-2 md:overflow-x-visible md:px-0 lg:grid-cols-3">
          {aiSolutions.map((sol, i) => (
            <article
              key={sol.title}
              className="ai-card group relative w-[82vw] flex-shrink-0 snap-center overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[#0d1030] via-[#0a0c24] to-[#0a0c24] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[#00e0c6]/40 interactive sm:w-[72vw] md:w-full sm:p-7"
              style={{ animationDelay: `${(i % 3) * 0.1}s` }}
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
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-[#7c5cff]/30 to-[#00e0c6]/20">
                  {(() => { const Icon = AIIconMap[sol.title]; return Icon ? <Icon className="h-7 w-7 text-[#00e0c6]" /> : null; })()}
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
            </article>
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
