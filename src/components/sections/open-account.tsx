import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Padrão decorativo que lembra um QR code. Não é um código legível.
const SIZE = 21;
const cells = Array.from({ length: SIZE * SIZE }, (_, i) => {
  const x = i % SIZE;
  const y = Math.floor(i / SIZE);
  const finder = (cx: number, cy: number) => {
    const dx = Math.abs(x - cx);
    const dy = Math.abs(y - cy);
    const d = Math.max(dx, dy);
    return d <= 3 ? d !== 2 : null;
  };
  return finder(3, 3) ?? finder(SIZE - 4, 3) ?? finder(3, SIZE - 4) ?? ((x * 7 + y * 13 + x * y * 3) % 5 < 2);
});

export function OpenAccount() {
  return (
    <section aria-labelledby="abrir-titulo" className="container-page pb-24 pt-10 lg:pb-36 lg:pt-16">
      <div className="reveal relative overflow-hidden rounded-block bg-brand p-7 text-on-brand sm:p-12 lg:p-16">
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-32 size-[30rem] rounded-full bg-white/25 blur-3xl" />

        <div className="relative grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="type-label">Abra sua conta</p>
            <h2 id="abrir-titulo" className="type-display mt-5 max-w-[14ch]">
              Agora é a sua vez.
            </h2>

            <p className="type-lead mt-6 max-w-md text-on-brand/85">Sem tarifa para abrir e sem tarifa para manter. O cadastro é todo pelo app.</p>

            <Button href="#" size="lg" className="mt-10 bg-on-brand text-[#fbf8f4] hover:bg-on-brand/85">
              Abra sua conta
              <ArrowRight aria-hidden className="size-[1.125rem]" />
            </Button>
          </div>

          <div className="hidden w-52 rounded-card bg-[#fbf8f4] p-5 text-[#1a1614] lg:block">
            <svg viewBox={`0 0 ${SIZE} ${SIZE}`} aria-hidden className="w-full" shapeRendering="crispEdges">
              {cells.map((on, i) => on && <rect key={i} x={i % SIZE} y={Math.floor(i / SIZE)} width="1" height="1" fill="currentColor" />)}
            </svg>
            <p className="mt-4 text-center text-sm font-medium">Aponte a câmera e baixe o app</p>
            <p className="mt-1 text-center text-xs text-[#6b635c]">Código ilustrativo</p>
          </div>
        </div>
      </div>
    </section>
  );
}
