"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { navItems } from "@/lib/content";
import { Logo } from "./Logo";

export function Navbar() {
  const pathname = usePathname();
  return (
    <motion.header initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }} className="fixed left-0 right-0 top-0 z-50 px-5 py-5 sm:px-8 lg:px-20">
      <nav className="mx-auto flex max-w-[1840px] items-center justify-between rounded-full border border-white/40 bg-white/20 px-3 py-2 backdrop-blur-xl lg:bg-transparent lg:backdrop-blur-none">
        <Logo />
        <div className="hidden items-center gap-10 lg:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className="group relative py-3 text-[15px] font-medium">
                {item.label}
                <span className={`absolute -bottom-0.5 left-0 h-0.5 bg-obsidian transition-all ${active ? "w-full" : "w-0 group-hover:w-full"}`} />
              </Link>
            );
          })}
        </div>
        <Link href="/contact" className="cta-dark px-6 py-3">
          Get Started <span aria-hidden>↗</span>
        </Link>
      </nav>
    </motion.header>
  );
}
