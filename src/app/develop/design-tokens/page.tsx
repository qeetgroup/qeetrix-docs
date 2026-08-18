import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/code-block";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Consuming design tokens",
  description:
    "Use Qeetrix's --qx-* OKLCH tokens programmatically — the raw tokens.css, resolved tokens.json, and semantic qeetrix.css exports of @qeetrix/ui.",
};

const EXPORTS = [
  [
    "@qeetrix/ui/tokens.css",
    "Every primitive as a raw --qx-* custom property (OKLCH). Import once and reference vars anywhere.",
  ],
  [
    "@qeetrix/ui/tokens.json",
    "The same tokens resolved to concrete light and dark values — read them in JS/TS at build or runtime.",
  ],
  [
    "@qeetrix/ui/qeetrix.css",
    "Semantic roles (background, foreground, brand, border, …) mapped onto the primitives and flipped by the .dark class.",
  ],
  [
    "@qeetrix/ui",
    "Generated typed constants for motion, icons, stacking, component metrics, elevation, state opacity, and chart CSS references.",
  ],
];

export default function DesignTokensPage() {
  return (
    <PageShell
      title="Consuming design tokens"
      crumbs={[{ title: "Develop", href: "/develop" }, { title: "Design tokens" }]}
      lead="Qeetrix tokens are authored as DTCG JSON, compiled by Style Dictionary to CSS, JSON, and typed constants, and gated for contrast and raw-value usage."
    >
      <section>
        <h2 className="font-display text-xl font-semibold">Token exports</h2>
        <div className="mt-3 divide-y divide-border rounded-xl border border-border">
          {EXPORTS.map(([path, desc]) => (
            <div key={path} className="p-3">
              <code className="font-mono text-sm text-brand-text">{path}</code>
              <p className="mt-0.5 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          If you already import <code className="font-mono">@qeetrix/ui/styles.css</code>, the raw
          and semantic layers are baked in — the standalone exports are for consuming tokens outside
          a full styles install.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-xl font-semibold">Read a token in CSS</h2>
        <p className="mt-2 text-muted-foreground">
          Import the raw layer once, then reference any primitive with{" "}
          <code className="font-mono">var()</code>:
        </p>
        <CodeBlock
          title="app.css"
          code={`@import "@qeetrix/ui/tokens.css";\n\n.promo {\n  /* OKLCH primitive, straight from the ramp */\n  background: var(--qx-color-brand-500);\n  color: var(--qx-color-neutral-50);\n  border-radius: var(--qx-radius-lg);\n}`}
        />
        <p className="mt-2 text-sm text-muted-foreground">
          Prefer semantic roles from <code className="font-mono">qeetrix.css</code> (for example{" "}
          <code className="font-mono">var(--background)</code>) when you want automatic light/dark
          behaviour; reach for raw <code className="font-mono">--qx-*</code> vars when you need a
          specific ramp step.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-xl font-semibold">Read tokens in JS / TS</h2>
        <p className="mt-2 text-muted-foreground">
          Import resolved JSON for build-time or non-CSS surfaces, or use generated constants for
          runtime values that Qeetrix exposes as a stable API:
        </p>
        <CodeBlock
          title="chart-theme.ts"
          code={`import { CHART_COLOR, DURATION, Z_INDEX } from "@qeetrix/ui";\nimport tokens from "@qeetrix/ui/tokens.json";\n\n// Generated CSS references for browser charts.\nexport const chartPalette = [CHART_COLOR.series1, CHART_COLOR.series2];\n\n// Resolved values for non-CSS output.\nexport const emailBrand = tokens.light.color.brand["500"];\n\n// Typed runtime constants stay in parity with DTCG source.\nexport const overlayTiming = DURATION.standard;\nexport const toastLayer = Z_INDEX.toast;`}
        />
        <p className="mt-2 text-sm text-muted-foreground">
          Because the JSON is generated from the same DTCG source as the CSS, the two never drift.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-xl font-semibold">Enforcement</h2>
        <p className="mt-2 text-muted-foreground">
          CI scans production components and blocks. Literal colours, arbitrary numeric z-index
          values, arbitrary coloured shadows, and legacy disabled-opacity utilities fail unless a
          narrow domain exemption includes an explicit reason.
        </p>
        <CodeBlock title="validation" code={"bun run tokens:validate\nbun run tokens:scan"} />
      </section>

      <section className="mt-8">
        <h2 className="font-display text-xl font-semibold">Related</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Browse the full token reference on{" "}
          <Link href="/tokens" className="text-brand-text underline-offset-4 hover:underline">
            Tokens
          </Link>
          , or learn how to override them per-brand on{" "}
          <Link href="/theme" className="text-brand-text underline-offset-4 hover:underline">
            Theme
          </Link>
          .
        </p>
      </section>
    </PageShell>
  );
}
