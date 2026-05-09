import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const display = Manrope({ subsets: ["latin"], variable: "--font-display", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://fluxenite.com"),
  title: { default: "Fluxenite — Premium Digital Experiences", template: "%s | Fluxenite" },
  description: "A premium modern SaaS and business website for Fluxenite, built with cinematic 3D, polished motion, and elegant responsive layouts.",
  keywords: ["Fluxenite", "SaaS", "business website", "3D web", "digital agency", "React Three Fiber"],
  openGraph: { title: "Fluxenite", description: "Build. Elevate. Inspire.", url: "https://fluxenite.com", siteName: "Fluxenite", type: "website" },
  robots: { index: true, follow: true }
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, maximumScale: 5, themeColor: "#f7f1e8" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable}`}>
      <body>{children}</body>
    </html>
  );
}
