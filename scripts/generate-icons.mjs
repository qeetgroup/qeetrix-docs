/**
 * Writes the icon browser's data (/icons) to public/icon-data/<version>/, from the installed
 * @qeetrix/icons, so the page shows exactly the icons the package ships. Runs before `dev` and
 * `build`.
 *
 * - index.json: the catalogue for search and filters — every icon's id, component, categories,
 *   tags, aliases, whether it has a filled drawing and whether it mirrors in right-to-left — and
 *   the categories with their counts.
 * - <shape>-<variant>.json: each drawing's inner SVG markup, rendered from the icon components
 *   themselves, plus the root <svg> attributes the set shares. The page fetches only the set on
 *   show, so the first load is one index and one set rather than every drawing.
 *
 * The directory is versioned, so a browser never pairs a cached index with another release's
 * drawings.
 *
 *   bun run generate:icons
 */
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import * as Icons from "@qeetrix/icons";
import { iconManifest } from "@qeetrix/icons/manifest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

const root = fileURLToPath(new URL("..", import.meta.url));
const require = createRequire(import.meta.url);
const { version } = JSON.parse(
  readFileSync(require.resolve("@qeetrix/icons/package.json"), "utf8"),
);

// The category names from qeetrix-icons' config/categories.ts, which the package does not publish.
// An id missing here is shown title-cased.
const LABELS = {
  account: "Accounts & access",
  development: "Coding & development",
  files: "File icons",
  "food-beverage": "Food & beverage",
  math: "Mathematics",
  navigation: "Navigation & places",
  notifications: "Notifications",
  text: "Text formatting",
  time: "Time & calendar",
};
const label = (id) =>
  LABELS[id] ??
  id.replace(/-/g, " ").replace(/^./, (first) => first.toUpperCase());

// Attributes that depend on how an icon is used, not on its drawing; the page sets its own.
const PER_USE = new Set([
  "width",
  "height",
  "focusable",
  "aria-hidden",
  "role",
]);

function split(markup) {
  const open = /^<svg([^>]*)>/.exec(markup);
  if (!open || !markup.endsWith("</svg>")) {
    throw new Error(`Unexpected icon markup: ${markup.slice(0, 80)}`);
  }
  const attrs = {};
  for (const [, name, value] of open[1].matchAll(/([\w:-]+)="([^"]*)"/g)) {
    if (!PER_USE.has(name)) attrs[name] = value;
  }
  // React writes childless elements as `<path …></path>`; `<path …/>` is shorter and is what a
  // copied SVG should look like.
  const inner = markup
    .slice(open[0].length, -"</svg>".length)
    .replace(/<([a-zA-Z][\w:-]*)([^<>]*?)><\/\1>/g, "<$1$2/>");
  return { attrs, inner };
}

const outDir = join(root, "public/icon-data");
rmSync(outDir, { recursive: true, force: true });
const versionDir = join(outDir, version);
mkdirSync(versionDir, { recursive: true });

const categoryIds = [];
const categoryIndex = new Map();
const counts = new Map();
const sets = new Map();
const index = [];
const missing = [];

for (const icon of iconManifest.icons) {
  // biome-ignore lint/performance/noDynamicNamespaceImportAccess: a Node script that renders every icon; nothing is bundled.
  const Component = Icons[icon.componentName];
  if (typeof Component !== "function") {
    missing.push(icon.componentName);
    continue;
  }
  const categories = icon.categories.map((id) => {
    if (!categoryIndex.has(id)) {
      categoryIndex.set(id, categoryIds.length);
      categoryIds.push(id);
    }
    counts.set(id, (counts.get(id) ?? 0) + 1);
    return categoryIndex.get(id);
  });
  index.push([
    icon.id,
    icon.componentName,
    categories,
    icon.tags,
    icon.aliases,
    icon.variants.includes("filled") ? 1 : 0,
    icon.directionality === "mirror" ? 1 : 0,
  ]);
  for (const shape of icon.shapes) {
    for (const variant of icon.variants) {
      const key = `${shape}-${variant}`;
      const { attrs, inner } = split(
        renderToStaticMarkup(createElement(Component, { shape, variant })),
      );
      let set = sets.get(key);
      if (!set) {
        set = { attrs, icons: {}, overrides: {} };
        sets.set(key, set);
      }
      set.icons[icon.id] = inner;
      if (JSON.stringify(attrs) !== JSON.stringify(set.attrs)) {
        set.overrides[icon.id] = attrs;
      }
    }
  }
}

if (missing.length) {
  throw new Error(
    `@qeetrix/icons ${version} lists icons it does not export: ${missing.join(", ")}`,
  );
}

// Categories in the order their ids appear in each icon's `categories` indexes.
const categories = categoryIds.map((id) => ({
  id,
  label: label(id),
  count: counts.get(id),
}));
writeFileSync(
  join(versionDir, "index.json"),
  JSON.stringify({ version, count: index.length, categories, icons: index }),
);
let bytes = 0;
for (const [key, set] of sets) {
  const json = JSON.stringify(set);
  bytes += json.length;
  writeFileSync(join(versionDir, `${key}.json`), json);
}
console.log(
  `✔ ${index.length} icons from @qeetrix/icons ${version}: ${[...sets.keys()].join(", ")} (${Math.round(bytes / 1024)} KB of drawings)`,
);
