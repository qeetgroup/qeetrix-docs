import type { Metadata } from "next";
import { CodeBlock } from "@/components/code-block";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "MCP",
  description:
    "Point AI coding agents at the Qeetrix MCP server (ui.qeet.in/mcp) so they emit correct Qeetrix code — live component, token, and example tools.",
};

const TOOLS = [
  [
    "list_components",
    "List every @qeetrix/ui component with import path, status, and variant count.",
  ],
  [
    "get_component",
    "Details for one component: imports, cva variants + defaults, data-slots, Base UI primitive, example.",
  ],
  ["get_examples", "Ready-to-paste example code for a component."],
  [
    "get_tokens",
    "Design tokens — categories, or a category's tokens (name, --qx var, light/dark).",
  ],
  ["search", "Search components, tokens, and pages; returns names + ui.qeet.in URLs."],
];

export default function McpPage() {
  return (
    <PageShell
      title="MCP server"
      crumbs={[{ title: "Develop", href: "/develop" }, { title: "MCP" }]}
      lead="A remote Model Context Protocol server exposes Qeetrix to AI coding agents so they generate correct imports, props, and composition — not hallucinated APIs. It runs live at ui.qeet.in/mcp."
    >
      <section>
        <h2 className="font-display text-xl font-semibold">Connect an agent</h2>
        <p className="mt-2 text-muted-foreground">
          The server speaks Streamable HTTP (JSON-RPC over POST). Add it to Claude Code, Cursor, or
          any MCP client:
        </p>
        <CodeBlock
          title=".mcp.json"
          code={`{\n  "mcpServers": {\n    "qeetrix": {\n      "type": "http",\n      "url": "https://ui.qeet.in/mcp"\n    }\n  }\n}`}
        />
      </section>

      <section className="mt-8">
        <h2 className="font-display text-xl font-semibold">Tools</h2>
        <div className="mt-3 divide-y divide-border rounded-xl border border-border">
          {TOOLS.map(([name, desc]) => (
            <div key={name} className="p-3">
              <code className="font-mono text-sm text-brand-text">{name}</code>
              <p className="mt-0.5 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-xl font-semibold">Try it</h2>
        <p className="mt-2 text-muted-foreground">Any JSON-RPC client works — for example:</p>
        <CodeBlock
          title="curl"
          code={`curl -s https://ui.qeet.in/mcp \\\n  -H "content-type: application/json" \\\n  -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"get_component","arguments":{"name":"Button"}}}'`}
        />
      </section>

      <section className="mt-8">
        <h2 className="font-display text-xl font-semibold">Local (stdio)</h2>
        <p className="mt-2 text-muted-foreground">
          A standalone stdio server also ships in the monorepo (
          <code className="font-mono text-sm">@qeetrix/mcp</code>) for offline use. The same
          component and token data powers both, plus{" "}
          <a href="/llms.txt" className="text-brand-text underline-offset-4 hover:underline">
            /llms.txt
          </a>{" "}
          and the{" "}
          <a
            href="/develop/registry"
            className="text-brand-text underline-offset-4 hover:underline"
          >
            registry
          </a>
          .
        </p>
      </section>
    </PageShell>
  );
}
