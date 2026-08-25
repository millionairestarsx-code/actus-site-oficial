import Image from "next/image";
import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import actusPro from "@/public/totens/actus pro.png";
import { WHATSAPP_LINKS } from "@/lib/whatsapp";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden scroll-mt-24 border-b border-line"
    >
      <div
        aria-hidden="true"
        className="hero-glow pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(242,194,0,0.12),transparent_34%),radial-gradient(circle_at_10%_80%,rgba(242,194,0,0.05),transparent_28%)]"
      />
      <Container className="grid items-center gap-14 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-28">
        <div>
          <Reveal>
            <p className="mb-6 flex items-center gap-3 text-xs font-medium tracking-[0.24em] text-accent uppercase">
              <span aria-hidden="true" className="h-px w-8 bg-accent" />
              Automação comercial
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="font-display text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl xl:text-7xl">
              Automação que{" "}
              <span className="text-accent">transforma</span> negócios.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              A ACTUS é especializada em soluções de automação comercial e
              autoatendimento. Projetamos e desenvolvemos totens sob medida para
              empresas que precisam de operação mais ágil, atendimento mais
              fluido e tecnologia aplicada ao ponto de venda.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="#solucoes">Conheça nossas soluções</ButtonLink>
              <ButtonLink href={WHATSAPP_LINKS.especialista} variant="secondary" external>
                Fale com um especialista
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        <Reveal variant="right" delay={180} className="hero-totem-stage">
          <figure className="relative mx-auto flex w-full max-w-sm items-center justify-center sm:max-w-md lg:max-w-none">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-[18%] rounded-full bg-accent/8 blur-3xl"
            />
            <Image
              src={actusPro}
              alt="Totem ACTUS"
              priority
              className="hero-totem-photo relative h-auto w-full object-contain"
              sizes="(min-width: 1024px) 42vw, 88vw"
            />
          </figure>
        </Reveal>
      </Container>
    </section>
  );
}
