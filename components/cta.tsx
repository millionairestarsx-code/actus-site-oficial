import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";

export function Cta() {
  return (
    <section
      id="contato"
      className="scroll-mt-24 border-t border-line bg-[linear-gradient(180deg,#111111_0%,#0c0c0c_100%)]"
    >
      <Container className="py-20 lg:py-28">
        <Reveal>
        <div className="relative overflow-hidden rounded-sm border border-accent/25 bg-steel px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -bottom-20 h-64 w-64 rounded-full bg-accent/12 blur-3xl"
          />
          <p className="mb-5 flex items-center gap-3 text-xs font-medium tracking-[0.22em] text-accent uppercase">
            <span aria-hidden="true" className="h-px w-8 bg-accent" />
            Chamada comercial
          </p>
          <h2 className="max-w-3xl font-display text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-5xl">
            Modernize o atendimento do seu negócio.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Leve autoatendimento, agilidade e presença tecnológica para o seu
            ponto de venda. A ACTUS projeta e fabrica totens sob medida
            para empresas que querem transformar a operação.
          </p>
          <div className="mt-10">
            <ButtonLink href="#contato">Solicite uma proposta</ButtonLink>
          </div>
        </div>
        </Reveal>
      </Container>
    </section>
  );
}
