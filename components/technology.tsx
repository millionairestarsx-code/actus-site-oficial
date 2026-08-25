import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

const pillars = [
  {
    title: "Software próprio",
    description:
      "Plataforma desenvolvida pela ACTUS para criar jornadas de autoatendimento adaptadas a diferentes operações.",
    icon: (
      <path
        d="M6 7h12v8H6zM9 19h6M12 15v4"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
      />
    ),
  },
  {
    title: "Hardware personalizado",
    description:
      "Totens configurados de acordo com espaço, fluxo, periféricos e necessidades de cada projeto.",
    icon: (
      <path
        d="M9 4h6v12H9zM8 18h8M12 16v2"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
      />
    ),
  },
  {
    title: "Integração",
    description:
      "Arquitetura preparada para conectar pagamentos, impressão, leitura, sistemas e recursos utilizados pela operação.",
    icon: (
      <path
        d="M7 8h4v4H7zM13 12h4v4h-4zM11 10h2M15 12V9H12"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
      />
    ),
  },
  {
    title: "Solução completa",
    description:
      "Projeto integrado do equipamento à experiência digital, com implantação e suporte em uma única solução.",
    icon: (
      <path
        d="M6 16h12M8 16V8h8v8M10 12h4"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
      />
    ),
  },
];

export function Technology() {
  return (
    <section
      id="tecnologia"
      className="scroll-mt-24 border-y border-line bg-graphite py-20 lg:py-28"
    >
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Tecnologia ACTUS"
            title="Hardware e software desenvolvidos para trabalhar juntos."
            description="A ACTUS desenvolve tecnologia própria para autoatendimento e combina software, equipamentos e integração em uma solução completa. Isso permite adaptar cada projeto à jornada, às regras e às necessidades específicas de cada operação."
          />
        </Reveal>
        <ul className="mt-14 grid gap-px bg-line sm:grid-cols-2">
          {pillars.map((item, index) => (
            <li key={item.title} className="bg-graphite">
              <Reveal delay={index * 70} className="card-motion-soft h-full p-8 sm:p-9">
                <span className="card-icon mb-6 inline-flex h-11 w-11 items-center justify-center rounded-sm border border-line text-accent">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                    {item.icon}
                  </svg>
                </span>
                <h3 className="font-display text-xl font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
        <Reveal delay={280}>
          <p className="mt-12 text-xs font-medium tracking-[0.2em] text-foreground/80 uppercase">
            Hardware <span className="text-accent">+</span> Software{" "}
            <span className="text-accent">+</span> Integração{" "}
            <span className="text-accent">+</span> Suporte
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
