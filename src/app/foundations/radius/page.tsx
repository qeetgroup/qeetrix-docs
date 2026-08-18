import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { tokensFor } from "@/lib/tokens";

export const metadata: Metadata = {
  title: "Radius",
  description: "The Qeetrix corner-radius scale, derived from a base radius.",
};

export default function RadiusFoundationPage() {
  const radii = tokensFor("radii");
  return (
    <PageShell
      title="Radius"
      crumbs={[{ title: "Foundations", href: "/foundations" }, { title: "Radius" }]}
      lead="Corner radii derive from a single base radius, keeping every surface consistent. Exposed as --qx-radii-* variables."
    >
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {radii.map((r) => (
          <div key={r.path} className="flex flex-col items-center gap-2">
            <span
              className="h-20 w-20 border-2 border-brand bg-brand/10"
              style={{ borderRadius: r.light }}
            />
            <span className="text-center font-mono text-xs text-muted-foreground">
              {r.name}
              <br />
              {r.light}
            </span>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
