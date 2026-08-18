import type { ComponentType } from "react";

export type Post = { slug: string; title: string; date: string; description: string };

/** Post metadata (ordered newest-first). MDX bodies live in src/content/blog/. */
export const POSTS: Post[] = [
  {
    slug: "introducing-ui-qeet-in",
    title: "Introducing ui.qeet.in",
    date: "2026-07-16",
    description:
      "The Qeetrix design system now has a home — docs, live components, tokens, a playground, and a machine layer for AI agents.",
  },
  {
    slug: "designing-with-tokens",
    title: "Designing with tokens",
    date: "2026-07-15",
    description:
      "Why Qeetrix authors every colour in OKLCH, compiles with Style Dictionary, and gates contrast to WCAG-AA.",
  },
];

/** Explicit slug → MDX loader map (reliable static imports, no dynamic paths). */
export const POST_CONTENT: Record<string, () => Promise<{ default: ComponentType }>> = {
  "introducing-ui-qeet-in": () => import("@/content/blog/introducing-ui-qeet-in.mdx"),
  "designing-with-tokens": () => import("@/content/blog/designing-with-tokens.mdx"),
};

export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug);
