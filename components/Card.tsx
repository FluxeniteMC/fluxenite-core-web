"use client";

import { motion } from "framer-motion";
import type { CardItem } from "@/lib/content";
import { fadeUp } from "@/lib/animations";

export function LuxuryCard({ item, tall = false }: { item: CardItem; tall?: boolean }) {
  return (
    <motion.article variants={fadeUp} whileHover={{ y: -10, rotateX: 3, rotateY: -3 }} className={`glass-panel group relative overflow-hidden p-8 ${tall ? "min-h-[320px]" : "min-h-[250px]"}`}>
      <span className="absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-0 group-hover:animate-shimmer group-hover:opacity-100" />
      <div className="mb-7 grid h-16 w-16 place-items-center rounded-2xl bg-neutral-200/50 text-3xl text-bronze shadow-glass">{item.icon}</div>
      <h3 className="mb-4 font-display text-2xl font-extrabold tracking-[-.05em]">{item.title}</h3>
      <p className="text-neutral-600">{item.body}</p>
      <button className="mt-8 border-t border-neutral-200 pt-5 text-sm font-semibold text-bronze">Learn More <span className="ml-5">→</span></button>
    </motion.article>
  );
}
