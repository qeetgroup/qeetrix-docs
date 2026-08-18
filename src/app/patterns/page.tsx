import { Card, CardDescription, CardHeader, CardTitle } from "@qeetrix/ui";
import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import componentData from "@/lib/generated/components.json";
import { PATTERNS } from "@/lib/patterns";

const NAME_BY_SLUG = new Map(componentData.components.map((c) => [c.slug, c.name] as const));

export const metadata: Metadata = {
  title: "Patterns",
  description:
    "Cross-component UX recipes — forms, empty states, loading, data tables, auth flows, notifications, and destructive actions.",
};

export default function PatternsPage() {
  return (
    <PageShell
      variant="wide"
      title="Patterns"
      crumbs={[{ title: "Patterns" }]}
      lead="Patterns are cross-component UX recipes — the reusable ways Qeetrix components combine to solve a recurring problem. Each answers a problem→solution and names the pieces it composes."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {PATTERNS.map((p) => (
          <Link key={p.slug} href={`/patterns/${p.slug}`} className="group">
            <Card className="h-full transition-shadow hover:shadow-hover">
              <CardHeader>
                <CardTitle className="group-hover:text-brand-text">{p.title}</CardTitle>
                <CardDescription>{p.description}</CardDescription>
                <p className="mt-1 font-mono text-xs text-muted-foreground">
                  {p.components.map((c) => NAME_BY_SLUG.get(c) ?? c).join(" · ")}
                </p>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
