/**
 * Rate limiter with two backends:
 *  - **Shared store (Upstash Redis REST)** when `UPSTASH_REDIS_REST_URL` +
 *    `UPSTASH_REDIS_REST_TOKEN` are set — a global, hard limit across instances
 *    (fixed-window counter via INCR + PEXPIRE).
 *  - **In-memory** fallback otherwise — best-effort per-instance only (on
 *    serverless each instance has its own map, so effective limit is
 *    `limit × instanceCount`). Fine as a cheap first line of defence.
 *
 * `rateLimit` is async so it can await the shared store; it never throws (a KV
 * failure degrades to the in-memory limiter).
 */

type Bucket = { count: number; reset: number };
type Result = { ok: boolean; remaining: number; resetMs: number };

const buckets = new Map<string, Bucket>();
const DEFAULT_LIMIT = 60;
const DEFAULT_WINDOW_MS = 60_000;

let callsSincePrune = 0;
const PRUNE_EVERY = 1_000;

function prune(now: number): void {
  for (const [key, bucket] of buckets) if (bucket.reset <= now) buckets.delete(key);
}

/** In-memory fixed-window counter (synchronous). */
function memRateLimit(key: string, limit: number, windowMs: number): Result {
  const now = Date.now();
  if (++callsSincePrune >= PRUNE_EVERY) {
    callsSincePrune = 0;
    prune(now);
  }
  let bucket = buckets.get(key);
  if (!bucket || bucket.reset <= now) {
    bucket = { count: 0, reset: now + windowMs };
    buckets.set(key, bucket);
  }
  bucket.count += 1;
  return {
    ok: bucket.count <= limit,
    remaining: Math.max(0, limit - bucket.count),
    resetMs: Math.max(0, bucket.reset - now),
  };
}

/** Shared-store fixed-window counter via the Upstash Redis REST pipeline. */
async function kvRateLimit(key: string, limit: number, windowMs: number): Promise<Result> {
  const url = process.env.UPSTASH_REDIS_REST_URL ?? "";
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? "";
  const bucketId = Math.floor(Date.now() / windowMs);
  const rkey = `rl:${key}:${bucketId}`;
  const res = await fetch(`${url}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "content-type": "application/json" },
    body: JSON.stringify([
      ["INCR", rkey],
      ["PEXPIRE", rkey, windowMs, "NX"],
    ]),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`upstash ${res.status}`);
  const data = (await res.json()) as { result: number }[];
  const count = Number(data?.[0]?.result ?? 0);
  return {
    ok: count <= limit,
    remaining: Math.max(0, limit - count),
    resetMs: windowMs - (Date.now() % windowMs),
  };
}

const kvConfigured = () =>
  Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);

/**
 * Record a hit for `key` and report whether it is within the allowance.
 * Uses the Upstash shared store when configured, else the in-memory fallback.
 */
export async function rateLimit(
  key: string,
  opts?: { limit?: number; windowMs?: number },
): Promise<Result> {
  const limit = opts?.limit ?? DEFAULT_LIMIT;
  const windowMs = opts?.windowMs ?? DEFAULT_WINDOW_MS;
  if (kvConfigured()) {
    try {
      return await kvRateLimit(key, limit, windowMs);
    } catch {
      // KV unavailable — degrade to in-memory rather than fail open/closed hard.
    }
  }
  return memRateLimit(key, limit, windowMs);
}

/**
 * Derive a stable rate-limit key from a request's forwarded client IP. Prefers
 * the first hop of `x-forwarded-for`, then `x-real-ip`, else `"anon"`. The IP is
 * only used as a bucket key — never persisted or logged here.
 */
export function clientKey(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) {
    const first = fwd.split(",")[0]?.trim();
    if (first) return first;
  }
  const real = req.headers.get("x-real-ip")?.trim();
  if (real) return real;
  return "anon";
}
