"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { segments } from "@/lib/segments";
import {
  PROPOSAL_OBJECTIVES,
  buildProposalWhatsAppUrl,
  captureLead,
  createEmptyLead,
  validateLead,
  type LeadErrors,
  type ProposalLead,
} from "@/lib/leads";

const triggerClass =
  "btn-motion btn-motion-primary inline-flex min-h-12 items-center justify-center rounded-sm px-6 text-sm font-semibold tracking-wide bg-accent text-graphite hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

const fieldClass =
  "w-full rounded-sm border border-line bg-background px-4 py-3 text-sm text-foreground outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export function ProposalTrigger() {
  const [open, setOpen] = useState(false);
  const [lead, setLead] = useState<ProposalLead>(createEmptyLead);
  const [errors, setErrors] = useState<LeadErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState("");
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      triggerRef.current?.focus();
    };
  }, [open]);

  function updateField<K extends keyof ProposalLead>(field: K, value: ProposalLead[K]) {
    setLead((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setStatus("");
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const selectedSegment = segments.find((item) => item.id === lead.segmentId);
    const prepared: ProposalLead = {
      ...lead,
      segmentName: selectedSegment?.name ?? "",
    };
    const result = validateLead(prepared);

    if (!result.ok || !result.lead) {
      setErrors(result.errors);
      setStatus("Preencha os campos obrigatórios para continuar.");
      return;
    }

    setSubmitting(true);
    setStatus("Registrando os dados da solicitação...");

    try {
      const record = await captureLead(result.lead);
      setLead(result.lead);
      setStatus(
        "Dados registrados. Abrindo o WhatsApp da ACTUS com o resumo da solicitação.",
      );
      window.open(
        buildProposalWhatsAppUrl(record),
        "_blank",
        "noopener,noreferrer",
      );
    } catch (error) {
      setStatus(
        error instanceof Error
          ? error.message
          : "Não foi possível gravar a solicitação. Tente novamente.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  const modal =
    open &&
    createPortal(
      <div className="fixed inset-0 z-[70] flex items-end justify-center p-4 sm:items-center sm:p-6">
        <button
          type="button"
          className="absolute inset-0 bg-background/80"
          aria-label="Fechar"
          onClick={() => setOpen(false)}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          tabIndex={-1}
          className="relative z-10 max-h-[min(90vh,46rem)] w-full max-w-3xl overflow-y-auto rounded-sm border border-line bg-steel p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45)] sm:p-8 lg:p-10"
        >
          <button
            ref={closeRef}
            type="button"
            className="absolute top-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-sm border border-line text-foreground hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            aria-label="Fechar"
            onClick={() => setOpen(false)}
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
            Proposta comercial
          </p>
          <h3
            id={titleId}
            className="max-w-xl font-display text-3xl font-semibold tracking-tight text-balance"
          >
            Solicite uma proposta
          </h3>
          <p
            id={descriptionId}
            className="mt-4 max-w-2xl text-base leading-relaxed text-muted"
          >
            Preencha os dados da sua operação. A ACTUS registra a solicitação e
            em seguida abre o WhatsApp com um resumo para o time comercial.
          </p>

          <form className="mt-8 grid gap-5 sm:grid-cols-2" onSubmit={onSubmit} noValidate>
            <Field
              label="Nome"
              error={errors.name}
              value={lead.name}
              onChange={(value) => updateField("name", value)}
            />
            <Field
              label="Empresa"
              error={errors.company}
              value={lead.company}
              onChange={(value) => updateField("company", value)}
            />
            <Field
              label="WhatsApp"
              error={errors.whatsapp}
              value={lead.whatsapp}
              inputMode="tel"
              autoComplete="tel"
              onChange={(value) => updateField("whatsapp", value)}
            />
            <Field
              label="E-mail"
              error={errors.email}
              value={lead.email}
              type="email"
              autoComplete="email"
              onChange={(value) => updateField("email", value)}
            />
            <Field
              label="Cidade/UF"
              error={errors.cityState}
              value={lead.cityState}
              placeholder="Fortaleza/CE"
              onChange={(value) => updateField("cityState", value)}
            />
            <label className="block">
              <span className="mb-2 block text-xs font-medium tracking-[0.18em] text-accent uppercase">
                Segmento
              </span>
              <select
                className={fieldClass}
                value={lead.segmentId}
                aria-invalid={Boolean(errors.segmentId)}
                onChange={(event) => updateField("segmentId", event.target.value)}
              >
                <option value="">Selecione o segmento</option>
                {segments.map((segment) => (
                  <option key={segment.id} value={segment.id}>
                    {segment.name}
                  </option>
                ))}
              </select>
              {errors.segmentId ? (
                <span className="mt-2 block text-xs text-accent">{errors.segmentId}</span>
              ) : null}
            </label>
            <Field
              label="Quantidade estimada de totens"
              error={errors.estimatedTotems}
              value={lead.estimatedTotems}
              inputMode="numeric"
              placeholder="Ex.: 3"
              onChange={(value) => updateField("estimatedTotems", value)}
            />
            <label className="block">
              <span className="mb-2 block text-xs font-medium tracking-[0.18em] text-accent uppercase">
                Objetivo principal
              </span>
              <select
                className={fieldClass}
                value={lead.objective}
                aria-invalid={Boolean(errors.objective)}
                onChange={(event) => updateField("objective", event.target.value)}
              >
                <option value="">Selecione o objetivo</option>
                {PROPOSAL_OBJECTIVES.map((objective) => (
                  <option key={objective} value={objective}>
                    {objective}
                  </option>
                ))}
              </select>
              {errors.objective ? (
                <span className="mt-2 block text-xs text-accent">{errors.objective}</span>
              ) : null}
            </label>
            <label className="block sm:col-span-2">
              <span className="mb-2 block text-xs font-medium tracking-[0.18em] text-accent uppercase">
                Descrição da necessidade
              </span>
              <textarea
                className={`${fieldClass} min-h-28 resize-y`}
                value={lead.description}
                aria-invalid={Boolean(errors.description)}
                onChange={(event) => updateField("description", event.target.value)}
              />
              {errors.description ? (
                <span className="mt-2 block text-xs text-accent">{errors.description}</span>
              ) : null}
            </label>

            <div className="sm:col-span-2">
              <button type="submit" className={triggerClass} disabled={submitting}>
                {submitting ? "Registrando..." : "Enviar solicitação"}
              </button>
              {status ? (
                <p className="mt-4 text-sm leading-relaxed text-muted">{status}</p>
              ) : null}
            </div>
          </form>
        </div>
      </div>,
      document.body,
    );

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={triggerClass}
        onClick={() => setOpen(true)}
      >
        Solicite uma proposta
      </button>
      {modal}
    </>
  );
}

type FieldProps = {
  label: string;
  value: string;
  error?: string;
  type?: string;
  inputMode?: "tel" | "email" | "numeric" | "text";
  autoComplete?: string;
  placeholder?: string;
  onChange: (value: string) => void;
};

function Field({
  label,
  value,
  error,
  type = "text",
  inputMode,
  autoComplete,
  placeholder,
  onChange,
}: FieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-medium tracking-[0.18em] text-accent uppercase">
        {label}
      </span>
      <input
        className={fieldClass}
        type={type}
        value={value}
        inputMode={inputMode}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        onChange={(event) => onChange(event.target.value)}
      />
      {error ? <span className="mt-2 block text-xs text-accent">{error}</span> : null}
    </label>
  );
}
