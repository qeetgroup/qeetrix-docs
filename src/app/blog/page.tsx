import { Card, CardDescription, CardHeader, CardTitle } from "@qeetrix/ui";
import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { POSTS } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Announcements, deep dives, and release notes from the Qeetrix team.",
};

export default function BlogPage() {
  return (
    <PageShell
      title="Blog"
      crumbs={[{ title: "Blog" }]}
      lead="Announcements, deep dives, and design essays."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {POSTS.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="group">
            <Card className="h-full transition-shadow hover:shadow-hover">
              <CardHeader>
                <time className="font-mono text-xs text-muted-foreground">{p.date}</time>
                <CardTitle className="mt-1">{p.title}</CardTitle>
                <CardDescription>{p.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
