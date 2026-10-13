// Fluxo oficial de abertura da Conta Digital PF, agrupado em seis passos.
// Fonte: ajuda.inter.co/conta-digital-pessoa-fisica-e-mei/como-solicito-a-abertura-da-conta-digital-pessoa-fisica (13/10/2026)
export const onboarding = [
  {
    key: "app",
    title: "Baixe o Super App",
    text: "Na App Store ou no Google Play. Na primeira tela, toque em “Abrir uma conta gratuita”.",
    asks: ["iPhone ou Android", "Sem custo para baixar"],
  },
  {
    key: "dados",
    title: "Diga quem você é",
    text: "Nome completo, data de nascimento, estado civil, celular e e-mail. Depois, confirme os códigos que chegam por SMS e por e-mail.",
    asks: ["Aceite dos termos", "Acesso à localização", "Código por SMS e e-mail"],
  },
  {
    key: "documento",
    title: "Fotografe seu documento",
    text: "Escolha entre RG, CNH ou RNE/RNM e envie uma foto da frente e outra do verso.",
    asks: ["Documento recente", "Em bom estado"],
  },
  {
    key: "rosto",
    title: "Prove que é você",
    text: "O app pede alguns movimentos com a cabeça. É a prova de vida: garante que é você, ali, naquele momento.",
    asks: ["Lugar bem iluminado", "Leva alguns segundos"],
  },
  {
    key: "cadastro",
    title: "Complete o cadastro",
    text: "Endereço residencial, dados profissionais e uma senha forte, de 8 a 20 caracteres.",
    asks: ["Letras maiúsculas e minúsculas", "Números e símbolos"],
  },
  {
    key: "analise",
    title: "Conta em análise",
    text: "Pronto, é só enviar. O Inter analisa o cadastro e responde em até 3 dias úteis.",
    asks: ["Resposta em até 3 dias úteis"],
  },
] as const;

export type OnboardingKey = (typeof onboarding)[number]["key"];
