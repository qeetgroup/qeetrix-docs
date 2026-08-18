/**
 * Single source of truth for site navigation — drives both the header
 * NavigationMenu dropdowns and the contextual left-rail tree in PageShell.
 * Every href here is a real route under src/app. Areas map 1:1 to the five
 * IA zones (spec §2.4.1); `getArea(pathname)` resolves the current section.
 */

export type SideLink = { title: string; href: string; description?: string };
export type SideGroup = { title: string; links: SideLink[] };
export type SideArea = {
  /** Stable id + the label shown in the header trigger. */
  id: string;
  title: string;
  /** Route prefixes that belong to this area (longest-match wins in getArea). */
  prefixes: string[];
  /** Where the header trigger links when clicked / the area's canonical entry. */
  href: string;
  groups: SideGroup[];
};

export const AREAS: SideArea[] = [
  {
    id: "docs",
    title: "Docs",
    href: "/docs",
    prefixes: ["/docs", "/learn"],
    groups: [
      {
        title: "Get started",
        links: [
          {
            title: "Introduction",
            href: "/docs/introduction",
            description: "What Qeetrix is and when to reach for it.",
          },
          {
            title: "Getting started",
            href: "/docs/getting-started",
            description: "Zero to a rendered component in ~2 minutes.",
          },
          {
            title: "Installation",
            href: "/docs/installation",
            description: "Install, wire Tailwind v4, styles, providers.",
          },
          { title: "Quick start", href: "/docs/quick-start" },
        ],
      },
      {
        title: "Guides",
        links: [
          {
            title: "Theming",
            href: "/docs/theming",
            description: "Light/dark mode and token overrides.",
          },
          { title: "Dark mode", href: "/docs/theming/dark-mode" },
          { title: "Architecture", href: "/docs/architecture" },
          { title: "Customization", href: "/docs/customization" },
          { title: "Choose a component", href: "/docs/component-decisions" },
          { title: "Enterprise components", href: "/docs/enterprise-components" },
          { title: "Best practices", href: "/docs/best-practices" },
          { title: "Performance", href: "/docs/performance" },
          { title: "Security", href: "/docs/security" },
        ],
      },
      {
        title: "Frameworks",
        links: [
          { title: "Next.js", href: "/docs/frameworks/next" },
          { title: "React (Vite/SPA)", href: "/docs/frameworks/react" },
          { title: "Remix", href: "/docs/frameworks/remix" },
          { title: "Vite", href: "/docs/frameworks/vite" },
        ],
      },
      {
        title: "Rendering & testing",
        links: [
          { title: "SSR", href: "/docs/ssr" },
          { title: "RSC matrix", href: "/docs/rsc-matrix" },
          { title: "Testing", href: "/docs/testing" },
        ],
      },
      {
        title: "Internationalization",
        links: [
          { title: "i18n", href: "/docs/i18n" },
          { title: "RTL", href: "/docs/rtl" },
          { title: "Indic typography", href: "/docs/indic-typography" },
        ],
      },
      {
        title: "Reference",
        links: [
          { title: "FAQ", href: "/docs/faq" },
          { title: "Glossary", href: "/docs/glossary" },
          { title: "Troubleshooting", href: "/docs/troubleshooting" },
          { title: "Learn (tutorials)", href: "/learn" },
        ],
      },
    ],
  },
  {
    id: "components",
    title: "Components",
    href: "/components",
    prefixes: ["/components", "/blocks", "/patterns", "/templates", "/play"],
    groups: [
      {
        title: "Build",
        links: [
          {
            title: "All components",
            href: "/components",
            description: "116 accessible, tokenised React components.",
          },
          {
            title: "Blocks",
            href: "/blocks",
            description: "6 composable, multi-component patterns.",
          },
          { title: "Patterns", href: "/patterns", description: "Recommended UX compositions." },
          { title: "Templates", href: "/templates", description: "Full-page starting points." },
          {
            title: "Playground",
            href: "/play",
            description: "Live, shareable component sandboxes.",
          },
        ],
      },
    ],
  },
  {
    id: "design",
    title: "Design",
    href: "/foundations",
    prefixes: ["/foundations", "/tokens", "/icons", "/brand", "/theme"],
    groups: [
      {
        title: "Foundations",
        links: [
          { title: "Overview", href: "/foundations" },
          { title: "Color", href: "/foundations/color" },
          { title: "Typography", href: "/foundations/typography" },
          { title: "Spacing", href: "/foundations/spacing" },
          { title: "Radius", href: "/foundations/radius" },
          { title: "Elevation", href: "/foundations/elevation" },
          { title: "Motion", href: "/foundations/motion" },
          { title: "Grid", href: "/foundations/grid" },
          { title: "Layout", href: "/foundations/layout" },
          { title: "Density", href: "/foundations/density" },
          { title: "Iconography", href: "/foundations/iconography" },
          { title: "Voice & tone", href: "/foundations/voice" },
        ],
      },
      {
        title: "Tokens & assets",
        links: [
          {
            title: "Tokens",
            href: "/tokens",
            description: "OKLCH design tokens, contrast-gated to AA.",
          },
          { title: "Icons", href: "/icons", description: "Lucide + Qeet brand icons, copy-ready." },
          { title: "Brand", href: "/brand" },
          {
            title: "Theme Studio",
            href: "/theme",
            description: "Design a theme, export the tokens.",
          },
        ],
      },
    ],
  },
  {
    id: "develop",
    title: "Develop",
    href: "/develop",
    prefixes: ["/develop", "/migrate"],
    groups: [
      {
        title: "Tooling",
        links: [
          { title: "Overview", href: "/develop" },
          { title: "CLI", href: "/develop/cli", description: "Add components from the terminal." },
          { title: "MCP", href: "/develop/mcp", description: "Qeetrix for AI agents." },
          { title: "Registry", href: "/develop/registry" },
          { title: "Codemods", href: "/develop/codemods" },
          { title: "CI", href: "/develop/ci" },
          { title: "Editor", href: "/develop/editor" },
          { title: "Figma", href: "/develop/figma" },
          { title: "Design tokens", href: "/develop/design-tokens" },
          { title: "Migrate", href: "/migrate" },
        ],
      },
    ],
  },
  {
    id: "resources",
    title: "Resources",
    href: "/changelog",
    prefixes: [
      "/changelog",
      "/releases",
      "/roadmap",
      "/rfcs",
      "/status",
      "/governance",
      "/accessibility",
      "/contributing",
      "/community",
      "/blog",
    ],
    groups: [
      {
        title: "Project",
        links: [
          { title: "Changelog", href: "/changelog" },
          { title: "Releases", href: "/releases" },
          { title: "Roadmap", href: "/roadmap" },
          { title: "RFCs", href: "/rfcs" },
          { title: "Status", href: "/status" },
          { title: "Governance", href: "/governance" },
        ],
      },
      {
        title: "Community",
        links: [
          { title: "Contributing", href: "/contributing" },
          { title: "Community", href: "/community" },
          { title: "Blog", href: "/blog" },
        ],
      },
      {
        title: "Accessibility",
        links: [
          { title: "Overview", href: "/accessibility" },
          { title: "Statement", href: "/accessibility/statement" },
          { title: "Scorecard", href: "/accessibility/scorecard" },
          { title: "VPAT", href: "/accessibility/vpat" },
        ],
      },
    ],
  },
];

/** Resolve the area that owns a pathname (longest matching prefix wins). */
export function getArea(pathname: string): SideArea | null {
  let best: SideArea | null = null;
  let bestLen = -1;
  for (const area of AREAS) {
    for (const p of area.prefixes) {
      const matches = pathname === p || pathname.startsWith(`${p}/`);
      if (matches && p.length > bestLen) {
        best = area;
        bestLen = p.length;
      }
    }
  }
  return best;
}

/** True when a link is the current page or an ancestor of it. */
export function isLinkActive(href: string, pathname: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}
