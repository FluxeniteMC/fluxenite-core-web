"use client";

import { motion } from "framer-motion";
import { LuxuryCard } from "@/components/Card";
import { SceneStage } from "@/components/SceneStage";
import type { CardItem } from "@/lib/content";
import { fadeUp, stagger } from "@/lib/animations";

export function CardGridSection({ eyebrow, title, accent, body, items, variant, columns = 4 }: { eyebrow: string; title: string; accent: string; body: string; items: CardItem[]; variant: "features" | "services"; columns?: 4 | 5 }) {
  return (
    <section className="relative mx-auto min-h-[calc(100vh-7rem)] max-w-[1840px] overflow-hidden rounded-[2.5rem] pt-14">
      <SceneStage variant={variant} className="right-[-4%] top-0 h-[55%] w-[58%] max-lg:opacity-40 max-md:hidden" />
      <motion.div variants={stagger} initial="hidden" animate="visible" className="relative z-10 max-w-3xl">
        <motion.p variants={fadeUp} className="eyebrow mb-6">{eyebrow}</motion.p>
        <motion.h1 variants={fadeUp} className="section-title">{title}<br /><span className="gold-text">{accent}</span></motion.h1>
        <motion.p variants={fadeUp} className="mt-7 max-w-[560px] text-lg leading-8 text-neutral-600">{body}</motion.p>
        {variant === "services" && <motion.a variants={fadeUp} className="cta-dark mt-9" href="/contact">Work With Us <span>↗</span></motion.a>}
      </motion.div>
      <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className={`relative z-10 mt-16 grid gap-6 ${columns === 5 ? "xl:grid-cols-5" : "xl:grid-cols-4"} md:grid-cols-2`}>
        {items.map((item) => <LuxuryCard key={item.title} item={item} tall />)}
      </motion.div>
      <div className="glass-panel relative z-10 mt-7 flex flex-col gap-5 p-7 md:flex-row md:items-center md:justify-between"><p className="eyebrow">Work Process</p><h2 className="font-display text-3xl font-bold tracking-[-.05em]">Simple process. Outstanding results.</h2><a href="/contact" className="cta-light">View All Steps →</a></div>
    </section>
  );
}
