"use client";

import { useEffect, useRef } from "react";

/**
 * ParticleNetwork — full-canvas "3D AI neural network" effect.
 * - Particles drift in pseudo-3D (depth affects size/speed/opacity).
 * - Mouse acts as a soft attractor: nearby particles are pulled toward the cursor
 *   and connections between mouse position and nearby nodes light up.
 * - Connections fade with distance — looks like a living neural mesh.
 */
type Particle = {
  x: number;
  y: number;
  z: number; // depth 0..1
  vx: number;
  vy: number;
  vz: number;
  baseSize: number;
};

export function ParticleNetwork({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles: Particle[] = [];
    const mouse = { x: -9999, y: -9999, active: false };

    const palette = ["#7c5cff", "#00e0c6", "#4dc4ff", "#ff4dd2"];

    function resize() {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      const targetCount = Math.min(
        140,
        Math.max(60, Math.floor((width * height) / 11000))
      );
      particles = new Array(targetCount).fill(0).map(() => spawn());
    }

    function spawn(): Particle {
      const z = Math.random();
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        z,
        vx: (Math.random() - 0.5) * 0.25 * (0.5 + z),
        vy: (Math.random() - 0.5) * 0.25 * (0.5 + z),
        vz: (Math.random() - 0.5) * 0.0015,
        baseSize: 0.6 + Math.random() * 1.8,
      };
    }

    function step() {
      ctx.clearRect(0, 0, width, height);

      // Soft vignette
      const grd = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        Math.max(width, height) / 1.4
      );
      grd.addColorStop(0, "rgba(8, 10, 30, 0)");
      grd.addColorStop(1, "rgba(5, 6, 20, 0.45)");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, width, height);

      // Update + draw particles
      for (const p of particles) {
        // Mouse attraction (only when active and on screen)
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < 220 * 220) {
            const dist = Math.sqrt(dist2) || 1;
            const force = (1 - dist / 220) * 0.55;
            p.vx += (dx / dist) * force * 0.05;
            p.vy += (dy / dist) * force * 0.05;
          }
        }

        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;
        if (p.z > 1) p.z = 1;
        if (p.z < 0) p.z = 0;

        // Wrap edges
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        // Friction toward base velocity
        p.vx *= 0.985;
        p.vy *= 0.985;
        const baseV = (0.5 + p.z) * 0.05;
        p.vx += (Math.random() - 0.5) * 0.01 * baseV;
        p.vy += (Math.random() - 0.5) * 0.01 * baseV;

        const size = p.baseSize * (0.6 + p.z * 1.4);
        const alpha = 0.25 + p.z * 0.7;
        const color = palette[Math.floor(p.z * (palette.length - 1))];

        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = withAlpha(color, alpha);
        ctx.shadowBlur = 8 * p.z;
        ctx.shadowColor = color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Connections
      const maxDist = 130;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < maxDist * maxDist) {
            const dist = Math.sqrt(dist2);
            const opacity = (1 - dist / maxDist) * 0.35 * ((a.z + b.z) / 2);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(124, 92, 255, ${opacity})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }

        // Mouse → particle connections (cyan glow)
        if (mouse.active) {
          const dx = a.x - mouse.x;
          const dy = a.y - mouse.y;
          const dist2 = dx * dx + dy * dy;
          const md = 180;
          if (dist2 < md * md) {
            const dist = Math.sqrt(dist2);
            const opacity = (1 - dist / md) * 0.7;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(0, 224, 198, ${opacity})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }
      }

      // Mouse glow halo
      if (mouse.active) {
        const halo = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          140
        );
        halo.addColorStop(0, "rgba(0, 224, 198, 0.18)");
        halo.addColorStop(1, "rgba(0, 224, 198, 0)");
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 140, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(step);
    }

    function withAlpha(hex: string, alpha: number) {
      // Convert #rrggbb to rgba
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    function onMove(e: MouseEvent) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    }
    function onLeave() {
      mouse.active = false;
    }
    function onTouch(e: TouchEvent) {
      const rect = canvas.getBoundingClientRect();
      const t = e.touches[0];
      if (!t) return;
      mouse.x = t.clientX - rect.left;
      mouse.y = t.clientY - rect.top;
      mouse.active = true;
    }

    let rafId = 0;
    resize();
    if (reduce) {
      step();
      cancelAnimationFrame(rafId);
    } else {
      step();
    }

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("touchend", onLeave);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchend", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
