import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/sections/hero";
import { TrustedCompanies } from "@/components/sections/trusted-companies";
import { Services } from "@/components/sections/services";
import { WhyLarawans } from "@/components/sections/why-larawans";
import { Industries } from "@/components/sections/industries";
import { AISolutions } from "@/components/sections/ai-solutions";
import { DevelopmentProcess } from "@/components/sections/development-process";
import { ProjectShowcase } from "@/components/sections/project-showcase";
import { Portfolio } from "@/components/sections/portfolio";
import { TechStack } from "@/components/sections/tech-stack";
import { Testimonials } from "@/components/sections/testimonials";
import { FAQ } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <TrustedCompanies />
      <Services />
      <ProjectShowcase />
      <Industries />
      <AISolutions />
      <Portfolio />
      <TechStack />
      <WhyLarawans />
      <DevelopmentProcess />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
