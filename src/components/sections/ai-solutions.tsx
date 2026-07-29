"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Cpu } from "lucide-react";
import { aiSolutions } from "@/lib/site-data";
import { MagneticButton } from "../magnetic-button";

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
        {/* Custom heading with typewriter */}
        <div className="flex flex-col items-center gap-5 text-center">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-500 backdrop-blur"
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
            className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-neutral-900 sm:text-5xl lg:text-[3.4rem]"
          >
            Intelligent systems that{" "}
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
            className="max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg"
          >
            AI isn't a feature we add at the end — it's the foundation. These six AI capabilities can be deployed standalone or woven into any of our software products to multiply their impact.
          </motion.p>
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
