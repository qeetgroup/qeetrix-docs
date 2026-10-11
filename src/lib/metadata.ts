import type { Metadata } from "next";
import { appName } from "./shared";

/** Inline code (`loading`) is markup, not words: it reads as noise in a search snippet. */
export function plainText(text: string) {
  return text.replace(/`([^`]+)`/g, "$1");
}

/** The Open Graph fields every page carries. */
export const openGraphBase = {
  type: "website",
  siteName: appName,
  locale: "en_US",
} as const;

/**
 * A page's metadata: its canonical URL and its Open Graph card. Next merges `openGraph`
 * shallowly — a page that sets it replaces the layout's whole object — so every page passes
 * through here and gets the full set. `og:title` and `og:description` come from `title` and
 * `description`, title template included.
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
}: {
  title: Metadata["title"];
  description: string;
  path: string;
  image: string;
}): Metadata {
  return {
    title,
    description: plainText(description),
    alternates: { canonical: path },
    openGraph: { ...openGraphBase, url: path, images: image },
  };
}
