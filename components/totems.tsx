import Image from "next/image";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import actusFlex from "@/public/totens/actus flex.png";
import actusOnic from "@/public/totens/actus onic.png";
import actusOne from "@/public/totens/actus one.png";
import actusPremium from "@/public/totens/actus premium.png";
import actusPro from "@/public/totens/actus pro.png";

const totems = [
  {
    id: "01",
    name: "ACTUS ONE",
    image: actusOne,
    description:
      "Totem desenvolvido para instalação diretamente na parede, sem pedestal ou base de piso. Ocupa o mínimo de espaço e se integra à arquitetura do ambiente.",
  },
  {
    id: "02",
    name: "ACTUS PRO",
    image: actusPro,
    description:
      "Totem com pedestal e base de sustentação, indicado para operações profissionais de autoatendimento. Presença sólida e instalação independente.",
  },
  {
    id: "03",
    name: "ACTUS PREMIUM",
    image: actusPremium,
    description:
      "Totem em formato de gabinete completo, do chão até a tela, com acabamento premium. Volume, presença e sofisticação para operações que exigem destaque.",
  },
  {
    id: "04",
    name: "ACTUS FLEX",
    image: actusFlex,
    description:
      "Totem compacto e portátil desenvolvido para instalação sobre mesa ou balcão. Ideal para espaços reduzidos e operações que precisam de mobilidade.",
  },
  {
    id: "05",
    name: "ACTUS ONIC",
    image: actusOnic,
    description:
      "Totem vertical estreito, com design moderno e otimização de espaço. Indicado para corredores, halls e pontos de alto fluxo.",
  },
];

export function Totems() {
  return (
    <section id="totens" className="scroll-mt-24 border-y border-line bg-graphite py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Linha de totens"
            title="Cinco formatos. Uma mesma exigência de fabricação."
            description="Toda a linha ACTUS é desenvolvida sob medida, com materiais, acabamentos e configurações definidos de acordo com as necessidades de cada projeto. Cada modelo responde a um tipo de espaço, de fluxo e de presença no ponto de atendimento."
          />
        </Reveal>

        <div className="mt-16 space-y-8">
          {totems.map((totem, index) => (
            <article
              key={totem.name}
              className="card-motion grid items-center gap-6 border border-line bg-background/40 p-5 sm:p-6 lg:grid-cols-2 lg:gap-10 lg:p-7"
            >
              <figure className={`group ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                <Reveal variant={index % 2 === 1 ? "right" : "left"}>
                  <div className="totem-visual">
                    <Image
                      src={totem.image}
                      alt={`Totem ${totem.name}`}
                      className="totem-photo mx-auto h-auto w-full object-contain"
                      sizes="(min-width: 1024px) 42vw, 100vw"
                    />
                    <span aria-hidden="true" className="totem-vignette" />
                  </div>
                </Reveal>
              </figure>
              <Reveal
                variant={index % 2 === 1 ? "left" : "right"}
                delay={90}
                className={index % 2 === 1 ? "lg:order-1" : ""}
              >
                <div className="flex flex-col justify-center">
                  <p className="text-xs tracking-[0.24em] text-accent uppercase">
                    {totem.id}
                  </p>
                  <h3 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                    {totem.name}
                  </h3>
                  <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
                    {totem.description}
                  </p>
                </div>
              </Reveal>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
