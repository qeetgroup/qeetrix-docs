import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InDevelopment, PageShell } from "@/components/page-shell";
import { getBlock } from "@/lib/blocks";
import { componentSlug, getTemplate, TEMPLATES } from "@/lib/templates";

type Params = { slug: string };

export function generateStaticParams() {
  return TEMPLATES.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const t = getTemplate(slug);
  if (!t) return { title: "Template not found" };
  return { title: t.title, description: t.description };
}

export default async function TemplatePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const t = getTemplate(slug);
  if (!t) notFound();

  return (
    <PageShell
      title={t.title}
      status="In development"
      crumbs={[{ title: "Templates", href: "/templates" }, { title: t.title }]}
      lead={t.description}
    >
      <section>
        <h2 className="font-display text-xl font-semibold">Built from</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          This starter is composed from shipped Qeetrix blocks and components — all live today.
        </p>

        <h3 className="mt-4 text-sm font-semibold">Blocks</h3>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {t.blocks.map((b) => {
            const block = getBlock(b);
            return (
              <Link
                key={b}
                href={`/blocks/${b}`}
                className="rounded-md border border-border bg-card px-2 py-0.5 font-mono text-xs text-brand-text underline-offset-4 hover:underline"
              >
                {block ? block.name : b}
              </Link>
            );
          })}
        </div>

        <h3 className="mt-4 text-sm font-semibold">Components</h3>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {t.components.map((c) => (
            <Link
              key={c}
              href={`/components/${componentSlug(c)}`}
              className="rounded-md border border-border px-2 py-0.5 font-mono text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              {c}
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-xl font-semibold">Stack</h2>
        <p className="mt-2 font-mono text-sm text-muted-foreground">{t.stack}</p>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-xl font-semibold">Highlights</h2>
        <ul className="mt-3 space-y-2">
          {t.highlights.map((h) => (
            <li key={h} className="flex gap-2 text-sm text-muted-foreground">
              <span aria-hidden className="text-brand-text">
                &middot;
              </span>
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-10">
        <InDevelopment>
          Runnable starter repositories are being assembled from the blocks and components above.
          The composition here is accurate to the shipped{" "}
          <code className="font-mono">@qeetrix/ui</code>, and every piece can be composed directly
          today — start from the{" "}
          <Link href="/blocks" className="text-brand-text underline-offset-4 hover:underline">
            blocks
          </Link>{" "}
          it is built from.
        </InDevelopment>
      </div>
    </PageShell>
  );
}
