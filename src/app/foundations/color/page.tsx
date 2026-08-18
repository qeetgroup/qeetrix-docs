import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { tokensFor } from "@/lib/tokens";

export const metadata: Metadata = {
  title: "Color",
  description:
    "Qeetrix colour ramps — neutral, brand, and semantic — authored in OKLCH and contrast-gated to WCAG-AA.",
};

export default function ColorFoundationPage() {
  const colors = tokensFor("color");
  const groups = new Map<string, typeof colors>();
  for (const c of colors) {
    const ramp = c.name.split(".")[0];
    if (!groups.has(ramp)) groups.set(ramp, []);
    groups.get(ramp)?.push(c);
  }

  return (
    <PageShell
      title="Color"
      crumbs={[{ title: "Foundations", href: "/foundations" }, { title: "Color" }]}
      lead="Colour is authored in OKLCH and split into neutral, brand, and semantic ramps. Every semantic text/surface pair is held to WCAG-AA by a build gate. Brand orange #F26D0E (OD-DS-03) is for fills, large text, and UI accents; use the darker brand-text shade for links and small text."
    >
      <div className="space-y-8">
        {[...groups.entries()].map(([ramp, entries]) => (
          <section key={ramp}>
            <h2 className="mb-2 font-display text-lg font-semibold capitalize">
              {ramp.replace(/-/g, " ")}
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {entries.map((c) => (
                <div key={c.path} className="w-16" title={`${c.varName}\n${c.light}`}>
                  <span
                    className="block h-12 w-full rounded-md border border-border"
                    style={{ background: c.light }}
                  />
                  <span className="mt-1 block truncate font-mono text-[0.65rem] text-muted-foreground">
                    {c.name.split(".").slice(1).join(".") || c.name}
                  </span>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
      <section className="mt-8 rounded-lg border border-border bg-card p-5">
        <h2 className="font-display text-lg font-semibold">Data visualization roles</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Use <code className="font-mono">--chart-1</code> through{" "}
          <code className="font-mono">--chart-8</code> for categorical identity. Axis, grid,
          reference, positive, negative, and warning roles are separate so chart structure and
          meaning do not consume series colours. Every categorical role is validated at a minimum
          3:1 against the default surface in both themes; charts still need labels, summaries, and
          non-colour encoding where meaning depends on a series.
        </p>
      </section>
      <p className="mt-8 text-sm text-muted-foreground">
        Copy any value from the{" "}
        <Link href="/tokens/color" className="text-brand-text underline-offset-4 hover:underline">
          colour token reference
        </Link>
        .
      </p>
    </PageShell>
  );
}
