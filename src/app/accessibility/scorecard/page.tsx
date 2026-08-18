import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import data from "@/lib/generated/components.json";

export const metadata: Metadata = {
  title: "Accessibility scorecard",
  description:
    "Per-component accessibility status across all 116 Qeetrix components — axe test coverage and stories, generated from the source.",
};

export default function ScorecardPage() {
  const rows = [...data.components].sort(
    (a, b) => Number(b.tested) - Number(a.tested) || a.name.localeCompare(b.name),
  );
  const tested = rows.filter((r) => r.tested).length;
  const pct = Math.round((tested / rows.length) * 100);
  const mark = (on: boolean) => (
    <span className={on ? "text-brand" : "text-muted-foreground/40"}>{on ? "✓" : "–"}</span>
  );

  return (
    <PageShell
      title="Accessibility scorecard"
      crumbs={[{ title: "Accessibility", href: "/accessibility" }, { title: "Scorecard" }]}
      lead={`${tested} of ${rows.length} components (${pct}%) carry automated axe assertions today, climbing toward an 80% coverage gate. Every component is keyboard-operable via its Base UI primitive.`}
    >
      <div className="mb-6">
        <div className="mb-1 flex justify-between text-xs text-muted-foreground">
          <span>axe test coverage</span>
          <span>{pct}% · target 80%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-brand" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-card text-left text-xs text-muted-foreground">
              <th className="px-3 py-2 font-medium">Component</th>
              <th className="px-3 py-2 text-center font-medium">axe test</th>
              <th className="px-3 py-2 text-center font-medium">Story</th>
              <th className="px-3 py-2 text-center font-medium">Keyboard</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.slug} className="border-b border-border last:border-0">
                <td className="px-3 py-1.5">
                  <Link href={`/components/${r.slug}`} className="hover:text-brand-text">
                    {r.name}
                  </Link>
                </td>
                <td className="px-3 py-1.5 text-center">{mark(r.tested)}</td>
                <td className="px-3 py-1.5 text-center">{mark(r.story)}</td>
                <td className="px-3 py-1.5 text-center text-brand">✓</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageShell>
  );
}
