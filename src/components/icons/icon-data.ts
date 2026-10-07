/**
 * The icon browser's data: the files scripts/generate-icons.mjs writes to public/icon-data, how
 * they are loaded, searched and turned into the snippets the browser copies. Search follows the
 * qeetrix-icons playground's ranking (names, then earlier names, then keywords).
 */

export type Shape = "round" | "sharp";
export type Variant = "outline" | "filled";

export type Category = { id: string; label: string; count: number };

export type Icon = {
  id: string;
  componentName: string;
  /** Every category the icon is listed under, primary first. */
  categories: string[];
  tags: string[];
  aliases: string[];
  hasFilled: boolean;
  mirrors: boolean;
};

export type Catalogue = {
  version: string;
  categories: Category[];
  icons: Icon[];
  byId: Map<string, Icon>;
};

/** One shape-and-variant set: the shared root attributes and each icon's inner markup. */
export type DrawingSet = {
  attrs: Record<string, string>;
  icons: Record<string, string>;
  overrides: Record<string, Record<string, string>>;
};

type IndexFile = {
  version: string;
  categories: Category[];
  icons: [string, string, number[], string[], string[], 0 | 1, 0 | 1][];
};

const base = (version: string) => `/icon-data/${version}`;

export async function loadCatalogue(version: string): Promise<Catalogue> {
  const response = await fetch(`${base(version)}/index.json`);
  if (!response.ok) throw new Error(`index.json: ${response.status}`);
  const file = (await response.json()) as IndexFile;
  const icons = file.icons.map(
    ([id, componentName, categories, tags, aliases, filled, mirrors]) => ({
      id,
      componentName,
      categories: categories.map((index) => file.categories[index].id),
      tags,
      aliases,
      hasFilled: filled === 1,
      mirrors: mirrors === 1,
    }),
  );
  return {
    version: file.version,
    categories: file.categories,
    icons,
    byId: new Map(icons.map((icon) => [icon.id, icon])),
  };
}

const sets = new Map<string, Promise<DrawingSet>>();

/** A drawing set, fetched once per page. */
export function loadSet(version: string, shape: Shape, variant: Variant) {
  const key = `${version}/${shape}-${variant}`;
  let set = sets.get(key);
  if (!set) {
    set = fetch(`${base(version)}/${shape}-${variant}.json`).then(
      (response) => {
        if (!response.ok) throw new Error(`${key}: ${response.status}`);
        return response.json() as Promise<DrawingSet>;
      },
    );
    set.catch(() => sets.delete(key));
    sets.set(key, set);
  }
  return set;
}

// ---------------------------------------------------------------------------------------------
// Search

const normalize = (text: string) =>
  text
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-");

/** Exact, prefix, word-start, then anywhere. */
function matchScore(value: string, query: string) {
  const text = normalize(value);
  if (text === query) return 100;
  if (text.startsWith(query)) return 80;
  if (text.includes(`-${query}`)) return 60;
  return text.includes(query) ? 40 : 0;
}

/**
 * The icons matching `query`, best first: names count in full, earlier names slightly less,
 * tags and categories clearly less. Ties keep catalogue order.
 */
export function searchIcons(
  icons: Icon[],
  query: string,
  categoryLabels: Map<string, string>,
) {
  const q = normalize(query);
  if (!q) return icons;
  const scored: { icon: Icon; score: number; order: number }[] = [];
  icons.forEach((icon, order) => {
    let score = Math.max(
      matchScore(icon.id, q),
      matchScore(icon.componentName, q),
    );
    for (const alias of icon.aliases)
      score = Math.max(score, matchScore(alias, q) * 0.9);
    for (const keyword of [
      ...icon.tags,
      ...icon.categories.map((id) => categoryLabels.get(id) ?? id),
    ])
      score = Math.max(score, matchScore(keyword, q) * 0.55);
    if (score > 0) scored.push({ icon, score, order });
  });
  scored.sort((a, b) => b.score - a.score || a.order - b.order);
  return scored.map(({ icon }) => icon);
}

// ---------------------------------------------------------------------------------------------
// Rendering and snippets

export const DEFAULT_SIZE = 24;
export const DEFAULT_STROKE = 2;

/** Preview colours: Qeetrix text roles, and the class an app would use for each. */
export const COLORS = [
  {
    id: "default",
    label: "Current colour",
    css: "currentColor",
    className: null,
  },
  {
    id: "muted",
    label: "Muted",
    css: "var(--muted-foreground)",
    className: "text-muted-foreground",
  },
  {
    id: "brand",
    label: "Brand",
    css: "var(--qx-color-text-brand)",
    className: "text-brand",
  },
  {
    id: "info",
    label: "Info",
    css: "var(--qx-color-text-info)",
    className: "text-info-text",
  },
  {
    id: "success",
    label: "Success",
    css: "var(--qx-color-text-success)",
    className: "text-success-text",
  },
  {
    id: "warning",
    label: "Warning",
    css: "var(--qx-color-text-warning)",
    className: "text-warning-text",
  },
  {
    id: "danger",
    label: "Danger",
    css: "var(--qx-color-text-danger)",
    className: "text-destructive-text",
  },
] as const;

export type ColorId = (typeof COLORS)[number]["id"];

export type Look = {
  shape: Shape;
  variant: Variant;
  size: number;
  stroke: number;
  color: ColorId;
};

/** `"stroke-linecap"` → `"strokeLinecap"`, for React. */
const camel = (name: string) =>
  name === "xmlns" ? name : name.replace(/-(\w)/g, (_, c) => c.toUpperCase());

export function svgProps(set: DrawingSet, id: string, look: Look) {
  const attrs = set.overrides[id] ?? set.attrs;
  const props: Record<string, string | number> = {};
  for (const [name, value] of Object.entries(attrs)) props[camel(name)] = value;
  if (look.variant === "outline" && "stroke-width" in attrs) {
    props.strokeWidth = look.stroke;
  }
  return props;
}

/** The icon's standalone SVG at the current size and stroke, in `currentColor`. */
export function svgMarkup(set: DrawingSet, id: string, look: Look) {
  const attrs = { ...(set.overrides[id] ?? set.attrs) };
  if (look.variant === "outline" && "stroke-width" in attrs) {
    attrs["stroke-width"] = String(look.stroke);
  }
  const head = Object.entries({
    xmlns: attrs.xmlns,
    width: String(look.size),
    height: String(look.size),
    ...attrs,
  })
    .map(([name, value]) => `${name}="${value}"`)
    .join(" ");
  const body = (set.icons[id] ?? "")
    .replace(/></g, ">\n  <")
    .replace(/^</, "  <");
  return `<svg ${head}>\n${body}\n</svg>\n`;
}

/** The JSX for the current look: only the props that differ from the defaults. */
export function jsxSnippet(icon: Icon, look: Look) {
  const color = COLORS.find((entry) => entry.id === look.color);
  const props = [
    look.shape === "round" ? null : `shape="${look.shape}"`,
    look.variant === "outline" ? null : `variant="${look.variant}"`,
    look.size === DEFAULT_SIZE ? null : `size={${look.size}}`,
    look.variant === "outline" && look.stroke !== DEFAULT_STROKE
      ? `strokeWidth={${look.stroke}}`
      : null,
    color?.className ? `className="${color.className}"` : null,
  ].filter(Boolean);
  return `<${[icon.componentName, ...props].join(" ")} />`;
}

export const importSnippet = (icon: Icon) =>
  `import { ${icon.componentName} } from "@qeetrix/icons";`;

export const directImportSnippet = (icon: Icon) =>
  `import { ${icon.componentName} } from "@qeetrix/icons/icons/${icon.id}";`;

/** `arrow-big-right` → `Arrow big right`. */
export const displayName = (id: string) =>
  id.replace(/-/g, " ").replace(/^./, (first) => first.toUpperCase());
