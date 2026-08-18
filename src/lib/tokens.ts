import raw from "@/lib/generated/tokens.json";

const DATA = raw as unknown as {
  light: Record<string, unknown>;
  dark: Record<string, unknown>;
};

export type TokenLeaf = {
  /** Path within the category, e.g. "brand.500". */
  name: string;
  /** Full dotted path, e.g. "color.brand.500". */
  path: string;
  /** The CSS custom property, e.g. "--qx-color-brand-500". */
  varName: string;
  light: string;
  dark: string;
  category: string;
};

export const CATEGORY_META: Record<string, { label: string; description: string }> = {
  color: {
    label: "Color",
    description: "Neutral, brand, and semantic colour ramps — authored in OKLCH.",
  },
  space: {
    label: "Spacing",
    description: "The spacing scale used for padding, gaps, and layout rhythm.",
  },
  radii: { label: "Radius", description: "Corner-radius scale, derived from a base radius." },
  shadow: { label: "Elevation", description: "The shadow ladder: rest, hover, popover, modal." },
  font: {
    label: "Typography",
    description: "Font sizes, weights, families, line-heights, and letter-spacing.",
  },
  duration: { label: "Motion — duration", description: "Animation/transition durations." },
  easing: { label: "Motion — easing", description: "Easing curves for motion." },
  icon: { label: "Iconography", description: "Icon sizes and stroke widths." },
  gradient: { label: "Gradient", description: "Composite brand and surface gradients." },
  stroke: { label: "Stroke", description: "Border stroke styles." },
  density: { label: "Density", description: "Comfortable and compact control metrics." },
  focus: { label: "Focus", description: "Keyboard focus ring, outline, and offset metrics." },
  state: {
    label: "State",
    description: "Shared interaction-state values such as disabled opacity.",
  },
  component: {
    label: "Component",
    description: "Stable component layout decisions proven across product surfaces.",
  },
  z: { label: "Z-index", description: "Stacking-order scale for layered surfaces." },
};

function flatten(obj: unknown, prefix = ""): [string, string][] {
  const out: [string, string][] = [];
  if (obj && typeof obj === "object") {
    for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
      const path = prefix ? `${prefix}.${k}` : k;
      if (v && typeof v === "object") out.push(...flatten(v, path));
      else out.push([path, String(v)]);
    }
  }
  return out;
}

export function categories(): string[] {
  return Object.keys(DATA.light).sort();
}

export function categoryMeta(cat: string) {
  return CATEGORY_META[cat] ?? { label: cat, description: `${cat} tokens.` };
}

export function tokensFor(cat: string): TokenLeaf[] {
  const light = flatten(DATA.light[cat]);
  const darkMap = Object.fromEntries(flatten(DATA.dark[cat]));
  return light.map(([name, lightVal]) => {
    const path = `${cat}.${name}`;
    return {
      name,
      path,
      varName: `--qx-${path.replace(/\./g, "-")}`,
      light: lightVal,
      dark: darkMap[name] ?? lightVal,
      category: cat,
    };
  });
}

export function countFor(cat: string): number {
  return flatten(DATA.light[cat]).length;
}

export function totalCount(): number {
  return categories().reduce((n, c) => n + countFor(c), 0);
}

export const isColorLike = (v: string) => /^(oklch|rgb|hsl|#|color\()/i.test(v.trim());
