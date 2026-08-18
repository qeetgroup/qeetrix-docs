<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices. (Notably: route `params`/`searchParams` are async Promises; Cache Components / PPR and `unstable_instant` are available.)
<!-- END:nextjs-agent-rules -->

# qeetrix-docs (ui.qeet.in)

- **Package manager: Bun only.** Part of the Qeetrix Bun workspaces monorepo; there is no Turborepo configuration. Never introduce npm/pnpm/yarn.
- **Dogfood `@qeetrix/ui`.** Build the site's own UI from `@qeetrix/ui` components/tokens — no shadow component library. Base UI (not Radix); variants via `cva`; classes via `cn()` / `buttonVariants` (Button uses Base UI's `render` prop, not `asChild`).
- **Design tokens only.** Do not introduce hard-coded design colours. Use semantic utilities (`bg-background`, `text-muted-foreground`, `text-brand`, …) and `--qx-*` vars. The repository does not yet have the previously claimed `no-raw-color` lint rule, so code review must enforce this until the audit roadmap adds a real gate.
- **Generated data.** `src/lib/generated/` is produced by `scripts/generate-data.mjs` from `@qeetrix/ui` and is gitignored — never hand-edit it.
- **Source is ground truth.** Current executable facts come from `packages/qeetrix-ui` and `docs/architecture/qeetrix-system.md`. The sibling `qeetrix-files/ui-qeet-in/` specification is an older target-state corpus and must not override current versions, commands, counts, or implemented status.
- Run: `bun run dev` (port 3006) · `bun run build` · `bun run lint` · `bun run typecheck`.
