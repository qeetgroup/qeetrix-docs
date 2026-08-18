import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/code-block";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Best practices",
  description:
    "Build well with Qeetrix — compose over configure, keep token discipline (no-raw-color), and choose blocks vs components deliberately.",
};

export default function BestPracticesPage() {
  return (
    <PageShell
      title="Best practices"
      crumbs={[{ title: "Docs", href: "/docs" }, { title: "Best practices" }]}
      lead="A handful of habits keep a Qeetrix codebase consistent, accessible, and easy to re-theme."
    >
      <div className="space-y-8">
        <section>
          <h2 className="font-display text-xl font-semibold">Compose, don't configure</h2>
          <p className="mt-2 text-muted-foreground">
            Qeetrix favours small, composable parts over monolithic components with dozens of props.
            Assemble a Card from <code className="font-mono text-sm">CardHeader</code>,{" "}
            <code className="font-mono text-sm">CardTitle</code>,{" "}
            <code className="font-mono text-sm">CardContent</code>, and{" "}
            <code className="font-mono text-sm">CardFooter</code> rather than reaching for a{" "}
            <code className="font-mono text-sm">footerActions</code> prop. Composition reads clearly
            and bends to layouts a prop API never anticipated.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Token discipline</h2>
          <p className="mt-2 text-muted-foreground">
            Never hard-code a colour. Use the semantic utilities —{" "}
            <code className="font-mono text-sm">bg-background</code>,{" "}
            <code className="font-mono text-sm">text-muted-foreground</code>,{" "}
            <code className="font-mono text-sm">text-brand</code>,{" "}
            <code className="font-mono text-sm">border-border</code> — so light/dark and every brand
            overlay recolour your UI for free. Qeetrix enforces this with a shared{" "}
            <code className="font-mono text-sm">no-raw-color</code> ESLint rule that fails the build
            on raw hex in <code className="font-mono text-sm">className</code> or{" "}
            <code className="font-mono text-sm">style</code>.
          </p>
          <CodeBlock
            title="colour-discipline.tsx"
            code={`// Bad — invisible in dark mode, ignores brand overlays, fails lint\n<div className="bg-[#F26D0E] text-white" />\n\n// Good — recolours with theme and brand automatically\n<div className="bg-brand text-primary-foreground" />`}
          />
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Blocks vs components</h2>
          <p className="mt-2 text-muted-foreground">
            Reach for a <strong>block</strong> when you want a whole proven pattern — an auth
            screen, a dashboard shell, an onboarding wizard, a pricing table, a settings layout.
            Reach for <strong>components</strong> when you are building a bespoke screen and want
            full control of the composition. Blocks are opinionated starting points built from the
            same components, so you can drop one in and later break it apart if you outgrow it.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Browse the{" "}
            <Link href="/blocks" className="text-brand-text underline-offset-4 hover:underline">
              6 blocks
            </Link>{" "}
            and the{" "}
            <Link href="/components" className="text-brand-text underline-offset-4 hover:underline">
              145 UI modules
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Accessibility by default</h2>
          <p className="mt-2 text-muted-foreground">
            Preserve the roles and labelling Qeetrix ships — always give inputs a{" "}
            <code className="font-mono text-sm">FieldLabel</code>, keep focus states visible, and
            pair icon-only buttons with accessible names. Contrast is already AA-gated in the
            tokens; do not override colours in ways that break it. Test with{" "}
            <Link
              href="/docs/testing"
              className="text-brand-text underline-offset-4 hover:underline"
            >
              vitest-axe
            </Link>
            .
          </p>
        </section>
      </div>
    </PageShell>
  );
}
