import type { Metadata } from "next";
import Link from "next/link";
import { InDevelopment, PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "RFCs",
  description:
    "The Qeetrix RFC process — draft, discussion, accepted or rejected, then shipped. When an RFC is required, and how RFCs relate to ADRs.",
};

const STAGES: { stage: string; desc: string }[] = [
  {
    stage: "Draft",
    desc: "An author writes up the problem, the proposed change, alternatives considered, and the impact on the public API and tokens.",
  },
  {
    stage: "Discussion",
    desc: "The core team and contributors review the draft, surface concerns, and refine the proposal in the open.",
  },
  {
    stage: "Accepted / Rejected",
    desc: "The core team decides. An accepted RFC becomes the plan of record; a rejected one keeps its rationale for the archive.",
  },
  {
    stage: "Shipped",
    desc: "The accepted change is implemented, passes every quality gate, and lands with a changeset.",
  },
];

export default function RfcsPage() {
  return (
    <PageShell
      title="RFCs"
      status="In development"
      crumbs={[{ title: "RFCs" }]}
      lead="Substantial changes are proposed and debated in the open before code is written — so the direction is agreed before the effort is spent."
    >
      <div className="space-y-8">
        <section>
          <h2 className="font-display text-xl font-semibold">The process</h2>
          <p className="mt-2 text-muted-foreground">
            A Request for Comments moves through four stages:
          </p>
          <div className="mt-4 space-y-2">
            {STAGES.map((s) => (
              <div key={s.stage} className="rounded-xl border border-border bg-card p-4">
                <p className="text-sm font-semibold text-foreground">{s.stage}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">When an RFC is required</h2>
          <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
            <li>
              • <strong>New components or blocks</strong> that add public API surface.
            </li>
            <li>
              • <strong>Breaking changes</strong> to any component, prop, or design token.
            </li>
            <li>• Changes to the token pipeline, theming model, or release process.</li>
          </ul>
          <p className="mt-3 text-sm text-muted-foreground">
            Bug fixes, docs, and small additive props do not need an RFC — go straight to the{" "}
            <Link
              href="/contributing"
              className="text-brand-text underline-offset-4 hover:underline"
            >
              contributing flow
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">RFCs and ADRs</h2>
          <p className="mt-2 text-muted-foreground">
            An RFC is the <strong>proposal and debate</strong>; an{" "}
            <Link href="/governance" className="text-brand-text underline-offset-4 hover:underline">
              ADR
            </Link>{" "}
            is the <strong>durable record of the decision</strong> that results. When an RFC settles
            a significant, hard-to-reverse question, its outcome is captured as an ADR so the
            rationale outlives the discussion thread.
          </p>
        </section>

        <section>
          <InDevelopment>
            The RFC process is defined, but no public RFCs are listed yet. Accepted and in-flight
            RFCs will appear here as the practice rolls out — no proposals are fabricated in the
            meantime.
          </InDevelopment>
        </section>
      </div>
    </PageShell>
  );
}
