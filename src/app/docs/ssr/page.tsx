import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/code-block";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "SSR & RSC",
  description:
    "Using Qeetrix with React Server Components and streaming — client boundaries, and avoiding client waterfalls in the Next.js App Router.",
};

export default function SsrPage() {
  return (
    <PageShell
      title="SSR & RSC"
      crumbs={[{ title: "Docs", href: "/docs" }, { title: "SSR & RSC" }]}
      lead="Qeetrix is built for React 19 — server-first rendering, streaming, and precise client boundaries."
    >
      <div className="space-y-8">
        <section>
          <h2 className="font-display text-xl font-semibold">Server components by default</h2>
          <p className="mt-2 text-muted-foreground">
            In the App Router your pages and layouts are Server Components. Many Qeetrix components
            are purely presentational (Card, Badge, Separator, typography, layout primitives) and
            render on the server with no client cost. Only interactive components carry a{" "}
            <code className="font-mono text-sm">"use client"</code> directive.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">The client boundary</h2>
          <p className="mt-2 text-muted-foreground">
            Interactive components (Dialog, Popover, Select, Tabs, anything wrapping a Base UI
            primitive with state) declare <code className="font-mono text-sm">"use client"</code>{" "}
            themselves. You do <strong>not</strong> add the directive when you use them — importing
            a client component into a server component is fully supported. You only need your own{" "}
            <code className="font-mono text-sm">"use client"</code> file when you write handlers or
            hooks (<code className="font-mono text-sm">useState</code>,{" "}
            <code className="font-mono text-sm">useTheme</code>).
          </p>
          <CodeBlock
            title="app/page.tsx (server component)"
            code={`import { Card, CardHeader, CardTitle } from "@qeetrix/ui";\nimport { Counter } from "./counter"; // your "use client" island\n\nexport default function Page() {\n  return (\n    <Card>\n      <CardHeader>\n        <CardTitle>Rendered on the server</CardTitle>\n      </CardHeader>\n      <Counter /> {/* interactive island hydrates on the client */}\n    </Card>\n  );\n}`}
          />
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Providers wrap the tree</h2>
          <p className="mt-2 text-muted-foreground">
            <code className="font-mono text-sm">ThemeProvider</code>,{" "}
            <code className="font-mono text-sm">DirectionProvider</code>,{" "}
            <code className="font-mono text-sm">I18nProvider</code>, and{" "}
            <code className="font-mono text-sm">DensityProvider</code> are client components. Put
            them in a small <code className="font-mono text-sm">"use client"</code> providers file
            and render it from your server layout — the children passed through stay
            server-rendered.
          </p>
          <CodeBlock
            title="app/providers.tsx"
            code={`"use client";\nimport { ThemeProvider } from "@qeetrix/ui";\n\nexport function Providers({ children }: { children: React.ReactNode }) {\n  return <ThemeProvider defaultTheme="system">{children}</ThemeProvider>;\n}`}
          />
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Avoid client waterfalls</h2>
          <p className="mt-2 text-muted-foreground">
            Fetch data in server components and stream results with{" "}
            <code className="font-mono text-sm">&lt;Suspense&gt;</code> rather than fetching inside
            client islands. Keep <code className="font-mono text-sm">"use client"</code> at the
            leaves of your tree — the deeper the boundary, the less JavaScript ships and the fewer
            sequential round-trips your users wait on. See the{" "}
            <Link
              href="/docs/rsc-matrix"
              className="text-brand-text underline-offset-4 hover:underline"
            >
              RSC compatibility matrix
            </Link>{" "}
            to check any component.
          </p>
        </section>
      </div>
    </PageShell>
  );
}
