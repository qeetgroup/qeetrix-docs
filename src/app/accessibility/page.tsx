import { Card, CardDescription, CardHeader, CardTitle } from "@qeetrix/ui";
import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Accessibility",
  description:
    "Qeetrix is accessible by construction — Base UI primitives, a shared Field ARIA contract, contrast-gated tokens, and an a11y merge gate — and it publishes the evidence.",
};

export default function AccessibilityPage() {
  const stats = [
    { value: "WCAG 2.2 AA", label: "target, not a conformance claim" },
    { value: "140", label: "component axe smoke files" },
    { value: "AA", label: "required token pairs passing" },
    { value: "System", label: "forced-colors mapping" },
  ];

  const cards = [
    {
      href: "/accessibility/scorecard",
      title: "Scorecard",
      desc: "Per-component axe + test coverage.",
    },
    {
      href: "/accessibility/statement",
      title: "Statement",
      desc: "Our WCAG 2.2 AA conformance statement.",
    },
    {
      href: "/accessibility/vpat",
      title: "VPAT",
      desc: "Voluntary Product Accessibility Template.",
    },
  ];

  return (
    <PageShell
      title="Accessibility Center"
      crumbs={[{ title: "Accessibility" }]}
      lead="Accessibility is a construction constraint, not an audit afterthought — and we publish the evidence."
    >
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-4">
            <div className="font-display text-2xl font-semibold">{s.value}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      <h2 className="mb-3 font-display text-lg font-semibold">How Qeetrix stays accessible</h2>
      <ul className="mb-8 space-y-2 text-sm text-muted-foreground">
        <li>
          • Interactive primitives prefer <strong>Base UI</strong>; Qeetrix wrappers and custom
          widgets still require their own keyboard, focus, and relationship tests.
        </li>
        <li>
          • A shared <code className="font-mono">Field</code> system provides consistent visual
          anatomy. Automatic description/error association remains planned work.
        </li>
        <li>
          • Required semantic token pairs are <strong>contrast-gated</strong> at build time,
          including placeholder text and all five brand overlays. Rendered component contrast is
          tested separately.
        </li>
        <li>
          • Component <strong>axe smoke assertions</strong> run via{" "}
          <code className="font-mono">vitest-axe</code>. Axe does not prove keyboard, focus, reflow,
          forced-colors, or screen-reader behavior.
        </li>
        <li>
          • Forced-colors mode uses system colors and a token-driven focus outline. Reduced-motion
          and RTL support are component contracts and must be verified where behavior is custom.
        </li>
      </ul>

      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map((c) => (
          <Link key={c.href} href={c.href} className="group">
            <Card className="h-full transition-shadow hover:shadow-hover">
              <CardHeader>
                <CardTitle>{c.title}</CardTitle>
                <CardDescription>{c.desc}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
