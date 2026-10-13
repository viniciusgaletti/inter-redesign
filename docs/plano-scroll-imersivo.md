# Plano — Scroll imersivo

Complementa o [plano do redesign](plano-redesign-inter.md). Objetivo: a página deixa de ser uma pilha de seções que "aparecem" e passa a responder ao scroll de forma contínua, no computador e no celular.

---

## 1. O problema do original e a regra do novo

No site atual do Inter, o movimento é **disparado**: o elemento cruza uma linha e a animação toca inteira, de uma vez. Na seção Wearables é pior — o scroll fica preso por 4.500 px enquanto slides trocam aos saltos.

No redesign, o movimento é **conduzido**: a posição do scroll *é* a linha do tempo. Rolou 10%, a animação andou 10%. Parou, ela para. Voltou, ela volta.

Quatro regras que valem para tudo neste plano:

1. **O scroll nunca é sequestrado.** Velocidade e inércia são as nativas do aparelho. Nenhuma biblioteca de "smooth scroll".
2. **Sempre há algo rolando de verdade.** Quando um elemento fica fixo, o conteúdo ao lado continua subindo normalmente — a pessoa nunca sente que travou.
3. **Só `transform` e `opacity`.** São as duas propriedades que o navegador anima sem recalcular layout; é o que mantém 60 quadros no celular.
4. **Quem pediu menos movimento recebe a versão estática**, completa e legível, sem nada escondido.

---

## 2. Peça central: "Como funciona"

Uma seção nova que conta a abertura da conta do começo ao fim, guiada pelo scroll. Ela **substitui** o bloco laranja "Três passos. Zero tarifa." e termina nele: o último passo se abre no CTA final.

### Estrutura

- **Um celular fixo** (o mesmo mockup do hero) fica parado na tela.
- **Os passos rolam ao lado**, como texto normal.
- Conforme cada passo chega ao centro da tela, **a tela dentro do celular muda** para a etapa correspondente.
- Uma **linha de progresso** vertical se preenche de laranja acompanhando o scroll.

### As seis etapas

O fluxo real, segundo a Central de Ajuda do Inter, tem nove instruções. Elas foram agrupadas em seis passos, sem inventar nem pular nenhuma.

| # | Passo | O que o Inter pede de verdade | Tela no celular |
|---|---|---|---|
| 1 | Baixe o Super App | Baixar na App Store ou Google Play e tocar em "Abrir uma conta gratuita" | Boas-vindas com o botão "Abrir uma conta gratuita" |
| 2 | Diga quem você é | Nome completo e data de nascimento; aceitar os termos; permitir localização; estado civil, celular e e-mail; confirmar os códigos enviados por SMS e e-mail | Formulário sendo preenchido, depois os campos do código de segurança |
| 3 | Fotografe seu documento | Escolher RG, CNH ou RNE/RNM e enviar foto da frente e do verso | Seletor de documento, depois a moldura da câmera virando frente e verso |
| 4 | Prove que é você | Movimentar a cabeça conforme o app orienta | Oval de rosto com setas indicando direita, esquerda e cima |
| 5 | Complete o cadastro | Endereço residencial e de correspondência; dados profissionais; senha de 8 a 20 caracteres com números, símbolos, maiúsculas e minúsculas | Endereço, profissão e o medidor de força da senha enchendo |
| 6 | Conta em análise | Retorno em até 3 dias úteis | Tela de análise que se resolve em "Conta aberta" |

Entre uma etapa e outra, a tela não corta: a anterior desliza para fora enquanto a próxima entra, na proporção do scroll. Na etapa 6, a confirmação se transforma na tela inicial do app — a mesma do hero, fechando o ciclo.

O prazo de até 3 dias úteis aparece escrito no passo 6. O redesign não promete conta aberta na hora.

Fontes: [Central de Ajuda do Inter](https://ajuda.inter.co/conta-digital-pessoa-fisica-e-mei/como-solicito-a-abertura-da-conta-digital-pessoa-fisica) e [página da Conta Digital](https://inter.co/pra-voce/conta-digital/pessoa-fisica/), consultadas em 13/10/2026.

### Desktop

Duas colunas. Passos à esquerda, celular fixo à direita. Cada passo ocupa cerca de 65% da altura da tela; a seção inteira tem aproximadamente 4 telas. O passo ativo fica em cor cheia, os outros esmaecem.

### Mobile

O celular-mockup fica fixo no topo, menor (cerca de metade da tela), logo abaixo da bolha do cabeçalho. Os passos sobem por baixo dele como cartões. Distâncias mais curtas: cerca de 55% da tela por passo.

### Sem movimento

Os seis passos viram uma lista vertical simples, cada um com sua tela ao lado, todos visíveis.

---

## 3. Camada de fundo: o resto da página

Efeitos pequenos, todos conduzidos pelo scroll. Nenhum chama atenção sozinho; juntos, dão a sensação de profundidade.

| Onde | O que acontece |
|---|---|
| **Cabeçalho** | Uma linha fina de progresso de leitura dentro da bolha de vidro. |
| **Hero** | Ao sair da tela, o celular sobe mais devagar que o texto e os três chips se afastam em velocidades diferentes (paralaxe). |
| **Títulos de seção** | O texto entra esmaecido e "se enche de tinta" palavra a palavra conforme cruza a tela. |
| **Bento de produtos** | Os blocos entram em cascata, cada um com um pequeno atraso em relação ao anterior. |
| **Investimentos** | As linhas do gráfico se desenham da esquerda para a direita. |
| **Shop** | A faixa de categorias acelera e inverte conforme a velocidade e a direção do scroll. |
| **Empresas** | O bloco escuro entra menor e se expande até a largura final. |
| **Wearables** | Os anéis e pulseiras dos cartões giram alguns graus com o scroll. O carrossel continua sendo arrastado pela pessoa. |
| **Segurança** | As três linhas superiores dos pilares se traçam em sequência. |

A entrada de seção que já existe (o "rise" atual) é absorvida por esses efeitos.

---

## 4. Como construir

**Duas ferramentas, cada uma no seu lugar:**

- **CSS puro** (`animation-timeline`) para a camada de fundo. Custa zero JavaScript. Onde o navegador não suporta, o elemento simplesmente aparece estático.
- **Motion** (já instalado, hoje sem uso) só para a peça central, que precisa saber qual passo está ativo e trocar a tela. Carregado sob demanda, apenas quando a seção se aproxima.

**Peças novas:**

- `sections/how-it-works.tsx` — a seção.
- `mockups/onboarding-*.tsx` — as seis telas, reaproveitando o `Phone` que já existe.
- Utilitários de CSS para paralaxe, tinta do título e traçado de linha.
- Remoção de `open-account.tsx`, com o CTA laranja incorporado ao fim da nova seção.

**Cuidados no celular:**

- Alturas em `svh`, para a barra de endereço que aparece e some não fazer a seção pular.
- Deslocamento do elemento fixo calculado a partir da altura da bolha do cabeçalho.
- Paralaxe reduzida à metade; nada depende de `hover`.

---

## 5. Etapas

1. **Fundação** — utilitários de scroll, política de movimento reduzido, barra de progresso no cabeçalho.
2. **Como funciona, estrutura** — seção fixa, seis passos e linha de progresso, com telas provisórias.
3. **Como funciona, telas** — as seis telas do celular e as transições entre elas.
4. **Camada de fundo** — hero, títulos, bento, gráfico, Shop, Empresas, Wearables, Segurança.
5. **Conferência** — celular real, navegação por teclado, modo sem movimento, Lighthouse.

Ponto de checagem ao fim da etapa 2: você rola a seção com telas provisórias e valida o ritmo antes de eu desenhar as seis telas.

---

## 6. Limites

| Risco | Trava |
|---|---|
| Movimento demais cansar | No máximo um efeito por seção, além da entrada. |
| Seção fixa parecer travada | Teto de 4 telas de altura; sempre há texto rolando ao lado. |
| Peso de JavaScript | Motion só na peça central, carregado sob demanda. Meta de 200 KB mantida. |
| Performance cair | Lighthouse mobile não pode ficar abaixo dos 93 atuais. |
| Navegador sem suporte ao CSS de scroll | Versão estática, sem nada invisível. |

---

## 7. Decisões em aberto

1. **Onde a seção fica.** Proposta: no lugar do bloco laranja atual, perto do fim, antes do FAQ. Alternativa: logo depois do bento de produtos.
2. **Intensidade da camada de fundo.** Proposta: os nove efeitos da tabela, todos discretos. Alternativa: só a peça central mais hero e títulos.
3. ~~As etapas.~~ Resolvido: seguem o fluxo oficial do Inter, agrupado em seis passos.
