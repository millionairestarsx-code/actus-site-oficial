import type { Metadata } from "next";
import { Outfit, Syne } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ACTUS | Automação Comercial",
  description:
    "A ACTUS desenvolve soluções de automação comercial e totens de autoatendimento sob medida. Tecnologia, fabricação e projetos personalizados.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${outfit.variable} ${syne.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <noscript>
          <style>{`.reveal{opacity:1;transform:none}`}</style>
        </noscript>
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[80] focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-graphite"
        >
          Ir para o conteúdo
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
