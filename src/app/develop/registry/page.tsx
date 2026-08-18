import type { Metadata } from "next";
import { CodeBlock } from "@/components/code-block";
import { PageShell } from "@/components/page-shell";
import data from "@/lib/generated/components.json";

export const metadata: Metadata = {
  title: "Registry",
  description:
    "A shadcn-compatible component registry at ui.qeet.in/r/* — add Qeetrix components straight into your project.",
};

export default function RegistryPage() {
  return (
    <PageShell
      title="Registry"
      crumbs={[{ title: "Develop", href: "/develop" }, { title: "Registry" }]}
      lead={`A shadcn-compatible registry serves all ${data.count} components as JSON, so you can vendor a component's source directly into your project.`}
    >
      <section>
        <h2 className="font-display text-xl font-semibold">Add a component</h2>
        <p className="mt-2 text-muted-foreground">Pull any component by its registry URL:</p>
        <CodeBlock
          title="terminal"
          code={"npx shadcn@latest add https://ui.qeet.in/r/button.json"}
        />
        <p className="mt-2 text-sm text-muted-foreground">
          The item embeds the component source and declares its dependencies (Base UI, cva, clsx,
          tailwind-merge).
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-xl font-semibold">Endpoints</h2>
        <div className="mt-3 space-y-2 text-sm">
          <p>
            <code className="font-mono text-brand-text">/r/registry.json</code> — the index of all{" "}
            {data.count} items.
          </p>
          <p>
            <code className="font-mono text-brand-text">/r/&lt;name&gt;.json</code> — one registry
            item (e.g. <code className="font-mono">/r/button.json</code>).
          </p>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-xl font-semibold">Item shape</h2>
        <CodeBlock
          title="/r/button.json"
          code={`{\n  "$schema": "https://ui.shadcn.com/schema/registry-item.json",\n  "name": "button",\n  "type": "registry:ui",\n  "title": "Button",\n  "dependencies": ["clsx", "tailwind-merge", "@base-ui/react", "class-variance-authority"],\n  "files": [\n    { "path": "components/ui/button.tsx", "type": "registry:ui", "content": "…" }\n  ]\n}`}
        />
        <p className="mt-2 text-sm text-muted-foreground">
          The registry is generated from <code className="font-mono">@qeetrix/ui</code> at build
          time, so it never drifts from the package.
        </p>
      </section>
    </PageShell>
  );
}
