"use client";

import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight, Sparkles } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Industries", href: "/#industries" },
  { label: "AI Solutions", href: "/#ai-solutions" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Courses", href: "/courses" },
  { label: "Process", href: "/#process" },
  { label: "Tech Stack", href: "/#tech-stack" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
];

interface MobileHamburgerMenuProps {
  theme?: "dark" | "light";
}

export function MobileHamburgerMenu({ theme = "dark" }: MobileHamburgerMenuProps) {
  const [open, setOpen] = useState(false);

  const isDark = theme === "dark";
  const bgColor = isDark ? "#0a0c20" : "#ffffff";
  const textColor = isDark ? "#e2e8f0" : "#334155";
  const hoverBg = isDark ? "rgba(124,92,255,0.15)" : "#F5F3FF";
  const hoverText = isDark ? "#ffffff" : "#4F46E5";
  const borderColor = isDark ? "rgba(255,255,255,0.08)" : "#f1f5f9";
  const dotColor = isDark ? "#7c5cff" : "#C4B5FD";
  const iconColor = isDark ? "#7c5cff" : "#4F46E5";
  const panelBorder = isDark ? "rgba(255,255,255,0.06)" : "#e2e8f0";
  const backdropBg = isDark ? "rgba(5,6,20,0.85)" : "rgba(0,0,0,0.4)";
  const btnBg = isDark ? "rgba(255,255,255,0.06)" : "#ffffff";
  const btnBorder = isDark ? "rgba(255,255,255,0.1)" : "#e5e7eb";
  const closeBtnBg = isDark ? "rgba(255,255,255,0.08)" : "#f1f5f9";
  const closeIconColor = isDark ? "#a1a1aa" : "#4b5563";
  const logoText = isDark ? "#ffffff" : "#111827";
  const ctaGradient = isDark
    ? "linear-gradient(to right, #7c5cff, #00e0c6)"
    : "linear-gradient(to right, #6366F1, #A855F7)";

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Hamburger Button - top right, mobile only */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 right-4 z-[60] flex h-10 w-10 items-center justify-center rounded-full border shadow-lg sm:hidden"
        style={{
          background: btnBg,
          borderColor: btnBorder,
          boxShadow: isDark
            ? "0 4px 20px rgba(124,92,255,0.3)"
            : "0 4px 20px rgba(0,0,0,0.1)",
          backdropFilter: "blur(12px)",
        }}
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" style={{ color: iconColor }} />
      </button>

      {/* Animated Menu Panel */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[70] backdrop-blur-sm sm:hidden"
            style={{
              background: backdropBg,
              animation: "mhFadeIn 0.3s ease forwards",
            }}
            onClick={() => setOpen(false)}
          />

          {/* Slide-in Panel */}
          <div
            className="fixed top-0 right-0 bottom-0 z-[80] flex w-[280px] flex-col shadow-2xl sm:hidden"
            style={{
              background: bgColor,
              borderLeft: `1px solid ${panelBorder}`,
              animation: "mhSlideInRight 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards",
            }}
          >
            {/* Panel Header */}
            <div
              className="flex items-center justify-between px-5 py-4"
              style={{ borderBottom: `1px solid ${borderColor}` }}
            >
              <a
                href="/"
                className="flex items-center gap-2"
                onClick={() => setOpen(false)}
              >
                <div className="h-8 w-8 overflow-hidden rounded-lg">
                  <img src="/logo/logo.jpeg" alt="Larawans Digital" className="h-full w-full object-cover" />
                </div>
                <span
                  className="font-display text-sm font-bold"
                  style={{ color: logoText }}
                >
                  Larawans
                  <span style={{ color: "#00e0c6" }}>.</span>
                </span>
              </a>
              <button
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full"
                style={{ background: closeBtnBg }}
                aria-label="Close menu"
              >
                <X className="h-4 w-4" style={{ color: closeIconColor }} />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 overflow-y-auto px-3 py-3">
              {NAV_LINKS.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-medium transition-all duration-200"
                  style={{
                    color: textColor,
                    animation: `mhFadeSlideUp 0.35s ${0.05 + i * 0.04}s cubic-bezier(0.22, 1, 0.36, 1) both`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      hoverBg;
                    (e.currentTarget as HTMLElement).style.color = hoverText;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "transparent";
                    (e.currentTarget as HTMLElement).style.color = textColor;
                  }}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: dotColor }}
                  />
                  <span>{link.label}</span>
                  <ArrowUpRight
                    className="ml-auto h-4 w-4 opacity-0 transition-opacity duration-200"
                    style={{ color: dotColor }}
                  />
                </a>
              ))}
            </nav>

            {/* Bottom CTA */}
            <div
              className="px-5 py-4"
              style={{ borderTop: `1px solid ${borderColor}` }}
            >
              <a
                href="/#contact"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-[14px] font-bold text-white"
                style={{ background: ctaGradient }}
              >
                <Sparkles className="h-4 w-4" />
                Book Consultation
              </a>
            </div>
          </div>

          {/* Keyframe animations */}
          <style>{`
            @keyframes mhFadeIn { from { opacity: 0 } to { opacity: 1 } }
            @keyframes mhSlideInRight { from { transform: translateX(100%) } to { transform: translateX(0) } }
            @keyframes mhFadeSlideUp { from { opacity: 0; transform: translateY(12px) } to { opacity: 1; transform: translateY(0) } }
          `}</style>
        </>
      )}
    </>
  );
}
