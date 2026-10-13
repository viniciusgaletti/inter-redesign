import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Highlight } from "@/components/ui/section-heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const profiles = [
  {
    value: "mei",
    label: "MEI",
    title: "Para quem empreende só",
    text: "Separe o dinheiro do negócio do seu, sem pagar por isso.",
    features: ["Conta PJ sem mensalidade", "Pix e boletos de cobrança", "Maquininha no celular"],
  },
  {
    value: "pme",
    label: "Pequenas e médias",
    title: "Para a empresa que está crescendo",
    text: "Receba, pague e antecipe sem depender de gerente.",
    features: ["Maquininha e link de pagamento", "Antecipação de recebíveis", "Folha de pagamento e cartões para o time"],
  },
  {
    value: "corp",
    label: "Grandes empresas",
    title: "Para operações complexas",
    text: "Atendimento dedicado e soluções sob medida.",
    features: ["Gerente e mesa especializada", "Câmbio e conta global para empresas", "Crédito estruturado"],
  },
];

const bars = [38, 52, 44, 68, 60, 84, 76];
const days = ["S", "T", "Q", "Q", "S", "S", "D"];

export function Business() {
  return (
    <section id="empresas" aria-labelledby="empresas-titulo" className="container-page py-24 lg:py-36">
      {/* Bloco sempre escuro: os tokens do tema escuro valem só aqui dentro */}
      <div data-theme="dark" className="reveal overflow-hidden rounded-block border border-border bg-bg p-6 text-text sm:p-10 lg:p-16">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <p className="type-label text-brand-ink">Para empresas</p>
            <h2 id="empresas-titulo" className="type-h2 mt-4">
              O seu negócio <Highlight>também cabe aqui.</Highlight>
            </h2>

            <Tabs defaultValue="mei" className="mt-10">
              <TabsList aria-label="Porte da empresa" className="max-w-full overflow-x-auto">
                {profiles.map((p) => (
                  <TabsTrigger key={p.value} value={p.value}>
                    {p.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              {profiles.map((p) => (
                <TabsContent key={p.value} value={p.value} className="mt-8 data-[state=active]:animate-[rise_0.5s_var(--ease-out-expo)]">
                  <h3 className="type-h3">{p.title}</h3>
                  <p className="mt-2 text-muted">{p.text}</p>
                  <ul className="mt-6 space-y-3">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-3">
                        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand text-on-brand">
                          <Check aria-hidden className="size-3.5" strokeWidth={3} />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </TabsContent>
              ))}
            </Tabs>

            <Button href="#abrir-conta" size="lg" className="mt-10">
              Abra a conta da sua empresa
              <ArrowRight aria-hidden className="size-[1.125rem]" />
            </Button>
          </div>

          <div aria-hidden className="self-end rounded-card border border-border bg-surface p-6">
            <p className="text-sm text-muted">Vendas da semana</p>
            <p className="mt-1 font-display text-4xl font-medium tracking-[-0.04em] tabular-nums">R$ 8.420,00</p>
            <div className="mt-8 flex h-40 items-end gap-2">
              {bars.map((h, i) => (
                <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                  <div
                    className={i === 5 ? "w-full rounded-t-md bg-brand" : "w-full rounded-t-md bg-surface-2"}
                    style={{ height: `${h}%` }}
                  />
                  <span className="text-xs text-muted">{days[i]}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-between rounded-2xl bg-surface-2 p-4 text-sm">
              <span className="text-muted">Disponível para antecipar</span>
              <span className="font-semibold tabular-nums">R$ 3.150,00</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
