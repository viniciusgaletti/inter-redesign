export type NavItem = { label: string; description: string; href: string };
export type NavGroup = { title: string; items: NavItem[] };
export type NavMenu = {
  label: string;
  groups: NavGroup[];
  feature: { eyebrow: string; title: string; description: string; href: string };
};

const item = (label: string, description: string, href = "#"): NavItem => ({ label, description, href });

// Estrutura mapeada do megamenu original (docs/engenharia-reversa-inter.md, seção 5).
export const menus: NavMenu[] = [
  {
    label: "Finanças",
    groups: [
      {
        title: "Abra a sua conta",
        items: [
          item("Conta Digital", "Gratuita, com Pix ilimitado"),
          item("Conta Kids", "Para menores de 18 anos"),
          item("Cartão de Crédito", "Sem anuidade, com cashback"),
          item("Conta PJ", "Para a sua empresa"),
          item("Conta MEI", "Feita para quem empreende só"),
        ],
      },
      {
        title: "Planeje seu futuro",
        items: [
          item("Empréstimos e Financiamentos", "Crédito pessoal e imobiliário"),
          item("Antecipação de FGTS", "Receba o saque-aniversário antes"),
          item("Consórcios", "Imóvel, carro ou moto"),
          item("Seguros", "Vida, casa, celular e viagem"),
        ],
      },
      {
        title: "Comece a investir",
        items: [
          item("Meu Porquinho", "Guarde e renda todo dia"),
          item("CDB", "Renda fixa com liquidez"),
          item("Criptomoedas", "Compre a partir de R$ 1"),
          item("Investimentos", "Toda a plataforma"),
        ],
      },
      {
        title: "Para o seu negócio",
        items: [
          item("Maquininha de cartão", "Receba na hora"),
          item("Maquininha no celular", "Venda por aproximação"),
          item("Link de pagamento", "Cobre por mensagem"),
          item("Empréstimo para empresas", "Capital de giro"),
        ],
      },
    ],
    feature: {
      eyebrow: "Conta Digital",
      title: "Abra pelo celular, sem pagar nada",
      description: "Cadastro no app e resposta em até 3 dias úteis.",
      href: "#abrir-conta",
    },
  },
  {
    label: "Estilo de vida",
    groups: [
      {
        title: "Viva mais o seu dia",
        items: [
          item("Passagens e Hospedagens", "Viaje com cashback"),
          item("Duo Gourmet", "Dois pratos, uma conta"),
          item("Plano de Celular", "Internet sem fidelidade"),
          item("Gift Card", "Jogos, streaming e apps"),
          item("Wearables", "Pague com pulseira ou anel"),
        ],
      },
      {
        title: "Compre do seu jeito",
        items: [
          item("Inter Shop", "Marcas com cashback", "#shop"),
          item("Crediário Digital", "Parcele sem cartão"),
          item("Recarga", "Celular em segundos"),
        ],
      },
      {
        title: "Visite o Inter",
        items: [
          item("Cafés", "Um espaço para clientes"),
          item("Salas VIP", "Conforto antes do embarque"),
          item("Arena MRV", "A casa do Galo"),
        ],
      },
    ],
    feature: {
      eyebrow: "Loop",
      title: "Cada compra vira ponto",
      description: "Troque por cashback, milhas ou investimentos.",
      href: "#shop",
    },
  },
  {
    label: "Segmentos",
    groups: [
      {
        title: "A experiência certa para você",
        items: [
          item("Inter One", "Atendimento e benefícios extras"),
          item("Inter Prime", "Assessoria para o seu patrimônio"),
          item("Inter Win", "Wealth management completo"),
        ],
      },
      {
        title: "Ideal para o seu negócio",
        items: [
          item("PJ Pro", "Para empresas em crescimento"),
          item("PJ Enterprise", "Gerente e soluções sob medida"),
          item("PJ Corporate", "Banco de atacado"),
        ],
      },
    ],
    feature: {
      eyebrow: "Segmentos",
      title: "O banco cresce com você",
      description: "Benefícios que acompanham o seu momento.",
      href: "#",
    },
  },
  {
    label: "Vida Global",
    groups: [
      {
        title: "Abra a sua conta",
        items: [
          item("Global Account", "Conta em dólar, sem tarifa", "#global"),
          item("Global Account Business", "Receba e pague lá fora"),
        ],
      },
      {
        title: "Simplifique suas transações",
        items: [
          item("Câmbio", "Envie e receba do exterior"),
          item("Cartão de Crédito Global", "Fatura em dólar"),
          item("Google AdSense", "Receba seus pagamentos"),
        ],
      },
      {
        title: "Comece a investir",
        items: [
          item("Investir no Exterior", "Ações e ETFs americanos"),
          item("Financiar Imóvel nos EUA", "Crédito imobiliário global"),
        ],
      },
    ],
    feature: {
      eyebrow: "Global Account",
      title: "Seu dinheiro fala dólar",
      description: "Conta internacional para usar onde estiver.",
      href: "#global",
    },
  },
];

export const footerColumns: NavGroup[] = [
  {
    title: "Sobre nós",
    items: [
      item("O Inter", ""),
      item("Relações com investidores", ""),
      item("Ética e compliance", ""),
      item("Blog", ""),
      item("Newsroom", ""),
      item("Carreiras", ""),
    ],
  },
  {
    title: "Produtos",
    items: [
      item("Conta Digital", ""),
      item("Cartão de Crédito", ""),
      item("Investimentos", ""),
      item("Global Account", "", "#global"),
      item("Inter Shop", "", "#shop"),
      item("Conta PJ", ""),
    ],
  },
  {
    title: "Precisa de ajuda?",
    items: [
      item("Central de ajuda", ""),
      item("Canais de atendimento", ""),
      item("Ouvidoria", ""),
      item("Segurança", ""),
      item("2ª via do boleto", ""),
      item("Negocie sua dívida", ""),
      item("Atendimento em Libras", ""),
    ],
  },
  {
    title: "Transparência",
    items: [
      item("Tarifas", ""),
      item("Cotação do dólar", ""),
      item("Política de privacidade", ""),
      item("Privacidade de dados", ""),
      item("Segurança da informação", ""),
      item("Canal de ética", ""),
    ],
  },
];
