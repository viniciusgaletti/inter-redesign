import type { ReactNode } from "react";
import { BatteryFull, Signal, Wifi } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Aparelho em CSS: moldura metálica, botões laterais, borda preta e ilha.
 * O conteúdo é desenhado numa tela de 280 x 604 px e escalado junto com o aparelho,
 * então as telas são escritas uma vez e servem em qualquer tamanho.
 */
export function Phone({ children, className, label }: { children: ReactNode; className?: string; label?: string }) {
  return (
    <div
      role={label ? "img" : undefined}
      aria-label={label || undefined}
      aria-hidden={label ? undefined : true}
      className={cn("phone w-full", className)}
    >
      <span aria-hidden className="phone-btn left-0 top-[19%] h-[4.5%]" />
      <span aria-hidden className="phone-btn left-0 top-[27%] h-[8%]" />
      <span aria-hidden className="phone-btn left-0 top-[37.5%] h-[8%]" />
      <span aria-hidden className="phone-btn right-0 top-[30%] h-[13%]" />
      <div aria-hidden className="phone-frame">
        <div className="phone-bezel">
          <div className="phone-screen">
            <div className="phone-canvas">
              {children}
              <div className="absolute left-1/2 top-[11px] z-30 flex h-[25px] w-[84px] -translate-x-1/2 items-center justify-end rounded-full bg-black pr-[9px]">
                <span className="size-[7px] rounded-full bg-[#15171c] ring-1 ring-inset ring-white/10" />
              </div>
            </div>
            <div className="phone-glare" />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Hora, sinal e bateria. Cada tela desenha a sua, na cor que combina com o fundo. */
export function StatusBar({ className }: { className?: string }) {
  return (
    <div className={cn("flex h-[46px] shrink-0 items-center justify-between px-[26px] pt-[6px] text-[13px] font-semibold", className)}>
      <span className="tabular-nums tracking-[-0.01em]">9:41</span>
      <span className="flex items-center gap-[5px]">
        <Signal className="size-[13px]" strokeWidth={2.75} />
        <Wifi className="size-[13px]" strokeWidth={2.75} />
        <BatteryFull className="size-[19px]" strokeWidth={2} />
      </span>
    </div>
  );
}

export function HomeBar({ className }: { className?: string }) {
  return <span className={cn("absolute bottom-[7px] left-1/2 z-20 h-[4px] w-[104px] -translate-x-1/2 rounded-full bg-current opacity-80", className)} />;
}
