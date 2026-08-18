import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/code-block";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "React (SPA)",
  description:
    "Use Qeetrix in a client-rendered React app — no server components, no directives, just import and render.",
};

export default function ReactFrameworkPage() {
  return (
    <PageShell
      title="React (SPA)"
      crumbs={[
        { title: "Docs", href: "/docs" },
        { title: "Frameworks", href: "/docs/frameworks/next" },
        { title: "React (SPA)" },
      ]}
      lead="In a single-page React app everything already runs on the client, so Qeetrix is at its simplest — import and render."
    >
      <div className="space-y-8">
        <section>
          <h2 className="font-display text-xl font-semibold">Install</h2>
          <CodeBlock title="bun" code={"bun add @qeetrix/ui react react-dom"} />
          <p className="mt-2 text-muted-foreground">
            React and React DOM must be <code className="font-mono text-sm">&gt;= 19</code>.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Import styles once</h2>
          <p className="mt-2 text-muted-foreground">
            Import Tailwind v4 and the Qeetrix stylesheet in your app entry (or root CSS), and add
            the <code className="font-mono text-sm">@source</code> glob so Tailwind detects the
            classes. The directive <code className="font-mono text-sm">"use client"</code> is a
            no-op in an SPA — there are no Server Components, so you never think about boundaries.
          </p>
          <CodeBlock
            title="src/index.css"
            code={`@import "tailwindcss";\n@import "@qeetrix/ui/styles.css";\n@source "../node_modules/@qeetrix/ui/dist/**/*.js";`}
          />
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Wrap the root</h2>
          <p className="mt-2 text-muted-foreground">
            Mount <code className="font-mono text-sm">ThemeProvider</code> at the top of your tree.
            Add <code className="font-mono text-sm">DirectionProvider</code> if you need RTL.
          </p>
          <CodeBlock
            title="src/main.tsx"
            code={`import { createRoot } from "react-dom/client";\nimport { ThemeProvider } from "@qeetrix/ui";\nimport App from "./App";\nimport "./index.css";\n\ncreateRoot(document.getElementById("root")!).render(\n  <ThemeProvider defaultTheme="system">\n    <App />\n  </ThemeProvider>,\n);`}
          />
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Build tooling</h2>
          <p className="mt-2 text-muted-foreground">
            Most SPAs use Vite. For the Tailwind plugin specifics (
            <code className="font-mono text-sm">@tailwindcss/vite</code> vs PostCSS), see the{" "}
            <Link
              href="/docs/frameworks/vite"
              className="text-brand-text underline-offset-4 hover:underline"
            >
              Vite guide
            </Link>
            .
          </p>
        </section>
      </div>
    </PageShell>
  );
}
