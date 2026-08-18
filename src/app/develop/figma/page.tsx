import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/code-block";
import { InDevelopment, PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Figma",
  description:
    "How Qeetrix bridges design and code — Code Connect scaffolding (figma.config.json, 24 priority components) and a Tokens Studio round-trip for design tokens.",
};

export default function FigmaPage() {
  return (
    <PageShell
      title="Figma"
      status="In development"
      crumbs={[{ title: "Develop", href: "/develop" }, { title: "Figma" }]}
      lead="Qeetrix is built to close the loop between design and code — mapping components with Figma Code Connect and round-tripping design tokens through Tokens Studio."
    >
      <section>
        <h2 className="font-display text-xl font-semibold">Code Connect</h2>
        <p className="mt-2 text-muted-foreground">
          The repo ships a <code className="font-mono">figma.config.json</code> that scaffolds Code
          Connect (React parser, <code className="font-mono">Qeetrix</code> label) for the 24
          priority components, so Figma&apos;s Dev Mode surfaces real{" "}
          <code className="font-mono">@qeetrix/ui</code> code next to each design node.
        </p>
        <CodeBlock
          title="figma.config.json"
          code={`{\n  "codeConnect": {\n    "parser": "react",\n    "label": "Qeetrix",\n    "include": ["packages/ui/src/components/**/*.figma.tsx"]\n  }\n}`}
        />
        <div className="mt-4">
          <InDevelopment>
            Code Connect is scaffolded but not yet wired: it is blocked until a real Figma library
            ships (see ADR-0006). The config and the 24-component target list are in the repo; the
            published mappings land once the library exists.
          </InDevelopment>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-xl font-semibold">Related</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          See how tokens are authored and consumed on{" "}
          <Link
            href="/develop/design-tokens"
            className="text-brand-text underline-offset-4 hover:underline"
          >
            Design tokens
          </Link>
          , or browse the reference on{" "}
          <Link href="/tokens" className="text-brand-text underline-offset-4 hover:underline">
            Tokens
          </Link>
          .
        </p>
      </section>
    </PageShell>
  );
}
