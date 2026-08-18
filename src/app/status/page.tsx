import { Badge } from "@qeetrix/ui";
import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { getMeta } from "@/lib/component-meta";
import { hasExample } from "@/lib/examples";
import data from "@/lib/generated/components.json";

export const metadata: Metadata = {
  title: "Status",
  description:
    "Component maturity and adoption at a glance — test coverage, stories, variants, and live previews across all 116 Qeetrix components.",
};

export default function StatusPage() {
  const rows = data.components.map((c) => {
    const meta = getMeta(c.slug);
    return {
      ...c,
      variants: meta ? Object.keys(meta.variants).length : 0,
      slots: meta?.dataSlots.length ?? 0,
      preview: hasExample(c.slug),
    };
  });

  const tested = rows.filter((r) => r.tested).length;
  const stories = rows.filter((r) => r.story).length;
  const previews = rows.filter((r) => r.preview).length;
  const withVariants = rows.filter((r) => r.variants > 0).length;
  const pct = (n: number) => Math.round((n / rows.length) * 100);

  const stats = [
    { value: rows.length, label: "components" },
    { value: `${pct(tested)}%`, label: "with axe tests" },
    { value: `${pct(stories)}%`, label: "with stories" },
    { value: previews, label: "live previews here" },
    { value: withVariants, label: "with variants" },
  ];

  const mark = (on: boolean) => (
    <span className={on ? "text-brand" : "text-muted-foreground/40"}>{on ? "✓" : "–"}</span>
  );

  return (
    <PageShell
      title="Status"
      crumbs={[{ title: "Status" }]}
      lead={`Maturity and adoption across all ${rows.length} components, generated from the @qeetrix/ui manifest and source — never hand-maintained.`}
    >
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-5">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-4">
            <div className="font-display text-2xl font-semibold">{s.value}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-card text-left text-xs text-muted-foreground">
              <th className="px-3 py-2 font-medium">Component</th>
              <th className="px-3 py-2 text-center font-medium">Tested</th>
              <th className="px-3 py-2 text-center font-medium">Story</th>
              <th className="px-3 py-2 text-center font-medium">Variants</th>
              <th className="px-3 py-2 text-center font-medium">Slots</th>
              <th className="px-3 py-2 text-center font-medium">Preview</th>
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
                <td className="px-3 py-1.5 text-center text-muted-foreground">
                  {r.variants || "–"}
                </td>
                <td className="px-3 py-1.5 text-center text-muted-foreground">{r.slots || "–"}</td>
                <td className="px-3 py-1.5 text-center">
                  {r.preview ? <Badge className="text-[0.6rem]">live</Badge> : mark(false)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageShell>
  );
}
