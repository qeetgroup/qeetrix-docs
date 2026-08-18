import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/code-block";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Architecture",
  description:
    "How @qeetrix/ui is built: a single package, Base UI primitives, a DTCG → Style Dictionary token pipeline, and per-subpath exports.",
};

export default function ArchitecturePage() {
  return (
    <PageShell
      title="Architecture"
      crumbs={[{ title: "Docs", href: "/docs" }, { title: "Architecture" }]}
      lead="Qeetrix is a headless-primitive-plus-styled-layer design system, shipped as one versioned npm package."
    >
      <div className="space-y-8">
        <section>
          <h2 className="font-display text-xl font-semibold">One package, every surface</h2>
          <p className="mt-2 text-muted-foreground">
            Everything ships in <code className="font-mono text-sm">@qeetrix/ui</code> — components,
            tokens, brand, blocks, and i18n — exposed through a per-subpath{" "}
            <code className="font-mono text-sm">exports</code> map so deep imports still tree-shake
            (ADR-0001).
          </p>
          <CodeBlock
            title="exports"
            code={
              "@qeetrix/ui              // the barrel\n@qeetrix/ui/styles.css   // compiled CSS: fonts + tokens + components\n@qeetrix/ui/tokens.css   // raw --qx-* variables\n@qeetrix/ui/tokens.json  // resolved tokens (light + dark)\n@qeetrix/ui/qeetrix.css  // semantic bridge\n@qeetrix/ui/brand        // logos + Qeet icons\n@qeetrix/ui/blocks       // + /blocks/<name>\n@qeetrix/ui/components/* // deep component imports\n@qeetrix/ui/lib/*  ·  /hooks/*  ·  /fonts/*"
            }
          />
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Base UI, not Radix</h2>
          <p className="mt-2 text-muted-foreground">
            Each component is a thin styled layer over a <strong>Base UI</strong> primitive
            (ADR-0002), with <code className="font-mono text-sm">cva</code> variants, the{" "}
            <code className="font-mono text-sm">cn()</code> class merger, and a{" "}
            <code className="font-mono text-sm">data-slot</code> on every element for styling. The{" "}
            Base UI <code className="font-mono text-sm">render</code> prop composes onto other
            elements (it replaces Radix&rsquo;s <code className="font-mono text-sm">asChild</code>).
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Token pipeline</h2>
          <p className="mt-2 text-muted-foreground">
            Tokens are the source of truth: authored as <strong>W3C DTCG JSON</strong> in OKLCH,
            compiled by <strong>Style Dictionary</strong> into CSS variables and JSON, and gated to
            WCAG-AA contrast at build (ADR-0003). Re-brand by re-pointing a ramp — never hand-edit
            generated CSS.
          </p>
          <CodeBlock
            title="build pipeline (@qeetrix/ui)"
            code={
              "build-tokens   # DTCG JSON → Style Dictionary → src/styles/{tokens.css, tokens.raw.css, tokens.json}\n  ↓\ntsc            # type-check + emit dist\n  ↓\ntsc-alias      # rewrite @/ path aliases\n  ↓\npostbuild      # inline token CSS, copy fonts → dist"
            }
          />
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Rendering &amp; theming</h2>
          <p className="mt-2 text-muted-foreground">
            Interactive components carry <code className="font-mono text-sm">"use client"</code> and
            stay RSC-friendly. Light/dark is the <code className="font-mono text-sm">.dark</code>{" "}
            class (via <code className="font-mono text-sm">ThemeProvider</code>); RTL is{" "}
            <code className="font-mono text-sm">DirectionProvider</code>. See{" "}
            <Link
              href="/docs/theming"
              className="text-brand-text underline-offset-4 hover:underline"
            >
              theming
            </Link>{" "}
            and{" "}
            <Link href="/tokens" className="text-brand-text underline-offset-4 hover:underline">
              tokens
            </Link>
            .
          </p>
        </section>
      </div>
    </PageShell>
  );
}
