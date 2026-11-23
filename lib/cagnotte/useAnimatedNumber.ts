"use client";

import { useEffect, useRef, useState } from "react";

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Fait « rouler » un nombre vers sa nouvelle valeur (requestAnimationFrame).
 */
export function useAnimatedNumber(target: number, duration = 1800): number {
  const [display, setDisplay] = useState(target);
  const displayRef = useRef(target);

  useEffect(() => {
    const from = displayRef.current;
    if (from === target) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const total = reduce ? 0 : duration;
    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = total === 0 ? 1 : Math.min(1, (now - start) / total);
      const value = from + (target - from) * easeOutCubic(t);
      displayRef.current = value;
      setDisplay(value);
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return display;
}
