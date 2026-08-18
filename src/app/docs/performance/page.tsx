import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/code-block";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Performance",
  description:
    "Keep Qeetrix apps lean — tree-shaking named exports, barrel vs deep imports, and virtualizing large tables.",
};

export default function PerformancePage() {
  return (
    <PageShell
      title="Performance"
      crumbs={[{ title: "Docs", href: "/docs" }, { title: "Performance" }]}
      lead="Qeetrix ships as tree-shakeable ES modules — with a modern bundler you pay only for what you render."
    >
      <div className="space-y-8">
        <section>
          <h2 className="font-display text-xl font-semibold">Import named exports</h2>
          <p className="mt-2 text-muted-foreground">
            Everything is a named export from the package root, and the package is side-effect-free
            for JS (styles are the one declared side effect). Import from the barrel and let your
            bundler drop the rest — with Vite, Next.js/Turbopack, or esbuild, unused components
            never reach the client.
          </p>
          <CodeBlock
            title="good.tsx"
            code={`import { Button, Card, Badge } from "@qeetrix/ui"; // only these ship`}
          />
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Barrel vs deep imports</h2>
          <p className="mt-2 text-muted-foreground">
            The barrel is fine for tree-shaking bundlers. If you are on a toolchain with weak
            tree-shaking, or want to be explicit, deep paths are exported too:{" "}
            <code className="font-mono text-sm">@qeetrix/ui/components/*</code>,{" "}
            <code className="font-mono text-sm">/lib/*</code>,{" "}
            <code className="font-mono text-sm">/hooks/*</code>. Blocks live behind{" "}
            <code className="font-mono text-sm">@qeetrix/ui/blocks</code> so a page that never
            renders a block never pulls one in.
          </p>
          <CodeBlock
            title="deep-import.tsx"
            code={`import { Button } from "@qeetrix/ui/components/button";`}
          />
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Virtualize large tables</h2>
          <p className="mt-2 text-muted-foreground">
            Table and DataTable render whatever rows you pass — thousands of DOM nodes will cost you
            regardless of the design system. For long lists, virtualize: render only the rows in
            view (for example with{" "}
            <code className="font-mono text-sm">@tanstack/react-virtual</code>) and pass the
            windowed slice to the table. Keep column definitions memoised so rows do not re-render
            on every parent update.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Push work to the server</h2>
          <p className="mt-2 text-muted-foreground">
            The cheapest client JavaScript is the JavaScript you never ship. Render presentational
            components on the server and keep{" "}
            <code className="font-mono text-sm">"use client"</code> at the leaves — see{" "}
            <Link href="/docs/ssr" className="text-brand-text underline-offset-4 hover:underline">
              SSR &amp; RSC
            </Link>
            .
          </p>
        </section>
      </div>
    </PageShell>
  );
}
