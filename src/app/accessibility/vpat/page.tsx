import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "VPAT",
  description:
    "Voluntary Product Accessibility Template — a high-level summary of Qeetrix conformance across the WCAG 2.2 principles.",
};

const ROWS: [string, string, string][] = [
  [
    "1. Perceivable",
    "Supports",
    "Text alternatives, contrast-gated tokens (AA), semantic structure, and reduced-motion support.",
  ],
  [
    "2. Operable",
    "Supports",
    "Full keyboard operation via Base UI primitives, visible focus (token ring), no keyboard traps.",
  ],
  [
    "3. Understandable",
    "Supports",
    "Consistent Field labelling/error contract, predictable behaviour, consistent navigation.",
  ],
  [
    "4. Robust",
    "Supports",
    "Correct ARIA roles/states from Base UI; parses cleanly; works with assistive tech.",
  ],
];

export default function VpatPage() {
  return (
    <PageShell
      title="VPAT"
      crumbs={[{ title: "Accessibility", href: "/accessibility" }, { title: "VPAT" }]}
      lead="A high-level Voluntary Product Accessibility Template for Qeetrix against WCAG 2.2. The full VPAT is maintained in the repository."
    >
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-card text-left text-xs text-muted-foreground">
              <th className="px-3 py-2 font-medium">WCAG 2.2 principle</th>
              <th className="px-3 py-2 font-medium">Conformance</th>
              <th className="px-3 py-2 font-medium">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map(([p, level, remarks]) => (
              <tr key={p} className="border-b border-border last:border-0 align-top">
                <td className="px-3 py-2 font-medium">{p}</td>
                <td className="px-3 py-2 text-brand-text">{level}</td>
                <td className="px-3 py-2 text-muted-foreground">{remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        This summary reflects the target conformance; per-criterion detail and testing notes live in
        the repository at <code className="font-mono">docs/accessibility/VPAT.md</code>. Coverage of
        automated checks is tracked on the{" "}
        <a
          href="/accessibility/scorecard"
          className="text-brand-text underline-offset-4 hover:underline"
        >
          scorecard
        </a>
        .
      </p>
    </PageShell>
  );
}
