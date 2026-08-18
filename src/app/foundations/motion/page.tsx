import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { tokensFor } from "@/lib/tokens";

export const metadata: Metadata = {
  title: "Motion",
  description:
    "Qeetrix motion tokens — durations and easing curves. Reduced motion is always respected.",
};

export default function MotionFoundationPage() {
  const durations = tokensFor("duration");
  const easings = tokensFor("easing");

  return (
    <PageShell
      title="Motion"
      crumbs={[{ title: "Foundations", href: "/foundations" }, { title: "Motion" }]}
      lead="Motion is purposeful. Durations and easing curves are tokenised so every transition feels part of one system. All non-essential motion yields to prefers-reduced-motion."
    >
      <style>{`
        @keyframes qx-motion-demo { from { transform: translateX(0); } to { transform: translateX(calc(100% - 1rem)); } }
        .qx-motion-dot { animation: qx-motion-demo 1.4s infinite alternate; }
        @media (prefers-reduced-motion: reduce) { .qx-motion-dot { animation: none; } }
      `}</style>

      <section>
        <h2 className="mb-4 font-display text-lg font-semibold">Easing</h2>
        <div className="space-y-4">
          {easings.map((e) => (
            <div key={e.path} className="flex items-center gap-4">
              <span className="w-56 shrink-0 font-mono text-xs text-muted-foreground">
                {e.name.replace("easing.", "")}
              </span>
              <span className="relative h-4 flex-1 rounded-full bg-muted">
                <span
                  className="qx-motion-dot absolute top-0 left-0 size-4 rounded-full bg-brand"
                  style={{ animationTimingFunction: e.light }}
                />
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-4 font-display text-lg font-semibold">Duration</h2>
        <div className="space-y-1.5">
          {durations.map((d) => (
            <div key={d.path} className="flex items-center gap-4">
              <span className="w-40 font-mono text-xs text-muted-foreground">
                {d.name.replace("duration.", "")}
              </span>
              <span className="font-mono text-sm">{d.light}</span>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
