import type { Metadata } from "next";
import { PageFrame } from "@/sections/PageFrame";
import { CardGridSection } from "@/sections/CardGridSection";
import { services } from "@/lib/content";

export const metadata: Metadata = { title: "Services", description: "End-to-end Fluxenite services for web, mobile, design, marketing, and cloud solutions." };

export default function ServicesPage() {
  return <PageFrame><CardGridSection eyebrow="Our Services" title="Solutions designed" accent="for your success." body="Fluxenite provides end-to-end digital solutions tailored to your business goals." items={services} variant="services" columns={5} /></PageFrame>;
}
