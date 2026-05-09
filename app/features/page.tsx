import type { Metadata } from "next";
import { PageFrame } from "@/sections/PageFrame";
import { CardGridSection } from "@/sections/CardGridSection";
import { features } from "@/lib/content";

export const metadata: Metadata = { title: "Features", description: "Premium Fluxenite features for design, performance, reliability, and growth." };

export default function FeaturesPage() {
  return <PageFrame><CardGridSection eyebrow="Our Features" title="Powerful features." accent="Real results." body="Fluxenite combines creativity, technology, and strategy to deliver digital experiences that drive growth." items={features} variant="features" columns={4} /></PageFrame>;
}
