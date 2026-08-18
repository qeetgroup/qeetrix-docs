import type { Metadata } from "next";
import Link from "next/link";
import { InDevelopment, PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Changelog",
  description: "Human-readable changes, generated from Changesets per release.",
};

export default function ChangelogPage() {
  return (
    <PageShell
      title="Changelog"
      status="In development"
      crumbs={[{ title: "Changelog" }]}
      lead="Every change that reaches consumers is recorded — and the changelog is assembled from those records, not written by hand."
    >
      <div className="space-y-6">
        <section>
          <h2 className="font-display text-xl font-semibold">How the changelog is produced</h2>
          <p className="mt-2 text-muted-foreground">
            Qeetrix uses <strong>Changesets</strong> (ADR-0005). Each consumer-affecting change
            ships with a changeset that declares its bump level and a short summary. At release time
            the tooling aggregates those changesets into per-package version entries — so the
            changelog is a faithful reflection of what actually shipped, never a fabricated list.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            The mechanics of a release are covered under{" "}
            <Link href="/governance" className="text-brand-text underline-offset-4 hover:underline">
              Governance
            </Link>
            , and rich per-version notes live on{" "}
            <Link href="/releases" className="text-brand-text underline-offset-4 hover:underline">
              Releases
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Entries</h2>
          <p className="mt-2 mb-4 text-muted-foreground">
            Qeetrix is pre-1.0 (v0.4.0). There is no published changelog history to show yet —
            rather than invent entries, this page will populate automatically from Changesets as
            versioned releases begin.
          </p>
          <InDevelopment>
            The changelog surface is live; entries will appear here, generated from Changesets, once
            versioned releases start publishing. No history exists to display before then.
          </InDevelopment>
        </section>
      </div>
    </PageShell>
  );
}
