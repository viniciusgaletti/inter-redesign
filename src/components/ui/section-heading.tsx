import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Palavra-chave em laranja dentro de um título: a assinatura visual herdada do site original. */
export function Highlight({ children }: { children: ReactNode }) {
  return <span className="text-brand-display">{children}</span>;
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("reveal max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <p className="type-label mb-4 text-brand-ink">{eyebrow}</p>}
      <h2 className="type-h2 ink">{title}</h2>
      {lead && <p className="type-lead mt-5 text-muted">{lead}</p>}
    </div>
  );
}
