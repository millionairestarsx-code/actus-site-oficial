import { WHATSAPP_NUMBER } from "@/lib/whatsapp";
import { segments } from "@/lib/segments";

export const LEADS_STORAGE_KEY = "actus-leads";

export const PROPOSAL_OBJECTIVES = [
  "Reduzir filas e tempo de espera",
  "Agilizar pedidos e pagamentos",
  "Organizar recepção e atendimento",
  "Ampliar a capacidade da operação",
  "Outro",
] as const;

export type ProposalLead = {
  name: string;
  company: string;
  whatsapp: string;
  email: string;
  cityState: string;
  segmentId: string;
  segmentName: string;
  estimatedTotems: string;
  objective: string;
  description: string;
};

export type CapturedLead = ProposalLead & {
  source: "site-actus";
  capturedAt: string;
};

export type LeadField = keyof ProposalLead;
export type LeadErrors = Partial<Record<LeadField, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function trimValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export function createEmptyLead(): ProposalLead {
  return {
    name: "",
    company: "",
    whatsapp: "",
    email: "",
    cityState: "",
    segmentId: "",
    segmentName: "",
    estimatedTotems: "",
    objective: "",
    description: "",
  };
}

export function validateLead(input: Partial<ProposalLead>): {
  ok: boolean;
  lead?: ProposalLead;
  errors: LeadErrors;
} {
  const errors: LeadErrors = {};
  const name = trimValue(input.name);
  const company = trimValue(input.company);
  const whatsapp = trimValue(input.whatsapp);
  const email = trimValue(input.email);
  const cityState = trimValue(input.cityState);
  const segmentId = trimValue(input.segmentId);
  const estimatedTotems = trimValue(input.estimatedTotems);
  const objective = trimValue(input.objective);
  const description = trimValue(input.description);
  const segment = segments.find((item) => item.id === segmentId);

  if (name.length < 2) {
    errors.name = "Informe o nome completo.";
  }

  if (company.length < 2) {
    errors.company = "Informe a empresa.";
  }

  if (whatsapp.replace(/\D/g, "").length < 10) {
    errors.whatsapp = "Informe um WhatsApp válido, com DDD.";
  }

  if (!emailPattern.test(email)) {
    errors.email = "Informe um e-mail válido.";
  }

  if (cityState.length < 2) {
    errors.cityState = "Informe a cidade e o UF.";
  }

  if (!segment) {
    errors.segmentId = "Selecione um segmento.";
  }

  if (!estimatedTotems) {
    errors.estimatedTotems = "Informe a quantidade estimada de totens.";
  }

  if (!objective) {
    errors.objective = "Informe o objetivo principal.";
  }

  if (description.length < 8) {
    errors.description = "Descreva a necessidade com um pouco mais de detalhe.";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    errors,
    lead: {
      name,
      company,
      whatsapp,
      email,
      cityState,
      segmentId,
      segmentName: segment?.name ?? "",
      estimatedTotems,
      objective,
      description,
    },
  };
}

export function buildProposalWhatsAppUrl(lead: ProposalLead) {
  const phone = WHATSAPP_NUMBER.replace(/\D/g, "");
  const message = [
    "Olá, gostaria de solicitar uma proposta comercial da ACTUS.",
    "",
    `Nome: ${lead.name}`,
    `Empresa: ${lead.company}`,
    `WhatsApp: ${lead.whatsapp}`,
    `E-mail: ${lead.email}`,
    `Cidade/UF: ${lead.cityState}`,
    `Segmento: ${lead.segmentName}`,
    `Quantidade estimada de totens: ${lead.estimatedTotems}`,
    `Objetivo principal: ${lead.objective}`,
    `Descrição da necessidade: ${lead.description}`,
  ].join("\n");

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

function splitCityState(cityState: string) {
  const trimmed = cityState.trim();
  const match = trimmed.match(/^(.*?)\s*[\/,|–-]\s*([A-Za-zÀ-ÿ]{2})$/u);

  if (match) {
    return {
      cidade: match[1].trim(),
      estado: match[2].toUpperCase(),
    };
  }

  return {
    cidade: trimmed,
    estado: "",
  };
}

export function mapLeadToDatabaseRow(lead: ProposalLead): Record<string, unknown> {
  const { cidade, estado } = splitCityState(lead.cityState);

  return {
    nome: lead.name,
    empresa: lead.company,
    whatsapp: lead.whatsapp,
    email: lead.email,
    cidade,
    estado,
    segmento: lead.segmentName,
    necessidade: lead.description,
  };
}

export function persistLeadLocally(lead: CapturedLead) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const raw = window.localStorage.getItem(LEADS_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    const records = Array.isArray(parsed) ? parsed : [];
    records.push(lead);
    window.localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(records));
  } catch {
    // Local copy is optional and must never hide a failed Supabase write.
  }
}

export class LeadCaptureError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "LeadCaptureError";
  }
}

export async function captureLead(lead: ProposalLead): Promise<CapturedLead> {
  const record: CapturedLead = {
    ...lead,
    source: "site-actus",
    capturedAt: new Date().toISOString(),
  };

  let response: Response;

  try {
    response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
    });
  } catch {
    throw new LeadCaptureError(
      "Não foi possível conectar ao servidor para gravar a solicitação. Tente novamente.",
    );
  }

  let payload: { ok?: boolean; error?: string; errors?: LeadErrors } | null = null;

  try {
    payload = (await response.json()) as {
      ok?: boolean;
      error?: string;
      errors?: LeadErrors;
    };
  } catch {
    payload = null;
  }

  if (!response.ok || payload?.ok !== true) {
    throw new LeadCaptureError(
      payload?.error ||
        "Não foi possível gravar a solicitação. Tente novamente.",
    );
  }

  persistLeadLocally(record);
  return record;
}
