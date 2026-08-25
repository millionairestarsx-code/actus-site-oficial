"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SiteMark } from "@/components/site-mark";
import { navItems } from "@/lib/navigation";
import { WHATSAPP_LINKS } from "@/lib/whatsapp";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 10);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header
      className={`site-header sticky top-0 z-50 border-b backdrop-blur-xl ${
        scrolled
          ? "border-line bg-background/94 shadow-[0_10px_30px_rgba(0,0,0,0.32)]"
          : "border-transparent bg-background/70"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link
          href="#inicio"
          className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          onClick={() => setOpen(false)}
        >
          <SiteMark compact />
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm tracking-wide text-foreground/80 transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <a
            href={WHATSAPP_LINKS.faleComActus}
            className="btn-motion btn-motion-primary inline-flex min-h-11 items-center rounded-sm bg-accent px-4 text-sm font-semibold text-graphite hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            target="_blank"
            rel="noopener noreferrer"
          >
            Fale com a ACTUS
          </a>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-line text-foreground lg:hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          aria-expanded={open}
          aria-controls="menu-mobile"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Fechar menu" : "Abrir menu"}</span>
          <span aria-hidden="true" className="flex w-5 flex-col gap-1.5">
            <span
              className={`h-px w-full bg-current transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
            />
            <span className={`h-px w-full bg-current ${open ? "opacity-0" : ""}`} />
            <span
              className={`h-px w-full bg-current transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
            />
          </span>
        </button>
      </div>

      <div
        id="menu-mobile"
        hidden={!open}
        className="border-t border-line bg-background lg:hidden"
      >
        <nav aria-label="Mobile" className="flex flex-col gap-1 px-5 py-5">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-sm px-2 py-3 text-base text-foreground hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={WHATSAPP_LINKS.faleComActus}
            className="btn-motion btn-motion-primary mt-3 inline-flex min-h-12 items-center justify-center rounded-sm bg-accent px-4 text-sm font-semibold text-graphite hover:bg-accent-hover"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
          >
            Fale com a ACTUS
          </a>
        </nav>
      </div>
    </header>
  );
}
