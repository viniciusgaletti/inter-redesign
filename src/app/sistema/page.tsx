import type { Metadata } from "next";
import { ArrowRight, Coins } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { Input } from "@/components/ui/input";
import { Highlight, SectionHeading } from "@/components/ui/section-heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { AppHome } from "@/components/mockups/app-home";
import { Phone } from "@/components/mockups/phone";

export const metadata: Metadata = { title: "Sistema de design — Inter, redesign conceitual" };

const colors = [
  ["brand", "bg-brand"],
  ["brand-soft", "bg-brand-soft"],
  ["bg", "bg-bg"],
  ["surface", "bg-surface"],
  ["surface-2", "bg-surface-2"],
  ["text", "bg-text"],
  ["muted", "bg-muted"],
  ["border", "bg-border"],
  ["positive", "bg-positive"],
] as const;

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-border py-12">
      <h2 className="type-label mb-8 text-muted">{title}</h2>
      {children}
    </section>
  );
}

export default function Sistema() {
  return (
    <main className="container-page py-12">
      <div className="mb-12 flex items-start justify-between gap-6">
        <div>
          <p className="type-label text-brand-ink">Sistema de design</p>
          <h1 className="type-h2 mt-3">
            Poucas peças, <Highlight>bem afinadas.</Highlight>
          </h1>
        </div>
        <ThemeToggle />
      </div>

      <Block title="Cor">
        <ul className="grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-9">
          {colors.map(([name, bg]) => (
            <li key={name}>
              <div className={`${bg} aspect-square rounded-card border border-border`} />
              <p className="mt-2 text-sm font-medium">{name}</p>
            </li>
          ))}
        </ul>
      </Block>

      <Block title="Tipografia">
        <div className="space-y-6">
          <p className="type-display">Display 88</p>
          <p className="type-h2">Título de seção 56</p>
          <p className="type-h3">Título de card 28</p>
          <p className="type-lead max-w-2xl text-muted">Lead 22. Texto de abertura que explica a seção em uma ou duas linhas.</p>
          <p className="max-w-2xl">Corpo 16. Texto corrido para descrições, respostas de FAQ e conteúdo de apoio.</p>
          <p className="type-label">Rótulo 13</p>
        </div>
      </Block>

      <Block title="Botão">
        <div className="space-y-4">
          {(["lg", "md", "sm"] as const).map((size) => (
            <div key={size} className="flex flex-wrap items-center gap-3">
              <Button size={size}>
                Abra sua conta <ArrowRight aria-hidden className="size-4" />
              </Button>
              <Button size={size} variant="secondary">
                Saiba mais
              </Button>
              <Button size={size} variant="ghost">
                Entrar
              </Button>
              <Button size={size} disabled>
                Indisponível
              </Button>
            </div>
          ))}
        </div>
      </Block>

      <Block title="Badge e chip">
        <div className="flex flex-wrap items-center gap-3">
          <Badge>Neutro</Badge>
          <Badge tone="brand">Novo</Badge>
          <Badge tone="positive">+ 1,2%</Badge>
          <div className="rounded-card bg-brand p-6">
            <Chip
              icon={
                <span className="flex size-8 items-center justify-center rounded-full bg-brand text-on-brand">
                  <Coins aria-hidden className="size-4" />
                </span>
              }
            >
              <span className="block text-xs text-muted">Cashback</span>
              <span className="block font-semibold">+ R$ 3,12</span>
            </Chip>
          </div>
        </div>
      </Block>

      <Block title="Card e título de seção">
        <Card className="p-8">
          <SectionHeading
            eyebrow="Rótulo"
            title={
              <>
                Título com a palavra-chave <Highlight>em laranja.</Highlight>
              </>
            }
            lead="O padrão bicolor vem do site original e é a assinatura mais reconhecível da marca."
          />
        </Card>
      </Block>

      <Block title="Abas">
        <Tabs defaultValue="pf">
          <TabsList aria-label="Tipo de conta">
            <TabsTrigger value="pf">Pra você</TabsTrigger>
            <TabsTrigger value="pj">Pra sua empresa</TabsTrigger>
          </TabsList>
          <TabsContent value="pf" className="mt-4 text-muted">
            Conteúdo da aba pessoa física.
          </TabsContent>
          <TabsContent value="pj" className="mt-4 text-muted">
            Conteúdo da aba pessoa jurídica.
          </TabsContent>
        </Tabs>
      </Block>

      <Block title="Acordeão">
        <Accordion type="single" collapsible className="max-w-2xl border-t border-border">
          <AccordionItem value="a">
            <AccordionTrigger>A conta é gratuita mesmo?</AccordionTrigger>
            <AccordionContent>Sim. Não há tarifa de abertura nem de manutenção.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="b">
            <AccordionTrigger>Quanto tempo leva para abrir?</AccordionTrigger>
            <AccordionContent>Alguns minutos, direto pelo app.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </Block>

      <Block title="Campo">
        <Input label="Quanto você quer investir?" hint="Simulação ilustrativa." placeholder="R$ 1.000,00" inputMode="decimal" className="max-w-sm" />
      </Block>

      <Block title="Mockup de celular">
        <div className="w-64">
          <Phone label="Tela inicial do app">
            <AppHome />
          </Phone>
        </div>
      </Block>
    </main>
  );
}
