import type { Metadata } from "next";
import Link from "next/link";
import { InDevelopment, PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Releases",
  description:
    "Rich per-version release notes, produced from Changesets. Current channel is Canary/Preview (v0.4.0); v1.0 is planned.",
};

export default function ReleasesPage() {
  return (
    <PageShell
      title="Releases"
      status="In development"
      crumbs={[{ title: "Releases" }]}
      lead="Per-version release notes — highlights, additions, fixes, and any breaking changes — produced from Changesets for each published version."
    >
      <div className="space-y-6">
        <section>
          <h2 className="font-display text-xl font-semibold">How releases work</h2>
          <p className="mt-2 text-muted-foreground">
            Release notes are generated per version from the <strong>Changesets</strong> merged
            since the last release (ADR-0005). Recording a changeset with each change means every
            published version carries an accurate, human-readable summary rather than a
            hand-maintained list.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            The condensed history lives on{" "}
            <Link href="/changelog" className="text-brand-text underline-offset-4 hover:underline">
              Changelog
            </Link>
            ; the release process itself is documented under{" "}
            <Link href="/governance" className="text-brand-text underline-offset-4 hover:underline">
              Governance
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Current channel</h2>
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-sm text-muted-foreground">
              Qeetrix is on a <strong>Canary / Preview</strong> channel at{" "}
              <code className="font-mono text-sm text-brand-text">v0.4.0</code>. The API is still
              stabilising and may change ahead of <strong>v1.0</strong>, which is planned but not
              yet dated. Rich per-version notes will appear here as versioned releases begin
              publishing.
            </p>
          </div>
        </section>

        <section>
          <InDevelopment>
            Per-version release notes are generated from Changesets and will be listed here once
            versioned releases start publishing. Until then, the current preview is v0.4.0 with v1.0
            planned — no release history is fabricated.
          </InDevelopment>
        </section>
      </div>
    </PageShell>
  );
}
