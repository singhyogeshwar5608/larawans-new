import type { LucideIcon } from "lucide-react";
import {
  Bot,
  Boxes,
  Users,
  Globe,
  Smartphone,
  Apple,
  Palette,
  Cloud,
  ShoppingBag,
  Megaphone,
  Search,
  Sparkles,
  MessageSquare,
  Mic,
  Workflow,
  FileText,
  Headphones,
  Database,
  ShieldCheck,
  GraduationCap,
  HeartPulse,
  Factory,
  Store,

  Truck,
  Building2,
  Banknote,
  Compass,
  Layers,
  PenTool,
  Code2,
  TestTube,
  Rocket,
  LifeBuoy,
  type LucideProps,
} from "lucide-react";

export type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
  accent: string; // tailwind gradient stops as inline style
  tags: string[];
};

export const services: Service[] = [
  {
    title: "AI Agent Development",
    description:
      "Autonomous AI agents that handle support, sales, research, and operations — trained on your data, deployed across chat, voice, and email.",
    icon: Bot,
    accent: "linear-gradient(135deg,#7c5cff 0%,#00e0c6 100%)",
    tags: ["LLM", "RAG", "Voice"],
  },
  {
    title: "Custom ERP Software",
    description:
      "Modular ERP systems covering finance, HR, inventory, procurement, and analytics — engineered to fit your operating model end-to-end.",
    icon: Boxes,
    accent: "linear-gradient(135deg,#00e0ff 0%,#7c5cff 100%)",
    tags: ["Modules", "Multi-branch", "Reports"],
  },
  {
    title: "CRM Development",
    description:
      "Sales-grade CRMs with pipelines, automations, and AI insights that help teams close faster while keeping every interaction in context.",
    icon: Users,
    accent: "linear-gradient(135deg,#ff4dd2 0%,#7c5cff 100%)",
    tags: ["Pipelines", "Automation", "AI"],
  },
  {
    title: "Website Development",
    description:
      "High-performance marketing sites and web platforms built on Next.js & Laravel — fast, SEO-ready, and conversion-focused.",
    icon: Globe,
    accent: "linear-gradient(135deg,#00e0c6 0%,#4dc4ff 100%)",
    tags: ["Next.js", "Laravel", "SEO"],
  },
  {
    title: "Android App",
    description:
      "Native and cross-platform Android apps with offline support, push, payments, and analytics baked in from day one.",
    icon: Smartphone,
    accent: "linear-gradient(135deg,#9dff5c 0%,#00e0c6 100%)",
    tags: ["Kotlin", "Flutter", "Native"],
  },
  {
    title: "iOS App",
    description:
      "Polished iOS experiences built with Swift and Flutter, optimised for App Store guidelines, performance, and accessibility.",
    icon: Apple,
    accent: "linear-gradient(135deg,#7c5cff 0%,#ff4dd2 100%)",
    tags: ["Swift", "Flutter", "App Store"],
  },
  {
    title: "UI/UX Design",
    description:
      "Research-driven product design — wireframes, design systems, prototypes, and motion that turn ideas into delightful interfaces.",
    icon: Palette,
    accent: "linear-gradient(135deg,#ffb14d 0%,#ff4dd2 100%)",
    tags: ["Figma", "Design System", "Motion"],
  },
  {
    title: "SaaS Development",
    description:
      "Multi-tenant SaaS platforms with billing, RBAC, dashboards, and APIs — built to scale from MVP to millions of requests.",
    icon: Cloud,
    accent: "linear-gradient(135deg,#4dc4ff 0%,#7c5cff 100%)",
    tags: ["Multi-tenant", "Billing", "API"],
  },
  {
    title: "E-Commerce",
    description:
      "Conversion-engineered storefronts on Shopify, WooCommerce, and custom stacks — with headless CMS and one-tap checkout.",
    icon: ShoppingBag,
    accent: "linear-gradient(135deg,#00e0c6 0%,#9dff5c 100%)",
    tags: ["Headless", "Payments", "CMS"],
  },
  {
    title: "Digital Marketing",
    description:
      "Full-funnel growth — paid social, search, content, and lifecycle marketing engineered around measurable ROI.",
    icon: Megaphone,
    accent: "linear-gradient(135deg,#ff4dd2 0%,#ffb14d 100%)",
    tags: ["Paid", "Content", "Lifecycle"],
  },
  {
    title: "SEO",
    description:
      "Technical, on-page, and programmatic SEO that compounds — schema, core web vitals, and content clusters built to rank.",
    icon: Search,
    accent: "linear-gradient(135deg,#7c5cff 0%,#4dc4ff 100%)",
    tags: ["Technical", "Content", "Schema"],
  },
  {
    title: "Branding",
    description:
      "Brand strategy, identity systems, and visual language that make your company impossible to ignore in a crowded market.",
    icon: Sparkles,
    accent: "linear-gradient(135deg,#ffb14d 0%,#7c5cff 100%)",
    tags: ["Strategy", "Identity", "Guidelines"],
  },
];

export type Industry = { name: string; icon: LucideIcon; blurb: string };
export const industries: Industry[] = [
  { name: "Insurance", icon: ShieldCheck, blurb: "Policy, claims & underwriting automation." },
  { name: "Education", icon: GraduationCap, blurb: "LMS, ERP & student engagement platforms." },
  { name: "Healthcare", icon: HeartPulse, blurb: "HIPAA-ready EMR, telehealth & scheduling." },
  { name: "Manufacturing", icon: Factory, blurb: "MES, inventory & shop-floor analytics." },
  { name: "Retail", icon: Store, blurb: "Omnichannel POS, loyalty & merchandising." },
  { name: "Logistics", icon: Truck, blurb: "Fleet, route optimisation & TMS platforms." },
  { name: "Real Estate", icon: Building2, blurb: "Listings, CRM & investor portals." },
  { name: "Finance", icon: Banknote, blurb: "Lending, fintech & compliance systems." },
];

export type AISolution = { title: string; description: string; icon: LucideIcon };
export const aiSolutions: AISolution[] = [
  {
    title: "AI Chatbots",
    description:
      "Conversational assistants trained on your knowledge base — deployed across web, WhatsApp, and Slack with human handoff.",
    icon: MessageSquare,
  },
  {
    title: "AI Voice Agents",
    description:
      "Natural-sounding voice agents that handle inbound & outbound calls, schedule meetings, and qualify leads 24/7.",
    icon: Mic,
  },
  {
    title: "AI Automation",
    description:
      "Workflow automation that connects your stack — invoices, approvals, emails, and data entry handled without humans.",
    icon: Workflow,
  },
  {
    title: "AI Document Processing",
    description:
      "OCR + LLM pipelines that extract, classify, and validate data from invoices, KYC, contracts, and forms at scale.",
    icon: FileText,
  },
  {
    title: "AI CRM",
    description:
      "CRM with built-in intelligence — lead scoring, next-best-action, sentiment, and auto-summary on every deal.",
    icon: Database,
  },
  {
    title: "AI Customer Support",
    description:
      "Tier-1 support resolved by AI with full context — agent copilot, ticket triage, and SLA-aware escalation.",
    icon: Headphones,
  },
];

export type ProcessStep = { title: string; description: string; icon: LucideIcon };
export const processSteps: ProcessStep[] = [
  {
    title: "Discovery",
    description:
      "We dive deep into your business, users, and goals to map the right problem before writing a single line of code.",
    icon: Compass,
  },
  {
    title: "Planning",
    description:
      "Architecture, milestones, and tech stack decisions are locked in with a clear roadmap and weekly delivery cadence.",
    icon: Layers,
  },
  {
    title: "UI/UX",
    description:
      "Wireframes evolve into interactive Figma prototypes, validated with real users before development begins.",
    icon: PenTool,
  },
  {
    title: "Development",
    description:
      "Sprints with clean, tested code — daily demos, GitHub transparency, and continuous integration from week one.",
    icon: Code2,
  },
  {
    title: "Testing",
    description:
      "Automated unit, integration, and end-to-end tests plus manual QA across devices, browsers, and edge cases.",
    icon: TestTube,
  },
  {
    title: "Deployment",
    description:
      "Zero-downtime CI/CD to AWS / Azure / GCP with monitoring, alerts, and rollback baked into the pipeline.",
    icon: Rocket,
  },
  {
    title: "Support",
    description:
      "SLA-backed maintenance, performance tuning, and ongoing feature work — we stay long after launch day.",
    icon: LifeBuoy,
  },
];

export type Project = {
  title: string;
  category: string;
  description: string;
  tags: string[];
  accent: string;
};
export const projects: Project[] = [
  {
    title: "Insurance ERP",
    category: "Enterprise Platform",
    description:
      "End-to-end policy, claims, and reinsurance platform for a regional insurer — 8x faster claim turnaround.",
    tags: ["Laravel", "Next.js", "AWS"],
    accent: "linear-gradient(135deg,#7c5cff 0%,#00e0c6 100%)",
  },
  {
    title: "Business Marketplace",
    category: "Two-Sided Platform",
    description:
      "Multi-vendor B2B marketplace with escrow, ratings, and AI-powered matching for buyers and sellers.",
    tags: ["Next.js", "Stripe", "AI"],
    accent: "linear-gradient(135deg,#00e0ff 0%,#7c5cff 100%)",
  },
  {
    title: "Education ERP",
    category: "EdTech",
    description:
      "LMS + ERP hybrid serving 60k+ students — admissions, fees, exams, and parent portal in one platform.",
    tags: ["Laravel", "Flutter", "MySQL"],
    accent: "linear-gradient(135deg,#ff4dd2 0%,#7c5cff 100%)",
  },
  {
    title: "Hospital Management",
    category: "Healthcare",
    description:
      "HIPAA-ready HIS with EMR, OPD/IPD, pharmacy, lab, and insurance modules deployed across 12 hospitals.",
    tags: ["Next.js", ".NET", "Azure"],
    accent: "linear-gradient(135deg,#00e0c6 0%,#4dc4ff 100%)",
  },
  {
    title: "Restaurant POS",
    category: "Retail / F&B",
    description:
      "Offline-first POS with KOT, table management, kitchen display, and consolidated reporting for 200+ outlets.",
    tags: ["Flutter", "Node.js", "PostgreSQL"],
    accent: "linear-gradient(135deg,#9dff5c 0%,#00e0c6 100%)",
  },
  {
    title: "Inventory ERP",
    category: "Supply Chain",
    description:
      "Multi-warehouse inventory ERP with barcode, batch tracking, demand forecasting, and supplier portal.",
    tags: ["Laravel", "React", "Docker"],
    accent: "linear-gradient(135deg,#7c5cff 0%,#ff4dd2 100%)",
  },
  {
    title: "Manufacturing ERP",
    category: "Industry 4.0",
    description:
      "MES + ERP for a precision manufacturer — BOM, MRP, shop floor IoT, and real-time OEE dashboards.",
    tags: ["Next.js", "Python", "AWS"],
    accent: "linear-gradient(135deg,#ffb14d 0%,#7c5cff 100%)",
  },
  {
    title: "HRMS",
    category: "People Ops",
    description:
      "Modern HRMS with payroll, leave, performance, and AI-powered resume parsing for 5k+ employee orgs.",
    tags: ["Laravel", "React", "MySQL"],
    accent: "linear-gradient(135deg,#4dc4ff 0%,#00e0c6 100%)",
  },
  {
    title: "CRM",
    category: "Sales Tech",
    description:
      "Sales CRM with pipelines, AI lead scoring, WhatsApp integration, and real-time revenue forecasting.",
    tags: ["Next.js", "Node.js", "AI"],
    accent: "linear-gradient(135deg,#7c5cff 0%,#ffb14d 100%)",
  },
];

export type Stat = { value: number; suffix: string; label: string };
export const stats: Stat[] = [
  { value: 250, suffix: "+", label: "Clients Worldwide" },
  { value: 420, suffix: "+", label: "Projects Delivered" },
  { value: 12, suffix: "+", label: "Years of Experience" },
  { value: 99, suffix: "%", label: "Client Satisfaction" },
];

export type TechItem = { name: string; color: string };
export const techStack: TechItem[] = [
  { name: "Laravel", color: "#FF2D20" },
  { name: "React", color: "#61DAFB" },
  { name: "Next.js", color: "#FFFFFF" },
  { name: "Flutter", color: "#02569B" },
  { name: "Node.js", color: "#83CD29" },
  { name: "Python", color: "#3776AB" },
  { name: ".NET", color: "#512BD4" },
  { name: "Docker", color: "#2496ED" },
  { name: "AWS", color: "#FF9900" },
  { name: "Azure", color: "#0078D4" },
  { name: "Firebase", color: "#FFCA28" },
  { name: "MySQL", color: "#4479A1" },
  { name: "PostgreSQL", color: "#4169E1" },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  accent: string;
};
export const testimonials: Testimonial[] = [
  {
    quote:
      "Larawans rebuilt our insurance platform in 5 months. Claim turnaround dropped from 9 days to under 30 hours. Their AI agent now handles 70% of tier-1 queries on its own.",
    name: "Rajiv Menon",
    role: "CTO",
    company: "Continental Insurance",
    initials: "RM",
    accent: "linear-gradient(135deg,#7c5cff,#00e0c6)",
  },
  {
    quote:
      "We shipped our SaaS MVP in 11 weeks instead of 9 months. The team's product sense is sharper than most Bay Area agencies we've worked with — and the code is clean.",
    name: "Anita Sharma",
    role: "Founder & CEO",
    company: "Flowmetric",
    initials: "AS",
    accent: "linear-gradient(135deg,#ff4dd2,#7c5cff)",
  },
  {
    quote:
      "Their AI voice agent now books 200+ appointments a day for our clinic network. We cut front-desk cost by 42% without losing the human touch on complex cases.",
    name: "Dr. Karun Pillai",
    role: "Director",
    company: "Meridian Health",
    initials: "KP",
    accent: "linear-gradient(135deg,#00e0c6,#4dc4ff)",
  },
  {
    quote:
      "The ERP they built handles 7 warehouses, 3 factories, and 600+ SKUs without breaking a sweat. Real-time dashboards changed how our ops team makes decisions.",
    name: "Vikram Reddy",
    role: "COO",
    company: "Anvil Industries",
    initials: "VR",
    accent: "linear-gradient(135deg,#ffb14d,#ff4dd2)",
  },
  {
    quote:
      "From branding to the mobile app, Larawans owned the entire digital experience. Our App Store rating went from 3.1 to 4.7 within two release cycles.",
    name: "Sarah Okafor",
    role: "Head of Product",
    company: "Nomad Retail",
    initials: "SO",
    accent: "linear-gradient(135deg,#9dff5c,#00e0c6)",
  },
  {
    quote:
      "Their SEO and content engine tripled our organic traffic in 6 months — and it actually converted. Pipeline is up 240% YoY and we finally trust marketing analytics.",
    name: "Daniel Brooks",
    role: "VP Growth",
    company: "Northwind SaaS",
    initials: "DB",
    accent: "linear-gradient(135deg,#4dc4ff,#7c5cff)",
  },
];

export type FAQ = { q: string; a: string };
export const faqs: FAQ[] = [
  {
    q: "What makes Larawans Digital an AI-first company?",
    a: "Every project we ship is designed around AI from day one — not bolted on later. Whether it's an ERP with AI-powered forecasting, a CRM with automated lead scoring, or a customer-facing chatbot, our default architecture includes LLMs, RAG, and automation layers. This means your software gets smarter as you use it, without expensive rebuilds down the line.",
  },
  {
    q: "How long does a typical project take?",
    a: "Marketing websites ship in 3–6 weeks. Mobile apps take 10–16 weeks. ERP and SaaS platforms usually run 4–9 months depending on scope. We work in 2-week sprints with demos every Friday, so you see working software continuously — never a black box for months on end.",
  },
  {
    q: "Do you work with startups or only enterprises?",
    a: "Both. We've bootstrapped MVPs for pre-seed founders and rebuilt platforms for publicly listed enterprises. Our engagement models flex accordingly — fixed-scope for MVPs, dedicated squads for scale-ups, and managed teams for enterprises with compliance and SLA requirements.",
  },
  {
    q: "Who owns the source code and IP?",
    a: "You do — 100%. All code, designs, datasets, and infrastructure credentials are transferred to your repositories and accounts on day one. We sign mutual NDAs before any technical discussion and your contract includes an explicit IP assignment clause. We don't hold your software hostage.",
  },
  {
    q: "Can you integrate AI into our existing systems?",
    a: "Yes. Most of our AI engagements start with a 2-week audit of your current stack, then layer in AI agents, RAG pipelines, or automation on top — without ripping out what works. We've integrated AI into legacy Laravel, .NET, SAP, and custom ERPs for clients across insurance, healthcare, and manufacturing.",
  },
  {
    q: "What happens after launch?",
    a: "Every project ships with 90 days of complimentary support covering bugs, monitoring, and minor adjustments. After that, we offer flexible SLA-backed retainers (basic / growth / enterprise) that include feature work, performance tuning, security patching, and a dedicated success manager.",
  },
  {
    q: "How do you handle data security and compliance?",
    a: "We follow ISO 27001-aligned practices: encrypted at rest and in transit, least-privilege access, audit logs, and segregated environments. For healthcare we build HIPAA-ready systems; for finance we implement PCI-DSS controls; for EU clients we're fully GDPR compliant. We'll sign BAAs and DPAs as needed.",
  },
  {
    q: "What's your pricing model?",
    a: "We offer three: fixed-scope (for well-defined MVPs and websites), time-and-materials (for evolving products), and dedicated squads (for ongoing product development). Most engagements start at $8k for a website, $35k for an MVP, and $120k+ for full platforms. Book a free consultation for an exact quote.",
  },
];
