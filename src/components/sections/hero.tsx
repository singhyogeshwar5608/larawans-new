"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles, Star } from "lucide-react";
import { MagneticButton } from "../magnetic-button";

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
      className="hero-bg relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#050614] px-4 pt-[80px] pb-[60px] sm:px-6"
    >
      {/* ── Layer 1: Animated gradient orbs (floating nebula) ── */}
      <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden>
        {/* Large violet orb — top-left drift */}
        <div className="hero-orb hero-orb-1 absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-[#7c5cff]/30 blur-[100px]" />
        {/* Cyan orb — bottom-right drift */}
        <div className="hero-orb hero-orb-2 absolute -right-24 top-1/4 h-[450px] w-[450px] rounded-full bg-[#00e0c6]/25 blur-[110px]" />
        {/* Magenta orb — center drift */}
        <div className="hero-orb hero-orb-3 absolute left-1/2 top-1/3 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff4dd2]/20 blur-[90px]" />
        {/* Deep blue orb — bottom-left */}
        <div className="hero-orb hero-orb-4 absolute bottom-10 left-1/4 h-[400px] w-[400px] rounded-full bg-[#4dc4ff]/20 blur-[100px]" />
        {/* Amber accent orb — top-right */}
        <div className="hero-orb hero-orb-5 absolute right-10 top-20 h-[250px] w-[250px] rounded-full bg-[#ffb14d]/15 blur-[80px]" />
        {/* Lime accent orb — bottom-right */}
        <div className="hero-orb hero-orb-6 absolute bottom-1/4 right-1/3 h-[300px] w-[300px] rounded-full bg-[#9dff5c]/12 blur-[90px]" />
      </div>

      {/* ── Layer 2: Subtle grid pattern overlay ── */}
      <div className="pointer-events-none absolute inset-0 z-[2] grid-pattern" aria-hidden />

      {/* ── Layer 3: Animated stars / dots scattered across hero ── */}
      <div className="pointer-events-none absolute inset-0 z-[2]" aria-hidden>
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="hero-star absolute h-[2px] w-[2px] rounded-full bg-white"
            style={{
              left: `${(i * 37 + 13) % 100}%`,
              top: `${(i * 53 + 7) % 100}%`,
              animationDelay: `${(i * 0.3) % 5}s`,
              animationDuration: `${2.5 + (i % 5) * 0.8}s`,
              opacity: 0.3 + (i % 4) * 0.15,
            }}
          />
        ))}
      </div>

      {/* ── Layer 4: Central aurora glow behind text ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 z-[3] h-[420px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-[120px] hero-aurora"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(124,92,255,0.6), rgba(0,224,198,0.3) 40%, transparent 70%)",
        }}
      />

      {/* ── Layer 5: 3D Wireframe (rotating rings + lines) ── */}
      <div
        className="pointer-events-none absolute inset-0 z-[5] overflow-hidden"
        aria-hidden
      >
        {/* Main SVG wireframe — right side */}
        <div className="wireframe-3d absolute right-[4%] top-1/2 h-[340px] w-[340px] -translate-y-1/2 sm:h-[440px] sm:w-[440px] lg:right-[10%] lg:h-[520px] lg:w-[520px]">
          <svg className="h-full w-full" viewBox="0 0 400 400" fill="none">
            {/* Ring 1 — violet, rotating */}
            <g className="wire-ring-1">
              <ellipse cx="200" cy="200" rx="180" ry="70" stroke="#7c5cff" strokeWidth="1.2" opacity="0.7" />
              <ellipse cx="200" cy="200" rx="130" ry="50" stroke="#7c5cff" strokeWidth="0.8" opacity="0.4" />
              <circle cx="20" cy="200" r="4" fill="#7c5cff" opacity="0.9">
                <animate attributeName="opacity" values="0.9;0.4;0.9" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle cx="380" cy="200" r="4" fill="#7c5cff" opacity="0.9">
                <animate attributeName="opacity" values="0.4;0.9;0.4" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle cx="200" cy="130" r="3" fill="#7c5cff" opacity="0.7" />
              <circle cx="200" cy="270" r="3" fill="#7c5cff" opacity="0.7" />
            </g>
            {/* Ring 2 — cyan, rotating */}
            <g className="wire-ring-2">
              <ellipse cx="200" cy="200" rx="160" ry="80" stroke="#00e0c6" strokeWidth="1.2" opacity="0.6" />
              <ellipse cx="200" cy="200" rx="110" ry="55" stroke="#00e0c6" strokeWidth="0.6" opacity="0.3" />
              <circle cx="40" cy="200" r="4" fill="#00e0c6" opacity="0.9">
                <animate attributeName="opacity" values="0.9;0.3;0.9" dur="4s" repeatCount="indefinite" />
              </circle>
              <circle cx="360" cy="200" r="4" fill="#00e0c6" opacity="0.9">
                <animate attributeName="opacity" values="0.3;0.9;0.3" dur="4s" repeatCount="indefinite" />
              </circle>
              <circle cx="200" cy="120" r="3" fill="#00e0c6" opacity="0.6" />
            </g>
            {/* Ring 3 — blue, rotating */}
            <g className="wire-ring-3">
              <ellipse cx="200" cy="200" rx="140" ry="60" stroke="#4dc4ff" strokeWidth="1" opacity="0.5" />
              <circle cx="60" cy="200" r="3.5" fill="#4dc4ff" opacity="0.8">
                <animate attributeName="opacity" values="0.8;0.3;0.8" dur="3.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="340" cy="200" r="3.5" fill="#4dc4ff" opacity="0.8">
                <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3.5s" repeatCount="indefinite" />
              </circle>
            </g>
            {/* Cross lines */}
            <g className="wire-lines" opacity="0.25">
              <line x1="200" y1="60" x2="200" y2="340" stroke="#7c5cff" strokeWidth="0.5" strokeDasharray="4 6" />
              <line x1="60" y1="200" x2="340" y2="200" stroke="#00e0c6" strokeWidth="0.5" strokeDasharray="4 6" />
              <line x1="100" y1="100" x2="300" y2="300" stroke="#4dc4ff" strokeWidth="0.5" strokeDasharray="4 6" />
              <line x1="300" y1="100" x2="100" y2="300" stroke="#ff4dd2" strokeWidth="0.4" strokeDasharray="4 6" />
            </g>
            {/* Center core glow */}
            <circle cx="200" cy="200" r="8" fill="none" stroke="#7c5cff" strokeWidth="1" opacity="0.6">
              <animate attributeName="r" values="8;14;8" dur="4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.6;0.2;0.6" dur="4s" repeatCount="indefinite" />
            </circle>
            <circle cx="200" cy="200" r="3" fill="#00e0c6" opacity="0.8">
              <animate attributeName="opacity" values="0.8;0.4;0.8" dur="2s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>

        {/* Secondary wireframe — left bottom */}
        <div className="wireframe-3d-sm absolute bottom-[12%] left-[3%] hidden h-[200px] w-[200px] sm:block lg:left-[5%] lg:h-[240px] lg:w-[240px]">
          <svg className="h-full w-full" viewBox="0 0 200 200" fill="none">
            <g className="wire-ring-sm-1">
              <ellipse cx="100" cy="100" rx="90" ry="35" stroke="#7c5cff" strokeWidth="1" opacity="0.5" />
              <circle cx="10" cy="100" r="3" fill="#7c5cff" opacity="0.7">
                <animate attributeName="opacity" values="0.7;0.2;0.7" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle cx="190" cy="100" r="3" fill="#7c5cff" opacity="0.7">
                <animate attributeName="opacity" values="0.2;0.7;0.2" dur="3s" repeatCount="indefinite" />
              </circle>
            </g>
            <g className="wire-ring-sm-2">
              <ellipse cx="100" cy="100" rx="80" ry="40" stroke="#00e0c6" strokeWidth="0.8" opacity="0.4" />
              <circle cx="20" cy="100" r="2.5" fill="#00e0c6" opacity="0.6" />
              <circle cx="180" cy="100" r="2.5" fill="#00e0c6" opacity="0.6" />
            </g>
            <g className="wire-ring-sm-3">
              <ellipse cx="100" cy="100" rx="70" ry="30" stroke="#4dc4ff" strokeWidth="0.6" opacity="0.3" />
            </g>
            <line x1="100" y1="30" x2="100" y2="170" stroke="#7c5cff" strokeWidth="0.4" strokeDasharray="3 5" opacity="0.2" />
            <line x1="30" y1="100" x2="170" y2="100" stroke="#00e0c6" strokeWidth="0.4" strokeDasharray="3 5" opacity="0.2" />
            <circle cx="100" cy="100" r="5" fill="none" stroke="#00e0c6" strokeWidth="0.8" opacity="0.5">
              <animate attributeName="r" values="5;9;5" dur="4s" repeatCount="indefinite" />
            </circle>
            <circle cx="100" cy="100" r="2" fill="#7c5cff" opacity="0.7" />
          </svg>
        </div>
      </div>

      {/* ── Layer 6: Gradient masks for smooth section transitions ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[4] h-40 bg-gradient-to-b from-transparent to-[#050614]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-[4] h-32 bg-gradient-to-b from-[#050614]/80 to-transparent"
      />

      {/* ── Main Content ── */}
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
          <span className="text-foreground">Development Company for</span>
          <br />
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
