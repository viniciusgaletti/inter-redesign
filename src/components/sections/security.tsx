import { Eye, Fingerprint, Lock } from "lucide-react";
import { Highlight, SectionHeading } from "@/components/ui/section-heading";

const pillars = [
  { icon: Fingerprint, title: "Só você entra", text: "Biometria e reconhecimento facial para acessar e para confirmar o que importa." },
  { icon: Lock, title: "Cartão sob controle", text: "Bloqueie, desbloqueie e gere um cartão virtual para comprar online, tudo pelo app." },
  { icon: Eye, title: "Alguém sempre de olho", text: "Monitoramento contínuo de transações e aviso na hora quando algo foge do seu padrão." },
];

export function Security() {
  return (
    <section id="seguranca" aria-labelledby="seguranca-titulo" className="border-y border-border bg-surface-2/60 py-24 lg:py-36">
      <div className="container-page">
        <div id="seguranca-titulo">
          <SectionHeading
            eyebrow="Segurança"
            title={
              <>
                Tranquilo por fora, <Highlight>blindado por dentro.</Highlight>
              </>
            }
          />
        </div>
        <ul className="reveal mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {pillars.map(({ icon: Icon, title, text }) => (
            <li key={title} className="border-t border-text pt-6">
              <Icon aria-hidden className="size-7" strokeWidth={1.5} />
              <h3 className="type-h3 mt-6">{title}</h3>
              <p className="mt-2 text-muted">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
