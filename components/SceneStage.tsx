"use client";

import dynamic from "next/dynamic";

const FluxScene = dynamic(() => import("@/three/FluxScene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_44%,rgba(255,255,255,.9),transparent_32%)]" />
});

export function SceneStage({ variant, className = "" }: { variant?: "home" | "features" | "about" | "services" | "contact"; className?: string }) {
  return <div className={`pointer-events-auto absolute ${className}`}><FluxScene variant={variant} /></div>;
}
