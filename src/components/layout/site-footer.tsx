import { ChevronDown } from "lucide-react";
import { footerColumns } from "@/content/nav";
import { Wordmark } from "@/components/layout/wordmark";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="container-page py-14 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_3fr]">
          <div>
            <Wordmark />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Conta, cartão, investimentos, câmbio e compras em um app só.
            </p>
          </div>

          {/* Desktop: colunas abertas */}
          <nav aria-label="Rodapé" className="hidden grid-cols-4 gap-8 md:grid">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h2 className="mb-4 text-sm font-semibold">{column.title}</h2>
                <ul className="space-y-2.5">
                  {column.items.map((entry) => (
                    <li key={entry.label}>
                      <a href={entry.href} className="text-sm text-muted transition-colors duration-200 hover:text-text">
                        {entry.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          {/* Mobile: acordeão, para o rodapé não ocupar um terço da página */}
          <nav aria-label="Rodapé" className="md:hidden">
            {footerColumns.map((column) => (
              <details key={column.title} className="group border-b border-border">
                <summary className="flex cursor-pointer list-none items-center justify-between py-4 font-semibold [&::-webkit-details-marker]:hidden">
                  {column.title}
                  <ChevronDown
                    aria-hidden
                    className="size-4 text-muted transition-transform duration-300 ease-out-expo group-open:rotate-180"
                  />
                </summary>
                <ul className="space-y-3 pb-5">
                  {column.items.map((entry) => (
                    <li key={entry.label}>
                      <a href={entry.href} className="text-sm text-muted">
                        {entry.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-border pt-6 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <p>
            Projeto conceitual de estudo, sem vínculo com o Banco Inter. Canais oficiais em{" "}
            <a href="https://inter.co" rel="noreferrer" className="font-medium text-text underline underline-offset-4">
              inter.co
            </a>
            .
          </p>
          <p>Design e código: Vinícius Galetti, 2026.</p>
        </div>
      </div>
    </footer>
  );
}
