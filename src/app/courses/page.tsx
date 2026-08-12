"use client";

import React, { useState, useMemo } from "react";
import { ALL_COURSES as COURSES_DATA, type CourseItem } from "@/lib/course-data";

type StitchCourse = CourseItem & {
  rating: number;
  location: string;
  durationCategory: string;
  priceCategory: string;
  badge: string;
  image: string;
};

const COURSE_IMAGES = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDz1MLphw5DTmzvEeeFKq028CHnsWDMUAw0PHDZnKDA97NDcMlgiDjpKz7ZEyf7725rvsRS_pshTus_qp2z7_SdNZSTlxePv-30REx_R8Jgx0Ms5gtjZ_jsjGGObHzsLsMlLM4I53kGBQkONAb0s6q9LJqcJgsmPTw5P3QeC4AZGRuC2cuqjkLu2fzC8etXttUvZ_j9lKzm_XBElYcfID9BU4ZliLahwh2ZSmnjTCkqPWT0eBsCAav9",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCNSuPUcWQapChSaN2-ZnThWnW_Ry-msCHecejg6jKo5VhCjqp4FKWIA199Z12DJb0QNnHh-F46a7M8aoUQP84hOXoo8P3E5I8MlkWGPnIe409V8uKNPusLJncGOFK2-g0VSK_00XW1LspCkOHMBDxomaperA6cN1ElKv46AMlUWPxocyel2YWpl97AD4GpOILKytPnj94ioJRI_t5xAgudRzQtJ8Oc5ts3-LWTwBOFa9suu8h6_uN-",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBHF3135hdftIT0zZiAYVHBQwQjEEkY9wBn55IX_2yk18tJmj9-hkZnadKxaPmsnF9LGTtV4DKnQSFw1UiduemuAg5ATb6jFqi8Lh0uO8BMJC5gQsr5a1sip87UxVR_xJDupuN46IcUAopWH1_8mnK8EQdXkaCpPuyiB-TdACRtdixUVhVHomP-XFCKVZ9mUghRyvM8HFYHxUOfASDv9V0pQEMM7l0ph38mKlmS0WhOVnniqsMeki2T",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuC-4TDeOSY5JTcb6KGHmCJizZC6yXcHTGi56SJHzsdfsCGtwkxqZD65wmbMkhSAED71bF8-06l8UCNpPm-gUY7-8UAx9qOk7fsoGYu0OpnSjqzo2nr9EN6AV5iw1kPZxSHrTQJqWptmGpFNO2brr0pM7Jxzh-afc9rDr8k3sRAJntqRerZx3SIbcbpFx1R9ZM7Ni44gOX86ZSYoIuQKgHVl0Ev9LIb741sv6jpDmDq5q4Q4rAohouGA",
];

const RATINGS = [4.9, 4.8, 4.9, 4.7, 4.8, 4.6, 4.8, 4.9, 4.7];

function toDurationCategory(duration: string): string {
  const weeks = parseInt(duration, 10);
  if (Number.isNaN(weeks)) return "12+ Weeks";
  if (weeks <= 4) return "1-4 Weeks";
  if (weeks <= 8) return "4-8 Weeks";
  if (weeks <= 12) return "8-12 Weeks";
  return "12+ Weeks";
}

function toPriceCategory(price: string): string {
  const amount = parseInt(price.replace(/[^\d]/g, ""), 10);
  if (Number.isNaN(amount)) return "₹5,000+";
  if (amount === 0) return "Free";
  if (amount <= 999) return "₹0 - ₹999";
  if (amount <= 4999) return "₹1,000 - ₹4,999";
  return "₹5,000+";
}

const ALL_COURSES: StitchCourse[] = COURSES_DATA.map((c, i) => ({
  ...c,
  rating: RATINGS[i % RATINGS.length],
  location: "Online",
  durationCategory: toDurationCategory(c.duration),
  priceCategory: toPriceCategory(c.price),
  badge: c.badge || c.shortTag || c.category,
  image: COURSE_IMAGES[i % COURSE_IMAGES.length],
}));

const JOURNEY_STEPS = [
  {
    num: 1,
    title: 'Choose Your Path',
    desc: 'Browse and select the perfect course aligned with your career goals.',
    numBg: '#4338CA',
    iconBg: '#EEF2FF',
    lineColor: '#4338CA',
    iconColor: '#4338CA',
  },
  {
    num: 2,
    title: 'Learn & Practice',
    desc: 'Study with expert-led videos, hands-on exercises, and real projects.',
    numBg: '#4338CA',
    iconBg: '#ECFDF5',
    lineColor: '#10B981',
    iconColor: '#10B981',
  },
  {
    num: 3,
    title: 'Get Certified',
    desc: 'Complete assessments and earn a recognized certificate of achievement.',
    numBg: '#4338CA',
    iconBg: '#FFF7ED',
    lineColor: '#F97316',
    iconColor: '#F97316',
  },
  {
    num: 4,
    title: 'Launch Career',
    desc: 'Apply your new skills and unlock exciting career opportunities.',
    numBg: '#4338CA',
    iconBg: '#EFF6FF',
    lineColor: '#3B82F6',
    iconColor: '#3B82F6',
  },
];

const LEARNING_PATHS = [
  {
    title: 'Full Stack Development',
    desc: 'Master both frontend and backend technologies to build complete web applications from scratch.',
    badge: '★ BEST SELLER',
    theme: '#7C3AED',
    iconBg: '#F3E8FF',
    courses: 12,
    months: 6,
    techs: ['React', 'Node.js', 'MongoDB', 'TypeScript'],
  },
  {
    title: 'AI & Data Science',
    desc: 'Learn machine learning, data analysis, and AI to solve complex real-world problems.',
    badge: '📈 TRENDING',
    theme: '#10B981',
    iconBg: '#D1FAE5',
    courses: 10,
    months: 8,
    techs: ['Python', 'TensorFlow', 'Pandas', 'SQL'],
  },
  {
    title: 'Digital Marketing',
    desc: 'Build expertise in SEO, social media, and content marketing to grow brands online.',
    badge: '🔥 POPULAR',
    theme: '#F97316',
    iconBg: '#FFEDD5',
    courses: 8,
    months: 4,
    techs: ['SEO', 'Analytics', 'Ads', 'Content'],
  },
  {
    title: 'UI/UX Design',
    desc: 'Create beautiful, user-centered designs using modern tools and design thinking principles.',
    badge: '📊 IN DEMAND',
    theme: '#3B82F6',
    iconBg: '#DBEAFE',
    courses: 9,
    months: 5,
    techs: ['Figma', 'Prototype', 'Wireframe', 'Research'],
  },
];

function PathIcon({ theme }: { theme: string }) {
  const icons: Record<string, React.ReactNode> = {
    '#7C3AED': <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
    '#10B981': <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a8 8 0 0 0-8 8c0 6 8 12 8 12s8-6 8-12a8 8 0 0 0-8-8z"/><circle cx="12" cy="10" r="3"/></svg>,
    '#F97316': <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>,
    '#3B82F6': <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4Z"/></svg>,
  };
  return <>{icons[theme] || icons['#7C3AED']}</>;
}

function JourneyStepIcon({ color, size = 36 }: { color: string; size?: number }) {
  const s = size;
  const sw = 1.8;
  const icons: Record<string, React.ReactNode> = {
    '#4338CA': <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#4338CA" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>,
    '#10B981': <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.1 2.7 3 6 3s6-1.9 6-3v-5"/></svg>,
    '#F97316': <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>,
    '#3B82F6': <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>,
  };
  return <>{icons[color] || icons['#4338CA']}</>;
}

function StepCard({ step, compact }: { step: typeof JOURNEY_STEPS[0]; compact?: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Step number badge */}
      <div style={{
        width: compact ? 42 : 52,
        height: compact ? 42 : 52,
        borderRadius: '50%',
        border: '2px dashed #D1D5DB',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: -16, position: 'relative', zIndex: 3,
      }}>
        <div style={{
          width: compact ? 30 : 38, height: compact ? 30 : 38,
          borderRadius: '50%', backgroundColor: step.numBg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ color: '#FFFFFF', fontWeight: 700, fontSize: compact ? 13 : 16 }}>{step.num}</span>
        </div>
      </div>
      {/* Card */}
      <div style={{
        backgroundColor: '#FFFFFF', borderRadius: compact ? 14 : 20,
        boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
        padding: compact ? '28px 12px 16px' : '36px 20px 24px',
        width: '100%', textAlign: 'center',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}>
        <div style={{
          width: compact ? 52 : 72, height: compact ? 52 : 72,
          borderRadius: '50%', backgroundColor: step.iconBg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: compact ? 10 : 16,
        }}>
          <JourneyStepIcon color={step.iconColor} size={compact ? 28 : 36} />
        </div>
        <h4 style={{ fontSize: compact ? 14 : 18, fontWeight: 700, color: '#111827', margin: '0 0 6px 0', lineHeight: 1.3 }}>{step.title}</h4>
        {!compact && <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.5, margin: 0 }}>{step.desc}</p>}
        <div style={{ width: compact ? 24 : 30, height: 3, borderRadius: 2, backgroundColor: step.lineColor, marginTop: compact ? 10 : 16 }} />
      </div>
    </div>
  );
}

export default function CoursesPage() {
  // Filters State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);

  // Accordion & Interactivity State
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [certId, setCertId] = useState("");
  const [certStatus, setCertStatus] = useState<string | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Toggle helpers
  const handleToggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const handleToggleLevel = (level: string) => {
    setSelectedLevels(prev =>
      prev.includes(level) ? prev.filter(l => l !== level) : [...prev, level]
    );
  };

  const handleToggleDuration = (duration: string) => {
    setSelectedDurations(prev =>
      prev.includes(duration) ? prev.filter(d => d !== duration) : [...prev, duration]
    );
  };

  const handleTogglePrice = (price: string) => {
    setSelectedPrices(prev =>
      prev.includes(price) ? prev.filter(p => p !== price) : [...prev, price]
    );
  };

  const handleToggleRating = (rating: number) => {
    setSelectedRatings(prev =>
      prev.includes(rating) ? prev.filter(r => r !== rating) : [...prev, rating]
    );
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setSelectedLevels([]);
    setSelectedDurations([]);
    setSelectedPrices([]);
    setSelectedRatings([]);
  };

  // Filter Logic
  const filteredCourses = useMemo(() => {
    return ALL_COURSES.filter(course => {
      // Search term
      const query = searchQuery.toLowerCase().trim();
      if (query) {
        const matchesSearch =
          course.title.toLowerCase().includes(query) ||
          course.category.toLowerCase().includes(query) ||
          course.badge.toLowerCase().includes(query) ||
          course.description.toLowerCase().includes(query) ||
          course.techStack.some(t => t.name.toLowerCase().includes(query));
        if (!matchesSearch) return false;
      }

      // Categories
      if (
        selectedCategories.length > 0 &&
        !selectedCategories.some((cat) =>
          course.category.toLowerCase().includes(cat.toLowerCase())
        )
      ) {
        return false;
      }

      // Levels
      if (
        selectedLevels.length > 0 &&
        !selectedLevels.some((lvl) =>
          course.level.toLowerCase().includes(lvl.toLowerCase())
        )
      ) {
        return false;
      }

      // Durations
      if (selectedDurations.length > 0 && !selectedDurations.includes(course.durationCategory)) {
        return false;
      }

      // Prices
      if (selectedPrices.length > 0 && !selectedPrices.includes(course.priceCategory)) {
        return false;
      }

      // Ratings
      if (selectedRatings.length > 0) {
        const minRating = Math.min(...selectedRatings);
        if (course.rating < minRating) return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategories, selectedLevels, selectedDurations, selectedPrices, selectedRatings]);

  const featuredCourses = ALL_COURSES.slice(0, 4);

  // Certificate Verification
  const handleVerifyCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certId.trim()) return;
    const cleanId = certId.trim().toUpperCase();
    if (cleanId === "LARA-9842-PRO") {
      setCertStatus("Verified: Certificate LARA-9842-PRO is authentic and belongs to Dr. Eleanor Vance.");
    } else {
      setCertStatus(`No certificate found for ID: "${cleanId}". Please try again.`);
    }
  };

  // Newsletter Submit
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSubscribed(true);
  };

  return (
    <div className="courses-page-wrapper bg-[#f8f9ff] text-[#1f2937] antialiased min-h-screen">
      {/* Dynamic Font & Icons */}
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />

      {/* Styled Configuration Overrides */}
      <style>{`
        :root {
          --primary: #3525cd;
          --primary-hover: #2d1eac;
          --background-custom: #f8f9ff;
          --surface: #ffffff;
          --surface-variant: #f0f2f9;
          --text-main: #1f2937;
          --text-muted: #6b7280;
          --border-custom: #e5e7eb;
        }

        .courses-page-wrapper {
          background-color: var(--background-custom) !important;
          color: var(--text-main) !important;
          font-family: 'Inter', sans-serif !important;
        }
        .courses-page-wrapper * {
          font-family: 'Inter', sans-serif;
        }

        .bg-background-custom { background-color: var(--background-custom) !important; }
        .text-text-main { color: var(--text-main) !important; }
        .bg-surface { background-color: var(--surface) !important; }
        .bg-surface-variant { background-color: var(--surface-variant) !important; }
        .text-text-muted { color: var(--text-muted) !important; }
        .border-border-custom { border-color: var(--border-custom) !important; }
        .bg-primary-custom { background-color: var(--primary) !important; }
        .hover\\:bg-primary-hover-custom:hover { background-color: var(--primary-hover) !important; }
        .text-primary-custom { color: var(--primary) !important; }
        .border-primary-custom { border-color: var(--primary) !important; }
        .hover\\:bg-primary-custom:hover { background-color: var(--primary) !important; }

        .material-icons {
          font-family: 'Material Icons' !important;
          font-size: 24px;
          vertical-align: middle;
        }
        .hero-gradient {
          background: radial-gradient(circle at top, rgba(235, 237, 255, 0.8) 0%, rgba(248, 249, 255, 1) 100%) !important;
        }
        .text-primary {
          color: var(--primary) !important;
        }
        .bg-primary {
          background-color: var(--primary) !important;
        }
        .border-primary {
          border-color: var(--primary) !important;
        }
      `}</style>

      {/* BEGIN: Navigation */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm" data-purpose="main-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <a className="text-primary font-bold text-xl flex items-center gap-2" href="#">
                <span className="material-icons">school</span>
                EduPremium
              </a>
            </div>
            <div className="hidden md:flex space-x-8">
              <a className="text-text-main font-medium hover:text-primary" href="#">Courses</a>
              <a className="text-text-muted hover:text-primary" href="#">Mentors</a>
              <a className="text-text-muted hover:text-primary" href="#">Success Stories</a>
              <a className="text-text-muted hover:text-primary" href="#">Pricing</a>
              <a className="text-text-muted hover:text-primary" href="#">About Us</a>
            </div>
            <div className="flex items-center space-x-4">
              <a className="text-text-muted hover:text-primary font-medium" href="#">Log In</a>
              <a className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-hover-custom transition-colors" href="#">Sign Up Free</a>
            </div>
          </div>
        </div>
      </nav>
      {/* END: Navigation */}

      {/* BEGIN: Hero Section */}
      <section className="hero-gradient pt-20 pb-16 text-center" data-purpose="hero">
        <div className="max-w-4xl mx-auto px-4">
          <span className="text-primary font-semibold text-sm tracking-wider uppercase mb-4 block">Master New Skills</span>
          <h1 className="text-5xl font-bold text-text-main mb-6 leading-tight">Explore Our Professional Courses</h1>
          <p className="text-text-muted text-lg mb-8 max-w-2xl mx-auto">Boost your career with expert-led courses designed for today's dynamic job market. Join thousands of successful learners.</p>
          
          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative mb-8">
            <span className="material-icons absolute left-4 top-3.5 text-text-muted">search</span>
            <input
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-border-custom shadow-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none text-[#1f2937] bg-white"
              placeholder="What do you want to learn today?"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <button
              onClick={() => handleToggleCategory("Web Development")}
              className={`border border-border-custom px-4 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                selectedCategories.includes("Web Development") ? "bg-primary text-white" : "bg-white text-text-main hover:bg-surface-variant"
              }`}
            >
              <span className="material-icons text-[18px]">code</span>
              Web Development
            </button>
            <button
              onClick={() => handleToggleCategory("Data Science")}
              className={`border border-border-custom px-4 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                selectedCategories.includes("Data Science") ? "bg-primary text-white" : "bg-white text-text-main hover:bg-surface-variant"
              }`}
            >
              <span className="material-icons text-[18px]">brush</span>
              Data Science
            </button>
            <button
              onClick={() => handleToggleCategory("Design")}
              className={`border border-border-custom px-4 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                selectedCategories.includes("Design") ? "bg-primary text-white" : "bg-white text-text-main hover:bg-surface-variant"
              }`}
            >
              <span className="material-icons text-[18px]">analytics</span>
              UI/UX Design
            </button>
            <button
              onClick={() => handleToggleCategory("Marketing")}
              className={`border border-border-custom px-4 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                selectedCategories.includes("Marketing") ? "bg-primary text-white" : "bg-white text-text-main hover:bg-surface-variant"
              }`}
            >
              <span className="material-icons text-[18px]">campaign</span>
              Marketing
            </button>
          </div>
        </div>
      </section>
      {/* END: Hero Section */}

      {/* BEGIN: Stats Banner */}
      <section className="max-w-5xl mx-auto px-4 -mt-10 relative z-10" data-purpose="stats">
        <div className="bg-white rounded-2xl shadow-lg border border-border-custom grid grid-cols-2 md:grid-cols-4 gap-8 text-center p-6">
          <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-4 w-full">
            {/* Stat 1 */}
            <div className="flex items-center gap-4 flex-1 justify-center md:justify-start">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 shrink-0">
                <span className="material-icons">school</span>
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold text-text-main">50K+</h3>
                <p className="text-text-muted text-xs font-medium">Happy Students</p>
              </div>
            </div>
            <div className="hidden md:block w-px h-12 bg-border-custom"></div>
            {/* Stat 2 */}
            <div className="flex items-center gap-4 flex-1 justify-center md:justify-start">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 shrink-0">
                <span className="material-icons">menu_book</span>
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold text-text-main">500+</h3>
                <p className="text-text-muted text-xs font-medium">Courses</p>
              </div>
            </div>
            <div className="hidden md:block w-px h-12 bg-border-custom"></div>
            {/* Stat 3 */}
            <div className="flex items-center gap-4 flex-1 justify-center md:justify-start">
              <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center text-violet-600 shrink-0">
                <span className="material-icons">emoji_events</span>
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold text-text-main">95%</h3>
                <p className="text-text-muted text-xs font-medium">Satisfaction Rate</p>
              </div>
            </div>
            <div className="hidden md:block w-px h-12 bg-border-custom"></div>
            {/* Stat 4 */}
            <div className="flex items-center gap-4 flex-1 justify-center md:justify-start">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 shrink-0">
                <span className="material-icons">stars</span>
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold text-text-main">4.8/5</h3>
                <p className="text-text-muted text-xs font-medium">Average Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* END: Stats Banner */}

      {/* BEGIN: Featured Courses */}
      <section className="py-16 sm:py-20" style={{ backgroundColor: "#F8F9FE" }} data-purpose="featured-courses">
        <div className="max-w-[1280px] mx-auto px-6">
          {/* Section Header — Centered */}
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-5" style={{ backgroundColor: "#EDE9FE", color: "#6D28D9" }}>
              🔥 TOP PICKS
            </span>
            <h2 className="text-3xl sm:text-[3rem] font-extrabold mb-4" style={{ color: "#1E1B4B", letterSpacing: "-0.02em" }}>Featured Courses</h2>
            <p className="text-base sm:text-lg max-w-[650px] mx-auto leading-relaxed" style={{ color: "#64748B" }}>
              Hand-picked courses from industry leaders to accelerate your career growth.
            </p>
            <div className="flex justify-center mt-6">
              <div className="w-[60px] h-1 rounded-full" style={{ backgroundColor: "#4F46E5" }} />
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 sm:mb-12">
            {[
              { label: "All Courses", active: true },
              { label: "Development", active: false },
              { label: "Design", active: false },
              { label: "Marketing", active: false },
              { label: "AI & Data", active: false },
              { label: "Business", active: false },
            ].map((chip) => (
              <button
                key={chip.label}
                className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-[10px] text-sm font-semibold transition-all duration-200"
                style={{
                  backgroundColor: chip.active ? "#4F46E5" : "#FFFFFF",
                  color: chip.active ? "#FFFFFF" : "#4F46E5",
                  border: chip.active ? "none" : "1px solid #E2E8F0",
                  boxShadow: chip.active ? "0 2px 8px rgba(79,70,229,0.3)" : "none",
                }}
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Course Grid — 4 / 2 / 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCourses.map((course, idx) => {
              const badgeText = idx === 0 ? "BEST SELLER" : idx === 2 ? "TRENDING" : (course.badge || "BEST SELLER").toUpperCase();
              const accentColors = [
                { border: "#4F46E5", tagBg: "#EEF2FF", tagText: "#4F46E5" },
                { border: "#10B981", tagBg: "#ECFDF5", tagText: "#059669" },
                { border: "#3B82F6", tagBg: "#EFF6FF", tagText: "#2563EB" },
                { border: "#F97316", tagBg: "#FFF7ED", tagText: "#EA580C" },
              ];
              const accent = accentColors[idx % accentColors.length];
              return (
                <a
                  key={course.slug}
                  href={`/courses/${course.slug}`}
                  className="group flex flex-col rounded-2xl overflow-hidden bg-white transition-all duration-200 hover:-translate-y-1"
                  style={{
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
                    borderBottom: `3px solid ${accent.border}`,
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 25px -5px rgba(79, 70, 229, 0.15)`; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.05)"; }}
                >
                  {/* Image Area */}
                  <div className="relative h-[200px] overflow-hidden">
                    <img
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                      src={course.image}
                    />
                    {/* Gradient overlay at bottom */}
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.35), transparent 60%)" }} />
                    
                    {/* Status Badge — top-left */}
                    <span
                      className="absolute top-3 left-3 text-[11px] font-bold uppercase px-3 py-1.5 rounded-md shadow-sm z-10"
                      style={{
                        backgroundColor: badgeText === "BEST SELLER" ? "#F97316" : badgeText === "TRENDING" ? "#10B981" : "#4F46E5",
                        color: "#fff",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {badgeText}
                    </span>

                    {/* Duration badge — bottom-right */}
                    <span className="absolute bottom-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-md z-10" style={{ backgroundColor: "rgba(0,0,0,0.7)", color: "#fff" }}>
                      {course.duration}
                    </span>

                    {/* Bookmark — top-right */}
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-lg flex items-center justify-center z-10" style={{ backgroundColor: "rgba(255,255,255,0.9)", backdropFilter: "blur(4px)" }}>
                      <svg className="w-4 h-4" style={{ color: "#475569" }} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" /></svg>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="flex flex-col flex-grow" style={{ padding: "28px 20px 24px" }}>
                    {/* Rating + Price Row */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1.5">
                        <svg className="w-4 h-4" style={{ color: "#FBBF24", fill: "#FBBF24" }} viewBox="0 0 24 24" strokeWidth="0"><path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>
                        <span className="text-sm font-bold" style={{ color: "#1E293B" }}>{course.rating}</span>
                        <span className="text-[13px] font-medium" style={{ color: "#64748B" }}>(2.4K)</span>
                      </div>
                      <span className="text-xl font-extrabold" style={{ color: "#4F46E5" }}>{course.price}</span>
                    </div>

                    {/* Course Title */}
                    <h4 className="font-bold text-[17px] leading-snug line-clamp-2 mb-2" style={{ color: "#0F172A", minHeight: "2.6rem" }}>
                      {course.title}
                    </h4>

                    {/* Description */}
                    <p className="text-sm leading-relaxed line-clamp-2 mb-4" style={{ color: "#64748B" }}>
                      {course.description}
                    </p>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {course.techStack.slice(0, 2).map((t) => (
                        <span
                          key={t.name}
                          className="text-xs font-semibold px-2.5 py-1 rounded-md"
                          style={{ backgroundColor: accent.tagBg, color: accent.tagText }}
                        >
                          {t.name}
                        </span>
                      ))}
                    </div>

                    {/* Enroll Button */}
                    <div className="mt-auto">
                      <span
                        className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-[10px] text-sm font-semibold transition-all duration-200"
                        style={{
                          border: `1.5px solid ${accent.border}`,
                          color: accent.border,
                          height: "44px",
                        }}
                      >
                        Enroll Now
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                      </span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>
      {/* END: Featured Courses */}

      {/* BEGIN: Browse By Category */}
      <section className="py-10 sm:py-14 bg-white relative overflow-hidden" data-purpose="categories">
        {/* Decorative dot patterns */}
        <div className="absolute top-1/2 left-8 -translate-y-1/2 hidden lg:grid grid-cols-4 gap-3 opacity-30 pointer-events-none">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="w-1 h-1 rounded-full" style={{ backgroundColor: "#C7D2FE" }} />
          ))}
        </div>
        <div className="absolute top-1/2 right-8 -translate-y-1/2 hidden lg:grid grid-cols-4 gap-3 opacity-30 pointer-events-none">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="w-1 h-1 rounded-full" style={{ backgroundColor: "#C7D2FE" }} />
          ))}
        </div>

        <div className="relative max-w-[1280px] mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-9">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider mb-3" style={{ backgroundColor: "#EEF2FF", color: "#6366F1", border: "1px solid #E0E7FF" }}>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" /></svg>
              EXPLORE COURSES
            </span>
            <h2 className="text-[1.6rem] sm:text-[2rem] lg:text-[2.25rem] font-extrabold mb-2" style={{ letterSpacing: "-0.02em" }}>
              Browse by <span style={{ color: "#7C3AED" }}>Category</span>
            </h2>
            <div className="flex justify-center mb-3">
              <div className="w-[50px] h-1 rounded-full" style={{ backgroundColor: "#6D28D9" }} />
            </div>
            <p className="text-sm sm:text-[15px] max-w-[500px] mx-auto leading-relaxed" style={{ color: "#6B7280" }}>
              Explore courses by your interested categories and find the perfect course to start learning
            </p>
          </div>

          {/* Category Cards Grid — 4 / 2 / 1 */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              {
                name: "Web Development",
                count: "120+ Courses",
                desc: "Build modern websites and web applications with latest frameworks and technologies.",
                iconBg: "#EDE9FE", iconColor: "#7C3AED", countColor: "#6D28D9",
                arrowBg: "#F3E8FF",
                icon: <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>,
              },
              {
                name: "Design",
                count: "85+ Courses",
                desc: "Master UI/UX design, Figma, and creative tools to build stunning user experiences.",
                iconBg: "#ECFDF5", iconColor: "#059669", countColor: "#047857",
                arrowBg: "#D1FAE5",
                icon: <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" /></svg>,
              },
              {
                name: "Marketing",
                count: "90+ Courses",
                desc: "Learn digital marketing, SEO, social media, and growth strategies for businesses.",
                iconBg: "#FFF7ED", iconColor: "#EA580C", countColor: "#C2410C",
                arrowBg: "#FED7AA",
                icon: <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" /></svg>,
              },
              {
                name: "AI & Data",
                count: "110+ Courses",
                desc: "Dive into artificial intelligence, machine learning, and data science fundamentals.",
                iconBg: "#EFF6FF", iconColor: "#2563EB", countColor: "#1D4ED8",
                arrowBg: "#BFDBFE",
                icon: <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" /></svg>,
              },
              {
                name: "Business",
                count: "150+ Courses",
                desc: "Develop business acumen, entrepreneurship, and leadership skills for growth.",
                iconBg: "#FDF2F8", iconColor: "#DB2777", countColor: "#BE185D",
                arrowBg: "#FBCFE8",
                icon: <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>,
              },
              {
                name: "Mobile Dev",
                count: "65+ Courses",
                desc: "Build cross-platform mobile apps with Flutter, React Native, and Swift.",
                iconBg: "#F5F3FF", iconColor: "#6366F1", countColor: "#4F46E5",
                arrowBg: "#E0E7FF",
                icon: <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /></svg>,
              },
              {
                name: "Cloud & DevOps",
                count: "80+ Courses",
                desc: "Master AWS, Docker, Kubernetes, and CI/CD pipelines for cloud infrastructure.",
                iconBg: "#F0FDFA", iconColor: "#0891B2", countColor: "#0E7490",
                arrowBg: "#A5F3FC",
                icon: <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" /></svg>,
              },
              {
                name: "Photography",
                count: "45+ Courses",
                desc: "Learn photography, videography, and photo editing with professional tools.",
                iconBg: "#FAF5FF", iconColor: "#A855F7", countColor: "#9333EA",
                arrowBg: "#E9D5FF",
                icon: <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" /><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" /></svg>,
              },
            ].map((cat) => (
              <a
                key={cat.name}
                href="#"
                className="group relative flex flex-col p-4 sm:p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                  minHeight: "170px",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "#C7D2FE";
                  el.style.boxShadow = "0 10px 25px -5px rgba(109,40,217,0.15)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "#E5E7EB";
                  el.style.boxShadow = "0 1px 3px rgba(0,0,0,0.05)";
                }}
              >
                {/* Icon */}
                <div
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-2.5"
                  style={{ backgroundColor: cat.iconBg, color: cat.iconColor }}
                >
                  {cat.icon}
                </div>

                {/* Title */}
                <h4 className="text-[13px] sm:text-[15px] font-bold mb-0.5" style={{ color: "#111827" }}>{cat.name}</h4>

                {/* Course Count */}
                <span className="text-[11px] sm:text-xs font-semibold mb-2" style={{ color: cat.countColor }}>{cat.count}</span>

                {/* Description */}
                <p className="text-[11px] sm:text-xs leading-relaxed line-clamp-2 mb-2 flex-grow" style={{ color: "#6B7280" }}>{cat.desc}</p>

                {/* Arrow Button */}
                <div className="mt-auto flex justify-end">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 group-hover:scale-110"
                    style={{ backgroundColor: cat.arrowBg, color: cat.countColor }}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* View All Categories Button */}
          <div className="flex justify-center mt-8 sm:mt-10">
            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
              style={{
                color: "#6D28D9",
                backgroundColor: "#FFFFFF",
                border: "1.5px solid #DDD6FE",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "#6D28D9";
                el.style.backgroundColor = "#F5F3FF";
                el.style.boxShadow = "0 4px 12px rgba(109,40,217,0.15)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "#DDD6FE";
                el.style.backgroundColor = "#FFFFFF";
                el.style.boxShadow = "none";
              }}
            >
              View All Categories
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </a>
          </div>
        </div>
      </section>
      {/* END: Browse By Category */}

      {/* BEGIN: All Courses (Sidebar + Grid) */}
      <section className="py-24 bg-white" data-purpose="all-courses">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-text-main mb-8">All Courses</h2>
          <div className="flex flex-col md:flex-row gap-8">
            
            {/* Sidebar */}
            <aside className="w-full md:w-1/4 flex flex-col gap-6">
              <div className="bg-white p-6 rounded-xl border border-border-custom shadow-sm flex flex-col gap-6">
                
                {/* Header */}
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-text-main">Filters</h3>
                  <button onClick={handleResetFilters} className="text-primary text-sm font-medium flex items-center gap-1 hover:underline">
                    <span className="material-icons text-sm">refresh</span>
                    Reset All
                  </button>
                </div>

                {/* Search Bar */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search Courses..."
                    className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-border-custom focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm text-[#1f2937] bg-white"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <span className="material-icons absolute right-3 top-1/2 -translate-y-1/2 text-text-muted">search</span>
                </div>

                {/* Categories */}
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center cursor-pointer">
                    <h4 className="font-bold text-text-main">Categories</h4>
                    <span className="material-icons text-text-muted">expand_less</span>
                  </div>
                  <div className="flex flex-col gap-3">
                    {[
                      { name: "Web Development", count: 120 },
                      { name: "Data Science", count: 86 },
                      { name: "Design", count: 64 },
                      { name: "Business", count: 45 },
                      { name: "Marketing", count: 32 }
                    ].map((cat) => {
                      const isChecked = selectedCategories.includes(cat.name);
                      return (
                        <label key={cat.name} className="flex items-center justify-between cursor-pointer group">
                          <div className="flex items-center gap-3" onClick={() => handleToggleCategory(cat.name)}>
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                              isChecked ? "border-primary bg-primary" : "border-border-custom bg-white"
                            }`}>
                              {isChecked && <span className="material-icons text-white text-xs">check</span>}
                            </div>
                            <span className="text-sm text-text-main">{cat.name}</span>
                          </div>
                          <span className="text-xs text-text-muted">({cat.count})</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className="h-px bg-border-custom"></div>

                {/* Level */}
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center cursor-pointer">
                    <h4 className="font-bold text-text-main">Level</h4>
                    <span className="material-icons text-text-muted">expand_less</span>
                  </div>
                  <div className="flex flex-col gap-3">
                    {[
                      { name: "Beginner", count: 120 },
                      { name: "Intermediate", count: 96 },
                      { name: "Advanced", count: 32 }
                    ].map((lvl) => {
                      const isChecked = selectedLevels.includes(lvl.name);
                      return (
                        <label key={lvl.name} className="flex items-center justify-between cursor-pointer group">
                          <div className="flex items-center gap-3" onClick={() => handleToggleLevel(lvl.name)}>
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                              isChecked ? "border-primary bg-primary" : "border-border-custom bg-white"
                            }`}>
                              {isChecked && <span className="material-icons text-white text-xs">check</span>}
                            </div>
                            <span className="text-sm text-text-main">{lvl.name}</span>
                          </div>
                          <span className="text-xs text-text-muted">({lvl.count})</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className="h-px bg-border-custom"></div>

                {/* Duration */}
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center cursor-pointer">
                    <h4 className="font-bold text-text-main">Duration</h4>
                    <span className="material-icons text-text-muted">expand_less</span>
                  </div>
                  <div className="flex flex-col gap-3">
                    {[
                      { label: "1-4 Weeks", count: 38 },
                      { label: "4-8 Weeks", count: 76 },
                      { label: "8-12 Weeks", count: 64 },
                      { label: "12+ Weeks", count: 70 }
                    ].map((dur) => {
                      const isChecked = selectedDurations.includes(dur.label);
                      return (
                        <label key={dur.label} className="flex items-center justify-between cursor-pointer group">
                          <div className="flex items-center gap-3" onClick={() => handleToggleDuration(dur.label)}>
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                              isChecked ? "border-primary bg-primary" : "border-border-custom bg-white"
                            }`}>
                              {isChecked && <span className="material-icons text-white text-xs">check</span>}
                            </div>
                            <span className="text-sm text-text-main">{dur.label}</span>
                          </div>
                          <span className="text-xs text-text-muted">({dur.count})</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className="h-px bg-border-custom"></div>

                {/* Price */}
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center cursor-pointer">
                    <h4 className="font-bold text-text-main">Price</h4>
                    <span className="material-icons text-text-muted">expand_less</span>
                  </div>
                  <div className="flex flex-col gap-3">
                    {[
                      { label: "Free", count: 32 },
                      { label: "₹0 - ₹999", count: 64 },
                      { label: "₹1,000 - ₹4,999", count: 96 },
                      { label: "₹5,000+", count: 56 }
                    ].map((prc) => {
                      const isChecked = selectedPrices.includes(prc.label);
                      return (
                        <label key={prc.label} className="flex items-center justify-between cursor-pointer group">
                          <div className="flex items-center gap-3" onClick={() => handleTogglePrice(prc.label)}>
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                              isChecked ? "border-primary bg-primary" : "border-border-custom bg-white"
                            }`}>
                              {isChecked && <span className="material-icons text-white text-xs">check</span>}
                            </div>
                            <span className="text-sm text-text-main">{prc.label}</span>
                          </div>
                          <span className="text-xs text-text-muted">({prc.count})</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className="h-px bg-border-custom"></div>

                {/* Rating */}
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center cursor-pointer">
                    <h4 className="font-bold text-text-main">Rating</h4>
                    <span className="material-icons text-text-muted">expand_less</span>
                  </div>
                  <div className="flex flex-col gap-3">
                    {[5, 4, 3, 2].map((rating) => {
                      const isChecked = selectedRatings.includes(rating);
                      return (
                        <label key={rating} className="flex items-center justify-between cursor-pointer group">
                          <div className="flex items-center gap-3" onClick={() => handleToggleRating(rating)}>
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                              isChecked ? "border-primary bg-primary" : "border-border-custom bg-white"
                            }`}>
                              {isChecked && <span className="material-icons text-white text-xs">check</span>}
                            </div>
                            <div className="flex text-yellow-500">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className={`material-icons text-sm ${i < rating ? "text-yellow-500" : "text-gray-200"}`}>star</span>
                              ))}
                            </div>
                          </div>
                          <span className="text-xs text-text-muted">
                            {rating === 5 ? "(120)" : rating === 4 ? "& above (180)" : rating === 3 ? "& above (220)" : "& above (240)"}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Reset Button */}
                <button onClick={handleResetFilters} className="w-full mt-4 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-hover-custom transition-colors flex items-center justify-center gap-2 shadow-md">
                  <span className="material-icons">refresh</span>
                  Reset Filters
                </button>
              </div>
            </aside>

            {/* Grid */}
            <div className="w-full md:w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course, idx) => {
                  const accentColors = [
                    { border: "#4F46E5", tagBg: "#EEF2FF", tagText: "#4F46E5" },
                    { border: "#10B981", tagBg: "#ECFDF5", tagText: "#059669" },
                    { border: "#3B82F6", tagBg: "#EFF6FF", tagText: "#2563EB" },
                    { border: "#F97316", tagBg: "#FFF7ED", tagText: "#EA580C" },
                  ];
                  const accent = accentColors[idx % accentColors.length];
                  const badgeText = (course.badge || "BEST SELLER").toUpperCase();
                  return (
                    <a
                      key={course.slug}
                      href={`/courses/${course.slug}`}
                      className="group flex flex-col rounded-2xl overflow-hidden bg-white transition-all duration-200 hover:-translate-y-1"
                      style={{
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
                        borderBottom: `3px solid ${accent.border}`,
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 25px -5px rgba(79, 70, 229, 0.15)`; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.05)"; }}
                    >
                      {/* Image Area */}
                      <div className="relative h-[200px] overflow-hidden">
                        <img
                          alt={course.title}
                          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                          src={course.image}
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.35), transparent 60%)" }} />

                        {/* Status Badge — top-left */}
                        <span
                          className="absolute top-3 left-3 text-[11px] font-bold uppercase px-3 py-1.5 rounded-md shadow-sm z-10"
                          style={{
                            backgroundColor: badgeText === "BEST SELLER" ? "#F97316" : badgeText === "TRENDING" ? "#10B981" : "#4F46E5",
                            color: "#fff",
                            letterSpacing: "0.5px",
                          }}
                        >
                          {badgeText}
                        </span>

                        {/* Duration badge — bottom-right */}
                        <span className="absolute bottom-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-md z-10" style={{ backgroundColor: "rgba(0,0,0,0.7)", color: "#fff" }}>
                          {course.duration}
                        </span>

                        {/* Bookmark — top-right */}
                        <div className="absolute top-3 right-3 w-8 h-8 rounded-lg flex items-center justify-center z-10" style={{ backgroundColor: "rgba(255,255,255,0.9)", backdropFilter: "blur(4px)" }}>
                          <svg className="w-4 h-4" style={{ color: "#475569" }} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" /></svg>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="flex flex-col flex-grow" style={{ padding: "28px 20px 24px" }}>
                        {/* Rating + Price Row */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-1.5">
                            <svg className="w-4 h-4" style={{ color: "#FBBF24", fill: "#FBBF24" }} viewBox="0 0 24 24" strokeWidth="0"><path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>
                            <span className="text-sm font-bold" style={{ color: "#1E293B" }}>{course.rating}</span>
                            <span className="text-[13px] font-medium" style={{ color: "#64748B" }}>(2.4K)</span>
                          </div>
                          <span className="text-xl font-extrabold" style={{ color: "#4F46E5" }}>{course.price}</span>
                        </div>

                        {/* Course Title */}
                        <h4 className="font-bold text-[17px] leading-snug line-clamp-2 mb-2" style={{ color: "#0F172A", minHeight: "2.6rem" }}>
                          {course.title}
                        </h4>

                        {/* Description */}
                        <p className="text-sm leading-relaxed line-clamp-2 mb-4" style={{ color: "#64748B" }}>
                          {course.description}
                        </p>

                        {/* Tech Tags */}
                        <div className="flex flex-wrap gap-2 mb-5">
                          {course.techStack.slice(0, 2).map((t) => (
                            <span
                              key={t.name}
                              className="text-xs font-semibold px-2.5 py-1 rounded-md"
                              style={{ backgroundColor: accent.tagBg, color: accent.tagText }}
                            >
                              {t.name}
                            </span>
                          ))}
                        </div>

                        {/* Enroll Button */}
                        <div className="mt-auto">
                          <span
                            className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-[10px] text-sm font-semibold transition-all duration-200"
                            style={{
                              border: `1.5px solid ${accent.border}`,
                              color: accent.border,
                              height: "44px",
                            }}
                          >
                            Enroll Now
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                          </span>
                        </div>
                      </div>
                    </a>
                  );
                })
              ) : (
                <div className="col-span-full py-16 text-center text-text-muted">
                  <span className="material-icons text-5xl mb-4 text-gray-300">search_off</span>
                  <p className="text-lg font-medium">No courses found matching selected filters.</p>
                  <button onClick={handleResetFilters} className="mt-4 text-primary font-semibold hover:underline">Clear all filters</button>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>
      {/* END: All Courses */}

      {/* BEGIN: Your Learning Journey */}
      <section className="py-16 sm:py-20" style={{ backgroundColor: '#F8F7FF', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative dots top-left */}
        <div style={{ position: 'absolute', top: '20px', left: '20px', display: 'grid', gridTemplateColumns: 'repeat(4, 8px)', gap: '8px', opacity: 0.5 }}>
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#D4D0FF' }} />
          ))}
        </div>
        {/* Decorative arc top-right */}
        <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: 180, height: 180, borderRadius: '50%', border: '2px solid #EBEAFF', opacity: 0.6 }} />
        {/* Decorative blob bottom-left */}
        <div style={{ position: 'absolute', bottom: '-30px', left: '-30px', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(130,120,255,0.12) 0%, transparent 70%)' }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px', position: 'relative', zIndex: 1 }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            {/* STEP BY STEP badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, backgroundColor: '#FFFFFF', border: '1px solid #EEEFF5', borderRadius: 50, padding: '6px 16px', marginBottom: 16 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 16v-2.38C4 11.5 2.97 9.5 3 8c.03-1.5.49-3 2-4s3.5-1 4.5-.5S11 5 11.5 6c.5 1.5 1 3 2.5 3s2.5-1.5 3-3c.5-1 1.5-2.5 3-3s3 0 4 .5 2 2.5 2 4c-.03 1.5-1 3.5-1 5.62V16" />
                <path d="M20 20v-4" />
                <path d="M4 20v-4" />
              </svg>
              <span style={{ fontSize: 12, fontWeight: 600, color: '#4F46E5', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Step by Step</span>
            </div>

            {/* Title */}
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, lineHeight: 1.2, margin: 0 }}>
              <span style={{ color: '#111827' }}>Your </span>
              <span style={{ color: '#4F46E5', position: 'relative', display: 'inline-block' }}>
                Learning Journey
                <span style={{ position: 'absolute', bottom: -4, left: 0, width: '70%', height: 3, backgroundColor: '#4F46E5', borderRadius: 2 }} />
              </span>
            </h2>

            {/* Subtitle */}
            <p style={{ color: '#6B7280', fontSize: 'clamp(14px, 1.8vw, 17px)', lineHeight: 1.6, marginTop: 14, maxWidth: 520, marginLeft: 'auto', marginRight: 'auto' }}>
              Follow simple steps to build skills and advance your career with confidence.
            </p>
          </div>

          {/* Desktop: 4-column grid with dashed connectors */}
          <div className="hidden sm:grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, position: 'relative', alignItems: 'start' }}>
            <div style={{ position: 'absolute', top: 26, left: '12.5%', right: '12.5%', height: 0, borderTop: '2px dashed #D1D5DB', zIndex: 0 }} />
            {JOURNEY_STEPS.map((step, idx) => (
              <div key={step.num} style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {idx < 3 && (
                  <div style={{
                    position: 'absolute', top: 22, right: -28,
                    width: 32, height: 32, borderRadius: '50%',
                    backgroundColor: '#FFFFFF', boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2,
                  }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                    </svg>
                  </div>
                )}
                <StepCard step={step} />
              </div>
            ))}
          </div>

          {/* Mobile: 2-column grid */}
          <div className="grid grid-cols-2 gap-4 sm:hidden">
            {JOURNEY_STEPS.map((step) => (
              <StepCard key={step.num} step={step} compact />
            ))}
          </div>
        </div>
      </section>
      {/* END: Your Learning Journey */}

      {/* BEGIN: Popular Learning Paths */}
      <section style={{ backgroundColor: '#F8F9FC', padding: '64px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ display: 'inline-block', backgroundColor: '#EDE9FE', color: '#7C3AED', fontSize: 12, fontWeight: 700, padding: '6px 16px', borderRadius: 50, marginBottom: 16, letterSpacing: '0.5px' }}>
              🔥 POPULAR PATHS
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, lineHeight: 1.2, margin: 0 }}>
              <span style={{ color: '#111827' }}>Popular </span>
              <span style={{ color: '#7C3AED' }}>Learning Paths</span>
            </h2>
            <p style={{ color: '#6B7280', fontSize: 'clamp(14px, 1.6vw, 18px)', lineHeight: 1.6, marginTop: 14, maxWidth: 700, marginLeft: 'auto', marginRight: 'auto' }}>
              Structured learning paths designed by experts to help you master in-demand skills and build a successful career.
            </p>
            <div style={{ width: 60, height: 4, borderRadius: 2, backgroundColor: '#7C3AED', margin: '20px auto 0' }} />
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: 24 }}>
            {LEARNING_PATHS.map((path) => (
              <div key={path.title} style={{
                backgroundColor: '#FFFFFF', borderRadius: 20,
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                padding: 28, position: 'relative',
                transition: 'transform 0.3s, box-shadow 0.3s',
              }}>
                {/* Badge top-right */}
                <div style={{ position: 'absolute', top: 20, right: 20, fontSize: 11, fontWeight: 700, color: path.theme, textTransform: 'uppercase' as const }}>
                  {path.badge}
                </div>

                {/* Icon */}
                <div style={{
                  width: 60, height: 60, borderRadius: 16,
                  backgroundColor: path.iconBg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 20,
                }}>
                  <PathIcon theme={path.theme} />
                </div>

                {/* Title */}
                <h4 style={{ fontSize: 19, fontWeight: 700, color: '#111827', margin: '0 0 10px 0', lineHeight: 1.3 }}>{path.title}</h4>

                {/* Description */}
                <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.6, margin: 0 }}>{path.desc}</p>

                {/* Stats Row */}
                <div style={{ display: 'flex', gap: 20, marginTop: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: path.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={path.theme} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
                    </div>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: '#111827', lineHeight: 1 }}>{path.courses}</div>
                      <div style={{ fontSize: 12, color: '#6B7280' }}>Courses</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: path.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={path.theme} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                    </div>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: '#111827', lineHeight: 1 }}>{path.months}</div>
                      <div style={{ fontSize: 12, color: '#6B7280' }}>Months</div>
                    </div>
                  </div>
                </div>

                {/* Tech Tags */}
                <div style={{ display: 'flex', gap: 8, marginTop: 20, flexWrap: 'wrap' }}>
                  {path.techs.map((tech) => (
                    <span key={tech} style={{
                      fontSize: 11, fontWeight: 600, color: path.theme,
                      backgroundColor: path.iconBg,
                      padding: '4px 10px', borderRadius: 8,
                    }}>{tech}</span>
                  ))}
                </div>

                {/* Explore Button */}
                <button style={{
                  width: '100%', marginTop: 20, padding: '11px 0',
                  border: `2px solid ${path.theme}`, borderRadius: 12,
                  backgroundColor: 'transparent', color: path.theme,
                  fontSize: 14, fontWeight: 600, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                }}>
                  Explore Path
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={path.theme} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </button>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <button style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              backgroundColor: '#FFFFFF', border: '2px solid #C4B5FD',
              borderRadius: 50, padding: '13px 28px',
              color: '#7C3AED', fontSize: 15, fontWeight: 600, cursor: 'pointer',
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
              View All Learning Paths
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </section>
      {/* END: Popular Learning Paths */}

      {/* BEGIN: Skills You'll Master */}
      <section className="py-24 bg-surface-variant text-center" data-purpose="skills">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-text-main mb-8">Skills You'll Master</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { name: "Python", color: "bg-blue-100 text-blue-700 border-blue-200", icon: "terminal" },
              { name: "JavaScript", color: "bg-yellow-100 text-yellow-700 border-yellow-200", icon: "javascript" },
              { name: "React", color: "bg-cyan-100 text-cyan-700 border-cyan-200", icon: "layers" },
              { name: "UI/UX Design", color: "bg-purple-100 text-purple-700 border-purple-200", icon: "palette" },
              { name: "Data Analysis", color: "bg-indigo-100 text-indigo-700 border-indigo-200", icon: "insights" },
              { name: "SEO", color: "bg-green-100 text-green-700 border-green-200", icon: "search" },
              { name: "Machine Learning", color: "bg-pink-100 text-pink-700 border-pink-200", icon: "psychology" },
              { name: "Leadership", color: "bg-orange-100 text-orange-700 border-orange-200", icon: "groups" },
              { name: "Agile", color: "bg-teal-100 text-teal-700 border-teal-200", icon: "sync" },
              { name: "Cloud Computing", color: "bg-sky-100 text-sky-700 border-sky-200", icon: "cloud" },
              { name: "Cyber Security", color: "bg-red-100 text-red-700 border-red-200", icon: "security" },
              { name: "DevOps", color: "bg-slate-100 text-slate-700 border-slate-200", icon: "settings_input_component" },
              { name: "Blockchain", color: "bg-violet-100 text-violet-700 border-violet-200", icon: "currency_bitcoin" },
              { name: "Mobile Dev", color: "bg-emerald-100 text-emerald-700 border-emerald-200", icon: "smartphone" }
            ].map((skill) => (
              <span key={skill.name} className={`${skill.color} px-4 py-2 rounded-full border text-sm font-medium flex items-center gap-2 hover:brightness-95 cursor-pointer transition-all`}>
                <span className="material-icons text-[18px]">{skill.icon}</span>
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      </section>
      {/* END: Skills You'll Master */}

      {/* BEGIN: Why Learn With Us Grid */}
      <section className="py-24 bg-white relative overflow-hidden" data-purpose="features">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full -mr-48 -mt-48 blur-3xl opacity-50 -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 relative">
          
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-blue-50 text-primary mb-4 tracking-widest uppercase">
              ✨ Why Students Choose Us
            </span>
            <h2 className="text-4xl font-bold text-text-main mb-4">Why Learn With Us</h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto mb-4">
              We're committed to providing the best learning experience that helps you grow, build skills and achieve your career goals.
            </p>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 01: Expert Mentors */}
            <div className="bg-white p-6 rounded-2xl border border-border-custom shadow-sm hover:shadow-md transition-shadow relative flex flex-col items-center text-center">
              <div className="absolute top-4 left-4 bg-blue-50 text-primary text-xs font-bold px-3 py-1 rounded-lg">01</div>
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <span className="material-icons text-3xl text-blue-500">person_outline</span>
              </div>
              <h4 className="text-xl font-bold text-text-main mb-2">Expert Mentors</h4>
              <p className="text-text-muted text-sm leading-relaxed mb-6">Learn from industry experts who bring real-world experience and practical knowledge to every lesson.</p>
              <div className="w-24 h-1.5 bg-blue-500 rounded-full mt-auto"></div>
            </div>
            {/* Card 02: Practical Projects */}
            <div className="bg-white p-6 rounded-2xl border border-border-custom shadow-sm hover:shadow-md transition-shadow relative flex flex-col items-center text-center">
              <div className="absolute top-4 left-4 bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-lg">02</div>
              <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4">
                <span className="material-icons text-3xl text-emerald-600">code</span>
              </div>
              <h4 className="text-xl font-bold text-text-main mb-2">Practical Projects</h4>
              <p className="text-text-muted text-sm leading-relaxed mb-6">Work on real-world projects that help you apply concepts and build an impressive portfolio.</p>
              <div className="w-24 h-1.5 bg-emerald-500 rounded-full mt-auto"></div>
            </div>
            {/* Card 03: Industry Certificate */}
            <div className="bg-white p-6 rounded-2xl border border-border-custom shadow-sm hover:shadow-md transition-shadow relative flex flex-col items-center text-center">
              <div className="absolute top-4 left-4 bg-violet-50 text-violet-700 text-xs font-bold px-3 py-1 rounded-lg">03</div>
              <div className="w-16 h-16 bg-violet-50 rounded-full flex items-center justify-center mb-4">
                <span className="material-icons text-3xl text-violet-600">card_membership</span>
              </div>
              <h4 className="text-xl font-bold text-text-main mb-2">Industry Certificate</h4>
              <p className="text-text-muted text-sm leading-relaxed mb-6">Earn a recognized certificate that validates your skills and boosts your professional credibility.</p>
              <div className="w-24 h-1.5 bg-violet-500 rounded-full mt-auto"></div>
            </div>
            {/* Card 04: Lifetime Access */}
            <div className="bg-white p-6 rounded-2xl border border-border-custom shadow-sm hover:shadow-md transition-shadow relative flex flex-col items-center text-center">
              <div className="absolute top-4 left-4 bg-orange-50 text-orange-700 text-xs font-bold px-3 py-1 rounded-lg">04</div>
              <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mb-4">
                <span className="material-icons text-3xl text-orange-500">all_inclusive</span>
              </div>
              <h4 className="text-xl font-bold text-text-main mb-2">Lifetime Access</h4>
              <p className="text-text-muted text-sm leading-relaxed mb-6">Get lifetime access to all course materials and future updates at no extra cost.</p>
              <div className="w-24 h-1.5 bg-orange-500 rounded-full mt-auto"></div>
            </div>
            {/* Card 05: Learning Community */}
            <div className="bg-white p-6 rounded-2xl border border-border-custom shadow-sm hover:shadow-md transition-shadow relative flex flex-col items-center text-center">
              <div className="absolute top-4 left-4 bg-blue-50 text-primary text-xs font-bold px-3 py-1 rounded-lg">05</div>
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <span className="material-icons text-3xl text-blue-500">groups</span>
              </div>
              <h4 className="text-xl font-bold text-text-main mb-2">Learning Community</h4>
              <p className="text-text-muted text-sm leading-relaxed mb-6">Join a supportive community of learners, collaborate, share ideas and grow together.</p>
              <div className="w-24 h-1.5 bg-blue-500 rounded-full mt-auto"></div>
            </div>
            {/* Card 06: Placement Support */}
            <div className="bg-white p-6 rounded-2xl border border-border-custom shadow-sm hover:shadow-md transition-shadow relative flex flex-col items-center text-center">
              <div className="absolute top-4 left-4 bg-pink-50 text-pink-700 text-xs font-bold px-3 py-1 rounded-lg">06</div>
              <div className="w-16 h-16 bg-pink-50 rounded-full flex items-center justify-center mb-4">
                <span className="material-icons text-3xl text-pink-500">business_center</span>
              </div>
              <h4 className="text-xl font-bold text-text-main mb-2">Placement Support</h4>
              <p className="text-text-muted text-sm leading-relaxed mb-6">Receive career guidance, resume reviews and interview support to kickstart your career.</p>
              <div className="w-24 h-1.5 bg-pink-500 rounded-full mt-auto"></div>
            </div>
          </div>
        </div>
      </section>
      {/* END: Why Learn With Us Grid */}

      {/* BEGIN: Secondary Stats Banner */}
      <section style={{ backgroundColor: 'transparent' }} className="max-w-4xl mx-auto px-4 -mt-10 relative z-10" data-purpose="stats">
        <div className="rounded-2xl p-6 sm:p-8" style={{ backgroundColor: '#FFFFFF', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid #EEEFF5' }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {/* Stat 1 */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 shrink-0">
                <span className="material-icons">school</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-text-main">50K+</h3>
                <p className="text-text-muted text-xs font-medium">Happy Students</p>
              </div>
            </div>
            {/* Stat 2 */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 shrink-0">
                <span className="material-icons">menu_book</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-text-main">500+</h3>
                <p className="text-text-muted text-xs font-medium">Courses</p>
              </div>
            </div>
            {/* Stat 3 */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center text-violet-600 shrink-0">
                <span className="material-icons">emoji_events</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-text-main">95%</h3>
                <p className="text-text-muted text-xs font-medium">Satisfaction Rate</p>
              </div>
            </div>
            {/* Stat 4 */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 shrink-0">
                <span className="material-icons">stars</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-text-main">4.8/5</h3>
                <p className="text-text-muted text-xs font-medium">Average Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* END: Secondary Stats Banner */}

      {/* BEGIN: Learning Paths Section 1 */}
      <section className="bg-white py-24" data-purpose="learning-paths">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-blue-50 text-blue-600 mb-4">
              📚 Learning Paths
            </span>
            <h2 className="text-4xl font-bold text-text-main mb-4">Compare Learning Paths</h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">Choose the perfect track tailored to your current expertise and career goals.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-4 md:pb-0">
            {/* Beginner Path */}
            <div className="bg-white rounded-[20px] p-8 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group relative border border-border-custom">
              <div className="absolute inset-0 rounded-[20px] bg-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                <span className="material-icons text-green-600 text-3xl">rocket_launch</span>
              </div>
              <h3 className="text-xl font-bold text-text-main mb-2">Beginner</h3>
              <p className="text-text-muted text-sm mb-6">Foundational concepts for those starting from scratch.</p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-sm text-text-main">
                  <span className="material-icons text-blue-600 text-lg">check_circle</span>
                  Core Fundamentals
                </li>
                <li className="flex items-center gap-3 text-sm text-text-main">
                  <span className="material-icons text-blue-600 text-lg">check_circle</span>
                  Guided Projects
                </li>
                <li className="flex items-center gap-3 text-sm text-text-main">
                  <span className="material-icons text-blue-600 text-lg">check_circle</span>
                  Community Support
                </li>
              </ul>
              <button className="w-full py-3 bg-[#2563EB] text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-md">Get Started</button>
            </div>

            {/* Intermediate Path */}
            <div className="bg-white rounded-[20px] p-8 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group relative border border-border-custom">
              <div className="absolute inset-0 rounded-[20px] bg-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <span className="material-icons text-blue-600 text-3xl">trending_up</span>
              </div>
              <h3 className="text-xl font-bold text-text-main mb-2">Intermediate</h3>
              <p className="text-text-muted text-sm mb-6">Deep dive into specialized tools and frameworks.</p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-sm text-text-main">
                  <span className="material-icons text-blue-600 text-lg">check_circle</span>
                  Advanced Logic
                </li>
                <li className="flex items-center gap-3 text-sm text-text-main">
                  <span className="material-icons text-blue-600 text-lg">check_circle</span>
                  Real-world Case Studies
                </li>
                <li className="flex items-center gap-3 text-sm text-text-main">
                  <span className="material-icons text-blue-600 text-lg">check_circle</span>
                  Code Reviews
                </li>
              </ul>
              <button className="w-full py-3 bg-[#2563EB] text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-md">Level Up</button>
            </div>

            {/* Advanced Path */}
            <div className="bg-white rounded-[20px] p-8 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group relative border border-border-custom">
              <div className="absolute inset-0 rounded-[20px] bg-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                <span className="material-icons text-purple-600 text-3xl">psychology</span>
              </div>
              <h3 className="text-xl font-bold text-text-main mb-2">Advanced</h3>
              <p className="text-text-muted text-sm mb-6">Mastery of architecture and complex systems.</p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-sm text-text-main">
                  <span className="material-icons text-blue-600 text-lg">check_circle</span>
                  System Design
                </li>
                <li className="flex items-center gap-3 text-sm text-text-main">
                  <span className="material-icons text-blue-600 text-lg">check_circle</span>
                  Performance Tuning
                </li>
                <li className="flex items-center gap-3 text-sm text-text-main">
                  <span className="material-icons text-blue-600 text-lg">check_circle</span>
                  1-on-1 Mentorship
                </li>
              </ul>
              <button className="w-full py-3 bg-[#2563EB] text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-md">Master Now</button>
            </div>

            {/* Most Popular Path */}
            <div className="bg-white rounded-[20px] p-8 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group relative border-2 border-blue-100">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Most Popular</div>
              <div className="absolute inset-0 rounded-[20px] bg-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-14 h-14 bg-yellow-100 rounded-2xl flex items-center justify-center mb-6">
                <span className="material-icons text-yellow-600 text-3xl">star</span>
              </div>
              <h3 className="text-xl font-bold text-text-main mb-2">Full-Stack Pro</h3>
              <p className="text-text-muted text-sm mb-6">The complete journey from zero to industry-ready.</p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-sm text-text-main">
                  <span className="material-icons text-blue-600 text-lg">check_circle</span>
                  End-to-End Mastery
                </li>
                <li className="flex items-center gap-3 text-sm text-text-main">
                  <span className="material-icons text-blue-600 text-lg">check_circle</span>
                  Job Placement Help
                </li>
                <li className="flex items-center gap-3 text-sm text-text-main">
                  <span className="material-icons text-blue-600 text-lg">check_circle</span>
                  Portfolio Building
                </li>
              </ul>
              <button className="w-full py-3 bg-[#2563EB] text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-md">Join Path</button>
            </div>
          </div>
        </div>
      </section>
      {/* END: Learning Paths Section 1 */}

      {/* BEGIN: Learning Paths Section 2 */}
      <section className="py-24 bg-white" data-purpose="learning-paths">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-4 inline-block">📚 Learning Paths</span>
            <h2 className="text-4xl font-bold text-text-main mb-4">Compare Learning Paths</h2>
            <p className="text-text-muted text-lg max-w-3xl mx-auto">Not sure where to start? Compare our learning paths and choose the course that best matches your current skills and career goals.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 overflow-x-auto pb-6">
            {/* Card 1: Beginner */}
            <div className="bg-white p-8 rounded-[20px] shadow-xl flex flex-col min-w-[280px] border border-border-custom">
              <div className="text-4xl mb-6">🟢</div>
              <h3 className="text-xl font-bold text-text-main mb-4">Beginner</h3>
              <p className="text-text-muted text-sm mb-8">Perfect for complete beginners starting their learning journey.</p>
              <ul className="space-y-4 mb-10 flex-grow">
                <li className="flex items-center gap-2 text-sm text-text-main"><span className="material-icons text-green-500 text-sm">check_circle</span> No Prior Experience Required</li>
                <li className="flex items-center gap-2 text-sm text-text-main"><span className="material-icons text-green-500 text-sm">check_circle</span> 4 Weeks Duration</li>
                <li className="flex items-center gap-2 text-sm text-text-main"><span className="material-icons text-green-500 text-sm">check_circle</span> Beginner Friendly Projects</li>
                <li className="flex items-center gap-2 text-sm text-text-main"><span className="material-icons text-green-500 text-sm">check_circle</span> Community Support</li>
                <li className="flex items-center gap-2 text-sm text-text-main"><span className="material-icons text-green-500 text-sm">check_circle</span> Completion Certificate</li>
              </ul>
              <button className="w-full py-3 rounded-xl bg-surface-variant text-text-main font-bold hover:bg-gray-200 transition-colors">Start Beginner Path</button>
            </div>

            {/* Card 2: Intermediate */}
            <div className="bg-white p-8 rounded-[20px] shadow-xl flex flex-col min-w-[280px] border border-border-custom">
              <div className="text-4xl mb-6">🔵</div>
              <h3 className="text-xl font-bold text-text-main mb-4">Intermediate</h3>
              <p className="text-text-muted text-sm mb-8">Best for learners with basic knowledge who want to level up.</p>
              <ul className="space-y-4 mb-10 flex-grow">
                <li className="flex items-center gap-2 text-sm text-text-main"><span className="material-icons text-blue-500 text-sm">check_circle</span> Intermediate Curriculum</li>
                <li className="flex items-center gap-2 text-sm text-text-main"><span className="material-icons text-blue-500 text-sm">check_circle</span> Real World Projects</li>
                <li className="flex items-center gap-2 text-sm text-text-main"><span className="material-icons text-blue-500 text-sm">check_circle</span> Live Sessions</li>
                <li className="flex items-center gap-2 text-sm text-text-main"><span className="material-icons text-blue-500 text-sm">check_circle</span> Mentor Guidance</li>
                <li className="flex items-center gap-2 text-sm text-text-main"><span className="material-icons text-blue-500 text-sm">check_circle</span> Industry Certificate</li>
              </ul>
              <button className="w-full py-3 rounded-xl bg-surface-variant text-text-main font-bold hover:bg-gray-200 transition-colors">Explore Intermediate</button>
            </div>

            {/* Card 3: Advanced */}
            <div className="bg-white p-8 rounded-[20px] shadow-xl flex flex-col min-w-[280px] border border-border-custom">
              <div className="text-4xl mb-6">🟣</div>
              <h3 className="text-xl font-bold text-text-main mb-4">Advanced</h3>
              <p className="text-text-muted text-sm mb-8">Designed for professionals who want to master advanced concepts.</p>
              <ul className="space-y-4 mb-10 flex-grow">
                <li className="flex items-center gap-2 text-sm text-text-main"><span className="material-icons text-purple-500 text-sm">check_circle</span> Advanced Curriculum</li>
                <li className="flex items-center gap-2 text-sm text-text-main"><span className="material-icons text-purple-500 text-sm">check_circle</span> Capstone Projects</li>
                <li className="flex items-center gap-2 text-sm text-text-main"><span className="material-icons text-purple-500 text-sm">check_circle</span> Career Guidance</li>
                <li className="flex items-center gap-2 text-sm text-text-main"><span className="material-icons text-purple-500 text-sm">check_circle</span> Placement Assistance</li>
                <li className="flex items-center gap-2 text-sm text-text-main"><span className="material-icons text-purple-500 text-sm">check_circle</span> Premium Certificate</li>
              </ul>
              <button className="w-full py-3 rounded-xl bg-surface-variant text-text-main font-bold hover:bg-gray-200 transition-colors">Go Advanced</button>
            </div>

            {/* Card 4: Most Popular */}
            <div className="bg-white p-8 rounded-[20px] shadow-xl flex flex-col min-w-[280px] border border-primary/20">
              <div className="text-4xl mb-6">⭐</div>
              <h3 className="text-xl font-bold text-text-main mb-4">Most Popular</h3>
              <p className="text-text-muted text-sm mb-8">The most recommended learning path chosen by thousands of students.</p>
              <ul className="space-y-4 mb-10 flex-grow">
                <li className="flex items-center gap-2 text-sm text-text-main"><span className="material-icons text-yellow-500 text-sm">check_circle</span> Balanced Curriculum</li>
                <li className="flex items-center gap-2 text-sm text-text-main"><span className="material-icons text-yellow-500 text-sm">check_circle</span> Live Classes</li>
                <li className="flex items-center gap-2 text-sm text-text-main"><span className="material-icons text-yellow-500 text-sm">check_circle</span> Hands-on Projects</li>
                <li className="flex items-center gap-2 text-sm text-text-main"><span className="material-icons text-yellow-500 text-sm">check_circle</span> Mentor Support</li>
                <li className="flex items-center gap-2 text-sm text-text-main"><span className="material-icons text-yellow-500 text-sm">check_circle</span> Certificate Included</li>
              </ul>
              <button className="w-full py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary-hover-custom transition-colors">Explore Popular Path</button>
            </div>
          </div>
        </div>
      </section>
      {/* END: Learning Paths Section 2 */}

      {/* BEGIN: Student Success Stories */}
      <section className="py-24" data-purpose="testimonials">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-text-main mb-3 text-center">Student Success Stories</h2>
          <p className="text-text-muted mb-12 text-center">Hear from our community of learners.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-border-custom shadow-sm">
              <div className="flex text-yellow-400 mb-4">
                <span className="material-icons">star</span><span className="material-icons">star</span><span className="material-icons">star</span><span className="material-icons">star</span><span className="material-icons">star</span>
              </div>
              <p className="text-text-muted italic mb-6">"EduPremium helped me transition from a non-tech background into a full-stack developer role in just 6 months. The courses are top-notch!"</p>
              <div className="flex items-center gap-4">
                <img alt="Student" className="w-12 h-12 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3otibGzNgGshRKUK1hXPJghc-p3OLSTOrI6HdHjH6xI6lJsGIvP5FTEgPrB9HDAWWmhTAFZPzhKgiA5kunCze-ie0yqv6O6ZDUIkk2nBFFhZCifvlkJH5JIJuX4V4SdcRs40_VNorgA7HKw4PYaRnwRUK7Q1p23X9_xKawPWBORpZ8u2laGalLC5ELSoDI6Y3vNxX8n5oxdYoQybEJ2ZYVSdM8IPZv9CBo__MKS4v2e7eIXQWnWaV" />
                <div>
                  <h4 className="font-bold text-text-main">Alex Johnson</h4>
                  <span className="text-xs text-text-muted">Software Engineer</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-border-custom shadow-sm">
              <div className="flex text-yellow-400 mb-4">
                <span className="material-icons">star</span><span className="material-icons">star</span><span className="material-icons">star</span><span className="material-icons">star</span><span className="material-icons">star</span>
              </div>
              <p className="text-text-muted italic mb-6">"The Data Science bootcamp was incredibly detailed. I loved the hands-on projects, which I added directly to my portfolio."</p>
              <div className="flex items-center gap-4">
                <img alt="Student" className="w-12 h-12 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBr2ZmMdIWXcKXmXLMAAx2EZxwqUgBqy8IbzGcfahD3yEG15jJbY_wxvZ2jT_39Xyyl0eZNdrekeSedAs3VymWR174tQ3tQwAIfrQnKdZIG0u0XndBaeyBtRhli1swtzjLYmHrVZ1Q6BY54hXMyB8xClMzjNU9D-D2g7zGuE2kdu3TB6NiFrPwjnYRbd06KC0VoazhUAlUN6rsXeOJz43uTH8HvZ5HzI012QeHGvtjVi5jdIjG5RjUW" />
                <div>
                  <h4 className="font-bold text-text-main">Sarah Lee</h4>
                  <span className="text-xs text-text-muted">Data Analyst</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-border-custom shadow-sm">
              <div className="flex text-yellow-400 mb-4">
                <span className="material-icons">star</span><span className="material-icons">star</span><span className="material-icons">star</span><span className="material-icons">star</span><span className="material-icons">star_half</span>
              </div>
              <p className="text-text-muted italic mb-6">"Great instructors and fantastic support. I finally learned how to effectively market my small business online."</p>
              <div className="flex items-center gap-4">
                <img alt="Student" className="w-12 h-12 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEMcZaikqIeUk7vWnU5XOofTyd2gzVIhBdpgWUG_4sgEsmWR-eiM52CAqWUEzr7wvfKX-wW8dmC3bIBmoTHTUsjy34bCzFLN-e3kPIVzwMX5bP1u0b_l8dwJa4epjG76zDR6rAjU4X0bp0qVUbnXc0ePlQLnYtMBaqamJcEj9IyA20lmStw_WN3SxZwpAiE66gIlWICn2eUNqnyOYxum-NN--IUpxdS9x7E_h7lbMbkwtYOFSfd-Ok" />
                <div>
                  <h4 className="font-bold text-text-main">Michael Chen</h4>
                  <span className="text-xs text-text-muted">Entrepreneur</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* END: Student Success Stories */}

      {/* BEGIN: Certificate Preview */}
      <section className="py-24 bg-white relative overflow-hidden" data-purpose="certificate-preview">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-50 rounded-full -ml-48 -mt-48 blur-3xl opacity-50 -z-10"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-50 rounded-full -mr-48 -mb-48 blur-3xl opacity-50 -z-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-blue-50 text-primary mb-4 tracking-widest uppercase">
              🏅 Recognized &amp; Trusted
            </span>
            <h2 className="text-4xl font-bold text-text-main mb-4">Certificate Preview</h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              Earn an industry-recognized certificate that validates your skills and strengthens your professional profile.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            {/* Left: Certificate Mockup (60%) */}
            <div className="lg:col-span-7">
              <div className="relative group">
                <div className="absolute inset-0 bg-primary/5 rounded-[20px] blur-2xl -z-10 group-hover:scale-105 transition-transform duration-500"></div>
                <img alt="Professional Certificate Mockup" className="w-full h-auto rounded-[20px] shadow-2xl hover:-translate-y-2 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5rjtAOmZh4ZG_aaiBHPf0IkzeixuSSNZwMH5k2rE2T7bWYtLsb6vASZhXCg2KQqgr12OGVBuapBJP2t5QVgcFRrHB328ofp5yNGq8JfVCvbWXgniNktkVB_G8K1aT_y4SkQpEOOS72zXx0AkwJ3-CsdNUaSxcG1G5Ls0JUVhOK5fO4bn8S0nEEwCpZWvKiW9_lt11MOK4epCXfkwgkQPQzY4A_PZEoGbHWf_2ADqRNpqeuhQsHi1T" />
              </div>
            </div>

            {/* Right: Feature Cards (40%) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Card 1 */}
              <div className="bg-white p-6 rounded-[20px] shadow-sm hover:shadow-md transition-all hover:-translate-y-1 flex items-start gap-4 border border-border-custom">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">📜</span>
                </div>
                <div>
                  <h4 className="font-bold text-text-main mb-1">Professional Certificate</h4>
                  <p className="text-text-muted text-sm">Receive a beautifully designed certificate that enhances your resume and LinkedIn profile.</p>
                </div>
              </div>
              {/* Card 2 */}
              <div className="bg-white p-6 rounded-[20px] shadow-sm hover:shadow-md transition-all hover:-translate-y-1 flex items-start gap-4 border border-border-custom">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🛡</span>
                </div>
                <div>
                  <h4 className="font-bold text-text-main mb-1">Industry Recognized</h4>
                  <p className="text-text-muted text-sm">Our certificates are trusted by recruiters and leading companies.</p>
                </div>
              </div>
              {/* Card 3 */}
              <div className="bg-white p-6 rounded-[20px] shadow-sm hover:shadow-md transition-all hover:-translate-y-1 flex items-start gap-4 border border-border-custom">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🌍</span>
                </div>
                <div>
                  <h4 className="font-bold text-text-main mb-1">Share &amp; Showcase</h4>
                  <p className="text-text-muted text-sm">Share your certificate online and verify its authenticity instantly.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Panel: Verification */}
          <div className="bg-blue-50/50 rounded-[20px] p-8 border border-blue-100">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center text-primary shrink-0 border border-blue-100">
                  <span className="material-icons text-3xl">verified_user</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-text-main">Certificate Verification</h4>
                  <p className="text-text-muted text-sm">Every certificate includes a unique verification ID for authenticity.</p>
                  {certStatus && (
                    <p className={`text-sm font-semibold mt-1 ${certStatus.includes("authentic") ? "text-emerald-600" : "text-red-500"}`}>
                      {certStatus}
                    </p>
                  )}
                </div>
              </div>
              <div className="w-full md:w-auto">
                <div className="flex flex-col gap-2">
                  <form onSubmit={handleVerifyCert} className="flex">
                    <input
                      className="w-full md:w-64 px-4 py-3 rounded-l-xl border border-blue-200 focus:ring-2 focus:ring-primary focus:border-primary outline-none text-[#1f2937] bg-white text-sm"
                      placeholder="Enter Certificate ID (e.g. LARA-9842-PRO)"
                      type="text"
                      value={certId}
                      onChange={(e) => setCertId(e.target.value)}
                    />
                    <button type="submit" className="bg-primary text-white px-6 py-3 rounded-r-xl font-bold hover:bg-primary-hover-custom transition-colors whitespace-nowrap text-sm">Verify Now</button>
                  </form>
                  <p className="text-[10px] text-text-muted flex items-center gap-1">
                    <span className="material-icons text-xs">lock</span> This ensures authenticity and prevents any misuse.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* END: Certificate Preview */}

      {/* BEGIN: FAQ */}
      <section className="py-24" data-purpose="faq">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-text-main mb-8 text-center">Frequently Asked Questions</h2>
          <div className="flex flex-col gap-4">
            
            {/* FAQ 1 */}
            <div className="border border-border-custom rounded-xl p-4 bg-white">
              <h4 onClick={() => setOpenFaq(openFaq === 0 ? null : 0)} className="font-bold text-text-main flex justify-between items-center cursor-pointer select-none">
                Do I get lifetime access to the courses?
                <span className="material-icons transition-transform duration-200" style={{ transform: openFaq === 0 ? "rotate(180deg)" : "rotate(0)" }}>expand_more</span>
              </h4>
              {openFaq === 0 && (
                <p className="text-text-muted text-sm mt-2 leading-relaxed">
                  Yes! Once you purchase a course, you have lifetime access to the materials, including all future updates.
                </p>
              )}
            </div>

            {/* FAQ 2 */}
            <div className="border border-border-custom rounded-xl p-4 bg-white">
              <h4 onClick={() => setOpenFaq(openFaq === 1 ? null : 1)} className="font-bold text-text-main flex justify-between items-center cursor-pointer select-none">
                Are there prerequisites for the courses?
                <span className="material-icons transition-transform duration-200" style={{ transform: openFaq === 1 ? "rotate(180deg)" : "rotate(0)" }}>expand_more</span>
              </h4>
              {openFaq === 1 && (
                <p className="text-text-muted text-sm mt-2 leading-relaxed">
                  We offer courses ranging from Beginner to Advanced levels. Beginners can start directly with zero prior coding knowledge.
                </p>
              )}
            </div>

            {/* FAQ 3 */}
            <div className="border border-border-custom rounded-xl p-4 bg-white">
              <h4 onClick={() => setOpenFaq(openFaq === 2 ? null : 2)} className="font-bold text-text-main flex justify-between items-center cursor-pointer select-none">
                Will I receive a certificate upon completion?
                <span className="material-icons transition-transform duration-200" style={{ transform: openFaq === 2 ? "rotate(180deg)" : "rotate(0)" }}>expand_more</span>
              </h4>
              {openFaq === 2 && (
                <p className="text-text-muted text-sm mt-2 leading-relaxed">
                  Yes! You earn an industry-recognized certificate that you can showcase on LinkedIn, your resume, or personal portfolio.
                </p>
              )}
            </div>

          </div>
        </div>
      </section>
      {/* END: FAQ */}

      {/* BEGIN: Stay Updated (Newsletter) */}
      <section className="py-12 bg-primary text-white" data-purpose="newsletter">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Updated with EduPremium</h2>
          <p className="text-gray-200 mb-6">Subscribe to our newsletter to get the latest courses and offers directly to your inbox.</p>
          
          {newsletterSubscribed ? (
            <div className="bg-white/10 text-white font-medium py-3 px-6 rounded-xl inline-block">
              🎉 Thank you for subscribing! Check your email for updates.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex max-w-md mx-auto">
              <input
                className="w-full px-4 py-3 rounded-l-xl text-text-main focus:outline-none bg-white text-sm"
                placeholder="Enter your email"
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
              />
              <button type="submit" className="bg-gray-900 px-6 py-3 rounded-r-xl font-bold hover:bg-black transition-colors text-sm whitespace-nowrap">Subscribe</button>
            </form>
          )}
        </div>
      </section>
      {/* END: Stay Updated */}

      {/* BEGIN: Final CTA */}
      <section className="py-24 text-center" data-purpose="cta">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-text-main mb-6">Ready To Build Your Future?</h2>
          <p className="text-lg text-text-muted mb-8">Join millions of learners worldwide and start advancing your skills today.</p>
          <a className="bg-primary text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary-hover-custom transition-colors inline-block shadow-lg" href="#">Start Learning For Free</a>
        </div>
      </section>
      {/* END: Final CTA */}

      {/* BEGIN: Footer */}
      <footer className="bg-[#111827] text-white py-12" data-purpose="footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <a className="text-primary font-bold text-xl flex items-center gap-2 mb-4" href="#">
              <span className="material-icons text-white">school</span>
              EduPremium
            </a>
            <p className="text-gray-400 text-sm">Empowering careers through quality education.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-white">Platform</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a className="hover:text-white" href="#">Courses</a></li>
              <li><a className="hover:text-white" href="#">Mentors</a></li>
              <li><a className="hover:text-white" href="#">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-white">Support</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a className="hover:text-white" href="#">Contact Us</a></li>
              <li><a className="hover:text-white" href="#">FAQ</a></li>
              <li><a className="hover:text-white" href="#">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            {/* Placeholder for social or other links if needed */}
          </div>
        </div>
      </footer>
      {/* END: Footer */}
    </div>
  );
}
