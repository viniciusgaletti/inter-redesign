import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Inter — redesign conceitual",
  description:
    "Estudo de redesign da home do Inter: conta gratuita, cartão, investimentos, câmbio e cashback em um só app. Projeto conceitual, sem vínculo com o Banco Inter.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbf8f4" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0d0c" },
  ],
};

// Roda antes da primeira pintura: define o tema (para não piscar) e decide se a abertura toca.
// A abertura toca em todo carregamento da home. Só é pulada com âncora para outra seção (link direto)
// e para quem pediu menos movimento. Quando toca, a página começa no topo: sem isso, um recarregamento
// no meio da página restauraria a rolagem e o cartão pousaria num hero fora da tela.
// O temporizador de 4,7 s é a rede de proteção: encerra a abertura e destrava a rolagem mesmo que o
// React demore ou nunca inicie (rede ruim, erro de script). Normalmente quem encerra é o componente Intro.
const bootScript = `(function(){var d=document.documentElement;try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}d.dataset.theme=t}catch(e){}try{var h=location.hash;if(location.pathname==="/"&&(!h||h==="#topo")&&!matchMedia("(prefers-reduced-motion: reduce)").matches){d.dataset.intro="play";history.scrollRestoration="manual";scrollTo(0,0);setTimeout(function(){if(d.dataset.intro==="play"){d.dataset.intro="done"}},4700)}else{history.scrollRestoration="auto"}}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${bricolage.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-text focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-bg"
        >
          Ir para o conteúdo
        </a>
        {children}
      </body>
    </html>
  );
}
