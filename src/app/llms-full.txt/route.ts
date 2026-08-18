import { getMeta } from "@/lib/component-meta";
import { EXAMPLE_CODE, hasExample } from "@/lib/examples";
import components from "@/lib/generated/components.json";
import { SITE } from "@/lib/site";
import { categories, categoryMeta, tokensFor } from "@/lib/tokens";

export const dynamic = "force-static";

export function GET() {
  const out: string[] = [];

  out.push("# Qeetrix — full reference for AI agents");
  out.push("");
  out.push(
    `> ${SITE.package} v${SITE.version}. React 19 + Tailwind v4 + Base UI. Import components from "@qeetrix/ui" (or the deep path). This file lists every component's import, variants, props, and an example where available, plus the full token set. Home: ${SITE.url}.`,
  );
  out.push("");
  out.push("## Conventions");
  out.push(
    "- Components are styled layers over Base UI primitives; every element has a `data-slot`.",
  );
  out.push(
    "- Variants use `cva`; compose onto other elements with the Base UI `render` prop (not `asChild`).",
  );
  out.push(
    "- Theme: `.dark` class via `ThemeProvider`; brand via `data-qx-brand`; RTL via `DirectionProvider`.",
  );
  out.push('- Import styles once: `import "@qeetrix/ui/styles.css"`.');
  out.push("");

  out.push(`## Components (${components.count})`);
  out.push("");
  for (const c of components.components) {
    const m = getMeta(c.slug);
    out.push(`### ${c.name}`);
    out.push(`- import: \`import { ${c.name} } from "${c.import}";\` (deep: \`${c.deepImport}\`)`);
    if (m?.primitive) out.push(`- primitive: \`${m.primitive}\``);
    if (m && Object.keys(m.variants).length) {
      for (const [g, v] of Object.entries(m.variants)) {
        out.push(
          `- variant \`${g}\`: ${v.options.join(" | ")}${v.default ? ` (default: ${v.default})` : ""}`,
        );
      }
    }
    const fn = m?.functions[c.name];
    if (fn) {
      if (fn.propsType) out.push(`- props type: \`${fn.propsType}\``);
      if (fn.params.length)
        out.push(`- props: ${fn.params.join(", ")}${fn.hasRest ? ", …rest" : ""}`);
    }
    if (m && m.exports.length > 1) out.push(`- exports: ${m.exports.join(", ")}`);
    if (hasExample(c.slug)) {
      out.push("- example:");
      out.push("```tsx");
      out.push(EXAMPLE_CODE[c.slug]);
      out.push("```");
    }
    out.push(`- docs: ${SITE.url}/components/${c.slug}`);
    out.push("");
  }

  out.push("## Design tokens");
  out.push("");
  for (const cat of categories()) {
    out.push(`### ${categoryMeta(cat).label} (--qx-${cat}-*)`);
    for (const t of tokensFor(cat)) {
      out.push(`- \`${t.varName}\`: ${t.light}${t.dark !== t.light ? ` (dark: ${t.dark})` : ""}`);
    }
    out.push("");
  }

  return new Response(out.join("\n"), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
