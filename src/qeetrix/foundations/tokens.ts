// What @qeetrix/tokens contains, counted at build time from its own files (the DTCG tokens and the
// stylesheet), so the Foundations pages can't drift from the release. Server-side only.
import { readdirSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";

const dist = dirname(createRequire(import.meta.url).resolve("@qeetrix/tokens/tokens.css"));
const light = JSON.parse(readFileSync(join(dist, "dtcg", "light.tokens.json"), "utf8"));

type Node = { $value?: unknown; [key: string]: unknown };
const leaves = (node: Node, path: string[] = []): string[][] =>
  "$value" in node
    ? [path]
    : Object.entries(node).flatMap(([key, child]) =>
        key.startsWith("$") ? [] : leaves(child as Node, [...path, key]),
      );

const all = leaves(light);
const ramps = light.primitive.color as Record<string, Record<string, unknown>>;

export const tokens = {
  primitive: all.filter((p) => p[0] === "primitive").length,
  component: all.filter((p) => p[0] === "component").length,
  semantic: all.filter((p) => p[0] !== "primitive" && p[0] !== "component").length,
  colours: all.filter((p) => p[0] === "color").length,
  /** The colour roles the Colour page lists as rows (the chart scales show as strips). */
  colourRows: all.filter(
    (p) => p[0] === "color" && !["sequential", "diverging"].includes(p[2] ?? ""),
  ).length,
  categorical: all.filter((p) => p.slice(0, 3).join(".") === "color.dataviz.categorical").length,
  typeRoles: all.filter((p) => p[0] === "typography").length,
  spaceSteps: all.filter((p) => p[0] === "primitive" && p[1] === "space").length,
  /** The window size classes: compact, then one per breakpoint. */
  sizeClasses: all.filter((p) => p[0] === "breakpoint").length + 1,
  shadows: all.filter((p) => p[0] === "shadow").length,
  layers: all.filter((p) => p[0] === "z").length,
  borderWidths: all.filter((p) => p[0] === "border" && p[1] === "width").length,
  focusRing: (light.focus.ring.width.$value as { value: number; unit: string }).value,
  ramps: Object.keys(ramps).length,
  steps: Object.keys(Object.values(ramps)[0] ?? {}).length,
  densities: readdirSync(join(dist, "dtcg", "tokens", "modes", "density")).length,
} as const;
