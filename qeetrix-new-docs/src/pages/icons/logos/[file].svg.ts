// The Qeet logo files, one per variant, as published in @qeetrix/icons (logo-files.ts): what the
// Brand page's Download links fetch, and what its Copy SVG copies.
import type { APIRoute, GetStaticPaths } from "astro";
import { LOGO_FILES, svgOf } from "@/qeetrix/icons/logo-files";

export const getStaticPaths: GetStaticPaths = () =>
  LOGO_FILES.map((entry) => ({ params: { file: entry.file }, props: { svg: svgOf(entry) } }));

export const GET: APIRoute = ({ props }) =>
  new Response(props.svg as string, { headers: { "Content-Type": "image/svg+xml" } });
