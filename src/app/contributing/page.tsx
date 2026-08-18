import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/code-block";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Contributing",
  description:
    "The end-to-end contributor flow for Qeetrix — local setup with Bun, adding a Base UI component with cva + cn() + data-slot, writing a Storybook story and a Vitest + axe test, recording a changeset, and passing every quality gate before merge.",
};

export default function ContributingPage() {
  return (
    <PageShell
      title="Contributing"
      crumbs={[{ title: "Contributing" }]}
      lead="From a fresh clone to a merged component — the exact steps, conventions, and gates a contribution passes through."
    >
      <div className="space-y-10">
        <section>
          <h2 className="font-display text-xl font-semibold">1. Local setup</h2>
          <p className="mt-2 text-muted-foreground">
            Qeetrix is a <strong>Bun</strong> + Turborepo monorepo — Bun is the only supported
            package manager. Install once, then build{" "}
            <code className="font-mono text-sm">@qeetrix/ui</code> (its build regenerates design
            tokens before compiling).
          </p>
          <CodeBlock
            title="terminal"
            code={`bun install               # install the whole workspace
bun run build             # compile @qeetrix/ui (tokens regenerated first)
bun run story:dev         # Storybook workshop on :6006
bun run docs:dev          # ui.qeet.in docs app on :3006`}
          />
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">2. Add a component</h2>
          <p className="mt-2 text-muted-foreground">
            Scaffold with the shadcn CLI into the single package. New components live in{" "}
            <code className="font-mono text-sm">packages/ui/src/components/ui/</code>.
          </p>
          <CodeBlock title="terminal" code={"npx shadcn@latest add <name>"} />
          <p className="mt-3 text-muted-foreground">
            Then bring it in line with Qeetrix conventions:
          </p>
          <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
            <li>
              • <strong>Base UI only</strong> — headless primitives come from Base UI, never Radix
              (ADR-0002). Swap any Radix import.
            </li>
            <li>
              •{" "}
              <strong>
                Variants via <code className="font-mono">cva</code>
              </strong>{" "}
              and class merging via <code className="font-mono">cn()</code> — no ad-hoc conditional
              class strings.
            </li>
            <li>
              •{" "}
              <strong>
                Tag every element with <code className="font-mono">data-slot</code>
              </strong>{" "}
              so consumers can target parts predictably.
            </li>
            <li>
              • <strong>Tokens only</strong> — style with semantic utilities; the{" "}
              <code className="font-mono">no-raw-color</code> lint rule rejects hard-coded colours.
            </li>
            <li>
              • <strong>Export from the barrel</strong> so it is reachable from{" "}
              <code className="font-mono">@qeetrix/ui</code>.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">3. Document it — Storybook story</h2>
          <p className="mt-2 text-muted-foreground">
            Every component needs a story in the Storybook workshop. Stories are the living
            reference and the source for visual regression snapshots.
          </p>
          <CodeBlock
            title="my-component.stories.tsx"
            code={`import type { Meta, StoryObj } from "@storybook/react";
import { MyComponent } from "./my-component";

const meta: Meta<typeof MyComponent> = {
  title: "Components/MyComponent",
  component: MyComponent,
};
export default meta;

export const Default: StoryObj<typeof MyComponent> = {
  args: { children: "Hello" },
};`}
          />
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">4. Test it — Vitest + axe</h2>
          <p className="mt-2 text-muted-foreground">
            Add a Vitest test that renders the component and asserts it has no accessibility
            violations via <code className="font-mono text-sm">vitest-axe</code>. This feeds the
            a11y coverage gate.
          </p>
          <CodeBlock
            title="my-component.test.tsx"
            code={`import { render } from "@testing-library/react";
import { axe } from "vitest-axe";
import { expect, it } from "vitest";
import { MyComponent } from "./my-component";

it("has no a11y violations", async () => {
  const { container } = render(<MyComponent>Hello</MyComponent>);
  expect(await axe(container)).toHaveNoViolations();
});`}
          />
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">5. Record a changeset</h2>
          <p className="mt-2 text-muted-foreground">
            Any change that affects consumers needs a changeset declaring its bump level (see the{" "}
            <Link href="/governance" className="text-brand-text underline-offset-4 hover:underline">
              versioning policy
            </Link>
            ). This is how the changelog and releases are generated.
          </p>
          <CodeBlock
            title="terminal"
            code={"bun run changeset         # pick bump level, write a summary"}
          />
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">6. Pass the quality gates</h2>
          <p className="mt-2 text-muted-foreground">
            Run the gates locally before you open the PR — CI runs the same set, and all of them are
            merge-blocking.
          </p>
          <CodeBlock
            title="terminal"
            code={`bun run lint              # incl. no-raw-color
bun run typecheck
bun run build
bun run test              # Vitest + axe
bun run tokens:validate   # WCAG-AA contrast gate`}
          />
          <p className="mt-2 text-sm text-muted-foreground">
            VRT (Playwright) and <code className="font-mono text-xs">build-storybook</code> also run
            in CI. See the full list on{" "}
            <Link href="/governance" className="text-brand-text underline-offset-4 hover:underline">
              Governance
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Pull request checklist</h2>
          <div className="rounded-xl border border-border bg-card p-5">
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li>
                • Component in{" "}
                <code className="font-mono text-xs">packages/ui/src/components/ui/</code>, built on
                Base UI.
              </li>
              <li>
                • Variants use <code className="font-mono text-xs">cva</code>; classes merged with{" "}
                <code className="font-mono text-xs">cn()</code>; elements carry{" "}
                <code className="font-mono text-xs">data-slot</code>.
              </li>
              <li>• Exported from the package barrel.</li>
              <li>• Storybook story added.</li>
              <li>• Vitest + axe test added.</li>
              <li>• Changeset recorded with the right bump level.</li>
              <li>• Colours use tokens only (no raw hex).</li>
              <li>• Lint, typecheck, build, tests, and contrast gate all green locally.</li>
              <li>• A CODEOWNERS reviewer approval is in place.</li>
            </ul>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
