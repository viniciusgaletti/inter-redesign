export const brl = (n: number, digits = 2) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: digits, maximumFractionDigits: digits });

export const usd = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "USD", currencyDisplay: "symbol", minimumFractionDigits: 2 });

/** Abrevia para rótulos de eixo: 12500 -> "R$ 12,5 mil". */
export const brlCompact = (n: number) =>
  n >= 1_000_000
    ? `R$ ${(n / 1_000_000).toLocaleString("pt-BR", { maximumFractionDigits: 1 })} mi`
    : n >= 1_000
      ? `R$ ${(n / 1_000).toLocaleString("pt-BR", { maximumFractionDigits: 1 })} mil`
      : `R$ ${Math.round(n)}`;
