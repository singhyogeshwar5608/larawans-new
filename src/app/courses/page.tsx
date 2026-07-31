"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  Code2,
  BrainCircuit,
  TrendingUp,
  Palette,
  Cloud,
  Zap,
  ArrowRight,
  BookOpen,
  Clock,
  Users,
  FolderGit2,
  ChevronRight,
  Signal,
  GraduationCap,
  Sparkles,
  Star,
} from "lucide-react";
import {
  SiLaravel,
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiMysql,
  SiVercel,
  SiDocker,
  SiOpenaigym as SiOpenai,
  SiPython,
  SiFlutter,
  SiFirebase,
  SiGooglecloud,
  SiFigma,
  SiFramer,
  SiNotion,
  SiKubernetes,
  SiTerraform,
  SiGrafana,
  SiPrometheus,
  SiLinux,
  SiZapier,
  SiSlackware as SiSlack,
  SiGoogleanalytics,
  SiGoogleads,
  SiCanvas as SiCanva,
  SiWordpress,
  SiBlender,
} from "react-icons/si";
import { ALL_COURSES } from "@/lib/course-data";
import type { CourseItem } from "@/lib/course-data";

// ─── Category Map ───────────────────────────────────────────────────────────────

const CATEGORY_MAP: Record<string, string[]> = {
  Development: [
    "full-stack-web-development",
    "mobile-app-development-flutter",
  ],
  AI: ["ai-prompt-engineering"],
  Marketing: ["digital-marketing-mastery"],
  Design: ["ui-ux-design-figma", "3d-design-blender"],
  Cloud: ["devops-cloud-engineering"],
  SEO: ["digital-marketing-mastery"],
};

// ─── Category Tabs Config ──────────────────────────────────────────────────────

const CATEGORIES = [
  { label: "All Courses", value: "all", icon: Zap },
  { label: "Development", value: "Development", icon: Code2 },
  { label: "AI", value: "AI", icon: BrainCircuit },
  { label: "Marketing", value: "Marketing", icon: TrendingUp },
  { label: "Design", value: "Design", icon: Palette },
  { label: "Cloud", value: "Cloud", icon: Cloud },
  { label: "SEO", value: "SEO", icon: Search },
];

// ─── Stats with unique colors ──────────────────────────────────────────────────

const STATS = [
  { icon: BookOpen, value: "9", label: "Courses", gradient: "linear-gradient(135deg, #6366F1, #818CF8)", shadow: "#6366F130" },
  { icon: Clock, value: "300+", label: "Learning Hours", gradient: "linear-gradient(135deg, #F59E0B, #FBBF24)", shadow: "#F59E0B30" },
  { icon: Users, value: "10,000+", label: "Students", gradient: "linear-gradient(135deg, #10B981, #34D399)", shadow: "#10B98130" },
  { icon: FolderGit2, value: "100+", label: "Projects", gradient: "linear-gradient(135deg, #EC4899, #F472B6)", shadow: "#EC489930" },
];

// ─── Tech Icon Mapping ──────────────────────────────────────────────────────────

type TechIconComponent = React.ComponentType<{ size?: number; color?: string }>;

const TECH_ICON_MAP: Record<string, TechIconComponent> = {
  Laravel: SiLaravel, React: SiReact, "Next.js": SiNextdotjs, TypeScript: SiTypescript,
  "Tailwind CSS": SiTailwindcss, MySQL: SiMysql, Vercel: SiVercel, Docker: SiDocker,
  ChatGPT: SiOpenai, "OpenAI API": SiOpenai, "DALL-E": SiOpenai, "Hugging Face": SiOpenai,
  Python: SiPython, Flutter: SiFlutter, Dart: SiFlutter, Firebase: SiFirebase,
  "Google Cloud": SiGooglecloud, Figma: SiFigma, Framer: SiFramer, "Adobe XD": SiFigma,
  Notion: SiNotion, AWS: SiGooglecloud, Kubernetes: SiKubernetes, Terraform: SiTerraform,
  Grafana: SiGrafana, Prometheus: SiPrometheus, Linux: SiLinux, Zapier: SiZapier,
  "GitHub Actions": SiNotion, OpenAI: SiOpenai, Slack: SiSlack,
  "Google Analytics": SiGoogleanalytics, "Google Ads": SiGoogleads, Ahrefs: SiGoogleanalytics,
  Canva: SiCanva, WordPress: SiWordpress, Blender: SiBlender, Photoshop: SiCanva,
  "Google Sheets": SiGooglecloud, "Meta Ads": SiGoogleads, SEMrush: SiGoogleanalytics,
  Pandas: SiPython, "Power BI": SiGrafana, NumPy: SiPython, Matplotlib: SiPython,
  Seaborn: SiPython, Jupyter: SiPython, "Scikit-learn": SiPython,
  "After Effects": SiBlender, "Substance Painter": SiBlender, "Premiere Pro": SiBlender,
  "DaVinci Resolve": SiBlender, Make: SiZapier, Airtable: SiFirebase,
  "Riverpod": SiFlutter, SQLite: SiMysql, Hive: SiFirebase, Miro: SiFramer,
  Principle: SiFramer, "Mailchimp": SiCanva, LangChain: SiPython, Midjourney: SiOpenai,
};

// ─── Badge Color Map ────────────────────────────────────────────────────────────

const BADGE_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  Popular: { bg: "#EDE9FE", text: "#7C3AED", dot: "#7C3AED" },
  Trending: { bg: "#ECFDF5", text: "#059669", dot: "#10B981" },
  Bestseller: { bg: "#FEF3C7", text: "#92400E", dot: "#F59E0B" },
  New: { bg: "#DBEAFE", text: "#1D4ED8", dot: "#3B82F6" },
};

// ─── Level Config ─────────────────────────────────────────────────────────────────

const LEVEL_CONFIG: Record<string, { bars: number; label: string }> = {
  "All Levels": { bars: 3, label: "All Levels" },
  Beginner: { bars: 1, label: "Beginner" },
  Intermediate: { bars: 2, label: "Intermediate" },
  Advanced: { bars: 3, label: "Advanced" },
};

// ─── Animation Variants ─────────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Level Bars ───────────────────────────────────────────────────────────────────

function LevelBars({ level, color }: { level: string; color: string }) {
  const config = LEVEL_CONFIG[level] || LEVEL_CONFIG["All Levels"];
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-end gap-[2px]">
        {[1, 2, 3].map((bar) => (
          <div
            key={bar}
            className="w-[3px] rounded-full"
            style={{
              height: `${6 + bar * 4}px`,
              backgroundColor: bar <= config.bars ? color : "#E5E7EB",
            }}
          />
        ))}
      </div>
      <span className="text-[12px] text-[#6B7280] font-medium">{config.label}</span>
    </div>
  );
}

// ─── Tech Stack Icon ────────────────────────────────────────────────────────────

function TechIcon({ name, color }: { name: string; color: string }) {
  const IconComponent = TECH_ICON_MAP[name];
  return (
    <div
      className="inline-flex items-center gap-1.5 rounded-full px-2 py-1 bg-white border border-[#F3F4F6] shadow-sm"
    >
      {IconComponent ? (
        <IconComponent size={13} color={color} />
      ) : (
        <span className="block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
      )}
      <span className="text-[10px] font-bold" style={{ color }}>
        {name}
      </span>
    </div>
  );
}

// ─── Course Card ────────────────────────────────────────────────────────────────

function CourseCard({ course, index }: { course: CourseItem; index: number }) {
  const tc = course.themeColor || "#6366F1";

  return (
    <motion.div variants={cardVariants}>
      <Link href={`/courses/${course.slug}`} className="block group">
        <div
          className="relative flex items-stretch gap-0 rounded-2xl border border-[#F3F4F6] bg-white overflow-hidden transition-all duration-400 hover:-translate-y-1 group-hover:border-transparent"
          style={{
            boxShadow: `0 1px 3px rgba(0,0,0,0.04)`,
          }}
        >
          {/* ── Hover glow overlay ── */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
            style={{
              background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${tc}08, transparent 40%)`,
            }}
          />

          {/* ── Left: Colored icon section ── */}
          <div
            className="flex items-center justify-center w-[90px] sm:w-[110px] flex-shrink-0 relative"
            style={{
              background: `linear-gradient(160deg, ${tc}35 0%, ${tc}18 100%)`,
            }}
          >
            {/* Subtle accent stripe */}
            <div
              className="absolute left-0 top-0 bottom-0 w-[3px]"
              style={{ background: `linear-gradient(180deg, ${tc}, ${tc}80)` }}
            />
            <div
              className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl relative z-10"
              style={{
                background: `linear-gradient(135deg, ${tc}45, ${tc}25)`,
                boxShadow: `0 4px 12px ${tc}25`,
              }}
            >
              {course.emoji}
            </div>
          </div>

          {/* ── Middle: Content ── */}
          <div className="flex-1 min-w-0 px-5 sm:px-6 py-4 sm:py-5 flex flex-col justify-center">
            <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
              <h3 className="text-[15px] sm:text-[17px] font-bold text-[#111827] group-hover:text-[#1a1a2e] truncate">
                {course.title}
              </h3>
              {course.badge && BADGE_COLORS[course.badge] && (
                <span
                  className="inline-flex items-center gap-1 rounded-full px-2.5 py-[3px] text-[10px] font-bold uppercase tracking-wider flex-shrink-0"
                  style={{
                    backgroundColor: BADGE_COLORS[course.badge].bg,
                    color: BADGE_COLORS[course.badge].text,
                  }}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: BADGE_COLORS[course.badge].dot }}
                  />
                  {course.badge}
                </span>
              )}
            </div>
            <p className="text-[13px] text-[#6B7280] leading-relaxed mb-3 line-clamp-3">
              {course.description}
            </p>
            {/* Tech Stack */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {course.techStack.slice(0, 6).map((tech) => (
                <TechIcon key={tech.name} name={tech.name} color={tech.color} />
              ))}
              {course.techStack.length > 6 && (
                <span
                  className="inline-flex items-center rounded-full px-2 py-1 bg-[#F3F4F6] text-[10px] font-bold text-[#6B7280]"
                >
                  +{course.techStack.length - 6}
                </span>
              )}
            </div>
          </div>

          {/* ── Right: Meta + CTA ── */}
          <div className="flex flex-col items-center justify-center gap-3 px-5 sm:px-6 flex-shrink-0 border-l border-[#F3F4F6]">
            {/* Duration */}
            <div className="flex items-center gap-1.5">
              <Clock size={13} style={{ color: tc }} />
              <span className="text-[12px] text-[#4B5563] font-semibold">{course.duration}</span>
            </div>
            {/* Level */}
            <LevelBars level={course.level} color={tc} />
            {/* View Course pill */}
            <div
              className="flex items-center gap-1.5 rounded-full px-4 py-2 text-[12px] font-bold transition-all duration-300 group-hover:shadow-md"
              style={{
                color: tc,
                backgroundColor: `${tc}10`,
              }}
            >
              View Course
              <ArrowRight
                size={13}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </div>
          </div>

          {/* ── Hover border glow ── */}
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
            style={{
              boxShadow: `0 8px 30px ${tc}15, 0 0 0 1px ${tc}20`,
            }}
          />
        </div>
      </Link>
    </motion.div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function CoursesPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = useMemo(() => {
    let courses = ALL_COURSES;
    if (activeCategory !== "all" && CATEGORY_MAP[activeCategory]) {
      const slugs = CATEGORY_MAP[activeCategory];
      courses = courses.filter((c) => slugs.includes(c.slug));
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      courses = courses.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q) ||
          c.techStack.some((t) => t.name.toLowerCase().includes(q))
      );
    }
    return courses;
  }, [activeCategory, searchQuery]);

  return (
    <main className="min-h-screen" style={{ background: "#FAFBFF" }}>
      {/* ─── Hero Section ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Multi-color gradient blobs */}
        <div
          className="pointer-events-none absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full opacity-50 blur-[100px]"
          style={{ background: "linear-gradient(135deg, #C084FC, #60A5FA)" }}
        />
        <div
          className="pointer-events-none absolute -bottom-40 -left-40 h-[450px] w-[450px] rounded-full opacity-40 blur-[100px]"
          style={{ background: "linear-gradient(135deg, #34D399, #FBBF24)" }}
        />
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[600px] rounded-full opacity-20 blur-[120px]"
          style={{ background: "linear-gradient(90deg, #F472B6, #A78BFA)" }}
        />

        <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-12 sm:pb-16">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-1.5 mb-6 sm:mb-8"
          >
            <Link href="/" className="text-[13px] font-medium text-[#6B7280] hover:text-[#6366F1] transition-colors">
              Home
            </Link>
            <ChevronRight size={14} className="text-[#9CA3AF]" />
            <span className="text-[13px] font-bold uppercase tracking-wide" style={{ color: "#6366F1" }}>
              All Courses
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-[#6366F1]/10 px-4 py-1.5 mb-5">
              <Sparkles size={14} className="text-[#6366F1]" />
              <span className="text-[12px] font-bold uppercase tracking-wider text-[#6366F1]">
                Learn from Industry Experts
              </span>
            </div>
            <h1 className="text-[32px] sm:text-[44px] lg:text-[54px] font-extrabold leading-[1.08] tracking-tight text-[#111827]">
              Explore Our{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #6366F1 0%, #EC4899 40%, #F97316 100%)" }}
              >
                Professional Courses
              </span>
            </h1>
            <p className="mt-4 text-[15px] sm:text-base text-[#4B5563] leading-relaxed max-w-2xl">
              Practical, project-based training programs designed by industry experts.
              Master in-demand skills with real-world projects and personalized mentorship.
            </p>
          </motion.div>

          {/* Stats Row — Colorful Cards */}
          <motion.div
            className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15, ease: "easeOut" }}
          >
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className="relative flex items-center gap-3 rounded-2xl bg-white border border-[#F3F4F6] px-4 py-4 sm:px-5 sm:py-5 overflow-hidden"
                style={{ boxShadow: `0 2px 8px ${stat.shadow}` }}
              >
                {/* Subtle gradient accent at top */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{ background: stat.gradient }}
                />
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl flex-shrink-0"
                  style={{ background: stat.gradient, boxShadow: `0 4px 12px ${stat.shadow}` }}
                >
                  <stat.icon size={20} className="text-white" strokeWidth={2} />
                </div>
                <div>
                  <span className="text-xl sm:text-2xl font-extrabold text-[#111827]">{stat.value}</span>
                  <p className="text-[11px] sm:text-xs text-[#6B7280] font-medium leading-tight mt-0.5">{stat.label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Filters + Search ──────────────────────────────────────────── */}
      <section className="sticky top-0 z-30 border-b border-[#F3F4F6] bg-white/80 backdrop-blur-xl">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Category Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar w-full sm:w-auto pb-1 sm:pb-0">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.value;
                return (
                  <button
                    key={cat.value}
                    onClick={() => setActiveCategory(cat.value)}
                    className={`relative inline-flex items-center gap-1.5 whitespace-nowrap px-3.5 sm:px-4 py-2 text-[13px] font-medium transition-all duration-200 cursor-pointer flex-shrink-0 rounded-lg ${
                      isActive
                        ? "text-[#6366F1] font-semibold"
                        : "text-[#6B7280] hover:text-[#6366F1] hover:bg-[#6366F1]/5"
                    }`}
                  >
                    <Icon size={15} />
                    <span>{cat.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 rounded-lg bg-[#6366F1]/8"
                        style={{ border: "1.5px solid #6366F125" }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    {isActive && (
                      <motion.div
                        layoutId="activeTabLine"
                        className="absolute -bottom-[9px] left-3 right-3 h-[2.5px] rounded-full"
                        style={{ background: "linear-gradient(90deg, #6366F1, #A78BFA)" }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Search Bar */}
            <div className="relative w-full sm:w-auto sm:ml-auto sm:min-w-[280px]">
              <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
              <input
                type="text"
                placeholder="Search a course..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] py-2.5 pl-10 pr-4 text-sm text-[#111827] placeholder-[#9CA3AF] outline-none transition-all duration-200 focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/15 focus:bg-white focus:shadow-sm focus:shadow-[#6366F1]/10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Course Cards ─────────────────────────────────────────────── */}
      <section className="py-8 sm:py-12">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          {filteredCourses.length > 0 ? (
            <motion.div
              className="flex flex-col gap-3 sm:gap-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredCourses.map((course, index) => (
                <CourseCard key={course.slug} course={course} index={index} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="flex flex-col items-center justify-center py-20 text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-[#F3F4F6] mb-4">
                <Search size={24} className="text-[#9CA3AF]" />
              </div>
              <h3 className="text-lg font-semibold text-[#111827] mb-1">No courses found</h3>
              <p className="text-sm text-[#6B7280] max-w-sm">
                Try adjusting your search query or selecting a different category.
              </p>
              <button
                onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}
                className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#6366F1] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#6366F1]/25 transition-all duration-200 hover:bg-[#5558E6] hover:-translate-y-0.5 cursor-pointer"
              >
                Clear Filters
              </button>
            </motion.div>
          )}

          {filteredCourses.length > 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-center text-sm text-[#9CA3AF]"
            >
              Showing {filteredCourses.length} of {ALL_COURSES.length} courses
            </motion.p>
          )}
        </div>
      </section>

      {/* ─── Bottom CTA Banner ────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
          <div
            className="relative rounded-3xl overflow-hidden px-8 sm:px-12 lg:px-16 py-10 sm:py-14"
            style={{ background: "linear-gradient(135deg, #1E1B4B 0%, #312E81 40%, #4338CA 100%)" }}
          >
            {/* Decorative elements */}
            <div className="pointer-events-none absolute -top-20 -right-20 h-60 w-60 rounded-full opacity-20 blur-[60px]" style={{ backgroundColor: "#818CF8" }} />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full opacity-15 blur-[50px]" style={{ backgroundColor: "#C084FC" }} />
            <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full opacity-[0.07]" style={{ background: "conic-gradient(from 0deg, #6366F1, #EC4899, #F97316, #6366F1)" }} />

            {/* Floating dots */}
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="pointer-events-none absolute rounded-full opacity-20"
                style={{
                  width: `${4 + i * 2}px`,
                  height: `${4 + i * 2}px`,
                  backgroundColor: "#A5B4FC",
                  top: `${15 + i * 12}%`,
                  left: `${10 + i * 15}%`,
                }}
              />
            ))}

            <div className="relative flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              {/* Left: Icon */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <div
                    className="flex h-20 w-20 items-center justify-center rounded-2xl"
                    style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.3), rgba(168,139,250,0.2))", backdropFilter: "blur(10px)" }}
                  >
                    <GraduationCap size={36} className="text-[#C4B5FD]" />
                  </div>
                  <div
                    className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full"
                    style={{ background: "linear-gradient(135deg, #F59E0B, #FBBF24)", boxShadow: "0 2px 8px #F59E0B40" }}
                  >
                    <Star size={12} className="text-white" fill="white" />
                  </div>
                </div>
              </div>

              {/* Middle: Text */}
              <div className="flex-1 text-center lg:text-left">
                <h2 className="text-[22px] sm:text-[26px] lg:text-[30px] font-bold text-white leading-tight">
                  Not sure which course is right for you?
                </h2>
                <p className="mt-2.5 text-[14px] sm:text-[15px] text-[#A5B4FC] leading-relaxed max-w-xl">
                  Book a free consultation with our expert advisors. We&apos;ll help you
                  choose the perfect learning path based on your goals and experience level.
                </p>
              </div>

              {/* Right: CTA */}
              <div className="flex-shrink-0">
                <Link
                  href="/"
                  className="group relative inline-flex items-center gap-2 rounded-full px-8 py-4 text-[14px] font-bold text-white overflow-hidden transition-all duration-300 hover:-translate-y-1"
                  style={{ boxShadow: "0 8px 24px rgba(99,102,241,0.4)" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#6366F1] to-[#818CF8]" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#818CF8] to-[#A78BFA] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative flex items-center gap-2">
                    Book Free Consultation
                    <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
