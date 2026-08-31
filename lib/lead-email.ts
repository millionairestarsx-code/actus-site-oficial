import { Resend } from "resend";
import type { CapturedLead } from "@/lib/leads";

const FROM_ADDRESS = "ACTUS <contato@actus85.com.br>";
const TO_ADDRESS = "contato@actus85.com.br";
const REPLY_TO_ADDRESS = "contato@actus85.com.br";
const SUBJECT = "Novo lead recebido pelo site ACTUS";
const CUSTOMER_SUBJECT = "Recebemos sua solicitação — ACTUS";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function readOptionalText(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : "";
}

function formatDateTime(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "America/Fortaleza",
  }).format(date);
}

function buildLeadFields(lead: CapturedLead, savedRow: Record<string, unknown>) {
  const status =
    readOptionalText(savedRow.status) ||
    readOptionalText(savedRow.situacao) ||
    readOptionalText(savedRow.lead_status);
  const createdAt =
    readOptionalText(savedRow.created_at) ||
    readOptionalText(savedRow.createdAt) ||
    lead.capturedAt;

  const fields = [
    { label: "Nome", value: lead.name },
    { label: "Empresa", value: lead.company },
    { label: "WhatsApp", value: lead.whatsapp },
    { label: "E-mail", value: lead.email },
    { label: "Cidade/UF", value: lead.cityState },
    { label: "Segmento", value: lead.segmentName },
    { label: "Quantidade estimada de totens", value: lead.estimatedTotems },
    { label: "Objetivo principal", value: lead.objective },
    { label: "Descrição da necessidade", value: lead.description },
    { label: "Modelo de interesse", value: lead.modelInterest },
  ];

  if (status) {
    fields.push({ label: "Status do lead", value: status });
  }

  if (createdAt) {
    fields.push({ label: "Data/hora do cadastro", value: formatDateTime(createdAt) });
  }

  return fields;
}

function buildTextBody(fields: { label: string; value: string }[]) {
  const lines = [
    "ACTUS Automação Comercial",
    "Novo lead recebido pelo site",
    "",
    ...fields.map((field) => `${field.label}: ${field.value}`),
    "",
    "Este aviso foi gerado automaticamente pelo site ACTUS.",
  ];

  return lines.join("\n");
}

function buildHtmlBody(fields: { label: string; value: string }[]) {
  const rows = fields
    .map(
      (field) => `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #ece8dc;color:#6f6b61;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;width:38%;vertical-align:top;">
            ${escapeHtml(field.label)}
          </td>
          <td style="padding:10px 0;border-bottom:1px solid #ece8dc;color:#111111;font-size:15px;line-height:1.5;">
            ${escapeHtml(field.value).replaceAll("\n", "<br />")}
          </td>
        </tr>`,
    )
    .join("");

  return `
    <div style="margin:0;padding:24px;background:#f4f1ea;font-family:Arial,Helvetica,sans-serif;">
      <div style="max-width:640px;margin:0 auto;background:#111111;color:#f2c200;padding:20px 24px;">
        <p style="margin:0;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;">ACTUS</p>
        <h1 style="margin:8px 0 0;font-size:22px;line-height:1.3;color:#ffffff;">Novo lead recebido pelo site</h1>
      </div>
      <div style="max-width:640px;margin:0 auto;background:#ffffff;padding:24px;">
        <p style="margin:0 0 18px;color:#333333;font-size:15px;line-height:1.5;">
          Uma nova solicitação de proposta foi registrada no site da ACTUS Automação Comercial.
        </p>
        <table style="width:100%;border-collapse:collapse;">
          ${rows}
        </table>
      </div>
      <div style="max-width:640px;margin:0 auto;padding:16px 24px;color:#6f6b61;font-size:12px;">
        Este aviso foi gerado automaticamente pelo site ACTUS.
      </div>
    </div>
  `;
}

export async function notifyLeadByEmail(
  lead: CapturedLead,
  savedRow: Record<string, unknown>,
) {
  const apiKey = process.env.RESEND_API_KEY?.trim();

  if (!apiKey) {
    console.error("Resend lead notification skipped: API key is not configured.");
    return;
  }

  try {
    const fields = buildLeadFields(lead, savedRow);
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: TO_ADDRESS,
      subject: SUBJECT,
      text: buildTextBody(fields),
      html: buildHtmlBody(fields),
    });

    if (error) {
      console.error("Resend lead notification failed:", error.name, error.message);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown error";
    console.error("Resend lead notification failed:", message);
  }
}

function firstNameFrom(fullName: string) {
  const first = fullName.trim().split(/\s+/)[0] ?? "";
  return first.length >= 2 ? first : "";
}

function buildCustomerSummary(lead: CapturedLead) {
  return [
    { label: "Empresa", value: lead.company.trim() },
    { label: "Segmento", value: lead.segmentName.trim() },
    { label: "Modelo de interesse", value: lead.modelInterest.trim() },
  ].filter((field) => field.value);
}

function buildCustomerTextBody(lead: CapturedLead) {
  const firstName = firstNameFrom(lead.name);
  const greeting = firstName ? `Olá, ${firstName}.` : "Olá.";
  const summary = buildCustomerSummary(lead);
  const lines = [
    "ACTUS Automação Comercial",
    "",
    greeting,
    "",
    "Obrigado por entrar em contato com a ACTUS.",
    "Recebemos sua solicitação com sucesso.",
    "Nossa equipe vai analisar as informações e entrar em contato.",
  ];

  if (summary.length > 0) {
    lines.push("", "Resumo da solicitação:");
    for (const field of summary) {
      lines.push(`${field.label}: ${field.value}`);
    }
  }

  lines.push(
    "",
    "Se preferir, pode responder este e-mail.",
    "",
    "ACTUS Automação Comercial",
    "actus85.com.br",
  );

  return lines.join("\n");
}

function buildCustomerHtmlBody(lead: CapturedLead) {
  const firstName = firstNameFrom(lead.name);
  const greeting = firstName
    ? `Olá, ${escapeHtml(firstName)}.`
    : "Olá.";
  const summary = buildCustomerSummary(lead);
  const summaryRows = summary
    .map(
      (field) => `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #ece8dc;color:#6f6b61;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;width:38%;vertical-align:top;">
            ${escapeHtml(field.label)}
          </td>
          <td style="padding:10px 0;border-bottom:1px solid #ece8dc;color:#111111;font-size:15px;line-height:1.5;">
            ${escapeHtml(field.value)}
          </td>
        </tr>`,
    )
    .join("");

  return `
    <div style="margin:0;padding:24px;background:#f4f1ea;font-family:Arial,Helvetica,sans-serif;">
      <div style="max-width:640px;margin:0 auto;background:#111111;color:#f2c200;padding:20px 24px;">
        <p style="margin:0;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;">ACTUS</p>
        <h1 style="margin:8px 0 0;font-size:22px;line-height:1.3;color:#ffffff;">Recebemos sua solicitação</h1>
      </div>
      <div style="max-width:640px;margin:0 auto;background:#ffffff;padding:24px;">
        <p style="margin:0 0 14px;color:#333333;font-size:15px;line-height:1.6;">
          ${greeting}
        </p>
        <p style="margin:0 0 14px;color:#333333;font-size:15px;line-height:1.6;">
          Obrigado por entrar em contato com a ACTUS Automação Comercial.
          Recebemos sua solicitação com sucesso.
        </p>
        <p style="margin:0 0 18px;color:#333333;font-size:15px;line-height:1.6;">
          Nossa equipe vai analisar as informações e entrar em contato.
        </p>
        ${
          summary.length > 0
            ? `
        <p style="margin:0 0 10px;color:#6f6b61;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;">
          Resumo da solicitação
        </p>
        <table style="width:100%;border-collapse:collapse;">
          ${summaryRows}
        </table>`
            : ""
        }
      </div>
      <div style="max-width:640px;margin:0 auto;padding:16px 24px;color:#6f6b61;font-size:12px;line-height:1.5;">
        Se preferir, pode responder este e-mail.<br />
        ACTUS Automação Comercial · actus85.com.br
      </div>
    </div>
  `;
}

export async function confirmLeadToCustomer(lead: CapturedLead) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const customerEmail = lead.email.trim();

  if (!apiKey) {
    console.error("Resend customer confirmation skipped: API key is not configured.");
    return;
  }

  if (!customerEmail) {
    console.error("Resend customer confirmation skipped: recipient is missing.");
    return;
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: customerEmail,
      replyTo: REPLY_TO_ADDRESS,
      subject: CUSTOMER_SUBJECT,
      text: buildCustomerTextBody(lead),
      html: buildCustomerHtmlBody(lead),
    });

    if (error) {
      console.error("Resend customer confirmation failed:", error.name, error.message);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown error";
    console.error("Resend customer confirmation failed:", message);
  }
}
