import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Etiqueta de vidro: usada sobre imagens e mockups. */
export function Chip({
  icon,
  children,
  className,
  style,
}: {
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      style={style}
      className={cn(
        "inline-flex items-center gap-2.5 rounded-2xl border border-glass-border bg-glass px-3.5 py-2.5 text-sm shadow-float backdrop-blur-xl",
        className,
      )}
    >
      {icon}
      <div className="leading-tight">{children}</div>
    </div>
  );
}
