"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { InterCard, type CardTier } from "@/components/mockups/inter-card";

// Ordem de pintura (o último fica por cima). u/v: posição no leque em % do cartão; r: rotação; n: ordem de entrada.
const deck: { tier: CardTier; side: "left" | "right"; u: number; v: number; r: number; n: number }[] = [
  { tier: "win", side: "left", u: -62, v: -9, r: -10, n: 1 },
  { tier: "platinum", side: "left", u: -21, v: 7, r: -4, n: 0 },
  { tier: "prime", side: "right", u: 21, v: -7, r: 4, n: 2 },
  { tier: "gold", side: "right", u: 62, v: 9, r: 10, n: 3 },
];

const seconds = (value: string) => parseFloat(value) * 1000;

/** Abertura de todo carregamento: entrada pelas laterais, união num cartão, palavra e pouso do Gold no hero. */
export function Intro() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    const overlay = root.current;
    if (html.dataset.intro !== "play" || !overlay) return;

    const styles = getComputedStyle(overlay);
    const landAt = seconds(styles.getPropertyValue("--intro-land"));
    const total = seconds(styles.getPropertyValue("--intro-total"));
    // As animações de CSS começam na primeira pintura, antes deste efeito: o relógio delas é a referência.
    const clock = overlay.querySelector(".intro-stage")?.getAnimations()[0];
    const elapsed = typeof clock?.currentTime === "number" ? clock.currentTime : 0;

    // Ato 4: mede onde o cartão do hero está agora e leva o Gold até lá.
    const land = () => {
      const target = document.querySelector<HTMLElement>("[data-hero-card]");
      const main = overlay.querySelector<HTMLElement>("[data-main]");
      if (!target || !main || html.dataset.intro !== "play") return;

      const from = main.getBoundingClientRect();
      const to = target.getBoundingClientRect();
      const dx = to.left + to.width / 2 - (from.left + from.width / 2);
      const dy = to.top + to.height / 2 - (from.top + from.height / 2);
      const scale = target.offsetWidth / main.offsetWidth;

      main.animate(
        [
          { transform: "translate(0px, 0px) rotate(0deg) scale(1)" },
          { transform: `translate(${dx}px, ${dy}px) rotate(-8deg) scale(${scale})` },
        ],
        { duration: Math.max(300, total - Math.max(elapsed, landAt)), easing: "cubic-bezier(0.65, 0, 0.35, 1)", fill: "forwards" },
      );
    };

    const finish = () => {
      html.dataset.intro = "done";
    };
    // Qualquer gesto pula a abertura, dissolvendo em vez de cortar.
    const skip = () => {
      if (html.dataset.intro !== "play") return;
      html.dataset.intro = "skip";
      window.setTimeout(finish, 360);
    };

    const timers = [window.setTimeout(land, Math.max(0, landAt - elapsed)), window.setTimeout(finish, Math.max(0, total - elapsed) + 40)];
    const events = ["wheel", "touchstart", "keydown", "pointerdown"] as const;
    events.forEach((name) => window.addEventListener(name, skip, { once: true, passive: true }));

    return () => {
      timers.forEach(window.clearTimeout);
      events.forEach((name) => window.removeEventListener(name, skip));
    };
  }, []);

  return (
    <div ref={root} className="intro" aria-hidden>
      <div className="intro-stage" />
      <div className="intro-words">
        <span className="intro-word" data-word="a">
          <span>Super</span>
        </span>
        <span className="intro-word" data-word="b">
          <span>App</span>
        </span>
      </div>
      <div className="intro-deck">
        {deck.map(({ tier, side, u, v, r, n }) => (
          <div
            key={tier}
            className="intro-card"
            data-side={side}
            data-main={tier === "gold" ? "" : undefined}
            style={{ "--u": u, "--v": v, "--r": `${r}deg`, "--n": n } as CSSProperties}
          >
            <InterCard tier={tier} />
          </div>
        ))}
      </div>
    </div>
  );
}
