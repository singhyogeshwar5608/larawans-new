export interface CourseItem {
  slug: string;
  title: string;
  emoji: string;
  shortTag: string;
  category: string;
  description: string;
  longDescription: string;
  aboutText: string;
  duration: string;
  level: string;
  modules: number;
  students: string;
  price: string;
  outcome: string;
  topics: string[];
  techStack: { name: string; color: string }[];
  highlights: { label: string; value: string }[];
  projects: { name: string; description: string; icon: string }[];
  audience: string[];
  image: string;
  gradient: string;
  accent: string;
  glow: string;
  iconBg: string;
  badge?: string;
  themeColor: string; // hex color for course card accent
}

export function getCourseBySlug(slug: string): CourseItem | undefined {
  return ALL_COURSES.find((c) => c.slug === slug);
}

export const ALL_COURSES: CourseItem[] = [
  {
    slug: "full-stack-web-development",
    title: "Full Stack Web Development",
    emoji: "💻",
    shortTag: "Full Stack",
    category: "Web Development",
    description:
      "Learn to build complete web applications from scratch using Laravel for the backend, React and Next.js for the frontend. This course covers everything from basic HTML and CSS to deploying production-ready apps with real-world projects.",
    longDescription:
      "This comprehensive program takes you from foundational web concepts to deploying full-stack applications at scale. You will learn to architect robust backends with Laravel, build dynamic frontends with React, and leverage the power of Next.js for server-rendered and static applications. Throughout the course, you will work on real-world projects that simulate professional development workflows, including version control, CI/CD pipelines, API design, and responsive UI development. By the end, you will have a portfolio of deployable applications and the confidence to tackle any full-stack challenge in the industry.",
    aboutText:
      "Designed for aspiring developers who want a complete understanding of modern web development, this course covers every layer of the stack. Starting with HTML, CSS, and JavaScript fundamentals, you will progress through React component architecture, state management, and routing. On the backend, Laravel provides a powerful PHP framework for building RESTful APIs, handling authentication, managing databases with Eloquent ORM, and integrating third-party services. The Next.js module bridges the gap between client and server with SSR, ISR, and API routes. You will also learn deployment strategies using Vercel, Docker, and cloud hosting providers. The curriculum emphasizes clean code principles, testing with PHPUnit and Jest, and collaborative development with Git.",
    duration: "16 Weeks",
    level: "All Levels",
    modules: 50,
    students: "2400+",
    price: "₹14,999",
    outcome:
      "Build and deploy full-stack web applications using Laravel, React, and Next.js with confidence.",
    topics: [
      "HTML5, CSS3 & Modern JavaScript (ES6+)",
      "React Component Architecture & Hooks",
      "State Management with Context & Zustand",
      "Laravel Framework & Eloquent ORM",
      "RESTful API Design & Development",
      "Next.js App Router & Server Components",
      "Database Design with MySQL & PostgreSQL",
      "Authentication, Authorization & Security",
    ],
    techStack: [
      { name: "Laravel", color: "#FF2D20" },
      { name: "React", color: "#61DAFB" },
      { name: "Next.js", color: "#000000" },
      { name: "TypeScript", color: "#3178C6" },
      { name: "Tailwind CSS", color: "#06B6D4" },
      { name: "MySQL", color: "#4479A1" },
      { name: "Vercel", color: "#000000" },
      { name: "Docker", color: "#2496ED" },
    ],
    highlights: [
      { label: "Projects", value: "6+" },
      { label: "Modules", value: "50" },
      { label: "Duration", value: "16 Weeks" },
      { label: "Certificate", value: "Included" },
    ],
    projects: [
      {
        name: "E-Commerce Platform",
        description: "A fully functional online store with product catalog, cart, checkout, and payment integration using Stripe.",
        icon: "shopping-cart",
      },
      {
        name: "Project Management Dashboard",
        description: "A real-time Kanban board with drag-and-drop, team collaboration, and activity tracking features.",
        icon: "layout-dashboard",
      },
      {
        name: "SaaS Landing Page & Portal",
        description: "A marketing landing page with SSR, blog section, and authenticated user dashboard built with Next.js.",
        icon: "globe",
      },
    ],
    audience: [
      "Beginners who want to start a career in web development",
      "Frontend developers looking to learn backend skills",
      "Backend developers wanting to master modern frontend frameworks",
      "Computer science students seeking practical project experience",
      "Freelancers who want to offer full-stack development services",
    ],
    image: "/images/courses/full-stack-web-development.jpg",
    gradient: "from-slate-900 via-blue-900 to-slate-800",
    accent: "#3B82F6",
    glow: "rgba(59,130,246,0.3)",
    iconBg: "bg-blue-500/10",
    themeColor: "#6366F1",
  },
  {
    slug: "ai-prompt-engineering",
    title: "AI Prompt Engineering",
    emoji: "🤖",
    shortTag: "AI Prompts",
    category: "Artificial Intelligence",
    description:
      "Discover how to write effective prompts for AI tools like ChatGPT, Midjourney, and LangChain to automate tasks and create high-quality content. You will learn prompt techniques, chaining methods, and real-world applications across different industries.",
    longDescription:
      "Prompt engineering is the most in-demand skill in the AI era. This course teaches you the science and art of communicating effectively with large language models and image generators. You will master techniques like chain-of-thought prompting, few-shot learning, system prompt design, and structured output formatting. Through hands-on exercises with ChatGPT, Midjourney, and LangChain, you will learn to build AI-powered applications that generate text, images, and code. The course also covers prompt testing, evaluation frameworks, and strategies for building reliable AI pipelines that deliver consistent results across different models and use cases.",
    aboutText:
      "This course is built for professionals and creators who want to harness the full potential of AI tools in their daily work. You will start by understanding how large language models process input and why certain prompts produce better results. From there, you will explore advanced techniques including role-based prompting, temperature tuning, token management, and prompt chaining for complex workflows. The Midjourney module covers artistic prompt construction, style transfer, and consistent character generation. With LangChain, you will build applications that chain multiple AI calls together, integrate with external data sources, and create autonomous agents. Real-world case studies from marketing, software development, customer support, and content creation demonstrate how prompt engineering transforms business operations.",
    duration: "8 Weeks",
    level: "Beginner",
    modules: 35,
    students: "1800+",
    price: "₹9,999",
    outcome:
      "Design effective prompts and build AI-powered workflows using ChatGPT, Midjourney, and LangChain.",
    topics: [
      "Fundamentals of Large Language Models",
      "Prompt Engineering Techniques & Frameworks",
      "ChatGPT API Integration & Automation",
      "Midjourney Prompt Construction & Art Styles",
      "LangChain Chains, Agents & Memory",
      "Structured Output & JSON Mode",
      "Prompt Testing, Evaluation & Optimization",
      "Building AI-Powered Applications",
    ],
    techStack: [
      { name: "ChatGPT", color: "#10A37F" },
      { name: "Midjourney", color: "#000000" },
      { name: "LangChain", color: "#1C3C3C" },
      { name: "Python", color: "#3776AB" },
      { name: "OpenAI API", color: "#412991" },
      { name: "DALL-E", color: "#FF6B6B" },
      { name: "Hugging Face", color: "#FFD21E" },
    ],
    highlights: [
      { label: "Projects", value: "4+" },
      { label: "Modules", value: "35" },
      { label: "Duration", value: "8 Weeks" },
      { label: "Certificate", value: "Included" },
    ],
    projects: [
      {
        name: "AI Content Generator",
        description: "Build an automated blog post generator that creates SEO-optimized articles using chained prompts and editing workflows.",
        icon: "pen-tool",
      },
      {
        name: "Brand Image Studio",
        description: "Create a Midjourney-powered brand asset generator that produces consistent logos, banners, and social media graphics.",
        icon: "image",
      },
      {
        name: "Customer Support Chatbot",
        description: "Develop an intelligent chatbot using LangChain that answers FAQs, escalates issues, and learns from conversation history.",
        icon: "message-circle",
      },
    ],
    audience: [
      "Marketing professionals seeking AI-powered content creation",
      "Developers wanting to integrate AI into their applications",
      "Business owners looking to automate workflows with AI",
      "Content creators and designers exploring AI tools",
      "Students interested in the practical side of artificial intelligence",
    ],
    image: "/images/courses/ai-prompt-engineering.jpg",
    gradient: "from-emerald-900 via-teal-800 to-emerald-900",
    accent: "#10B981",
    glow: "rgba(16,185,129,0.3)",
    iconBg: "bg-emerald-500/10",
    badge: "Trending",
    themeColor: "#22C55E",
  },
  {
    slug: "mobile-app-development-flutter",
    title: "Mobile App Development with Flutter",
    emoji: "📱",
    shortTag: "Flutter Dev",
    category: "Mobile Development",
    description:
      "Develop cross-platform mobile apps for both iOS and Android using a single codebase with Flutter and Dart. You will learn to build beautiful UIs, manage state, integrate Firebase for backend services, and publish your apps on app stores.",
    longDescription:
      "Flutter has revolutionized mobile app development by enabling developers to ship high-performance applications for both iOS and Android from a single codebase. This course covers everything from Dart fundamentals to advanced state management, animations, and native device integration. You will learn to build responsive UIs with Flutter's widget system, manage application state with Riverpod and Bloc, handle offline data with SQLite and Hive, and deploy backend services with Firebase. The curriculum includes building production-quality apps with push notifications, authentication, cloud storage, and real-time databases. By graduation, you will have published apps on both the App Store and Google Play.",
    aboutText:
      "Mobile development is one of the fastest-growing segments in tech, and Flutter offers the most efficient path to becoming a cross-platform mobile developer. This course begins with Dart programming language essentials, covering variables, control flow, classes, and asynchronous programming with futures and streams. You will then dive into Flutter's widget hierarchy, learning to compose complex UIs from reusable components. State management is a core focus, with in-depth modules on Provider, Riverpod, and Bloc/Cubit patterns. The Firebase integration module covers authentication, Firestore, Cloud Functions, Cloud Messaging, and Crashlytics. Advanced topics include platform channels for native code, custom paint for unique graphics, and performance profiling with the Flutter DevTools. Each module includes practical exercises that build toward three complete app projects.",
    duration: "12 Weeks",
    level: "Intermediate",
    modules: 45,
    students: "1500+",
    price: "₹12,999",
    outcome:
      "Build and publish cross-platform mobile applications for iOS and Android using Flutter and Firebase.",
    topics: [
      "Dart Programming Language Fundamentals",
      "Flutter Widget Tree & Layout System",
      "State Management with Riverpod & Bloc",
      "Firebase Authentication & Cloud Firestore",
      "REST API Integration & Data Parsing",
      "Push Notifications & Cloud Messaging",
      "Local Storage with SQLite & Hive",
      "App Store & Google Play Deployment",
    ],
    techStack: [
      { name: "Flutter", color: "#02569B" },
      { name: "Dart", color: "#0175C2" },
      { name: "Firebase", color: "#FFCA28" },
      { name: "Riverpod", color: "#E4572E" },
      { name: "SQLite", color: "#003B57" },
      { name: "Hive", color: "#FFB940" },
      { name: "Google Cloud", color: "#4285F4" },
    ],
    highlights: [
      { label: "Projects", value: "5+" },
      { label: "Modules", value: "45" },
      { label: "Duration", value: "12 Weeks" },
      { label: "Certificate", value: "Included" },
    ],
    projects: [
      {
        name: "Food Delivery App",
        description: "A complete food ordering application with restaurant listings, cart management, order tracking, and payment integration.",
        icon: "utensils",
      },
      {
        name: "Fitness Tracker",
        description: "A health and fitness app with workout logging, progress charts, goal setting, and social sharing features.",
        icon: "heart-pulse",
      },
      {
        name: "Real Estate Listing App",
        description: "A property search application with map integration, image galleries, filters, and contact forms for agents.",
        icon: "home",
      },
    ],
    audience: [
      "Web developers transitioning to mobile app development",
      "Computer science students interested in mobile platforms",
      "Entrepreneurs who want to build their own mobile apps",
      "iOS or Android developers looking to go cross-platform",
      "UI designers wanting to turn their designs into functional apps",
    ],
    image: "/images/courses/mobile-app-development-flutter.jpg",
    gradient: "from-sky-900 via-cyan-800 to-sky-900",
    accent: "#0EA5E9",
    glow: "rgba(14,165,233,0.3)",
    iconBg: "bg-sky-500/10",
    themeColor: "#3B82F6",
  },
  {
    slug: "digital-marketing-mastery",
    title: "Digital Marketing Mastery",
    emoji: "📈",
    shortTag: "Marketing",
    category: "Marketing",
    description:
      "Launch and grow digital marketing campaigns across Google Ads, SEO, social media, and email to drive real business results. You will work with live campaigns, analyze performance data, and build strategies that convert visitors into customers.",
    longDescription:
      "Digital marketing is the backbone of every successful online business. This course provides a complete roadmap from strategy formulation to execution and measurement across all major digital channels. You will learn to create and optimize Google Ads campaigns, build organic traffic through advanced SEO techniques, engage audiences on social media platforms, and design email marketing funnels that convert. The analytics module teaches you to use Google Analytics 4, Tag Manager, and Data Studio to track performance and make data-driven decisions. Real campaign budgets are allocated for hands-on practice, ensuring you graduate with tangible results and a portfolio of live campaigns.",
    aboutText:
      "This program is structured around the digital marketing funnel, covering every stage from awareness to advocacy. You will begin with market research, competitor analysis, and buyer persona development to build a solid strategic foundation. The SEO module dives deep into technical SEO, on-page optimization, link building, and content strategy, including practical keyword research with tools like Ahrefs and SEMrush. Google Ads training covers search, display, shopping, and YouTube campaigns with a focus on ROI optimization through quality score improvement and bid strategies. Social media marketing spans Facebook, Instagram, LinkedIn, and Twitter, covering organic growth, paid advertising, influencer partnerships, and community management. The email marketing section covers list building, segmentation, automation sequences, and A/B testing. Throughout the course, you will work with real budgets and real accounts, building measurable expertise that employers and clients value.",
    duration: "10 Weeks",
    level: "All Levels",
    modules: 40,
    students: "3200+",
    price: "₹7,999",
    outcome:
      "Plan, execute, and optimize complete digital marketing campaigns across all major channels.",
    topics: [
      "Digital Marketing Strategy & Funnel Design",
      "Google Ads (Search, Display, Shopping, YouTube)",
      "Advanced SEO & Technical Optimization",
      "Social Media Marketing & Paid Advertising",
      "Email Marketing & Automation Funnels",
      "Google Analytics 4 & Data Studio",
      "Content Marketing & Copywriting",
      "Conversion Rate Optimization & A/B Testing",
    ],
    techStack: [
      { name: "Google Ads", color: "#4285F4" },
      { name: "Google Analytics", color: "#E37400" },
      { name: "Meta Ads", color: "#1877F2" },
      { name: "SEMrush", color: "#FF642D" },
      { name: "Ahrefs", color: "#FF8C00" },
      { name: "Mailchimp", color: "#FFE01B" },
      { name: "Canva", color: "#00C4CC" },
      { name: "WordPress", color: "#21759B" },
    ],
    highlights: [
      { label: "Projects", value: "5+" },
      { label: "Modules", value: "40" },
      { label: "Duration", value: "10 Weeks" },
      { label: "Certificate", value: "Included" },
    ],
    projects: [
      {
        name: "Google Ads Campaign",
        description: "Plan, launch, and optimize a real Google Ads campaign with a live budget, tracking conversions and ROI.",
        icon: "target",
      },
      {
        name: "SEO Audit & Strategy",
        description: "Perform a comprehensive SEO audit for a real business, delivering keyword research, technical fixes, and a content plan.",
        icon: "search",
      },
      {
        name: "Social Media Growth Plan",
        description: "Develop and execute a 30-day social media strategy for a brand, including content calendar and engagement tactics.",
        icon: "share-2",
      },
    ],
    audience: [
      "Business owners who want to grow their online presence",
      "Marketing professionals looking to upgrade their digital skills",
      "Freelancers offering digital marketing services",
      "Students pursuing careers in marketing and advertising",
      "Startup founders needing cost-effective customer acquisition",
    ],
    image: "/images/courses/digital-marketing-mastery.jpg",
    gradient: "from-orange-900 via-amber-800 to-orange-900",
    accent: "#F59E0B",
    glow: "rgba(245,158,11,0.3)",
    iconBg: "bg-amber-500/10",
    badge: "Bestseller",
    themeColor: "#F59E0B",
  },
  {
    slug: "ui-ux-design-figma",
    title: "UI/UX Design with Figma",
    emoji: "🎨",
    shortTag: "UI/UX Design",
    category: "Design",
    description:
      "Design user-friendly interfaces and seamless experiences using Figma, from early wireframes to interactive prototypes and full design systems. You will learn research methods, layout principles, and how to hand off designs to developers smoothly.",
    longDescription:
      "Great products start with great design. This course teaches you the complete UI/UX design process, from understanding user needs through research to delivering polished, interactive prototypes. You will master Figma as your primary design tool, learning advanced techniques like auto layout, component variants, design tokens, and collaborative workflows. The UX module covers user research methods, information architecture, wireframing, usability testing, and accessibility standards. You will build a comprehensive design system from scratch and apply it to real product designs. The course also covers design handoff to developers, ensuring your designs are implemented accurately in production.",
    aboutText:
      "This course bridges the gap between visual aesthetics and functional usability. You will start with design thinking principles, learning to empathize with users, define problems, ideate solutions, and prototype rapidly. Figma training begins with the interface basics and progresses to advanced features like smart animate for micro-interactions, variables for design tokens, and branching for design exploration. The prototyping module teaches you to create high-fidelity interactive prototypes that simulate real app behavior, complete with conditional logic and animated transitions. You will learn to conduct usability tests, analyze results, and iterate on your designs based on real user feedback. The design system module covers creating atomic design systems with reusable components, color scales, typography hierarchies, and spacing systems. Additional tools like Framer for advanced prototyping and Miro for collaborative brainstorming round out your toolkit.",
    duration: "10 Weeks",
    level: "Beginner",
    modules: 38,
    students: "1200+",
    price: "₹11,999",
    outcome:
      "Design user-centered interfaces and create interactive prototypes with Figma and modern design tools.",
    topics: [
      "Design Thinking & User Research Methods",
      "Figma Interface, Tools & Shortcuts",
      "Wireframing & Low-Fidelity Prototyping",
      "Visual Design: Color, Typography & Layout",
      "Component Systems & Design Tokens",
      "High-Fidelity Prototyping & Animations",
      "Usability Testing & Design Iteration",
      "Design Handoff & Developer Collaboration",
    ],
    techStack: [
      { name: "Figma", color: "#F24E1E" },
      { name: "Framer", color: "#0055FF" },
      { name: "Miro", color: "#FFD02F" },
      { name: "Principle", color: "#5B57D1" },
      { name: "Adobe XD", color: "#FF61F6" },
      { name: "Notion", color: "#000000" },
    ],
    highlights: [
      { label: "Projects", value: "4+" },
      { label: "Modules", value: "38" },
      { label: "Duration", value: "10 Weeks" },
      { label: "Certificate", value: "Included" },
    ],
    projects: [
      {
        name: "Mobile Banking App Redesign",
        description: "Redesign a banking application's user experience, from user research through to a fully interactive Figma prototype.",
        icon: "smartphone",
      },
      {
        name: "SaaS Dashboard Design System",
        description: "Build a comprehensive design system with components, patterns, and documentation for a SaaS analytics dashboard.",
        icon: "palette",
      },
      {
        name: "E-Commerce Checkout Flow",
        description: "Design an optimized checkout experience with user flow mapping, wireframes, and a tested high-fidelity prototype.",
        icon: "credit-card",
      },
    ],
    audience: [
      "Beginners with no prior design experience",
      "Developers who want to improve their design skills",
      "Product managers seeking design literacy",
      "Graphic designers transitioning to digital product design",
      "Entrepreneurs designing their own products",
    ],
    image: "/images/courses/ui-ux-design-figma.jpg",
    gradient: "from-rose-900 via-pink-800 to-rose-900",
    accent: "#F43F5E",
    glow: "rgba(244,63,94,0.3)",
    iconBg: "bg-rose-500/10",
    themeColor: "#EC4899",
  },
  {
    slug: "devops-cloud-engineering",
    title: "DevOps & Cloud Engineering",
    emoji: "☁️",
    shortTag: "DevOps",
    category: "Cloud & Infrastructure",
    description:
      "Set up and manage cloud infrastructure, CI/CD pipelines, and containerized deployments using Docker, Kubernetes, AWS, and Terraform. You will gain practical skills in monitoring, logging, and automating the entire software delivery process.",
    longDescription:
      "DevOps engineers are among the highest-paid professionals in tech, and this course prepares you to join their ranks. You will learn to containerize applications with Docker, orchestrate deployments with Kubernetes, and manage cloud infrastructure on AWS using infrastructure-as-code with Terraform. The curriculum covers the complete DevOps lifecycle, from continuous integration with GitHub Actions to continuous delivery with automated deployment pipelines. You will master monitoring and observability with Prometheus and Grafana, implement logging with ELK stack, and ensure security with vault secrets management. Real-world scenarios simulate production environments, giving you the hands-on experience that employers demand.",
    aboutText:
      "This intensive program covers the entire DevOps toolchain and cloud ecosystem. Starting with Linux fundamentals and shell scripting, you will build a strong foundation in system administration. Docker training covers image building, multi-stage builds, networking, volumes, and Docker Compose for local development environments. Kubernetes modules take you from pod basics to advanced topics like Helm charts, service meshes, and auto-scaling policies. On AWS, you will work with EC2, S3, RDS, Lambda, CloudFront, and IAM, learning to architect cost-effective and highly available cloud solutions. Terraform modules teach you to define infrastructure as code, manage state, and create reusable modules. The CI/CD section covers GitHub Actions, Jenkins, and ArgoCD for automated build, test, and deployment pipelines. Monitoring and observability modules use Prometheus, Grafana, and the ELK stack to ensure application reliability. Security best practices, including secrets management with HashiCorp Vault and container scanning, are woven throughout the curriculum.",
    duration: "14 Weeks",
    level: "Intermediate",
    modules: 55,
    students: "900+",
    price: "₹16,999",
    outcome:
      "Design, deploy, and manage cloud infrastructure and CI/CD pipelines for production applications.",
    topics: [
      "Linux System Administration & Shell Scripting",
      "Docker Containerization & Docker Compose",
      "Kubernetes Orchestration & Cluster Management",
      "AWS Core Services (EC2, S3, RDS, Lambda)",
      "Infrastructure as Code with Terraform",
      "CI/CD Pipelines with GitHub Actions & ArgoCD",
      "Monitoring with Prometheus & Grafana",
      "Security, Secrets Management & Compliance",
    ],
    techStack: [
      { name: "Docker", color: "#2496ED" },
      { name: "AWS", color: "#FF9900" },
      { name: "Terraform", color: "#7B42BC" },
      { name: "Kubernetes", color: "#326CE5" },
      { name: "GitHub Actions", color: "#2088FF" },
      { name: "Prometheus", color: "#E6522C" },
      { name: "Grafana", color: "#F46800" },
      { name: "Linux", color: "#FCC624" },
    ],
    highlights: [
      { label: "Projects", value: "7+" },
      { label: "Modules", value: "55" },
      { label: "Duration", value: "14 Weeks" },
      { label: "Certificate", value: "Included" },
    ],
    projects: [
      {
        name: "Microservices Deployment Pipeline",
        description: "Build a complete CI/CD pipeline that builds, tests, and deploys a microservices application to a Kubernetes cluster on AWS.",
        icon: "git-branch",
      },
      {
        name: "Infrastructure as Code Platform",
        description: "Use Terraform to provision a complete AWS environment with VPC, subnets, load balancers, and auto-scaling groups.",
        icon: "server",
      },
      {
        name: "Monitoring & Alerting System",
        description: "Set up Prometheus and Grafana to monitor application metrics, log aggregation with ELK, and configure alerting rules.",
        icon: "activity",
      },
    ],
    audience: [
      "Software developers transitioning to DevOps roles",
      "System administrators wanting to modernize their skill set",
      "Cloud engineers seeking DevOps methodology expertise",
      "Tech leads managing infrastructure and deployment processes",
      "IT professionals aiming for high-demand cloud engineering roles",
    ],
    image: "/images/courses/devops-cloud-engineering.jpg",
    gradient: "from-violet-900 via-purple-800 to-violet-900",
    accent: "#8B5CF6",
    glow: "rgba(139,92,246,0.3)",
    iconBg: "bg-violet-500/10",
    themeColor: "#8B5CF6",
  },
  {
    slug: "ai-automation-zapier",
    title: "AI Automation & No-Code",
    emoji: "⚡",
    shortTag: "AI Automation",
    category: "Automation & No-Code",
    description:
      "Automate everyday business tasks using no-code tools like Zapier, Make, and Airtable, plus AI integrations for smarter workflows. You will learn to connect apps, build automated pipelines, and save hours of manual work every week.",
    longDescription:
      "No-code and AI automation are transforming how businesses operate, enabling non-technical professionals to build powerful workflows in hours instead of months. This course teaches you to connect applications, automate repetitive tasks, and build internal tools using platforms like Zapier, Make, and Airtable. You will learn to design multi-step automations that handle data entry, notifications, reporting, and customer communication. The AI integration module shows you how to add ChatGPT, image recognition, and sentiment analysis to your automations. Whether you want to streamline your own business or offer automation services to clients, this course gives you the practical skills to deliver immediate value.",
    aboutText:
      "This course is designed for business professionals, operations managers, and entrepreneurs who want to eliminate manual work and scale their processes. You will start with automation fundamentals, understanding triggers, actions, conditions, and data mapping across platforms. Zapier training covers building multi-step Zaps, webhooks, formatters, and paths for conditional logic. Make (formerly Integromat) modules explore its visual scenario builder, error handling, iterators, and aggregators for complex data transformations. Airtable teaches you to build relational databases as powerful internal tools, combined with interfaces, automations, and integrations. The AI automation section is a standout feature, covering OpenAI API integration for text generation, classification, and summarization within your workflows. You will also explore specialized tools like DocuMint for document generation, Typeform for data collection, and Slack for team communication. Real business scenarios from HR onboarding, lead management, inventory tracking, and customer support demonstrate practical applications.",
    duration: "6 Weeks",
    level: "Beginner",
    modules: 25,
    students: "2100+",
    price: "₹8,999",
    outcome:
      "Build end-to-end automated business workflows using no-code tools and AI integrations.",
    topics: [
      "Automation Fundamentals & Workflow Design",
      "Zapier: Multi-Step Zaps, Webhooks & Paths",
      "Make (Integromat): Visual Scenario Building",
      "Airtable Databases, Views & Interfaces",
      "AI Integration: ChatGPT, Classification & NLP",
      "Document Generation & Email Automation",
      "Form Building & Data Collection Workflows",
      "Scaling Automations & Business Process Mapping",
    ],
    techStack: [
      { name: "Zapier", color: "#FF4A00" },
      { name: "Make", color: "#5000FF" },
      { name: "Airtable", color: "#18BFFF" },
      { name: "OpenAI", color: "#412991" },
      { name: "Slack", color: "#4A154B" },
      { name: "Google Sheets", color: "#34A853" },
    ],
    highlights: [
      { label: "Projects", value: "4+" },
      { label: "Modules", value: "25" },
      { label: "Duration", value: "6 Weeks" },
      { label: "Certificate", value: "Included" },
    ],
    projects: [
      {
        name: "Lead Management Automation",
        description: "Build an automated lead pipeline that captures form submissions, scores leads with AI, notifies sales teams, and logs everything in Airtable.",
        icon: "users",
      },
      {
        name: "Content Publishing System",
        description: "Create a workflow that generates blog outlines with ChatGPT, schedules posts, creates social media snippets, and tracks performance.",
        icon: "rss",
      },
      {
        name: "HR Onboarding Automator",
        description: "Design an automated employee onboarding system that sends welcome emails, creates accounts, assigns training, and collects documents.",
        icon: "user-check",
      },
    ],
    audience: [
      "Business owners looking to automate repetitive tasks",
      "Operations managers streamlining team workflows",
      "Non-technical professionals entering the automation space",
      "Freelancers offering automation as a service",
      "Startup teams needing rapid process implementation",
    ],
    image: "/images/courses/ai-automation-zapier.jpg",
    gradient: "from-yellow-900 via-orange-700 to-yellow-900",
    accent: "#EAB308",
    glow: "rgba(234,179,8,0.3)",
    iconBg: "bg-yellow-500/10",
    badge: "New",
    themeColor: "#F97316",
  },
  {
    slug: "data-analytics-python",
    title: "Data Analytics with Python",
    emoji: "📊",
    shortTag: "Data Analytics",
    category: "Data Science",
    description:
      "Analyze and visualize data to uncover trends and insights using Python, Pandas, and Power BI dashboards. You will learn data cleaning, statistical analysis, chart building, and how to present findings that help businesses make smarter decisions.",
    longDescription:
      "Data-driven decision making is essential for every modern organization, and Python has become the language of choice for data analytics. This course teaches you to collect, clean, analyze, and visualize data using Python's powerful ecosystem of libraries. You will master Pandas for data manipulation, NumPy for numerical computing, Matplotlib and Seaborn for visualization, and Scikit-learn for introductory machine learning. The Power BI module teaches you to create interactive dashboards and reports that communicate insights to stakeholders effectively. Through real-world datasets from finance, healthcare, e-commerce, and social media, you will develop the analytical thinking and technical skills that employers value most.",
    aboutText:
      "This course takes a practical, project-driven approach to data analytics. You will begin with Python fundamentals tailored for data work, covering data types, control structures, functions, and file I/O. The Pandas module is the heart of the course, teaching you to load data from multiple sources, handle missing values, merge datasets, perform group operations, and apply transformations efficiently. NumPy provides the numerical foundation for fast array operations and mathematical computing. Visualization modules cover Matplotlib for customization and Seaborn for statistical graphics, enabling you to create publication-quality charts and dashboards. The statistics module covers descriptive statistics, hypothesis testing, correlation analysis, and regression. SQL integration teaches you to query databases directly from Python. The Power BI section covers data modeling, DAX calculations, interactive report design, and publishing dashboards to the Power BI Service. Advanced topics include web scraping for data collection, API data extraction, and introductory machine learning with Scikit-learn for predictive analytics.",
    duration: "12 Weeks",
    level: "Intermediate",
    modules: 42,
    students: "1600+",
    price: "₹13,999",
    outcome:
      "Analyze complex datasets and build interactive dashboards using Python and Power BI.",
    topics: [
      "Python for Data Analysis",
      "Pandas: Data Manipulation & Transformation",
      "NumPy: Numerical Computing & Array Operations",
      "Data Visualization with Matplotlib & Seaborn",
      "Statistical Analysis & Hypothesis Testing",
      "SQL Queries & Database Integration",
      "Interactive Dashboards with Power BI",
      "Introductory Machine Learning with Scikit-learn",
    ],
    techStack: [
      { name: "Python", color: "#3776AB" },
      { name: "Pandas", color: "#150458" },
      { name: "Power BI", color: "#F2C811" },
      { name: "NumPy", color: "#013243" },
      { name: "Matplotlib", color: "#11557C" },
      { name: "Seaborn", color: "#4B8BBE" },
      { name: "Jupyter", color: "#F37626" },
      { name: "Scikit-learn", color: "#F7931E" },
    ],
    highlights: [
      { label: "Projects", value: "5+" },
      { label: "Modules", value: "42" },
      { label: "Duration", value: "12 Weeks" },
      { label: "Certificate", value: "Included" },
    ],
    projects: [
      {
        name: "Sales Performance Dashboard",
        description: "Analyze a company's sales data across regions, products, and time periods, then build an interactive Power BI dashboard for executives.",
        icon: "bar-chart",
      },
      {
        name: "Customer Segmentation Analysis",
        description: "Apply clustering algorithms to segment customers based on purchasing behavior, visualizing results with Python and presenting findings.",
        icon: "pie-chart",
      },
      {
        name: "Financial Data Pipeline",
        description: "Build an automated data pipeline that scrapes financial data, cleans and transforms it with Pandas, and generates a weekly report.",
        icon: "trending-up",
      },
    ],
    audience: [
      "Business analysts wanting to add programming to their toolkit",
      "Finance and accounting professionals working with data",
      "Students pursuing careers in data science or analytics",
      "Managers who need to make data-driven decisions",
      "Anyone curious about extracting insights from data",
    ],
    image: "/images/courses/data-analytics-python.jpg",
    gradient: "from-teal-900 via-cyan-800 to-teal-900",
    accent: "#14B8A6",
    glow: "rgba(20,184,166,0.3)",
    iconBg: "bg-teal-500/10",
    themeColor: "#0EA5E9",
  },
  {
    slug: "3d-design-blender",
    title: "3D Design & Animation",
    emoji: "🎬",
    shortTag: "3D & Animation",
    category: "Design & Multimedia",
    description:
      "Create professional 3D models, animations, and visual effects using Blender and After Effects for games, films, and product showcases. You will learn modeling, texturing, lighting, rigging, and rendering techniques to build a demo reel that stands out.",
    longDescription:
      "The demand for 3D content is exploding across gaming, film, advertising, e-commerce, and virtual reality. This course teaches you to create professional-quality 3D models, textures, lighting setups, and animations using Blender, the industry's most powerful free 3D software. You will learn the complete 3D production pipeline, from blocking out shapes and sculpting details to UV unwrapping, texture painting, and rendering photorealistic scenes. The animation module covers keyframing, rigging, character animation principles, and physics simulations. The After Effects module teaches you to composite 3D renders with live footage, add motion graphics, and apply cinematic color grading. By the end, you will have a demo reel showcasing your best work.",
    aboutText:
      "This course is crafted for aspiring 3D artists and animators who want to build a professional portfolio. You will start with Blender's interface and navigation, then progress through modeling techniques including polygonal modeling, sculpting, and hard-surface workflows. The materials and textures module covers Blender's shader node system, procedural texturing, PBR workflows, and texture painting. Lighting setups teach you three-point lighting, HDRI environment lighting, and volumetric effects for atmospheric scenes. Rendering with both Eevee and Cycles engines is covered in depth, including optimization techniques for faster renders. The animation section begins with the 12 principles of animation, moves through keyframing and graph editor techniques, and covers character rigging with armatures and weight painting. Physics simulations include particles, cloth, fluid, and rigid body dynamics. The After Effects compositing module covers layer management, masking, keying, tracking, and integration with Blender's render passes. The course culminates in a capstone project where you produce a complete 3D animated short from concept to final render.",
    duration: "10 Weeks",
    level: "Beginner",
    modules: 36,
    students: "800+",
    price: "₹10,999",
    outcome:
      "Model, texture, light, and animate 3D scenes and composite them into polished visual content.",
    topics: [
      "Blender Interface, Navigation & Workflow",
      "3D Modeling: Polygonal, Sculpting & Hard-Surface",
      "Materials, Shaders & Texture Painting",
      "Lighting Techniques & Environment Setup",
      "Rendering with Eevee & Cycles",
      "Animation Principles & Keyframing",
      "Character Rigging & Physics Simulations",
      "After Effects Compositing & Motion Graphics",
    ],
    techStack: [
      { name: "Blender", color: "#E87D0D" },
      { name: "After Effects", color: "#9999FF" },
      { name: "Substance Painter", color: "#1EA65D" },
      { name: "Photoshop", color: "#31A8FF" },
      { name: "Premiere Pro", color: "#9999FF" },
      { name: "DaVinci Resolve", color: "#E4202E" },
    ],
    highlights: [
      { label: "Projects", value: "4+" },
      { label: "Modules", value: "36" },
      { label: "Duration", value: "10 Weeks" },
      { label: "Certificate", value: "Included" },
    ],
    projects: [
      {
        name: "Product Visualization",
        description: "Create a photorealistic 3D render of a consumer product with studio lighting, reflections, and a turntable animation.",
        icon: "box",
      },
      {
        name: "3D Animated Short",
        description: "Produce a 30-second animated scene with a rigged character, environment, lighting, and post-processing effects.",
        icon: "film",
      },
      {
        name: "Architectural Visualization",
        description: "Model and render a realistic interior scene with furniture, materials, natural lighting, and camera animation.",
        icon: "building",
      },
    ],
    audience: [
      "Creative individuals wanting to enter the 3D industry",
      "Graphic designers expanding into 3D and motion graphics",
      "Game developers needing 3D modeling and animation skills",
      "Video producers adding 3D elements to their work",
      "Hobbyists and artists exploring digital 3D creation",
    ],
    image: "/images/courses/3d-design-blender.jpg",
    gradient: "from-fuchsia-900 via-pink-800 to-fuchsia-900",
    accent: "#D946EF",
    glow: "rgba(217,70,239,0.3)",
    iconBg: "bg-fuchsia-500/10",
    badge: "Popular",
    themeColor: "#A855F7",
  },
];
