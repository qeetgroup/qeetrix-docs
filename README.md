# qeetrix-docs

[ui.qeet.in](https://ui.qeet.in): the Qeetrix docs, on Qeet's own docs platform. It replaced the
Next.js and Fumadocs site that lived here; its old `/docs/…` addresses redirect to the new pages
(`vercel.json`).

- **Astro 7, static pages.** A reading page ships no React. Interactive parts (live examples,
  the home page's demos) are React islands that load only where they're used. The site's chrome (the
  header, its menu, the docs navigation, the theme menu, Copy page) is Qeetrix rendered to HTML plus
  a few lines of script.
- **Built from Qeetrix itself:** `@qeetrix/react`, `@qeetrix/tokens` and `@qeetrix/icons`, styled
  with tokens in plain CSS. No Fumadocs, no Tailwind.
- **A platform other Qeet products can reuse.** The product-agnostic parts live in `src/platform/`;
  the Qeetrix-only parts live in `src/qeetrix/`.

## Develop

```bash
bun install           # Bun 1.3.14, as CI: npx -y bun@1.3.14 install
bun run dev           # http://localhost:3007
bun run build         # static site in dist/
bun run lint          # Biome
bun run types:check   # Astro's content types, then tsc
bun run components    # rewrite the component registry and route (scripts/components.ts)
```

CI runs lint, the type check and the build on every pull request and on `main`
(`.github/workflows/ci.yml`). A merge to `main` deploys ui.qeet.in through Vercel and tags the
version (`release.yml`; `version.yml` bumps it on the pull request, `rollback.yml` redeploys a
tag).

## Layout

```text
src/
├── content.config.ts      the docs collection, checked against the page schema
├── content/docs/          MDX pages, for later; the path is the URL ([...slug].astro renders them)
├── pages/                 routes: index.astro, get-started/*, foundations/*, components/*,
│                          icons/*, patterns/*, guides/*, resources/*; frames/[frame].astro (a
│                          console example on a bare page, for an iframe); llms.txt, llms-full.txt
│                          and search-index.json, written from the component docs
├── platform/              the product-agnostic platform
│   ├── chrome/            SiteHeader (its <dialog> menu and search), search.ts (the search, over
│                          the product's /search-index.json), SiteFooter, ThemeMenu (chrome.css)
│   ├── components/        Code (build-time highlighting), Logo (third-party marks),
│   │                      StaticMenu + menu.ts (Qeetrix menus without React)
│   ├── docs/              the docs frame: DocsLayout, DocsSidebar (Qeetrix's Sidebar, folders and
│   │                      filter), Masthead, CopyPage, Toc (the zigzag contents), CodeFrame,
│   │                      NextPage (docs.css)
│   ├── content/schema.ts  page metadata: title, description, status, since, aka
│   ├── layouts/           Document.astro: metadata, colour scheme before paint, styles, skip link
│   ├── motion/            Reveal.astro: blocks that rise in once, for landing pages
│   ├── styles/            layers.css (cascade order, tokens, Qeetrix components), document.css
│   ├── site.ts            SiteChrome and DocsChrome: what a product gives the header, footer and docs
│   └── theme.ts           the pre-paint colour-scheme script
└── qeetrix/               the Qeetrix docs on the platform
    ├── site.ts            every link, the navigation and the footer
    ├── packages.ts        package names and versions, read from what's installed
    ├── counts.ts          component, icon and token counts, counted at build time
    ├── install.ts         the install command and setup the pages show
    ├── components/        the component pages: one folder per component (doc.tsx, examples.tsx,
    │                      Playground.tsx, Live.tsx), the template (ComponentPage.astro, Example,
    │                      tab-pages/, PlaygroundKit, anatomy.ts, component.css), the registry
    │                      (generated), and the console frames (console.tsx, frames.tsx, FrameOf,
    │                      frame-fit.ts) and patterns (patterns.tsx)
    ├── foundations/       Colour, Typography, Spacing, Elevation and Motion, from Storybook's
    ├── icons/             the Icons pages: Iconography, the browser, Brand
    ├── guides.ts          the server-safe components the guides list
    ├── migration.ts       today's @qeetrix/ui pages and what replaces each
    ├── llms.ts            the docs as Markdown, for /llms.txt and /llms-full.txt
    ├── docs/              the docs navigation (chrome.ts), the components list, DocsPage,
    │                      PatternPage, and
    │                      the pages' own blocks: Signatures, PackageManager, FirstScreen,
    │                      Troubleshooting, and ComponentSpecimens (a live preview of every
    │                      component, for the cards) with LayoutSpecimens (docs.css)
    └── home/              the home page's islands (HeroStory, Showcase, ThemeEngine,
                           InstallCommand), its cards and its styles
```

## Rules

- **Tokens only.** Every colour, size, radius, shadow and duration is a `var(--qx-*)`.
- **Cascade layers, not `!important`.** The order is `qx.base, qx.components, platform, product`.
  Every stylesheet restates it on its first line: Astro bundles CSS in import order, and the first
  file to name a layer fixes its place.
- **Server first.** A Qeetrix component renders to HTML at build time. Make it an island
  (`client:visible`) only when it must respond in the browser.
- **The colour scheme belongs to `<html>`.** The pre-paint script sets `data-qx-color-scheme` (and
  the reader's choice, `data-scheme-choice`). Islands use `QeetrixProvider` for locale and direction
  only, never `colorScheme`. The theme is chosen at the foot of a page, never in the header.
- **Every page has a title and a description.** The schema fails the build otherwise.

## A component's page

Each component is a folder in `src/qeetrix/components/`: `doc.tsx` (its facts, usage, API,
accessibility and changelog, as a `ComponentDoc`), `examples.tsx` (the real component with the code
for each example), `Playground.tsx` (a spec for `PlaygroundKit`) and `Live.tsx` (when its examples
need React). Add a row to `scripts/components.ts` and run `bun run components`: the five tabs, the
category page, the search index and `llms-full.txt` follow. Every claim about an element (`<button>`,
`role="tab"`) is checked against the rendered DOM.

## Status

Every page in the navigation is built: the home page; Get started (Introduction, Installation,
Frameworks with Next.js, TanStack Start and Vite, AI tools, Migration); Foundations; all 68
components, five tabs each; Icons; Patterns; Guides; Resources; and the docs search. Known
follow-ups:
- The docs pages' "Updated" dates are written in each page for now.
- `.astro` files aren't type-checked yet: `astro check` needs a TypeScript 6 alias, because
  TypeScript 7 has no JavaScript API.
- Gaps in `@qeetrix/react` 0.2.2 are worked around in the pages and filed in Jira (QTRX): each
  workaround names its ticket in a comment.
