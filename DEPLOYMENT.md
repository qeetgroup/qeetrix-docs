# Deploying qeetrix-docs (ui.qeet.in)

Production deploy guide for the Qeetrix documentation & developer platform —
the `ui.qeet.in` app. It lives in the Qeetrix **Bun + Turborepo** monorepo
(`apps/qeetrix-docs`), dogfoods `@qeetrix/ui`, and ships to **Vercel**.

Spec is ground truth: `qeet-files/qeetrix/ui-qeet-in/` (the 18-section platform
spec + canon). See especially `10-performance.md`, `16-security.md`, and
`17-analytics.md`.

## Prerequisites

- **Bun ≥ 1.3** (sole package manager for the whole monorepo — never npm/pnpm/yarn)
- **Node ≥ 20** (Vercel build runtime; use **Node 22** on Vercel)

## Local

All commands run from the **monorepo root** (`qeetrix/`) unless noted.

```bash
bun install          # install workspace deps at the repo root
bun run docs:build   # build ui.qeet.in (turbo → qeetrix-docs)
bun run docs:dev     # dev server on http://localhost:3006
```

`docs:*` scripts proxy to the `qeetrix-docs` package. The app's own scripts
(`bun run --filter qeetrix-docs <script>`) are `dev`, `build`, `start` (all on
port **3006**), `lint`, `typecheck`, and `generate:data`. `build`/`dev` run
`scripts/generate-data.mjs` first to regenerate `src/lib/generated/` (gitignored
data derived from `@qeetrix/ui`) — never hand-edit that directory.

## Vercel

Deploy from a Vercel Project with these settings:

- **Root Directory:** `apps/qeetrix-docs`
- **Install / Build commands:** taken from `vercel.json` (do not override in the
  dashboard). Both `cd ../..` to the repo root so the Bun workspace and
  `@qeetrix/ui` resolve:
  - Install: `cd ../.. && bun install --frozen-lockfile`
  - Build: `cd ../.. && bunx turbo run build --filter=qeetrix-docs...`
- **Framework preset:** Next.js
- **Output directory:** default (`.next`)
- **Node version:** 22
- **Environment variables:** see `.env.example`. Only
  `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is used (set it to `ui.qeet.in` in production;
  leave empty to disable analytics). No server secrets are required.

### Domain

Primary domain: **`ui.qeet.in`** (canonical, set in `@/lib/site` as `SITE.url`).
Add it to `qeet-files/DOMAIN-ARCHITECTURE.md` under **Tier 0 — Corporate &
shared platform**:

| Host | Purpose | Repo / source |
|---|---|---|
| `ui.qeet.in` | Qeetrix design-system docs & developer platform | `qeetrix` (`apps/qeetrix-docs`) |

## Static vs dynamic

The site is **static-first** — nearly every route is prerendered at build time
(landing, docs, components, blocks, tokens, foundations, sitemap, robots,
manifest, icons). The dynamic surfaces are:

- **`/og`** — on-demand OG image generation (`ImageResponse` from `next/og`).
- **`/mcp`** — the MCP server over Streamable HTTP (JSON-RPC via POST).

These run as Vercel Functions; everything else is served as static assets/CDN.

## Security headers / CSP

Set in `next.config.ts` via `async headers()` and applied to all routes:

- **Content-Security-Policy** (static-first; `'unsafe-inline'` for Next's
  hydration bootstrap, inline JSON-LD, and Tailwind's injected styles; Plausible
  allowed in `script-src`/`connect-src`). Upgrade path: nonce via middleware.
- **Strict-Transport-Security** (2y, `includeSubDomains; preload`)
- **X-Content-Type-Options**, **X-Frame-Options**, **Referrer-Policy**,
  **Permissions-Policy**, **X-DNS-Prefetch-Control**
- **CORS** (`Access-Control-Allow-Origin: *`) scoped to the public machine
  surfaces only: `/mcp`, `/r/*`, `/llms.txt`, `/llms-full.txt`.

## Analytics

Privacy-first via **Plausible**, env-gated by `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`.
When set, the Plausible script (already allow-listed in the CSP) loads; when
empty/unset, no analytics load at all. No cookies, no PII. See spec
`17-analytics.md`.
