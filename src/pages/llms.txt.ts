// /llms.txt: every page of these docs, for AI tools, in the llms.txt format.
import type { APIRoute } from "astro";
import { DOCS } from "@/qeetrix/components/registry";
import { pagesOf } from "@/qeetrix/llms";

export const GET: APIRoute = ({ site }) => {
  const url = (path: string) => new URL(path, site).href;
  const body = [
    "# Qeetrix",
    "",
    "> The Qeet design system: @qeetrix/react components, @qeetrix/tokens and @qeetrix/icons. Every Qeet product is built from it.",
    "",
    "## Pages",
    ...pagesOf()
      .filter(([, path]) => !DOCS.some((doc) => path === `/components/${doc.slug}`))
      .map(([label, path]) => `- [${label}](${url(path)})`),
    "",
    "## Components",
    ...DOCS.map((doc) => `- [${doc.name}](${url(`/components/${doc.slug}/`)}): ${doc.lede}`),
    "",
    "## Everything",
    `- [Every component's API, parts, examples and keys](${url("/llms-full.txt")})`,
    "",
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
