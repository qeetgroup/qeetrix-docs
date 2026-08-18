import { Badge } from "@qeetrix/ui";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ComponentPreview } from "@/components/component-preview";
import { CopyButton } from "@/components/copy-button";
import { InDevelopment, PageShell } from "@/components/page-shell";
import { getMeta } from "@/lib/component-meta";
import { EXAMPLE_CODE, hasExample } from "@/lib/examples";
import data from "@/lib/generated/components.json";

type Params = { slug: string };

export function generateStaticParams() {
  return data.components.map((c) => ({ slug: c.slug }));
}

function find(slug: string) {
  return data.components.find((c) => c.slug === slug);
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const c = find(slug);
  if (!c) return { title: "Component not found" };
  return {
    title: c.name,
    description: `${c.name} — an accessible Qeetrix component. Import from ${c.import}.`,
  };
}

export default async function ComponentPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const c = find(slug);
  if (!c) notFound();

  const importLine = `import { ${c.name} } from "${c.import}";`;
  const example = hasExample(slug) ? EXAMPLE_CODE[slug] : null;
  const meta = getMeta(slug);
  const variantGroups = meta ? Object.entries(meta.variants) : [];
  const fnNames = meta
    ? Array.from(new Set([c.name, ...meta.exports])).filter((n) => meta.functions[n])
    : [];

  return (
    <PageShell
      title={c.name}
      status={example ? undefined : "In development"}
      crumbs={[{ title: "Components", href: "/components" }, { title: c.name }]}
      lead="An accessible, tokenised Qeetrix component built on Base UI."
    >
      <div className="flex flex-wrap gap-2">
        {c.tested && <Badge variant="secondary">tested</Badge>}
        {c.story && <Badge variant="secondary">has story</Badge>}
        {example && <Badge variant="secondary">live preview</Badge>}
        {variantGroups.length > 0 && (
          <Badge variant="secondary">{variantGroups.length} variant groups</Badge>
        )}
      </div>

      <section className="mt-6 space-y-2">
        <h2 className="text-sm font-semibold">Import</h2>
        <div className="flex items-center gap-2">
          <code className="flex-1 overflow-x-auto rounded-lg border border-border bg-card px-3 py-2 font-mono text-sm">
            {importLine}
          </code>
          <CopyButton value={importLine} />
        </div>
        <p className="text-sm text-muted-foreground">
          Deep import: <code className="font-mono text-xs">{c.deepImport}</code>
        </p>
      </section>

      {example && (
        <>
          <section className="mt-8">
            <h2 className="mb-3 text-sm font-semibold">Preview</h2>
            <ComponentPreview slug={slug} />
          </section>
          <section className="mt-6">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-sm font-semibold">Example</h2>
              <CopyButton value={example} label="Copy code" />
            </div>
            <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 font-mono text-xs leading-relaxed">
              {example}
            </pre>
          </section>
        </>
      )}

      {variantGroups.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 text-sm font-semibold">Variants</h2>
          <div className="space-y-4 rounded-xl border border-border p-4">
            {variantGroups.map(([group, g]) => (
              <div key={group}>
                <p className="mb-2 font-mono text-xs text-muted-foreground">
                  {group}
                  {g.default && <span className="ml-2">default: {g.default}</span>}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {g.options.map((opt) => (
                    <span
                      key={opt}
                      className={`rounded-md border px-2 py-0.5 font-mono text-xs ${
                        opt === g.default
                          ? "border-brand bg-brand/10 text-brand-text"
                          : "border-border text-muted-foreground"
                      }`}
                    >
                      {opt}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {fnNames.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 text-sm font-semibold">Props &amp; API</h2>
          <div className="space-y-5">
            {fnNames.map((name) => {
              const fn = meta?.functions[name];
              if (!fn) return null;
              return (
                <div key={name} className="overflow-hidden rounded-xl border border-border">
                  <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border bg-card px-4 py-2">
                    <code className="font-mono text-sm font-semibold">{name}</code>
                    {fn.propsType && (
                      <code className="font-mono text-xs text-muted-foreground">
                        {fn.propsType}
                      </code>
                    )}
                  </div>
                  {fn.params.length > 0 ? (
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-xs text-muted-foreground">
                          <th className="px-4 py-2 font-medium">Prop</th>
                          <th className="px-4 py-2 font-medium">Type</th>
                          <th className="px-4 py-2 font-medium">Required</th>
                        </tr>
                      </thead>
                      <tbody>
                        {fn.params.map((p) => {
                          const v = meta?.variants[p];
                          const pt = fn.paramTypes?.[p];
                          const typeStr = v
                            ? v.options.map((o) => `"${o}"`).join(" | ")
                            : (pt?.type ?? "—");
                          const required = pt ? !pt.optional : false;
                          return (
                            <tr key={p} className="border-t border-border align-top">
                              <td className="px-4 py-2 font-mono text-xs whitespace-nowrap">
                                {p}
                                {v?.default && (
                                  <span className="ml-1 text-muted-foreground">= {v.default}</span>
                                )}
                              </td>
                              <td className="px-4 py-2 font-mono text-xs text-brand-text">
                                {typeStr}
                              </td>
                              <td className="px-4 py-2 text-xs text-muted-foreground">
                                {required ? "yes" : "—"}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  ) : (
                    <p className="px-4 py-2 text-sm text-muted-foreground">No documented props.</p>
                  )}
                  {fn.hasRest && (
                    <p className="border-t border-border px-4 py-2 text-xs text-muted-foreground">
                      …plus all remaining props forwarded to the underlying element
                      {name === c.name && meta?.primitive ? ` (${meta?.primitive})` : ""}.
                    </p>
                  )}
                </div>
              );
            })}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Props and their types are extracted from <code className="font-mono">@qeetrix/ui</code>{" "}
            source at build time.
          </p>
        </section>
      )}

      {meta && (meta.dataSlots.length > 0 || meta.primitive) && (
        <section className="mt-8 grid gap-6 sm:grid-cols-2">
          {meta.dataSlots.length > 0 && (
            <div>
              <h2 className="mb-2 text-sm font-semibold">Data slots</h2>
              <p className="mb-2 text-xs text-muted-foreground">
                Target these for styling with <code className="font-mono">[data-slot]</code>.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {meta.dataSlots.map((s) => (
                  <code
                    key={s}
                    className="rounded-md border border-border bg-card px-2 py-0.5 font-mono text-xs"
                  >
                    data-slot=&quot;{s}&quot;
                  </code>
                ))}
              </div>
            </div>
          )}
          {meta.primitive && (
            <div>
              <h2 className="mb-2 text-sm font-semibold">Built on</h2>
              <code className="rounded-md border border-border bg-card px-2 py-0.5 font-mono text-xs">
                {meta.primitive}
              </code>
              <p className="mt-2 text-xs text-muted-foreground">
                A styled layer over a Base UI primitive.
              </p>
            </div>
          )}
        </section>
      )}

      <div className="mt-8 flex flex-wrap gap-3 text-sm">
        <Link href="/play" className="text-brand-text underline-offset-4 hover:underline">
          Open in Playground →
        </Link>
        <a
          href={`https://github.com/qeetgroup/qeetrix/blob/main/packages/ui/src/components/ui/${slug}.tsx`}
          className="text-brand-text underline-offset-4 hover:underline"
          target="_blank"
          rel="noreferrer"
        >
          View source →
        </a>
      </div>

      {!example && (
        <div className="mt-8">
          <InDevelopment>
            Live preview and full reference (auto-generated props/API, accessibility, design) follow
            the component-documentation standard and are landing next.
          </InDevelopment>
        </div>
      )}
    </PageShell>
  );
}
