import type { Metadata } from "next";
import { PageFrame } from "@/sections/PageFrame";
import { AboutSection } from "@/sections/AboutSection";

export const metadata: Metadata = { title: "About Us", description: "Learn about Fluxenite's values, statistics, and innovation-led approach." };

export default function AboutPage() {
  return <PageFrame><AboutSection /></PageFrame>;
}
