"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Faixa rolante que responde ao scroll: acelera com a velocidade da rolagem e
 * inverte o sentido quando a página sobe. Parada a página, volta ao ritmo normal.
 * As faixas em si são animações de CSS; aqui só se ajusta a taxa de reprodução.
 */
export function VelocityMarquee({ children, className }: { children: ReactNode; className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tracks = () => el.getAnimations({ subtree: true });
    let visible = false;
    let frame = 0;
    let lastY = window.scrollY;
    let lastT = performance.now();
    let rate = 1;
    let target = 1;

    const tick = (now: number) => {
      const dt = Math.max(1, now - lastT);
      const velocity = (window.scrollY - lastY) / dt; // px por ms; negativo ao subir
      lastY = window.scrollY;
      lastT = now;

      const boost = Math.min(5, Math.abs(velocity) * 2.2);
      target = velocity < -0.02 ? -(1 + boost) : 1 + boost;
      rate += (target - rate) * 0.09;
      tracks().forEach((track) => {
        track.playbackRate = rate;
      });

      frame = visible ? requestAnimationFrame(tick) : 0;
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !frame) {
        lastY = window.scrollY;
        lastT = performance.now();
        frame = requestAnimationFrame(tick);
      }
    });
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={root} aria-hidden className={className}>
      {children}
    </div>
  );
}
