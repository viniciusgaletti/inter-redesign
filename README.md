# Inter — redesign conceitual

Estudo de redesign da home do [inter.co](https://inter.co/), feito como case de portfólio.

> **Projeto conceitual, sem vínculo com o Banco Inter.** O logotipo do Inter e as demais marcas exibidas pertencem aos seus titulares e aparecem aqui apenas para dar fidelidade ao estudo. Nomes, valores, taxas e simulações na interface são fictícios.

## O que tem aqui

- **Abertura** com os cartões entrando pelas laterais, se unindo e pousando no hero.
- **Como funciona:** a abertura de conta em seis passos, com um celular fixo cujas telas avançam junto com o scroll.
- **Seções interativas:** busca da Seven com respostas simuladas, conversor da Global Account e simulador de investimentos com gráfico.
- **Cabeçalho** que vira uma bolha de liquid glass ao rolar, com megamenu.
- Tema claro e escuro.

## Stack

Next.js 16 (App Router), TypeScript e Tailwind CSS v4. As animações são CSS mais um pouco de JavaScript, sem biblioteca de animação.

## Rodando

```bash
pnpm install
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000). O sistema de design fica em `/sistema`.

## Documentação

- [`docs/engenharia-reversa-inter.md`](docs/engenharia-reversa-inter.md): análise do site original.
- [`docs/plano-redesign-inter.md`](docs/plano-redesign-inter.md): plano do redesign.
- [`docs/plano-scroll-imersivo.md`](docs/plano-scroll-imersivo.md): plano das interações de scroll.
