"use client";

import { Quote, Star } from "lucide-react";
import { testimonials } from "@/lib/site-data";
import { SectionHeading } from "../section-heading";

export function Testimonials() {
  return (
    <section id="testimonials" className="relative py-[40px] sm:py-[60px]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Testimonials"
          title="What clients say after"
          highlight="working with us"
          description="Real outcomes from real partners — measured in claim turnaround, App Store ratings, revenue, and reduced headcount, not vanity metrics."
        />

        {/* Mobile: horizontal swipe carousel | Desktop: 3-col grid */}
        <div className="testimonial-carousel mt-16 flex gap-5 overflow-x-auto snap-x snap-mandatory px-[calc((100vw-100%)/2)] sm:px-0 md:grid md:grid-cols-2 md:overflow-x-visible md:px-0 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <figure
              key={t.name}
              className="testimonial-card group relative w-[85vw] flex-shrink-0 snap-center overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.05] to-transparent p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-white/20 md:w-full interactive sm:w-[400px]"
              style={{ animationDelay: `${(i % 3) * 0.1}s` }}
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

              <blockquote className="text-[14px] leading-relaxed text-foreground/90">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <figcaption className="mt-5 flex items-center gap-3 border-t border-white/[0.06] pt-4">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold text-white shadow-[0_4px_16px_rgba(0,0,0,0.4)]"
                  style={{ background: t.accent }}
                >
                  {t.initials}
                </div>
                <div className="flex flex-col">
                  <span className="font-display text-sm font-semibold tracking-tight">
                    {t.name}
                  </span>
                  <span className="text-[11.5px] text-muted-foreground">
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
    </section>
  );
}
