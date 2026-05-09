import Link from "next/link";

export function Footer() {
  return (
    <footer className="mx-auto mt-8 flex max-w-[1840px] flex-col gap-5 rounded-[2rem] border border-white/70 bg-white/35 p-5 text-sm text-neutral-600 shadow-glass backdrop-blur-xl md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-5"><span className="grid h-12 w-12 place-items-center rounded-full bg-white text-bronze shadow-glass">✦</span><p className="text-lg text-obsidian">Let&apos;s build <span className="text-bronze">the future</span> together.</p></div>
      <p>© 2026 Fluxenite. All rights reserved.</p>
      <div className="flex gap-8"><Link href="/">Privacy Policy</Link><Link href="/">Terms of Service</Link><a href="#top">↑</a></div>
    </footer>
  );
}
