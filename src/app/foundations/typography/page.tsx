import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { tokensFor } from "@/lib/tokens";

export const metadata: Metadata = {
  title: "Typography",
  description:
    "Qeetrix type — Cal Sans Display/Text/UI + Fira Code — and the font-size, weight, and line-height scales.",
};

export default function TypographyFoundationPage() {
  const font = tokensFor("font");
  const sizes = font.filter((t) => t.name.startsWith("size."));
  const weights = font.filter((t) => t.name.startsWith("weight."));

  return (
    <PageShell
      title="Typography"
      crumbs={[{ title: "Foundations", href: "/foundations" }, { title: "Typography" }]}
      lead="Cal Sans Display (headlines), Cal Sans Text (body), Cal Sans UI (controls), and Fira Code (mono). Headings use a -0.011em tracking and text-wrap: balance."
    >
      <section>
        <h2 className="mb-4 font-display text-lg font-semibold">Type scale</h2>
        <div className="space-y-4">
          {sizes.map((s) => (
            <div key={s.path} className="flex items-baseline gap-4 border-b border-border pb-3">
              <span className="w-40 shrink-0 font-mono text-xs text-muted-foreground">
                {s.name.replace("size.", "")} · {s.light}
              </span>
              <span className="truncate" style={{ fontSize: `min(${s.light}, 44px)` }}>
                The quick brown fox
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-4 font-display text-lg font-semibold">Families</h2>
        <div className="space-y-3">
          <p className="font-display text-2xl">Cal Sans Display — headlines &amp; hero</p>
          <p className="font-sans text-lg">Cal Sans Text — body copy and paragraphs.</p>
          <p className="font-mono text-sm">
            Fira Code — code, tokens, and terminals. () =&gt; {"{}"}
          </p>
        </div>
      </section>

      {weights.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 font-display text-lg font-semibold">Weights</h2>
          <div className="space-y-1">
            {weights.map((w) => (
              <p key={w.path} style={{ fontWeight: Number(w.light) || undefined }}>
                {w.name.replace("weight.", "")} — {w.light} — Qeetrix design system
              </p>
            ))}
          </div>
        </section>
      )}
    </PageShell>
  );
}
