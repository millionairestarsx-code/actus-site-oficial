import Link from "next/link";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { SiteMark } from "@/components/site-mark";
import { navItems } from "@/lib/navigation";

const contactSlots = [
  { label: "Telefone", value: "Em breve" },
  { label: "WhatsApp", value: "Em breve" },
  { label: "E-mail", value: "Em breve" },
  { label: "Redes sociais", value: "Em breve" },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-graphite">
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4 lg:py-20">
        <Reveal className="lg:col-span-2">
          <SiteMark />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
            ACTUS Automação Comercial. Soluções de autoatendimento e totens
            desenvolvidos sob medida para operações que exigem presença, precisão e
            desempenho.
          </p>
          <p className="mt-6 text-sm font-medium tracking-[0.16em] text-accent uppercase">
            actus85.com.br
          </p>
        </Reveal>

        <Reveal delay={80}>
          <p className="text-xs tracking-[0.2em] text-muted uppercase">Navegação</p>
          <ul className="mt-5 space-y-3">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-foreground/85 transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={140}>
          <p className="text-xs tracking-[0.2em] text-muted uppercase">Contato</p>
          <ul className="mt-5 space-y-4">
            {contactSlots.map((slot) => (
              <li key={slot.label}>
                <p className="text-sm text-foreground">{slot.label}</p>
                <p className="text-sm text-muted">{slot.value}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>

      <div className="border-t border-line">
        <Container className="flex flex-col gap-2 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 ACTUS Automação Comercial.</p>
          <p>Totens de autoatendimento desenvolvidos sob medida.</p>
        </Container>
      </div>
    </footer>
  );
}
