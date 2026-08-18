import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Roadmap",
  description:
    "Where Qeetrix is headed — near-term Figma integration and accessibility to longer-horizon multi-framework support. AI moonshots are exploratory R&D, not commitments (ADR-0006).",
};

const PHASES: { id: string; horizon: string; title: string; items: string[] }[] = [
  {
    id: "A",
    horizon: "~3 months",
    title: "Foundations & accessibility",
    items: [
      "Figma integration (P0) — connect design and code.",
      "Raise the a11y test-coverage ratchet toward the 80% target.",
      "Establish ADR practice as the default for significant decisions.",
    ],
  },
  {
    id: "B",
    horizon: "~3–6 months",
    title: "Tokens & agent-readable docs",
    items: [
      "Design-token round-trip between Figma and the DTCG sources.",
      "AI-agent documentation surfaces — llms.txt and an MCP endpoint.",
      "Evaluate and expand visual regression testing (VRT).",
    ],
  },
  {
    id: "C",
    horizon: "~6–12 months",
    title: "Theming & migration tooling",
    items: [
      "Multi-brand theming — re-brand by re-pointing tokens.",
      "Codemods to automate breaking-change migrations.",
    ],
  },
  {
    id: "D",
    horizon: "12 months+",
    title: "Exploration (R&D)",
    items: [
      "AI moonshots — research only, not committed features.",
      "Multi-framework support — evaluation only; Qeetrix stays React-only.",
    ],
  },
];

export default function RoadmapPage() {
  return (
    <PageShell
      title="Roadmap"
      crumbs={[{ title: "Roadmap" }]}
      lead="Four phases, near-term to exploratory. Horizons are directional, not delivery dates — priorities shift as the system and its consumers evolve."
    >
      <div className="space-y-6">
        {PHASES.map((phase) => (
          <section key={phase.id} className="rounded-xl border border-border bg-card p-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-lg bg-muted font-display text-lg font-semibold text-brand-text">
                {phase.id}
              </span>
              <div>
                <h2 className="font-display text-xl font-semibold">
                  Phase {phase.id} — {phase.title}
                </h2>
                <p className="text-sm text-muted-foreground">{phase.horizon}</p>
              </div>
            </div>
            <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
              {phase.items.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-border bg-muted p-5 text-sm">
        <p className="font-medium text-foreground">Phase D is exploratory, not committed</p>
        <p className="mt-1 text-muted-foreground">
          The AI &ldquo;moonshots&rdquo; and multi-framework work in Phase D are{" "}
          <strong>research and evaluation only</strong>. Per{" "}
          <Link href="/governance" className="text-brand-text underline-offset-4 hover:underline">
            ADR-0006
          </Link>
          , Qeetrix is deliberately <strong>React-only</strong> and AI features are treated as
          R&amp;D — nothing in Phase D is a promised deliverable, and pursuing it never weakens the
          core React library.
        </p>
      </div>
    </PageShell>
  );
}
