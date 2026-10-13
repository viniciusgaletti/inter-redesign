"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Check } from "lucide-react";
import { onboarding } from "@/content/onboarding";
import { OnboardingScreen } from "@/components/mockups/onboarding-screens";
import { Phone } from "@/components/mockups/phone";
import { Highlight, SectionHeading } from "@/components/ui/section-heading";

const LAST = onboarding.length - 1;
const index = (i: number) => ({ "--i": i }) as CSSProperties;

export function HowItWorks() {
  const root = useRef<HTMLElement>(null);
  const list = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);

  // O scroll é a linha do tempo: --p vai de 0 a 5 conforme a lista de passos cruza a linha de foco,
  // e o CSS deriva dele a tela do celular, o destaque do texto e o trilho de progresso.
  useEffect(() => {
    const section = root.current;
    const steps = list.current;
    if (!section || !steps) return;

    const desktop = matchMedia("(min-width: 64rem)");
    let frame = 0;
    let near = true;

    const update = () => {
      frame = 0;
      const box = steps.getBoundingClientRect();
      // No celular o aparelho fica fixo no topo, então o foco desce para a parte livre da tela.
      const line = window.innerHeight * (desktop.matches ? 0.5 : 0.74);
      const progress = (line - box.top) / box.height;
      // Um quarto de passo de folga em cada ponta: é o trecho em que a primeira e a última tela se animam por dentro.
      const p = Math.min(LAST + 0.25, Math.max(-0.25, progress * onboarding.length - 0.5));
      // 0 quando a lista aponta na base da tela, 1 quando chega perto do meio: endireita o aparelho.
      const enter = Math.min(1, Math.max(0, (window.innerHeight - box.top) / (window.innerHeight * 0.55)));
      section.style.setProperty("--p", p.toFixed(3));
      section.style.setProperty("--enter", enter.toFixed(3));
      setActive(Math.min(LAST, Math.max(0, Math.round(p))));
    };
    const request = () => {
      if (near && !frame) frame = requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        near = entry.isIntersecting;
        request();
      },
      { rootMargin: "25% 0px" },
    );
    observer.observe(section);
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    request();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      ref={root}
      id="abrir-conta"
      aria-labelledby="como-funciona-titulo"
      className="hiw pt-24 lg:pt-36"
      style={{ "--p": -0.25, "--last": LAST } as CSSProperties}
    >
      <div className="container-page">
        <div id="como-funciona-titulo">
          <SectionHeading
            eyebrow="Como funciona"
            title={
              <>
                Da tela inicial à <Highlight>conta aberta.</Highlight>
              </>
            }
            lead="Seis passos, todos pelo celular. Role para acompanhar o caminho inteiro."
          />
        </div>

        <div className="mt-10 lg:mt-4 lg:grid lg:grid-cols-[1fr_minmax(0,26rem)] lg:gap-16">
          {/* Aparelho fixo: no celular gruda no topo; no desktop fica centralizado na coluna da direita */}
          <div
            aria-hidden
            className="hiw-stage sticky top-[4.25rem] z-10 -mx-5 flex h-[46svh] items-center justify-center bg-bg px-5 pb-3 pt-2 motion-reduce:hidden lg:top-24 lg:order-2 lg:mx-0 lg:h-[calc(100svh-8.5rem)] lg:bg-transparent lg:p-0"
          >
            <div className="hiw-device relative aspect-[9/18.7] h-full max-h-[39rem]">
              <Phone>
                {onboarding.map((step, i) => (
                  <div key={step.key} className="hiw-screen absolute inset-0" style={index(i)}>
                    <OnboardingScreen step={step.key} />
                  </div>
                ))}
              </Phone>
            </div>
          </div>

          <div className="relative lg:order-1">
            <div aria-hidden className="absolute bottom-0 left-[1.0625rem] top-0 w-px bg-border motion-reduce:hidden">
              <div className="hiw-rail h-full w-full origin-top bg-brand" />
            </div>

            <ol ref={list}>
              {onboarding.map((step, i) => (
                <li
                  key={step.key}
                  aria-current={active === i ? "step" : undefined}
                  className="hiw-step relative flex min-h-[52svh] items-start gap-5 py-6 motion-reduce:min-h-0 lg:min-h-[66svh] lg:items-center lg:gap-8"
                  style={index(i)}
                >
                  <span className="hiw-dot relative z-[1] flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-bg font-display text-sm font-semibold tabular-nums">
                    {i + 1}
                  </span>
                  <div className="max-w-md pb-2">
                    <h3 className="font-display text-[clamp(1.75rem,1.3rem+2vw,2.75rem)] font-medium leading-[1.05] tracking-[-0.035em]">
                      {step.title}
                    </h3>
                    <p className="type-lead mt-4 text-muted">{step.text}</p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {step.asks.map((ask) => (
                        <li key={ask} className="flex items-center gap-1.5 rounded-full bg-surface-2 py-1.5 pl-2.5 pr-3.5 text-sm font-medium">
                          <Check aria-hidden className="size-3.5 text-brand-ink" strokeWidth={3} />
                          {ask}
                        </li>
                      ))}
                    </ul>
                    {/* sem movimento: cada passo traz a sua tela, já no estado final */}
                    <div className="mt-6 hidden w-44 motion-reduce:block">
                      <Phone label={`Tela do app: ${step.title}`}>
                        <OnboardingScreen step={step.key} />
                      </Phone>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
