import { Badge, Card, CardDescription, CardHeader, CardTitle } from "@qeetrix/ui";
import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { BLOCKS } from "@/lib/blocks";

export const metadata: Metadata = {
  title: "Blocks",
  description:
    "Six composable, multi-component Qeetrix blocks — auth, dashboard shell, onboarding wizard, page states, pricing table, and settings layout.",
};

export default function BlocksPage() {
  return (
    <PageShell
      variant="wide"
      title="Blocks"
      crumbs={[{ title: "Blocks" }]}
      lead={`${BLOCKS.length} composable, multi-component patterns that assemble Qeetrix components into ready-to-use surfaces. Import from @qeetrix/ui/blocks.`}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {BLOCKS.map((b) => (
          <Link key={b.slug} href={`/blocks/${b.slug}`} className="group">
            <Card className="h-full transition-shadow hover:shadow-hover">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {b.name}
                  {b.preview && <Badge className="text-[0.65rem]">live</Badge>}
                </CardTitle>
                <CardDescription>{b.description}</CardDescription>
                <code className="mt-1 font-mono text-xs text-muted-foreground">
                  @qeetrix/ui/blocks/{b.slug}
                </code>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
