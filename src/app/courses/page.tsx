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

// ─── Level Badge Colors ─────────────────────────────────────────────────────────

const LEVEL_COLORS: Record<string, string> = {
  "All Levels": "bg-emerald-50 text-emerald-700 border-emerald-200",
  Beginner: "bg-sky-50 text-sky-700 border-sky-200",
  Intermediate: "bg-amber-50 text-amber-700 border-amber-200",
  Advanced: "bg-rose-50 text-rose-700 border-rose-200",
};

// ─── Animation Variants ─────────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// ─── Tech Chip Component ────────────────────────────────────────────────────────

function TechChip({ name, color }: { name: string; color: string }) {
  const IconComponent = TECH_ICON_MAP[name];

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-700 border border-gray-100"
    >
      {IconComponent ? (
        <IconComponent size={13} color={color} />
      ) : (
        <span
          className="inline-block h-2.5 w-2.5 rounded-full flex-shrink-0"
          style={{ backgroundColor: color }}
        />
      )}
      <span>{name}</span>
    </span>
  );
}

// ─── Course Card Component ──────────────────────────────────────────────────────

function CourseCard({ course, index }: { course: CourseItem; index: number }) {
  return (
    <motion.div variants={cardVariants}>
      <Link href={`/courses/${course.slug}`} className="block group">
        <div className="rounded-3xl border border-[#ECECEC] bg-white p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#6D5BFF]/5">
          <div className="flex flex-col sm:flex-row items-start gap-5 sm:gap-6">
            {/* Left: Icon + Badge */}
            <div className="flex items-center gap-4 sm:flex-col sm:items-center sm:gap-3 sm:min-w-[80px]">
              <div
                className={`flex items-center justify-center h-14 w-14 rounded-2xl text-2xl ${course.iconBg}`}
              >
                {course.emoji}
              </div>
              <span className="hidden sm:inline-flex items-center rounded-full bg-[#6D5BFF]/10 px-3 py-1 text-xs font-semibold text-[#6D5BFF] whitespace-nowrap">
                {course.shortTag}
              </span>
            </div>

            {/* Center: Title, Description, Tech Stack */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 sm:mb-2">
                <h3 className="text-lg sm:text-xl font-bold text-[#181A2A] truncate">
                  {course.title}
                </h3>
                <span className="inline-flex sm:hidden items-center rounded-full bg-[#6D5BFF]/10 px-2.5 py-0.5 text-[10px] font-semibold text-[#6D5BFF] whitespace-nowrap">
                  {course.shortTag}
                </span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed mb-3 line-clamp-2">
                {course.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {course.techStack.slice(0, 6).map((tech) => (
                  <TechChip key={tech.name} name={tech.name} color={tech.color} />
                ))}
                {course.techStack.length > 6 && (
                  <span className="inline-flex items-center rounded-full bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-400 border border-gray-100">
                    +{course.techStack.length - 6}
                  </span>
                )}
              </div>
            </div>

            {/* Right: Price, Level, Modules, CTA */}
            <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 sm:gap-3 sm:min-w-[130px] w-full sm:w-auto border-t sm:border-t-0 border-gray-100 pt-4 sm:pt-0 mt-1 sm:mt-0">
              <div className="sm:text-right">
                <p className="text-xl sm:text-2xl font-bold text-[#181A2A]">
                  {course.price}
                </p>
              </div>
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold border ${
                  LEVEL_COLORS[course.level] || "bg-gray-50 text-gray-600 border-gray-200"
                }`}
              >
                {course.level}
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                <BookOpen size={12} />
                {course.modules} Modules
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#6D5BFF] group-hover:gap-2.5 transition-all duration-200">
                View Details
                <ArrowRight size={14} />
              </span>
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

    // Category filter
    if (activeCategory !== "all" && CATEGORY_MAP[activeCategory]) {
      const slugs = CATEGORY_MAP[activeCategory];
      courses = courses.filter((c) => slugs.includes(c.slug));
    }

    // Search filter
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
    <main className="min-h-screen bg-white">
      {/* ─── Hero Section ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 lg:py-24">
        {/* Background gradient blobs */}
        <div
          className="pointer-events-none absolute -top-20 left-1/4 h-[400px] w-[400px] rounded-full bg-[#6D5BFF] opacity-20 blur-[120px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute top-10 right-1/4 h-[350px] w-[350px] rounded-full bg-orange-400 opacity-20 blur-[120px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-10 left-1/2 h-[300px] w-[300px] rounded-full bg-cyan-400 opacity-20 blur-[120px]"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-[28px] sm:text-[36px] lg:text-[42px] font-bold text-[#181A2A] leading-tight tracking-tight">
              Explore Our Professional Courses
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-gray-500 leading-relaxed">
              Practical, project-based training designed by industry experts.
              Build real-world skills and a portfolio that stands out.
            </p>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            {[
              {
                icon: BookOpen,
                value: "9",
                label: "Courses",
              },
              {
                icon: Clock,
                value: "300+",
                label: "Learning Hours",
              },
              {
                icon: Users,
                value: "10,000+",
                label: "Students",
              },
              {
                icon: FolderGit2,
                value: "100+",
                label: "Projects",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-2 rounded-2xl bg-gray-50/80 border border-gray-100 px-4 py-5"
              >
                <stat.icon
                  size={20}
                  className="text-[#6D5BFF]"
                  strokeWidth={2}
                />
                <span className="text-2xl sm:text-3xl font-bold text-[#181A2A]">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm text-gray-500 font-medium">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Filters + Search ──────────────────────────────────────────── */}
      <section className="border-b border-[#ECECEC] bg-gray-50/40">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full sm:w-auto pb-1 sm:pb-0">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.value;
                return (
                  <button
                    key={cat.value}
                    onClick={() => setActiveCategory(cat.value)}
                    className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 cursor-pointer flex-shrink-0 ${
                      isActive
                        ? "bg-[#6D5BFF] text-white shadow-md shadow-[#6D5BFF]/25"
                        : "bg-white text-gray-600 border border-[#ECECEC] hover:border-gray-300 hover:text-gray-800"
                    }`}
                  >
                    <Icon size={15} />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Search Bar */}
            <div className="relative w-full sm:w-auto sm:ml-auto sm:min-w-[280px]">
              <Search
                size={16}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-[#ECECEC] bg-white py-2.5 pl-10 pr-4 text-sm text-[#181A2A] placeholder-gray-400 outline-none transition-all duration-200 focus:border-[#6D5BFF] focus:ring-2 focus:ring-[#6D5BFF]/10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Course Cards Grid ─────────────────────────────────────────── */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          {filteredCourses.length > 0 ? (
            <motion.div
              className="flex flex-col gap-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
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
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mb-4">
                <Search size={24} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-[#181A2A] mb-1">
                No courses found
              </h3>
              <p className="text-sm text-gray-500 max-w-sm">
                Try adjusting your search query or selecting a different
                category to find what you&apos;re looking for.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#6D5BFF] px-5 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-[#5a4be6] cursor-pointer"
              >
                Clear Filters
              </button>
            </motion.div>
          )}

          {/* Results count */}
          {filteredCourses.length > 0 && (
            <p className="mt-6 text-center text-sm text-gray-400">
              Showing {filteredCourses.length} of {ALL_COURSES.length} courses
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
