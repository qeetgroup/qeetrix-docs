import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/code-block";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Getting started",
  description:
    "Go from zero to a running Qeetrix component in under two minutes — install, wire styles and providers, render your first component.",
};

export default function GettingStartedPage() {
  return (
    <PageShell
      title="Getting started"
      crumbs={[{ title: "Docs", href: "/docs" }, { title: "Getting started" }]}
      lead="Qeetrix ships as a single package — @qeetrix/ui — with components, tokens, brand, and blocks. Here's the two-minute path into a React 19 app."
    >
      <div className="space-y-8">
        <section>
          <h2 className="font-display text-xl font-semibold">1. Install</h2>
          <p className="mt-2 text-muted-foreground">
            Requires React 19 and Node ≥ 20 (or Bun ≥ 1.3). React and React DOM are peer
            dependencies.
          </p>
          <CodeBlock
            title="bun"
            code={"bun add @qeetrix/ui\nbun add react react-dom   # peers (>= 19)"}
          />
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">2. Import the styles</h2>
          <p className="mt-2 text-muted-foreground">
            In your global stylesheet, import Tailwind v4 then the Qeetrix stylesheet — it ships the
            Cal Sans + Fira Code fonts and the full OKLCH token set. Add a{" "}
            <code className="font-mono text-sm">@source</code> so Tailwind scans the compiled
            components.
          </p>
          <CodeBlock
            title="app/globals.css"
            code={`@import "tailwindcss";\n@import "@qeetrix/ui/styles.css";\n@source "../node_modules/@qeetrix/ui/dist/**/*.js";`}
          />
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">3. Add the provider</h2>
          <p className="mt-2 text-muted-foreground">
            Wrap your app in <code className="font-mono text-sm">ThemeProvider</code> to drive
            light/dark via the <code className="font-mono text-sm">.dark</code> class.
          </p>
          <CodeBlock
            title="app/layout.tsx"
            code={`import { ThemeProvider } from "@qeetrix/ui";\nimport "./globals.css";\n\nexport default function RootLayout({ children }) {\n  return (\n    <html lang="en" suppressHydrationWarning>\n      <body>\n        <ThemeProvider defaultTheme="system">{children}</ThemeProvider>\n      </body>\n    </html>\n  );\n}`}
          />
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">4. Use a component</h2>
          <CodeBlock
            title="app/page.tsx"
            code={`import { Button } from "@qeetrix/ui";\n\nexport default function Page() {\n  return <Button>Hello, Qeetrix</Button>;\n}`}
          />
          <p className="mt-2 text-muted-foreground">
            That&rsquo;s it. Browse the{" "}
            <Link href="/components" className="text-brand-text underline-offset-4 hover:underline">
              145 UI modules
            </Link>
            , explore{" "}
            <Link href="/tokens" className="text-brand-text underline-offset-4 hover:underline">
              design tokens
            </Link>
            , or read the{" "}
            <Link
              href="/docs/theming"
              className="text-brand-text underline-offset-4 hover:underline"
            >
              theming guide
            </Link>
            .
          </p>
        </section>
      </div>
    </PageShell>
  );
}
