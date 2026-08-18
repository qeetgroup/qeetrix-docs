import { Badge, Card, CardHeader, CardTitle } from "@qeetrix/ui";
import type { Metadata } from "next";
import Link from "next/link";
import { hasExample } from "@/lib/examples";
import data from "@/lib/generated/components.json";

export const metadata: Metadata = {
  title: "Components",
  description: `All ${data.count} accessible, tokenised Qeetrix components, generated from @qeetrix/ui v${data.version}.`,
};

export default function ComponentsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Components
        </h1>
        <Badge variant="secondary">{data.count} components</Badge>
      </div>
      <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
        Every component ships from <code className="font-mono text-sm">@qeetrix/ui</code> v
        {data.version}. This catalogue is generated from the package manifest — never
        hand-maintained.
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.components.map((c) => (
          <Link key={c.slug} href={`/components/${c.slug}`} className="group">
            <Card className="h-full transition-shadow hover:shadow-hover">
              <CardHeader>
                <CardTitle className="flex items-center justify-between gap-2 text-base">
                  {c.name}
                  {hasExample(c.slug) ? (
                    <Badge className="text-[0.65rem]">live</Badge>
                  ) : (
                    c.tested && (
                      <Badge variant="secondary" className="text-[0.65rem]">
                        tested
                      </Badge>
                    )
                  )}
                </CardTitle>
                <code className="font-mono text-xs text-muted-foreground">{c.deepImport}</code>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
