"use client";

import { motion } from "framer-motion";
import { AnimatedText } from "@/components/AnimatedText";
import { SceneStage } from "@/components/SceneStage";
import { fadeUp } from "@/lib/animations";

export function HeroSection() {
  return (
    <section className="relative mx-auto grid min-h-[calc(100vh-7rem)] max-w-[1840px] items-center overflow-hidden rounded-[2.5rem] lg:grid-cols-[.86fr_1.14fr]">
      <div className="absolute right-0 top-0 h-full w-[28%] rounded-l-[3rem] bg-[repeating-linear-gradient(90deg,rgba(88,63,42,.12)_0_5px,transparent_5px_18px)] blur-[.2px]" />
      <AnimatedText eyebrow="Create • Innovate • Elevate" title="Build. Elevate." accent="Inspire." body="Fluxenite helps you turn ideas into impactful digital experiences with creativity, performance, and precision." />
      <motion.div variants={fadeUp} initial="hidden" animate="visible" className="relative z-10 mt-10 flex items-center gap-5">
        <a className="cta-dark" href="/features">Discover More <span>→</span></a>
        <a className="cta-light hidden sm:inline-flex" href="/contact">Start a Project</a>
      </motion.div>
      <SceneStage variant="home" className="bottom-0 right-[-10%] top-[8%] w-[76%] max-lg:opacity-50 max-md:hidden" />
      <div className="absolute bottom-8 left-0 z-10 flex items-center gap-4 text-xs font-bold uppercase tracking-[.35em] text-white lg:text-obsidian/70">Scroll to explore <span className="grid h-12 w-12 place-items-center rounded-full bg-white text-obsidian shadow-glass">⌄</span></div>
      <div className="absolute bottom-8 right-8 z-10 hidden gap-4 md:flex"><span className="grid h-9 w-9 place-items-center rounded-full bg-obsidian text-white">𝕏</span><span className="grid h-9 w-9 place-items-center rounded-full bg-obsidian text-white">in</span><span className="grid h-9 w-9 place-items-center rounded-full bg-obsidian text-white">◎</span></div>
    </section>
  );
}
