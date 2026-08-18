import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { tokensFor } from "@/lib/tokens";

export const metadata: Metadata = {
  title: "Elevation",
  description: "The Qeetrix shadow ladder — rest, hover, popover, modal — for layered surfaces.",
};

export default function ElevationFoundationPage() {
  const shadows = tokensFor("shadow").filter((s) => s.light !== "none");
  return (
    <PageShell
      title="Elevation"
      crumbs={[{ title: "Foundations", href: "/foundations" }, { title: "Elevation" }]}
      lead="A layered shadow ladder gives every surface intentional depth: rest (cards), hover (lift), popover (menus), modal (dialogs). Exposed as --qx-shadow-* variables."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {shadows.map((s) => (
          <div key={s.path} className="flex flex-col items-center gap-3">
            <span
              className="flex size-24 items-center justify-center rounded-xl bg-card text-xs text-muted-foreground"
              style={{ boxShadow: s.light }}
            >
              {s.name}
            </span>
            <code className="font-mono text-[0.65rem] text-muted-foreground">{s.varName}</code>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
