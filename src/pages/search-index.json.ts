// /search-index.json: what the docs search (platform/chrome/search.ts) filters: every page the
// navigation links, and every component with its line, its category and what it exports.
import type { APIRoute } from "astro";
import { DOCS } from "@/qeetrix/components/registry";
import { categories } from "@/qeetrix/docs/components";
import { pagesOf } from "@/qeetrix/llms";

const SECTIONS: Array<[string, string]> = [
  ["/get-started", "Get started"],
  ["/foundations", "Foundations"],
  ["/components", "Components"],
  ["/patterns", "Patterns"],
  ["/icons", "Icons"],
  ["/guides", "Guides"],
  ["/resources", "Resources"],
];
const sectionOf = (path: string) => SECTIONS.find(([base]) => path.startsWith(base))?.[1] ?? "Docs";

export const GET: APIRoute = () => {
  const components = new Set(DOCS.map((doc) => `/components/${doc.slug}`));
  const pages = pagesOf()
    .filter(([, path]) => !components.has(path))
    .map(([title, url]) => ({ title, url, section: sectionOf(url) }));
  const entries = DOCS.map((doc) => ({
    title: doc.name,
    url: `/components/${doc.slug}/`,
    section: categories.find((c) => c.id === doc.category)?.name ?? "Components",
    line: doc.lede,
    keywords: [...doc.exports, doc.status].join(" "),
  }));
  // The section landings the navigation shows as headings, not links.
  const landings = [
    { title: "Guides", url: "/guides", section: "Guides" },
    { title: "Resources", url: "/resources", section: "Resources" },
  ];
  return new Response(JSON.stringify([...pages, ...landings, ...entries]), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
};
