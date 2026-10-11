import { createGetUrl } from "fumadocs-core/source";

export const appName = "Qeetrix";
export const appDescription =
  "The Qeetrix design system — components, tokens and icons for every Qeet product.";
export const siteUrl = "https://ui.qeet.in";

/** The icon browser's description, for its page and its share card. */
export function iconsDescription(count: number) {
  return `Browse, customise and copy all ${count.toLocaleString("en")} icons in @qeetrix/icons — round and sharp, outline and filled.`;
}
export const docsRoute = "/docs";
export const docsImageRoute = "/og/docs";
export const docsContentRoute = "/llms.mdx/docs";

export const gitConfig = {
  user: "qeetgroup",
  repo: "qeetrix-docs",
  branch: "main",
};

const getContentUrl = createGetUrl(docsContentRoute);

export function getPageMarkdownUrl(page: { slugs: string[]; locale?: string }) {
  const segments = [...page.slugs, "content.md"];

  return { segments, url: getContentUrl(segments, page.locale) };
}

const getImageUrl = createGetUrl(docsImageRoute);

export function getPageImageUrl(page: { slugs: string[]; locale?: string }) {
  const segments = [...page.slugs, "image.png"];

  return { segments, url: getImageUrl(segments, page.locale) };
}
