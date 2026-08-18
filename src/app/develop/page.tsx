import { Badge, Card, CardDescription, CardHeader, CardTitle } from "@qeetrix/ui";
import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Developer portal",
  description:
    "Tooling for humans and AI agents building on Qeetrix — CLI, MCP, registry, design tokens, codemods, editor, Figma, and CI.",
};

const TOOLS = [
  {
    href: "/develop/cli",
    title: "CLI",
    desc: "Planned @qeetrix/cli for init, add, theme, and upgrade — the registry add path works today.",
    status: "In design",
  },
  {
    href: "/develop/mcp",
    title: "MCP server",
    desc: "Point AI coding agents at ui.qeet.in/mcp for live component, token, and example tools.",
  },
  {
    href: "/develop/registry",
    title: "Registry",
    desc: "shadcn-compatible registry at /r/* — vendor a component's source into your project.",
  },
  {
    href: "/develop/design-tokens",
    title: "Design tokens",
    desc: "Consume --qx-* OKLCH tokens programmatically via tokens.css, tokens.json, and qeetrix.css.",
  },
  {
    href: "/develop/codemods",
    title: "Codemods",
    desc: "jscodeshift transforms in codemods/ for breaking-change migrations.",
  },
  {
    href: "/develop/editor",
    title: "Editor",
    desc: "Planned VS Code extension — snippets, token autocomplete, --qx-* hovers, add-component.",
    status: "In design",
  },
  {
    href: "/develop/figma",
    title: "Figma",
    desc: "Code Connect scaffolding and Tokens Studio round-trip for design ↔ code.",
    status: "In development",
  },
  {
    href: "/develop/ci",
    title: "CI",
    desc: "Copy-paste GitHub Actions recipe — lint, typecheck, a11y gate, contrast gate, and VRT.",
  },
];

export default function DevelopPage() {
  return (
    <PageShell
      title="Developer portal"
      crumbs={[{ title: "Develop" }]}
      lead="Tooling for humans and AI agents building on Qeetrix — from setup and component vendoring to design tokens, migrations, and continuous integration."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TOOLS.map((t) => (
          <Link key={t.href} href={t.href} className="group">
            <Card className="h-full transition-shadow hover:shadow-hover">
              <CardHeader>
                <CardTitle className="flex items-center justify-between gap-2">
                  {t.title}
                  {t.status && <Badge variant="secondary">{t.status}</Badge>}
                </CardTitle>
                <CardDescription>{t.desc}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>

      <section className="mt-10">
        <div className="rounded-xl border border-border bg-card p-5 shadow-rest">
          <h2 className="font-display text-xl font-semibold">Built for AI agents</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Qeetrix is machine-readable end to end, so coding agents emit correct imports, props,
            and composition instead of hallucinated APIs. Three surfaces are live:
          </p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/llms.txt" className="text-brand-text underline-offset-4 hover:underline">
                /llms.txt
              </Link>{" "}
              — a plain-text index of the design system for LLM context.
            </li>
            <li>
              <Link
                href="/develop/mcp"
                className="text-brand-text underline-offset-4 hover:underline"
              >
                /mcp
              </Link>{" "}
              — a remote Model Context Protocol server (Streamable HTTP) with component and token
              tools.
            </li>
            <li>
              <Link
                href="/develop/registry"
                className="text-brand-text underline-offset-4 hover:underline"
              >
                registry
              </Link>{" "}
              — shadcn-compatible JSON at /r/* to vendor component source on demand.
            </li>
          </ul>
        </div>
      </section>
    </PageShell>
  );
}
