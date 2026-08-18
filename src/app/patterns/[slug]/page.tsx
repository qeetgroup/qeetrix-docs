import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CodeBlock } from "@/components/code-block";
import { PageShell } from "@/components/page-shell";
import componentData from "@/lib/generated/components.json";
import { getPattern, PATTERNS } from "@/lib/patterns";

const NAME_BY_SLUG = new Map(componentData.components.map((c) => [c.slug, c.name] as const));

type Params = { slug: string };

export function generateStaticParams() {
  return PATTERNS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const pattern = getPattern(slug);
  if (!pattern) return { title: "Pattern not found" };
  return { title: pattern.title, description: pattern.description };
}

export default async function PatternPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const pattern = getPattern(slug);
  if (!pattern) notFound();

  return (
    <PageShell
      title={pattern.title}
      crumbs={[{ title: "Patterns", href: "/patterns" }, { title: pattern.title }]}
      lead={pattern.description}
    >
      <div className="space-y-10">
        <section className="space-y-4">
          <div className="space-y-2">
            <h2 className="font-display text-xl font-semibold">Problem</h2>
            <p className="text-muted-foreground">{pattern.problem}</p>
          </div>
          <div className="space-y-2">
            <h2 className="font-display text-xl font-semibold">Solution</h2>
            <p className="text-muted-foreground">{pattern.solution}</p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold">Composes</h2>
          <div className="flex flex-wrap gap-1.5">
            {pattern.components.map((c) => (
              <Link
                key={c}
                href={`/components/${c}`}
                className="rounded-md border border-border bg-card px-2 py-0.5 font-mono text-xs text-muted-foreground hover:text-foreground"
              >
                {NAME_BY_SLUG.get(c) ?? c}
              </Link>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold">Do &amp; Don&apos;t</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-display text-sm font-semibold text-foreground">Do</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {pattern.dos.map((d) => (
                  <li key={d} className="flex gap-2">
                    <span aria-hidden className="text-brand">
                      +
                    </span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-display text-sm font-semibold text-foreground">Don&apos;t</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {pattern.donts.map((d) => (
                  <li key={d} className="flex gap-2">
                    <span aria-hidden className="text-muted-foreground">
                      &minus;
                    </span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold">Accessibility</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {pattern.a11y.map((a) => (
              <li key={a} className="flex gap-2">
                <span aria-hidden className="text-brand">
                  &bull;
                </span>
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </section>

        {pattern.example && (
          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold">Example</h2>
            <CodeBlock code={pattern.example} title={`${pattern.slug}.tsx`} />
          </section>
        )}

        <div>
          <Link
            href="/patterns"
            className="text-sm text-brand-text underline-offset-4 hover:underline"
          >
            &larr; All patterns
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
