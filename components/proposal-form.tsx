"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import { segments } from "@/lib/segments";
import { WHATSAPP_NUMBER } from "@/lib/whatsapp";
import {
  PROPOSAL_MODELS,
  PROPOSAL_OBJECTIVES,
  captureLead,
  createEmptyLead,
  validateLead,
  type LeadErrors,
  type LeadField,
  type ProposalLead,
} from "@/lib/leads";

const triggerClass =
  "btn-motion btn-motion-primary inline-flex min-h-12 items-center justify-center rounded-sm px-6 text-sm font-semibold tracking-wide bg-accent text-graphite hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

const fieldClass =
  "w-full rounded-sm border border-line bg-background px-4 py-3 text-sm text-foreground outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const fieldErrorClass =
  "border-[#dc2626] focus-visible:outline-[#dc2626]";

const fieldMessageClass = "mt-2 block text-xs text-[#dc2626]";

const FIELD_ORDER: LeadField[] = [
  "name",
  "company",
  "whatsapp",
  "email",
  "cityState",
  "segmentId",
  "estimatedTotems",
  "objective",
  "modelInterest",
  "description",
];

function fieldId(field: LeadField) {
  return `proposal-field-${field}`;
}

function controlClass(error?: string) {
  return error ? `${fieldClass} ${fieldErrorClass}` : fieldClass;
}

function visibleFieldError(error: string | undefined, value: string) {
  if (!error) {
    return undefined;
  }

  return value.trim() ? error : "Campo obrigatório";
}

function focusFirstInvalidField(errors: LeadErrors) {
  const first = FIELD_ORDER.find((field) => errors[field]);

  if (!first) {
    return;
  }

  const element = document.getElementById(fieldId(first));

  if (element instanceof HTMLElement) {
    element.scrollIntoView({ behavior: "smooth", block: "center" });
    element.focus();
  }
}

const specialistWhatsAppUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}?text=${encodeURIComponent(
  "Olá! Acabei de enviar uma solicitação de proposta pelo site da ACTUS e gostaria de falar com um especialista.",
)}`;

export function ProposalTrigger() {
  const [open, setOpen] = useState(false);
  const [lead, setLead] = useState<ProposalLead>(createEmptyLead);
  const [errors, setErrors] = useState<LeadErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState("");
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const overlayCloseArmedRef = useRef(false);
  const openClickStampRef = useRef(0);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    overlayCloseArmedRef.current = false;
    closeRef.current?.focus();

    const armOverlayClose = window.setTimeout(() => {
      overlayCloseArmedRef.current = true;
    }, 0);

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeModal();
      }
    }

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(armOverlayClose);
      overlayCloseArmedRef.current = false;
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

  function closeModal() {
    overlayCloseArmedRef.current = false;
    setOpen(false);
    setSubmitted(false);
    setSubmitting(false);
    setStatus("");
  }

  function handleOverlayClick(event: MouseEvent<HTMLButtonElement>) {
    if (!overlayCloseArmedRef.current) {
      return;
    }

    if (event.nativeEvent.timeStamp === openClickStampRef.current) {
      return;
    }

    closeModal();
  }

  function openModal(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    openClickStampRef.current = event.nativeEvent.timeStamp;
    overlayCloseArmedRef.current = false;
    setOpen(true);
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
      requestAnimationFrame(() => {
        requestAnimationFrame(() => focusFirstInvalidField(result.errors));
      });
      return;
    }

    setSubmitting(true);
    setSubmitted(false);
    setStatus("Registrando sua solicitação...");

    try {
      await captureLead(result.lead);
      setLead(result.lead);
      setSubmitted(true);
      setStatus("");
    } catch (error) {
      setSubmitted(false);
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
          onClick={handleOverlayClick}
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
            onClick={closeModal}
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
            className={`max-w-xl font-display text-3xl font-semibold tracking-tight text-balance ${submitted ? "text-accent" : ""}`}
          >
            {submitted ? "Solicitação registrada com sucesso!" : "Solicite uma proposta"}
          </h3>
          <p
            id={descriptionId}
            className="mt-4 max-w-2xl text-base leading-relaxed text-muted"
          >
            {submitted
              ? "Se desejar falar agora com um especialista da ACTUS, continue pelo WhatsApp."
              : "Preencha os dados da sua operação. A ACTUS registra a solicitação para o time comercial."}
          </p>

          {submitted ? (
            <div className="mt-8">
              <a
                href={specialistWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={triggerClass}
              >
                Falar com um especialista no WhatsApp
              </a>
            </div>
          ) : (
          <form className="mt-8 grid gap-5 sm:grid-cols-2" onSubmit={onSubmit} noValidate>
            <Field
              field="name"
              label="Nome"
              error={errors.name}
              value={lead.name}
              onChange={(value) => updateField("name", value)}
            />
            <Field
              field="company"
              label="Empresa"
              error={errors.company}
              value={lead.company}
              onChange={(value) => updateField("company", value)}
            />
            <Field
              field="whatsapp"
              label="WhatsApp"
              error={errors.whatsapp}
              value={lead.whatsapp}
              inputMode="tel"
              autoComplete="tel"
              onChange={(value) => updateField("whatsapp", value)}
            />
            <Field
              field="email"
              label="E-mail"
              error={errors.email}
              value={lead.email}
              type="email"
              autoComplete="email"
              onChange={(value) => updateField("email", value)}
            />
            <Field
              field="cityState"
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
                id={fieldId("segmentId")}
                className={controlClass(errors.segmentId)}
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
              {visibleFieldError(errors.segmentId, lead.segmentId) ? (
                <span className={fieldMessageClass}>
                  {visibleFieldError(errors.segmentId, lead.segmentId)}
                </span>
              ) : null}
            </label>
            <Field
              field="estimatedTotems"
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
                id={fieldId("objective")}
                className={controlClass(errors.objective)}
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
              {visibleFieldError(errors.objective, lead.objective) ? (
                <span className={fieldMessageClass}>
                  {visibleFieldError(errors.objective, lead.objective)}
                </span>
              ) : null}
            </label>
            <label className="block">
              <span className="mb-2 block text-xs font-medium tracking-[0.18em] text-accent uppercase">
                Modelo de interesse
              </span>
              <select
                id={fieldId("modelInterest")}
                className={controlClass(errors.modelInterest)}
                value={lead.modelInterest}
                aria-invalid={Boolean(errors.modelInterest)}
                onChange={(event) => updateField("modelInterest", event.target.value)}
              >
                <option value="">Selecione o modelo</option>
                {PROPOSAL_MODELS.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
              {visibleFieldError(errors.modelInterest, lead.modelInterest) ? (
                <span className={fieldMessageClass}>
                  {visibleFieldError(errors.modelInterest, lead.modelInterest)}
                </span>
              ) : null}
            </label>
            <label className="block sm:col-span-2">
              <span className="mb-2 block text-xs font-medium tracking-[0.18em] text-accent uppercase">
                Descrição da necessidade
              </span>
              <textarea
                id={fieldId("description")}
                className={`${controlClass(errors.description)} min-h-28 resize-y`}
                value={lead.description}
                aria-invalid={Boolean(errors.description)}
                onChange={(event) => updateField("description", event.target.value)}
              />
              {visibleFieldError(errors.description, lead.description) ? (
                <span className={fieldMessageClass}>
                  {visibleFieldError(errors.description, lead.description)}
                </span>
              ) : null}
            </label>

            <div className="sm:col-span-2">
              <button type="submit" className={triggerClass} disabled={submitting}>
                {submitting ? "Registrando sua solicitação..." : "Enviar solicitação"}
              </button>
              {submitting ? (
                <p
                  role="status"
                  aria-live="polite"
                  className="mt-6 rounded-sm border border-accent bg-accent/15 px-5 py-4 font-display text-xl font-semibold tracking-tight text-accent sm:text-2xl"
                >
                  Registrando sua solicitação...
                </p>
              ) : null}
              {status && !submitting ? (
                <p className="mt-4 text-sm leading-relaxed text-accent">{status}</p>
              ) : null}
            </div>
          </form>
          )}
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
        onClick={openModal}
      >
        Solicite uma proposta
      </button>
      {modal}
    </>
  );
}

type FieldProps = {
  field: LeadField;
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
  field,
  label,
  value,
  error,
  type = "text",
  inputMode,
  autoComplete,
  placeholder,
  onChange,
}: FieldProps) {
  const message = visibleFieldError(error, value);

  return (
    <label className="block">
      <span className="mb-2 block text-xs font-medium tracking-[0.18em] text-accent uppercase">
        {label}
      </span>
      <input
        id={fieldId(field)}
        className={controlClass(error)}
        type={type}
        value={value}
        inputMode={inputMode}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        onChange={(event) => onChange(event.target.value)}
      />
      {message ? <span className={fieldMessageClass}>{message}</span> : null}
    </label>
  );
}
