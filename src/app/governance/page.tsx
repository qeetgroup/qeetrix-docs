import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/code-block";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Governance",
  description:
    "How Qeetrix is owned and evolved — CODEOWNERS and a core team, a design-system SemVer policy, merge-blocking quality gates, the ADR index, the Changesets release flow, deprecation policy, and license.",
};

const GATES: { gate: string; checks: string; blocking: string }[] = [
  {
    gate: "Lint (incl. no-raw-color)",
    checks:
      "ESLint across the monorepo; the no-raw-color rule forbids hard-coded colours — tokens only.",
    blocking: "Yes",
  },
  {
    gate: "Typecheck",
    checks: "tsc --noEmit with verbatimModuleSyntax on; every package and app must type-check.",
    blocking: "Yes",
  },
  {
    gate: "Build",
    checks:
      "turbo run build — @qeetrix/ui compiles (tokens regenerated first) and every app builds.",
    blocking: "Yes",
  },
  {
    gate: "Vitest + axe",
    checks: "Unit tests plus vitest-axe assertions on rendered components.",
    blocking: "Yes",
  },
  {
    gate: "a11y coverage gate",
    checks: "Ratio of components carrying an axe test, ratcheting up toward an 80% target.",
    blocking: "Yes",
  },
  {
    gate: "WCAG-AA token contrast gate",
    checks: "tokens:validate re-checks every generated semantic colour pair for AA contrast.",
    blocking: "Yes",
  },
  {
    gate: "VRT (Playwright)",
    checks: "Visual regression snapshots catch unintended pixel-level changes.",
    blocking: "Yes",
  },
  {
    gate: "build-storybook",
    checks: "The Storybook workshop must build cleanly so every story stays renderable.",
    blocking: "Yes",
  },
];

const ADRS: { id: string; title: string; summary: string }[] = [
  { id: "0000", title: "Template", summary: "The record format every subsequent ADR follows." },
  {
    id: "0001",
    title: "Single-package strategy",
    summary: "Everything ships in one package, @qeetrix/ui — no split token/brand packages.",
  },
  {
    id: "0002",
    title: "Base UI, not Radix",
    summary: "Headless primitives come from Base UI; Radix is not used.",
  },
  {
    id: "0003",
    title: "Token pipeline",
    summary: "DTCG JSON compiled through Style Dictionary into OKLCH --qx-* variables.",
  },
  {
    id: "0004",
    title: "Brand colour OD-DS-03",
    summary: "Qeet orange #F26D0E is the canonical brand token; re-brand by re-pointing it.",
  },
  {
    id: "0005",
    title: "Changesets release",
    summary: "Versioning and publishing are driven by Changesets, not manual bumps.",
  },
  {
    id: "0006",
    title: "AI is R&D; Qeetrix stays React-only",
    summary:
      "AI moonshots and multi-framework support are exploratory only — React is the sole supported target.",
  },
];

export default function GovernancePage() {
  return (
    <PageShell
      title="Governance"
      crumbs={[{ title: "Governance" }]}
      lead="How Qeetrix is owned, versioned, and changed — the rules that keep one design system coherent across every Qeet product."
    >
      <div className="space-y-10">
        <section>
          <h2 className="font-display text-xl font-semibold">Ownership</h2>
          <p className="mt-2 text-muted-foreground">
            Qeetrix is stewarded by a small <strong>design-system core team</strong> that owns the
            public API, the token pipeline, and the release cadence. Day-to-day review is enforced
            by a <code className="font-mono text-sm">CODEOWNERS</code> file: changes to{" "}
            <code className="font-mono text-sm">packages/ui/</code>, the token sources, and the
            shared configs require review from a core-team owner before they can merge.
          </p>
          <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
            <li>
              • <strong>Core team</strong> — owns the roadmap, ADRs, and semantic-versioning
              decisions.
            </li>
            <li>
              • <strong>CODEOWNERS</strong> — auto-requests the right reviewers per path; approval
              is mandatory.
            </li>
            <li>
              • <strong>Contributors</strong> — anyone across the Qeet Group; contributions follow
              the{" "}
              <Link
                href="/contributing"
                className="text-brand-text underline-offset-4 hover:underline"
              >
                contributing guide
              </Link>{" "}
              and pass every gate below.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Versioning policy (SemVer)</h2>
          <p className="mt-2 text-muted-foreground">
            Qeetrix follows Semantic Versioning, but a design system breaks in ways a normal library
            does not. A change is <strong>breaking (major)</strong> if it can alter a
            consumer&rsquo;s rendered output or contract — not only if it changes a type signature.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-4">
              <p className="text-sm font-semibold text-destructive">Major — breaking</p>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li>• Removing/renaming a component or prop.</li>
                <li>• Changing a prop&rsquo;s default or type.</li>
                <li>• Renaming or removing a design token.</li>
                <li>• A visual change that shifts layout or intent.</li>
                <li>• Reducing an accessibility guarantee (roles, focus, contrast).</li>
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <p className="text-sm font-semibold text-brand">Minor — additive</p>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li>• New component, block, or token.</li>
                <li>• New optional prop with a safe default.</li>
                <li>• A new deprecation warning (removal comes later).</li>
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <p className="text-sm font-semibold text-foreground">Patch — fixes</p>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li>• Bug fixes with no API change.</li>
                <li>• Non-visual internal refactors.</li>
                <li>• Docs and type-only corrections.</li>
              </ul>
            </div>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Qeetrix is currently <strong>pre-1.0</strong> (v0.4.0), so the surface is still
            stabilising. Once 1.0 ships, every breaking change ships with a codemod and a migration
            guide — see{" "}
            <Link href="/migrate" className="text-brand-text underline-offset-4 hover:underline">
              Migrate
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Quality gates</h2>
          <p className="mt-2 text-muted-foreground">
            Every pull request runs the same gates in CI. All of them are{" "}
            <strong>merge-blocking</strong> — a change ships only when the whole suite is green.
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-border">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-2 font-semibold text-foreground">Gate</th>
                  <th className="px-4 py-2 font-semibold text-foreground">What it checks</th>
                  <th className="px-4 py-2 font-semibold text-foreground">Blocking</th>
                </tr>
              </thead>
              <tbody>
                {GATES.map((g) => (
                  <tr key={g.gate} className="border-t border-border align-top">
                    <td className="px-4 py-2 font-medium text-foreground">{g.gate}</td>
                    <td className="px-4 py-2 text-muted-foreground">{g.checks}</td>
                    <td className="px-4 py-2 text-muted-foreground">{g.blocking}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Architecture Decision Records</h2>
          <p className="mt-2 text-muted-foreground">
            Significant, hard-to-reverse decisions are captured as ADRs so the rationale outlives
            the thread it was decided in. The current index:
          </p>
          <div className="mt-4 space-y-2">
            {ADRS.map((a) => (
              <div key={a.id} className="rounded-xl border border-border bg-card p-4">
                <p className="text-sm font-semibold text-foreground">
                  <code className="font-mono text-sm text-brand-text">ADR-{a.id}</code> — {a.title}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{a.summary}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            New ADRs are proposed via the{" "}
            <Link href="/rfcs" className="text-brand-text underline-offset-4 hover:underline">
              RFC process
            </Link>
            ; adopting ADR practice more widely is a Phase A roadmap item.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Release flow (Changesets)</h2>
          <p className="mt-2 text-muted-foreground">
            Releases are driven by <strong>Changesets</strong> (ADR-0005), never by hand-editing
            versions. Each change that affects consumers carries a changeset declaring its bump
            level; the tooling aggregates them into a version PR and the published changelog.
          </p>
          <CodeBlock
            title="release flow"
            code={`# 1. record intent alongside your change
bun run changeset          # pick bump level, write a summary

# 2. tooling opens a "Version Packages" PR
#    (versions bumped + changelog assembled from changesets)

# 3. merge that PR to publish
bun run release            # publishes changed public packages`}
          />
          <p className="mt-2 text-sm text-muted-foreground">
            The generated changelog surfaces on{" "}
            <Link href="/changelog" className="text-brand-text underline-offset-4 hover:underline">
              Changelog
            </Link>{" "}
            and{" "}
            <Link href="/releases" className="text-brand-text underline-offset-4 hover:underline">
              Releases
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Deprecation policy</h2>
          <p className="mt-2 text-muted-foreground">
            Nothing is removed without warning. When an API is slated for removal it first emits a
            dev-mode console warning for several minor releases, giving consumers time to migrate.
          </p>
          <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
            <li>
              • A deprecation ships as a <strong>minor</strong> with a dev-only console warning.
            </li>
            <li>
              • The warning stays for <strong>N minor releases</strong> before the item can be
              removed.
            </li>
            <li>
              • Removal happens in a <strong>major</strong>, and every breaking major ships a
              required codemod plus a migration guide.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">License</h2>
          <p className="mt-2 text-muted-foreground">
            Qeetrix is currently <strong>UNLICENSED</strong> — a Qeet-internal design system
            consumed across the product suite. A public open-source release is under consideration
            but not yet committed.
          </p>
        </section>
      </div>
    </PageShell>
  );
}
