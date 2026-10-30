// Writes the component pages' registry (src/qeetrix/components/registry.ts) and their route
// (src/pages/components/[component]/[...tab].astro) from one list. Astro hydrates only the islands
// a page imports, so the route names each component's playground and live examples. To add a
// component: write its folder (doc.tsx, examples.tsx, and Playground.tsx or Live.tsx if it has
// them), add a row here, then run `bun run components`.
import { writeFileSync } from "node:fs";

/** [slug, the doc's export, has a playground, has live examples], in the navigation's order. */
const COMPONENTS: Array<[slug: string, name: string, playground: boolean, live: boolean]> = [
  ["button", "button", true, false],
  ["icon-button", "iconButton", true, true],
  ["toggle", "toggle", true, true],
  ["toggle-group", "toggleGroup", true, true],
  ["copy-button", "copyButton", true, true],
  ["command-palette", "commandPalette", false, true],
  ["text-field", "textField", true, true],
  ["input", "input", true, true],
  ["textarea", "textarea", true, true],
  ["select", "select", true, true],
  ["combobox", "combobox", true, true],
  ["checkbox", "checkbox", true, true],
  ["radio", "radio", true, true],
  ["switch", "switchDoc", true, true],
  ["slider", "slider", true, true],
  ["number-field", "numberField", true, true],
  ["password-input", "passwordInput", true, true],
  ["otp-input", "otpInput", true, true],
  ["file-upload", "fileUpload", false, true],
  ["form", "form", false, true],
  ["calendar", "calendar", true, true],
  ["range-calendar", "rangeCalendar", true, true],
  ["date-picker", "datePicker", true, true],
  ["date-range-picker", "dateRangePicker", true, true],
  ["dialog", "dialog", true, true],
  ["drawer", "drawer", true, true],
  ["popover", "popover", true, true],
  ["tooltip", "tooltip", true, true],
  ["menu", "menu", true, true],
  ["context-menu", "contextMenu", false, true],
  ["toast", "toast", true, true],
  ["tabs", "tabs", true, true],
  ["accordion", "accordion", true, true],
  ["collapsible", "collapsible", true, true],
  ["breadcrumb", "breadcrumb", true, false],
  ["pagination", "pagination", true, true],
  ["steps", "steps", true, true],
  ["table", "table", true, true],
  ["badge", "badge", true, false],
  ["chip", "chip", true, true],
  ["avatar", "avatar", true, true],
  ["avatar-group", "avatarGroup", false, true],
  ["stat", "stat", false, false],
  ["description-list", "descriptionList", true, true],
  ["timeline", "timeline", true, false],
  ["tree-view", "treeView", true, true],
  ["code-block", "codeBlock", true, true],
  ["alert", "alert", true, true],
  ["progress", "progress", true, true],
  ["meter", "meter", true, false],
  ["spinner", "spinner", true, false],
  ["skeleton", "skeleton", false, false],
  ["empty-state", "emptyState", true, true],
  ["app-shell", "appShell", false, true],
  ["top-bar", "topBar", false, false],
  ["sidebar", "sidebar", false, true],
  ["page-header", "pageHeader", false, true],
  ["box", "box", true, false],
  ["stack", "stack", true, false],
  ["inline", "inline", true, false],
  ["grid", "grid", true, false],
  ["card", "card", true, false],
  ["separator", "separator", true, false],
  ["scroll-area", "scrollArea", false, true],
  ["heading", "heading", false, false],
  ["text", "text", false, false],
  ["link", "link", false, false],
  ["skip-link", "skipLink", false, false],
  ["visually-hidden", "visuallyHidden", false, false],
];

const root = new URL("../src/", import.meta.url);
const pascal = (slug: string) =>
  slug
    .split("-")
    .map((part) => part[0]?.toUpperCase() + part.slice(1))
    .join("");
const quoted = (values: string[]) => values.map((value) => `"${value}"`).join(", ");

const registry = [
  "// The components documented so far, in the navigation's order: each gets five pages, one per tab.",
  "// Written by scripts/components.ts with the route ([component]/[...tab].astro), from one list.",
  ...[...COMPONENTS]
    .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
    .map(([slug, name]) => `import { ${name} } from "./${slug}/doc";`),
  'import type { ComponentDoc } from "./types";',
  "",
  `export const DOCS: ComponentDoc[] = [${COMPONENTS.map(([, name]) => name).join(", ")}];`,
  "",
  "/** The components whose Examples tab opens with a playground (the route names each island). */",
  `export const PLAYGROUNDS = new Set([${quoted(COMPONENTS.filter(([, , playground]) => playground).map(([slug]) => slug))}]);`,
  "",
  "/** The components whose examples run live (tooltips, presses, copies): the route names each island. */",
  `export const LIVE = new Set([${quoted(COMPONENTS.filter(([, , , live]) => live).map(([slug]) => slug))}]);`,
  "",
].join("\n");
writeFileSync(new URL("qeetrix/components/registry.ts", root), registry);

// Biome's import order: by module path, segment by segment; letters compared without case, an
// uppercase one first on a tie.
const key = (text: string) =>
  [...text].map(
    (c) => [c.toLowerCase(), c === c.toUpperCase() && c !== c.toLowerCase() ? 0 : 1] as const,
  );
const compare = (a: string, b: string) => {
  const [x, y] = [a.split("/"), b.split("/")];
  for (let i = 0; i < Math.max(x.length, y.length); i++) {
    if (x[i] === undefined) return -1;
    if (y[i] === undefined) return 1;
    const [p, q] = [key(x[i] as string), key(y[i] as string)];
    for (let j = 0; j < Math.max(p.length, q.length); j++) {
      const [c, d] = [p[j], q[j]];
      if (!c) return -1;
      if (!d) return 1;
      if (c[0] !== d[0]) return c[0] < d[0] ? -1 : 1;
      if (c[1] !== d[1]) return c[1] - d[1];
    }
  }
  return 0;
};
const imports: Array<[string, string]> = [];
for (const [slug, , playground, live] of COMPONENTS) {
  if (playground)
    imports.push([`${pascal(slug)}Playground`, `@/qeetrix/components/${slug}/Playground`]);
  if (live) imports.push([`${pascal(slug)}Live`, `@/qeetrix/components/${slug}/Live`]);
}
imports.push(
  ["ComponentPage", "@/qeetrix/components/ComponentPage.astro"],
  ["Accessibility", "@/qeetrix/components/tab-pages/Accessibility.astro"],
  ["Api", "@/qeetrix/components/tab-pages/Api.astro"],
  ["Changelog", "@/qeetrix/components/tab-pages/Changelog.astro"],
  ["Examples", "@/qeetrix/components/tab-pages/Examples.astro"],
  ["Usage", "@/qeetrix/components/tab-pages/Usage.astro"],
);
const lines = [
  ...imports.map(([name, from]) => [`import ${name} from "${from}";`, from] as const),
  [
    'import { DOCS, LIVE, PLAYGROUNDS } from "@/qeetrix/components/registry";',
    "@/qeetrix/components/registry",
  ] as const,
  [
    'import { type ComponentDoc, TABS, type Tab } from "@/qeetrix/components/types";',
    "@/qeetrix/components/types",
  ] as const,
]
  .sort((a, b) => compare(a[1], b[1]))
  .map(([line]) => line);
const slots: string[] = [];
for (const [slug, , playground, live] of COMPONENTS) {
  if (playground)
    slots.push(
      `        {slug === "${slug}" && <${pascal(slug)}Playground slot="playground" client:visible />}`,
    );
  if (live)
    slots.push(
      `        {slug === "${slug}" && examples.map((example) => <${pascal(slug)}Live slot={example.id} id={example.id} client:visible />)}`,
    );
}
const route = `---
// A component's pages, one per tab: /components/<name> for its examples, then /usage, /api,
// /accessibility and /changelog. A component's islands (its playground; examples that need React)
// are named here, as Astro hydrates only what a page imports. Written by scripts/components.ts.
${lines.join("\n")}

export function getStaticPaths() {
  return DOCS.flatMap((doc) => TABS.map((tab) => ({ params: { component: doc.slug, tab: tab.path || undefined }, props: { doc, tab: tab.id } })));
}

const { doc, tab } = Astro.props as { doc: ComponentDoc; tab: Tab };
const { slug, examples } = doc;
---

<ComponentPage doc={doc} tab={tab} playground={PLAYGROUNDS.has(slug)}>
  {
    tab === "examples" && (
      <Examples doc={doc} playground={PLAYGROUNDS.has(slug)} live={LIVE.has(slug)}>
${slots.join("\n")}
      </Examples>
    )
  }
  {tab === "usage" && <Usage doc={doc} />}
  {tab === "api" && <Api doc={doc} />}
  {tab === "accessibility" && <Accessibility doc={doc} />}
  {tab === "changelog" && <Changelog doc={doc} />}
</ComponentPage>
`;
writeFileSync(new URL("pages/components/[component]/[...tab].astro", root), route);
console.log(`components: ${COMPONENTS.length}`);
