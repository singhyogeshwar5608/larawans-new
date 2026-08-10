import { useState, useEffect } from "react";
import Home from "@/app/page";
import CoursesPage from "@/app/courses/page";
import CourseDetailClient from "@/app/courses/[slug]/CourseDetailClient";
import ServiceDetailClient from "@/app/services/[slug]/ServiceDetailClient";
import PortfolioIndexPage from "@/app/portfolio/page";
import ProjectDetailClient from "@/app/portfolio/[slug]/ProjectDetailClient";
import { getCourseBySlug } from "@/lib/course-data";
import { getServiceBySlug } from "@/lib/service-data";
import { getProjectBySlug } from "@/lib/site-data";

export default function App() {
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handlePopState);

    // Capture clicks on links starting with /
    const handleLinkClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (target) {
        const href = target.getAttribute("href");
        if (href) {
          if (href === "/" || href.startsWith("/#") || href === "#services" || href === "#portfolio") {
            e.preventDefault();
            window.history.pushState({}, "", href);
            setCurrentPath("/");
            window.scrollTo(0, 0);
            if (href.includes("#")) {
              const id = href.split("#")[1];
              setTimeout(() => {
                const el = document.getElementById(id);
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }, 100);
            }
            return;
          }

          if (href.startsWith("/courses") || href.startsWith("/services") || href.startsWith("/portfolio")) {
            e.preventDefault();
            window.history.pushState({}, "", href);
            setCurrentPath(href);
            window.scrollTo(0, 0);
            return;
          }
        }
      }
    };

    document.addEventListener("click", handleLinkClick);
    return () => {
      window.removeEventListener("popstate", handlePopState);
      document.removeEventListener("click", handleLinkClick);
    };
  }, []);

  // Check if URL matches /portfolio/[slug]
  if (currentPath.startsWith("/portfolio/") && currentPath !== "/portfolio" && currentPath !== "/portfolio/") {
    const slug = currentPath.replace("/portfolio/", "").split("/")[0].split("#")[0];
    const project = getProjectBySlug(slug);
    if (project) {
      return <ProjectDetailClient project={project} />;
    }
  }

  // Check if URL matches /portfolio or /portfolio/
  if (currentPath === "/portfolio" || currentPath === "/portfolio/") {
    return <PortfolioIndexPage />;
  }

  // Check if URL matches /services/[slug]
  if (currentPath.startsWith("/services/") && currentPath !== "/services" && currentPath !== "/services/") {
    const slug = currentPath.replace("/services/", "").split("/")[0].split("#")[0];
    const service = getServiceBySlug(slug);
    if (service) {
      return <ServiceDetailClient service={service} />;
    }
  }

  // Check if URL matches /services or /services/
  if (currentPath === "/services" || currentPath === "/services/") {
    return <Home />;
  }

  // Check if URL matches /courses/[slug]
  if (currentPath.startsWith("/courses/") && currentPath !== "/courses" && currentPath !== "/courses/") {
    const slug = currentPath.replace("/courses/", "").split("/")[0].split("#")[0];
    const course = getCourseBySlug(slug);
    if (course) {
      return <CourseDetailClient course={course} />;
    }
  }

  // Check if URL matches /courses
  if (currentPath === "/courses" || currentPath === "/courses/") {
    return <CoursesPage />;
  }

  // Default route is Home (/)
  return <Home />;
}


