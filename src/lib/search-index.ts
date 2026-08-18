import type { CommandPaletteItem } from "@qeetrix/ui";
import components from "@/lib/generated/components.json";

export type SearchPayload = { href: string } | { action: "toggle-theme" };

const TOKEN_CATEGORIES: [string, string][] = [
  ["color", "Color"],
  ["space", "Spacing"],
  ["radii", "Radius"],
  ["shadow", "Elevation"],
  ["font", "Typography"],
  ["duration", "Motion — duration"],
  ["easing", "Motion — easing"],
  ["icon", "Iconography"],
  ["gradient", "Gradient"],
  ["stroke", "Stroke"],
  ["density", "Density"],
  ["z", "Z-index"],
];

const FOUNDATIONS: [string, string][] = [
  ["color", "Color"],
  ["typography", "Typography"],
  ["spacing", "Spacing"],
  ["radius", "Radius"],
  ["elevation", "Elevation"],
  ["motion", "Motion"],
  ["iconography", "Iconography"],
];

const PAGES: [string, string][] = [
  ["/docs/getting-started", "Getting started"],
  ["/docs/installation", "Installation"],
  ["/docs/theming", "Theming"],
  ["/docs/architecture", "Architecture"],
  ["/components", "All components"],
  ["/blocks", "Blocks"],
  ["/tokens", "Design tokens"],
  ["/icons", "Icons"],
  ["/foundations", "Foundations"],
  ["/play", "Playground"],
  ["/theme", "Theme Studio"],
  ["/develop/cli", "CLI"],
  ["/develop/mcp", "MCP"],
  ["/accessibility", "Accessibility"],
  ["/changelog", "Changelog"],
  ["/roadmap", "Roadmap"],
];

export function buildItems(): CommandPaletteItem[] {
  const items: CommandPaletteItem[] = [];

  for (const [href, title] of PAGES) {
    items.push({
      id: `page:${href}`,
      title,
      group: "Pages",
      payload: { href } satisfies SearchPayload,
    });
  }

  for (const c of components.components) {
    items.push({
      id: `component:${c.slug}`,
      title: c.name,
      group: "Components",
      keywords: [c.slug],
      payload: { href: `/components/${c.slug}` } satisfies SearchPayload,
    });
  }

  for (const [slug, label] of TOKEN_CATEGORIES) {
    items.push({
      id: `token:${slug}`,
      title: `${label} tokens`,
      group: "Tokens",
      keywords: [slug, "token", "--qx"],
      payload: { href: `/tokens/${slug}` } satisfies SearchPayload,
    });
  }

  for (const [slug, label] of FOUNDATIONS) {
    items.push({
      id: `foundation:${slug}`,
      title: `${label} foundation`,
      group: "Foundations",
      keywords: [slug],
      payload: { href: `/foundations/${slug}` } satisfies SearchPayload,
    });
  }

  items.push({
    id: "action:toggle-theme",
    title: "Toggle light / dark theme",
    group: "Actions",
    keywords: ["dark", "light", "theme", "mode"],
    payload: { action: "toggle-theme" } satisfies SearchPayload,
  });

  return items;
}
