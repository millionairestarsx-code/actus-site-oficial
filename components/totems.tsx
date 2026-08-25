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
    subtitle: "Compacto. Integrado. Direto na parede.",
    description:
      "Totem desenvolvido para instalação direta na parede, sem pedestal ou base de piso. Uma solução que otimiza espaço e integra o autoatendimento à arquitetura do ambiente.",
  },
  {
    id: "02",
    name: "ACTUS PRO",
    image: actusPro,
    subtitle: "Versatilidade para diferentes operações.",
    description:
      "Modelo com pedestal e base de sustentação, desenvolvido para oferecer presença, estabilidade e flexibilidade de posicionamento no ponto de atendimento.",
  },
  {
    id: "03",
    name: "ACTUS PREMIUM",
    image: actusPremium,
    subtitle: "Presença e acabamento para projetos de alto padrão.",
    description:
      "Totem de gabinete completo, desenvolvido para operações que valorizam presença visual, robustez e integração sofisticada entre tecnologia e ambiente.",
  },
  {
    id: "04",
    name: "ACTUS FLEX",
    image: actusFlex,
    subtitle: "Autoatendimento onde você precisar.",
    description:
      "Modelo compacto para instalação sobre mesas e balcões, indicado para operações que precisam aproveitar espaços menores sem abrir mão da experiência digital.",
  },
  {
    id: "05",
    name: "ACTUS ONIC",
    image: actusOnic,
    subtitle: "Design vertical. Máximo aproveitamento de espaço.",
    description:
      "Modelo vertical estreito, desenvolvido para operações que precisam de presença tecnológica com menor ocupação de área.",
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
            description="De soluções compactas a estruturas completas de autoatendimento, a linha ACTUS oferece diferentes formatos para atender ao espaço disponível, ao fluxo de clientes e às necessidades de cada operação."
          />
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
            Materiais e acabamentos são definidos conforme cada projeto, podendo
            incluir ACM, aço, aço escovado, MDF e outras soluções construtivas.
          </p>
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
                  <p className="mt-3 max-w-md text-sm font-medium tracking-wide text-foreground/80">
                    {totem.subtitle}
                  </p>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
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
