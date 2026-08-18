import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { tokensFor } from "@/lib/tokens";

export const metadata: Metadata = {
  title: "Spacing",
  description: "The Qeetrix spacing scale — used for padding, gaps, and layout rhythm.",
};

export default function SpacingFoundationPage() {
  const space = tokensFor("space");
  return (
    <PageShell
      title="Spacing"
      crumbs={[{ title: "Foundations", href: "/foundations" }, { title: "Spacing" }]}
      lead="A single spacing scale drives padding, gaps, and layout rhythm across every component. Exposed as --qx-space-* variables."
    >
      <div className="space-y-2">
        {space.map((s) => (
          <div key={s.path} className="flex items-center gap-4">
            <span className="w-28 shrink-0 font-mono text-xs text-muted-foreground">
              {s.name} · {s.light}
            </span>
            <span className="h-4 rounded-sm bg-brand" style={{ width: `min(${s.light}, 100%)` }} />
          </div>
        ))}
      </div>
    </PageShell>
  );
}
