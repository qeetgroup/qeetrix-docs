import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/code-block";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "RTL",
  description:
    "Right-to-left layout in Qeetrix — DirectionProvider, CSS logical properties, mirroring, and QEET_ICON_MIRROR.",
};

export default function RtlPage() {
  return (
    <PageShell
      title="RTL"
      crumbs={[{ title: "Docs", href: "/docs" }, { title: "RTL" }]}
      lead="Qeetrix is built with logical properties, so most components mirror for Arabic, Hebrew, and other RTL locales with no per-component work."
    >
      <div className="space-y-8">
        <section>
          <h2 className="font-display text-xl font-semibold">DirectionProvider</h2>
          <p className="mt-2 text-muted-foreground">
            <code className="font-mono text-sm">DirectionProvider</code> wraps Base UI's direction
            context — so menus, sliders, and popovers position correctly — and renders a wrapper
            carrying the <code className="font-mono text-sm">dir</code> attribute so CSS logical
            properties and Tailwind <code className="font-mono text-sm">rtl:</code> variants
            resolve. Use it for scoped regions; for a whole-app flip, also set{" "}
            <code className="font-mono text-sm">dir</code> on{" "}
            <code className="font-mono text-sm">&lt;html&gt;</code>.
          </p>
          <CodeBlock
            title="rtl-region.tsx"
            code={`import { DirectionProvider } from "@qeetrix/ui";\n\n<DirectionProvider direction="rtl">\n  {/* menus, sliders, etc. flip correctly */}\n  {app}\n</DirectionProvider>`}
          />
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Logical properties do the work</h2>
          <p className="mt-2 text-muted-foreground">
            Qeetrix components use logical Tailwind utilities throughout —{" "}
            <code className="font-mono text-sm">ps-</code>/
            <code className="font-mono text-sm">pe-</code>,{" "}
            <code className="font-mono text-sm">ms-</code>/
            <code className="font-mono text-sm">me-</code>,{" "}
            <code className="font-mono text-sm">start-</code>/
            <code className="font-mono text-sm">end-</code> — instead of physical{" "}
            <code className="font-mono text-sm">left</code>/
            <code className="font-mono text-sm">right</code>. When the direction flips, padding,
            margins, borders, and absolute positioning follow automatically. Keep this discipline in
            your own components and they mirror too.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Icon mirroring</h2>
          <p className="mt-2 text-muted-foreground">
            Most icons are non-directional and must <em>not</em> flip (a search glass, a gear). Only
            directional glyphs (a back arrow, a send icon) should mirror. Qeetrix records this
            intent in <code className="font-mono text-sm">QEET_ICON_MIRROR</code>, a map of icon
            name to a boolean, so tooling and consumers can flip only the icons that carry
            direction.
          </p>
          <CodeBlock
            title="mirror-lookup.ts"
            code={`import { QEET_ICON_MIRROR } from "@qeetrix/ui/brand";\n\n// true only for icons whose meaning depends on reading direction\nconst shouldFlip = QEET_ICON_MIRROR["IconArrowBack"] ?? false;`}
          />
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Compose with i18n</h2>
          <p className="mt-2 text-muted-foreground">
            Direction and language are separate concerns — pair{" "}
            <code className="font-mono text-sm">DirectionProvider</code> with{" "}
            <code className="font-mono text-sm">I18nProvider</code> for a translated, mirrored UI.
            See{" "}
            <Link href="/docs/i18n" className="text-brand-text underline-offset-4 hover:underline">
              Internationalization
            </Link>
            .
          </p>
        </section>
      </div>
    </PageShell>
  );
}
