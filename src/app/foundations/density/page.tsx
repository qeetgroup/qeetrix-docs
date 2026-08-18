import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/code-block";
import { PageShell } from "@/components/page-shell";
import { tokensFor } from "@/lib/tokens";

export const metadata: Metadata = {
  title: "Density",
  description:
    "Comfortable and compact density tokens — control heights, row heights, cell padding, and field gaps.",
};

const METRIC_LABELS: Record<string, string> = {
  "control-height": "Control height",
  "row-height": "Row height",
  "cell-padding-y": "Cell padding (y)",
  "field-gap": "Field gap",
};

export default function DensityFoundationPage() {
  const density = tokensFor("density");
  const metrics = new Map<
    string,
    { comfortable?: string; compact?: string; varComfortable?: string; varCompact?: string }
  >();
  for (const d of density) {
    const [metric, mode] = d.name.split(".");
    const row = metrics.get(metric) ?? {};
    if (mode === "comfortable") {
      row.comfortable = d.light;
      row.varComfortable = d.varName;
    } else if (mode === "compact") {
      row.compact = d.light;
      row.varCompact = d.varName;
    }
    metrics.set(metric, row);
  }

  return (
    <PageShell
      title="Density"
      crumbs={[{ title: "Foundations", href: "/foundations" }, { title: "Density" }]}
      lead="Density is an opt-in foundation mode. Comfortable and compact retune default control heights, field rhythm, and table rows through generated variables while explicit component sizes remain explicit."
    >
      <div className="space-y-10">
        <section>
          <h2 className="font-display text-xl font-semibold">The two modes</h2>
          <p className="mt-2 text-muted-foreground">
            Comfortable suits general forms and mixed pointer/touch workflows. Compact trades
            whitespace for information density in keyboard-and-pointer operational tools. Without a
            density scope, existing consumers retain their legacy component dimensions.
          </p>
          <div className="mt-4 overflow-hidden rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted text-left text-muted-foreground">
                <tr>
                  <th className="px-4 py-2 font-medium">Metric</th>
                  <th className="px-4 py-2 font-medium">Comfortable</th>
                  <th className="px-4 py-2 font-medium">Compact</th>
                </tr>
              </thead>
              <tbody>
                {[...metrics.entries()].map(([metric, row]) => (
                  <tr key={metric} className="border-t border-border">
                    <td className="px-4 py-2">
                      <span className="text-foreground">{METRIC_LABELS[metric] ?? metric}</span>
                      <span className="mt-0.5 block font-mono text-xs text-muted-foreground">
                        {row.varComfortable?.replace("comfortable", "*")}
                      </span>
                    </td>
                    <td className="px-4 py-2 font-mono text-foreground">{row.comfortable}</td>
                    <td className="px-4 py-2 font-mono text-foreground">{row.compact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Seen side by side</h2>
          <p className="mt-2 text-muted-foreground">
            Row height is the most visible difference — {metrics.get("row-height")?.comfortable} at
            comfortable, {metrics.get("row-height")?.compact} at compact.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {(["comfortable", "compact"] as const).map((mode) => (
              <div key={mode} className="rounded-xl border border-border bg-card p-4">
                <p className="mb-2 font-mono text-xs text-muted-foreground">{mode}</p>
                <div className="space-y-1">
                  {["Anita Rao", "Ben Okafor", "Chen Wei"].map((name) => (
                    <div
                      key={name}
                      className="flex items-center rounded-md bg-muted px-3 text-sm text-foreground"
                      style={{
                        height:
                          mode === "comfortable"
                            ? metrics.get("row-height")?.comfortable
                            : metrics.get("row-height")?.compact,
                      }}
                    >
                      {name}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Where density applies</h2>
          <p className="mt-2 text-muted-foreground">
            Density is consumed by default-sized Button, Input, Select, NativeSelect, Combobox,
            input groups, number fields, navigation controls, Field stacks, Table, SidebarInput, and
            the{" "}
            <Link
              href="/components/data-table"
              className="text-brand-text underline-offset-4 hover:underline"
            >
              DataTable
            </Link>{" "}
            component. Explicit <code className="font-mono text-foreground">xs</code>,{" "}
            <code className="font-mono text-foreground">sm</code>, and{" "}
            <code className="font-mono text-foreground">lg</code> variants do not change with the
            ambient mode. Icon tiles, calendar cells, and content padding are documented exceptions
            rather than density controls.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">How to opt in</h2>
          <p className="mt-2 text-muted-foreground">
            Use <code className="font-mono text-foreground">DensityProvider</code> with the default
            subtree scope for previews, or{" "}
            <code className="font-mono text-foreground">scope=&quot;document&quot;</code>
            once near the application root. DataTable inherits the ambient mode until its
            <code className="font-mono text-foreground">defaultDensity</code>, persisted state, or
            local toggle creates an override.
          </p>
          <CodeBlock
            title="app/providers.tsx"
            code={`"use client";\nimport { DensityProvider } from "@qeetrix/ui";\n\nexport function Providers({ children }: { children: React.ReactNode }) {\n  return (\n    <DensityProvider density="compact" scope="document">\n      {children}\n    </DensityProvider>\n  );\n}`}
          />
          <p className="mt-3 text-sm text-muted-foreground">
            Do not use compact density to bypass touch-target requirements. Primary coarse-pointer
            workflows should remain comfortable or extend hit areas independently of visual size.
          </p>
        </section>
      </div>
    </PageShell>
  );
}
