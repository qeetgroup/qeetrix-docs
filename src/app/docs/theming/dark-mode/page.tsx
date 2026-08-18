import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/code-block";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Dark mode",
  description:
    "Dark mode in Qeetrix — the .dark class and ThemeProvider, how the brand behaves in the dark, and forced-colors support.",
};

export default function DarkModePage() {
  return (
    <PageShell
      title="Dark mode"
      crumbs={[
        { title: "Docs", href: "/docs" },
        { title: "Theming", href: "/docs/theming" },
        { title: "Dark mode" },
      ]}
      lead="Dark mode is a single class. Because every colour is a token, the whole system re-derives against dark surfaces automatically."
    >
      <div className="space-y-8">
        <section>
          <h2 className="font-display text-xl font-semibold">The .dark class</h2>
          <p className="mt-2 text-muted-foreground">
            Dark mode is the <code className="font-mono text-sm">.dark</code> class on{" "}
            <code className="font-mono text-sm">&lt;html&gt;</code>. Every token has a light and a
            dark value, so toggling the class swaps the entire palette — components read the same
            bridge variables either way. Drive it with{" "}
            <code className="font-mono text-sm">ThemeProvider</code> (default{" "}
            <code className="font-mono text-sm">"system"</code>), and read or set it with{" "}
            <code className="font-mono text-sm">useTheme</code>.
          </p>
          <CodeBlock
            title="theme-toggle.tsx"
            code={`"use client";\nimport { useTheme, Button } from "@qeetrix/ui";\n\nexport function ThemeToggle() {\n  const { theme, setTheme } = useTheme();\n  return (\n    <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>\n      Toggle theme\n    </Button>\n  );\n}`}
          />
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Avoid the flash</h2>
          <p className="mt-2 text-muted-foreground">
            To stop a light-then-dark flicker, the theme class must be set before the first paint.
            Add <code className="font-mono text-sm">suppressHydrationWarning</code> to{" "}
            <code className="font-mono text-sm">&lt;html&gt;</code> so the pre-hydration class does
            not trip a warning. <code className="font-mono text-sm">ThemeProvider</code> applies
            stored/system preference after hydration; applications that require zero flash must add
            a CSP-compatible pre-paint theme script in their host framework.
          </p>
          <CodeBlock title="app/layout.tsx" code={`<html lang="en" suppressHydrationWarning>`} />
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Dark surface hierarchy</h2>
          <p className="mt-2 text-muted-foreground">
            Dark mode uses four deliberate neutral levels: canvas at neutral 950, sidebar/subtle
            regions at 900, cards at 850, and elevated popovers at 800. Opaque neutral borders keep
            adjacent operational surfaces distinct. Do not flatten these roles into one near-black
            background or add one-off gray values inside components.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">The brand in the dark</h2>
          <p className="mt-2 text-muted-foreground">
            The brand hue stays constant — Qeet orange{" "}
            <span className="font-mono text-sm">#F26D0E</span> — but the shade used for links and
            small text shifts so it keeps its contrast. On light surfaces that shade darkens to{" "}
            <span className="font-mono text-sm">#C2410C</span>; on dark surfaces it lightens to
            about <span className="font-mono text-sm">#FB923C</span>. That is why{" "}
            <code className="font-mono text-sm">text-brand-text</code> stays legible in both modes
            while <code className="font-mono text-sm">text-brand</code> keeps the core hue for
            larger accents.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Forced colors</h2>
          <p className="mt-2 text-muted-foreground">
            Under a forced-colors mode (Windows High Contrast), the OS overrides colours entirely.
            Qeetrix maps semantic surfaces, text, borders, controls, and overlays to system color
            keywords. A token-driven <code className="font-mono text-sm">Highlight</code> outline
            remains visible after custom rings and shadows are removed. Charts and other complex
            visualizations still require text/table alternatives and cannot rely on this global
            color mapping alone.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            For token overrides, continue in the{" "}
            <Link
              href="/docs/theming"
              className="text-brand-text underline-offset-4 hover:underline"
            >
              theming overview
            </Link>
            .
          </p>
        </section>
      </div>
    </PageShell>
  );
}
