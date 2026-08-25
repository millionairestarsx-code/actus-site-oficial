"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Reveal } from "@/components/reveal";
import { segments, type Segment } from "@/lib/segments";

const buttonClass =
  "btn-motion btn-motion-primary inline-flex min-h-12 w-full items-center justify-center rounded-sm bg-accent px-6 text-sm font-semibold tracking-wide text-graphite hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:w-auto";

export function SegmentExplorer() {
  const [selected, setSelected] = useState<Segment | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!selected) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSelected(null);
      }
    }

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      triggerRef.current?.focus();
    };
  }, [selected]);

  function openSegment(segment: Segment, trigger: HTMLButtonElement) {
    triggerRef.current = trigger;
    setSelected(segment);
  }

  const modal =
    selected &&
    createPortal(
      <div className="fixed inset-0 z-[70] flex items-end justify-center p-4 sm:items-center sm:p-6">
        <button
          type="button"
          className="absolute inset-0 bg-background/80"
          aria-label="Fechar"
          onClick={() => setSelected(null)}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          tabIndex={-1}
          className="relative z-10 max-h-[min(88vh,40rem)] w-full max-w-2xl overflow-y-auto rounded-sm border border-line bg-steel p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45)] sm:p-8 lg:p-10"
        >
          <button
            ref={closeRef}
            type="button"
            className="absolute top-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-sm border border-line text-foreground hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            aria-label="Fechar"
            onClick={() => setSelected(null)}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
              <path
                d="M7 7l10 10M17 7 7 17"
                stroke="currentColor"
                strokeWidth="1.6"
                fill="none"
              />
            </svg>
          </button>

          <p className="mb-4 flex items-center gap-3 text-xs font-medium tracking-[0.22em] text-accent uppercase">
            <span aria-hidden="true" className="h-px w-8 bg-accent" />
            Segmento
          </p>
          <h3
            id={titleId}
            className="max-w-lg font-display text-3xl font-semibold tracking-tight text-balance"
          >
            {selected.name}
          </h3>
          <p
            id={descriptionId}
            className="mt-4 max-w-xl text-base leading-relaxed text-muted"
          >
            {selected.summary}
          </p>

          <dl className="mt-8 divide-y divide-line border-y border-line">
            {[
              { title: "Desafio", text: selected.desafio },
              { title: "Solução ACTUS", text: selected.solucao },
              { title: "Recursos possíveis", text: selected.recursos },
            ].map((block) => (
              <div key={block.title} className="py-5">
                <dt className="text-xs font-medium tracking-[0.22em] text-accent uppercase">
                  {block.title}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                  {block.text}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-8">
            <a
              href={selected.whatsappHref}
              className={buttonClass}
              target="_blank"
              rel="noopener noreferrer"
            >
              Quero uma solução para este segmento
            </a>
          </div>
        </div>
      </div>,
      document.body,
    );

  return (
    <>
      <ul className="mt-14 grid gap-px bg-line sm:grid-cols-2 xl:grid-cols-3">
        {segments.map((segment, index) => (
          <li
            key={segment.id}
            className={`bg-background ${index === segments.length - 1 ? "sm:col-span-2 xl:col-span-3" : ""}`}
          >
            <Reveal delay={Math.min(index, 8) * 50} className="h-full">
              <button
                type="button"
                className="card-motion-soft flex h-full min-h-44 w-full flex-col p-7 text-left sm:p-8 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent"
                aria-haspopup="dialog"
                aria-expanded={selected?.id === segment.id}
                onClick={(event) => openSegment(segment, event.currentTarget)}
              >
                <span className="card-icon mb-5 inline-flex h-11 w-11 items-center justify-center rounded-sm border border-line text-accent">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                    <path
                      d={segment.icon}
                      stroke="currentColor"
                      strokeWidth="1.6"
                      fill="none"
                    />
                  </svg>
                </span>
                <h3 className="font-display text-xl font-semibold tracking-tight">
                  {segment.name}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  {segment.summary}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-xs font-medium tracking-[0.18em] text-accent uppercase">
                  Ver solução
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden="true">
                    <path
                      d="M9 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      fill="none"
                    />
                  </svg>
                </span>
              </button>
            </Reveal>
          </li>
        ))}
      </ul>
      {modal}
    </>
  );
}
