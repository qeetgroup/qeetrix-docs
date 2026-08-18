import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/code-block";
import { InDevelopment, PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Codemods",
  description:
    "jscodeshift transforms in the Qeetrix repo's codemods/ directory for automating breaking-change migrations — plus the planned @qeetrix/codemods package and qeetrix upgrade.",
};

export default function CodemodsPage() {
  return (
    <PageShell
      title="Codemods"
      crumbs={[{ title: "Develop", href: "/develop" }, { title: "Codemods" }]}
      lead="Breaking changes ship with codemods so upgrades are mechanical, not manual. They live as jscodeshift transforms in the Qeetrix repo's codemods/ directory today."
    >
      <section>
        <h2 className="font-display text-xl font-semibold">Run a transform</h2>
        <p className="mt-2 text-muted-foreground">
          Each transform is a plain <code className="font-mono">jscodeshift</code> script. Point it
          at your source with the TSX parser and the extensions you use:
        </p>
        <CodeBlock
          title="terminal"
          code={"npx jscodeshift -t <transform> --extensions=ts,tsx --parser=tsx src/"}
        />
        <p className="mt-2 text-sm text-muted-foreground">
          Add <code className="font-mono">--dry --print</code> first to preview the changes without
          writing them.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-xl font-semibold">Example: deep-import to barrel</h2>
        <p className="mt-2 text-muted-foreground">
          The <code className="font-mono">v0-to-v1/deep-import-to-barrel</code> transform rewrites
          deep component paths to the package barrel, so imports survive the file moves in a major
          version:
        </p>
        <CodeBlock
          title="terminal"
          code={
            "npx jscodeshift \\\n  -t codemods/transforms/v0-to-v1/deep-import-to-barrel.js \\\n  --extensions=ts,tsx --parser=tsx src/"
          }
        />
        <CodeBlock
          title="before → after"
          code={`- import { Button } from "@qeetrix/ui/components/button";\n- import { Card } from "@qeetrix/ui/components/card";\n+ import { Button, Card } from "@qeetrix/ui";`}
        />
      </section>

      <section className="mt-8">
        <h2 className="font-display text-xl font-semibold">Planned: one-command upgrades</h2>
        <p className="mt-2 text-muted-foreground">
          The transforms will be published as <code className="font-mono">@qeetrix/codemods</code>{" "}
          and wired into <code className="font-mono">qeetrix upgrade</code>, which selects and runs
          the right migrations for the version you&apos;re moving to.
        </p>
        <div className="mt-4">
          <InDevelopment>
            The transforms exist in the repo now. The published{" "}
            <code className="font-mono">@qeetrix/codemods</code> package and the{" "}
            <Link
              href="/develop/cli"
              className="text-brand-text underline-offset-4 hover:underline"
            >
              qeetrix upgrade
            </Link>{" "}
            command are planned and not yet shipped.
          </InDevelopment>
        </div>
      </section>
    </PageShell>
  );
}
