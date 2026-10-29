// The Icon browser's sheets: every icon in one drawing (round or sharp, outline or filled) as an
// SVG sprite of <symbol>s, built once from @qeetrix/icons. The browser's grid points into it
// (<use href="…#id">), so the page stays light however many icons it lists.
import * as Icons from "@qeetrix/icons";
import { iconManifest } from "@qeetrix/icons/manifest";
import type { APIRoute, GetStaticPaths } from "astro";
import { type ComponentType, createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

type Shape = "round" | "sharp";
type Drawing = "outline" | "filled";
type AnyIcon = ComponentType<{ size?: number; shape?: Shape; variant?: Drawing }>;

const SHEETS: Array<[Shape, Drawing]> = [
  ["round", "outline"],
  ["sharp", "outline"],
  ["round", "filled"],
  ["sharp", "filled"],
];

export const getStaticPaths: GetStaticPaths = () =>
  SHEETS.map(([shape, drawing]) => ({
    params: { name: `${shape}-${drawing}` },
    props: { shape, drawing },
  }));

const ALL = Icons as unknown as Record<string, AnyIcon | undefined>;

/** One icon's drawing as a <symbol>: its <svg>'s viewBox and paint, under the icon's id. */
function symbol(id: string, Icon: AnyIcon, shape: Shape, drawing: Drawing): string {
  const svg = renderToStaticMarkup(createElement(Icon, { size: 24, shape, variant: drawing }));
  const open = svg.match(/^<svg([^>]*)>/)?.[1] ?? "";
  const keep = [
    ...open.matchAll(
      /\s(viewBox|fill|stroke|stroke-width|stroke-linecap|stroke-linejoin)="([^"]*)"/g,
    ),
  ]
    .map((m) => ` ${m[1]}="${m[2]}"`)
    .join("");
  const inner = svg.replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, "");
  return `<symbol id="${id}"${keep}>${inner}</symbol>`;
}

export const GET: APIRoute = ({ props }) => {
  const { shape, drawing } = props as { shape: Shape; drawing: Drawing };
  const symbols = iconManifest.icons
    .filter((icon) => icon.variants.includes(drawing))
    .map((icon) => {
      const Icon = ALL[icon.componentName];
      return Icon ? symbol(icon.id, Icon, shape, drawing) : "";
    })
    .join("");
  return new Response(`<svg xmlns="http://www.w3.org/2000/svg">${symbols}</svg>`, {
    headers: { "Content-Type": "image/svg+xml" },
  });
};
