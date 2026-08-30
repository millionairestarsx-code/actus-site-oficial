import { createClient } from "@supabase/supabase-js";
import { NextRequest } from "next/server";
import { notifyLeadByEmail } from "@/lib/lead-email";
import {
  mapLeadToDatabaseRow,
  validateLead,
  type CapturedLead,
} from "@/lib/leads";

function normalizeSupabaseUrl(value: string) {
  const trimmed = value.trim().replace(/^["']|["']$/g, "");
  const withoutRestPath = trimmed.replace(/\/rest\/v1(?:\/.*)?$/i, "");

  try {
    const parsed = new URL(withoutRestPath);
    parsed.pathname = "/";
    parsed.search = "";
    parsed.hash = "";
    return parsed.origin;
  } catch {
    throw new Error("A URL do Supabase é inválida.");
  }
}

function collapseDuplicatedRestPath(url: string) {
  return url.replace(/\/rest\/v1\/(?:rest\/v1\/)+/gi, "/rest/v1/");
}

function getSupabaseConfig() {
  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL;
  const rawKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.SUPABASE_SERVICE_KEY ??
    process.env.SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!rawUrl?.trim() || !rawKey?.trim()) {
    throw new Error(
      "Supabase não está configurado. Defina SUPABASE_URL (ou NEXT_PUBLIC_SUPABASE_URL) e a chave de serviço ou anon.",
    );
  }

  return {
    url: normalizeSupabaseUrl(rawUrl),
    key: rawKey.trim().replace(/^["']|["']$/g, ""),
  };
}

function createSupabaseClient() {
  const { url, key } = getSupabaseConfig();

  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    global: {
      fetch: (input, init) => {
        if (typeof input === "string") {
          return fetch(collapseDuplicatedRestPath(input), init);
        }

        if (input instanceof URL) {
          return fetch(collapseDuplicatedRestPath(input.href), init);
        }

        return fetch(input, init);
      },
    },
  });
}

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

  try {
    const supabase = createSupabaseClient();
    const row = mapLeadToDatabaseRow(record);

    const { data, error } = await supabase
      .from("leads")
      .insert(row)
      .select()
      .single();

    if (error) {
      console.error("Supabase leads insert failed:", error.message, error.details, error.hint);
      return Response.json(
        {
          ok: false,
          error:
            error.message ||
            "Não foi possível gravar a solicitação no banco.",
        },
        { status: 500 },
      );
    }

    if (!data) {
      return Response.json(
        {
          ok: false,
          error: "A gravação não foi confirmada pelo banco.",
        },
        { status: 500 },
      );
    }

    await notifyLeadByEmail(record, data as Record<string, unknown>);

    return Response.json({ ok: true, lead: record }, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Não foi possível gravar a solicitação no banco.";

    return Response.json({ ok: false, error: message }, { status: 500 });
  }
}
