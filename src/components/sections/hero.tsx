"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles, Star } from "lucide-react";
import dynamic from "next/dynamic";
import { MagneticButton } from "../magnetic-button";

// Dynamically import the WebGL scene so it only loads on the client.
// SSR is skipped because Three.js touches WebGL/DOM APIs at module load.
const Hero3DScene = dynamic(
  () => import("../hero-3d/hero-3d-scene").then((m) => m.Hero3DScene),
  {
    ssr: false,
    loading: () => <HeroFallback />,
  }
);

const WebGLBoundary = dynamic(
  () => import("../hero-3d/webgl-boundary").then((m) => m.WebGLBoundary),
  { ssr: false }
);

/**
 * Lightweight CSS-only fallback shown while the WebGL bundle loads
 * (and on extremely old browsers). Mirrors the aurora look so there's
 * no jarring flash.
 */
function HeroFallback() {
  return (
    <div aria-hidden className="absolute inset-0">
      <div
        className="absolute left-1/2 top-1/3 h-[420px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-[120px]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(124,92,255,0.55), rgba(0,224,198,0.25) 40%, transparent 70%)",
        }}
      />
      <div className="absolute inset-0 grid-pattern opacity-60" />
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-32 pb-20 sm:px-6"
    >
      {/* 3D WebGL scene — real-time AI neural network + particles + glass + grid.
          Wrapped in WebGLBoundary so we gracefully fall back to a 2D canvas
          particle network if WebGL is unavailable (rare / sandboxed envs). */}
      <div className="absolute inset-0">
        <WebGLBoundary>
          <Hero3DScene />
        </WebGLBoundary>
      </div>

      {/* Gradient mask so the WebGL scene fades smoothly into the rest of the page */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#050614]"
      />
      {/* Top vignette for navbar legibility */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#050614]/80 to-transparent"
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
          <span className="text-gradient-aurora">Modern Businesses</span>
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
        className="absolute bottom-7 left-1/2 -translate-x-1/2"
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
