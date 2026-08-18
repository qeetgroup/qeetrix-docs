import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Grid",
  description:
    "The responsive grid approach — Tailwind grid utilities, common column counts, and gaps from the spacing scale.",
};

export default function GridFoundationPage() {
  return (
    <PageShell
      title="Grid"
      crumbs={[{ title: "Foundations", href: "/foundations" }, { title: "Grid" }]}
      lead="Qeetrix has no fixed 12-column framework. Grids are built from Tailwind grid utilities, driven mobile-first, with gaps drawn from the spacing scale. Start at one column and add columns as breakpoints allow."
    >
      <div className="space-y-10">
        <section>
          <h2 className="font-display text-xl font-semibold">Common column counts</h2>
          <p className="mt-2 text-muted-foreground">
            Most content grids collapse to a single column on small screens and step up to two or
            three. The card grids across this site use{" "}
            <code className="font-mono text-foreground">
              grid gap-4 sm:grid-cols-2 lg:grid-cols-3
            </code>
            .
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="flex h-16 items-center justify-center rounded-lg border border-border bg-muted font-mono text-xs text-muted-foreground"
              >
                {n}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Gaps from the spacing scale</h2>
          <p className="mt-2 text-muted-foreground">
            Gaps are not arbitrary — they read from the same{" "}
            <Link
              href="/foundations/spacing"
              className="text-brand-text underline-offset-4 hover:underline"
            >
              spacing scale
            </Link>{" "}
            as padding and margins. Use <code className="font-mono text-foreground">gap-4</code> for
            card grids, <code className="font-mono text-foreground">gap-6</code> for looser
            sections, and <code className="font-mono text-foreground">gap-2</code> for tight token
            or chip layouts.
          </p>
          <div className="mt-4 space-y-4">
            {[
              { label: "gap-2", cls: "gap-2" },
              { label: "gap-4", cls: "gap-4" },
              { label: "gap-6", cls: "gap-6" },
            ].map((g) => (
              <div key={g.label} className="flex items-center gap-4">
                <span className="w-16 shrink-0 font-mono text-xs text-muted-foreground">
                  {g.label}
                </span>
                <div className={`grid flex-1 grid-cols-4 ${g.cls}`}>
                  {[1, 2, 3, 4].map((n) => (
                    <span key={n} className="h-8 rounded-md bg-brand/20" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Spanning and asymmetry</h2>
          <p className="mt-2 text-muted-foreground">
            For layouts that are not evenly divided — a wide primary panel beside a narrow rail —
            reach for <code className="font-mono text-foreground">col-span-*</code> on a{" "}
            <code className="font-mono text-foreground">grid-cols-3</code> parent, or a two-track{" "}
            <code className="font-mono text-foreground">lg:grid-cols-[2fr_1fr]</code> template. Keep
            to whole tracks; do not mix pixel and fractional widths in the same grid.
          </p>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            <div className="flex h-16 items-center justify-center rounded-lg border border-border bg-muted font-mono text-xs text-muted-foreground lg:col-span-2">
              lg:col-span-2
            </div>
            <div className="flex h-16 items-center justify-center rounded-lg border border-border bg-muted font-mono text-xs text-muted-foreground">
              rail
            </div>
          </div>
        </section>

        <p className="text-sm text-muted-foreground">
          Grids live inside the centred content shell — see{" "}
          <Link
            href="/foundations/layout"
            className="text-brand-text underline-offset-4 hover:underline"
          >
            layout
          </Link>{" "}
          for the column, measure, and breakpoint primitives that contain them.
        </p>
      </div>
    </PageShell>
  );
}
