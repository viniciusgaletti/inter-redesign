import { Nfc } from "lucide-react";
import { InterLogo } from "@/components/brand/inter-logo";
import { cn } from "@/lib/cn";

/*
 * Os quatro cartões da linha atual do Inter, redesenhados em vetor a partir das imagens
 * oficiais (inter.co/pra-voce/cartoes). Layout horizontal: marca no alto à direita,
 * chip à esquerda, bandeira embaixo à direita.
 */
export const cardTiers = {
  gold: { name: "Gold", sub: null, face: "linear-gradient(118deg, #ffa03a 0%, #ff7a00 42%, #e65a00 100%)", mono: false },
  platinum: { name: "Platinum", sub: null, face: "linear-gradient(118deg, #f1f1f2 0%, #c4c5c8 38%, #8f9195 72%, #b4b5b8 100%)", mono: false },
  prime: { name: "Prime", sub: "prime", face: "linear-gradient(118deg, #4a4a4d 0%, #2a2a2c 45%, #161617 100%)", mono: false },
  win: { name: "Win", sub: "win", face: "linear-gradient(118deg, #24376f 0%, #14224d 45%, #0a1230 100%)", mono: true },
} as const;

export type CardTier = keyof typeof cardTiers;

export function InterCard({ tier = "gold", className }: { tier?: CardTier; className?: string }) {
  const card = cardTiers[tier];
  return (
    <div className={cn("inter-card", className)} style={{ background: card.face }}>
      <div className="inter-card-art">
        {/* marca */}
        <div className="absolute right-[7%] top-[11%] flex w-[36%] flex-col items-end">
          <InterLogo title="" className="w-full" />
          {card.sub && <span className="mt-[0.6cqw] text-[5cqw] font-light leading-none tracking-[-0.02em]">{card.sub}</span>}
        </div>

        {/* chip e aproximação */}
        <div className="absolute left-[9%] top-[41%] flex items-center gap-[3cqw]">
          <span className="inter-card-chip" />
          <Nfc className="size-[6cqw] rotate-90 opacity-80" strokeWidth={1.75} />
        </div>

        {/* bandeira */}
        <div className="absolute bottom-[11%] right-[7%] flex">
          <span className="size-[11cqw] rounded-full" style={{ background: card.mono ? "rgb(255 255 255 / 0.55)" : "#eb001b" }} />
          <span
            className="-ml-[4.4cqw] size-[11cqw] rounded-full mix-blend-hard-light"
            style={{ background: card.mono ? "rgb(255 255 255 / 0.3)" : "#f79e1b" }}
          />
        </div>
      </div>
    </div>
  );
}
