import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Glossary",
  description:
    "Qeetrix terminology — token, slot, primitive, block, bridge variable, DTCG, OKLCH, brand overlay, and catalog.",
};

const TERMS = [
  {
    term: "Token",
    def: (
      <>
        A named design value (a colour, radius, spacing step, duration). Qeetrix tokens are authored
        as DTCG JSON and compiled to <code className="font-mono text-sm">--qx-*</code> CSS
        variables, so a value is defined once and reused everywhere.
      </>
    ),
  },
  {
    term: "Slot",
    def: (
      <>
        A named internal part of a component, marked with a{" "}
        <code className="font-mono text-sm">data-slot</code> attribute (e.g.{" "}
        <code className="font-mono text-sm">data-slot="dialog-overlay"</code>). Slots give you
        stable hooks for styling and testing that survive class-name changes.
      </>
    ),
  },
  {
    term: "Primitive",
    def: (
      <>
        A low-level, unstyled behaviour component from Base UI (menus, popovers, sliders) that
        handles interaction, focus, and ARIA. Qeetrix components wrap primitives and add styling and
        tokens.
      </>
    ),
  },
  {
    term: "Component",
    def: (
      <>
        A styled, tokenised React building block in{" "}
        <code className="font-mono text-sm">@qeetrix/ui</code> — Button, Card, Input, and 113 more.
        Components are the everyday unit you compose screens from.
      </>
    ),
  },
  {
    term: "Block",
    def: (
      <>
        A multi-component pattern assembled from components — auth, dashboard shell, onboarding
        wizard, page state, pricing table, settings layout. Blocks are opinionated starting points
        exported from <code className="font-mono text-sm">@qeetrix/ui/blocks</code>.
      </>
    ),
  },
  {
    term: "Bridge variable",
    def: (
      <>
        An unprefixed, shadcn-style CSS variable (
        <code className="font-mono text-sm">--primary</code>,{" "}
        <code className="font-mono text-sm">--ring</code>,{" "}
        <code className="font-mono text-sm">--radius</code>) that components actually consume. Each
        bridge variable resolves to an underlying <code className="font-mono text-sm">--qx-*</code>{" "}
        token, giving you a clean layer to override.
      </>
    ),
  },
  {
    term: "DTCG",
    def: (
      <>
        The Design Tokens Community Group JSON format — the interoperable spec Qeetrix authors its
        tokens in before Style Dictionary compiles them to CSS and JSON outputs.
      </>
    ),
  },
  {
    term: "OKLCH",
    def: (
      <>
        A perceptually uniform colour space (lightness, chroma, hue). Qeetrix expresses colour
        tokens in OKLCH so ramps stay even and contrast is predictable — the basis of the WCAG-AA
        gate.
      </>
    ),
  },
  {
    term: "Catalog",
    def: (
      <>
        Two meanings in Qeetrix: the browsable index of all{" "}
        <Link href="/components" className="text-brand-text underline-offset-4 hover:underline">
          components
        </Link>{" "}
        on this site, and — in the monorepo — the Bun{" "}
        <code className="font-mono text-sm">workspaces.catalog</code> that pins shared dependency
        versions (React, Tailwind, TypeScript).
      </>
    ),
  },
];

export default function GlossaryPage() {
  return (
    <PageShell
      title="Glossary"
      crumbs={[{ title: "Docs", href: "/docs" }, { title: "Glossary" }]}
      lead="The vocabulary that runs through the Qeetrix docs, defined once."
    >
      <dl className="space-y-6">
        {TERMS.map((t) => (
          <div key={t.term} className="border-b border-border pb-6 last:border-0 last:pb-0">
            <dt className="font-display text-lg font-semibold text-foreground">{t.term}</dt>
            <dd className="mt-1 text-muted-foreground">{t.def}</dd>
          </div>
        ))}
      </dl>
    </PageShell>
  );
}
