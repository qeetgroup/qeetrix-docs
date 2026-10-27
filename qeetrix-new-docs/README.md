# qeetrix-new-docs

The new [ui.qeet.in](https://ui.qeet.in): the Qeetrix docs, on Qeet's own docs platform. It is built
here, next to the current Next.js site at the repository root, which keeps running unchanged. Once
every page has moved, this folder replaces the root site.

- **Astro 7, static pages.** A reading page ships no JavaScript. Interactive parts (live examples,
  search, the theme switch) are React islands that load only where they're used.
- **Built from Qeetrix itself:** `@qeetrix/react`, `@qeetrix/tokens` and `@qeetrix/icons`, styled
  with tokens in plain CSS. No Fumadocs, no Tailwind.
- **A platform other Qeet products can reuse.** The product-agnostic parts live in `src/platform/`;
  the Qeetrix-only parts will live in `src/qeetrix/`.

## Develop

```bash
bun install           # Bun 1.3.14, as CI: npx -y bun@1.3.14 install
bun run dev           # http://localhost:3007
bun run build         # static site in dist/
bun run lint          # Biome
bun run types:check   # Astro's content types, then tsc
```

CI runs lint, the type check and the build on every pull request (the `new-docs` job in
`.github/workflows/ci.yml`).

## Layout

```text
src/
├── content.config.ts      the docs collection, checked against the page schema
├── content/docs/          MDX pages; the path is the URL (get-started/introduction.mdx → /get-started/introduction)
├── pages/                 routes: [...slug].astro renders every docs page; index.astro
└── platform/              the product-agnostic platform
    ├── content/schema.ts  page metadata: title, description, status, since, aka
    ├── layouts/           Document.astro: metadata, colour scheme before paint, styles, skip link
    ├── styles/            layers.css (cascade order, tokens, Qeetrix components), document.css
    └── theme.ts           the pre-paint colour-scheme script
```

## Rules

- **Tokens only.** Every colour, size, radius, shadow and duration is a `var(--qx-*)`.
- **Cascade layers, not `!important`.** The order is `qx.base, qx.components, platform, product`.
- **Server first.** A Qeetrix component renders to HTML at build time. Make it an island
  (`client:visible`) only when it must respond in the browser.
- **The colour scheme belongs to `<html>`.** The pre-paint script sets `data-qx-color-scheme`.
  Islands use `QeetrixProvider` for locale and direction only, never `colorScheme`.
- **Every page has a title and a description.** The schema fails the build otherwise.

## Status

Scaffolding. The page design (header, sidebar, component pages) is being decided in mock-ups and
lands here once it's approved. Known follow-ups:
- `.astro` files aren't type-checked yet: `astro check` needs a TypeScript 6 alias, because
  TypeScript 7 has no JavaScript API.
- Qeet Sans loads as its full 290 kB file until `@qeetrix/tokens` ships subsets (QTRX-10).
