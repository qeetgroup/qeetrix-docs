import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/code-block";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Indic typography",
  description:
    "Rendering Indic scripts in Qeetrix — the Indic font-family and line-height tokens, scoping by language, and avoiding clipping.",
};

export default function IndicTypographyPage() {
  return (
    <PageShell
      title="Indic typography"
      crumbs={[{ title: "Docs", href: "/docs" }, { title: "Indic typography" }]}
      lead="Cal Sans covers Latin only. For Devanagari, Bengali, Tamil, Telugu, Kannada, Gujarati, and Gurmukhi, Qeetrix ships an Indic fallback stack and a taller line-height."
    >
      <div className="space-y-8">
        <section>
          <h2 className="font-display text-xl font-semibold">The two tokens</h2>
          <p className="mt-2 text-muted-foreground">
            Indic scripts stack combining marks vertically, so the Latin metrics that suit Cal Sans
            clip conjuncts and matras. Qeetrix exposes two design tokens for this:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">
            <li>
              <code className="font-mono text-sm">--qx-font-family-indic</code> — a Noto-based
              fallback stack. The fonts are <strong>not</strong> bundled; self-host or load the ones
              your locales need. The stack degrades to the system's Indic fonts otherwise.
            </li>
            <li>
              <code className="font-mono text-sm">--qx-font-line-height-indic</code> (1.75) — extra
              vertical space so stacked marks are not clipped.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Scope by language</h2>
          <p className="mt-2 text-muted-foreground">
            Apply the tokens with a <code className="font-mono text-sm">:lang()</code> selector so
            only Indic content switches font — Latin text keeps Cal Sans. Set{" "}
            <code className="font-mono text-sm">lang</code> on the relevant subtree (or{" "}
            <code className="font-mono text-sm">&lt;html&gt;</code>) and load the required Noto
            fonts.
          </p>
          <CodeBlock
            title="globals.css"
            code={
              ":lang(hi), :lang(bn), :lang(ta), :lang(te), :lang(kn), :lang(gu), :lang(pa) {\n  font-family: var(--qx-font-family-indic);\n  line-height: var(--qx-font-line-height-indic);\n}"
            }
          />
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Avoiding clipping</h2>
          <p className="mt-2 text-muted-foreground">
            Beyond the line-height token, avoid fixed-height containers for Indic text, keep{" "}
            <code className="font-mono text-sm">overflow</code> visible on single-line labels that
            may carry tall conjuncts, and prefer padding over exact heights on buttons and inputs.
            Test with real strings — a Devanagari word like नमस्ते stacks higher than its Latin
            transliteration.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Direction</h2>
          <p className="mt-2 text-muted-foreground">
            These scripts are left-to-right, so no{" "}
            <code className="font-mono text-sm">DirectionProvider</code> is needed. Combine with it
            only for RTL scripts (Arabic, Hebrew, Urdu) — see{" "}
            <Link href="/docs/rtl" className="text-brand-text underline-offset-4 hover:underline">
              RTL
            </Link>
            . Full details live in the repo at{" "}
            <code className="font-mono text-sm">docs/indic-typography.md</code>.
          </p>
        </section>
      </div>
    </PageShell>
  );
}
