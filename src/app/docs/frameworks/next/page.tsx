import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/code-block";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Next.js",
  description:
    "Set up Qeetrix in the Next.js App Router — styles import, Tailwind @source, and providers. The primary target.",
};

export default function NextFrameworkPage() {
  return (
    <PageShell
      title="Next.js"
      crumbs={[
        { title: "Docs", href: "/docs" },
        { title: "Frameworks", href: "/docs/frameworks/next" },
        { title: "Next.js" },
      ]}
      lead="The App Router is Qeetrix's primary target — this docs site itself runs on Next.js 16 and dogfoods @qeetrix/ui."
    >
      <div className="space-y-8">
        <section>
          <h2 className="font-display text-xl font-semibold">1. Install</h2>
          <CodeBlock title="bun" code={"bun add @qeetrix/ui"} />
          <p className="mt-2 text-muted-foreground">
            React 19 and React DOM 19 are peer dependencies — the App Router ships them already.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">2. Import styles + @source</h2>
          <p className="mt-2 text-muted-foreground">
            In your global stylesheet import Tailwind v4, then the Qeetrix stylesheet (it ships the
            Cal Sans + Fira Code fonts and the full OKLCH token set), then point{" "}
            <code className="font-mono text-sm">@source</code> at the compiled package so Tailwind
            scans the classes Qeetrix uses.
          </p>
          <CodeBlock
            title="app/globals.css"
            code={`@import "tailwindcss";\n@import "@qeetrix/ui/styles.css";\n@source "../node_modules/@qeetrix/ui/dist/**/*.js";`}
          />
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">3. Add providers in the layout</h2>
          <p className="mt-2 text-muted-foreground">
            Providers are client components. Keep them in a small{" "}
            <code className="font-mono text-sm">"use client"</code> file and render it from the
            server root layout. Set{" "}
            <code className="font-mono text-sm">suppressHydrationWarning</code> on{" "}
            <code className="font-mono text-sm">&lt;html&gt;</code> so the theme class applied
            before hydration does not warn.
          </p>
          <CodeBlock
            title="app/providers.tsx"
            code={`"use client";\nimport { ThemeProvider } from "@qeetrix/ui";\n\nexport function Providers({ children }: { children: React.ReactNode }) {\n  return <ThemeProvider defaultTheme="system">{children}</ThemeProvider>;\n}`}
          />
          <CodeBlock
            title="app/layout.tsx"
            code={`import "./globals.css";\nimport { Providers } from "./providers";\n\nexport default function RootLayout({ children }: { children: React.ReactNode }) {\n  return (\n    <html lang="en" suppressHydrationWarning>\n      <body>\n        <Providers>{children}</Providers>\n      </body>\n    </html>\n  );\n}`}
          />
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">4. Use components anywhere</h2>
          <p className="mt-2 text-muted-foreground">
            Interactive components already declare{" "}
            <code className="font-mono text-sm">"use client"</code> internally, so you can drop them
            straight into Server Components. Presentational ones render on the server for free.
          </p>
          <CodeBlock
            title="app/page.tsx"
            code={`import { Button } from "@qeetrix/ui";\n\nexport default function Page() {\n  return <Button>Hello, Qeetrix</Button>;\n}`}
          />
          <p className="mt-2 text-sm text-muted-foreground">
            For the server/client mental model, read{" "}
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
