"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/**
 * SmoothScrollProvider — wraps the app and enables Lenis smooth scrolling.
 * Respects reduced-motion preferences and handles route change scroll restoration.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });

    lenisRef.current = lenis;

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Anchor link smooth scroll for links starting with '#' or '/#'
    const handleAnchor = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("a") as HTMLAnchorElement | null;
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;

      // Check if link is an in-page anchor (#id) or home anchor (/#id while on home)
      if (href.startsWith("#")) {
        const id = href.slice(1);
        if (!id) return;
        const el = document.getElementById(id);
        if (el) {
          e.preventDefault();
          lenis.scrollTo(el as HTMLElement, { offset: -80, duration: 1.2 });
        }
      } else if (href.startsWith("/#") && window.location.pathname === "/") {
        const id = href.slice(2);
        if (!id) return;
        const el = document.getElementById(id);
        if (el) {
          e.preventDefault();
          lenis.scrollTo(el as HTMLElement, { offset: -80, duration: 1.2 });
        }
      }
    };
    document.addEventListener("click", handleAnchor);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", handleAnchor);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Handle route change scroll position reset
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.slice(1);
      const el = document.getElementById(id);
      if (el && lenisRef.current) {
        setTimeout(() => {
          lenisRef.current?.scrollTo(el as HTMLElement, { offset: -80, duration: 1 });
        }, 100);
        return;
      }
    }

    // Default: scroll to top on page transition
    window.scrollTo(0, 0);
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  return <>{children}</>;
}

