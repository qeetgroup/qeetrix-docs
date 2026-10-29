// /llms-full.txt: every component's facts, props, parts, examples and keys, as one Markdown file
// for AI tools. Written from the data the component pages render.
import type { APIRoute } from "astro";
import { install } from "@/qeetrix/install";
import { components, markdownOf } from "@/qeetrix/llms";

export const GET: APIRoute = () => {
  const body = [
    "# Qeetrix components",
    "",
    `Install: \`${install.packages}\`. Styles:`,
    "",
    "```css",
    ...install.css,
    "```",
    "",
    'Wrap the app in `<QeetrixProvider>`. Icons import from the package root: `import { PlusIcon } from "@qeetrix/icons"`.',
    "",
    ...components().map(markdownOf),
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
