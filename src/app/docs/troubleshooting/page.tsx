import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/code-block";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Troubleshooting",
  description:
    "Fixes for the common Qeetrix setup snags — unstyled output, Tailwind @source globs, hydration mismatches, dark-mode flash, and version skew.",
};

export default function TroubleshootingPage() {
  return (
    <PageShell
      title="Troubleshooting"
      crumbs={[{ title: "Docs", href: "/docs" }, { title: "Troubleshooting" }]}
      lead="Almost every first-run issue traces back to one of five causes. Here they are, with the fix."
    >
      <div className="space-y-8">
        <section>
          <h2 className="font-display text-xl font-semibold">Components render unstyled</h2>
          <p className="mt-2 text-muted-foreground">
            Tailwind is not scanning the compiled package, so the utility classes Qeetrix uses are
            never generated. Add the <code className="font-mono text-sm">@source</code> glob to the
            CSS file that imports Tailwind, and check the relative path actually reaches your{" "}
            <code className="font-mono text-sm">node_modules</code>.
          </p>
          <CodeBlock
            title="globals.css"
            code={`@import "tailwindcss";\n@import "@qeetrix/ui/styles.css";\n@source "../node_modules/@qeetrix/ui/dist/**/*.js";`}
          />
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Flash of unstyled content (FOUC)</h2>
          <p className="mt-2 text-muted-foreground">
            Import <code className="font-mono text-sm">@qeetrix/ui/styles.css</code> from your
            global stylesheet (which loads in{" "}
            <code className="font-mono text-sm">&lt;head&gt;</code>), not lazily inside a client
            component. In the App Router, import it in the root layout so styles ship with the first
            byte.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Dark-mode flash on load</h2>
          <p className="mt-2 text-muted-foreground">
            A brief light-then-dark flicker means the theme class is applied after paint. Add{" "}
            <code className="font-mono text-sm">suppressHydrationWarning</code> to{" "}
            <code className="font-mono text-sm">&lt;html&gt;</code> and let{" "}
            <code className="font-mono text-sm">ThemeProvider</code> set the class before hydration.
            See the{" "}
            <Link
              href="/docs/theming/dark-mode"
              className="text-brand-text underline-offset-4 hover:underline"
            >
              dark-mode guide
            </Link>
            .
          </p>
          <CodeBlock title="app/layout.tsx" code={`<html lang="en" suppressHydrationWarning>`} />
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Hydration mismatch</h2>
          <p className="mt-2 text-muted-foreground">
            Mismatches usually come from rendering theme- or locale-dependent output on the server
            that differs on the client, or from putting a provider below where its consumers render.
            Keep <code className="font-mono text-sm">ThemeProvider</code> and{" "}
            <code className="font-mono text-sm">DirectionProvider</code> above every component that
            reads them, and avoid <code className="font-mono text-sm">typeof window</code> checks in
            render.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Version skew</h2>
          <p className="mt-2 text-muted-foreground">
            Qeetrix is pre-1.0 (<code className="font-mono text-sm">v0.4.0</code>) — mixing minor
            versions across a workspace can produce duplicate styles or type errors. Pin a single
            version, dedupe React and React DOM to one copy (both{" "}
            <code className="font-mono text-sm">&gt;= 19</code>), and read the{" "}
            <Link href="/changelog" className="text-brand-text underline-offset-4 hover:underline">
              changelog
            </Link>{" "}
            before upgrading.
          </p>
        </section>
      </div>
    </PageShell>
  );
}
