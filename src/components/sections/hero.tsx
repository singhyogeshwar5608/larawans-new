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
      className="hero-bg relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#050614] px-4 pt-32 pb-20 sm:px-6"
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

      {/* ── Layer 5: 3D Floating Code Blocks ── */}
      <div
        className="pointer-events-none absolute inset-0 z-[5] overflow-hidden"
        aria-hidden
        style={{ perspective: "1200px" }}
      >
        {/* Main code editor — right side, large, tilted */}
        <div
          className="code-3d-float-1 absolute right-[3%] top-[14%] w-64 sm:w-72 lg:right-[8%] lg:w-80"
          style={{ transform: "rotateY(-14deg) rotateX(6deg)" }}
        >
          <div className="rounded-xl border border-white/[0.12] bg-[#0a0c24]/90 p-3.5 shadow-[0_25px_60px_-15px_rgba(124,92,255,0.3),inset_0_1px_0_rgba(255,255,255,0.06)]">
            {/* Title bar */}
            <div className="mb-3 flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-2 text-[10px] font-mono text-white/25">agent.ts</span>
            </div>
            {/* Code content */}
            <pre className="text-[10px] leading-[1.8] font-mono sm:text-[11px]">
              <code>
                <span className="text-[#7c5cff]">import</span>{" "}
                <span className="text-white/70">{"{ "}</span>
                <span className="text-[#00e0c6]">AI</span>
                <span className="text-white/70">{" }"}</span>{" "}
                <span className="text-[#7c5cff]">from</span>{" "}
                <span className="text-[#ffb14d]">&apos;@larawans/core&apos;</span>
                {"\n"}
                <span className="text-[#7c5cff]">const</span>{" "}
                <span className="text-[#00e0c6]">agent</span>{" "}
                <span className="text-white/50">=</span>{" "}
                <span className="text-[#7c5cff]">new</span>{" "}
                <span className="text-[#ff4dd2]">AI</span>
                <span className="text-white/70">{"({"}</span>
                {"\n"}
                {"  "}model<span className="text-white/50">:</span>{" "}
                <span className="text-[#ffb14d]">&apos;gpt-4-turbo&apos;</span>
                <span className="text-white/70">,</span>
                {"\n"}
                {"  "}tools<span className="text-white/50">:</span>{" "}
                <span className="text-white/70">[</span>
                <span className="text-[#4dc4ff]">&apos;search&apos;</span>
                <span className="text-white/70">,</span>{" "}
                <span className="text-[#4dc4ff]">&apos;code&apos;</span>
                <span className="text-white/70">,</span>{" "}
                <span className="text-[#4dc4ff]">&apos;deploy&apos;</span>
                <span className="text-white/70">],</span>
                {"\n"}
                {"  "}memory<span className="text-white/50">:</span>{" "}
                <span className="text-[#7c5cff]">true</span>
                <span className="text-white/70">,</span>
                {"\n"}
                {"  "}stream<span className="text-white/50">:</span>{" "}
                <span className="text-[#7c5cff]">true</span>
                {"\n"}
                <span className="text-white/70">{"});"}</span>
                {"\n\n"}
                <span className="text-[#7c5cff]">export default</span>{" "}
                <span className="text-[#00e0c6]">agent</span>
                <span className="text-white/70">;</span>
              </code>
            </pre>
          </div>
        </div>

        {/* Secondary code editor — left bottom, smaller, opposite tilt */}
        <div
          className="code-3d-float-2 absolute bottom-[18%] left-[2%] hidden w-52 sm:block lg:left-[4%] lg:w-60"
          style={{ transform: "rotateY(18deg) rotateX(-5deg)" }}
        >
          <div className="rounded-xl border border-white/[0.12] bg-[#0a0c24]/90 p-3.5 shadow-[0_25px_60px_-15px_rgba(0,224,198,0.25),inset_0_1px_0_rgba(255,255,255,0.06)]">
            {/* Title bar */}
            <div className="mb-3 flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-2 text-[10px] font-mono text-white/25">api.ts</span>
            </div>
            {/* Code content */}
            <pre className="text-[10px] leading-[1.8] font-mono sm:text-[11px]">
              <code>
                <span className="text-[#7c5cff]">async</span>{" "}
                <span className="text-[#7c5cff]">function</span>{" "}
                <span className="text-[#00e0c6]">deploy</span>
                <span className="text-white/70">{"() {"}</span>
                {"\n"}
                {"  "}const{" "}
                <span className="text-[#00e0c6]">app</span>{" "}
                <span className="text-white/50">=</span>{" "}
                <span className="text-[#7c5cff]">await</span>{" "}
                <span className="text-[#ff4dd2]">build</span>
                <span className="text-white/70">{"();"}</span>
                {"\n"}
                {"  "}
                <span className="text-[#7c5cff]">await</span>{" "}
                <span className="text-[#ff4dd2]">runTests</span>
                <span className="text-white/70">{"();"}</span>
                {"\n"}
                {"  "}return{" "}
                <span className="text-white/70">{"{"}</span>
                {"\n"}
                {"    "}status<span className="text-white/50">:</span>{" "}
                <span className="text-[#ffb14d]">&apos;live&apos;</span>
                {"\n"}
                {"  "}
                <span className="text-white/70">{"}"};</span>
                {"\n"}
                <span className="text-white/70">{"}"}</span>
              </code>
            </pre>
          </div>
        </div>

        {/* Third small code block — top left */}
        <div
          className="code-3d-float-3 absolute left-[6%] top-[22%] hidden w-44 sm:block lg:left-[8%] lg:w-52"
          style={{ transform: "rotateY(10deg) rotateX(8deg)" }}
        >
          <div className="rounded-xl border border-white/[0.12] bg-[#0a0c24]/90 p-3.5 shadow-[0_25px_60px_-15px_rgba(77,196,255,0.2),inset_0_1px_0_rgba(255,255,255,0.06)]">
            {/* Title bar */}
            <div className="mb-3 flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-2 text-[10px] font-mono text-white/25">config.ts</span>
            </div>
            <pre className="text-[10px] leading-[1.8] font-mono sm:text-[11px]">
              <code>
                <span className="text-[#7c5cff]">export const</span>{" "}
                <span className="text-[#00e0c6]">config</span>{" "}
                <span className="text-white/50">=</span>{" "}
                <span className="text-white/70">{"{"}</span>
                {"\n"}
                {"  "}ai<span className="text-white/50">:</span>{" "}
                <span className="text-[#7c5cff]">true</span>
                <span className="text-white/70">,</span>
                {"\n"}
                {"  "}cloud<span className="text-white/50">:</span>{" "}
                <span className="text-[#ffb14d]">&apos;aws&apos;</span>
                {"\n"}
                <span className="text-white/70">{"}"};</span>
              </code>
            </pre>
          </div>
        </div>

        {/* Floating code symbols / syntax particles */}
        <div className="code-symbol code-symbol-1 absolute right-[25%] top-[8%] text-2xl font-mono text-[#7c5cff]/30 sm:text-3xl lg:text-4xl">{"{ }"}</div>
        <div className="code-symbol code-symbol-2 absolute left-[20%] bottom-[30%] text-xl font-mono text-[#00e0c6]/25 sm:text-2xl">{"</>"}</div>
        <div className="code-symbol code-symbol-3 absolute right-[15%] bottom-[12%] text-2xl font-mono text-[#ff4dd2]/20 sm:text-3xl">{"( )"}</div>
        <div className="code-symbol code-symbol-4 absolute left-[35%] top-[12%] hidden text-xl font-mono text-[#4dc4ff]/20 sm:block">{"=>"}</div>
        <div className="code-symbol code-symbol-5 absolute right-[30%] top-[55%] text-lg font-mono text-[#ffb14d]/20 sm:text-xl">{"[ ]"}</div>
        <div className="code-symbol code-symbol-6 absolute left-[12%] top-[50%] hidden text-2xl font-mono text-[#9dff5c]/15 sm:block">{"<>"}</div>
        <div className="code-symbol code-symbol-7 absolute right-[40%] bottom-[25%] hidden text-xl font-mono text-[#7c5cff]/20 sm:block">{"&&"}</div>
        <div className="code-symbol code-symbol-8 absolute left-[45%] bottom-[8%] hidden text-lg font-mono text-[#00e0c6]/15 sm:block">{"..."}</div>
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
