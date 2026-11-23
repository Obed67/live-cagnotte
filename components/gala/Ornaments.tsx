import type { CSSProperties } from "react";

export const u = (n: number) => `calc(var(--u) * ${n})`;

/** Petit losange or (◆) net, dessiné en CSS. */
export function Diamond({
  size = 0.7,
  className = "",
  style,
}: {
  size?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      aria-hidden
      className={`inline-block shrink-0 rotate-45 bg-gold ${className}`}
      style={{ width: u(size), height: u(size), ...style }}
    />
  );
}

/** Filet or très fin, avec losange(s) aux extrémités. */
export function Hairline({
  ends = "both",
  className = "",
  style,
}: {
  ends?: "start" | "end" | "both";
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      aria-hidden
      className={`flex items-center ${className}`}
      style={style}
    >
      {ends !== "end" && <Diamond size={0.55} />}
      <span
        className="h-px flex-1 bg-gold/70"
        style={{ minHeight: 1, height: u(0.09) }}
      />
      {ends !== "start" && <Diamond size={0.55} />}
    </span>
  );
}
