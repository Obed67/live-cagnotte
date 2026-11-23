"use client";

import { useEffect, useState } from "react";
import { CAGNOTTE_CONFIG } from "./config";

type Handlers = {
  contribute: (value: number) => void;
  reset: () => void;
};

/**
 * Raccourcis clavier invisibles pour tester l'écran (rien ne s'affiche) :
 *  - Espace ou +  : ajoute 500 000 FCFA
 *  - D            : active / coupe les contributions automatiques
 *  - R            : remet le compteur à 47 500 000
 */
export function useDemoShortcuts({ contribute, reset }: Handlers) {
  const [demo, setDemo] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const key = e.key;
      if (key === " " || key === "+" || e.code === "NumpadAdd") {
        e.preventDefault();
        if (!e.repeat) contribute(CAGNOTTE_CONFIG.testIncrement);
      } else if (key === "d" || key === "D") {
        if (!e.repeat) setDemo((v) => !v);
      } else if (key === "r" || key === "R") {
        if (!e.repeat) {
          setDemo(false);
          reset();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [contribute, reset]);

  useEffect(() => {
    if (!demo) return;
    const list = CAGNOTTE_CONFIG.demoIncrements;
    const id = window.setInterval(() => {
      contribute(list[Math.floor(Math.random() * list.length)]);
    }, CAGNOTTE_CONFIG.demoIntervalMs);
    return () => window.clearInterval(id);
  }, [demo, contribute]);
}
