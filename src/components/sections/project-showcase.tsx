"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Monitor } from "lucide-react";
import {
  SiLaravel,
  SiMysql,
  SiReact,
  SiTailwindcss,
  SiNodedotjs,
  SiRedis,
  SiStripe,
} from "react-icons/si";
import { SectionHeading } from "../section-heading";
import { MagneticButton } from "../magnetic-button";

/* ── Types ── */
export type ShowcaseProject = {
  slug: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  accent: string;
  video: string;
  stats: { value: string; label: string }[];
};

/* ── Data ── */
const SHOWCASE_ICON_MAP: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  Laravel: SiLaravel,
  MySQL: SiMysql,
  React: SiReact,
  "Tailwind CSS": SiTailwindcss,
  "Node.js": SiNodedotjs,
  Redis: SiRedis,
  Stripe: SiStripe,
};

const SHOWCASE_ICON_COLORS: Record<string, string> = {
  Laravel: "#FF2D20",
  MySQL: "#4479A1",
  React: "#61DAFB",
  "Tailwind CSS": "#06B6D4",
  "Node.js": "#83CD29",
  Redis: "#DC382D",
  Stripe: "#635BFF",
};

const showcaseProjects: ShowcaseProject[] = [
  {
    slug: "pollution-erp",
    title: "Pollution ERP",
    category: "Environment & Compliance",
    description:
      "End-to-end pollution monitoring and compliance management platform — real-time emissions tracking, customer lifecycle management, automated expiry alerts, and integrated payment processing for regulatory bodies.",
    tags: ["Laravel", "MySQL", "Real-time Dashboard"],
    iconTags: ["Laravel", "MySQL", "React"],
    accent: "linear-gradient(135deg, #7c5cff 0%, #00e0c6 100%)",
    video: "/showcase/pollution-erp/pollution-erp.mp4",
    stats: [
      { value: "100+", label: "Clients Managed" },
      { value: "24/7", label: "Real-time Tracking" },
      { value: "98%", label: "Compliance Rate" },
    ],
  },
];

const TABS = ["Laravel", "MySQL", "React", "Tailwind CSS", "Node.js", "Redis", "Stripe"];

export function ProjectShowcase() {
  const [projectIndex, setProjectIndex] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const project = showcaseProjects[projectIndex];

  /* Reset video when project changes */
  const switchProject = (index: number) => {
    setProjectIndex(index);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
      }
    }, 100);
  };

  return (
    <section id="showcase" className="relative overflow-hidden bg-[#050614] py-24 sm:py-32">
      {/* Subtle grid background */}
      <div className="pointer-events-none absolute inset-0 grid-pattern" aria-hidden />

      {/* Top accent line */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 5%, rgba(124,92,255,0.5) 30%, rgba(0,224,198,0.5) 50%, rgba(124,92,255,0.5) 70%, transparent 95%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section heading */}
        <SectionHeading
          eyebrow="Showcase"
          title="See our work"
          highlight="in action"
          description="Real products. Real users. Real results. Explore live demos of platforms we've shipped — watch them breathe, navigate, and perform."
        />

        {/* ── Main Showcase Area ── */}
        <div className="mt-16 grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* LEFT: Project Info */}
          <AnimatePresence mode="wait">
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col"
            >
              {/* Category badge */}
              <span
                className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.2em] text-violet-200/70 backdrop-blur"
              >
                <Monitor className="h-3 w-3 text-[#00e0c6]" />
                {project.category}
              </span>

              {/* Title */}
              <h3 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.8rem]">
                {project.title}
              </h3>

              {/* Description */}
              <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
                {project.description}
              </p>

              {/* Tech stack icons */}
              <div className="mt-6 flex flex-wrap gap-3">
                {(project.iconTags || []).map((tag, i) => {
                  const IconComp = SHOWCASE_ICON_MAP[tag];
                  const color = SHOWCASE_ICON_COLORS[tag] || "#7c5cff";
                  return (
                    <motion.div
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1, duration: 0.4 }}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] backdrop-blur"
                    >
                      {IconComp && <IconComp className="h-5 w-5" style={{ color }} />}
                    </motion.div>
                  );
                })}
              </div>

              {/* Tech tabs */}
              <div className="mt-3 flex flex-wrap gap-2">
                {TABS.map((tab, i) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(i)}
                    className={`rounded-full border px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-wider transition-all duration-300 ${
                      activeTab === i
                        ? "border-[#00e0c6]/40 bg-[#00e0c6]/10 text-[#00e0c6] shadow-[0_0_12px_rgba(0,224,198,0.15)]"
                        : "border-white/10 bg-white/[0.04] text-white/50 hover:border-white/20 hover:text-white/70"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Stats */}
              <div className="mt-8 grid grid-cols-3 gap-4">
                {project.stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.12, duration: 0.5 }}
                    className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-3 text-center backdrop-blur"
                  >
                    <div className="font-display text-xl font-bold text-gradient-cyan sm:text-2xl">
                      {stat.value}
                    </div>
                    <div className="mt-0.5 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-8">
                <MagneticButton href="#contact" variant="neon" className="px-7 py-3.5 text-[14px]">
                  Start a Similar Project
                  <ExternalLink className="h-4 w-4" />
                </MagneticButton>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* RIGHT: Desktop Monitor + Video */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full"
            style={{ maxWidth: "720px" }}
          >
            {/* Monitor body — thin bezel, NO overflow hidden */}
            <div className="relative rounded-lg border-[4px] border-neutral-700/70 bg-neutral-800">
              {/* Top bar — webcam dot + status dots */}
              <div className="flex items-center justify-center gap-2 py-1.5">
                <div className="h-[3px] w-[3px] rounded-full bg-neutral-500/80" />
                <div className="flex items-center gap-1">
                  <div className="h-[3px] w-[3px] rounded-full bg-neutral-500/50" />
                  <div className="h-[3px] w-[3px] rounded-full bg-neutral-500/50" />
                  <div className="h-[3px] w-[3px] rounded-full bg-neutral-500/50" />
                </div>
              </div>

              {/* Screen — video sits directly, no cropping */}
              <div className="px-1.5 pb-1.5">
                <video
                  ref={videoRef}
                  src={project.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="block w-full rounded-sm"
                />
              </div>
            </div>

            {/* Monitor stand — neck */}
            <div className="mx-auto h-8 w-20 bg-gradient-to-b from-neutral-700 to-neutral-800" />

            {/* Monitor stand — base */}
            <div className="mx-auto h-2 w-36 rounded-b-lg bg-neutral-700/80" />
          </motion.div>
        </div>

        {/* ── Project Thumbnails Strip ── */}
        {showcaseProjects.length > 1 && (
          <div className="mt-16 flex items-center justify-center gap-4 overflow-x-auto px-4 pb-2">
            {showcaseProjects.map((p, i) => (
              <button
                key={p.slug}
                onClick={() => switchProject(i)}
                className={`flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                  i === projectIndex
                    ? "border-[#00e0c6] shadow-[0_0_20px_rgba(0,224,198,0.3)]"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                <video
                  src={p.video}
                  muted
                  className="h-16 w-24 object-cover"
                />
                <div className="bg-white/[0.05] px-2 py-1 text-[10px] font-medium text-white/70">
                  {p.title}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
