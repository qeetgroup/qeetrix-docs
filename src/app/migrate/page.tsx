import type { Metadata } from "next";
import Link from "next/link";
import { InDevelopment, PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Migrate",
  description:
    "The Qeetrix migration approach — every breaking major ships a required codemod, per-component before/after guidance, and deprecation warnings ahead of removal. No majors have shipped yet.",
};

export default function MigratePage() {
  return (
    <PageShell
      title="Migrate"
      status="In development"
      crumbs={[{ title: "Migrate" }]}
      lead="Upgrading across a breaking major should be mechanical, not archaeological. Here is the approach every future major will follow."
    >
      <div className="space-y-6">
        <section>
          <h2 className="font-display text-xl font-semibold">The migration contract</h2>
          <p className="mt-2 text-muted-foreground">
            When Qeetrix does introduce a breaking change, the burden of upgrading is designed to
            fall on tooling, not on you. Three guarantees hold for every breaking major:
          </p>
          <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
            <li>
              • <strong>A required codemod</strong> — every breaking major ships a codemod that
              mechanically applies the change across your codebase.
            </li>
            <li>
              • <strong>Per-component before/after</strong> — the migration guide shows the exact
              old and new usage for each affected component or token.
            </li>
            <li>
              • <strong>Deprecation warnings first</strong> — anything being removed emits a
              dev-mode console warning for several minor releases before the major that removes it.
            </li>
          </ul>
          <p className="mt-3 text-sm text-muted-foreground">
            This mirrors the deprecation and versioning policy on{" "}
            <Link href="/governance" className="text-brand-text underline-offset-4 hover:underline">
              Governance
            </Link>
            . Codemods for breaking changes are a Phase C roadmap item — see{" "}
            <Link href="/roadmap" className="text-brand-text underline-offset-4 hover:underline">
              Roadmap
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Guides</h2>
          <p className="mt-2 mb-4 text-muted-foreground">
            Qeetrix is pre-1.0 (v0.4.0) and <strong>no major versions have shipped</strong>, so
            there are no migration guides to follow yet. Each future major will add its own guide
            and codemod here — none will be invented before a real breaking change exists.
          </p>
          <InDevelopment>
            No breaking majors have shipped, so there are no migration guides or codemods yet. When
            the first breaking major lands, its per-component before/after guide and required
            codemod will be published here.
          </InDevelopment>
        </section>
      </div>
    </PageShell>
  );
}
