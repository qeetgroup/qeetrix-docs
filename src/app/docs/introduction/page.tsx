import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Introduction",
  description:
    "What Qeetrix is, the one-package philosophy, when to use it, and how it fits the Qeet product suite.",
};

export default function IntroductionPage() {
  return (
    <PageShell
      title="Introduction"
      crumbs={[{ title: "Docs", href: "/docs" }, { title: "Introduction" }]}
      lead="Qeetrix is the shared design system behind every Qeet product — one package that carries components, tokens, and brand."
    >
      <div className="space-y-8">
        <section>
          <h2 className="font-display text-xl font-semibold">What Qeetrix is</h2>
          <p className="mt-2 text-muted-foreground">
            Qeetrix is a React 19 design system distributed as a single package,{" "}
            <code className="font-mono text-sm">@qeetrix/ui</code>. It ships 145 UI modules and 6
            composable blocks built on{" "}
            <a
              href="https://base-ui.com"
              className="text-brand-text underline-offset-4 hover:underline"
            >
              Base UI
            </a>{" "}
            primitives, styled with Tailwind v4 and driven by OKLCH design tokens. Every element
            carries a <code className="font-mono text-sm">data-slot</code> attribute, variants are
            defined with <code className="font-mono text-sm">cva</code>, and classes are merged with{" "}
            <code className="font-mono text-sm">cn()</code>.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">One package, every surface</h2>
          <p className="mt-2 text-muted-foreground">
            There is no constellation of <code className="font-mono text-sm">@qeetrix/tokens</code>,{" "}
            <code className="font-mono text-sm">@qeetrix/brand</code>, and{" "}
            <code className="font-mono text-sm">@qeetrix/components</code> to keep in sync.
            Components, design tokens, brand logos/icons, and blocks all live in{" "}
            <code className="font-mono text-sm">@qeetrix/ui</code>. Tokens are authored as DTCG
            JSON, compiled through Style Dictionary into{" "}
            <code className="font-mono text-sm">--qx-*</code> OKLCH variables, and gated on WCAG-AA
            contrast — so a re-brand or a dark-mode flip is a variable change, not a component
            rewrite.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">When to use it — and when not</h2>
          <p className="mt-2 text-muted-foreground">
            Use Qeetrix when you are building a React 19 product that should look and behave like
            the rest of the Qeet suite, or when you want an accessible, tokenised component set
            without assembling one yourself. It is <strong>React-only</strong>: Vue, Svelte, and
            Angular are under evaluation but are not supported. It is also pre-1.0 (currently{" "}
            <strong>v0.4.0</strong>) — the API is stabilising but can still change between minor
            versions, so pin your version and read the changelog before upgrading.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Part of the Qeet suite</h2>
          <p className="mt-2 text-muted-foreground">
            Every Qeet product authenticates with Qeet ID, notifies through Qeet Notify, and logs to
            Qeet Logs — and every front end is built on Qeetrix. That shared foundation is why the
            brand orange <span className="font-mono text-sm">#F26D0E</span> (token{" "}
            <code className="font-mono text-sm">OD-DS-03</code>) and the same interaction patterns
            show up consistently across products.
          </p>
          <p className="mt-4 text-muted-foreground">
            Ready to build? Head to{" "}
            <Link
              href="/docs/getting-started"
              className="text-brand-text underline-offset-4 hover:underline"
            >
              Getting started
            </Link>{" "}
            or browse the{" "}
            <Link href="/components" className="text-brand-text underline-offset-4 hover:underline">
              component catalog
            </Link>
            .
          </p>
        </section>
      </div>
    </PageShell>
  );
}
