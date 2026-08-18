import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/code-block";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Theming",
  description:
    "Light/dark via the .dark class and ThemeProvider, and overriding design tokens with CSS variables.",
};

export default function ThemingPage() {
  return (
    <PageShell
      title="Theming"
      crumbs={[{ title: "Docs", href: "/docs" }, { title: "Theming" }]}
      lead="Qeetrix is fully tokenised. Switch light/dark or override tokens — all through CSS variables."
    >
      <div className="space-y-8">
        <section>
          <h2 className="font-display text-xl font-semibold">Light &amp; dark</h2>
          <p className="mt-2 text-muted-foreground">
            Dark mode is the <code className="font-mono text-sm">.dark</code> class on{" "}
            <code className="font-mono text-sm">&lt;html&gt;</code>, managed by{" "}
            <code className="font-mono text-sm">ThemeProvider</code> (default{" "}
            <code className="font-mono text-sm">"system"</code>). Read or set it with{" "}
            <code className="font-mono text-sm">useTheme</code>.
          </p>
          <CodeBlock
            title="theme-toggle.tsx"
            code={`"use client";\nimport { useTheme, Button } from "@qeetrix/ui";\n\nexport function ThemeToggle() {\n  const { theme, setTheme } = useTheme();\n  return (\n    <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>\n      Toggle theme\n    </Button>\n  );\n}`}
          />
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Overriding tokens</h2>
          <p className="mt-2 text-muted-foreground">
            Components consume the unprefixed shadcn bridge variables (
            <code className="font-mono text-sm">--primary</code>,{" "}
            <code className="font-mono text-sm">--ring</code>, …), which resolve to the OKLCH{" "}
            <code className="font-mono text-sm">--qx-*</code> ramps. Override either layer in your
            own CSS.
          </p>
          <CodeBlock
            title="globals.css"
            code={
              ":root {\n  --primary: oklch(0.62 0.19 41);   /* your brand primary */\n  --radius: 0.6rem;\n}\n.dark {\n  --primary: oklch(0.70 0.17 45);\n}"
            }
          />
          <p className="mt-2 text-sm text-muted-foreground">
            Browse every variable in the{" "}
            <Link href="/tokens" className="text-brand-text underline-offset-4 hover:underline">
              token reference
            </Link>
            .
          </p>
        </section>
      </div>
    </PageShell>
  );
}
