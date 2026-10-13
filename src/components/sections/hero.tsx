import type { CSSProperties } from "react";
import { ArrowRight, BadgeCheck, Check, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { Highlight } from "@/components/ui/section-heading";
import { InterCard } from "@/components/mockups/inter-card";

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

export function Hero() {
  return (
    <section id="topo" className="relative overflow-x-clip">
      {/* Atmosfera: brilho quente atrás do aparelho + malha de pontos que some para a esquerda */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-12%] size-[52rem] rounded-full bg-(--glow) blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(var(--border)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_60%_70%_at_78%_45%,black,transparent)]"
      />

      <div className="container-page relative grid items-center gap-10 pb-20 pt-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-8 lg:pb-28 lg:pt-16">
        <div className="hero-copy">
          <p
            className="animate-rise inline-flex items-center gap-2 rounded-full border border-border bg-surface py-1 pl-1 pr-3.5 text-sm"
            style={delay(0)}
          >
            <span className="rounded-full bg-brand px-2 py-0.5 text-xs font-bold text-on-brand">Novo</span>
            Seven, a inteligência artificial do seu Super App
          </p>

          <h1 className="type-display animate-slide-up mt-7">
            Sua vida financeira inteira, <Highlight>num app só.</Highlight>
          </h1>

          <p className="type-lead animate-slide-up mt-7 max-w-xl text-muted">
            Conta gratuita, cartão sem anuidade, investimentos, dólar e compras com cashback. Tudo no mesmo lugar, sem
            tarifa escondida.
          </p>

          <div className="animate-rise mt-9 flex flex-wrap items-center gap-3" style={delay(240)}>
            <Button href="#abrir-conta" size="lg">
              Abra sua conta
              <ArrowRight aria-hidden className="size-[1.125rem]" />
            </Button>
            <Button href="#produtos" size="lg" variant="secondary">
              Conheça o Super App
            </Button>
          </div>

          <div className="animate-rise mt-10 flex items-center gap-2 text-sm text-muted" style={delay(320)}>
            <BadgeCheck aria-hidden className="size-[1.125rem] text-positive" />
            Gratuito para abrir, gratuito para manter.
          </div>
        </div>

        <div className="hero-card-slot relative order-first mx-auto w-full max-w-[min(72vw,20rem)] pb-4 pt-2 lg:order-none lg:mr-16 lg:max-w-[25rem] lg:p-0">
          <div data-hero-card className="hero-card">
            <InterCard tier="gold" />
          </div>

          <Chip
            className="absolute -left-2 top-0 hidden sm:inline-flex lg:-left-16 lg:top-[-14%] lg:animate-float"
            icon={
              <span className="flex size-8 items-center justify-center rounded-full bg-positive/15 text-positive">
                <Check aria-hidden className="size-4" strokeWidth={3} />
              </span>
            }
          >
            <span className="block text-xs text-muted">Compra aprovada</span>
            <span className="block font-semibold tabular-nums">R$ 208,40</span>
          </Chip>

          <Chip
            className="absolute -right-3 -bottom-3 lg:-right-10 lg:bottom-[-16%] lg:animate-float"
            style={delay(-2400)}
            icon={
              <span className="flex size-8 items-center justify-center rounded-full bg-brand text-on-brand">
                <Coins aria-hidden className="size-4" />
              </span>
            }
          >
            <span className="block text-xs text-muted">Cashback</span>
            <span className="block font-semibold tabular-nums">+ R$ 3,12</span>
          </Chip>
        </div>
      </div>
    </section>
  );
}
