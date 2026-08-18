import { Sparkles } from "lucide-react";
import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { tokensFor } from "@/lib/tokens";

export const metadata: Metadata = {
  title: "Iconography",
  description: "Qeetrix icon sizing and stroke tokens — used by lucide and the Qeet brand icons.",
};

const px = (v: string) => Number.parseFloat(v) || 16;

export default function IconographyFoundationPage() {
  const icon = tokensFor("icon");
  const sizes = icon.filter((t) => t.name.startsWith("size."));
  const strokes = icon.filter((t) => t.name.startsWith("stroke."));

  return (
    <PageShell
      title="Iconography"
      crumbs={[{ title: "Foundations", href: "/foundations" }, { title: "Iconography" }]}
      lead="Icons use lucide plus the Qeet brand set, standardised through the <Icon> wrapper. Sizing and stroke width come from --qx-icon-* tokens."
    >
      <section>
        <h2 className="mb-4 font-display text-lg font-semibold">Sizes</h2>
        <div className="flex flex-wrap items-end gap-6">
          {sizes.map((s) => (
            <div key={s.path} className="flex flex-col items-center gap-2">
              <Sparkles
                style={{ width: px(s.light), height: px(s.light) }}
                className="text-brand"
              />
              <span className="font-mono text-xs text-muted-foreground">
                {s.name.replace("size.", "")} · {s.light}
              </span>
            </div>
          ))}
        </div>
      </section>

      {strokes.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 font-display text-lg font-semibold">Stroke widths</h2>
          <div className="flex flex-wrap items-end gap-6">
            {strokes.map((s) => (
              <div key={s.path} className="flex flex-col items-center gap-2">
                <Sparkles className="size-8 text-foreground" strokeWidth={px(s.light)} />
                <span className="font-mono text-xs text-muted-foreground">
                  {s.name.replace("stroke.", "")} · {s.light}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </PageShell>
  );
}
