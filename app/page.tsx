import { Cta } from "@/components/cta";
import { Hero } from "@/components/hero";
import { InstitutionalVideo } from "@/components/institutional-video";
import { Segments } from "@/components/segments";
import { Solutions } from "@/components/solutions";
import { Technology } from "@/components/technology";
import { Totems } from "@/components/totems";
import { WhyActus } from "@/components/why-actus";

export default function Home() {
  return (
    <main id="conteudo" className="flex-1">
      <Hero />
      <Solutions />
      <Technology />
      <InstitutionalVideo />
      <Totems />
      <Segments />
      <WhyActus />
      <Cta />
    </main>
  );
}
