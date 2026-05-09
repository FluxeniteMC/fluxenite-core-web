import type { Metadata } from "next";
import { PageFrame } from "@/sections/PageFrame";
import { ContactSection } from "@/sections/ContactSection";

export const metadata: Metadata = { title: "Contact", description: "Contact Fluxenite to create a premium digital experience for your business." };

export default function ContactPage() {
  return <PageFrame withFooter><ContactSection /></PageFrame>;
}
