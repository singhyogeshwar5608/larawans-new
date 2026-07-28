"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles, Star } from "lucide-react";
import { MagneticButton } from "../magnetic-button";
import { ParticleNetwork } from "../particle-network";
import { WebGLBoundary, HeroEcosystem } from "../hero-3d/hero-ecosystem";

/** Services ke naam jo hero heading mein typewrite honge */
const ROTATING_WORDS = [
  "Modern Businesses",
  "Web Development",
  "Mobile Apps",
  "AI Agents",
  "Cloud Solutions",
  "SaaS Platforms",
  "E-Commerce",
  "Digital Marketing",
  "UI/UX Design",
];

/** Typing speed per character (ms) */
const TYPING_SPEED = 80;
/** Deleting speed per character (ms) */
const DELETING_SPEED = 45;
/** Pause after full word is typed (ms) */
const PAUSE_AFTER_TYPE = 1800;
/** Pause after full word is deleted (ms) */
const PAUSE_AFTER_DELETE = 400;

export function Hero() {
  const [displayedText, setDisplayedText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const currentWord = ROTATING_WORDS[wordIndex];

    const tick = () => {
      if (!isDeleting) {
        // Typing phase
        if (displayedText.length < currentWord.length) {
          setDisplayedText(currentWord.slice(0, displayedText.length + 1));
          timeoutRef.current = setTimeout(tick, TYPING_SPEED + Math.random() * 40);
        } else {
          // Word fully typed — pause, then start deleting
          timeoutRef.current = setTimeout(() => setIsDeleting(true), PAUSE_AFTER_TYPE);
        }
      } else {
        // Deleting phase
        if (displayedText.length > 0) {
          setDisplayedText(displayedText.slice(0, -1));
          timeoutRef.current = setTimeout(tick, DELETING_SPEED);
        } else {
          // Word fully deleted — move to next word
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
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#050614] px-4 pt-32 pb-20 sm:px-6"
    >
      {/* Background — 2D canvas particle network (fallback for software renderers) */}
      <div className="pointer-events-none absolute inset-0 z-[1]">
        <ParticleNetwork />
      </div>

      {/* 3D Ecosystem — glass L logo, orbiting tech nodes, holographic panels (real GPU only) */}
      <div className="pointer-events-none absolute inset-0 z-[2]">
        <WebGLBoundary>
          <HeroEcosystem />
        </WebGLBoundary>
      </div>

      {/* Aurora glow behind text */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 z-[1] h-[420px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-[120px]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(124,92,255,0.55), rgba(0,224,198,0.25) 40%, transparent 70%)",
        }}
      />

      {/* Gradient mask — fades into the next section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-40 bg-gradient-to-b from-transparent to-[#050614]"
      />
      {/* Top vignette for navbar legibility */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-[3] h-32 bg-gradient-to-b from-[#050614]/80 to-transparent"
      />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">
        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-violet-100/80 backdrop-blur"
        >
          <Sparkles className="h-3.5 w-3.5 text-[#00e0c6]" />
          AI-First Software Development Company
          <span className="ml-1 inline-flex items-center gap-0.5 text-[#ffb14d]">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-2.5 w-2.5 fill-current" />
            ))}
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 26, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="font-display text-[2.6rem] font-extrabold leading-[1.04] tracking-tight sm:text-6xl lg:text-[4.5rem] [text-shadow:0_2px_40px_rgba(5,6,20,0.6)]"
        >
          <span className="text-gradient-neon">AI-First Software</span>
          <br />
          <span className="text-foreground">Development Company for </span>
          {/* Typewriter rotating word */}
          <span className="relative inline-block text-left">
            <span className="inline-block text-gradient-aurora">{displayedText}</span>
            <span className="typewriter-cursor text-gradient-aurora" aria-hidden="true" />
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.28 }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:text-xl [text-shadow:0_2px_20px_rgba(5,6,20,0.8)]"
        >
          Build Websites, Mobile Apps, ERP Software, AI Agents &amp; Digital Solutions
          that accelerate business growth — engineered with cutting-edge tech and an
          obsession for measurable outcomes.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.42 }}
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
        >
          <MagneticButton href="#contact" variant="neon" className="px-8 py-4 text-[15px]">
            Book Free Consultation
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </MagneticButton>
          <MagneticButton href="#portfolio" variant="glass" className="px-8 py-4 text-[15px]">
            <Play className="h-4 w-4 fill-current" />
            View Portfolio
          </MagneticButton>
        </motion.div>

        {/* Mini stats row */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.58 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-xs text-muted-foreground sm:text-sm [text-shadow:0_2px_16px_rgba(5,6,20,0.9)]"
        >
          {[
            ["250+", "Clients"],
            ["420+", "Projects"],
            ["12+", "Years"],
            ["99%", "Satisfaction"],
          ].map(([v, l]) => (
            <div key={l} className="flex flex-col items-center">
              <span className="font-display text-xl font-bold text-gradient-cyan sm:text-2xl">
                {v}
              </span>
              <span className="mt-0.5 text-[11px] uppercase tracking-[0.18em]">{l}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex h-9 w-6 items-start justify-center rounded-full border border-white/15 p-1.5 backdrop-blur">
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="h-1.5 w-1 rounded-full bg-[#00e0c6]"
          />
        </div>
      </motion.div>
    </section>
  );
}
