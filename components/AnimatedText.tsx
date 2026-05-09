"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animations";

export function AnimatedText({ eyebrow, title, accent, body }: { eyebrow: string; title: string; accent: string; body: string }) {
  return (
    <motion.div variants={stagger} initial="hidden" animate="visible" className="relative z-10 max-w-3xl">
      <motion.p variants={fadeUp} className="eyebrow mb-7">{eyebrow}</motion.p>
      <motion.h1 variants={fadeUp} className="hero-title">{title}<br /><span className="gold-text">{accent}</span></motion.h1>
      <motion.p variants={fadeUp} className="mt-8 max-w-[520px] text-lg leading-8 text-neutral-600">{body}</motion.p>
    </motion.div>
  );
}
