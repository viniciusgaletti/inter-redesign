import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Highlight, SectionHeading } from "@/components/ui/section-heading";

const questions = [
  {
    q: "A conta é gratuita mesmo?",
    a: "Sim. Não há tarifa de abertura nem de manutenção na conta digital. Serviços específicos podem ter custo, sempre informado antes de você contratar.",
  },
  {
    q: "Quanto tempo leva para abrir?",
    a: "O cadastro é feito inteiro pelo app. Depois de enviado, a conta passa por análise e a resposta chega em até 3 dias úteis.",
  },
  {
    q: "O cartão de crédito tem anuidade?",
    a: "Não. O cartão não tem anuidade, e o limite depende de uma análise de crédito.",
  },
  {
    q: "Meu dinheiro está protegido?",
    a: "Depósitos em conta e aplicações como o CDB contam com a garantia do Fundo Garantidor de Créditos, dentro dos limites definidos pelo próprio fundo.",
  },
  {
    q: "Consigo usar fora do Brasil?",
    a: "Sim. Com a Global Account você mantém saldo em dólar, usa o cartão internacional e investe no mercado americano pelo mesmo app.",
  },
  {
    q: "Este site é do Inter?",
    a: "Não. Esta página é um redesign conceitual, feito como estudo de design e front-end. Para abrir uma conta de verdade, use os canais oficiais em inter.co.",
  },
];

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-titulo" className="container-page pb-24 lg:pb-36">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div id="faq-titulo">
          <SectionHeading
            eyebrow="Perguntas frequentes"
            title={
              <>
                Antes de abrir, <Highlight>tire a dúvida.</Highlight>
              </>
            }
          />
        </div>
        <Accordion type="single" collapsible defaultValue="0" className="border-t border-border">
          {questions.map(({ q, a }, i) => (
            <AccordionItem key={q} value={String(i)}>
              <AccordionTrigger>{q}</AccordionTrigger>
              <AccordionContent>{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
