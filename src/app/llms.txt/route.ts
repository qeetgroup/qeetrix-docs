import components from "@/lib/generated/components.json";
import { SITE } from "@/lib/site";
import { categories, categoryMeta } from "@/lib/tokens";

export const dynamic = "force-static";

export function GET() {
  const u = (p: string) => `${SITE.url}${p}`;
  const lines: string[] = [];

  lines.push("# Qeetrix — the Qeet Group design system");
  lines.push("");
  lines.push(
    `> ${SITE.package} v${SITE.version}: ${components.count} accessible, tokenised React components and 6 composable blocks, built on Base UI and Tailwind v4. This is the machine-readable index of ${SITE.url}.`,
  );
  lines.push("");

  lines.push("## Start here");
  for (const [p, t] of [
    ["/docs/getting-started", "Getting started (2-minute install)"],
    ["/docs/installation", "Installation"],
    ["/docs/theming", "Theming (light/dark, token overrides)"],
    ["/docs/architecture", "Architecture"],
  ] as const)
    lines.push(`- [${t}](${u(p)})`);
  lines.push("");

  lines.push("## Design");
  for (const [p, t] of [
    ["/foundations", "Foundations"],
    ["/tokens", "Design tokens (--qx-*)"],
    ["/icons", "Icons"],
    ["/brand", "Brand"],
    ["/theme", "Theme Studio"],
  ] as const)
    lines.push(`- [${t}](${u(p)})`);
  lines.push("");

  lines.push("## Developer surfaces");
  for (const [p, t] of [
    ["/develop/cli", "CLI (@qeetrix/cli)"],
    ["/develop/mcp", "MCP server"],
    ["/r/registry.json", "shadcn-compatible registry index"],
    ["/play", "Playground"],
  ] as const)
    lines.push(`- [${t}](${u(p)})`);
  lines.push("");

  lines.push("## Token categories");
  for (const cat of categories()) {
    const m = categoryMeta(cat);
    lines.push(`- [${m.label}](${u(`/tokens/${cat}`)}): ${m.description}`);
  }
  lines.push("");

  lines.push(`## Components (${components.count})`);
  for (const c of components.components) {
    lines.push(
      `- [${c.name}](${u(`/components/${c.slug}`)}): import from \`${c.import}\` (\`${c.deepImport}\`).`,
    );
  }
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
