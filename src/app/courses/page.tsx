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

// ─── Tech Icon Mapping ──────────────────────────────────────────────────────────

type TechIconComponent = React.ComponentType<{ size?: number; color?: string }>;

const TECH_ICON_MAP: Record<string, TechIconComponent> = {
  Laravel: SiLaravel,
  React: SiReact,
  "Next.js": SiNextdotjs,
  TypeScript: SiTypescript,
  "Tailwind CSS": SiTailwindcss,
  MySQL: SiMysql,
  Vercel: SiVercel,
  Docker: SiDocker,
  ChatGPT: SiOpenai,
  "OpenAI API": SiOpenai,
  "DALL-E": SiOpenai,
  "Hugging Face": SiOpenai,
  Python: SiPython,
  Flutter: SiFlutter,
  Dart: SiFlutter,
  Firebase: SiFirebase,
  "Google Cloud": SiGooglecloud,
  Figma: SiFigma,
  Framer: SiFramer,
  "Adobe XD": SiFigma,
  Notion: SiNotion,
  AWS: SiGooglecloud,
  Kubernetes: SiKubernetes,
  Terraform: SiTerraform,
  Grafana: SiGrafana,
  Prometheus: SiPrometheus,
  Linux: SiLinux,
  Zapier: SiZapier,
  "GitHub Actions": SiNotion,
  OpenAI: SiOpenai,
  Slack: SiSlack,
  "Google Analytics": SiGoogleanalytics,
  "Google Ads": SiGoogleads,
  Ahrefs: SiGoogleanalytics,
  Canva: SiCanva,
  WordPress: SiWordpress,
  Blender: SiBlender,
  Photoshop: SiCanva,
  "Google Sheets": SiGooglecloud,
  "Meta Ads": SiGoogleads,
  SEMrush: SiGoogleanalytics,
  Pandas: SiPython,
  "Power BI": SiGrafana,
  NumPy: SiPython,
  Matplotlib: SiPython,
  Seaborn: SiPython,
  Jupyter: SiPython,
  "Scikit-learn": SiPython,
  "After Effects": SiBlender,
  "Substance Painter": SiBlender,
  "Premiere Pro": SiBlender,
  "DaVinci Resolve": SiBlender,
  Make: SiZapier,
  Airtable: SiFirebase,
  "Riverpod": SiFlutter,
  SQLite: SiMysql,
  Hive: SiFirebase,
  Miro: SiFramer,
  Principle: SiFramer,
  "Mailchimp": SiCanva,
  LangChain: SiPython,
  Midjourney: SiOpenai,
};

// ─── Badge Color Map ────────────────────────────────────────────────────────────

const BADGE_COLORS: Record<string, { bg: string; text: string }> = {
  Popular: { bg: "#EDE9FE", text: "#7C3AED" },
  Trending: { bg: "#CFFAFE", text: "#0891B2" },
  Bestseller: { bg: "#FEF3C7", text: "#92400E" },
  New: { bg: "#DBEAFE", text: "#1D4ED8" },
};

// ─── Level Icon Map ─────────────────────────────────────────────────────────────

const LEVEL_CONFIG: Record<string, { bars: number; label: string }> = {
  "All Levels": { bars: 3, label: "All Levels" },
  Beginner: { bars: 1, label: "Beginner" },
  Intermediate: { bars: 2, label: "Intermediate" },
  Advanced: { bars: 3, label: "Advanced" },
};

// ─── Animation Variants ─────────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// ─── Level Bars Component ───────────────────────────────────────────────────────

function LevelBars({ level }: { level: string }) {
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
              backgroundColor: bar <= config.bars ? "#6B7280" : "#E5E7EB",
            }}
          />
        ))}
      </div>
      <span className="text-[13px] text-[#4B5563] font-medium">{config.label}</span>
    </div>
  );
}

// ─── Tech Stack Icon Component ──────────────────────────────────────────────────

function TechIcon({ name, color }: { name: string; color: string }) {
  const IconComponent = TECH_ICON_MAP[name];
  return (
    <div
      className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F9FAFB] border border-[#F3F4F6]"
      title={name}
    >
      {IconComponent ? (
        <IconComponent size={16} color={color} />
      ) : (
        <span
          className="block h-2 w-2 rounded-full"
          style={{ backgroundColor: color }}
        />
      )}
    </div>
  );
}

// ─── Course Card Component ──────────────────────────────────────────────────────

function CourseCard({ course, index }: { course: CourseItem; index: number }) {
  const themeColor = course.themeColor || "#6366F1";

  return (
    <motion.div variants={cardVariants}>
      <Link href={`/courses/${course.slug}`} className="block group">
        <div
          className="relative flex items-center gap-5 sm:gap-6 rounded-2xl border border-[#F3F4F6] bg-white px-5 sm:px-8 py-5 sm:py-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:border-[#E5E7EB]"
        >
          {/* ── Left: Icon with bg color ── */}
          <div
            className="flex h-12 w-12 items-center justify-center rounded-2xl text-xl flex-shrink-0"
            style={{ backgroundColor: `${themeColor}20` }}
          >
            {course.emoji}
          </div>

          {/* ── Middle: Content ── */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h3 className="text-[15px] sm:text-[17px] font-bold text-[#111827] truncate">
                {course.title}
              </h3>
              {course.badge && BADGE_COLORS[course.badge] && (
                <span
                  className="inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider flex-shrink-0"
                  style={{
                    backgroundColor: BADGE_COLORS[course.badge].bg,
                    color: BADGE_COLORS[course.badge].text,
                  }}
                >
                  {course.badge}
                </span>
              )}
            </div>
            <p className="text-[13px] text-[#6B7280] leading-relaxed mb-2.5 line-clamp-1 sm:line-clamp-2">
              {course.description}
            </p>
            {/* Tech Stack Row */}
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#9CA3AF]">
                Tech Stack
              </span>
              <div className="flex items-center gap-1.5">
                {course.techStack.slice(0, 8).map((tech) => (
                  <TechIcon key={tech.name} name={tech.name} color={tech.color} />
                ))}
                {course.techStack.length > 8 && (
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F9FAFB] border border-[#F3F4F6] text-[10px] font-bold text-[#9CA3AF]">
                    +{course.techStack.length - 8}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* ── Right: Meta + CTA ── */}
          <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 sm:gap-3.5 flex-shrink-0">
            {/* Duration */}
            <div className="flex items-center gap-1.5">
              <Clock size={14} className="text-[#9CA3AF]" />
              <span className="text-[13px] text-[#4B5563] font-medium">{course.duration}</span>
            </div>
            {/* Level */}
            <LevelBars level={course.level} />
            {/* View Course Link */}
            <div
              className="flex items-center gap-1.5 text-[13px] font-semibold transition-all duration-200 group-hover:gap-2.5"
              style={{ color: themeColor }}
            >
              View Course
              <ArrowRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ─── Main Page Component ────────────────────────────────────────────────────────

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
    <main className="min-h-screen" style={{ background: "#FFFFFF" }}>
      {/* ─── Hero Section ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-10 sm:pt-14 pb-16 sm:pb-20">
        {/* Decorative gradient blob — top right */}
        <div
          className="pointer-events-none absolute -top-16 -right-16 h-[350px] w-[350px] rounded-full opacity-60 blur-[80px]"
          style={{
            background: "linear-gradient(135deg, #E0C3FC, #8EC5FC)",
          }}
          aria-hidden="true"
        />
        {/* Subtle blob — bottom left */}
        <div
          className="pointer-events-none absolute -bottom-20 -left-20 h-[250px] w-[250px] rounded-full opacity-30 blur-[80px]"
          style={{
            background: "linear-gradient(135deg, #C4B5FD, #93C5FD)",
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex items-center gap-1.5 mb-6 sm:mb-8"
          >
            <Link href="/" className="text-[13px] font-medium text-[#6B7280] hover:text-[#6366F1] transition-colors">
              Home
            </Link>
            <ChevronRight size={14} className="text-[#9CA3AF]" />
            <span className="text-[13px] font-bold uppercase tracking-wide text-[#6366F1]">
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
            <h1 className="text-[32px] sm:text-[42px] lg:text-[52px] font-bold leading-[1.1] tracking-tight text-[#111827]">
              Explore Our{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg, #7C3AED, #F97316)",
                }}
              >
                Professional Courses
              </span>
            </h1>
            <p className="mt-4 text-[15px] sm:text-base text-[#4B5563] leading-relaxed max-w-2xl">
              Practical, project-based training programs designed by industry experts.
              Master in-demand skills with real-world projects and personalized mentorship.
            </p>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          >
            {[
              { icon: BookOpen, value: "9", label: "Courses" },
              { icon: Clock, value: "300+", label: "Hours" },
              { icon: Users, value: "10,000+", label: "Students" },
              { icon: FolderGit2, value: "100+", label: "Projects" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-3 rounded-2xl bg-[#F9FAFB] border border-[#F3F4F6] px-4 py-3.5 sm:px-5 sm:py-4"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F3F4F6] flex-shrink-0">
                  <stat.icon size={18} className="text-[#6366F1]" strokeWidth={2} />
                </div>
                <div>
                  <span className="text-lg sm:text-xl font-bold text-[#111827]">{stat.value}</span>
                  <p className="text-[11px] sm:text-xs text-[#6B7280] font-medium">{stat.label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Filters + Search ──────────────────────────────────────────── */}
      <section className="border-y border-[#F3F4F6] bg-[#FAFAFA]/50">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Category Tabs — underline style */}
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar w-full sm:w-auto pb-1 sm:pb-0">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.value;
                return (
                  <button
                    key={cat.value}
                    onClick={() => setActiveCategory(cat.value)}
                    className={`relative inline-flex items-center gap-1.5 whitespace-nowrap px-3 sm:px-4 py-2 text-[13px] sm:text-sm font-medium transition-all duration-200 cursor-pointer flex-shrink-0 ${
                      isActive
                        ? "text-[#6366F1] font-semibold"
                        : "text-[#374151] hover:text-[#6366F1]"
                    }`}
                  >
                    <Icon size={15} />
                    <span>{cat.label}</span>
                    {/* Active underline */}
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-2 right-2 h-[2.5px] rounded-full bg-[#6366F1]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Search Bar */}
            <div className="relative w-full sm:w-auto sm:ml-auto sm:min-w-[280px]">
              <Search
                size={16}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
              />
              <input
                type="text"
                placeholder="Search a course..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] py-2.5 pl-10 pr-4 text-sm text-[#111827] placeholder-[#9CA3AF] outline-none transition-all duration-200 focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/10 focus:bg-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Course Cards List ─────────────────────────────────────────── */}
      <section className="py-10 sm:py-14">
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-[#F3F4F6] mb-4">
                <Search size={24} className="text-[#9CA3AF]" />
              </div>
              <h3 className="text-lg font-semibold text-[#111827] mb-1">
                No courses found
              </h3>
              <p className="text-sm text-[#6B7280] max-w-sm">
                Try adjusting your search query or selecting a different
                category to find what you&apos;re looking for.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#6366F1] px-5 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-[#5558E6] cursor-pointer"
              >
                Clear Filters
              </button>
            </motion.div>
          )}

          {/* Results count */}
          {filteredCourses.length > 0 && (
            <p className="mt-8 text-center text-sm text-[#9CA3AF]">
              Showing {filteredCourses.length} of {ALL_COURSES.length} courses
            </p>
          )}
        </div>
      </section>

      {/* ─── Bottom CTA Banner ────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div
          className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20"
        >
          <div
            className="relative rounded-3xl overflow-hidden px-8 sm:px-12 lg:px-16 py-10 sm:py-14"
            style={{
              background: "linear-gradient(135deg, #1E1B4B 0%, #312E81 50%, #3730A3 100%)",
            }}
          >
            {/* Decorative circles */}
            <div
              className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full opacity-20 blur-[40px]"
              style={{ backgroundColor: "#6366F1" }}
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full opacity-15 blur-[40px]"
              style={{ backgroundColor: "#A78BFA" }}
              aria-hidden="true"
            />

            <div className="relative flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              {/* Left: Icon/Image */}
              <div className="flex-shrink-0">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
                  <GraduationCap size={36} className="text-[#A5B4FC]" />
                </div>
              </div>

              {/* Middle: Text */}
              <div className="flex-1 text-center lg:text-left">
                <h2 className="text-[22px] sm:text-[26px] lg:text-[30px] font-bold text-white leading-tight">
                  Not sure which course is right for you?
                </h2>
                <p className="mt-2 text-[14px] sm:text-[15px] text-[#A5B4FC] leading-relaxed max-w-xl">
                  Book a free consultation with our expert advisors. We&apos;ll help you
                  choose the perfect learning path based on your goals and experience level.
                </p>
              </div>

              {/* Right: CTA Button */}
              <div className="flex-shrink-0">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-full bg-[#6366F1] px-7 py-3.5 text-[14px] font-bold text-white shadow-lg shadow-[#6366F1]/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#6366F1]/40 hover:bg-[#5558E6]"
                >
                  Book Free Consultation
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
