import type { Metadata } from "next";
import Link from "next/link";
import { InDevelopment, PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "VS Code extension",
  description:
    "A planned Qeetrix VS Code extension — component snippets, token autocomplete with colour swatches, --qx-* hovers, add-component, docs-on-hover, and MCP wiring.",
};

const FEATURES = [
  [
    "Component snippets",
    "Scaffold any @qeetrix/ui component with its imports and sensible default props.",
  ],
  [
    "Token autocomplete",
    "Complete --qx-* variables and semantic roles inline, with colour swatches in the list.",
  ],
  ["--qx-* hovers", "Hover a token to see its resolved OKLCH value and light/dark preview."],
  [
    "Add component",
    "Run the registry add flow from the command palette without leaving the editor.",
  ],
  [
    "Docs on hover",
    "Hover a Qeetrix component to read its description, variants, and a link to ui.qeet.in.",
  ],
  [
    "MCP wiring",
    "One click to register the Qeetrix MCP server with your agent so completions stay accurate.",
  ],
];

export default function EditorPage() {
  return (
    <PageShell
      title="VS Code extension"
      status="In design"
      crumbs={[{ title: "Develop", href: "/develop" }, { title: "Editor" }]}
      lead="A first-party editor extension is planned to bring Qeetrix's components and tokens into VS Code — autocomplete, swatches, hovers, and one-click component adds."
    >
      <section>
        <h2 className="font-display text-xl font-semibold">Planned capabilities</h2>
        <div className="mt-3 divide-y divide-border rounded-xl border border-border">
          {FEATURES.map(([name, desc]) => (
            <div key={name} className="p-3">
              <code className="font-mono text-sm text-brand-text">{name}</code>
              <p className="mt-0.5 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-xl font-semibold">Available today</h2>
        <p className="mt-2 text-muted-foreground">
          Until the extension ships, agents in your editor can already get accurate Qeetrix
          completions by connecting to the{" "}
          <Link href="/develop/mcp" className="text-brand-text underline-offset-4 hover:underline">
            MCP server
          </Link>
          , and you can vendor components with the{" "}
          <Link
            href="/develop/registry"
            className="text-brand-text underline-offset-4 hover:underline"
          >
            registry
          </Link>
          .
        </p>
        <div className="mt-4">
          <InDevelopment>
            The Qeetrix VS Code extension is specified in the ui.qeet.in platform spec and not yet
            published. The MCP and registry paths above are live now.
          </InDevelopment>
        </div>
      </section>
    </PageShell>
  );
}
