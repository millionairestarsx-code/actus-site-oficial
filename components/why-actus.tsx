import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

const reasons = [
  {
    title: "Tecnologia",
    description:
      "Projeto pensado para o uso intenso do autoatendimento, com foco em desempenho, clareza de uso e presença tecnológica.",
  },
  {
    title: "Qualidade de fabricação",
    description:
      "Materiais selecionados, construção precisa e acabamento superior. Cada totem é desenvolvido de acordo com as exigências técnicas, estéticas e operacionais de cada projeto.",
  },
  {
    title: "Personalização",
    description:
      "Materiais e acabamentos personalizados. Desenvolvemos totens em ACM, aço escovado e outros materiais e acabamentos, definidos de acordo com a aplicação, o ambiente e a identidade visual de cada cliente.",
  },
  {
    title: "Suporte",
    description:
      "Acompanhamento próximo da especificação à operação, com orientação técnica para implantar e manter o autoatendimento.",
  },
  {
    title: "Soluções sob medida",
    description:
      "Cada projeto parte da necessidade real do ponto de atendimento. Não é um produto genérico: é uma solução para a sua operação.",
  },
];

export function WhyActus() {
  return (
    <section id="sobre" className="scroll-mt-24 py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Por que escolher a ACTUS"
            title="Mais do que um totem. Uma operação mais inteligente."
            description="Unimos fabricação, design e tecnologia para entregar autoatendimento com padrão industrial e acabamento de marca."
          />
        </Reveal>
        <ol className="mt-16 divide-y divide-line border-y border-line">
          {reasons.map((reason, index) => (
            <li key={reason.title}>
              <Reveal
                delay={index * 70}
                className="row-motion grid gap-4 py-8 sm:grid-cols-[5rem_minmax(0,16rem)_1fr] sm:items-start sm:gap-10"
              >
              <span className="font-display text-sm tracking-[0.2em] text-accent">
                0{index + 1}
              </span>
              <h3 className="font-display text-2xl font-semibold tracking-tight">
                {reason.title}
              </h3>
              <p className="max-w-xl text-sm leading-relaxed text-muted sm:text-base">
                {reason.description}
              </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
