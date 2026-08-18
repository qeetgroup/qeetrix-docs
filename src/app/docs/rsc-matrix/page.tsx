import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/code-block";
import { InDevelopment, PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "RSC compatibility matrix",
  description:
    "How to tell which Qeetrix components are server-safe and which are client-only — plus a per-component matrix generated from source.",
};

export default function RscMatrixPage() {
  return (
    <PageShell
      title="RSC compatibility matrix"
      status="Phase 3 verified"
      crumbs={[{ title: "Docs", href: "/docs" }, { title: "RSC compatibility matrix" }]}
      lead="Which components render on the server, and which ship a client boundary — and how to tell the difference yourself."
    >
      <div className="space-y-8">
        <section>
          <h2 className="font-display text-xl font-semibold">The rule of thumb</h2>
          <p className="mt-2 text-muted-foreground">
            Most <em>interactive</em> components carry{" "}
            <code className="font-mono text-sm">"use client"</code> because they wrap a Base UI
            primitive that holds state or listens for events — Dialog, Popover, Select, Tabs,
            Tooltip, Accordion, Switch, and friends. Purely presentational components — Card, Badge,
            Alert, Form, Table, and the typography and layout primitives — are plain markup and
            render happily in a Server Component. The current source census is 97 intentional
            client modules and 45 server-safe modules.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">How to tell for any component</h2>
          <p className="mt-2 text-muted-foreground">
            You never need to guess or add the directive yourself. Two quick checks:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">
            <li>
              Hooks, browser APIs, event behavior, and client-only primitives require an explicit
              <code className="font-mono text-sm"> "use client"</code> boundary. A Base UI import
              alone is not the rule: server-compatible Base UI markup can remain server-safe.
            </li>
            <li>
              You can import <em>any</em> Qeetrix component into a Server Component regardless —
              React handles the boundary. The only thing that forces your own{" "}
              <code className="font-mono text-sm">"use client"</code> is writing handlers or hooks
              in <em>your</em> file.
            </li>
          </ul>
          <CodeBlock
            title="grep the package"
            code={`# See which compiled components declare a client boundary\ngrep -rl '"use client"' node_modules/@qeetrix/ui/dist/components`}
          />
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold">Per-component matrix</h2>
          <p className="mt-2 text-muted-foreground">
            A generated table listing all 145 implementation modules as server-safe or client-only
            is still landing here. The underlying contract is already executable: a 27-case source
            boundary test, three adversarial hydration fixtures, and a packed Next App Router build
            run in the repository checks.
          </p>
          <InDevelopment>
            The public table is the remaining documentation-generation step. Until it ships, use
            the grep above or read the tested concepts on the{" "}
            <Link href="/docs/ssr" className="text-brand-text underline-offset-4 hover:underline">
              SSR &amp; RSC
            </Link>{" "}
            page.
          </InDevelopment>
        </section>
      </div>
    </PageShell>
  );
}
