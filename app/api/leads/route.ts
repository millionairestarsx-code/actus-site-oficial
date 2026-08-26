import { NextRequest } from "next/server";
import { validateLead, type CapturedLead } from "@/lib/leads";

const capturedLeads: CapturedLead[] = [];

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Payload inválido." }, { status: 400 });
  }

  const result = validateLead(body as CapturedLead);

  if (!result.ok || !result.lead) {
    return Response.json({ ok: false, errors: result.errors }, { status: 400 });
  }

  const incoming = body as Partial<CapturedLead>;
  const record: CapturedLead = {
    ...result.lead,
    source: "site-actus",
    capturedAt:
      typeof incoming.capturedAt === "string"
        ? incoming.capturedAt
        : new Date().toISOString(),
  };

  capturedLeads.push(record);

  return Response.json({ ok: true, lead: record }, { status: 201 });
}
