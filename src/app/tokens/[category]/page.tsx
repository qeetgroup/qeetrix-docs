import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { TokenTable } from "@/components/token-table";
import { categories, categoryMeta, tokensFor } from "@/lib/tokens";

type Params = { category: string };

export function generateStaticParams() {
  return categories().map((category) => ({ category }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { category } = await params;
  if (!categories().includes(category)) return { title: "Token category not found" };
  const meta = categoryMeta(category);
  return { title: `${meta.label} tokens`, description: meta.description };
}

export default async function TokenCategoryPage({ params }: { params: Promise<Params> }) {
  const { category } = await params;
  if (!categories().includes(category)) notFound();
  const meta = categoryMeta(category);
  const tokens = tokensFor(category);
  return (
    <PageShell
      title={`${meta.label} tokens`}
      crumbs={[{ title: "Tokens", href: "/tokens" }, { title: meta.label }]}
      lead={meta.description}
    >
      <p className="mb-4 text-sm text-muted-foreground">
        {tokens.length} tokens · click a variable to copy{" "}
        <code className="font-mono">var(--qx-…)</code>. Colour swatches show <strong>light</strong>{" "}
        then <strong>dark</strong>.
      </p>
      <TokenTable tokens={tokens} />
    </PageShell>
  );
}
