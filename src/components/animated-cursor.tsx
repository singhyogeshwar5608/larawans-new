"use client";

import { useEffect, useRef, useState } from "react";

/**
 * AnimatedCursor — premium custom cursor with a small dot + trailing ring.
 * The ring scales up & changes color when hovering interactive elements.
 * Hidden on touch / coarse pointer devices via CSS (.cursor-dot / .cursor-ring).
 */
export function AnimatedCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState(false);

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let rafId = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;

      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, [role='button'], .interactive, input, textarea, select, [data-cursor='hover']"
      );
      setActive(!!interactive);
    };

    const onDown = () => ring.style.setProperty("--scale", "0.7");
    const onUp = () => ring.style.setProperty("--scale", "1");

    const loop = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(var(--scale, 1))`;
      rafId = requestAnimationFrame(loop);
    };
    loop();

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="cursor-dot pointer-events-none fixed left-0 top-0 z-[9999] hidden h-2 w-2 rounded-full bg-white mix-blend-difference [.dark_&]:block"
        style={{ transition: "opacity 0.2s ease" }}
      />
      <div
        ref={ringRef}
        aria-hidden
        className="cursor-ring pointer-events-none fixed left-0 top-0 z-[9999] hidden h-9 w-9 rounded-full transition-[width,height,background-color,border-color] duration-200 [.dark_&]:block"
        style={{
          border: `1.5px solid ${active ? "rgba(0,224,198,0.95)" : "rgba(124,92,255,0.7)"}`,
          backgroundColor: active ? "rgba(0,224,198,0.12)" : "rgba(124,92,255,0.05)",
          boxShadow: active
            ? "0 0 28px rgba(0,224,198,0.55)"
            : "0 0 18px rgba(124,92,255,0.35)",
          width: active ? "56px" : "36px",
          height: active ? "56px" : "36px",
        }}
      />
    </>
  );
}
