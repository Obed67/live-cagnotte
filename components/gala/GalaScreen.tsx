"use client";

import Image from "next/image";
import { formatAmount, formatPercent } from "@/lib/cagnotte/format";
import { useAnimatedNumber } from "@/lib/cagnotte/useAnimatedNumber";
import { useCagnotte } from "@/lib/cagnotte/useCagnotte";
import { useDemoShortcuts } from "@/lib/cagnotte/useDemoShortcuts";
import { u } from "./Ornaments";

const FRIEZE_TILE_W = 62; // largeur d'un motif complet (16 colonnes), en --u
const FRIEZE_H = 17.5; // hauteur visible avant le fondu complet (en 16:9)
// Si l'écran n'est pas 16:9, la frise s'allonge pour toucher le bord haut.
const FRIEZE_HEIGHT = `calc(${u(FRIEZE_H)} + (100dvh - ${u(56.25)}) / 2)`;

export default function GalaScreen() {
  const { amount, target, lastIncrement, contribute, reset } = useCagnotte();
  useDemoShortcuts({ contribute, reset });

  const shown = useAnimatedNumber(amount);
  const ratio = target > 0 ? shown / target : 0;
  const progress = Math.min(1, ratio);

  return (
    <main className="relative flex h-dvh w-screen items-center justify-center overflow-hidden bg-ink">
      {/* Frise géométrique continue sur toute la largeur (motifs du hero),
          collée au bord haut, avec un fondu vers le bas */}
      <div
        aria-hidden
        className="gala-frieze pointer-events-none absolute inset-x-0 top-0"
        style={{
          height: FRIEZE_HEIGHT,
          backgroundImage: "url(/assets/gala/pattern-full.svg)",
          backgroundSize: `${u(FRIEZE_TILE_W)} auto`,
          backgroundPosition: "center top",
          backgroundRepeat: "repeat",
        }}
      />

      <section
        className="gala-stage relative select-none overflow-hidden text-cream"
        aria-label="Levée de fonds du Gala des 10 ans"
      >
        {/* Double logo I AM Foundation + 10 ANS */}
        <div
          className="absolute left-1/2 flex -translate-x-1/2 items-center"
          style={{ top: u(6.6), gap: u(0.9) }}
        >
          <Image
            src="/assets/gala/logo-iam.svg"
            alt="I AM Foundation"
            width={102}
            height={102}
            priority
            unoptimized
            className="gala-logo"
            style={{ width: u(8.3), height: u(8.3) }}
          />
          <Image
            src="/assets/gala/logo-10ans.svg"
            alt="10 ans"
            width={102}
            height={102}
            priority
            unoptimized
            className="gala-logo"
            style={{ width: u(8.3), height: u(8.3) }}
          />
        </div>

        {/* GALA DES 10 ANS · LEVÉE DE FONDS */}
        <p
          className="absolute inset-x-0 -translate-y-1/2 text-center font-medium uppercase text-gold"
          style={{ top: u(21), fontSize: u(1.55), letterSpacing: "0.12em" }}
        >
          Gala des 10 ans
          <span style={{ margin: `0 ${u(1)}` }}>·</span>
          Levée de fonds
        </p>

        {/* Compteur live */}
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{ top: u(27.6), width: u(62.5) }}
        >
          {/* + 500 000 FCFA */}
          <div
            className="tabular flex justify-end font-medium text-gold"
            style={{ height: u(2.2), fontSize: u(1.5) }}
            aria-live="polite"
          >
            {lastIncrement && (
              <span key={lastIncrement.id} className="gala-increment">
                +&nbsp;{formatAmount(lastIncrement.value)}&nbsp;FCFA
              </span>
            )}
          </div>

          <div
            className="flex items-baseline justify-center whitespace-nowrap text-gold"
            style={{ gap: u(1.4), marginTop: u(0.2) }}
          >
            <span
              className="tabular font-black leading-none"
              style={{ fontSize: u(10), letterSpacing: "-0.025em" }}
            >
              {formatAmount(shown)}
            </span>
            <span className="font-bold leading-none" style={{ fontSize: u(2.25) }}>
              FCFA
            </span>
          </div>

          {/* Barre de progression */}
          <div
            className="relative border border-gold/80"
            style={{ marginTop: u(2.6), height: u(1.4) }}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={target}
            aria-valuenow={Math.round(shown)}
          >
            <div
              className="absolute inset-y-0 left-0 bg-gold"
              style={{ width: `${progress * 100}%` }}
            />
          </div>

          {/* Pourcentage centré sous la barre */}
          <p
            className="tabular text-center font-medium text-gold"
            style={{ marginTop: u(1.3), fontSize: u(1.6) }}
          >
            {formatPercent(ratio)}&nbsp;%
          </p>
        </div>

        {/* Pied de page */}
        <p
          className="absolute inset-x-0 -translate-y-1/2 text-center font-medium text-gold/90"
          style={{ top: u(53), fontSize: u(1.45) }}
        >
          I AM Foundation
        </p>
      </section>
    </main>
  );
}

