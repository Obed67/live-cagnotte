const NBSP = "\u00A0";

/** 47500000 → "47 500 000" (espaces insécables, format français). */
export function formatAmount(value: number): string {
  const n = Math.max(0, Math.round(value));
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, NBSP);
}

/** 0.475 → "47,5" ; 0.5 → "50" (une décimale max, virgule française). */
export function formatPercent(ratio: number): string {
  const pct = Math.max(0, ratio * 100);
  const fixed = (Math.floor(pct * 10) / 10).toFixed(1);
  return fixed.replace(/\.0$/, "").replace(".", ",");
}

export { NBSP };
