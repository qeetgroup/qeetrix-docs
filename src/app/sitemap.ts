import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/shared";
import { links } from "@/lib/site-links";
import { source } from "@/lib/source";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    links.iconBrowser,
    ...source.getPages().map((page) => page.url),
  ];
  return paths.map((path) => ({ url: new URL(path, siteUrl).toString() }));
}
