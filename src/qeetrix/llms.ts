// The docs as text for AI tools, from the same data the pages render: /llms.txt indexes every
// page; /llms-full.txt is every component's facts, props, parts, code and keys, as Markdown.
import { DOCS } from "./components/registry";
import { moduleOf } from "./components/sections";
import type { ComponentDoc } from "./components/types";
import { docs } from "./docs/chrome";

type NavItem = {
  readonly label: string;
  readonly href?: string;
  readonly items?: readonly NavItem[];
};

/** Every page the navigation links, depth first, as [label, path]. */
export function pagesOf(): Array<[string, string]> {
  const out: Array<[string, string]> = [];
  const walk = (items: readonly NavItem[]) => {
    for (const item of items) {
      if (item.href?.startsWith("/")) out.push([item.label, item.href]);
      if (item.items) walk(item.items);
    }
  };
  for (const group of docs.groups) walk(group.items);
  return out;
}

const row = (cells: string[]) => `| ${cells.map((c) => c.replaceAll("|", "\\|")).join(" | ")} |`;

/** One component as Markdown: what it is, its import, its props and parts, its examples, its keys. */
export function markdownOf(doc: ComponentDoc): string {
  const lines = [
    `## ${doc.name}`,
    "",
    `${doc.lede} (${doc.status}, since ${doc.since})`,
    "",
    "```tsx",
    `import { ${doc.exports.join(", ")} } from "${moduleOf(doc)}";`,
    "```",
    "",
    `Use for: ${doc.usage.useFor.join(" ")}`,
    `Not for: ${doc.usage.notFor.map((n) => `${n.text} (use ${n.use})`).join("; ")}.`,
    "",
    row(["Prop", "Type", "Default", "Notes"]),
    row(["---", "---", "---", "---"]),
    ...doc.api.props.map((p) => row([p.name, p.type, p.default, p.note])),
    "",
    row(["data-slot", "Element", "Notes"]),
    row(["---", "---", "---"]),
    ...doc.api.parts.map((p) => row([p.slot, p.element, p.note])),
    "",
  ];
  for (const example of doc.examples)
    lines.push(`### ${example.title}`, "", example.line, "", "```tsx", example.code, "```", "");
  if (doc.accessibility.keyboard.length) {
    lines.push(
      "Keys:",
      ...doc.accessibility.keyboard.map((k) => `- ${k.keys.join(" / ")}: ${k.action}`),
      "",
    );
  }
  lines.push(...doc.accessibility.checks.map((c) => `- ${c.check}: ${c.result}`), "");
  return lines.join("\n");
}

export const components = () => DOCS;
