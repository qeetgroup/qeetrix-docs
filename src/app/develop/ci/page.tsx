import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/code-block";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "CI recipe",
  description:
    "A copy-paste GitHub Actions workflow for Qeetrix consumers — Bun + Turborepo running lint, typecheck, build, Vitest + axe, an a11y coverage gate, WCAG-AA contrast validation, and Playwright VRT.",
};

const GATES = [
  ["lint / typecheck / build", "bunx turbo run lint typecheck build — cached across the repo."],
  ["no-raw-color", "The shared ESLint rule fails the build on any hard-coded colour."],
  ["Vitest + axe", "Component tests run through vitest-axe so accessibility regressions fail CI."],
  [
    "a11y coverage gate",
    "Every component must have an axe-checked test — coverage below the threshold fails.",
  ],
  [
    "WCAG-AA contrast",
    "bun run tokens:validate re-checks every generated semantic pair for AA contrast.",
  ],
  [
    "Visual regression",
    "Playwright screenshots are diffed against baselines to catch unintended visual drift.",
  ],
];

const WORKFLOW = `name: ci

on:
  push:
    branches: [main]
  pull_request:

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: oven-sh/setup-bun@v2
        with:
          bun-version: latest

      - name: Install
        run: bun install --frozen-lockfile

      # Lint (incl. no-raw-color), typecheck, and build — cached by Turborepo.
      - name: Lint, typecheck, build
        run: bunx turbo run lint typecheck build

      # Unit + accessibility tests (Vitest + axe) with the a11y coverage gate.
      - name: Test
        run: bunx turbo run test

      # WCAG-AA contrast gate on generated semantic token pairs.
      - name: Validate tokens
        run: bun run tokens:validate

      # Playwright visual regression tests.
      - name: Visual regression
        run: |
          bunx playwright install --with-deps chromium
          bunx turbo run test:vrt
`;

export default function CiPage() {
  return (
    <PageShell
      title="CI recipe"
      crumbs={[{ title: "Develop", href: "/develop" }, { title: "CI" }]}
      lead="The same gates Qeetrix runs on itself, ready to drop into any Bun + Turborepo project: lint and typecheck, Vitest + axe, an accessibility coverage gate, WCAG-AA token contrast, and Playwright visual regression."
    >
      <section>
        <h2 className="font-display text-xl font-semibold">What it enforces</h2>
        <div className="mt-3 divide-y divide-border rounded-xl border border-border">
          {GATES.map(([name, desc]) => (
            <div key={name} className="p-3">
              <code className="font-mono text-sm text-brand-text">{name}</code>
              <p className="mt-0.5 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-xl font-semibold">GitHub Actions workflow</h2>
        <p className="mt-2 text-muted-foreground">
          Save this as <code className="font-mono text-sm">.github/workflows/ci.yml</code>. It sets
          up Bun, installs from the frozen lockfile, and runs every gate through Turborepo:
        </p>
        <CodeBlock title=".github/workflows/ci.yml" code={WORKFLOW} />
        <p className="mt-2 text-sm text-muted-foreground">
          Turborepo caches each task by input hash, so unchanged packages are skipped on re-runs.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-xl font-semibold">Related</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The a11y coverage bar is documented on{" "}
          <Link
            href="/accessibility"
            className="text-brand-text underline-offset-4 hover:underline"
          >
            Accessibility
          </Link>
          , and token validation on{" "}
          <Link href="/tokens" className="text-brand-text underline-offset-4 hover:underline">
            Tokens
          </Link>
          .
        </p>
      </section>
    </PageShell>
  );
}
