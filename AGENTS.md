# AGENTS.md — qeetrix-docs

**ui.qeet.in**, the Qeetrix docs: Astro 7 (static pages), React islands only where a page needs
them, and Qeetrix itself (`@qeetrix/react`, `@qeetrix/tokens`, `@qeetrix/icons`). No Next.js, no
Fumadocs, no Tailwind. [README.md](README.md) has the commands and the full layout.

## Commands

```bash
npx -y bun@1.3.14 install   # CI's Bun: a newer one rewrites the lockfile CI can't read
bun run dev                 # http://localhost:3007
bun run build               # dist/
bun run lint                # Biome
bun run types:check         # astro sync, then tsc
bun run components          # after adding a component: the registry and the route
```

## Where things live

- `src/platform/` — the product-agnostic docs platform (chrome, docs frame, layouts, styles), meant
  to serve other Qeet products' docs too.
- `src/qeetrix/` — the Qeetrix docs: one folder per component (`doc.tsx`, `examples.tsx`,
  `Playground.tsx` or `Live.tsx`), foundations, icons, guides' data.
- `src/pages/` — the routes.

## Branches

Work on a branch from `develop` and open its pull request into `develop`. Only `develop` goes into `main`, through
a `develop` → `main` pull request the maintainer opens; `main` refuses anything else.

## Rules

1. **UI comes from `@qeetrix/react`;** styles are tokens (`var(--qx-*)`) in plain CSS, in the
   layers `src/platform/styles/layers.css` declares.
2. **Pages render to HTML;** React runs only in islands (`client:*`). The chrome runs no React, except
   search: Qeetrix's CommandPalette (`src/platform/chrome/SearchPalette.tsx`), hydrated when the browser is idle.
3. **A Qeetrix gap:** work around it here, say in a comment what the workaround covers, and file the ticket.
   Never write ticket numbers in code, comments or docs: the link lives in the Jira ticket.
4. **Every claim on a page is checked** against the installed packages: props against their types,
   parts against the DOM.
5. **Deploys go from `main`** (`.github/workflows/release.yml`, Vercel). Don't commit or push unless
   asked.
