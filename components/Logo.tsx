import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" aria-label="Fluxenite home" className="group flex items-center gap-3">
      <span className="relative grid h-11 w-11 place-items-center rounded-2xl bg-obsidian text-white shadow-luxury transition group-hover:-rotate-3">
        <span className="font-display text-3xl font-black leading-none">F</span>
        <span className="absolute right-2 top-2 h-1.5 w-5 rounded-full bg-white" />
      </span>
      <span className="font-display text-2xl font-black tracking-[-.06em]">fluxenite</span>
    </Link>
  );
}
