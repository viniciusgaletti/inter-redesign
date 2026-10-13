import type { ReactNode } from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Car,
  HeartPulse,
  House,
  PawPrint,
  Plane,
  QrCode,
  Smartphone,
} from "lucide-react";
import { InterCard } from "@/components/mockups/inter-card";
import { Badge } from "@/components/ui/badge";
import { Highlight, SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/cn";

function Tile({
  eyebrow,
  title,
  text,
  href,
  className,
  children,
}: {
  eyebrow: string;
  title: string;
  text: string;
  href: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-card border border-border bg-surface p-7 transition-[border-color,transform] duration-300 ease-out-expo hover:-translate-y-1 hover:border-text/25 lg:p-8",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <p className="type-label text-brand-ink">{eyebrow}</p>
        <ArrowUpRight
          aria-hidden
          className="size-5 text-muted transition-[color,transform] duration-300 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-text"
        />
      </div>
      <h3 className="type-h3 mt-3 max-w-[18ch]">{title}</h3>
      <p className="mt-2 max-w-[38ch] text-muted">{text}</p>
      <div aria-hidden className="mt-8 flex flex-1 items-end">
        {children}
      </div>
    </a>
  );
}

const pix = [
  { name: "Lucas Andrade", meta: "Pix recebido · agora", value: "+ R$ 480,00", inbound: true },
  { name: "Aluguel", meta: "Pix agendado · dia 05", value: "R$ 1.900,00", inbound: false },
  { name: "Conta de luz", meta: "Débito automático", value: "R$ 142,70", inbound: false },
];

const shop = [
  ["Moda", "8%"],
  ["Eletrônicos", "5%"],
  ["Viagens", "10%"],
  ["Casa", "6%"],
  ["Beleza", "9%"],
];

const insurance = [
  { icon: HeartPulse, label: "Vida" },
  { icon: House, label: "Casa" },
  { icon: Smartphone, label: "Celular" },
  { icon: Plane, label: "Viagem" },
  { icon: Car, label: "Auto" },
  { icon: PawPrint, label: "Pet" },
];

export function Products() {
  return (
    <section id="produtos" aria-labelledby="produtos-titulo" className="bg-surface-2/60 py-24 lg:py-36">
      <div className="container-page">
        <div id="produtos-titulo">
          <SectionHeading
            eyebrow="Super App"
            title={
              <>
                Um app. <Highlight>Seis jeitos</Highlight> de cuidar do seu dinheiro.
              </>
            }
            lead="Comece pela conta e vá ligando o resto quando fizer sentido. Tudo conversa entre si."
          />
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-12">
          <Tile
            className="reveal lg:col-span-7"
            href="#abrir-conta"
            eyebrow="Conta Digital"
            title="Gratuita de verdade"
            text="Pix ilimitado, boletos, débito automático e cartão de débito. Sem tarifa de abertura nem de manutenção."
          >
            <ul className="w-full space-y-2">
              {pix.map((row, i) => (
                <li
                  key={row.name}
                  className="flex items-center gap-3 rounded-2xl border border-border bg-bg p-3.5"
                  style={{ marginInline: `${i * 0.75}rem`, opacity: 1 - i * 0.22 }}
                >
                  <span
                    className={cn(
                      "flex size-9 shrink-0 items-center justify-center rounded-full",
                      row.inbound ? "bg-positive/12 text-positive" : "bg-surface-2 text-text",
                    )}
                  >
                    {row.inbound ? <ArrowDownLeft className="size-4" /> : <QrCode className="size-4" />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{row.name}</p>
                    <p className="truncate text-xs text-muted">{row.meta}</p>
                  </div>
                  <span className={cn("text-sm font-semibold tabular-nums", row.inbound && "text-positive")}>{row.value}</span>
                </li>
              ))}
            </ul>
          </Tile>

          <Tile
            className="reveal [--stagger:1] lg:col-span-5"
            href="#"
            eyebrow="Cartão de Crédito"
            title="Sem anuidade, com pontos"
            text="Cada compra vira ponto no Loop. Use por aproximação, no celular ou no relógio."
          >
            <div className="relative mx-auto h-44 w-full max-w-xs">
              <div className="absolute inset-x-8 top-0 rotate-6 transition-transform duration-500 ease-out-expo group-hover:rotate-12">
                <InterCard tier="prime" />
              </div>
              <div className="absolute inset-x-8 top-4 -rotate-3 transition-transform duration-500 ease-out-expo group-hover:-rotate-6">
                <InterCard tier="gold" />
              </div>
            </div>
          </Tile>

          <Tile
            className="reveal lg:col-span-4"
            href="#investimentos"
            eyebrow="Investimentos"
            title="Do Porquinho à bolsa"
            text="Renda fixa, fundos, ações e cripto na mesma tela."
          >
            <div className="w-full">
              <div className="flex items-end justify-between">
                <p className="font-display text-2xl font-semibold tracking-[-0.03em] tabular-nums">R$ 34.902,18</p>
                <Badge tone="positive">+ R$ 286,12</Badge>
              </div>
              <svg viewBox="0 0 300 70" className="mt-4 w-full overflow-visible" preserveAspectRatio="none">
                <path
                  d="M0 58 C30 54 45 60 70 48 S110 44 135 36 S175 40 200 26 S250 22 300 8"
                  fill="none"
                  stroke="var(--chart-1)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>
          </Tile>

          <Tile
            className="reveal [--stagger:1] lg:col-span-4"
            href="#global"
            eyebrow="Global Account"
            title="Conta em dólar"
            text="Converta, gaste e invista lá fora sem sair do app."
          >
            <div className="w-full space-y-2">
              {[
                ["BRL", "Real", "R$ 12.480,90"],
                ["USD", "Dólar", "US$ 1.250,00"],
              ].map(([code, name, value]) => (
                <div key={code} className="flex items-center gap-3 rounded-2xl border border-border bg-bg p-3.5">
                  <span className="flex size-9 items-center justify-center rounded-full bg-surface-2 text-[0.6875rem] font-bold">
                    {code}
                  </span>
                  <span className="flex-1 text-sm text-muted">{name}</span>
                  <span className="text-sm font-semibold tabular-nums">{value}</span>
                </div>
              ))}
            </div>
          </Tile>

          <Tile
            className="reveal [--stagger:2] lg:col-span-4"
            href="#shop"
            eyebrow="Inter Shop"
            title="Compre e receba de volta"
            text="Cashback direto na conta em centenas de lojas."
          >
            <ul className="flex flex-wrap gap-2">
              {shop.map(([category, rate]) => (
                <li
                  key={category}
                  className="flex items-center gap-2 rounded-full border border-border bg-bg py-1.5 pl-3.5 pr-1.5 text-sm font-medium"
                >
                  {category}
                  <span className="rounded-full bg-brand px-2 py-0.5 text-xs font-bold text-on-brand">{rate}</span>
                </li>
              ))}
            </ul>
          </Tile>

          <a
            href="#"
            className="reveal group flex flex-col gap-6 rounded-card border border-border bg-surface p-7 transition-colors duration-300 hover:border-text/25 lg:col-span-12 lg:flex-row lg:items-center lg:justify-between lg:p-8"
          >
            <div>
              <p className="type-label text-brand-ink">Seguros</p>
              <h3 className="type-h3 mt-3">Proteção contratada em dois toques</h3>
            </div>
            <ul aria-label="Tipos de seguro" className="flex flex-wrap gap-2">
              {insurance.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2 rounded-full bg-surface-2 px-4 py-2.5 text-sm font-medium">
                  <Icon aria-hidden className="size-4" />
                  {label}
                </li>
              ))}
            </ul>
          </a>
        </div>
        <p className="mt-4 text-xs text-muted">Valores e percentuais de cashback meramente ilustrativos.</p>
      </div>
    </section>
  );
}
