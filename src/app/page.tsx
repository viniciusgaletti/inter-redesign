import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Faq } from "@/components/sections/faq";
import { GlobalAccount } from "@/components/sections/global-account";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Intro } from "@/components/sections/intro";
import { Investments } from "@/components/sections/investments";
import { Numbers } from "@/components/sections/numbers";
import { OpenAccount } from "@/components/sections/open-account";
import { Products } from "@/components/sections/products";
import { Seven } from "@/components/sections/seven";
import { Shop } from "@/components/sections/shop";
import { TrustStrip } from "@/components/sections/trust-strip";

export default function Home() {
  return (
    <>
      <Intro />
      <SiteHeader />
      <main id="conteudo">
        <Hero />
        <TrustStrip />
        <Numbers />
        <Products />
        <Seven />
        <GlobalAccount />
        <Investments />
        <Shop />
        <HowItWorks />
        <OpenAccount />
        <Faq />
      </main>
      <SiteFooter />
    </>
  );
}
