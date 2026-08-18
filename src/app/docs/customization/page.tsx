import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/code-block";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Customization",
  description:
    "Bend a Qeetrix component with className + cn(), extend cva variants, target data-slot, override CSS vars, or vendor via the registry.",
};

export default function CustomizationPage() {
  return (
    <PageShell
      title="Customization"
      crumbs={[{ title: "Docs", href: "/docs" }, { title: "Customization" }]}
      lead="Customisation is a ladder — start with a className, and only vendor the source when you truly need to own it."
    >
      <div className="space-y-8">
        <section>
          <h2 className="font-display text-xl font-semibold">1. Override with className + cn()</h2>
          <p className="mt-2 text-muted-foreground">
            Every component forwards <code className="font-mono text-sm">className</code> and merges
            it with <code className="font-mono text-sm">cn()</code> (clsx + tailwind-merge), so your
            classes win conflicts. This is the right tool for one-off spacing, width, or layout
            tweaks.
          </p>
          <CodeBlock
            title="usage.tsx"
            code={`import { Button } from "@qeetrix/ui";\n\n<Button className="w-full rounded-full">Full-width, pill</Button>;`}
          />
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">2. Extend the cva variants</h2>
          <p className="mt-2 text-muted-foreground">
            Variant recipes are exported alongside their components (for example{" "}
            <code className="font-mono text-sm">buttonVariants</code>,{" "}
            <code className="font-mono text-sm">badgeVariants</code>). Call them to reuse the same
            look on a different element, or compose a new variant on top with{" "}
            <code className="font-mono text-sm">cn()</code>.
          </p>
          <CodeBlock
            title="link-button.tsx"
            code={`import Link from "next/link";\nimport { buttonVariants } from "@qeetrix/ui";\n\n// Base UI Button uses a render prop, not asChild — style a Link directly:\n<Link href="/docs" className={buttonVariants({ variant: "outline", size: "sm" })}>\n  Read the docs\n</Link>;`}
          />
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">3. Target a data-slot</h2>
          <p className="mt-2 text-muted-foreground">
            Every internal part carries a stable{" "}
            <code className="font-mono text-sm">data-slot</code> attribute. Style inner parts from a
            parent without patching the component, using Tailwind arbitrary variants.
          </p>
          <CodeBlock
            title="dialog.css-in-jsx"
            code={`<Dialog className="[&_[data-slot=dialog-overlay]]:bg-background/80">\n  {/* ... */}\n</Dialog>`}
          />
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">4. Override CSS variables</h2>
          <p className="mt-2 text-muted-foreground">
            To reshape colour, radius, or elevation globally or per subtree, override the bridge
            variables — they resolve to the underlying{" "}
            <code className="font-mono text-sm">--qx-*</code> OKLCH ramps. Scope them to a wrapper
            for local changes.
          </p>
          <CodeBlock
            title="globals.css"
            code={
              ":root {\n  --primary: oklch(0.62 0.19 41);\n  --radius: 0.6rem;\n}\n\n/* Scoped override */\n.promo {\n  --primary: oklch(0.70 0.17 45);\n}"
            }
          />
          <p className="mt-2 text-sm text-muted-foreground">
            See the{" "}
            <Link href="/tokens" className="text-brand-text underline-offset-4 hover:underline">
              token reference
            </Link>{" "}
            for every variable.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">5. Vendor via the registry</h2>
          <p className="mt-2 text-muted-foreground">
            When you need to own the source — restructure the markup, remove parts, or fork
            behaviour — copy the component into your codebase through the{" "}
            <Link
              href="/develop/registry"
              className="text-brand-text underline-offset-4 hover:underline"
            >
              registry
            </Link>
            . Reach for this last: a vendored component no longer receives upstream fixes.
          </p>
        </section>
      </div>
    </PageShell>
  );
}
