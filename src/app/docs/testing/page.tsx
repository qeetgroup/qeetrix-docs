import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/code-block";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Testing",
  description:
    "Test Qeetrix UIs with Vitest, Testing Library, and vitest-axe — query by role or data-slot, and assert accessibility.",
};

export default function TestingPage() {
  return (
    <PageShell
      title="Testing"
      crumbs={[{ title: "Docs", href: "/docs" }, { title: "Testing" }]}
      lead="Qeetrix itself is tested with Vitest + vitest-axe and Playwright VRT — the same toolkit works for the UIs you build with it."
    >
      <div className="space-y-8">
        <section>
          <h2 className="font-display text-xl font-semibold">Setup</h2>
          <p className="mt-2 text-muted-foreground">
            Use Vitest with a jsdom environment, Testing Library for the DOM, and{" "}
            <code className="font-mono text-sm">vitest-axe</code> for accessibility assertions.
          </p>
          <CodeBlock
            title="bun"
            code={
              "bun add -D vitest @testing-library/react @testing-library/user-event vitest-axe jsdom"
            }
          />
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Query by role first</h2>
          <p className="mt-2 text-muted-foreground">
            Qeetrix components render correct ARIA roles, so prefer role and label queries — they
            test what users and assistive tech actually perceive, and survive refactors.
          </p>
          <CodeBlock
            title="button.test.tsx"
            code={`import { render, screen } from "@testing-library/react";\nimport userEvent from "@testing-library/user-event";\nimport { expect, test, vi } from "vitest";\nimport { Button } from "@qeetrix/ui";\n\ntest("fires onClick", async () => {\n  const onClick = vi.fn();\n  render(<Button onClick={onClick}>Save</Button>);\n  await userEvent.click(screen.getByRole("button", { name: "Save" }));\n  expect(onClick).toHaveBeenCalledOnce();\n});`}
          />
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Fall back to data-slot</h2>
          <p className="mt-2 text-muted-foreground">
            When a part has no semantic role — an overlay, a decorative container — target its
            stable <code className="font-mono text-sm">data-slot</code> attribute instead of a class
            name, which can change between releases.
          </p>
          <CodeBlock
            title="dialog.test.tsx"
            code={`const overlay = container.querySelector('[data-slot="dialog-overlay"]');\nexpect(overlay).toBeInTheDocument();`}
          />
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Assert accessibility</h2>
          <p className="mt-2 text-muted-foreground">
            Run <code className="font-mono text-sm">axe</code> on rendered output to catch contrast,
            labelling, and role violations in CI.
          </p>
          <CodeBlock
            title="a11y.test.tsx"
            code={`import { render } from "@testing-library/react";\nimport { axe } from "vitest-axe";\nimport { expect, test } from "vitest";\nimport { Button } from "@qeetrix/ui";\n\ntest("has no a11y violations", async () => {\n  const { container } = render(<Button>Save</Button>);\n  expect(await axe(container)).toHaveNoViolations();\n});`}
          />
          <p className="mt-2 text-sm text-muted-foreground">
            For the accessibility guarantees Qeetrix ships with, see the{" "}
            <Link
              href="/accessibility"
              className="text-brand-text underline-offset-4 hover:underline"
            >
              accessibility overview
            </Link>
            .
          </p>
        </section>
      </div>
    </PageShell>
  );
}
