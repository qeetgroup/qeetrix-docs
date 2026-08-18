# qeetrix-docs — ui.qeet.in

The **Qeetrix design system documentation & developer platform** (`https://ui.qeet.in`). It dogfoods
`@qeetrix/ui` for 100% of its own UI and is the public home for components, tokens, playground, theme
studio, CLI/MCP/registry, and more.

- **Stack:** Next.js 16 (App Router, React 19, React Compiler) · Tailwind v4 · `@qeetrix/ui` · Bun.
- **Full spec:** `qeet-files/qeetrix/ui-qeet-in/` (18-section platform specification).

## Develop

This app is part of the Qeetrix **Bun + Turborepo** monorepo. From the repo root (`cd qeetrix`):

```bash
bun install                       # once, at the repo root
bun run --filter @qeetrix/ui build  # build the design system (docs consume its dist)
bun run docs:dev                  # start ui.qeet.in on http://localhost:3006
```

Or from this directory: `bun run dev` (regenerates data, then `next dev -p 3006`).

Other scripts: `bun run docs:build` (production build), `bun run docs:lint`, `bun run docs:typecheck`.

## How it works

- **Dev port:** `3006`.
- **Styling:** `src/app/globals.css` imports Tailwind v4 then `@qeetrix/ui/styles.css` (Cal Sans +
  Fira Code fonts, OKLCH tokens), re-tones the brand layer, and re-exposes the token vocabulary as
  utilities via `@theme inline`. Dark mode is the `.dark` class (managed by `ThemeProvider`).
- **Content pipeline (spec §D2 — "one source, many surfaces"):** `scripts/generate-data.mjs` reads the
  `@qeetrix/ui` `component-manifest.json` + `tokens.json` and writes `src/lib/generated/{components,tokens}.json`
  (gitignored) — consumed by `/components` and `/tokens`. It runs automatically before `dev`/`build`.
- **Routes:** the App Router tree under `src/app` mirrors the spec IA (`/docs`, `/components/[slug]`,
  `/blocks`, `/tokens`, `/icons`, `/play`, `/theme`, `/learn`, `/develop/*`, `/accessibility`, `/brand`,
  `/changelog`, `/releases`, `/migrate`, `/roadmap`, `/rfcs`, `/governance`, …). Data-backed pages
  (`/components`, `/tokens`) render real `@qeetrix/ui` data; the rest carry correct metadata + breadcrumbs
  and an honesty-ladder "In development" notice until their rich content lands.

## Conventions

- **Bun only** (no npm/pnpm/yarn). **Base UI**, not Radix. Variants via `cva`; classes via `cn()` /
  `buttonVariants`. Design tokens only — the shared `no-raw-color` ESLint rule forbids hard-coded colours.
- Build the full experience against the [platform spec](../../../qeet-files/qeetrix/ui-qeet-in/README.md).
