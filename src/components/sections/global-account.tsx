"use client";

import { useState } from "react";
import { ArrowDownUp, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Highlight, SectionHeading } from "@/components/ui/section-heading";
import { brl, usd } from "@/lib/format";

// Cotação fictícia, só para a demonstração.
const RATE = 5.4;

const perks = [
  "Conta em dólar sem tarifa de manutenção",
  "Cartão internacional no débito e no crédito",
  "Ações e ETFs americanos na mesma conta",
];

export function GlobalAccount() {
  const [amount, setAmount] = useState("1000");
  const [toUsd, setToUsd] = useState(true);

  const value = Math.max(0, Number(amount.replace(",", ".")) || 0);
  const converted = toUsd ? value / RATE : value * RATE;
  const from = toUsd ? { code: "BRL", name: "Você envia em reais" } : { code: "USD", name: "Você envia em dólares" };
  const to = toUsd ? { code: "USD", name: "Você recebe em dólares" } : { code: "BRL", name: "Você recebe em reais" };

  return (
    <section id="global" aria-labelledby="global-titulo" className="bg-surface-2/60 py-24 lg:py-36">
      {/* min-w-0 nos filhos: sem isso a largura natural do campo de valor alarga a coluna além da tela */}
      <div className="container-page grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="min-w-0">
          <div id="global-titulo">
            <SectionHeading
              eyebrow="Global Account"
              title={
                <>
                  Seu dinheiro <Highlight>fala dólar.</Highlight>
                </>
              }
              lead="Converta quando a cotação estiver boa, gaste lá fora como quem mora lá e invista no mercado americano."
            />
          </div>
          <ul className="mt-8 space-y-3">
            {perks.map((perk) => (
              <li key={perk} className="flex items-center gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand text-on-brand">
                  <Check aria-hidden className="size-3.5" strokeWidth={3} />
                </span>
                {perk}
              </li>
            ))}
          </ul>
          <Button href="#abrir-conta" variant="secondary" size="lg" className="mt-10">
            Conheça a Global Account
            <ArrowRight aria-hidden className="size-[1.125rem]" />
          </Button>
        </div>

        <div className="reveal min-w-0 rounded-block border border-border bg-surface p-5 shadow-float sm:p-8">
          <p className="type-label text-muted">Simule uma conversão</p>

          <div className="relative mt-5 space-y-2">
            <div className="rounded-card bg-surface-2 p-5 transition-shadow duration-200 focus-within:ring-2 focus-within:ring-brand-ink">
              <label htmlFor="global-amount" className="text-sm text-muted">
                {from.name}
              </label>
              <div className="mt-1 flex items-center gap-3">
                <input
                  id="global-amount"
                  inputMode="decimal"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value.replace(/[^\d.,]/g, "").slice(0, 9))}
                  size={1}
                  className="w-full min-w-0 flex-1 bg-transparent font-display text-3xl font-medium tracking-[-0.04em] tabular-nums focus-visible:outline-none sm:text-4xl"
                />
                <span className="rounded-full bg-surface px-3.5 py-1.5 text-sm font-bold">{from.code}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setToUsd((v) => !v)}
              aria-label="Inverter moedas"
              className="absolute left-1/2 top-1/2 z-10 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-surface bg-brand text-on-brand transition-transform duration-300 ease-out-expo hover:rotate-180"
            >
              <ArrowDownUp aria-hidden className="size-4" />
            </button>

            <div className="rounded-card bg-surface-2 p-5">
              <p className="text-sm text-muted">{to.name}</p>
              <div className="mt-1 flex items-center gap-3">
                <output
                  htmlFor="global-amount"
                  aria-live="polite"
                  className="min-w-0 flex-1 truncate font-display text-3xl font-medium tracking-[-0.04em] tabular-nums sm:text-4xl"
                >
                  {toUsd ? usd(converted) : brl(converted)}
                </output>
                <span className="rounded-full bg-surface px-3.5 py-1.5 text-sm font-bold">{to.code}</span>
              </div>
            </div>
          </div>

          <dl className="mt-5 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Cotação</dt>
              <dd className="font-semibold tabular-nums">US$ 1 = {brl(RATE)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Tarifa de manutenção</dt>
              <dd className="font-semibold text-positive">R$ 0,00</dd>
            </div>
          </dl>
          <p className="mt-5 border-t border-border pt-4 text-xs text-muted">
            Simulação ilustrativa com cotação fictícia. Não considera impostos nem spread.
          </p>
        </div>
      </div>
    </section>
  );
}
