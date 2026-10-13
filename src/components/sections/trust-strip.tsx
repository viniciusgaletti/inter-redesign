import { Landmark, ShieldCheck, Smartphone, TrendingUp } from "lucide-react";

const items = [
  { icon: Landmark, text: "Autorizado pelo Banco Central" },
  { icon: ShieldCheck, text: "Depósitos cobertos pelo FGC" },
  { icon: TrendingUp, text: "Listado na Nasdaq (INTR)" },
  { icon: Smartphone, text: "Conta digital sem mensalidade" },
];

export function TrustStrip() {
  return (
    <section aria-label="Credenciais" className="border-y border-border">
      <ul className="container-page grid grid-cols-2 gap-x-6 gap-y-4 py-6 lg:grid-cols-4">
        {items.map(({ icon: Icon, text }) => (
          <li key={text} className="flex items-center gap-3 text-sm font-medium text-muted">
            <Icon aria-hidden className="size-[1.125rem] shrink-0 text-text" />
            {text}
          </li>
        ))}
      </ul>
    </section>
  );
}
