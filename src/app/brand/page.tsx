import { QeetLogo, QeetLogoMark } from "@qeetrix/ui/brand";
import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Brand",
  description:
    "The Qeet brand system — logo, brand colour #F26D0E (OD-DS-03), typography, and voice.",
};

const RAMP: [string, string][] = [
  ["50", "#fff7ed"],
  ["100", "#ffedd5"],
  ["200", "#fed7aa"],
  ["300", "#fdba74"],
  ["400", "#fb923c"],
  ["500", "#f26d0e"],
  ["600", "#ea580c"],
  ["700", "#c2410c"],
];

export default function BrandPage() {
  return (
    <PageShell
      title="Brand"
      crumbs={[{ title: "Brand" }]}
      lead="Qeetrix is unmistakably Qeet — one brand colour, two typefaces, and a calm, confident voice."
    >
      <section>
        <h2 className="mb-3 font-display text-lg font-semibold">Logo</h2>
        <div className="flex flex-wrap items-center gap-8 rounded-xl border border-border bg-card p-8">
          <QeetLogo className="h-8 w-auto" />
          <QeetLogoMark className="h-10 w-auto" />
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Use the wordmark where space allows; use the mark for compact contexts (favicons,
          avatars). Keep clear space of at least the mark&rsquo;s height on all sides. The wordmark
          follows the text colour; the orange accent stays constant.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="mb-3 font-display text-lg font-semibold">Brand colour</h2>
        <p className="mb-3 text-sm text-muted-foreground">
          Qeet orange <strong>#F26D0E</strong> (token <code className="font-mono">OD-DS-03</code>)
          is the core. Re-brand by re-pointing the ramp in{" "}
          <code className="font-mono">tokens/primitive/color.json</code>.
        </p>
        <div className="flex overflow-hidden rounded-xl border border-border">
          {RAMP.map(([shade, hex]) => (
            <div key={shade} className="flex-1" title={hex}>
              <span className="block h-16" style={{ background: hex }} />
              <span className="block px-1 py-1 text-center font-mono text-[0.65rem] text-muted-foreground">
                {shade}
              </span>
            </div>
          ))}
        </div>
        <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
          <li>
            • <strong>500 (#F26D0E)</strong> — fills, large text, and UI accents (≈ 3.0:1 on white).
          </li>
          <li>
            • <strong>700 (#C2410C)</strong> — links and small text (≈ 5.2:1 on white, WCAG-AA).
          </li>
          <li>
            • <strong>400 (#FB923C)</strong> — links on the warm dark background.
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="mb-3 font-display text-lg font-semibold">Typography</h2>
        <div className="space-y-2 rounded-xl border border-border bg-card p-6">
          <p className="font-display text-3xl">Cal Sans Display</p>
          <p className="font-sans text-lg">Cal Sans Text — body copy and paragraphs.</p>
          <p className="font-mono text-sm">Fira Code — code and tokens. () =&gt; {"{}"}</p>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-3 font-display text-lg font-semibold">Voice</h2>
        <p className="text-sm text-muted-foreground">
          The Qeet name is a promise: <strong>Question · Explore · Envision · Transform</strong>.
          Copy is clear, confident, and second-person present tense. Reference material carries no
          marketing adjectives — it documents what shipped.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="mb-3 font-display text-lg font-semibold">Misuse</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border p-4">
            <p className="mb-2 text-sm font-semibold text-brand">Do</p>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Keep the orange for accents and key actions.</li>
              <li>• Use #C2410C for links and small text.</li>
              <li>• Give the logo clear space.</li>
            </ul>
          </div>
          <div className="rounded-xl border border-border p-4">
            <p className="mb-2 text-sm font-semibold text-destructive">Don&rsquo;t</p>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Set body text in pure #F26D0E on white.</li>
              <li>• Recolour or distort the logo.</li>
              <li>• Fill large areas with saturated orange.</li>
            </ul>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
