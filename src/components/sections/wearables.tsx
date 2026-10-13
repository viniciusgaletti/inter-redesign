"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight, Nfc } from "lucide-react";
import { Highlight, SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/cn";

const slides = [
  { title: "Tecnologia de ponta", text: "Um chip de pagamento dentro de um anel, uma pulseira ou um relógio.", tone: "brand", shape: "ring" },
  { title: "Só aproximar, pagar e pronto", text: "Sem tirar o celular do bolso e sem abrir a carteira.", tone: "dark", shape: "band" },
  { title: "Use onde estiver", text: "Na corrida, na praia ou no show, o pagamento vai com você.", tone: "soft", shape: "watch" },
  { title: "Proteção para pagamentos", text: "Perdeu? Bloqueie pelo app na mesma hora.", tone: "plain", shape: "ring" },
] as const;

const tones = {
  brand: "bg-brand text-on-brand",
  dark: "bg-[#1a1614] text-[#f6f1ea]",
  soft: "bg-brand-soft text-text",
  plain: "border border-border bg-surface text-text",
};

function Device({ shape }: { shape: (typeof slides)[number]["shape"] }) {
  const common = "absolute -right-10 -top-10 border-current opacity-90 transition-transform duration-700 ease-out-expo group-hover:rotate-6 group-hover:scale-105";
  if (shape === "ring") return <span aria-hidden className={cn(common, "size-56 rounded-full border-[1.75rem]")} />;
  if (shape === "band") return <span aria-hidden className={cn(common, "h-40 w-72 -rotate-12 rounded-full border-[1.5rem]")} />;
  return <span aria-hidden className={cn(common, "size-52 rotate-6 rounded-[3rem] border-[1.25rem]")} />;
}

export function Wearables() {
  const track = useRef<HTMLUListElement>(null);

  function move(direction: 1 | -1) {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    el.scrollBy({ left: direction * ((card?.clientWidth ?? 400) + 16), behavior: "smooth" });
  }

  return (
    <section id="wearables" aria-labelledby="wearables-titulo" className="overflow-x-clip py-24 lg:py-36">
      <div className="container-page flex items-end justify-between gap-8">
        <div id="wearables-titulo">
          <SectionHeading
            eyebrow="Wearables"
            title={
              <>
                O futuro dos pagamentos <Highlight>cabe no dedo.</Highlight>
              </>
            }
          />
        </div>
        <div className="hidden shrink-0 gap-2 sm:flex">
          {([-1, 1] as const).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => move(d)}
              aria-label={d === -1 ? "Anterior" : "Próximo"}
              className="flex size-12 items-center justify-center rounded-full border border-border bg-surface transition-colors duration-200 hover:border-text/40"
            >
              {d === -1 ? <ArrowLeft aria-hidden className="size-5" /> : <ArrowRight aria-hidden className="size-5" />}
            </button>
          ))}
        </div>
      </div>

      {/* Carrossel nativo: rolagem horizontal com snap, sem prender o scroll da página */}
      <ul
        ref={track}
        tabIndex={0}
        aria-label="Vantagens dos wearables"
        className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-[max(1.25rem,calc((100vw-80rem)/2+2.5rem))] px-[max(1.25rem,calc((100vw-80rem)/2+2.5rem))] pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((slide, i) => (
          <li
            key={slide.title}
            className={cn(
              "group relative flex h-[26rem] w-[min(84vw,32rem)] shrink-0 snap-start flex-col justify-end overflow-hidden rounded-block p-8 lg:p-10",
              tones[slide.tone],
            )}
          >
            <Device shape={slide.shape} />
            <Nfc aria-hidden className="absolute left-8 top-8 size-7 lg:left-10 lg:top-10" />
            <p className="type-label relative">0{i + 1}</p>
            <h3 className="relative mt-3 font-display text-3xl font-medium leading-[1.05] tracking-[-0.03em] lg:text-4xl">
              {slide.title}
            </h3>
            <p className="relative mt-3 max-w-xs text-lg opacity-85">{slide.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
