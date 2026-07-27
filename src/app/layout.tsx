import type { Metadata } from "next";
import { Sora, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { AnimatedCursor } from "@/components/animated-cursor";
import { AuroraBackground } from "@/components/aurora-background";

const sora = Sora({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Larawans Digital — AI-First Software Development Company",
  description:
    "Larawans Digital builds AI Agents, Custom ERP, CRM, Websites, Mobile Apps, and Digital Solutions that accelerate business growth. AI-first software development for modern businesses.",
  keywords: [
    "Larawans Digital",
    "AI Agent Development",
    "Custom ERP Software",
    "CRM Development",
    "Website Development",
    "Mobile App Development",
    "SaaS Development",
    "Digital Marketing",
    "SEO",
    "Branding",
    "AI Chatbots",
    "AI Automation",
  ],
  authors: [{ name: "Larawans Digital" }],
  openGraph: {
    title: "Larawans Digital — AI-First Software Development Company",
    description:
      "Build Websites, Mobile Apps, ERP Software, AI Agents & Digital Solutions that accelerate business growth.",
    siteName: "Larawans Digital",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Larawans Digital — AI-First Software Development Company",
    description:
      "Build Websites, Mobile Apps, ERP Software, AI Agents & Digital Solutions that accelerate business growth.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${sora.variable} ${inter.variable} ${jetbrains.variable} antialiased bg-background text-foreground noise`}
      >
        <SmoothScrollProvider>
          <AuroraBackground />
          <AnimatedCursor />
          {children}
          <Toaster />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
