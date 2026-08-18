import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlockPreview } from "@/components/block-preview";
import { CopyButton } from "@/components/copy-button";
import { InDevelopment, PageShell } from "@/components/page-shell";
import { BLOCKS, getBlock } from "@/lib/blocks";

type Params = { slug: string };

export function generateStaticParams() {
  return BLOCKS.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const b = getBlock(slug);
  if (!b) return { title: "Block not found" };
  return { title: b.name, description: b.description };
}

export default async function BlockPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const b = getBlock(slug);
  if (!b) notFound();

  const importLine = `import { ${b.exports.join(", ")} } from "@qeetrix/ui/blocks/${slug}";`;

  return (
    <PageShell
      title={b.name}
      crumbs={[{ title: "Blocks", href: "/blocks" }, { title: b.name }]}
      lead={b.description}
      status={b.preview ? undefined : "In development"}
    >
      <section className="space-y-2">
        <h2 className="text-sm font-semibold">Import</h2>
        <div className="flex items-center gap-2">
          <code className="flex-1 overflow-x-auto rounded-lg border border-border bg-card px-3 py-2 font-mono text-sm">
            {importLine}
          </code>
          <CopyButton value={importLine} />
        </div>
      </section>

      {b.preview && (
        <section className="mt-8">
          <h2 className="mb-3 text-sm font-semibold">Preview</h2>
          <BlockPreview slug={slug} />
        </section>
      )}

      <section className="mt-8">
        <h2 className="mb-3 text-sm font-semibold">Exports</h2>
        <div className="flex flex-wrap gap-1.5">
          {b.exports.map((e) => (
            <code
              key={e}
              className="rounded-md border border-border bg-card px-2 py-0.5 font-mono text-xs"
            >
              {e}
            </code>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-sm font-semibold">Composes</h2>
        <div className="flex flex-wrap gap-1.5">
          {b.composes.map((c) => (
            <span
              key={c}
              className="rounded-md border border-border px-2 py-0.5 font-mono text-xs text-muted-foreground"
            >
              {c}
            </span>
          ))}
        </div>
      </section>

      <div className="mt-8">
        <a
          href={`https://github.com/qeetgroup/qeetrix/blob/main/packages/ui/src/blocks/${slug}.tsx`}
          className="text-sm text-brand-text underline-offset-4 hover:underline"
          target="_blank"
          rel="noreferrer"
        >
          View source →
        </a>
      </div>

      {!b.preview && (
        <div className="mt-8">
          <InDevelopment>
            A live, interactive preview of this block is being wired up. The import, exports, and
            composition above are accurate to the shipped{" "}
            <code className="font-mono">@qeetrix/ui</code>.
          </InDevelopment>
        </div>
      )}
    </PageShell>
  );
}
