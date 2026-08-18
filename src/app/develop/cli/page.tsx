import type { Metadata } from "next";
import { CodeBlock } from "@/components/code-block";
import { InDevelopment, PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "CLI",
  description:
    "The planned @qeetrix/cli — init, add, theme, tokens, upgrade — and the shadcn-registry path that works today.",
};

const COMMANDS = [
  [
    "qeetrix init",
    "Detect the framework, wire Tailwind v4 + styles import, and install the providers.",
  ],
  ["qeetrix add <component>", "Pull a component from the ui.qeet.in registry into your project."],
  ["qeetrix registry", "List and search available registry items."],
  ["qeetrix theme", "Apply or generate a brand overlay from a Theme Studio config."],
  ["qeetrix tokens", "Pull tokens.json / tokens.css and generate typed token accessors."],
  ["qeetrix diff", "Compare a locally vendored component against upstream."],
  ["qeetrix upgrade", "Run codemods for a breaking upgrade."],
  ["qeetrix doctor", "Check versions, peer deps, and token/a11y lint."],
  ["qeetrix mcp", "Print MCP client configuration."],
];

export default function CliPage() {
  return (
    <PageShell
      title="CLI"
      status="In design"
      crumbs={[{ title: "Develop", href: "/develop" }, { title: "CLI" }]}
      lead="A first-party @qeetrix/cli is planned to make setup and upgrades one command. Until it ships, the shadcn-compatible registry gives you the add workflow today."
    >
      <section>
        <h2 className="font-display text-xl font-semibold">Available today</h2>
        <p className="mt-2 text-muted-foreground">
          Add components from the registry with the shadcn CLI:
        </p>
        <CodeBlock
          title="terminal"
          code={"npx shadcn@latest add https://ui.qeet.in/r/button.json"}
        />
        <p className="mt-2 text-sm text-muted-foreground">
          See the{" "}
          <a
            href="/develop/registry"
            className="text-brand-text underline-offset-4 hover:underline"
          >
            registry
          </a>{" "}
          for all {""}items.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-xl font-semibold">Planned command surface</h2>
        <div className="mt-3 divide-y divide-border rounded-xl border border-border">
          {COMMANDS.map(([cmd, desc]) => (
            <div key={cmd} className="p-3">
              <code className="font-mono text-sm text-brand-text">{cmd}</code>
              <p className="mt-0.5 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <InDevelopment>
            <code className="font-mono">@qeetrix/cli</code> is specified in the ui.qeet.in platform
            spec (§8) and not yet published. The commands above are the intended surface; the
            registry <em>add</em> path is live now.
          </InDevelopment>
        </div>
      </section>
    </PageShell>
  );
}
