import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/code-block";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Installation",
  description:
    "Install @qeetrix/ui with Bun, npm, or pnpm; wire Tailwind v4, the stylesheet, providers, and peer dependencies.",
};

export default function InstallationPage() {
  return (
    <PageShell
      title="Installation"
      crumbs={[{ title: "Docs", href: "/docs" }, { title: "Installation" }]}
      lead="Qeetrix is one package. Install it, import the stylesheet, and add the providers."
    >
      <div className="space-y-8">
        <section>
          <h2 className="font-display text-xl font-semibold">Install the package</h2>
          <CodeBlock title="bun" code={"bun add @qeetrix/ui react react-dom tailwindcss"} />
          <CodeBlock title="npm" code={"npm install @qeetrix/ui react react-dom tailwindcss"} />
          <CodeBlock title="pnpm" code={"pnpm add @qeetrix/ui react react-dom tailwindcss"} />
          <p className="mt-2 text-muted-foreground">
            <strong>Peers:</strong> <code className="font-mono text-sm">react</code> and{" "}
            <code className="font-mono text-sm">react-dom</code> at{" "}
            <code className="font-mono text-sm">&gt;= 19</code>, plus{" "}
            <code className="font-mono text-sm">tailwindcss</code> at{" "}
            <code className="font-mono text-sm">&gt;= 4</code>.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Wire Tailwind v4 + styles</h2>
          <p className="mt-2 text-muted-foreground">
            Qeetrix is Tailwind v4, CSS-first (no{" "}
            <code className="font-mono text-sm">tailwind.config.js</code>). Import the stylesheet
            after Tailwind and point <code className="font-mono text-sm">@source</code> at the
            compiled package so utility classes are detected.
          </p>
          <CodeBlock
            title="globals.css"
            code={`@import "tailwindcss";\n@import "@qeetrix/ui/styles.css";\n@source "../node_modules/@qeetrix/ui/dist/**/*.js";`}
          />
          <p className="mt-2 text-sm text-muted-foreground">
            Also available: <code className="font-mono text-xs">@qeetrix/ui/tokens.css</code> (raw
            <code className="font-mono text-xs"> --qx-*</code>) and{" "}
            <code className="font-mono text-xs">@qeetrix/ui/tokens.json</code>.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Add the providers</h2>
          <p className="mt-2 text-muted-foreground">
            <code className="font-mono text-sm">ThemeProvider</code> is required for light/dark. Add{" "}
            <code className="font-mono text-sm">DirectionProvider</code> for RTL support.
          </p>
          <CodeBlock
            title="providers.tsx"
            code={`"use client";\nimport { ThemeProvider } from "@qeetrix/ui";\n\nexport function Providers({ children }) {\n  return <ThemeProvider defaultTheme="system">{children}</ThemeProvider>;\n}`}
          />
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Frameworks</h2>
          <p className="mt-2 text-muted-foreground">
            Qeetrix is <strong>React-only</strong>. It works in the Next.js App Router (components
            with interactivity are already <code className="font-mono text-sm">"use client"</code>),
            Vite, and Remix. See{" "}
            <Link
              href="/docs/frameworks/next"
              className="text-brand-text underline-offset-4 hover:underline"
            >
              framework guides
            </Link>{" "}
            and the{" "}
            <Link
              href="/docs/getting-started"
              className="text-brand-text underline-offset-4 hover:underline"
            >
              getting-started tutorial
            </Link>
            .
          </p>
        </section>
      </div>
    </PageShell>
  );
}
