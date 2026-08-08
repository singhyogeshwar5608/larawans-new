"use client";

import { useRef, useState, useEffect } from "react";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/lib/site-data";
import { SectionHeading } from "../section-heading";

export function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      checkScroll();
      el.addEventListener("scroll", checkScroll, { passive: true });
      window.addEventListener("resize", checkScroll);
      return () => {
        el.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.clientWidth;
      const scrollAmount = direction === "left" ? -cardWidth * 0.8 : cardWidth * 0.8;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section id="testimonials" className="relative py-[40px] sm:py-[60px]" style={{ background: "#F8F8F3" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          title="What clients say after"
          highlight="working with us"
          titleStyle={{ color: "#1A1A2E" }}
        />

        {/* Carousel Container with Side Arrows */}
        <div className="relative mt-12 sm:mt-16">
          {/* Left Arrow Button */}
          <button
            onClick={() => handleScroll("left")}
            disabled={!canScrollLeft}
            aria-label="Previous testimonials"
            className={`absolute -left-3 sm:-left-5 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-300 bg-white shadow-lg transition-all duration-300 hover:bg-neutral-100 hover:scale-105 active:scale-95 ${
              !canScrollLeft ? "opacity-30 cursor-not-allowed" : "opacity-100 cursor-pointer"
            }`}
          >
            <ChevronLeft className="h-5 w-5 text-neutral-800" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={() => handleScroll("right")}
            disabled={!canScrollRight}
            aria-label="Next testimonials"
            className={`absolute -right-3 sm:-right-5 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-300 bg-white shadow-lg transition-all duration-300 hover:bg-neutral-100 hover:scale-105 active:scale-95 ${
              !canScrollRight ? "opacity-30 cursor-not-allowed" : "opacity-100 cursor-pointer"
            }`}
          >
            <ChevronRight className="h-5 w-5 text-neutral-800" />
          </button>

          {/* Carousel Track: Single Row (3 cards on lg, 2 on sm/md, 1 on xs) */}
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory py-2 no-scrollbar"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {testimonials.map((t, i) => (
              <figure
                key={t.name}
                className="testimonial-card group relative flex-shrink-0 snap-start overflow-hidden rounded-3xl border border-white/10 p-6 transition-all duration-500 hover:-translate-y-1 interactive w-full sm:w-[calc(50%-10px)] lg:w-[calc((100%-40px)/3)]"
                style={{ background: "#0b0d22", boxShadow: "0 8px 32px rgba(0,0,0,0.25)" }}
              >
                {/* Quote icon */}
                <div className="mb-4 flex items-center justify-between">
                  <Quote
                    className="h-8 w-8 text-[#7c5cff]/40 transition-colors group-hover:text-[#7c5cff]/80"
                    strokeWidth={1.5}
                  />
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star
                        key={s}
                        className="h-3.5 w-3.5 fill-[#ffb14d] text-[#ffb14d]"
                      />
                    ))}
                  </div>
                </div>

                <blockquote className="text-[14px] leading-relaxed" style={{ color: "#eef1ff" }}>
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <figcaption className="mt-5 flex items-center gap-3 border-t border-white/[0.06] pt-4">
                  <div
                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold text-white shadow-[0_4px_16px_rgba(0,0,0,0.4)]"
                    style={{ background: t.accent }}
                  >
                    {t.initials}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-display text-sm font-semibold tracking-tight truncate text-white">
                      {t.name}
                    </span>
                    <span className="text-[11.5px] text-neutral-400 truncate">
                      {t.role} · {t.company}
                    </span>
                  </div>
                </figcaption>

                {/* Hover bottom glow */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -bottom-px left-1/2 h-px w-0 -translate-x-1/2 transition-all duration-500 group-hover:w-3/4"
                  style={{
                    background:
                      "linear-gradient(90deg,transparent,#7c5cff,#00e0c6,transparent)",
                  }}
                />
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
