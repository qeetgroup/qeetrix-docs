import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/code-block";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Vite",
  description:
    "Wire Qeetrix into a Vite project — the @tailwindcss/vite plugin (recommended) or PostCSS, plus the @source glob.",
};

export default function ViteFrameworkPage() {
  return (
    <PageShell
      title="Vite"
      crumbs={[
        { title: "Docs", href: "/docs" },
        { title: "Frameworks", href: "/docs/frameworks/next" },
        { title: "Vite" },
      ]}
      lead="Vite is the fastest way to run Qeetrix outside Next.js. The only thing to get right is how Tailwind v4 is wired."
    >
      <div className="space-y-8">
        <section>
          <h2 className="font-display text-xl font-semibold">Install</h2>
          <CodeBlock
            title="bun"
            code={"bun add @qeetrix/ui\nbun add -D tailwindcss @tailwindcss/vite"}
          />
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">
            Option A — @tailwindcss/vite (recommended)
          </h2>
          <p className="mt-2 text-muted-foreground">
            The dedicated Vite plugin is the fastest path in Tailwind v4. Add it to your Vite
            config.
          </p>
          <CodeBlock
            title="vite.config.ts"
            code={`import { defineConfig } from "vite";\nimport react from "@vitejs/plugin-react";\nimport tailwindcss from "@tailwindcss/vite";\n\nexport default defineConfig({\n  plugins: [react(), tailwindcss()],\n});`}
          />
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Option B — PostCSS</h2>
          <p className="mt-2 text-muted-foreground">
            If you already run a PostCSS pipeline, use{" "}
            <code className="font-mono text-sm">@tailwindcss/postcss</code> instead of the Vite
            plugin.
          </p>
          <CodeBlock
            title="postcss.config.mjs"
            code={`export default {\n  plugins: {\n    "@tailwindcss/postcss": {},\n  },\n};`}
          />
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Import styles + @source</h2>
          <p className="mt-2 text-muted-foreground">
            Either way, your CSS entry imports Tailwind and the Qeetrix stylesheet, and declares the{" "}
            <code className="font-mono text-sm">@source</code> glob so Tailwind scans the compiled
            components. Adjust the relative path to match where your CSS file sits.
          </p>
          <CodeBlock
            title="src/index.css"
            code={`@import "tailwindcss";\n@import "@qeetrix/ui/styles.css";\n@source "../node_modules/@qeetrix/ui/dist/**/*.js";`}
          />
          <p className="mt-2 text-sm text-muted-foreground">
            From here the setup is identical to any React SPA — see the{" "}
            <Link
              href="/docs/frameworks/react"
              className="text-brand-text underline-offset-4 hover:underline"
            >
              React (SPA) guide
            </Link>{" "}
            for mounting the provider.
          </p>
        </section>
      </div>
    </PageShell>
  );
}
