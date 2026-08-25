import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

const solutions = [
  {
    title: "Autoatendimento",
    description:
      "Dê autonomia ao cliente para consultar, escolher, pedir e pagar com uma experiência simples e intuitiva.",
    icon: (
      <path
        d="M8 5h8v10H8zM10 17h4M12 17v2"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
      />
    ),
  },
  {
    title: "Agilidade operacional",
    description:
      "Distribua melhor a demanda e permita que sua equipe concentre esforços nas atividades que realmente exigem atenção humana.",
    icon: (
      <path
        d="M4 12h16M14 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
      />
    ),
  },
  {
    title: "Redução de filas",
    description:
      "Crie novos pontos de atendimento e diminua a concentração de clientes no balcão.",
    icon: (
      <path
        d="M6 7h12M6 12h8M6 17h5"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
      />
    ),
  },
  {
    title: "Integração tecnológica",
    description:
      "Estrutura preparada para integrar periféricos, sistemas de pagamento e soluções utilizadas na operação.",
    icon: (
      <path
        d="M8 8h8v8H8zM4 10v4M20 10v4"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
      />
    ),
  },
  {
    title: "Experiência do cliente",
    description:
      "Uma jornada moderna, intuitiva e consistente do primeiro toque à conclusão do atendimento.",
    icon: (
      <path
        d="M12 6l1.8 3.8L18 11l-3.2 2.6L15.6 18 12 15.8 8.4 18l.8-4.4L6 11l4.2-1.2z"
        stroke="currentColor"
        strokeWidth="1.4"
        fill="none"
      />
    ),
  },
  {
    title: "Soluções personalizadas",
    description:
      "Configurações, identidade visual, materiais, acabamentos e componentes definidos de acordo com as necessidades de cada projeto.",
    icon: (
      <path
        d="M7 17V7h10v10zM10 10h4"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
      />
    ),
  },
];

export function Solutions() {
  return (
    <section id="solucoes" className="scroll-mt-24 py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Soluções"
            title="Mais autonomia para o cliente. Mais eficiência para a operação."
            description="Da realização do pedido ao pagamento, a ACTUS cria soluções que simplificam jornadas, distribuem melhor a demanda e ajudam empresas a atender mais, com organização e controle."
          />
        </Reveal>
        <ul className="mt-14 grid gap-px bg-line sm:grid-cols-2 xl:grid-cols-3">
          {solutions.map((item, index) => (
            <li key={item.title} className="bg-background">
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
      </Container>
    </section>
  );
}
