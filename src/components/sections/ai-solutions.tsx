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

/* ── 3 small SVG icons per card (feature indicators) ── */
const AIIconRow: Record<string, React.FC<React.SVGProps<SVGSVGElement>>[]> = {
  "AI Chatbots": [
    (p) => <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>,
    (p) => <svg viewBox="0 0 24 24" fill="none" {...p}><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /><path d="M12 8v4l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>,
    (p) => <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" /></svg>,
  ],
  "AI Voice Agents": [
    (p) => <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" stroke="currentColor" strokeWidth="1.5" /><path d="M19 10v2a7 7 0 01-14 0v-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><line x1="12" y1="19" x2="12" y2="23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>,
    (p) => <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M2 16.5C2 14 4 12 6.5 12h11C20 12 22 14 22 16.5V19H2v-2.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" /></svg>,
    (p) => <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.13.81.36 1.6.68 2.35a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.73-1.73a2 2 0 012.11-.45c.75.32 1.54.55 2.35.68a2 2 0 011.72 2z" stroke="currentColor" strokeWidth="1.5" /></svg>,
  ],
  "AI Automation": [
    (p) => <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M4 4h16v16H4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M4 9h16M9 4v16" stroke="currentColor" strokeWidth="1.5" /></svg>,
    (p) => <svg viewBox="0 0 24 24" fill="none" {...p}><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" /><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>,
    (p) => <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>,
  ],
  "AI Document Processing": [
    (p) => <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><line x1="8" y1="13" x2="16" y2="13" stroke="currentColor" strokeWidth="1.5" /><line x1="8" y1="17" x2="13" y2="17" stroke="currentColor" strokeWidth="1.5" /></svg>,
    (p) => <svg viewBox="0 0 24 24" fill="none" {...p}><circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5" /><line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>,
    (p) => <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><polyline points="22,4 12,14.01 9,11.01" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>,
  ],
  "AI CRM": [
    (p) => <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" /><path d="M23 21v-2a4 4 0 00-3-3.87" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>,
    (p) => <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" stroke="currentColor" strokeWidth="1.5" /></svg>,
    (p) => <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>,
  ],
  "AI Customer Support": [
    (p) => <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M13.73 21a2 2 0 01-3.46 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>,
    (p) => <svg viewBox="0 0 24 24" fill="none" {...p}><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" /><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><circle cx="12" cy="17" r="0.5" fill="currentColor" stroke="currentColor" strokeWidth="1" /></svg>,
    (p) => <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.13.81.36 1.6.68 2.35a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.73-1.73a2 2 0 012.11-.45c.75.32 1.54.55 2.35.68a2 2 0 011.72 2z" stroke="currentColor" strokeWidth="1.5" /></svg>,
  ],
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

                {/* Feature icons row */}
                <div className="mt-5 flex items-center gap-2.5">
                  {AIIconRow[sol.title]?.map((SvgIcon, idx) => (
                    <div key={idx} className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.03]">
                      <SvgIcon className="h-4 w-4 text-[#7c5cff]/70" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Decorative circuit lines */}
              <svg
                aria-hidden
                className="pointer-events-none absolute -bottom-2 -right-2 h-28 w-28 opacity-[0.12] transition-opacity duration-500 group-hover:opacity-[0.35]"
                viewBox="0 0 100 100"
                fill="none"
              >
                <circle cx="50" cy="50" r="40" stroke="#7c5cff" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="28" stroke="#00e0c6" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="16" stroke="#ff4dd2" strokeWidth="0.5" />
                <line x1="10" y1="50" x2="90" y2="50" stroke="#7c5cff" strokeWidth="0.5" />
                <line x1="50" y1="10" x2="50" y2="90" stroke="#00e0c6" strokeWidth="0.5" />
                <line x1="15" y1="15" x2="85" y2="85" stroke="#ff4dd2" strokeWidth="0.4" />
                <line x1="85" y1="15" x2="15" y2="85" stroke="#4dc4ff" strokeWidth="0.4" />
                <circle cx="50" cy="50" r="3" fill="#00e0c6" />
                <circle cx="50" cy="10" r="2" fill="#7c5cff" opacity="0.5" />
                <circle cx="90" cy="50" r="2" fill="#ff4dd2" opacity="0.5" />
                <circle cx="50" cy="90" r="2" fill="#4dc4ff" opacity="0.5" />
                <circle cx="10" cy="50" r="2" fill="#00e0c6" opacity="0.5" />
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
