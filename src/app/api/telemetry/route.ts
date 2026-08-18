import { clientKey, rateLimit } from "@/lib/rate-limit";

// First-party, privacy-first analytics ingestion (spec: cookieless, no PII,
// respects Do-Not-Track; DPDP + GDPR aware). Same-origin beacon only — no CORS.
export const dynamic = "force-dynamic";

// Only these top-level fields are ever read off the body. Anything else
// (ids, emails, user objects, …) is dropped before this handler does anything
// with the payload — allowlist mindset, never store or echo PII.
const ALLOWED_KEYS = new Set(["name", "value", "props"]);

/** A "plain" props bag: a non-null, non-array object of primitive-ish values. */
function isPlainProps(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

export async function POST(req: Request) {
  // 1. Honor Do-Not-Track — accept nothing, store nothing.
  if (req.headers.get("dnt") === "1") {
    return new Response(null, { status: 204 });
  }

  // 2. Best-effort rate limit (per-instance; see rate-limit.ts note).
  const rl = await rateLimit(clientKey(req), { limit: 120, windowMs: 60_000 });
  if (!rl.ok) {
    return Response.json(
      { error: "rate_limited" },
      { status: 429, headers: { "Retry-After": String(Math.ceil(rl.resetMs / 1000)) } },
    );
  }

  // 3. Parse + validate. Reject anything that isn't a small, well-shaped event.
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new Response(null, { status: 400 });
  }

  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return new Response(null, { status: 400 });
  }
  const raw = body as Record<string, unknown>;

  if (typeof raw.name !== "string" || raw.name.length === 0) {
    return new Response(null, { status: 400 });
  }
  if ("props" in raw && raw.props !== undefined && !isPlainProps(raw.props)) {
    return new Response(null, { status: 400 });
  }

  // Project onto the allowlist only — drop every other field (potential PII)
  // before it is ever touched. `event` is intentionally not persisted here.
  const event: Record<string, unknown> = {};
  for (const key of ALLOWED_KEYS) {
    if (key in raw) event[key] = raw[key];
  }
  void event;

  // 4. Accept + no-op. In production this is where the sanitized, PII-free
  // event forwards to the analytics sink (Plausible / Tinybird / Qeet Logs).
  // No external call is made here.
  return new Response(null, { status: 204 });
}

export function GET() {
  return new Response(null, { status: 405, headers: { Allow: "POST" } });
}
