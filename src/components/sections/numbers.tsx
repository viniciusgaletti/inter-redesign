import { numbers, numbersSource } from "@/content/numbers";
import { CountUp } from "@/components/ui/count-up";
import { Highlight, SectionHeading } from "@/components/ui/section-heading";

export function Numbers() {
  return (
    <section aria-labelledby="numeros-titulo" className="container-page py-24 lg:py-36">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div id="numeros-titulo">
          <SectionHeading
            eyebrow="Em números"
            title={
              <>
                Um banco do tamanho <Highlight>de um país.</Highlight>
              </>
            }
            lead="Quem começa pela conta gratuita costuma ficar pelo resto: investir, comprar, viajar e empreender sem trocar de app."
          />
        </div>

        <div>
          <dl className="grid grid-cols-2 border-l border-t border-border">
            {numbers.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse justify-end border-b border-r border-border p-6 lg:p-9">
                <dt className="mt-3 text-sm text-muted lg:text-base">{stat.label}</dt>
                <dd className="whitespace-nowrap font-display text-[clamp(2rem,1.1rem+3.2vw,3.75rem)] font-medium leading-none tracking-[-0.045em]">
                  {stat.prefix}
                  <CountUp value={stat.value} decimals={stat.decimals} />
                  <span className="text-brand-display">{stat.suffix}</span>
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-xs text-muted">{numbersSource}</p>
        </div>
      </div>
    </section>
  );
}
