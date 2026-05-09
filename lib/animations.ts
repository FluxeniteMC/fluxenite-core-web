export const easeOut = [0.16, 1, 0.3, 1] as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 34, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: easeOut } }
};

export const stagger = {
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } }
};
