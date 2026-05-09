"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { SceneStage } from "@/components/SceneStage";
import { fadeUp, stagger } from "@/lib/animations";

const contactRows = [["✉", "Email Us", "hello@fluxenite.com"], ["☎", "Call Us", "+1 (555) 123-4567"], ["⌖", "Visit Us", "123 Innovation Drive, San Francisco"], ["◷", "Office Hours", "Mon - Fri: 9:00 AM - 6:00 PM"]];

export function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (!formRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".contact-field", { y: 18, opacity: 0, stagger: 0.08, duration: 0.7, ease: "power3.out", delay: 0.25 });
    }, formRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative mx-auto grid min-h-[calc(100vh-7rem)] max-w-[1840px] items-center gap-12 overflow-hidden rounded-[2.5rem] lg:grid-cols-[.9fr_1.1fr]">
      <SceneStage variant="contact" className="bottom-0 left-[30%] top-[13%] w-[42%] max-xl:opacity-35 max-lg:hidden" />
      <motion.div variants={stagger} initial="hidden" animate="visible" className="relative z-10">
        <motion.p variants={fadeUp} className="eyebrow mb-7">Contact Us</motion.p>
        <motion.h1 variants={fadeUp} className="section-title">Let&apos;s create<br />something amazing<br /><span className="gold-text">together.</span></motion.h1>
        <motion.p variants={fadeUp} className="mt-7 max-w-[520px] text-lg leading-8 text-neutral-600">Have a project in mind or want to learn more about Fluxenite? We&apos;d love to hear from you.</motion.p>
        <motion.div variants={stagger} className="mt-10 grid gap-6">{contactRows.map(([icon, label, value]) => <motion.div variants={fadeUp} key={label} className="flex items-center gap-5"><span className="grid h-14 w-14 place-items-center rounded-full bg-neutral-200/60 text-xl text-bronze shadow-glass">{icon}</span><span><b>{label}</b><p className="text-neutral-600">{value}</p></span></motion.div>)}</motion.div>
        <motion.div variants={fadeUp} className="mt-12 flex items-center gap-5"><span className="eyebrow">Follow Us</span>{["in", "𝕏", "◎", "Be"].map((x) => <span key={x} className="grid h-11 w-11 place-items-center rounded-full bg-white/60 font-bold shadow-glass">{x}</span>)}</motion.div>
      </motion.div>
      <motion.form ref={formRef} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} className="glass-panel relative z-10 ml-auto w-full max-w-[610px] p-8 lg:p-12">
        <h2 className="mb-8 font-display text-3xl font-extrabold tracking-[-.06em]">Send us a message</h2>
        {[["Your Name", "text"], ["Your Email", "email"], ["Subject", "text"]].map(([placeholder, type]) => <input key={placeholder} type={type} placeholder={placeholder} className="contact-field mb-5 h-14 w-full rounded-xl border border-neutral-200 bg-white/45 px-5 outline-none transition focus:border-bronze focus:bg-white" />)}
        <textarea placeholder="Your Message" rows={5} className="contact-field mb-6 w-full resize-none rounded-xl border border-neutral-200 bg-white/45 px-5 py-4 outline-none transition focus:border-bronze focus:bg-white" />
        <button type="button" className="contact-field cta-dark w-full">Send Message <span>→</span></button>
        <p className="contact-field mt-6 text-sm text-neutral-500">⌑ We respect your privacy. Your information is safe with us.</p>
      </motion.form>
    </section>
  );
}
