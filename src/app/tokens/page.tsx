import { Badge, Card, CardDescription, CardHeader, CardTitle } from "@qeetrix/ui";
import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { categories, categoryMeta, countFor, tokensFor, totalCount } from "@/lib/tokens";

const total = totalCount();
const cats = categories();

export const metadata: Metadata = {
  title: "Design tokens",
  description: `${total} Qeetrix design tokens across ${cats.length} categories — authored in OKLCH, contrast-gated to WCAG-AA, exposed as --qx-* CSS variables.`,
};

export default function TokensPage() {
  return (
    <PageShell
      variant="wide"
      title="Design tokens"
      crumbs={[{ title: "Tokens" }]}
      lead={`${total} tokens across ${cats.length} categories — authored in OKLCH DTCG JSON, compiled by Style Dictionary, contrast-gated to WCAG-AA, and exposed as --qx-* CSS variables.`}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cats.map((cat) => {
          const meta = categoryMeta(cat);
          const swatches =
            cat === "color"
              ? tokensFor(cat)
                  .filter((t) => t.name.startsWith("brand."))
                  .slice(0, 9)
              : [];
          return (
            <Link key={cat} href={`/tokens/${cat}`} className="group">
              <Card className="h-full transition-shadow hover:shadow-hover">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {meta.label}
                    <Badge variant="secondary">{countFor(cat)}</Badge>
                  </CardTitle>
                  <CardDescription>{meta.description}</CardDescription>
                  {swatches.length > 0 && (
                    <div className="mt-2 flex overflow-hidden rounded-md border border-border">
                      {swatches.map((s) => (
                        <span key={s.path} className="h-6 flex-1" style={{ background: s.light }} />
                      ))}
                    </div>
                  )}
                  <code className="mt-1 font-mono text-xs text-muted-foreground">--qx-{cat}-*</code>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>
    </PageShell>
  );
}
