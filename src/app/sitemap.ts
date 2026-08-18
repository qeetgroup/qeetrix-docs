import type { MetadataRoute } from "next";
import { BLOCKS } from "@/lib/blocks";
import components from "@/lib/generated/components.json";
import { SITE } from "@/lib/site";
import { categories } from "@/lib/tokens";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const u = (p: string) => `${SITE.url}${p}`;
  const now = new Date();

  const staticRoutes = [
    "/",
    "/docs",
    "/docs/getting-started",
    "/docs/installation",
    "/docs/theming",
    "/docs/architecture",
    "/components",
    "/blocks",
    "/patterns",
    "/templates",
    "/foundations",
    "/foundations/color",
    "/foundations/typography",
    "/foundations/spacing",
    "/foundations/radius",
    "/foundations/elevation",
    "/foundations/motion",
    "/foundations/iconography",
    "/tokens",
    "/icons",
    "/play",
    "/theme",
    "/learn",
    "/develop",
    "/develop/cli",
    "/develop/mcp",
    "/develop/registry",
    "/accessibility",
    "/brand",
    "/status",
    "/changelog",
    "/releases",
    "/roadmap",
    "/governance",
    "/contributing",
    "/community",
  ];

  return [
    ...staticRoutes.map((p) => ({ url: u(p), lastModified: now, priority: p === "/" ? 1 : 0.8 })),
    ...components.components.map((c) => ({
      url: u(`/components/${c.slug}`),
      lastModified: now,
      priority: 0.7,
    })),
    ...categories().map((c) => ({ url: u(`/tokens/${c}`), lastModified: now, priority: 0.6 })),
    ...BLOCKS.map((b) => ({ url: u(`/blocks/${b.slug}`), lastModified: now, priority: 0.6 })),
  ];
}
