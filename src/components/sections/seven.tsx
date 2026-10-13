"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUp, Sparkles } from "lucide-react";
import { Highlight, SectionHeading } from "@/components/ui/section-heading";

const prompts = [
  {
    question: "Quanto gastei com mercado este mês?",
    answer:
      "Você gastou R$ 1.284,30 em mercado em outubro, 12% a menos que em setembro. A maior compra foi no Mercado Central, de R$ 208,40.",
  },
  {
    question: "Quanto rende R$ 5.000 em um ano?",
    answer:
      "Em um CDB com liquidez diária a 100% do CDI, e supondo um CDI de 10% ao ano, seriam cerca de R$ 5.500 brutos em 12 meses. Quer simular outro prazo?",
  },
  {
    question: "Manda um Pix de R$ 50 pra Ana",
    answer: "Tudo pronto para enviar R$ 50,00 para Ana Ribeiro. É só confirmar com a sua biometria.",
  },
  {
    question: "Onde tem cashback hoje?",
    answer:
      "No Inter Shop há ofertas com até 10% de volta em viagens, 8% em moda e 5% em eletrônicos. Posso abrir alguma categoria?",
  },
];

const fallback =
  "Esta é uma demonstração: por aqui a Seven só responde às sugestões abaixo. No app, ela entende a sua pergunta de verdade.";

export function Seven() {
  const [input, setInput] = useState("");
  const [question, setQuestion] = useState<string | null>(null);
  const [answer, setAnswer] = useState("");
  const [shown, setShown] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval>>(undefined);

  useEffect(() => () => clearInterval(timer.current), []);

  function ask(text: string) {
    const clean = text.trim();
    if (!clean) return;

    const match = prompts.find((p) => p.question === clean);
    const reply = match?.answer ?? fallback;

    clearInterval(timer.current);
    setQuestion(clean);
    setAnswer(reply);
    setInput("");

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(reply.length);
      return;
    }

    setShown(0);
    timer.current = setInterval(() => {
      setShown((n) => {
        if (n >= reply.length) {
          clearInterval(timer.current);
          return n;
        }
        return n + 2;
      });
    }, 18);
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    ask(input);
  }

  const typing = question !== null && shown < answer.length;

  return (
    <section id="seven" aria-labelledby="seven-titulo" className="container-page py-24 lg:py-36">
      <div id="seven-titulo">
        <SectionHeading
          align="center"
          eyebrow="Seven · inteligência artificial"
          title={
            <>
              Pergunte. <Highlight>O app responde.</Highlight>
            </>
          }
          lead="A Seven conhece a sua conta e resolve em uma frase o que antes pedia cinco telas."
        />
      </div>

      <div className="reveal relative mx-auto mt-14 max-w-4xl overflow-hidden rounded-block border border-border bg-brand-soft p-5 sm:p-10">
        <div aria-hidden className="pointer-events-none absolute -left-24 -top-24 size-80 rounded-full bg-brand/30 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-32 -right-16 size-96 rounded-full bg-brand/20 blur-3xl" />

        <div className="relative">
          <form
            onSubmit={onSubmit}
            className="flex items-center gap-2 rounded-full border border-border bg-surface p-2 shadow-float transition-colors duration-200 focus-within:border-brand-ink"
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand text-on-brand">
              <Sparkles aria-hidden className="size-5" />
            </span>
            <label htmlFor="seven-input" className="sr-only">
              Pergunte à Seven
            </label>
            <input
              id="seven-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pergunte ou pesquise"
              autoComplete="off"
              className="h-11 min-w-0 flex-1 bg-transparent px-2 text-lg placeholder:text-muted focus-visible:outline-none"
            />
            <button
              type="submit"
              aria-label="Enviar pergunta"
              disabled={!input.trim()}
              className="flex size-11 shrink-0 items-center justify-center rounded-full bg-text text-bg transition-opacity duration-200 disabled:opacity-25"
            >
              <ArrowUp aria-hidden className="size-5" />
            </button>
          </form>

          <ul aria-label="Sugestões de pergunta" className="mt-4 flex flex-wrap justify-center gap-2">
            {prompts.map((p) => (
              <li key={p.question}>
                <button
                  type="button"
                  onClick={() => ask(p.question)}
                  aria-pressed={question === p.question}
                  className="rounded-full border border-border bg-surface/70 px-4 py-2 text-sm font-medium backdrop-blur transition-colors duration-200 hover:border-text/40 aria-pressed:border-text aria-pressed:bg-text aria-pressed:text-bg"
                >
                  {p.question}
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex min-h-48 flex-col justify-end gap-3" aria-live="polite">
            {question === null ? (
              <p className="m-auto max-w-sm text-center text-muted">Toque em uma sugestão para ver a Seven em ação.</p>
            ) : (
              <>
                <p className="ml-auto max-w-[85%] rounded-3xl rounded-br-lg bg-text px-5 py-3 text-bg">{question}</p>
                <div className="mr-auto flex max-w-[85%] gap-3">
                  <span className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full bg-brand text-on-brand">
                    <Sparkles aria-hidden className="size-4" />
                  </span>
                  {/* O texto completo fica para leitores de tela; a digitação é só visual. */}
                  <p className="rounded-3xl rounded-bl-lg bg-surface px-5 py-3 leading-relaxed">
                    <span className="sr-only">{answer}</span>
                    <span aria-hidden>
                      {answer.slice(0, shown)}
                      {typing && (
                        <span className="ml-0.5 inline-block h-[1.1em] w-0.5 translate-y-0.5 animate-[caret_0.8s_steps(1)_infinite] bg-brand" />
                      )}
                    </span>
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <p className="mt-4 text-center text-xs text-muted">Demonstração ilustrativa. Nomes, valores e respostas são fictícios.</p>
    </section>
  );
}
