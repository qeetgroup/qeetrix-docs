import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/code-block";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Remix",
  description:
    "Use Qeetrix in Remix — link the stylesheet from the root route and mount providers in the app shell.",
};

export default function RemixFrameworkPage() {
  return (
    <PageShell
      title="Remix"
      crumbs={[
        { title: "Docs", href: "/docs" },
        { title: "Frameworks", href: "/docs/frameworks/next" },
        { title: "Remix" },
      ]}
      lead="Remix renders on the server and hydrates on the client. Qeetrix's interactive components already carry their own client boundary, so setup is mostly styling."
    >
      <div className="space-y-8">
        <section>
          <h2 className="font-display text-xl font-semibold">Install</h2>
          <CodeBlock title="bun" code={"bun add @qeetrix/ui"} />
          <p className="mt-2 text-muted-foreground">
            Ensure React and React DOM are <code className="font-mono text-sm">&gt;= 19</code>.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Wire Tailwind + styles</h2>
          <p className="mt-2 text-muted-foreground">
            Set up Tailwind v4 for Remix (the Vite plugin, since modern Remix builds on Vite), then
            create a CSS entry that imports Tailwind and the Qeetrix stylesheet with the{" "}
            <code className="font-mono text-sm">@source</code> glob.
          </p>
          <CodeBlock
            title="app/tailwind.css"
            code={`@import "tailwindcss";\n@import "@qeetrix/ui/styles.css";\n@source "../node_modules/@qeetrix/ui/dist/**/*.js";`}
          />
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Link it from the root route</h2>
          <p className="mt-2 text-muted-foreground">
            Export the stylesheet from the root <code className="font-mono text-sm">links</code>{" "}
            function and render it in the document via{" "}
            <code className="font-mono text-sm">&lt;Links /&gt;</code>.
          </p>
          <CodeBlock
            title="app/root.tsx"
            code={`import type { LinksFunction } from "@remix-run/node";\nimport { Links, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";\nimport { ThemeProvider } from "@qeetrix/ui";\nimport styles from "./tailwind.css?url";\n\nexport const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];\n\nexport default function App() {\n  return (\n    <html lang="en" suppressHydrationWarning>\n      <head>\n        <Links />\n      </head>\n      <body>\n        <ThemeProvider defaultTheme="system">\n          <Outlet />\n        </ThemeProvider>\n        <ScrollRestoration />\n        <Scripts />\n      </body>\n    </html>\n  );\n}`}
          />
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Then use components anywhere</h2>
          <p className="mt-2 text-muted-foreground">
            Import components in any route module — interactive ones hydrate automatically. The
            server/client concepts carry over from the{" "}
            <Link href="/docs/ssr" className="text-brand-text underline-offset-4 hover:underline">
              SSR &amp; RSC
            </Link>{" "}
            guide.
          </p>
        </section>
      </div>
    </PageShell>
  );
}
