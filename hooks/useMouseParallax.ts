"use client";

import { useEffect, useState } from "react";

export function useMouseParallax(strength = 1) {
  const [point, setPoint] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let frame = 0;
    const handleMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setPoint({
          x: ((event.clientX / window.innerWidth) - 0.5) * strength,
          y: ((event.clientY / window.innerHeight) - 0.5) * strength
        });
      });
    };
    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handleMove);
    };
  }, [strength]);

  return point;
}
