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
  slug: string;
  description: string;
  icon: LucideIcon;
  accent: string; // tailwind gradient stops as inline style
  tags: string[];
};

export const services: Service[] = [
  {
    title: "AI Agent Development",
    slug: "ai-agent-development",
    description:
      "Autonomous AI agents that handle support, sales, research, and operations — trained on your data, deployed across chat, voice, and email.",
    icon: Bot,
    accent: "linear-gradient(135deg,#7c5cff 0%,#00e0c6 100%)",
    tags: ["LLM", "RAG", "Voice"],
  },
  {
    title: "Custom ERP Software",
    slug: "custom-erp-software",
    description:
      "Modular ERP systems covering finance, HR, inventory, procurement, and analytics — engineered to fit your operating model end-to-end.",
    icon: Boxes,
    accent: "linear-gradient(135deg,#00e0ff 0%,#7c5cff 100%)",
    tags: ["Modules", "Multi-branch", "Reports"],
  },
  {
    title: "CRM Development",
    slug: "crm-development",
    description:
      "Sales-grade CRMs with pipelines, automations, and AI insights that help teams close faster while keeping every interaction in context.",
    icon: Users,
    accent: "linear-gradient(135deg,#ff4dd2 0%,#7c5cff 100%)",
    tags: ["Pipelines", "Automation", "AI"],
  },
  {
    title: "Website Development",
    slug: "website-development",
    description:
      "High-performance marketing sites and web platforms built on Next.js & Laravel — fast, SEO-ready, and conversion-focused.",
    icon: Globe,
    accent: "linear-gradient(135deg,#00e0c6 0%,#4dc4ff 100%)",
    tags: ["Next.js", "Laravel", "SEO"],
  },
  {
    title: "Android App",
    slug: "android-app",
    description:
      "Native and cross-platform Android apps with offline support, push, payments, and analytics baked in from day one.",
    icon: Smartphone,
    accent: "linear-gradient(135deg,#9dff5c 0%,#00e0c6 100%)",
    tags: ["Kotlin", "Flutter", "Native"],
  },
  {
    title: "iOS App",
    slug: "ios-app",
    description:
      "Polished iOS experiences built with Swift and Flutter, optimised for App Store guidelines, performance, and accessibility.",
    icon: Apple,
    accent: "linear-gradient(135deg,#7c5cff 0%,#ff4dd2 100%)",
    tags: ["Swift", "Flutter", "App Store"],
  },
  {
    title: "UI/UX Design",
    slug: "ui-ux-design",
    description:
      "Research-driven product design — wireframes, design systems, prototypes, and motion that turn ideas into delightful interfaces.",
    icon: Palette,
    accent: "linear-gradient(135deg,#ffb14d 0%,#ff4dd2 100%)",
    tags: ["Figma", "Design System", "Motion"],
  },
  {
    title: "SaaS Development",
    slug: "saas-development",
    description:
      "Multi-tenant SaaS platforms with billing, RBAC, dashboards, and APIs — built to scale from MVP to millions of requests.",
    icon: Cloud,
    accent: "linear-gradient(135deg,#4dc4ff 0%,#7c5cff 100%)",
    tags: ["Multi-tenant", "Billing", "API"],
  },
  {
    title: "E-Commerce",
    slug: "e-commerce",
    description:
      "Conversion-engineered storefronts on Shopify, WooCommerce, and custom stacks — with headless CMS and one-tap checkout.",
    icon: ShoppingBag,
    accent: "linear-gradient(135deg,#00e0c6 0%,#9dff5c 100%)",
    tags: ["Headless", "Payments", "CMS"],
  },
  {
    title: "Digital Marketing",
    slug: "digital-marketing",
    description:
      "Full-funnel growth — paid social, search, content, and lifecycle marketing engineered around measurable ROI.",
    icon: Megaphone,
    accent: "linear-gradient(135deg,#ff4dd2 0%,#ffb14d 100%)",
    tags: ["Paid", "Content", "Lifecycle"],
  },
  {
    title: "SEO",
    slug: "seo",
    description:
      "Technical, on-page, and programmatic SEO that compounds — schema, core web vitals, and content clusters built to rank.",
    icon: Search,
    accent: "linear-gradient(135deg,#7c5cff 0%,#4dc4ff 100%)",
    tags: ["Technical", "Content", "Schema"],
  },
  {
    title: "Branding",
    slug: "branding",
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

export type ImpactMetric = {
  label: string;
  value: string;
  badge: string;
};

export type FeatureItem = {
  title: string;
  description: string;
  iconName: string;
};

export type TechDetail = {
  category: string;
  items: { name: string; role: string; version?: string }[];
};

export type ChallengeSolution = {
  challenge: string;
  solution: string;
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  accent: string;
  client: string;
  duration: string;
  year: string;
  location: string;
  impactMetrics: ImpactMetric[];
  overview: string;
  keyFeatures: FeatureItem[];
  techStackDetailed: TechDetail[];
  challengesAndSolutions: ChallengeSolution[];
  workflowSteps: { step: string; title: string; detail: string }[];
  desktopSimulator: {
    appTitle: string;
    url: string;
    sidebar: string[];
    stats: { title: string; val: string; change: string }[];
    tableHeader: string[];
    tableRows: { col1: string; col2: string; col3: string; status: string }[];
  };
  mobileSimulator: {
    screenTitle: string;
    notificationBadge: string;
    primaryCardTitle: string;
    primaryCardVal: string;
    quickActions: string[];
    recentActivity: { title: string; time: string; amount: string; status: string }[];
  };
};

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const projects: Project[] = [
  {
    slug: "pollution-erp",
    title: "Pollution ERP",
    category: "Environment & Compliance",
    description:
      "End-to-end pollution monitoring and compliance management platform — real-time emissions tracking, customer lifecycle management, automated expiry alerts, and integrated payment processing.",
    tags: ["Laravel", "MySQL", "React"],
    accent: "linear-gradient(135deg, #7c5cff 0%, #00e0c6 100%)",
    client: "EcoCompliance Board",
    duration: "4 Months",
    year: "2025",
    location: "California, USA",
    impactMetrics: [
      { label: "Clients Managed", value: "100+", badge: "Enterprise Fleet" },
      { label: "Tracking Uptime", value: "24/7", badge: "Real-Time Sensors" },
      { label: "Regulatory Compliance", value: "98%", badge: "Zero Violations" },
    ],
    overview:
      "EcoCompliance Board required an automated pollution monitoring ERP to aggregate sensor telemetry, manage customer permit lifecycles, send automated expiration notices, and process renewal payments seamlessly.",
    keyFeatures: [
      {
        title: "Real-Time Telemetry Dashboard",
        description: "Live sensor data feeds with threshold alerting and geographical heat maps.",
        iconName: "BarChart",
      },
      {
        title: "Automated Expiry Alerts",
        description: "Intelligent notification engine sending SMS and email renewal alerts before permit expiration.",
        iconName: "Shield",
      },
      {
        title: "Customer Lifecycle Portal",
        description: "Complete self-service portal for industrial clients to apply, track, and pay for compliance certifications.",
        iconName: "Users",
      },
      {
        title: "Integrated Fee Gateway",
        description: "Instant online fee processing with automated digital receipting and compliance ledger sync.",
        iconName: "Zap",
      },
    ],
    techStackDetailed: [
      {
        category: "Frontend & UI",
        items: [
          { name: "React", role: "Real-time Monitoring UI" },
          { name: "Tailwind CSS", role: "Design System & Dashboard Layout" },
        ],
      },
      {
        category: "Backend & ERP",
        items: [
          { name: "Laravel 11", role: "Core API & Permit Engine" },
          { name: "MySQL", role: "Primary Database" },
        ],
      },
      {
        category: "Infrastructure",
        items: [
          { name: "Node.js", role: "WebSocket Sensor Gateway" },
          { name: "Redis", role: "Telemetry Stream Caching" },
        ],
      },
    ],
    challengesAndSolutions: [
      {
        challenge: "Ingesting high-frequency IoT emissions telemetry without database lockups.",
        solution: "Built a Redis stream buffer in Node.js that aggregates sensor pulses before batch writing to MySQL.",
      },
    ],
    workflowSteps: [
      { step: "01", title: "Sensor Telemetry", detail: "IoT devices push emission readings every 10 seconds to central portal." },
      { step: "02", title: "Anomaly Scoring", detail: "Automated threshold checks flag compliance breaches in real time." },
      { step: "03", title: "Automated Alerting", detail: "Expirations and violations trigger instant SMS/email notifications." },
      { step: "04", title: "Renewal & Audit", detail: "Clients renew permits online with instant digital certificate generation." },
    ],
    desktopSimulator: {
      appTitle: "Pollution ERP — Environmental Compliance Console",
      url: "https://compliance.ecoboard.gov/dashboard",
      sidebar: ["Overview", "Live Telemetry", "Clients (100+)", "Expiry Alerts", "Payments", "Audit Logs"],
      stats: [
        { title: "Active Facilities", val: "142", change: "+8 This Month" },
        { title: "Compliance Score", val: "98.4%", change: "Optimal" },
        { title: "Pending Renewals", val: "12", change: "Alerts Sent" },
      ],
      tableHeader: ["Facility ID", "Client Name", "Emission Level", "Permit Status", "Action"],
      tableRows: [
        { col1: "FAC-102", col2: "Apex Manufacturing", col3: "12 PPM (Safe)", status: "Active" },
        { col1: "FAC-103", col2: "BioChem Global", col3: "18 PPM (Safe)", status: "Active" },
        { col1: "FAC-104", col2: "Metro Energy Ltd", col3: "42 PPM (Alert)", status: "Inspection Flagged" },
        { col1: "FAC-105", col2: "Titan Refineries", col3: "15 PPM (Safe)", status: "Renewal Due" },
      ],
    },
    mobileSimulator: {
      screenTitle: "EcoCompliance Portal",
      notificationBadge: "1 Violation Alert",
      primaryCardTitle: "Active Permit #PRM-8820",
      primaryCardVal: "Compliant — Expires in 14 Days",
      quickActions: ["Renew Permit", "View Telemetry", "Download Certificate"],
      recentActivity: [
        { title: "Permit Renewal Payment", time: "Yesterday", amount: "$1,450", status: "Verified" },
        { title: "Quarterly Audit Report", time: "3 days ago", amount: "Passed", status: "Certified" },
      ],
    },
  },
  {
    slug: "insurance-erp",
    title: "Insurance ERP",
    category: "Enterprise Platform",
    description:
      "End-to-end policy, claims, and reinsurance platform for a regional insurer — 8x faster claim turnaround.",
    tags: ["Laravel", "Next.js", "AWS"],
    accent: "linear-gradient(135deg,#7c5cff 0%,#00e0c6 100%)",
    client: "Continental Insurers Ltd",
    duration: "5 Months",
    year: "2025",
    location: "Dubai, UAE",
    impactMetrics: [
      { label: "Claim Turnaround", value: "30 Hours", badge: "8x Speedup" },
      { label: "TIER-1 Queries Automated", value: "72%", badge: "AI Copilot" },
      { label: "Annual Policy Revenue", value: "$42M+", badge: "Zero Loss" },
    ],
    overview:
      "Continental Insurers was struggling with legacy paper-bound claims processing taking 9+ days per policy claim. Larawans engineered a cloud-native Insurance ERP that unifies policy issuance, claims assessment, automated fraud scoring, and multi-currency reinsurance settlement into a single real-time dashboard.",
    keyFeatures: [
      {
        title: "AI Fraud Scoring Engine",
        description: "Real-time automated evaluation of incoming claim documents with predictive risk scoring.",
        iconName: "Shield",
      },
      {
        title: "Automated Policy Issuance",
        description: "Instant quote generation, automated underwriting rules, and digital e-signatures.",
        iconName: "Zap",
      },
      {
        title: "Multi-Currency Reinsurance",
        description: "Automated treaty allocations, bordereaux reporting, and real-time ledger sync.",
        iconName: "Database",
      },
      {
        title: "Omnichannel Customer Portal",
        description: "Self-service mobile and web portal for tracking claims live with instant push updates.",
        iconName: "Users",
      },
    ],
    techStackDetailed: [
      {
        category: "Frontend & UI",
        items: [
          { name: "Next.js 15", role: "App Router & SSR", version: "v15.1" },
          { name: "Tailwind CSS", role: "Design System & Theme", version: "v4.0" },
          { name: "Framer Motion", role: "Micro-interactions" },
        ],
      },
      {
        category: "Backend & Core ERP",
        items: [
          { name: "Laravel 11", role: "Core API & Business Logic", version: "v11.x" },
          { name: "Node.js", role: "Real-time Event Gateway" },
          { name: "PostgreSQL", role: "Primary Transactional DB" },
        ],
      },
      {
        category: "Cloud & Infrastructure",
        items: [
          { name: "AWS ECS", role: "Containerized Microservices" },
          { name: "Redis", role: "Distributed Caching & Queues" },
          { name: "S3 & CloudFront", role: "Secure Document Store" },
        ],
      },
    ],
    challengesAndSolutions: [
      {
        challenge: "Legacy data migration from 15-year-old COBOL databases with zero downtime requirement.",
        solution: "Built custom ETL pipelines using PostgreSQL CDC (Change Data Capture) and Redis queues for lossless live syncing.",
      },
      {
        challenge: "High document processing lag during peak claim periods.",
        solution: "Implemented asynchronous AI document OCR and RAG extraction workers on AWS Lambda, cutting processing from 45 mins to 12 seconds.",
      },
    ],
    workflowSteps: [
      { step: "01", title: "Claim Submission", detail: "Customer uploads photos & police reports via iOS/Android app." },
      { step: "02", title: "AI Triaging", detail: "Vision models extract text, cross-verify policy terms, and flag anomalies." },
      { step: "03", title: "Adjuster Review", detail: "Single-click approval dashboard with automated payout trigger." },
      { step: "04", title: "Settlement", detail: "Instant bank transfer via Stripe/FastPay integration & bordereaux update." },
    ],
    desktopSimulator: {
      appTitle: "Continental Insurance ERP — Executive Portal",
      url: "https://erp.continental-insure.com/claims/dashboard",
      sidebar: ["Overview", "Policies", "Claims (14 Active)", "Fraud Alerts", "Reinsurance", "Reports"],
      stats: [
        { title: "Active Policies", val: "128,450", change: "+14.2% MoM" },
        { title: "Avg Claim Speed", val: "1.2 Days", change: "82% Faster" },
        { title: "Payout Loss Ratio", val: "48.2%", change: "Optimal" },
      ],
      tableHeader: ["Claim ID", "Policy Holder", "Amount", "AI Risk Score", "Status"],
      tableRows: [
        { col1: "CLM-9042", col2: "Sarah Jenkins", col3: "$4,250.00", status: "Low Risk (98%)" },
        { col1: "CLM-9043", col2: "Apex Logistics LLC", col3: "$38,900.00", status: "Approved" },
        { col1: "CLM-9044", col2: "David Miller", col3: "$1,800.00", status: "Under Review" },
        { col1: "CLM-9045", col2: "Global Express", col3: "$12,400.00", status: "Fast-Tracked" },
      ],
    },
    mobileSimulator: {
      screenTitle: "Continental Claims",
      notificationBadge: "2 Updates",
      primaryCardTitle: "Active Claim #CLM-9042",
      primaryCardVal: "$4,250.00 Approved",
      quickActions: ["File New Claim", "Policy Cards", "Roadside Help"],
      recentActivity: [
        { title: "Vehicle Repair Invoice", time: "10 mins ago", amount: "$4,250", status: "Paid" },
        { title: "Annual Premium Renewal", time: "2 days ago", amount: "$850", status: "Auto-Debited" },
      ],
    },
  },
  {
    slug: "business-marketplace",
    title: "Business Marketplace",
    category: "Two-Sided Platform",
    description:
      "Multi-vendor B2B marketplace with escrow, ratings, and AI-powered matching for buyers and sellers.",
    tags: ["Next.js", "Stripe", "AI"],
    accent: "linear-gradient(135deg,#00e0ff 0%,#7c5cff 100%)",
    client: "TradeLink Global",
    duration: "4 Months",
    year: "2025",
    location: "Singapore",
    impactMetrics: [
      { label: "Gross Merchandise Value", value: "$85M+", badge: "YTD Volume" },
      { label: "Order Matching Speed", value: "<2 Sec", badge: "AI Powered" },
      { label: "Active Enterprise Buyers", value: "14,000+", badge: "Verified" },
    ],
    overview:
      "TradeLink Global needed a scalable enterprise B2B platform connecting raw material manufacturers with global wholesale buyers. We designed a high-concurrency marketplace with multi-currency escrow accounts, AI-driven RFQ matching, and dynamic wholesale pricing calculators.",
    keyFeatures: [
      {
        title: "Smart Escrow Payments",
        description: "Milestone-based buyer fund lock and release via Stripe Connect enterprise.",
        iconName: "Shield",
      },
      {
        title: "AI Supplier Matching",
        description: "Algorithmic RFQ routing matching buyer requirements with verified manufacturers.",
        iconName: "Cpu",
      },
      {
        title: "Dynamic Tiered Pricing",
        description: "Real-time volume discount engines and custom enterprise quote negotiation.",
        iconName: "BarChart",
      },
      {
        title: "KYB Vendor Verification",
        description: "Automated business background checks, tax verification, and compliance audit trail.",
        iconName: "Users",
      },
    ],
    techStackDetailed: [
      {
        category: "Frontend",
        items: [
          { name: "Next.js 15", role: "React Server Components", version: "v15.1" },
          { name: "Tailwind CSS", role: "Styling" },
        ],
      },
      {
        category: "Backend & AI",
        items: [
          { name: "Node.js & Express", role: "Microservices API" },
          { name: "Gemini 2.5 Flash", role: "RFQ Parsing & Matching" },
          { name: "PostgreSQL", role: "Primary DB" },
        ],
      },
      {
        category: "Payments & Cloud",
        items: [
          { name: "Stripe Connect", role: "Multi-vendor Escrow" },
          { name: "Redis", role: "Real-time Leaderboard & Caching" },
        ],
      },
    ],
    challengesAndSolutions: [
      {
        challenge: "Handling complex RFQs with unstructured attachments (PDFs, CAD specs).",
        solution: "Built a Gemini AI document processing worker that extracts specs, tolerances, and quantities into structured RFP fields automatically.",
      },
    ],
    workflowSteps: [
      { step: "01", title: "Post RFQ", detail: "Buyer submits RFQ or uploads technical spec sheet." },
      { step: "02", title: "AI Vendor Match", detail: "Platform invites top 5 rated manufacturers matching capacity." },
      { step: "03", title: "Escrow Deposit", detail: "Buyer funds locked safely in Stripe Connect account." },
      { step: "04", title: "Delivery & Release", detail: "Funds released to seller upon bill of lading verification." },
    ],
    desktopSimulator: {
      appTitle: "TradeLink Global B2B Marketplace",
      url: "https://app.tradelinkglobal.com/dashboard/rfq",
      sidebar: ["Explore Suppliers", "RFQs (8 Pending)", "Orders & Escrow", "Messages", "Analytics"],
      stats: [
        { title: "Total GMV Processed", val: "$85,420,000", change: "+38% YoY" },
        { title: "Active Vendors", val: "3,820", change: "99.4% Verified" },
        { title: "Avg Fulfillment", val: "4.8 Days", change: "On Time" },
      ],
      tableHeader: ["RFQ Ref", "Product Category", "Order Volume", "Best Bid", "Status"],
      tableRows: [
        { col1: "RFQ-8821", col2: "Industrial Sensors", col3: "10,000 Units", status: "$14.20/unit" },
        { col1: "RFQ-8822", col2: "Aluminium Extrusions", col3: "50 Tons", status: "Bidding Open" },
        { col1: "RFQ-8823", col2: "Custom PCB Boards", col3: "2,500 Units", status: "Escrow Funded" },
        { col1: "RFQ-8824", col2: "Polymer Pellets", col3: "120 Barrels", status: "In Transit" },
      ],
    },
    mobileSimulator: {
      screenTitle: "TradeLink Mobile",
      notificationBadge: "3 Quotes",
      primaryCardTitle: "Escrow Balance",
      primaryCardVal: "$142,800.00 USD",
      quickActions: ["Post RFQ", "Verify Order", "Chat Supplier"],
      recentActivity: [
        { title: "RFQ-8821 Supplier Bid", time: "2 mins ago", amount: "$142,000", status: "Accepted" },
        { title: "Sample Batch Dispatched", time: "1 hour ago", amount: "$1,200", status: "Tracking Active" },
      ],
    },
  },
  {
    slug: "education-erp",
    title: "Education ERP",
    category: "EdTech",
    description:
      "LMS + ERP hybrid serving 60k+ students — admissions, fees, exams, and parent portal in one platform.",
    tags: ["Laravel", "Flutter", "MySQL"],
    accent: "linear-gradient(135deg,#ff4dd2 0%,#7c5cff 100%)",
    client: "EduGlobal Academy Group",
    duration: "6 Months",
    year: "2024",
    location: "Austin, TX & Delhi, IN",
    impactMetrics: [
      { label: "Active Student Users", value: "62,000+", badge: "Across 24 Campuses" },
      { label: "Fee Collection Efficiency", value: "99.1%", badge: "Zero Delays" },
      { label: "Parent Mobile Engagement", value: "94%", badge: "Daily DAU" },
    ],
    overview:
      "EduGlobal Group operates 24 school and college campuses. Managing student records, exam grading, fee collection, and parent communication was fragmented across 6 different tools. Larawans built a unified Education ERP with role-based mobile apps for parents, teachers, and administrators.",
    keyFeatures: [
      {
        title: "Automated Fee Engine",
        description: "Installment plans, late fee rules, and automated WhatsApp payment reminders.",
        iconName: "Zap",
      },
      {
        title: "Live Attendance & Transport",
        description: "RFID bus tracking and automatic attendance notifications to parents' mobile app.",
        iconName: "Users",
      },
      {
        title: "Exam & Report Generator",
        description: "Instant GPA calculation, report card generation, and performance analytics.",
        iconName: "BarChart",
      },
      {
        title: "Interactive LMS Portal",
        description: "Homework uploads, live online classes, and AI study quiz assistant.",
        iconName: "Cpu",
      },
    ],
    techStackDetailed: [
      {
        category: "Mobile Apps",
        items: [
          { name: "Flutter", role: "Cross-platform iOS & Android Parent/Teacher App" },
        ],
      },
      {
        category: "Web & Core ERP",
        items: [
          { name: "Laravel 11", role: "Multi-tenant ERP Engine" },
          { name: "MySQL 8.0", role: "High-throughput Database" },
        ],
      },
    ],
    challengesAndSolutions: [
      {
        challenge: "Spike of 50k concurrent users during exam result announcements.",
        solution: "Implemented Redis read replicas and static cached result pages served via Cloudflare CDN.",
      },
    ],
    workflowSteps: [
      { step: "01", title: "Student Onboarding", detail: "Digital admission form with automatic document verification." },
      { step: "02", title: "Academic Tracking", detail: "Daily attendance via RFID cards and teacher mobile app." },
      { step: "03", title: "Automated Billing", detail: "Monthly invoices generated with instant payment links." },
      { step: "04", title: "Performance Insights", detail: "AI summary of student growth sent to parents quarterly." },
    ],
    desktopSimulator: {
      appTitle: "EduGlobal ERP — Campus Director View",
      url: "https://campus.eduglobal.edu/admin/dashboard",
      sidebar: ["Campuses", "Admissions", "Students (62,400)", "Fee Receipts", "Exams", "Transport"],
      stats: [
        { title: "Total Students", val: "62,410", change: "24 Campuses" },
        { title: "Monthly Fee Collected", val: "$4.8M", change: "99.1% Paid" },
        { title: "Daily Attendance", val: "96.4%", change: "On Track" },
      ],
      tableHeader: ["Student ID", "Name", "Campus", "Grade", "Fee Status"],
      tableRows: [
        { col1: "STU-10492", col2: "Aarav Sharma", col3: "Main Campus", status: "Paid ($1,200)" },
        { col1: "STU-10493", col2: "Emily Chen", col3: "North Wing", status: "Paid ($1,200)" },
        { col1: "STU-10494", col2: "Marcus Vance", col3: "West Campus", status: "Installment Due" },
        { col1: "STU-10495", col2: "Sophia Patel", col3: "Tech Campus", status: "Paid ($1,400)" },
      ],
    },
    mobileSimulator: {
      screenTitle: "EduGlobal Parent App",
      notificationBadge: "Grade A+",
      primaryCardTitle: "Attendance Today",
      primaryCardVal: "Present — 8:15 AM",
      quickActions: ["Pay Tuition", "Bus Tracker", "Report Card"],
      recentActivity: [
        { title: "Mathematics Quiz 3", time: "Today", amount: "98/100", status: "Top Score" },
        { title: "Term 2 Fee Invoice", time: "Yesterday", amount: "$1,200", status: "Receipt Sent" },
      ],
    },
  },
  {
    slug: "hospital-management",
    title: "Hospital Management",
    category: "Healthcare",
    description:
      "HIPAA-ready HIS with EMR, OPD/IPD, pharmacy, lab, and insurance modules deployed across 12 hospitals.",
    tags: ["Next.js", ".NET", "Azure"],
    accent: "linear-gradient(135deg,#00e0c6 0%,#4dc4ff 100%)",
    client: "Meridian Health System",
    duration: "7 Months",
    year: "2025",
    location: "Chicago, USA",
    impactMetrics: [
      { label: "Patient Wait Time Reduction", value: "65%", badge: "OPD Flow" },
      { label: "EMR Search Speed", value: "300ms", badge: "Sub-Second" },
      { label: "Connected Hospital Units", value: "12 Hospitals", badge: "HIPAA Compliant" },
    ],
    overview:
      "Meridian Health System required a modern, HIPAA-compliant Hospital Information System (HIS) to sync electronic medical records (EMR) across 12 medical centers. We architected a microservices HIS on Azure with HL7/FHIR compliance, instant lab result sync, and AI doctor transcription copilot.",
    keyFeatures: [
      {
        title: "FHIR-Compliant EMR",
        description: "Unified patient history accessible securely across all 12 hospital facilities.",
        iconName: "Shield",
      },
      {
        title: "AI Dictation & Prescription",
        description: "Voice-to-text dictation for physicians with drug interaction auto-checks.",
        iconName: "Cpu",
      },
      {
        title: "Smart OPD/IPD Bed Manager",
        description: "Real-time bed availability tracking and automated discharge workflow.",
        iconName: "Users",
      },
      {
        title: "Integrated Pharmacy & Lab",
        description: "Automated lab instrument data ingestion and inventory barcode sync.",
        iconName: "Zap",
      },
    ],
    techStackDetailed: [
      {
        category: "Frontend",
        items: [
          { name: "Next.js 15", role: "Hospital Web Console" },
          { name: "Tailwind CSS", role: "Accessible High-Contrast UI" },
        ],
      },
      {
        category: "Backend & Enterprise",
        items: [
          { name: ".NET 8 Web API", role: "Enterprise Microservices" },
          { name: "Azure SQL & Cosmos DB", role: "HIPAA Encrypted DB" },
        ],
      },
    ],
    challengesAndSolutions: [
      {
        challenge: "Strict HIPAA security rules requiring granular role-based encryption per doctor/nurse level.",
        solution: "Implemented Azure Key Vault with column-level Encryption-at-Rest and OAuth JWT claim verification on every API request.",
      },
    ],
    workflowSteps: [
      { step: "01", title: "Check-in", detail: "Self-service kiosk check-in with digital health card scan." },
      { step: "02", title: "Consultation", detail: "Doctor inputs notes using voice copilot with automatic drug safety alerts." },
      { step: "03", title: "Lab & Pharmacy", detail: "E-prescription sent automatically to hospital pharmacy." },
      { step: "04", title: "Insurance Billing", detail: "Instant claim pre-authorization via HL7 interface." },
    ],
    desktopSimulator: {
      appTitle: "Meridian Health HIS — Central Command Center",
      url: "https://his.meridianhealth.org/emr/patients",
      sidebar: ["Doctors Desk", "OPD Queue", "IPD Beds (88% Full)", "EMR Search", "Pharmacy", "Billing"],
      stats: [
        { title: "Patients Seen Today", val: "1,840", change: "12 Locations" },
        { title: "Available IPD Beds", val: "42 Beds", change: "Real-time" },
        { title: "Insurance Claims Sync", val: "99.8%", change: "Clean Claims" },
      ],
      tableHeader: ["MRN ID", "Patient Name", "Department", "Physician", "EMR Status"],
      tableRows: [
        { col1: "MRN-40291", col2: "Robert Taylor", col3: "Cardiology", status: "Lab Results In" },
        { col1: "MRN-40292", col2: "Maria Garcia", col3: "Orthopedics", status: "In Consultation" },
        { col1: "MRN-40293", col2: "James Wilson", col3: "Pediatrics", status: "Discharged" },
        { col1: "MRN-40294", col2: "Linda Martinez", col3: "Neurology", status: "E-Prescription Sent" },
      ],
    },
    mobileSimulator: {
      screenTitle: "Meridian Patient Portal",
      notificationBadge: "Lab Ready",
      primaryCardTitle: "Next Appointment",
      primaryCardVal: "Today at 2:30 PM — Dr. Karun",
      quickActions: ["View EMR", "Lab Reports", "E-Prescription"],
      recentActivity: [
        { title: "Blood Test Results", time: "1 hour ago", amount: "Normal", status: "Verified" },
        { title: "OPD Consultation Fee", time: "Today", amount: "$45.00", status: "Insurance Covered" },
      ],
    },
  },
  {
    slug: "restaurant-pos",
    title: "Restaurant POS",
    category: "Retail / F&B",
    description:
      "Offline-first POS with KOT, table management, kitchen display, and consolidated reporting for 200+ outlets.",
    tags: ["Flutter", "Node.js", "PostgreSQL"],
    accent: "linear-gradient(135deg,#9dff5c 0%,#00e0c6 100%)",
    client: "Bites & Brews Franchise Group",
    duration: "4 Months",
    year: "2024",
    location: "London, UK & Dubai",
    impactMetrics: [
      { label: "Order Processing Speed", value: "3 Seconds", badge: "KOT Direct" },
      { label: "Offline Uptime", value: "100%", badge: "Local Sync" },
      { label: "Active Outlets", value: "210+ Outlets", badge: "Franchise Sync" },
    ],
    overview:
      "Bites & Brews operates over 200 fast-casual restaurants. Internet drops during lunch hours were causing order losses and kitchen confusion. We created an offline-first Flutter POS app with localized SQLite DB that syncs automatically to PostgreSQL whenever connection restores.",
    keyFeatures: [
      {
        title: "Offline-First Sync Engine",
        description: "Zero downtime billing even during complete internet disconnects.",
        iconName: "Shield",
      },
      {
        title: "Kitchen Display System (KDS)",
        description: "Real-time kitchen order ticket routing to station-specific iPad screens.",
        iconName: "Zap",
      },
      {
        title: "Visual Table Layout",
        description: "Drag-and-drop floor plan management with live order timers and bill splitting.",
        iconName: "Users",
      },
      {
        title: "Franchise Analytics",
        description: "Consolidated sales, ingredient consumption, and wastage reports across 200+ outlets.",
        iconName: "BarChart",
      },
    ],
    techStackDetailed: [
      {
        category: "Client Apps",
        items: [
          { name: "Flutter Desktop & Mobile", role: "POS Terminal & KDS App" },
          { name: "SQLite", role: "Local Offline Storage" },
        ],
      },
      {
        category: "Backend Services",
        items: [
          { name: "Node.js & WebSockets", role: "Real-time Order Bus" },
          { name: "PostgreSQL", role: "Central Master Data" },
        ],
      },
    ],
    challengesAndSolutions: [
      {
        challenge: "Syncing conflicting orders placed simultaneously offline across 4 waitstaff tablets.",
        solution: "Implemented CRDTs (Conflict-free Replicated Data Types) ensuring deterministically merged order items.",
      },
    ],
    workflowSteps: [
      { step: "01", title: "Order Punching", detail: "Waiter selects items on tablet floor view." },
      { step: "02", title: "KDS Dispatch", detail: "Order instantly appears on Grill & Beverage screens." },
      { step: "03", title: "Table Billing", detail: "Split bill options with touch payments." },
      { step: "04", title: "Cloud Sync", detail: "Sales and inventory deduct automatically synced to cloud." },
    ],
    desktopSimulator: {
      appTitle: "Bites & Brews POS — Terminal #04 (Downtown Outlet)",
      url: "https://pos.bitesandbrews.com/terminal/main",
      sidebar: ["Floor Plan", "Takeaway Queue", "KDS Monitor", "Daily Sales", "Inventory", "Settings"],
      stats: [
        { title: "Today's Revenue", val: "£4,820.50", change: "+18% vs Yesterday" },
        { title: "Orders Fulfilled", val: "342 Orders", change: "Avg 4.2 min" },
        { title: "Sync Status", val: "Online 100%", change: "Local Database Ready" },
      ],
      tableHeader: ["Table #", "Order ID", "Items Count", "Total", "Status"],
      tableRows: [
        { col1: "Table 04", col2: "ORD-9921", col3: "4 Items", status: "KDS Preparing" },
        { col1: "Table 12", col2: "ORD-9922", col3: "2 Items", status: "Served — Bill Pending" },
        { col1: "Takeaway 08", col2: "ORD-9923", col3: "6 Items", status: "Ready for Pickup" },
        { col1: "Table 02", col2: "ORD-9924", col3: "3 Items", status: "Paid (£48.50)" },
      ],
    },
    mobileSimulator: {
      screenTitle: "Waiter Handheld POS",
      notificationBadge: "Table 04 Ready",
      primaryCardTitle: "Active Tables",
      primaryCardVal: "18 / 22 Occupied",
      quickActions: ["New Order", "Print Bill", "Split Payment"],
      recentActivity: [
        { title: "Table 04 — 2x Truffle Burger", time: "Just now", amount: "£32.00", status: "Sent to Kitchen" },
        { title: "Table 09 — Card Payment", time: "3 mins ago", amount: "£84.50", status: "Completed" },
      ],
    },
  },
  {
    slug: "inventory-erp",
    title: "Inventory ERP",
    category: "Supply Chain",
    description:
      "Multi-warehouse inventory ERP with barcode, batch tracking, demand forecasting, and supplier portal.",
    tags: ["Laravel", "React", "Docker"],
    accent: "linear-gradient(135deg,#7c5cff 0%,#ff4dd2 100%)",
    client: "Apex Distribution Global",
    duration: "5 Months",
    year: "2024",
    location: "Rotterdam, Netherlands",
    impactMetrics: [
      { label: "Stockout Reduction", value: "92%", badge: "AI Forecast" },
      { label: "Barcode Scanning Speed", value: "0.4 Sec", badge: "Batch Scanner" },
      { label: "Warehouses Connected", value: "18 Locations", badge: "Real-time" },
    ],
    overview:
      "Apex Distribution managed 18 fulfillment centers handling over 40,000 SKUs. Stock discrepancies and manual reordering led to costly stockouts. Larawans engineered an automated Inventory ERP with barcode scanning, batch expiry tracking, and AI reorder point calculation.",
    keyFeatures: [
      {
        title: "Multi-Location Stock Sync",
        description: "Real-time visibility across all 18 warehouses with intra-location transfer routing.",
        iconName: "Database",
      },
      {
        title: "AI Demand Forecasting",
        description: "Predictive purchasing based on seasonal trends and historical burn rate.",
        iconName: "Cpu",
      },
      {
        title: "Barcode & RFID Ingestion",
        description: "Mobile handheld scanner support for receiving, picking, and dispatch.",
        iconName: "Zap",
      },
      {
        title: "Automated PO Generation",
        description: "Instant purchase order generation sent directly to supplier portals upon reorder trigger.",
        iconName: "BarChart",
      },
    ],
    techStackDetailed: [
      {
        category: "Web Console",
        items: [
          { name: "React 18", role: "Interactive Warehouse Canvas" },
          { name: "Tailwind CSS", role: "UI Styling" },
        ],
      },
      {
        category: "Backend & Infra",
        items: [
          { name: "Laravel 11", role: "Core Inventory Engine" },
          { name: "Docker & Kubernetes", role: "Microservice Scaling" },
        ],
      },
    ],
    challengesAndSolutions: [
      {
        challenge: "High volume barcode scans crashing database during morning loading dock hours.",
        solution: "Decoupled barcode ingestion via Redis stream buffers, bulk writing in 500ms batches.",
      },
    ],
    workflowSteps: [
      { step: "01", title: "Goods Receiving", detail: "Dock workers scan pallets with handheld barcode scanners." },
      { step: "02", title: "Slotting", detail: "System suggests optimal warehouse bin location based on item velocity." },
      { step: "03", title: "Auto Reorder", detail: "AI monitors safety stock and dispatches PO when stock falls below limit." },
      { step: "04", title: "Dispatch", detail: "Pick list generated on scanner app with shortest walk-path." },
    ],
    desktopSimulator: {
      appTitle: "Apex Inventory ERP — Supply Chain Portal",
      url: "https://inventory.apexdist.com/warehouse/dashboard",
      sidebar: ["Stock Overview", "Warehouses (18)", "Purchase Orders", "Suppliers", "Barcodes", "Analytics"],
      stats: [
        { title: "Total SKUs Monitored", val: "42,800", change: "18 Facilities" },
        { title: "Inventory Value", val: "€28.4M", change: "Turnover 8.4x" },
        { title: "Pending POs", val: "14 Orders", change: "Auto-Approved" },
      ],
      tableHeader: ["SKU Code", "Item Description", "Warehouse", "Stock Level", "Reorder Status"],
      tableRows: [
        { col1: "SKU-9012", col2: "Micro-Bearings 12mm", col3: "Rotterdam Hub 1", status: "Optimal (4,200)" },
        { col1: "SKU-9013", col2: "Hydraulic Hose 2m", col3: "Frankfurt Hub 3", status: "Reorder Triggered" },
        { col1: "SKU-9014", col2: "Stainless Fasteners", col3: "Antwerp Dock", status: "In Transit (+5,000)" },
        { col1: "SKU-9015", col2: "Copper Wiring Coil", col3: "Rotterdam Hub 2", status: "Sufficient (1,800)" },
      ],
    },
    mobileSimulator: {
      screenTitle: "Apex Warehouse Scanner App",
      notificationBadge: "Bin B4 Ready",
      primaryCardTitle: "Active Pick List #PL-402",
      primaryCardVal: "14 / 16 Items Scanned",
      quickActions: ["Scan Barcode", "Bin Lookup", "Stock Transfer"],
      recentActivity: [
        { title: "Pallet #P-882 Scanned", time: "Just now", amount: "500 Units", status: "Dock 2 Confirmed" },
        { title: "Bin B4 Stock Transfer", time: "12 mins ago", amount: "120 Units", status: "Location Updated" },
      ],
    },
  },
  {
    slug: "manufacturing-erp",
    title: "Manufacturing ERP",
    category: "Industry 4.0",
    description:
      "MES + ERP for a precision manufacturer — BOM, MRP, shop floor IoT, and real-time OEE dashboards.",
    tags: ["Next.js", "Python", "AWS"],
    accent: "linear-gradient(135deg,#ffb14d 0%,#7c5cff 100%)",
    client: "Precision Tech Engineering",
    duration: "6 Months",
    year: "2025",
    location: "Stuttgart, Germany",
    impactMetrics: [
      { label: "OEE Improvement", value: "+28%", badge: "Overall Equipment Efficiency" },
      { label: "Shop Floor IoT Latency", value: "<100ms", badge: "MQTT Telemetry" },
      { label: "BOM Calculation Speed", value: "Instant", badge: "Multi-level MRP" },
    ],
    overview:
      "Precision Tech manufactures high-tolerance automotive components. Their shop floor needed real-time telemetry integration with CNC machines and a multi-level Bill of Materials (BOM) engine. We built a Next.js + Python ERP that aggregates IoT sensor data into live OEE (Overall Equipment Effectiveness) dashboards.",
    keyFeatures: [
      {
        title: "Multi-Level BOM & MRP",
        description: "Nested bill of materials with automatic raw material requirement calculation.",
        iconName: "Cpu",
      },
      {
        title: "IoT Machine Telemetry",
        description: "MQTT-based ingestion of machine cycle times, spindle temperature, and downtime logs.",
        iconName: "Zap",
      },
      {
        title: "Live OEE Dashboards",
        description: "Real-time tracking of Availability, Performance, and Quality metrics per machine line.",
        iconName: "BarChart",
      },
      {
        title: "Quality Control & Scrap Log",
        description: "Automated tolerance checks with immediate alert triggering for defective batches.",
        iconName: "Shield",
      },
    ],
    techStackDetailed: [
      {
        category: "Frontend & Analytics",
        items: [
          { name: "Next.js 15", role: "Shop Floor Live Cockpit" },
          { name: "Tailwind CSS", role: "Dark Mode Industrial UI" },
        ],
      },
      {
        category: "Backend & Telemetry",
        items: [
          { name: "Python & FastAPI", role: "Data Processing & MRP Solver" },
          { name: "MQTT & AWS IoT Core", role: "Machine Telemetry Ingestion" },
        ],
      },
    ],
    challengesAndSolutions: [
      {
        challenge: "Handling 10,000 MQTT sensor messages per second without dropping frames.",
        solution: "Built a Python AsyncIO pipeline with Apache Kafka buffering to feed real-time AWS Timestream DB.",
      },
    ],
    workflowSteps: [
      { step: "01", title: "Production Order", detail: "Order generated from client ERP with exploded BOM." },
      { step: "02", title: "Material Staging", detail: "Raw metals moved to CNC workstation." },
      { step: "03", title: "Machining & IoT", detail: "Sensors stream cycle time and spindle health." },
      { step: "04", title: "Quality Signoff", detail: "Digital inspection logs batch approval for delivery." },
    ],
    desktopSimulator: {
      appTitle: "Precision MES — Factory Floor Cockpit",
      url: "https://mes.precisiontech.de/shopfloor/oee",
      sidebar: ["OEE Monitor", "Production Orders", "BOM Explorer", "IoT Sensors", "Maintenance", "QA Logs"],
      stats: [
        { title: "Plant OEE Today", val: "84.2%", change: "+28% Target Met" },
        { title: "Active CNC Lines", val: "28 / 30", change: "2 Scheduled Maint" },
        { title: "Daily Batch Yield", val: "14,200 Parts", change: "99.4% Quality" },
      ],
      tableHeader: ["Machine ID", "Line Name", "Active Order", "OEE Rate", "Status"],
      tableRows: [
        { col1: "CNC-01", col2: "Line Alpha", col3: "PRD-4029 (Shafts)", status: "88.5% (Running)" },
        { col1: "CNC-02", col2: "Line Alpha", col3: "PRD-4030 (Gears)", status: "82.1% (Running)" },
        { col1: "PRESS-04", col2: "Line Gamma", col3: "PRD-4031 (Housing)", status: "Downtime (Tooling)" },
        { col1: "CNC-05", col2: "Line Beta", col3: "PRD-4032 (Flanges)", status: "91.0% (Peak)" },
      ],
    },
    mobileSimulator: {
      screenTitle: "Plant Supervisor Mobile",
      notificationBadge: "Alert CNC-04",
      primaryCardTitle: "Factory Floor Health",
      primaryCardVal: "28/30 Machines Operational",
      quickActions: ["Log Downtime", "BOM Check", "QA Release"],
      recentActivity: [
        { title: "Line Alpha Batch Complete", time: "5 mins ago", amount: "500 Parts", status: "QA Approved" },
        { title: "CNC-04 Tooling Alert", time: "15 mins ago", amount: "Warning", status: "Tech Assigned" },
      ],
    },
  },
  {
    slug: "hrms",
    title: "HRMS",
    category: "People Ops",
    description:
      "Modern HRMS with payroll, leave, performance, and AI-powered resume parsing for 5k+ employee orgs.",
    tags: ["Laravel", "React", "MySQL"],
    accent: "linear-gradient(135deg,#4dc4ff 0%,#00e0c6 100%)",
    client: "Apex Enterprise Workforce",
    duration: "4 Months",
    year: "2024",
    location: "Bangalore, IN & London, UK",
    impactMetrics: [
      { label: "Payroll Processing Time", value: "15 Mins", badge: "Automated Tax" },
      { label: "Resume Screen Time", value: "3 Sec", badge: "AI Parser" },
      { label: "Employee Portal Adoption", value: "98%", badge: "Self-Service" },
    ],
    overview:
      "Apex Workforce managed over 5,000 employees across 4 global offices. Payroll calculations, local tax compliance, leave approvals, and hiring pipelines were handled in fragmented spreadsheets. Larawans built a unified HRMS with multi-country payroll, automated tax computation, and AI resume screening.",
    keyFeatures: [
      {
        title: "Multi-Country Payroll Engine",
        description: "Automated gross-to-net tax rules, pension deductions, and direct bank payout files.",
        iconName: "Zap",
      },
      {
        title: "AI Resume Screening & ATS",
        description: "Instant candidate rank-scoring based on job description matching.",
        iconName: "Cpu",
      },
      {
        title: "Self-Service Mobile Portal",
        description: "Payslip downloads, leave requests, expense claims, and company announcements.",
        iconName: "Users",
      },
      {
        title: "Performance 360",
        description: "OKR goal alignment, peer feedback cycles, and performance appraisal workflows.",
        iconName: "BarChart",
      },
    ],
    techStackDetailed: [
      {
        category: "Web & UI",
        items: [
          { name: "React 18", role: "Employee & Admin Dashboard" },
          { name: "Tailwind CSS", role: "Corporate Design Tokens" },
        ],
      },
      {
        category: "Backend & AI",
        items: [
          { name: "Laravel 11", role: "Core HR & Payroll Service" },
          { name: "Gemini AI", role: "Resume Parsing & Talent Matching" },
        ],
      },
    ],
    challengesAndSolutions: [
      {
        challenge: "Handling complex tax calculation rules for 4 different countries simultaneously.",
        solution: "Engineered isolated tax strategy plugins per region with automated compliance updates.",
      },
    ],
    workflowSteps: [
      { step: "01", title: "Recruitment", detail: "AI parses 200+ resumes per job and ranks top candidates." },
      { step: "02", title: "Digital Onboarding", detail: "Employee e-signs offer letter and submits tax documents." },
      { step: "03", title: "Time & Leave", detail: "Self-service leave requests with one-tap manager approvals." },
      { step: "04", title: "Automated Payroll", detail: "One-click monthly payroll run with direct bank file generation." },
    ],
    desktopSimulator: {
      appTitle: "Apex HRMS — People Operations Console",
      url: "https://hrms.apexworkforce.com/payroll/run",
      sidebar: ["Directory", "Payroll (Run Ready)", "Leaves (12 Pending)", "Recruitment", "Performance", "Reports"],
      stats: [
        { title: "Total Employees", val: "5,240", change: "4 Global Offices" },
        { title: "Payroll This Month", val: "$3.4M", change: "100% Verified" },
        { title: "Open Positions", val: "18 Roles", change: "82 Applicants" },
      ],
      tableHeader: ["Emp ID", "Employee Name", "Department", "Location", "Payroll Status"],
      tableRows: [
        { col1: "EMP-0821", col2: "Ananya Rao", col3: "Engineering", status: "Calculated ($8,400)" },
        { col1: "EMP-0822", col2: "David Miller", col3: "Marketing", status: "Calculated ($6,200)" },
        { col1: "EMP-0823", col2: "Claire Bennett", col3: "Finance", status: "Calculated ($7,100)" },
        { col1: "EMP-0824", col2: "Kiran Patel", col3: "Product", status: "Calculated ($9,000)" },
      ],
    },
    mobileSimulator: {
      screenTitle: "Apex Employee Portal",
      notificationBadge: "Payslip Out",
      primaryCardTitle: "Leave Balance",
      primaryCardVal: "18 Days Available",
      quickActions: ["Apply Leave", "Download Payslip", "Expense Claim"],
      recentActivity: [
        { title: "Monthly Payslip — Oct", time: "Today", amount: "$8,400", status: "Ready" },
        { title: "Annual Leave Approved", time: "Yesterday", amount: "3 Days", status: "Confirmed" },
      ],
    },
  },
  {
    slug: "crm",
    title: "CRM",
    category: "Sales Tech",
    description:
      "Sales CRM with pipelines, AI lead scoring, WhatsApp integration, and real-time revenue forecasting.",
    tags: ["Next.js", "Node.js", "AI"],
    accent: "linear-gradient(135deg,#7c5cff 0%,#ffb14d 100%)",
    client: "Pipeline Growth Corp",
    duration: "4 Months",
    year: "2025",
    location: "San Francisco, USA",
    impactMetrics: [
      { label: "Deal Velocity Speedup", value: "3.2x", badge: "Faster Close" },
      { label: "Lead Qualification Rate", value: "+45%", badge: "AI Score" },
      { label: "Sales Team Adoption", value: "99%", badge: "Zero Data Loss" },
    ],
    overview:
      "Pipeline Growth Corp operates a 120-agent sales team. Leads were falling through the cracks due to slow follow-ups across email and WhatsApp. We developed an AI-powered CRM with automated deal pipelines, predictive lead scoring, WhatsApp API integration, and real-time sales forecasting.",
    keyFeatures: [
      {
        title: "Predictive AI Lead Scoring",
        description: "Ranks incoming leads automatically based on intent signals and engagement velocity.",
        iconName: "Cpu",
      },
      {
        title: "Native WhatsApp & Email Hub",
        description: "Two-way WhatsApp messaging directly from the deal board with automated follow-ups.",
        iconName: "Zap",
      },
      {
        title: "Drag-and-Drop Pipeline",
        description: "Visual deal stages with automated task triggers and stage transition guardrails.",
        iconName: "BarChart",
      },
      {
        title: "Revenue Forecast AI",
        description: "Predictive quarterly revenue forecasting based on historical win rates and deal stage decay.",
        iconName: "Shield",
      },
    ],
    techStackDetailed: [
      {
        category: "Frontend",
        items: [
          { name: "Next.js 15", role: "Real-time Kanban Deal Board" },
          { name: "Tailwind CSS", role: "Clean High-Density UI" },
        ],
      },
      {
        category: "Backend & AI Services",
        items: [
          { name: "Node.js & WebSockets", role: "Live Deal Sync" },
          { name: "Gemini AI", role: "Lead Scoring & Auto Summary" },
        ],
      },
    ],
    challengesAndSolutions: [
      {
        challenge: "Real-time deal state synchronization across 120 simultaneous sales reps.",
        solution: "Utilized WebSockets with Optimistic UI updates, rendering deal drag actions instantly with background lock.",
      },
    ],
    workflowSteps: [
      { step: "01", title: "Lead Ingestion", detail: "Lead captured from Web form or WhatsApp message." },
      { step: "02", title: "AI Qualification", detail: "Gemini rates lead quality (0-100) and assigns top account rep." },
      { step: "03", title: "Omnichannel Nurture", detail: "Automated sequence fires WhatsApp and email touchpoints." },
      { step: "04", title: "Close & Analytics", detail: "Deal won triggers auto contract generation via e-sign." },
    ],
    desktopSimulator: {
      appTitle: "Pipeline CRM — Sales Command Dashboard",
      url: "https://crm.pipelinegrowth.com/deals/kanban",
      sidebar: ["Deals Kanban", "Leads (340 New)", "WhatsApp Hub", "Contacts", "Forecast", "Analytics"],
      stats: [
        { title: "Pipeline Value", val: "$12.8M", change: "+24% vs Q3" },
        { title: "Win Rate", val: "34.2%", change: "+6.8% YoY" },
        { title: "Avg Cycle", val: "14 Days", change: "3.2x Faster" },
      ],
      tableHeader: ["Deal Name", "Company", "Deal Value", "AI Quality Score", "Stage"],
      tableRows: [
        { col1: "Enterprise License 500", col2: "Acme Corp", col3: "$140,000", status: "Score 94 (Negotiation)" },
        { col1: "Global ERP Rollout", col2: "Starlight Inc", col3: "$280,000", status: "Score 88 (Proposal)" },
        { col1: "Cloud Migration Contract", col2: "Nexus Tech", col3: "$95,000", status: "Score 91 (Contract Sent)" },
        { col1: "SaaS Team Expansion", col2: "Vanguard", col3: "$65,000", status: "Score 78 (Qualified)" },
      ],
    },
    mobileSimulator: {
      screenTitle: "Pipeline Mobile CRM",
      notificationBadge: "Lead Hot",
      primaryCardTitle: "Today's Target",
      primaryCardVal: "$420,000 Closed",
      quickActions: ["Add Deal", "WhatsApp Lead", "Log Call"],
      recentActivity: [
        { title: "Acme Corp Contract View", time: "2 mins ago", amount: "$140,000", status: "Contract Opened" },
        { title: "WhatsApp Reply — Nexus", time: "10 mins ago", amount: "Hot Lead", status: "Meeting Booked" },
      ],
    },
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
