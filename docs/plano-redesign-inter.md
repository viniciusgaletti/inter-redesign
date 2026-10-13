# Plano — Redesign conceitual da home do Inter

Base: [engenharia-reversa-inter.md](engenharia-reversa-inter.md).
Entrega final: home reconstruída, publicada, mais uma página de case para o portfólio.

---

## 1. Objetivo e critérios de sucesso

**Objetivo:** provar, num único projeto, três competências — olhar de design, execução front-end e raciocínio de produto.

O case está pronto quando:

| Critério | Meta |
|---|---|
| Lighthouse (mobile) | Performance ≥ 95, Acessibilidade 100, SEO 100 |
| Peso da home | < 200 KB de JS, < 1,2 MB no total da primeira carga |
| Scripts de terceiros | zero |
| Responsivo | impecável em 375, 768, 1024, 1440 e 1920 |
| Acessibilidade | navegável só por teclado, contraste AA, respeita `prefers-reduced-motion` |
| Temas | claro e escuro |
| Narrativa | página de case com antes/depois e decisões justificadas |

**Fora de escopo:** páginas internas, login, abertura de conta real, CMS, qualquer back-end.

---

## 2. Conceito

**"Um banco inteiro, sem barulho."**

O site atual grita: botões enormes, fotos em tela cheia, uma frase por seção. O redesign faz o oposto — mais informação, menos volume. A referência é editorial e de produto, não de campanha publicitária.

Três princípios que orientam cada decisão:

1. **Mostrar o produto.** Onde hoje há uma foto de banco de imagens, entra interface real do app, construída em código.
2. **Laranja como tempero.** Hoje ele é o prato. No redesign aparece em CTAs, destaques e detalhes; o resto é neutro quente.
3. **Movimento com função.** Animação explica ou responde a uma ação. Nada que prenda o scroll.

---

## 3. Sistema visual

### Cor

| Token | Claro | Escuro | Uso |
|---|---|---|---|
| `--brand` | `#FF7A00` | `#FF8A1F` | CTA primário, destaques |
| `--brand-soft` | `#FFF1E3` | `#2B1D10` | fundos de destaque |
| `--bg` | `#FBF8F4` | `#0F0D0C` | fundo da página |
| `--surface` | `#FFFFFF` | `#1A1715` | cards |
| `--surface-2` | `#F3EEE7` | `#24201D` | cards secundários |
| `--text` | `#1A1614` | `#F6F1EA` | texto principal |
| `--text-muted` | `#6B635C` | `#A39A90` | texto de apoio |
| `--border` | `#E7DFD5` | `#2E2925` | divisores |
| `--positive` | `#1E8E5A` | `#4CC38A` | rendimento, cashback |

Um laranja só. Os neutros puxam para o quente, para conversar com ele.

### Tipografia

- **Display:** Bricolage Grotesque (variável, gratuita) — substitui a Citrina proprietária mantendo o caráter humanista.
- **Texto e UI:** Inter — mantém o vínculo com a marca.
- **Números:** Inter com `tabular-nums`.

Escala fluida com `clamp()`:

| Papel | Tamanho | Linha | Peso |
|---|---|---|---|
| Display | 44 → 88 px | 1,0 | 500 |
| H2 | 32 → 56 px | 1,05 | 500 |
| H3 | 22 → 28 px | 1,2 | 600 |
| Lead | 18 → 22 px | 1,45 | 400 |
| Corpo | 16 px | 1,6 | 400 |
| Rótulo | 13 px, caixa alta, espaçado | 1,3 | 600 |

Mantém o padrão de título bicolor do original — é a assinatura mais reconhecível.

### Forma, espaço, movimento

- **Raios:** 12 (controles), 24 (cards), 40 (blocos grandes), pílula (botões).
- **Espaço:** base 4 px; seções com 96 → 160 px de respiro vertical.
- **Grid:** 12 colunas, contêiner de 1.280 px, calha de 24 px.
- **Sombra:** quase nenhuma; profundidade por borda e contraste de superfície.
- **Movimento:** 200 ms para hover, 500 ms para entrada, curva `cubic-bezier(0.22, 1, 0.36, 1)`.

### Componentes-base

Botão (3 tamanhos × 3 variantes, um raio), Chip, Card, Badge, Tabs, Acordeão, Campo de texto, Mockup de celular, Título de seção.

---

## 4. Nova arquitetura da home

| # | Seção | O que substitui | Ideia central |
|---|---|---|---|
| 0 | **Header** | header atual | Translúcido, 64 px, encolhe no scroll. Megamenu em painel com ícones e descrição por item. Alternador de tema. |
| 1 | **Hero** | hero com foto | Título + subtítulo + dois CTAs à esquerda; mockup do app em código à direita, com chips de vidro animados (Pix recebido, cashback, rendimento). Faixa de confiança logo abaixo. |
| 2 | **Números** | — (novo) | 4 indicadores grandes com contagem animada. |
| 3 | **Produtos (bento)** | carrossel de 3 cards | Grade assimétrica de 6 blocos: Conta, Cartão, Investimentos, Global, Shop, Seguros. Cada um com mini-interface, não foto. |
| 4 | **Seven (IA)** | imagem com texto embutido | Campo de busca real: sugestões clicáveis disparam respostas simuladas com efeito de digitação. |
| 5 | **Global Account** | seção 2 colunas | Conversor BRL ⇄ USD interativo com taxa fictícia e comparação "com IOF / sem taxa". |
| 6 | **Investimentos** | — (novo) | Simulador de rendimento: valor + prazo → gráfico de área. |
| 7 | **Shop + Loop** | vídeo em tela cheia | Faixa rolante de categorias e um cartão "você ganhou R$ X de cashback". |
| 8 | **Para empresas** | Conta PJ full-bleed | Bloco escuro de contraste; alterna PF/PJ por abas. |
| 9 | **Wearables** | 4.500 px de scroll preso | Carrossel horizontal com `scroll-snap`, arrastável, uma tela de altura. |
| 10 | **Segurança** | — (novo) | 3 pilares com ícone e uma linha cada. |
| 11 | **Abra sua conta** | — (novo) | 3 passos numerados + CTA final com QR code. |
| 12 | **FAQ** | — (novo) | Acordeão com 6 perguntas, marcado com dados estruturados. |
| 13 | **Rodapé** | rodapé atual | Mesmo conteúdo, colunas em acordeão no mobile. |

Hierarquia de CTA: **um primário** ("Abra sua conta") no header, no hero e no fechamento. Todos os outros viram secundários ou links com seta.

---

## 5. Stack

| Escolha | Motivo |
|---|---|
| **Next.js 15 (App Router) + TypeScript** | Componentes de servidor: JS mínimo no cliente. É o argumento técnico do case contra os 178 scripts do original. |
| **Tailwind CSS v4** | Tokens em CSS, tema escuro por variável. |
| **Motion** | Animações de entrada e de layout; só nos componentes que precisam. |
| **Radix Primitives** | Megamenu, abas e acordeão acessíveis sem reinventar. |
| **Lucide** | Ícones consistentes. |
| **Vercel** | Publicação e prévia por commit. |

Estrutura de pastas:

```
src/
  app/            layout, page, case/
  components/
    ui/           botão, chip, card, tabs…
    sections/     hero, bento, seven, global…
    mockups/      telas do app em código
  content/        textos e dados da home (um arquivo por seção)
  styles/         tokens.css
```

---

## 6. Fases de execução

### Fase 0 — Fundação
- Criar projeto, repositório Git, lint, formatação.
- Configurar fontes, tokens de cor e tipografia, tema claro/escuro.
- **Pronto quando:** página em branco publicada na Vercel com alternância de tema funcionando.

### Fase 1 — Sistema de design
- Construir os 9 componentes-base.
- Montar rota `/sistema` exibindo todos em seus estados.
- **Pronto quando:** cada componente funciona em teclado, nos dois temas e em 375 px.

### Fase 2 — Casca
- Header com megamenu (desktop) e gaveta (mobile).
- Rodapé completo.
- **Pronto quando:** os 4 menus do original estão representados e navegáveis por teclado.

### Fase 3 — Primeira dobra
- Mockup de celular reutilizável + tela inicial do app.
- Hero, faixa de confiança, seção de números.
- **Pronto quando:** a primeira tela, sozinha, já parece um site melhor que o original. É o ponto de checagem de direção visual.

### Fase 4 — Produto
- Bento de produtos.
- Seven interativa.
- Global Account com conversor.
- Simulador de investimentos.

### Fase 5 — Fechamento
- Shop + Loop, Para empresas, Wearables, Segurança, Abra sua conta, FAQ.

### Fase 6 — Movimento
- Entradas por seção, microinterações, transição de tema.
- Variante sem movimento para `prefers-reduced-motion`.

### Fase 7 — Qualidade
- Auditoria de acessibilidade (teclado, leitor de tela, contraste).
- Lighthouse e ajuste de imagens/fontes.
- Revisão em 5 larguras e nos dois temas.
- Metadados, Open Graph, dados estruturados.

### Fase 8 — Case
- Rota `/case`: contexto, diagnóstico, decisões, antes/depois, números.
- Capturas e um vídeo curto de navegação.
- README do repositório.

---

## 7. Regras de conteúdo

- **Números:** só dados públicos do Inter com fonte citada, ou valores claramente ilustrativos. Nada inventado apresentado como real.
- **Taxas e simulações:** marcadas como "simulação ilustrativa".
- **Marca:** nome "Inter" em tipografia própria, sem reproduzir o logotipo. Sem a fonte Citrina.
- **Imagens:** interfaces construídas em código; fotos só de bancos livres, e poucas.
- **Marcas de terceiros:** categorias genéricas em vez de logotipos de lojas.
- **Aviso:** "Projeto conceitual de estudo, sem vínculo com o Banco Inter" no rodapé e na página de case.

---

## 8. Riscos

| Risco | Como evitar |
|---|---|
| Escopo crescer e o case não sair | 13 seções é o teto. As fases 3 e 4 já rendem um case apresentável; a 5 é incremento. |
| Parecer "template de fintech" | Checagem de direção ao fim da fase 3, antes de replicar o estilo em 10 seções. |
| Mockups em código consumirem tempo demais | Um componente de celular e 4 telas, reaproveitadas com variações. |
| Animação derrubar a performance | Motion só em componentes de cliente isolados; medir a cada fase. |

---

## 9. Decisões que assumi

1. **Stack Next.js + Tailwind**, em vez de HTML/CSS puro.
2. **Só a home**, sem página interna.
3. **Interfaces em código** no lugar de fotografia.
4. **Textos em português**, reescritos — não copiados do original.
