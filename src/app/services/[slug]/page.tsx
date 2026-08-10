import { notFound } from "next/navigation";
import { ALL_SERVICES_DETAILS, getServiceBySlug } from "@/lib/service-data";
import ServiceDetailClient from "./ServiceDetailClient";

export function generateStaticParams() {
  return ALL_SERVICES_DETAILS.map((s) => ({ slug: s.slug }));
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();
  return <ServiceDetailClient service={service} />;
}
