import { Card, CardDescription, CardHeader, CardTitle } from "@qeetrix/ui";
import type { Metadata } from "next";
import Link from "next/link";
import { InDevelopment, PageShell } from "@/components/page-shell";
import { TEMPLATES } from "@/lib/templates";

export const metadata: Metadata = {
  title: "Templates",
  description:
    "Full, runnable starters assembled from Qeetrix blocks and components — admin console, marketing, auth, settings, and onboarding.",
};

export default function TemplatesPage() {
  return (
    <PageShell
      variant="wide"
      title="Templates"
      status="In development"
      crumbs={[{ title: "Templates" }]}
      lead="Templates are full starters — whole app shells assembled from Qeetrix blocks and components, ready to clone and rename. Where patterns show a recipe, templates hand you the finished dish."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {TEMPLATES.map((t) => (
          <Link key={t.slug} href={`/templates/${t.slug}`} className="group">
            <Card className="h-full transition-shadow hover:shadow-hover">
              <CardHeader>
                <CardTitle>{t.title}</CardTitle>
                <CardDescription>{t.description}</CardDescription>
                <p className="mt-1 font-mono text-xs text-muted-foreground">
                  {[...t.blocks, ...t.components].slice(0, 4).join(" · ")}
                </p>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-8">
        <InDevelopment>
          These starters are being assembled from the shipped building blocks. While they land, the{" "}
          <Link href="/blocks" className="text-brand-text underline-offset-4 hover:underline">
            blocks
          </Link>{" "}
          they are built from are live today and can be composed directly.
        </InDevelopment>
      </div>
    </PageShell>
  );
}
