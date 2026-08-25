import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SegmentExplorer } from "@/components/segment-explorer";

export function Segments() {
  return (
    <section id="operacoes" className="scroll-mt-24 py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Automação para diferentes operações"
            title="Tecnologia adaptada ao fluxo do seu negócio."
            description="Cada operação tem uma jornada diferente. A ACTUS combina software próprio, hardware personalizado e integração tecnológica para criar soluções de autoatendimento adaptadas à realidade de cada segmento."
          />
        </Reveal>
        <SegmentExplorer />
      </Container>
    </section>
  );
}
