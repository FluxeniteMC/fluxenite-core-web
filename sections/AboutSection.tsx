"use client";

import { motion } from "framer-motion";
import { AnimatedText } from "@/components/AnimatedText";
import { SceneStage } from "@/components/SceneStage";
import { stats, values } from "@/lib/content";
import { fadeUp, stagger } from "@/lib/animations";

export function AboutSection() {
  return (
    <section className="relative mx-auto min-h-[calc(100vh-7rem)] max-w-[1840px] overflow-hidden rounded-[2.5rem] pt-14">
      <AnimatedText eyebrow="About Fluxenite" title="We turn ideas" accent="into impact." body="Fluxenite is a digital innovation company focused on building powerful, scalable, and meaningful solutions that help businesses grow in the digital age." />
      <motion.a variants={fadeUp} initial="hidden" animate="visible" className="cta-light relative z-10 mt-8" href="/contact">Our Story <span>→</span></motion.a>
      <SceneStage variant="about" className="right-[-6%] top-[2%] h-[56%] w-[64%] max-lg:opacity-40 max-md:hidden" />
      <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="glass-panel relative z-10 mt-20 grid gap-10 p-8 lg:grid-cols-[1fr_1.22fr] lg:p-14">
        <div><p className="eyebrow mb-8">Our Values</p><div className="grid gap-8 sm:grid-cols-2">{values.map((value) => <motion.div variants={fadeUp} className="flex gap-5" key={value.title}><span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-neutral-200/60 text-2xl text-bronze shadow-glass">{value.icon}</span><span><h3 className="font-display text-2xl font-extrabold tracking-[-.05em]">{value.title}</h3><p className="mt-2 text-neutral-600">{value.body}</p></span></motion.div>)}</div></div>
        <div className="border-neutral-200 lg:border-l lg:pl-14"><p className="eyebrow mb-8">By the Numbers</p><div className="grid gap-7 sm:grid-cols-2">{stats.map(([number, label]) => <motion.div variants={fadeUp} key={label} className="border-b border-neutral-200 pb-7"><p className="gold-text font-display text-6xl font-black tracking-[-.08em]">{number}</p><p className="mt-2 font-semibold">{label}</p></motion.div>)}</div></div>
      </motion.div>
    </section>
  );
}
