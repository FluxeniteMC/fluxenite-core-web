import type { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";

export function PageFrame({ children, withFooter = false }: { children: ReactNode; withFooter?: boolean }) {
  return (
    <div id="top" className="luxury-shell">
      <Navbar />
      <PageTransition>{children}</PageTransition>
      {withFooter && <Footer />}
    </div>
  );
}
