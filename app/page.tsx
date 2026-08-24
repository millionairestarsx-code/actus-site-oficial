import { Cta } from "@/components/cta";
import { Hero } from "@/components/hero";
import { InstitutionalVideo } from "@/components/institutional-video";
import { Solutions } from "@/components/solutions";
import { Totems } from "@/components/totems";
import { WhyActus } from "@/components/why-actus";

export default function Home() {
  return (
    <main id="conteudo" className="flex-1">
      <Hero />
      <Solutions />
      <InstitutionalVideo />
      <Totems />
      <WhyActus />
      <Cta />
    </main>
  );
}
