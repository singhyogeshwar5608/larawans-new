import { notFound } from "next/navigation";
import { ALL_COURSES, getCourseBySlug } from "@/lib/course-data";
import CourseDetailClient from "./CourseDetailClient";

export function generateStaticParams() {
  return ALL_COURSES.map((c) => ({ slug: c.slug }));
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();
  return <CourseDetailClient course={course} />;
}
