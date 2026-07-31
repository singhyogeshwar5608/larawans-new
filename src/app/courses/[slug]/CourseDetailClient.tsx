"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft, ArrowRight, Clock, Users, BookOpen, CheckCircle2, Zap,
  Star, Play, Sparkles, GraduationCap, ChevronDown, ChevronUp,
  Globe, ShoppingCart, BarChart3, FileText, Layout, Code, Search,
  Target, Share2, Mail, PenTool, Mic, MessageCircle, Cloud, Shield,
  Activity, Utensils, PieChart, UsersRound, UserPlus, Smartphone,
  Layers, ShoppingBag, Box, Palette, Image, BookOpen as BookIcon,
  GitBranch, FileCode, RefreshCw, Calendar, MapPin, Link, Map,
  Award, Infinity, Headphones, Briefcase, HelpCircle, Download,
} from "lucide-react";
import NextLink from "next/link";
import type { CourseItem } from "@/lib/course-data";

/* ── Icon map for projects ── */
const PROJECT_ICONS: Record<string, React.ElementType> = {
  globe: Globe, "shopping-cart": ShoppingCart, "bar-chart": BarChart3,
  "file-text": FileText, layout: Layout, code: Code, search: Search,
  target: Target, "share-2": Share2, mail: Mail, "pen-tool": PenTool,
  mic: Mic, "message-circle": MessageCircle, cloud: Cloud, shield: Shield,
  activity: Activity, utensils: Utensils, "pie-chart": PieChart,
  users: UsersRound, "user-plus": UserPlus, smartphone: Smartphone,
  layers: Layers, "shopping-bag": ShoppingBag, box: Box, palette: Palette,
  image: Image, "book-open": BookIcon, "git-branch": GitBranch,
  "file-code": FileCode, "refresh-cw": RefreshCw, calendar: Calendar,
  "map-pin": MapPin, link: Link, map: Map,
};

/* ── FAQ Data ── */
const FAQ_DATA = [
  { q: "Do I need coding experience?", a: "No, this course is designed for complete beginners. We start from the very basics and gradually build up to advanced concepts. All you need is a laptop and internet connection." },
  { q: "What tools do I need?", a: "You will need a laptop with at least 8GB RAM. All tools used in the course are either free or have free tiers available. We provide setup guides for every tool." },
  { q: "Will I get a certificate?", a: "Yes, you will receive a verified certificate of completion that you can add to your LinkedIn profile or resume. The certificate is recognized by industry professionals." },
  { q: "How much time should I invest?", a: "We recommend dedicating 8-10 hours per week for optimal progress. However, the course is self-paced, so you can adjust your learning speed based on your schedule." },
  { q: "Is this suitable for beginners?", a: "Absolutely. The curriculum is structured to take you from zero to professional. Each module builds on the previous one, and our mentors provide support at every step." },
  { q: "Do I get lifetime access?", a: "Yes, once you enroll, you get lifetime access to all course materials, including any future updates and new content we add. You can revisit any module anytime." },
  { q: "Is there mentor support?", a: "Yes, you get direct access to industry mentors who review your work, answer questions, and guide you through challenges. Mentor support is available throughout the course." },
  { q: "Can I get a refund?", a: "We offer a 7-day no-questions-asked refund policy. If the course is not right for you within the first week, you get a full refund." },
];

/* ── Animation helpers ── */
/* Content is always visible (no opacity:0). Motion adds subtle slide. */
const fadeUp = (delay = 0) => ({
  initial: { y: 15 },
  whileInView: { y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
});

const stagger = (base = 0) => ({ ...fadeUp(base), transition: { ...fadeUp(base).transition, duration: 0.45 } });

/* ── No-motion fallback ── */
const noMotion = { initial: false, animate: { opacity: 1 } };

/* ── Hero SVG (premium laptop illustration) ── */
function HeroSVG() {
  return (
    <svg viewBox="0 0 540 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <defs>
        <linearGradient id="hScreenBg" x1="0" y1="0" x2="0.3" y2="1"><stop offset="0%" stopColor="#0F1115"/><stop offset="100%" stopColor="#0F172A"/></linearGradient>
        <linearGradient id="hLidOuter" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1E1F2E"/><stop offset="100%" stopColor="#14152A"/></linearGradient>
        <linearGradient id="hLidEdge" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#2A2B3E"/><stop offset="100%" stopColor="#1A1B2E"/></linearGradient>
        <linearGradient id="hBaseTop" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#E8EAED"/><stop offset="100%" stopColor="#D4D8DE"/></linearGradient>
        <linearGradient id="hBaseFront" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#B8BCC4"/><stop offset="100%" stopColor="#A0A4AC"/></linearGradient>
        <linearGradient id="hAiGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#818CF8"/><stop offset="40%" stopColor="#6C63FF"/><stop offset="100%" stopColor="#5B51E0"/></linearGradient>
        <radialGradient id="hAiGlow" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#6C63FF" stopOpacity="0.4"/><stop offset="100%" stopColor="#6C63FF" stopOpacity="0"/></radialGradient>
        <linearGradient id="hBar1" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stopColor="#F59E0B"/><stop offset="100%" stopColor="#FBBF24"/></linearGradient>
        <linearGradient id="hBar2" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stopColor="#FB923C"/><stop offset="100%" stopColor="#FDBA74"/></linearGradient>
        <linearGradient id="hBar3" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stopColor="#818CF8"/><stop offset="100%" stopColor="#A78BFA"/></linearGradient>
        <linearGradient id="hBar4" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stopColor="#6C63FF"/><stop offset="100%" stopColor="#7C73FF"/></linearGradient>
        <radialGradient id="hBulbGlow" cx="50%" cy="35%" r="60%"><stop offset="0%" stopColor="#FEF3C7" stopOpacity="0.9"/><stop offset="50%" stopColor="#FDE68A" stopOpacity="0.35"/><stop offset="100%" stopColor="#FCD34D" stopOpacity="0"/></radialGradient>
        <radialGradient id="hBlob1" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#EDE9FE" stopOpacity="0.7"/><stop offset="100%" stopColor="#EDE9FE" stopOpacity="0"/></radialGradient>
        <radialGradient id="hBlob2" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#DBEAFE" stopOpacity="0.4"/><stop offset="100%" stopColor="#DBEAFE" stopOpacity="0"/></radialGradient>
        <filter id="hCardShadow" x="-25%" y="-25%" width="150%" height="170%"><feDropShadow dx="0" dy="8" stdDeviation="14" floodColor="#6366F1" floodOpacity="0.1"/></filter>
        <filter id="hLightShadow" x="-20%" y="-20%" width="140%" height="160%"><feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#000000" floodOpacity="0.06"/></filter>
        <filter id="hGroundShadow" x="-20%" y="-10%" width="140%" height="140%"><feDropShadow dx="0" dy="8" stdDeviation="28" floodColor="#1E1B4B" floodOpacity="0.1"/></filter>
        <filter id="hPurpleShadow" x="-30%" y="-30%" width="160%" height="180%"><feDropShadow dx="0" dy="14" stdDeviation="20" floodColor="#6C63FF" floodOpacity="0.15"/></filter>
      </defs>
      {/* Ambient blobs */}
      <ellipse cx="290" cy="270" rx="200" ry="180" fill="url(#hBlob1)"/>
      <ellipse cx="400" cy="180" rx="100" ry="100" fill="url(#hBlob2)"/>
      {/* Dot grid */}
      <g opacity="0.45">
        {Array.from({length:36}).map((_,i)=>{const row=Math.floor(i/6),col=i%6;return <circle key={`dot-${i}`} cx={395+col*20} cy={55+row*20} r="2" fill="#C7D2FE"/>;})}
      </g>
      {/* Ambient circles */}
      <circle cx="100" cy="90" r="30" fill="#C4B5FD" opacity="0.3"/>
      <circle cx="430" cy="190" r="16" fill="#93C5FD" opacity="0.22"/>
      <circle cx="475" cy="250" r="10" fill="#DDD6FE" opacity="0.35"/>
      {/* Particles */}
      <g className="hero-svg-particle"><circle cx="70" cy="195" r="3" fill="#A78BFA" opacity="0.25"/></g>
      <g className="hero-svg-particle-slow"><circle cx="460" cy="145" r="2.5" fill="#93C5FD" opacity="0.2"/></g>
      <g className="hero-svg-particle-med"><circle cx="150" cy="395" r="2" fill="#FCD34D" opacity="0.25"/></g>

      {/* Laptop */}
      <g className="hero-svg-laptop" filter="url(#hGroundShadow)">
        <path d="M148,105 L388,95 L392,265 L144,275 Z" rx="14" fill="url(#hLidOuter)" stroke="#2A2B3E" strokeWidth="0.5"/>
        <path d="M148,105 Q148,95 162,93 L374,83 Q388,81 388,95 Z" fill="url(#hLidEdge)" opacity="0.5"/>
        <path d="M158,118 L380,108 L382,254 L156,264 Z" rx="6" fill="url(#hScreenBg)"/>
        <circle cx="269" cy="95" r="2.5" fill="#2A2B3E"/><circle cx="269" cy="95" r="1.2" fill="#3B3C52"/>
        <circle cx="172" cy="130" r="3.5" fill="#6C63FF"/>
        {/* Skeleton card */}
        <rect x="166" y="142" width="82" height="52" rx="5" fill="#161825" opacity="0.85"/>
        <circle cx="175" cy="152" r="2.8" fill="#6C63FF"/>
        <rect x="182" y="150" width="36" height="3.5" rx="1.5" fill="#DDD6FE" opacity="0.5"/>
        <rect x="182" y="157" width="52" height="3.5" rx="1.5" fill="#93C5FD" opacity="0.4"/>
        <rect x="182" y="164" width="44" height="3.5" rx="1.5" fill="#DDD6FE" opacity="0.35"/>
        <rect x="182" y="171" width="28" height="3.5" rx="1.5" fill="#93C5FD" opacity="0.4"/>
        {/* Right card */}
        <rect x="298" y="148" width="68" height="42" rx="5" fill="#161825" opacity="0.7"/>
        <rect x="306" y="157" width="48" height="3" rx="1.5" fill="#93C5FD" opacity="0.3"/>
        <rect x="306" y="164" width="38" height="3" rx="1.5" fill="#DDD6FE" opacity="0.25"/>
        <rect x="306" y="171" width="44" height="3" rx="1.5" fill="#93C5FD" opacity="0.2"/>
        {/* AI badge glow */}
        <g className="hero-svg-glow-pulse"><ellipse cx="270" cy="198" rx="60" ry="60" fill="url(#hAiGlow)"/></g>
        {/* AI badge */}
        <rect x="232" y="160" width="76" height="76" rx="18" fill="url(#hAiGrad)"/>
        <text x="270" y="212" textAnchor="middle" fontFamily="system-ui,-apple-system,sans-serif" fontSize="38" fontWeight="900" fill="#FFFFFF" letterSpacing="-1">AI</text>
        {/* Cursor */}
        <rect x="168" y="232" width="2.5" height="12" rx="1" fill="#6C63FF" opacity="0.7" className="hero-svg-cursor"/>
        {/* Hinge + base */}
        <path d="M152,275 L390,265 L394,278 L148,288 Z" fill="#A0A4AC"/>
        <path d="M152,275 L390,265 L390,271 L152,281 Z" fill="#C8CCD4" opacity="0.5"/>
        <path d="M115,288 L425,278 L442,362 L98,372 Z" fill="url(#hBaseTop)"/>
        <path d="M98,372 L442,362 L438,372 L102,380 Z" fill="url(#hBaseFront)"/>
        <path d="M148,296 L392,286 L408,342 L132,350 Z" fill="#B8BCC4" opacity="0.45"/>
        {/* Keyboard lines */}
        {[304,313,322,331,340].map((y,i)=><line key={`kb-${i}`} x1={155-i*4} y1={y} x2={395-i*2} y2={y-10} stroke="#9CA3AF" strokeWidth="1" opacity="0.35"/>)}
        {/* Trackpad */}
        <path d="M230,348 L326,343 L330,358 L234,362 Z" rx="4" fill="#C8CCD4" opacity="0.4" stroke="#B0B5BC" strokeWidth="0.8"/>
      </g>

      {/* Floating card: Code snippet */}
      <g filter="url(#hCardShadow)" className="hero-svg-float-a">
        <rect x="55" y="85" width="110" height="76" rx="10" fill="#FFFFFF"/>
        <rect x="63" y="93" width="36" height="16" rx="8" fill="#6C63FF"/>
        <text x="81" y="104.5" textAnchor="middle" fontFamily="monospace" fontSize="8.5" fontWeight="700" fill="#FFFFFF">&lt;/&gt;</text>
        <rect x="67" y="118" width="26" height="4" rx="2" fill="#DDD6FE" opacity="0.75"/>
        <rect x="67" y="127" width="78" height="4" rx="2" fill="#93C5FD" opacity="0.65"/>
        <rect x="67" y="136" width="58" height="4" rx="2" fill="#DDD6FE" opacity="0.55"/>
        <rect x="67" y="145" width="36" height="4" rx="2" fill="#93C5FD" opacity="0.65"/>
      </g>

      {/* Floating card: Bar chart */}
      <g filter="url(#hCardShadow)" className="hero-svg-float-b">
        <rect x="385" y="75" width="105" height="80" rx="10" fill="#FFFFFF"/>
        <line x1="400" y1="140" x2="478" y2="140" stroke="#E5E7EB" strokeWidth="1.5"/>
        <rect x="404" y="122" width="13" height="18" rx="3" fill="url(#hBar1)"/>
        <rect x="424" y="112" width="13" height="28" rx="3" fill="url(#hBar2)"/>
        <rect x="444" y="102" width="13" height="38" rx="3" fill="url(#hBar3)"/>
        <rect x="464" y="92" width="13" height="48" rx="3" fill="url(#hBar4)"/>
      </g>

      {/* Floating card: Chat bubble */}
      <g filter="url(#hLightShadow)" className="hero-svg-float-c">
        <path d="M408,290 L400,300 L410,294 Z" fill="#8BA4E8"/>
        <rect x="408" y="258" width="72" height="38" rx="14" fill="#8BA4E8"/>
        <circle cx="427" cy="277" r="4" fill="#FFFFFF" opacity="0.85"/>
        <circle cx="444" cy="277" r="4" fill="#FFFFFF" opacity="0.85"/>
        <circle cx="461" cy="277" r="4" fill="#FFFFFF" opacity="0.85"/>
      </g>

      {/* Floating card: Lightbulb */}
      <g filter="url(#hPurpleShadow)" className="hero-svg-float-d">
        <circle cx="490" cy="365" r="48" fill="url(#hBulbGlow)" className="hero-svg-bulb"/>
        <path d="M490,328 C506,328 518,342 518,358 C518,370 508,378 505,384 L475,384 C472,378 462,370 462,358 C462,342 474,328 490,328 Z" fill="#FDE68A" stroke="#FCD34D" strokeWidth="1.2"/>
        <path d="M490,338 C500,338 508,347 508,358 C508,365 504,370 500,374 L480,374 C476,370 472,365 472,358 C472,347 480,338 490,338 Z" fill="#FEF9C4" opacity="0.6"/>
        <path d="M484,348 L490,360 L496,348" stroke="#F59E0B" strokeWidth="1.8" fill="none" opacity="0.7"/>
        <rect x="479" y="384" width="22" height="6" rx="2" fill="#9CA3AF"/>
        <rect x="481" y="390" width="18" height="4" rx="2" fill="#B0B5BC"/>
      </g>

      {/* Floating card: Text/Bullet card */}
      <g filter="url(#hLightShadow)" className="hero-svg-float-e">
        <rect x="12" y="215" width="74" height="62" rx="8" fill="#FFFFFF"/>
        <circle cx="28" cy="234" r="3" fill="#6C63FF"/>
        <rect x="36" y="232" width="40" height="4" rx="2" fill="#DDD6FE" opacity="0.65"/>
        <rect x="26" y="242" width="52" height="4" rx="2" fill="#E5E7EB" opacity="0.5"/>
        <rect x="26" y="250" width="42" height="4" rx="2" fill="#E5E7EB" opacity="0.4"/>
        <rect x="26" y="258" width="34" height="4" rx="2" fill="#DDD6FE" opacity="0.45"/>
        <circle cx="28" cy="268" r="3" fill="#818CF8" opacity="0.7"/>
      </g>
    </svg>
  );
}

/* ── CTA AI Chip SVG ── */
function CTAChipSVG() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-w-[320px] lg:max-w-[380px]">
      <defs>
        <radialGradient id="cGlow" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#818CF8" stopOpacity="0.4"/><stop offset="60%" stopColor="#6C63FF" stopOpacity="0.1"/><stop offset="100%" stopColor="#6C63FF" stopOpacity="0"/></radialGradient>
        <linearGradient id="cGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#818CF8"/><stop offset="100%" stopColor="#6C63FF"/></linearGradient>
      </defs>
      <circle cx="100" cy="100" r="90" fill="url(#cGlow)" className="cta-chip-pulse"/>
      <rect x="50" y="50" width="100" height="100" rx="28" fill="url(#cGrad)" className="cta-chip-rotate"/>
      <text x="100" y="108" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="42" fontWeight="900" fill="#FFFFFF">AI</text>
      {[0,1,2,3,4,5,6,7].map((i)=>{const angle=(i*45)*Math.PI/180,r=62;const cx=100+r*Math.cos(angle),cy=100+r*Math.sin(angle);return <circle key={`chip-${i}`} cx={cx} cy={cy} r="5" fill="#818CF8" opacity="0.6"/>;})}
      {[0,1,2,3].map((i)=>{const angle=(i*90+22.5)*Math.PI/180,r2=78;const x1=100+72*Math.cos(angle),y1=100+72*Math.sin(angle);const x2=100+r2*Math.cos(angle),y2=100+r2*Math.sin(angle);return <line key={`line-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#A78BFA" strokeWidth="2" opacity="0.3"/>;})}
    </svg>
  );
}

/* ══════════════════════════════════════════════════ */
/* ── MAIN COMPONENT ── */
/* ══════════════════════════════════════════════════ */
export default function CourseDetailClient({ course }: { course: CourseItem }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="min-h-screen" style={{ fontFamily: "'Inter', system-ui, sans-serif", background: "#FFFFFF" }}>
      {/* Force light mode overrides for dark root layout */}
      <style dangerouslySetInnerHTML={{ __html: `
        .cd-page { color: #181A2A !important; }
        .cd-page .text-gray-900 { color: #181A2A !important; }
        .cd-page .text-gray-500 { color: #6B7280 !important; }
        .cd-page .text-gray-400 { color: #9CA3AF !important; }
        .cd-page .text-gray-600 { color: #4B5563 !important; }
        .cd-page .border-gray-900 { border-color: #111827 !important; }
      ` }} />
      <div className="cd-page mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">

        {/* ══════════ 1. HERO SECTION ══════════ */}
        <section className="relative overflow-hidden pt-10 pb-16 sm:pt-14 sm:pb-20 lg:pt-20 lg:pb-28">
          {/* Soft blur gradients */}
          <div aria-hidden className="pointer-events-none absolute -right-40 top-0 h-[600px] w-[600px] rounded-full opacity-30 blur-[150px]" style={{ background: "linear-gradient(135deg, #C084FC, #818CF8)" }} />
          <div aria-hidden className="pointer-events-none absolute -left-40 top-[20%] h-[500px] w-[500px] rounded-full opacity-25 blur-[130px]" style={{ background: "linear-gradient(135deg, #FF8A00, #EC4899)" }} />
          <div aria-hidden className="pointer-events-none absolute right-[30%] -top-20 h-[300px] w-[300px] rounded-full opacity-20 blur-[100px]" style={{ background: "linear-gradient(135deg, #06B6D4, #10B981)" }} />

          <div className="relative">
            {/* Breadcrumb */}
            <motion.div {...fadeUp(0)} className="mb-6">
              <NextLink href="/courses" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 transition-colors">
                <ArrowLeft className="h-3.5 w-3.5" /> Home / Courses / {course.title}
              </NextLink>
            </motion.div>

            {/* Two column grid */}
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              {/* LEFT — Text content */}
              <motion.div {...fadeUp(0.1)}>
                {/* Category badge */}
                <div className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em]" style={{ background: "#F0EDFF", color: "#6D5BFF", border: "1px solid #E0DBFF" }}>
                  <span className="text-base">{course.emoji}</span>
                  {course.category} &middot; {course.level}
                  {course.badge && <span className="ml-1 rounded-full bg-[#6D5BFF] px-2.5 py-0.5 text-[10px] font-bold text-white">{course.badge}</span>}
                </div>

                {/* Title */}
                <h1 className="text-[40px] font-extrabold leading-[1.08] tracking-tight text-[#181A2A] sm:text-[52px] lg:text-[64px]">
                  {course.title}
                </h1>

                {/* Description */}
                <p className="mt-5 max-w-lg text-base leading-relaxed text-gray-500 sm:text-lg" style={{ lineHeight: "1.7" }}>
                  {course.longDescription}
                </p>

                {/* Stats row */}
                <div className="mt-8 flex flex-wrap gap-6">
                  {[
                    { icon: Clock, value: course.duration, label: "Duration" },
                    { icon: BookOpen, value: `${course.modules}+`, label: "Modules" },
                    { icon: Users, value: course.students, label: "Students" },
                    { icon: Star, value: "4.9", label: "Rating" },
                  ].map((s) => (
                    <div key={s.label} className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: "#F0EDFF" }}>
                        <s.icon className="h-[18px] w-[18px]" style={{ color: "#6D5BFF" }} />
                      </div>
                      <div>
                        <span className="block text-sm font-bold text-[#181A2A]">{s.value}</span>
                        <span className="block text-xs text-gray-400">{s.label}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA buttons */}
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <button className="group inline-flex items-center gap-2.5 rounded-[14px] bg-[#6D5BFF] px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-purple-500/30 hover:brightness-110">
                    <Sparkles className="h-4 w-4" />
                    Enroll Now — {course.price}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                  <button className="group inline-flex items-center gap-2.5 rounded-[14px] border border-[#ECECEC] bg-white px-8 py-4 text-sm font-semibold text-[#181A2A] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                    <Play className="h-4 w-4 fill-[#6D5BFF] text-[#6D5BFF]" />
                    Watch Preview
                  </button>
                </div>
              </motion.div>

              {/* RIGHT — SVG Illustration */}
              <motion.div {...fadeUp(0.25)} className="relative">
                <HeroSVG />
              </motion.div>
            </div>
          </div>
        </section>


        {/* ══════════ 2. ABOUT THIS COURSE ══════════ */}
        <section className="py-20 lg:py-24" style={{ background: "#FCFCFD" }}>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_380px]">
            {/* Left — Long text */}
            <motion.div {...fadeUp()}>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ background: "#FEF3C7", color: "#92400E", border: "1px solid #FDE68A" }}>
                <GraduationCap className="h-3.5 w-3.5" />
                About This Course
              </div>
              <h2 className="text-[32px] font-bold leading-tight text-[#181A2A] lg:text-[42px]">About This Course</h2>
              <div className="mt-6 space-y-5 max-w-[650px]" style={{ lineHeight: "1.8" }}>
                <p className="text-[16px] text-gray-500 lg:text-[18px]">{course.aboutText}</p>
              </div>
            </motion.div>

            {/* Right — Checklist + Feature cards */}
            <motion.div {...fadeUp(0.15)} className="space-y-6">
              {/* Perfect For card */}
              <div className="rounded-3xl border p-6" style={{ background: "#FFFFFF", borderColor: "#ECECEC" }}>
                <h3 className="mb-4 text-[16px] font-bold text-[#181A2A]">This Course is Perfect For</h3>
                <ul className="space-y-3">
                  {course.audience.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-[14px] text-gray-600">
                      <span className="h-2 w-2 rounded-full bg-[#6D5BFF]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Feature cards 2x2 */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: GraduationCap, title: "Beginner Friendly", desc: "Start from zero, no prior experience needed" },
                  { icon: Code, title: "Hands-on Projects", desc: "Build real projects throughout the course" },
                  { icon: Users, title: "Industry Mentor", desc: "Get guidance from experienced professionals" },
                  { icon: Award, title: "Certificate Included", desc: "Verified certificate on completion" },
                ].map((f) => (
                  <div key={f.title} className="rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md" style={{ background: "#FFFFFF", borderColor: "#ECECEC" }}>
                    <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: "#F0EDFF" }}>
                      <f.icon className="h-4 w-4" style={{ color: "#6D5BFF" }} />
                    </div>
                    <h4 className="text-[13px] font-bold text-[#181A2A]">{f.title}</h4>
                    <p className="mt-0.5 text-[11px] text-gray-400 leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>


        {/* ══════════ 3. WHAT YOU WILL LEARN ══════════ */}
        <section className="py-20 lg:py-24">
          <div className="text-center">
            <motion.div {...fadeUp()}>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ background: "#F0EDFF", color: "#6D5BFF", border: "1px solid #E0DBFF" }}>
                <Zap className="h-3.5 w-3.5" />
                Learning Roadmap
              </div>
              <h2 className="text-[32px] font-bold text-[#181A2A] lg:text-[42px]">What You Will Learn</h2>
              <p className="mx-auto mt-3 max-w-xl text-[16px] text-gray-500">A step-by-step roadmap from fundamentals to advanced mastery, designed to make you job-ready.</p>
            </motion.div>
          </div>

          {/* Horizontal roadmap with dotted connector */}
          <motion.div {...fadeUp(0.1)} className="relative mt-14">
            {/* Dotted line connecting all modules */}
            <div className="absolute top-[36px] left-[6%] right-[6%] hidden lg:block" style={{ borderTop: "2px dashed #E0DBFF" }} />

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
              {course.topics.map((topic, i) => (
                <motion.div
                  key={topic}
                  {...stagger(i * 0.06)}
                  className="group flex flex-col items-center text-center"
                >
                  {/* Circle icon */}
                  <div className="relative z-10 flex h-[72px] w-[72px] items-center justify-center rounded-full border-2 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-purple-500/15" style={{ background: "#FFFFFF", borderColor: "#E0DBFF" }}>
                    <span className="text-lg font-bold text-[#6D5BFF]">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  {/* Label */}
                  <h4 className="mt-3 text-[12px] font-semibold leading-tight text-[#181A2A]">{topic}</h4>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>


        {/* ══════════ 4. TECH STACK ══════════ */}
        <section className="py-20 lg:py-24" style={{ background: "#FCFCFD" }}>
          <div className="text-center">
            <motion.div {...fadeUp()}>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ background: "#CCFBF1", color: "#065F46", border: "1px solid #A7F3D0" }}>
                <BookOpen className="h-3.5 w-3.5" />
                Tools &amp; Technologies
              </div>
              <h2 className="text-[32px] font-bold text-[#181A2A] lg:text-[42px]">Tech Stack You Will Master</h2>
              <p className="mx-auto mt-3 max-w-xl text-[16px] text-gray-500">Industry-standard tools used by top companies worldwide.</p>
            </motion.div>
          </div>

          <motion.div {...fadeUp(0.1)} className="mt-10 flex flex-wrap justify-center gap-3">
            {course.techStack.map((tech, i) => (
              <motion.div
                key={tech.name}
                {...stagger(i * 0.04)}
                className="flex items-center gap-3 rounded-full border px-5 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                style={{ background: "#FFFFFF", borderColor: "#ECECEC" }}
              >
                <span className="h-3 w-3 rounded-full" style={{ background: tech.color }} />
                <span className="text-[14px] font-semibold text-[#181A2A]">{tech.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </section>


        {/* ══════════ 5. REAL PROJECTS ══════════ */}
        <section className="py-20 lg:py-24">
          <div className="text-center">
            <motion.div {...fadeUp()}>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ background: "#FCE7F3", color: "#9D174D", border: "1px solid #FBCFE8" }}>
                <Zap className="h-3.5 w-3.5" />
                Hands-On
              </div>
              <h2 className="text-[32px] font-bold text-[#181A2A] lg:text-[42px]">Real Projects You Will Build</h2>
              <p className="mx-auto mt-3 max-w-xl text-[16px] text-gray-500">Build a portfolio of real projects that impress employers and clients.</p>
            </motion.div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {course.projects.map((project, i) => {
              const IconComp = PROJECT_ICONS[project.icon] || FileText;
              return (
                <motion.div
                  key={project.name}
                  {...stagger(i * 0.06)}
                  className="group rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  style={{ background: "#FFFFFF", borderColor: "#ECECEC" }}
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: "#F0EDFF" }}>
                    <IconComp className="h-5 w-5" style={{ color: "#6D5BFF" }} />
                  </div>
                  <h3 className="text-[16px] font-bold text-[#181A2A]">{project.name}</h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-gray-500">{project.description}</p>
                </motion.div>
              );
            })}
          </div>
        </section>


        {/* ══════════ 6. COURSE HIGHLIGHTS ══════════ */}
        <section className="py-20 lg:py-24" style={{ background: "#FCFCFD" }}>
          <div className="text-center">
            <motion.div {...fadeUp()}>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ background: "#EDE9FE", color: "#5B21B6", border: "1px solid #DDD6FE" }}>
                <Star className="h-3.5 w-3.5" />
                Highlights
              </div>
              <h2 className="text-[32px] font-bold text-[#181A2A] lg:text-[42px]">Why This Course Stands Out</h2>
            </motion.div>
          </div>

          {/* Stats row */}
          <motion.div {...fadeUp(0.1)} className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {course.highlights.map((h) => (
              <div key={h.label} className="rounded-3xl border bg-white p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md" style={{ borderColor: "#ECECEC" }}>
                <p className="text-[36px] font-extrabold text-[#6D5BFF]">{h.value}</p>
                <p className="mt-1 text-[14px] text-gray-500">{h.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Feature icons row */}
          <motion.div {...fadeUp(0.2)} className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[
              { icon: Award, label: "Certificate" },
              { icon: Infinity, label: "Lifetime Access" },
              { icon: Headphones, label: "Mentor Support" },
              { icon: Briefcase, label: "Interview Preparation" },
            ].map((f) => (
              <div key={f.label} className="rounded-3xl border bg-white p-6 flex flex-col items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-md" style={{ borderColor: "#ECECEC" }}>
                <f.icon className="h-6 w-6" style={{ color: "#6D5BFF" }} />
                <span className="text-[14px] font-semibold text-[#181A2A]">{f.label}</span>
              </div>
            ))}
          </motion.div>
        </section>


        {/* ══════════ 7. CTA BANNER ══════════ */}
        <section className="py-16 lg:py-20">
          <motion.div
            {...fadeUp()}
            className="relative overflow-hidden rounded-[28px] p-8 sm:p-12 lg:p-16"
            style={{ background: "linear-gradient(135deg, #181A2A 0%, #2D1B69 50%, #181A2A 100%)" }}
          >
            {/* Decorative blur */}
            <div aria-hidden className="pointer-events-none absolute -right-20 top-0 h-[400px] w-[400px] rounded-full opacity-20 blur-[100px]" style={{ background: "#6D5BFF" }} />
            <div aria-hidden className="pointer-events-none absolute -left-20 bottom-0 h-[300px] w-[300px] rounded-full opacity-15 blur-[80px]" style={{ background: "#FF8A00" }} />

            <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
              {/* Left — Text */}
              <div>
                <h2 className="text-[28px] font-bold leading-tight text-white sm:text-[36px] lg:text-[42px]">
                  Ready to start your journey in <span className="bg-gradient-to-r from-[#A78BFA] to-[#FF8A00] bg-clip-text text-transparent">{course.title}?</span>
                </h2>
                <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-gray-400">
                  Join {course.students} students already building their future with this course. No experience needed — we start from the basics.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <button className="group inline-flex items-center gap-2.5 rounded-[14px] bg-[#6D5BFF] px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:brightness-110">
                    <Sparkles className="h-4 w-4" />
                    Enroll Now — {course.price}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                  <button className="inline-flex items-center gap-2.5 rounded-[14px] border border-white/20 px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10">
                    <Download className="h-4 w-4" />
                    Download Syllabus
                  </button>
                </div>
              </div>

              {/* Right — AI Chip SVG */}
              <div className="flex justify-center">
                <CTAChipSVG />
              </div>
            </div>
          </motion.div>
        </section>


        {/* ══════════ 8. FAQ ══════════ */}
        <section className="py-20 lg:py-24" style={{ background: "#FCFCFD" }}>
          <div className="text-center">
            <motion.div {...fadeUp()}>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ background: "#EDE9FE", color: "#5B21B6", border: "1px solid #DDD6FE" }}>
                <HelpCircle className="h-3.5 w-3.5" />
                FAQ
              </div>
              <h2 className="text-[32px] font-bold text-[#181A2A] lg:text-[42px]">Frequently Asked Questions</h2>
            </motion.div>
          </div>

          <motion.div {...fadeUp(0.1)} className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-2">
            {FAQ_DATA.map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl border transition-all duration-300 hover:shadow-sm cursor-pointer"
                style={{ background: "#FFFFFF", borderColor: "#ECECEC" }}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <div className="flex items-center justify-between p-5">
                  <h3 className="text-[14px] font-semibold text-[#181A2A] pr-4">{faq.q}</h3>
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors" style={{ background: openFaq === i ? "#F0EDFF" : "#F5F5F5" }}>
                    {openFaq === i ? (
                      <ChevronUp className="h-4 w-4" style={{ color: "#6D5BFF" }} />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                </div>
                {openFaq === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-[14px] leading-relaxed text-gray-500">{faq.a}</p>
                  </motion.div>
                )}
              </div>
            ))}
          </motion.div>
        </section>

      </div>
    </main>
  );
}
