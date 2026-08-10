import { notFound } from "next/navigation";
import { ALL_COURSES, getCourseBySlug, CourseItem } from "@/lib/course-data";
import CourseDetailClient from "./CourseDetailClient";

const EXTRA_COURSES: CourseItem[] = [
  {
    slug: "cyber-security-professional",
    title: "Cyber Security Professional",
    emoji: "🛡️",
    shortTag: "Security",
    category: "Web Development",
    description: "Learn network security, ethical hacking, defense strategies, and Linux fundamentals.",
    longDescription: "Become an industry-ready Cyber Security expert. Master network security protocols, ethical hacking techniques, penetration testing, security auditing, and mitigation strategies for modern organizations.",
    aboutText: "This comprehensive security track prepares you for certifications and real-world cybersecurity roles. You will start with networking foundations and Linux security, then progress to penetration testing, threat detection, and response planning.",
    duration: "12 Weeks",
    level: "Advanced",
    modules: 36,
    students: "1,200+",
    price: "₹9,999",
    outcome: "Master security principles, protect networks, and build defensive architectures.",
    topics: ["Networking Fundamentals", "Linux Security & Command Line", "Ethical Hacking & Pentesting", "Threat Response & Auditing", "Cryptography & Secure Coding"],
    techStack: [
      { name: "Linux", color: "#FCC624" },
      { name: "Docker", color: "#2496ED" }
    ],
    highlights: [{ label: "Modules", value: "36" }, { label: "Duration", value: "12 Weeks" }],
    projects: [{ name: "Penetration Testing Lab", description: "Set up and audit a secure virtual environment to identify and patch system vulnerabilities.", icon: "shield" }],
    audience: ["IT Professionals looking to transition into security", "Developers seeking safe programming practices"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-4TDeOSY5JTcb6KGHmCJizZC6yXcHTGi56SJHzsdfsCGtwkxqZD65wmbMkhSAED71bF8-06l8UCNpPm-gUY7-8UAx9qOk7fsoGYu0OpnSjqzo2nr9EN6AV5iw1kPZxSHrTQJqWptmGpFNO2brr0pM7Jxzh-afc9rDr8k3sRAJntqRerZx3SIbcbpFx1R9ZM7Ni44gOX86ZSYoIuQKgHVl0Ev9LIb741sv6jpDmDq5q4Q4rAohouGA",
    gradient: "from-red-900 to-black",
    accent: "#EF4444",
    glow: "rgba(239,68,68,0.3)",
    iconBg: "bg-red-500/10",
    themeColor: "#EF4444"
  },
  {
    slug: "cloud-computing-aws",
    title: "Cloud Computing with AWS",
    emoji: "☁️",
    shortTag: "AWS Cloud",
    category: "Web Development",
    description: "Design and deploy scalable infrastructure on Amazon Web Services.",
    longDescription: "Learn core AWS services including EC2, S3, RDS, Lambda, and IAM. Understand architecture patterns, cost optimization, and deployment pipelines.",
    aboutText: "AWS is the leading cloud platform in the world. This bootcamp covers all foundational and associate-level topics, helping you master cloud infrastructure deployment, VPC configuration, load balancing, and serverless computing.",
    duration: "5 Months",
    level: "Intermediate",
    modules: 40,
    students: "2,100+",
    price: "₹12,499",
    outcome: "Architect scalable and cost-effective cloud deployments on AWS.",
    topics: ["AWS Global Infrastructure", "Compute: EC2 & Lambda", "Storage: S3 & EBS", "VPC & Cloud Security", "Databases: RDS & DynamoDB"],
    techStack: [
      { name: "AWS", color: "#FF9900" },
      { name: "Docker", color: "#2496ED" }
    ],
    highlights: [{ label: "Modules", value: "40" }, { label: "Duration", value: "5 Months" }],
    projects: [{ name: "High-Availability Multi-Tier Web App", description: "Deploy a load-balanced auto-scaling application across public and private subnets.", icon: "cloud" }],
    audience: ["Sysadmins looking to learn cloud technologies", "Backend developers scaling systems"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC8YuJdZwwN7LeGCIDDJvaKNurUMPyWmekkF42iN24YwWjhfTBfc-jpwr2cEJfHAJsoHLtA6bLBogXV2steSuJe0wL5NTKo2MT-HFdz4PhoVPL7njW6VoJWhCIkR2A_TwqgVbljw7P8nWVOXLBpCsuIum-ke6hr5dCExEvXWoeFJZ09OnYpxs-8wMJAFWKS_ew6aS_w_s1qGnLhvzvntt1ceXiIxg4zAWGEx9ieYlVz7MRc4vhzvrd0",
    gradient: "from-blue-900 to-slate-900",
    accent: "#3B82F6",
    glow: "rgba(59,130,246,0.3)",
    iconBg: "bg-blue-500/10",
    themeColor: "#3B82F6"
  },
  {
    slug: "devops-engineering",
    title: "DevOps Engineering",
    emoji: "⚙️",
    shortTag: "DevOps",
    category: "Web Development",
    description: "Automate build, test, and release processes using Docker, Kubernetes, and GitHub Actions.",
    longDescription: "Master CI/CD pipelines, container orchestration, monitoring, and automated deployment strategies.",
    aboutText: "DevOps bridges developer and operational workflows. Learn Linux scripting, containerization with Docker, orchestration with Kubernetes, and robust monitoring with Prometheus and Grafana.",
    duration: "6 Months",
    level: "Intermediate",
    modules: 48,
    students: "1,500+",
    price: "₹14,999",
    outcome: "Implement continuous integration and delivery pipelines for high scale systems.",
    topics: ["Linux Scripting", "Docker & Kubernetes", "CI/CD Pipelines", "Prometheus & Observability", "Secrets Management"],
    techStack: [
      { name: "Docker", color: "#2496ED" },
      { name: "Kubernetes", color: "#326CE5" },
      { name: "Linux", color: "#FCC624" }
    ],
    highlights: [{ label: "Modules", value: "48" }, { label: "Duration", value: "6 Months" }],
    projects: [{ name: "Microservices Deploy Pipeline", description: "Create a fully automated release pipeline for a multi-service application.", icon: "settings" }],
    audience: ["Developers wanting to automate delivery", "System engineers aiming to modernize"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDhVdtP9JfWXXb1AE3Kt-0qxjBmmfcsYDjJ08AdMJMTa8Pf8F7yAqfCeLSKuAStTW05buaOUbgnD9dnCej15e-BzeCLQCbTt0bfeCoot7eLzsG21X8RnMT9uP4ldz7iYKxUVuCCCpyliXo8EgAb7mh3JT3ndqgfqvI6Rt3RR3sB10GwnS8wDxb2Ql9GRzgtOBAP-MDxXem41JeLxSMke38r_k3TSXt9ZAm6lnDx9nIwvbWhNUY7zcz4",
    gradient: "from-purple-900 to-indigo-900",
    accent: "#8B5CF6",
    glow: "rgba(139,92,246,0.3)",
    iconBg: "bg-purple-500/10",
    themeColor: "#8B5CF6"
  },
  {
    slug: "java-backend-mastery",
    title: "Java Backend Mastery",
    emoji: "☕",
    shortTag: "Java",
    category: "Web Development",
    description: "Build enterprize backend systems with Java, Spring Boot, Hibernate, and MySQL.",
    longDescription: "Master object-oriented programming, Spring framework, database optimization, and high-performance server structures.",
    aboutText: "Java is the leading language for enterprise software. Learn object-oriented concepts, Spring Boot controllers, data layers with JPA/Hibernate, secure REST APIs, and database indexing.",
    duration: "6 Months",
    level: "Intermediate",
    modules: 45,
    students: "1,800+",
    price: "₹10,999",
    outcome: "Develop and deploy scalable enterprise backend systems in Java.",
    topics: ["Core Java OOPs", "Spring Boot & MVC", "Hibernate ORM", "MySQL Database Design", "API Security & OAuth2"],
    techStack: [
      { name: "Java", color: "#E32B2B" },
      { name: "Spring Boot", color: "#6DB33F" },
      { name: "MySQL", color: "#4479A1" }
    ],
    highlights: [{ label: "Modules", value: "45" }, { label: "Duration", value: "6 Months" }],
    projects: [{ name: "Banking API service", description: "Design a secure, transactional backend with full audit logging and double-entry accounting.", icon: "code" }],
    audience: ["Students wishing to enter enterprize backend careers", "Frontend developers going fullstack"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBEMcZaikqIeUk7vWnU5XOofTyd2gzVIhBdpgWUG_4sgEsmWR-eiM52CAqWUEzr7wvfKX-wW8dmC3bIBmoTHTUsjy34bCzFLN-e3kPIVzwMX5bP1u0b_l8dwJa4epjG76zDR6rAjU4X0bp0qVUbnXc0ePlQLnYtMBaqamJcEj9IyA20lmStw_WN3SxZwpAiE66gIlWICn2eUNqnyOYxum-NN--IUpxdS9x7E_h7lbMbkwtYOFSfd-Ok",
    gradient: "from-orange-900 to-black",
    accent: "#E28413",
    glow: "rgba(226,132,19,0.3)",
    iconBg: "bg-orange-500/10",
    themeColor: "#E28413"
  }
];

export function generateStaticParams() {
  const allSlugs = [
    ...ALL_COURSES.map((c) => ({ slug: c.slug })),
    { slug: "cyber-security-professional" },
    { slug: "cloud-computing-aws" },
    { slug: "devops-engineering" },
    { slug: "java-backend-mastery" }
  ];
  return allSlugs;
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let course = getCourseBySlug(slug) || EXTRA_COURSES.find((c) => c.slug === slug);
  if (!course) notFound();
  return <CourseDetailClient course={course} />;
}
