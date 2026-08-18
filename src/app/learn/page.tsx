import { Card, CardDescription, CardHeader, CardTitle } from "@qeetrix/ui";
import type { Metadata } from "next";
import Link from "next/link";
import { InDevelopment, PageShell } from "@/components/page-shell";
import { TRACKS } from "@/lib/learn-tracks";

export const metadata: Metadata = {
  title: "Learn",
  description:
    "Guided tracks through Qeetrix — fundamentals, forms, theming, dashboards from blocks, accessibility, and building for AI agents.",
};

export default function LearnPage() {
  return (
    <PageShell
      title="Learn"
      status="In development"
      crumbs={[{ title: "Learn" }]}
      lead="Learn is a set of guided tracks through Qeetrix — from your first install to building for AI agents. Each track points at the pages that take you there today."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TRACKS.map((t) => (
          <Link key={t.slug} href={`/learn/${t.slug}`} className="group">
            <Card className="h-full transition-shadow hover:shadow-hover">
              <CardHeader>
                <CardTitle>{t.title}</CardTitle>
                <CardDescription>{t.description}</CardDescription>
                <p className="mt-1 font-mono text-xs text-muted-foreground">
                  {t.lessons.length} lessons
                </p>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-8">
        <InDevelopment>
          These tracks link to the existing reference and guide pages today. Guided, step-by-step
          lessons with embedded playgrounds are planned and landing next.
        </InDevelopment>
      </div>
    </PageShell>
  );
}
