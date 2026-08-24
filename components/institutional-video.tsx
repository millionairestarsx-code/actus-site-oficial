import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

export function InstitutionalVideo() {
  return (
    <section id="video" className="scroll-mt-24 py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Institucional"
            title="Veja a ACTUS em operação."
            description="Experiência real de autoatendimento, tecnologia aplicada ao ponto de venda e mais agilidade para clientes e equipes."
          />
        </Reveal>

        <Reveal delay={120} className="mt-12 overflow-hidden rounded-sm border border-line bg-steel">
          <div className="relative aspect-video">
            <video
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              controls
              preload="auto"
            >
              <source src="/videos/actus-institucional.mp4" type="video/mp4" />
              Seu navegador não suporta a reprodução de vídeo.
            </video>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
