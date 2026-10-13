import {
  Armchair,
  BookOpen,
  Coins,
  Dumbbell,
  Gamepad2,
  Gift,
  Laptop,
  Plane,
  Shirt,
  ShoppingBasket,
  Sparkles,
  Utensils,
} from "lucide-react";
import { VelocityMarquee } from "@/components/ui/velocity-marquee";
import { Highlight, SectionHeading } from "@/components/ui/section-heading";

const rows = [
  [
    { icon: Shirt, label: "Moda" },
    { icon: Laptop, label: "Eletrônicos" },
    { icon: Plane, label: "Viagens" },
    { icon: Armchair, label: "Casa e decoração" },
    { icon: Sparkles, label: "Beleza" },
    { icon: ShoppingBasket, label: "Mercado" },
  ],
  [
    { icon: Gamepad2, label: "Games" },
    { icon: Utensils, label: "Restaurantes" },
    { icon: Dumbbell, label: "Esporte" },
    { icon: BookOpen, label: "Livros" },
    { icon: Gift, label: "Gift cards" },
    { icon: Coins, label: "Serviços" },
  ],
];

const redeem = ["Cashback na conta", "Milhas aéreas", "Investimentos", "Desconto na fatura"];

export function Shop() {
  return (
    <section id="shop" aria-labelledby="shop-titulo" className="overflow-x-clip bg-surface-2/60 py-24 lg:py-36">
      <div className="container-page">
        <div id="shop-titulo">
          <SectionHeading
            align="center"
            eyebrow="Inter Shop + Loop"
            title={
              <>
                Comprar aqui <Highlight>devolve dinheiro.</Highlight>
              </>
            }
            lead="Um shopping inteiro dentro do app, com cashback direto na conta e pontos em cada compra no cartão."
          />
        </div>
      </div>

      {/* Faixa rolante decorativa: a lista real de categorias fica no texto acessível abaixo */}
      <VelocityMarquee className="group mt-14 space-y-3 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        {rows.map((row, r) => (
          <div
            key={r}
            className="flex w-max gap-3 group-hover:[animation-play-state:paused]"
            style={{ animation: `marquee ${r ? 46 : 38}s linear infinite ${r ? "reverse" : ""}` }}
          >
            {[...row, ...row, ...row, ...row].map(({ icon: Icon, label }, i) => (
              <span
                key={i}
                className="flex items-center gap-3 rounded-full border border-border bg-surface py-3 pl-3 pr-6 text-lg font-medium"
              >
                <span className="flex size-10 items-center justify-center rounded-full bg-brand-soft text-brand-ink">
                  <Icon className="size-5" />
                </span>
                {label}
              </span>
            ))}
          </div>
        ))}
      </VelocityMarquee>
      <p className="sr-only">Categorias: {rows.flat().map((c) => c.label).join(", ")}.</p>

      <div className="reveal container-page mt-14 grid gap-4 lg:grid-cols-2">
        <div className="relative overflow-hidden rounded-card bg-brand p-8 text-on-brand lg:p-10">
          <div aria-hidden className="absolute -bottom-24 -right-16 size-72 rounded-full bg-white/25 blur-3xl" />
          <p className="type-label relative">Cashback do mês</p>
          <p className="relative mt-6 font-display text-[clamp(3rem,2rem+4vw,5rem)] font-medium leading-none tracking-[-0.05em] tabular-nums">
            R$ 86,40
          </p>
          <p className="relative mt-4 max-w-sm text-lg">De volta na sua conta, sem precisar pedir nem esperar a fatura fechar.</p>
        </div>

        <div className="rounded-card border border-border bg-surface p-8 lg:p-10">
          <p className="type-label text-brand-ink">Loop · programa de pontos</p>
          <p className="mt-6 font-display text-[clamp(3rem,2rem+4vw,5rem)] font-medium leading-none tracking-[-0.05em] tabular-nums">
            12.480 <span className="text-2xl tracking-normal text-muted">pontos</span>
          </p>
          <p className="mt-4 text-lg text-muted">Você escolhe como usar:</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {redeem.map((option) => (
              <li key={option} className="rounded-full bg-surface-2 px-4 py-2 text-sm font-medium">
                {option}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="container-page mt-4 text-center text-xs text-muted">Valores e pontos meramente ilustrativos.</p>
    </section>
  );
}
