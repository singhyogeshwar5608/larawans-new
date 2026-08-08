"use client";

import { useEffect, useRef } from "react";

/**
 * AuroraBackground — fixed full-page ambient neon blobs that drift slowly.
 * Sits behind all content (z-index -10). Lightweight CSS-only animation.
 */
export function AuroraBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Deep base gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(124,92,255,0.18),transparent_55%),radial-gradient(ellipse_at_bottom_right,_rgba(0,224,198,0.12),transparent_55%),radial-gradient(ellipse_at_bottom_left,_rgba(255,77,210,0.10),transparent_55%)]" />

      {/* Floating neon blobs */}
      <div
        className="aurora-blob animate-pulse-glow"
        style={{
          width: 560,
          height: 560,
          left: "-10%",
          top: "-8%",
          background: "radial-gradient(circle, #7c5cff 0%, transparent 70%)",
          animationDelay: "0s",
        }}
      />
      <div
        className="aurora-blob animate-pulse-glow"
        style={{
          width: 620,
          height: 620,
          right: "-12%",
          top: "20%",
          background: "radial-gradient(circle, #00e0c6 0%, transparent 70%)",
          animationDelay: "1.4s",
        }}
      />
      <div
        className="aurora-blob animate-pulse-glow"
        style={{
          width: 480,
          height: 480,
          left: "30%",
          bottom: "-10%",
          background: "radial-gradient(circle, #ff4dd2 0%, transparent 70%)",
          animationDelay: "2.8s",
          opacity: 0.4,
        }}
      />
      <div
        className="aurora-blob animate-pulse-glow"
        style={{
          width: 360,
          height: 360,
          right: "20%",
          bottom: "10%",
          background: "radial-gradient(circle, #4dc4ff 0%, transparent 70%)",
          animationDelay: "3.6s",
          opacity: 0.4,
        }}
      />

      {/* Subtle grid */}
      <div className="absolute inset-0 grid-pattern opacity-60" />
    </div>
  );
}
