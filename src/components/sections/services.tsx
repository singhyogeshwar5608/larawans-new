"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/site-data";
import { MagneticButton } from "../magnetic-button";

function getSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Service titles jo typewrite honge */
const ROTATING_WORDS = services.map((s) => s.title);

const TYPING_SPEED = 70;
const DELETING_SPEED = 40;
const PAUSE_AFTER_TYPE = 1500;
const PAUSE_AFTER_DELETE = 350;

export function Services() {
  const [displayedText, setDisplayedText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const currentWord = ROTATING_WORDS[wordIndex];

    const tick = () => {
      if (!isDeleting) {
        if (displayedText.length < currentWord.length) {
          setDisplayedText(currentWord.slice(0, displayedText.length + 1));
          timeoutRef.current = setTimeout(tick, TYPING_SPEED + Math.random() * 30);
        } else {
          timeoutRef.current = setTimeout(() => setIsDeleting(true), PAUSE_AFTER_TYPE);
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(displayedText.slice(0, -1));
          timeoutRef.current = setTimeout(tick, DELETING_SPEED);
        } else {
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
    <section id="services" className="relative py-[50px]" style={{ background: "linear-gradient(180deg, rgba(124,92,255,0.07) 0%, rgba(0,224,198,0.04) 50%, transparent 100%)" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Custom heading with typewriter */}
        <div className="flex flex-col items-center gap-5 text-center">
          {/* Heading with typewriter */}
          <motion.h2
            initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
            className="font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.4rem]"
          >
            Full-stack services for{" "}
            <br className="hidden sm:block" />
            <span className="relative inline-block text-left">
              <span className="inline-block text-gradient-aurora">{displayedText}</span>
              <span className="typewriter-cursor text-gradient-aurora" aria-hidden="true" />
            </span>
          </motion.h2>

        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((s, i) => {
            const slug = s.slug || getSlug(s.title);
            return (
              <a key={s.title} href={`/services/${slug}`} className="block">
                <motion.article
                  initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.65,
                    ease: [0.22, 1, 0.36, 1],
                    delay: (i % 4) * 0.07,
                  }}
                  className="group glass-card interactive relative overflow-hidden rounded-3xl p-6 h-full cursor-pointer"
                >
                  {/* Animated gradient glow */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-60"
                    style={{ background: s.accent }}
                  />

                  {/* Icon */}
                  <div
                    className="relative mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10"
                    style={{ background: s.accent }}
                  >
                    <s.icon className="h-5.5 w-5.5 text-white" strokeWidth={2} />
                    <span className="absolute inset-0 rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]" />
                  </div>

                  <h3 className="font-display text-lg font-semibold leading-tight tracking-tight text-white group-hover:text-violet-200 transition-colors">
                    {s.title}
                  </h3>

                  <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted-foreground">
                    {s.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {s.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-0.5 text-[10.5px] font-medium uppercase tracking-wider text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center gap-1.5 text-[12.5px] font-semibold text-violet-300 opacity-80 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                    Learn more
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </div>

                  {/* Hover bottom border accent */}
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                    style={{ background: s.accent }}
                  />
                </motion.article>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
