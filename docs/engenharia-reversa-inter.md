# Engenharia reversa — inter.co (home BR)

Análise feita em 12/10/2026 sobre `https://inter.co/`, em 1440×900 (desktop) e 375×812 (mobile).
Fontes: HTML estático, DOM renderizado, estilos computados, rede e navegação real.

---

## 1. Resumo executivo

A home do Inter é uma página curta em conteúdo e longa em scroll: **8 seções, 10.541 px de altura no desktop**, quase todas no formato "título + um botão". O visual é limpo e a marca é forte (laranja + tipografia Citrina), mas a página tem três problemas estruturais que são a sua oportunidade de redesign:

1. **Pouca substância.** Não há números, prova social, telas do app, comparativos, benefícios concretos nem FAQ. Cada seção vende um produto com uma frase.
2. **Sistema visual inconsistente.** Dois laranjas, três raios de botão, quatro tamanhos de fonte de botão, três famílias tipográficas carregadas.
3. **Peso técnico alto.** ~250 requisições, 178 scripts (~2,4 MB transferidos), 638 KB de CSS inline dentro de um HTML de 717 KB, e mais de 15 domínios de rastreamento.

---

## 2. Stack e infraestrutura

| Camada | O que é usado | Evidência |
|---|---|---|
| Framework | **Gatsby 5.16.1** (React, geração estática) | `<meta name="generator">`, `#___gatsby`, `window.___loader` |
| Estilo | **styled-components** + variáveis do **Bootstrap 5** | classes `sc-*`, `data-styled`, `--bs-*` no CSS |
| Design system | `inter-ui 4.x` (CSS próprio via CDN) | `cdn.bancointer.com.br/inter-ui/4.x/latest/inter-ui.css` |
| Carrossel | `react-multi-carousel` | CSS da lib presente no HTML |
| Hospedagem | **AWS S3 + CloudFront** | `server: AmazonS3`, `x-cache: Hit from cloudfront` |
| Imagens | CDN próprio, WebP, arte por breakpoint | `central-imagens.bancointer.com.br/.../202606_lpbr_1440_h1.webp` e `..._360_h1.webp` |
| Vídeo | WebM autoplay/loop/muted, versões desktop e mobile | `intershop-section-homepage_desktop-*.webm` (~1,9 MB) |
| Fontes | **Citrina** (proprietária, self-hosted), **Inter** e **Sora** (Google Fonts) | `citrina.css`, `fonts.googleapis.com` |
| Consentimento | PrivacyTools | `cdn.privacytools.com.br` |
| Analytics / mídia | GTM, GA4, Google Ads, Meta Pixel, TikTok, Pinterest, Bing, Criteo, Clarity, Crazy Egg, Salesforce Data Cloud, AppsFlyer OneLink, New Relic | hosts nas requisições de rede |

**Escala do site:** o `sitemap.xml` lista **1.450 URLs**, sendo 1.282 em `/pra-voce/`, 43 em `/empresas/`. Idiomas/regiões: pt-BR, es-AR, en-US, es-US, pt-US (via `hreflang`).

**Breakpoints** (mobile-first, herdados do Bootstrap): `768`, `992`, `1200`, `1440`, `1600`.

---

## 3. Design tokens extraídos

### Cores

| Papel | Valor | Observação |
|---|---|---|
| Laranja primário | `#FF7A00` | CTAs, palavras em destaque |
| Laranja secundário | `#EA7100` | usado na seção Wearables e no `theme-color` — **concorre com o primário** |
| Laranja de apoio | `#FF8700`, `#FF500F`, `#CC6200` | variações espalhadas |
| Texto principal | `#161616` | títulos e corpo |
| Texto quente | `#3C3331`, `#1E1A19`, `#72370E` | marrons usados em títulos da seção de IA |
| Cinzas | `#6A6C72`, `#B6B7BB`, `#DEDFE4`, `#F5F6FA` | texto secundário, bordas, fundos |
| Fundos quentes | `#FDF8EE`, `#FFF2E7`, `#FFE7D3` | creme / pêssego |
| Rodapé | `#161616` | fundo escuro, texto branco |

### Tipografia

| Uso | Família | Tamanho / linha | Peso |
|---|---|---|---|
| H1 hero | Citrina | 80 / 80 px (mobile 50 / 50) | 500 |
| H2 de seção | Citrina | 56 / 61,6 px (mobile 24–28) | 500 |
| H2 do carrossel | Citrina | 40 / 48 px (mobile 24) | 700 |
| Subtítulo grande | Inter | 32 / 41,6 px | 500 |
| Texto de apoio | Inter | 20 / 28 px | 400 |
| Título de card | Inter | 24 / 31,2 px | 600 |
| Legenda Wearables | Inter | 36 / 40 px | 400 |
| Menu | Inter | ~14 px | 600 |

Padrão recorrente de título: **primeira parte em preto, palavra-chave em laranja** ("Sua vida **global é Inter**", "Inter Shop com **tudo** pra você").

### Forma, sombra e movimento

- **Raios:** botões `100px` (pílula), cards `18–20px`, imagens grandes `60px`, base de UI `8px` e `16px`.
- **Sombras:** `0 4px 16px rgba(23,23,23,.12)` é a principal; quase não há sombra na home.
- **Vidro:** `backdrop-filter: blur(20px)` em chips sobre imagem, com gradiente `rgba(255,255,255,.22) → 0`.
- **Curva de animação:** `cubic-bezier(0.4, 0, 0.2, 1)`, 0,3–0,5 s. Hovers em 0,2 s.
- **Container:** 1.200 px de conteúdo com 60 px de respiro lateral em 1440.

### Botões (inconsistência documentada)

| Onde | Tamanho | Fonte | Raio | Estilo |
|---|---|---|---|---|
| Header | pílula ~46 px | Inter 14–16 / 600 | 30px | laranja sólido |
| Hero | 302×80 | Inter 26 / 600 | 100px | branco, texto laranja |
| Carrossel | 253×72 | Inter 23 / **700** | **90px** | laranja sólido |
| Conta PJ / Global / Shop | 364–439×80 | Inter 26 / 600 | 100px | branco ou laranja |
| Wearables | 320×64 | Inter 23 / 600 | 100px | branco, texto `#EA7100` |

---

## 4. Arquitetura da página (desktop, 1440)

| # | Seção | Topo | Altura | Fundo |
|---|---|---|---|---|
| 0 | Header fixo (sticky) | 0 | 80 | branco |
| 1 | Hero | 80 | 889 | foto full-bleed |
| 2 | Carrossel "Fácil, rápido e gratuito" | 969 | 819 | branco |
| 3 | IA "Mais tempo. Mais inteligência" | 1.788 | 876 | branco + cartão em degradê |
| 4 | Conta PJ | 2.664 | 900 | foto full-bleed |
| 5 | Global Account | 3.564 | 810 | branco |
| 6 | Inter Shop | 4.374 | 900 | vídeo full-bleed |
| 7 | Wearables | 5.274 | **4.500** | branco |
| 8 | Rodapé | 9.774 | 768 | `#161616` |

A seção Wearables sozinha ocupa **43% do scroll** da página.

### Detalhe de cada seção

**Header** — `position: sticky`, 80 px, sem sombra. Logo à esquerda; menu com 4 megamenus + link "Loop"; à direita "Acesse sua conta" (dropdown), CTA "Abra sua conta" e seletor de região. Há um link de acessibilidade "Ir para conteúdo principal". No mobile (64 px) sobra só o CTA e o hambúrguer.

**1. Hero** — Foto de fundo (mulher na janela do carro, céu azul, celular laranja). H1 centralizado em branco: *"O Super App da sua vida financeira"*. Um botão branco. Os ícones "de vidro" flutuantes (cartão, cadeado, sacola, cifrão) **fazem parte da imagem**, não são elementos reais. Não há subtítulo nem proposta de valor secundária.

**2. Carrossel** — H2 laranja *"Fácil, rápido e gratuito"*. Três cards com foto: o ativo é largo (608×421) e mostra título; os inativos são estreitos (231×421) com um chip de vidro (ícone + rótulo: "Segurança", "Super App"). Trocar de card anima `width`/`height` em 0,5 s. Setas circulares de 48 px à direita, CTA "Abrir sua conta" à esquerda.

**3. IA (Seven)** — H2 em duas linhas (*"Mais tempo."* marrom / *"Mais inteligência pra sua vida."* laranja). Abaixo, um cartão 1128×574 com raio 60 px e degradê pêssego→creme, contendo um campo "Pergunte ou pesquise", um botão de play e a frase *"Seven é a I.A. que deixa o seu Super App ainda mais inteligente."* — **tudo isso é uma única imagem**, o texto não é texto.

**4. Conta PJ** — Foto full-bleed (mão com celular + notebook), H2 branco centralizado, botão branco "Conheça a Conta PJ".

**5. Global Account** — Duas colunas: texto à esquerda (H2, parágrafo de 32 px, botão laranja), foto 583×532 com raio 60 px à direita e bandeiras BR/EUA sobrepostas.

**6. Inter Shop** — Vídeo WebM em tela cheia com fundo claro; no centro, H2, linha de apoio e botão laranja. Muito espaço vazio.

**7. Wearables** — Bloco `sticky` de 900 px dentro de um contêiner de 4.500 px: o scroll vertical é convertido em avanço horizontal de 4 slides (1076×434, raio 20 px), com barra de progresso vertical e 4 pontos à esquerda. Legendas: "Tecnologia de ponta", "Só aproximar, pagar e pronto", "Use onde estiver", "Proteção para pagamentos". O mesmo botão se repete em todos os slides.

**8. Rodapé** — 4 colunas: certificação + lojas de app + redes; "Sobre nós"; "Precisa de ajuda?"; "Nossos números" (telefones). Depois seletor de país/idioma, links legais, CNPJ e endereços. No mobile vira **1.925 px — 30% da página**.

---

## 5. Arquitetura de informação (megamenu)

**Finanças**
- *Abra a sua conta:* Conta Digital · Conta Kids · Cartão de Crédito · Conta PJ · Conta MEI
- *Planeje seu futuro:* Empréstimos e Financiamentos · Antecipação de FGTS · Consórcios · Seguros
- *Comece a investir:* Meu Porquinho · Criptomoedas · CDB · Investimentos
- *Para o seu negócio:* Empréstimo para empresas · Soluções para o seu negócio · Maquininha de cartão · Maquininha no celular · Antecipação da maquininha · Link de pagamento

**Estilo de vida**
- *Viva mais o seu dia:* Passagens e Hospedagens · Duo Gourmet · Recarga · Gift Card · Plano de Celular · Shell Box · Wearables
- *Compre do seu jeito:* Comprar no Shopping · Crediário Digital
- *Nossos patrocínios:* Inter&Co Stadium · Athletico Paranaense · Fortaleza · Arena MRV
- *Visite o Inter:* Cafés · Salas VIP · Residence

**Segmentos**
- *A experiência certa para você:* Inter One · Inter Prime · Inter Win
- *Ideal para o seu negócio:* PJ Pro · PJ Enterprise · PJ Corporate

**Vida Global**
- *Abra a sua conta:* Global Account · Global Account Business
- *Simplifique suas transações:* Câmbio · Cartão de Crédito Global · Google Adsense
- *Comece a investir:* Investir no Exterior · Financiar Imóvel nos Estados Unidos
- Card de destaque com foto: "Global Account — Conta em dólar pra usar onde estiver."

**Loop** — link direto para o programa de pontos.

O megamenu abre no hover, ocupa a largura toda, fundo branco, 3–4 colunas de links em Inter 600 com rótulo de grupo pequeno em cinza.

---

## 6. Comportamento mobile (375 px)

- Altura total: 6.438 px, sem overflow horizontal.
- Header reduzido a CTA + hambúrguer.
- H1 cai para 50 px; H2 para 24–28 px.
- Botões com 64 px de altura e quase largura total.
- Imagens e vídeo têm arte própria para 360 px.
- Wearables deixa de ser scroll "preso" e vira bloco de 952 px.
- Seções de 740 px (quase uma tela inteira cada) para um título e um botão.

---

## 7. Problemas encontrados (o que o redesign deve resolver)

### Conteúdo e conversão
- Nenhum dado de credibilidade: clientes, nota das lojas, prêmios, segurança regulatória.
- Nenhuma tela real do app, apesar de o produto ser "o Super App".
- Seis CTAs de peso visual igual; "Abra sua conta" aparece três vezes na primeira dobra e meia.
- Investimentos, cashback e Loop — diferenciais fortes — não têm seção na home.
- Sem FAQ, sem comparativo, sem "como abrir a conta".

### Design
- Dois laranjas primários competindo (`#FF7A00` e `#EA7100`).
- Botões gigantes (80 px de altura, fonte 26 px) que parecem ampliados, não desenhados.
- Raios de botão diferentes (100 / 90 / 30 px) e pesos diferentes (600 / 700).
- Ritmo monótono: foto cheia → branco → foto cheia → branco, sempre centralizado.
- Seção Shop e seção Wearables com muito vazio; Wearables sequestra 5 telas de scroll para 4 imagens.
- Ícones de vidro do hero são estáticos, embutidos na foto.

### Acessibilidade
- `<html>` **sem atributo `lang`**.
- Texto dentro de imagem na seção de IA (invisível a leitores de tela e a buscadores).
- 5 de 18 imagens sem `alt`.
- Banner de cookies em **inglês** num site pt-BR.
- Vídeo em autoplay sem controle de pausa.

### Performance
- 638 KB de CSS inline (estilos do site inteiro, não só da home) em um HTML de 717 KB.
- 178 arquivos de script, mais de 130 chunks `vendors-*`.
- Header **não vem no HTML estático** — é montado no cliente, o logo e o menu "pulam" na tela e os links do menu não existem para quem lê só o HTML.
- Três famílias de fonte carregadas; Sora quase não aparece na home.
- Mais de 15 domínios de terceiros.

### SEO e higiene
- `meta description` fala de um evento (Inter Invest Summit), não do produto.
- `meta keywords` com acentos quebrados ("carto", "crdito").
- Uma tag do Google carregada com o placeholder literal `GA_MEASUREMENT_ID`.
- `robots.txt` expõe rotas internas de teste (`/forms-test`, `/layout-test` etc.).

---

## 8. Direção recomendada para a reconstrução

**Manter:** o laranja como assinatura, o padrão de título bicolor, fotografia humana e quente, botões em pílula, tom de voz direto ("pra você").

**Mudar:**
1. **Um laranja só**, mais uma escala neutra quente (creme/areia/grafite) e um modo escuro de verdade.
2. **Escala tipográfica fluida** com `clamp()`, um par de fontes apenas (display + texto).
3. **Um sistema de botões**: 3 tamanhos, 3 variantes, um raio.
4. **Hero com produto**: mockup real do app, ícones de vidro como elementos animados, subtítulo e prova social logo abaixo.
5. **Bento grid de produtos** no lugar do carrossel de 3 cards.
6. **Seção de IA em HTML real**, com campo de busca interativo e respostas simuladas.
7. **Faixa de números** e **seção de segurança**.
8. **Wearables em carrossel horizontal** com scroll-snap, sem prender o scroll.
9. **Rodapé em acordeão no mobile.**
10. Novas seções: investimentos, cashback/Loop, "abra em 3 passos", FAQ.

**Stack sugerida:** Next.js (App Router) + TypeScript + Tailwind CSS + Motion, com componentes de servidor por padrão, `next/image`, `next/font` e meta de Lighthouse ≥ 95.

**Cuidados para portfólio:** a fonte Citrina, o logotipo e as fotos são propriedade do Inter. Use uma fonte alternativa licenciada, imagens próprias ou de banco livre, e identifique o projeto como *redesign conceitual não oficial*.
