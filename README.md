# qeetrix-docs

[ui.qeet.in](https://ui.qeet.in) — the documentation and developer platform for Qeetrix, the
Qeet Group design system. A Next.js app built on [Fumadocs](https://fumadocs.dev), rendering
`@qeetrix/ui` itself.

## Develop

```bash
bun install
bun run dev
```

Open http://localhost:3006. `dev` and `build` first generate the component and token data from the
installed `@qeetrix/ui` (`scripts/generate-components.mjs`, `scripts/generate-tokens.mjs`).

The checks CI runs on every pull request:

```bash
bun run lint         # Biome
bun run types:check  # generated data, Next route types, then tsc
bun run build
```

## Releasing

Every merge to `main` releases. It works like qeetrix-ui and qeetrix-icons, with a Vercel
production deploy where they publish to npm:

1. **Open a PR into `main`** (usually `develop` → `main`). `version.yml` bumps the patch version in
   `package.json` on the PR branch, so the version you ship is in the diff. For a minor or major,
   set the version yourself; the bump leaves a raised version alone.
2. **Merge.** `release.yml` runs lint and the type check, builds the commit, deploys it to Vercel
   production, then pushes the `vX.Y.Z` tag and opens a GitHub Release. The tag comes *after* a
   successful deploy, so every tag is a version that was live; a failed deploy leaves no tag.
   A merge whose version is already tagged deploys nothing.
3. **Roll back** from Actions → Rollback with an earlier tag. It redeploys exactly that tagged
   commit. Vercel's dashboard Instant Rollback is the quicker manual alternative.

Vercel's own Git deploys of `main` are switched off in `vercel.json`, so production changes only
through this pipeline.

Deploying needs, under Settings → Secrets and variables → Actions:

| Kind     | Name                | Where it comes from                                         |
| -------- | ------------------- | ----------------------------------------------------------- |
| Secret   | `VERCEL_TOKEN`      | Vercel → Account Settings → Tokens, scoped to the Qeet Group team |
| Variable | `VERCEL_ORG_ID`     | `vercel link`, then `.vercel/project.json`                  |
| Variable | `VERCEL_PROJECT_ID` | the same file                                               |

Until they are set, a release still runs the checks, then reports that deploying is skipped and
creates no tag.

## Explore

- `content/docs` — the MDX pages. Collections are defined with the
  [Macro API](https://fumadocs.dev/docs/mdx/macro) in `src/lib/source.ts`.
- `src/lib/layout.shared.tsx` — options shared by the home and docs layouts.
- `src/components/home` — the landing page's sections.

| Route                         | Description                         |
| ----------------------------- | ----------------------------------- |
| `src/app/(home)`              | The landing page.                   |
| `src/app/docs`                | The documentation layout and pages. |
| `src/app/api/search/route.ts` | The route handler for search.       |
| `src/app/llms.txt`            | The docs index for LLMs.            |
