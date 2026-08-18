/** Canonical site metadata + navigation for ui.qeet.in (the Qeetrix platform). */

export const SITE = {
  name: "Qeetrix",
  title: "Qeetrix — The Qeet Group design system",
  description:
    "116 accessible, tokenised React components and 6 composable blocks — built on Base UI and Tailwind v4, themable to any brand, ready for humans and AI agents.",
  url: "https://ui.qeet.in",
  package: "@qeetrix/ui",
  version: "0.4.0",
  github: "https://github.com/qeetgroup/qeetrix",
  suite: "https://qeet.in",
} as const;

export type NavLink = { title: string; href: string; description?: string };
export type NavGroup = { title: string; links: NavLink[] };

/** Primary header groups — the eight IA zones collapsed to five (spec §2.4.1). */
export const NAV: NavGroup[] = [
  {
    title: "Docs",
    links: [
      { title: "Introduction", href: "/docs/introduction" },
      { title: "Getting started", href: "/docs/getting-started" },
      { title: "Installation", href: "/docs/installation" },
      { title: "Theming", href: "/docs/theming" },
      { title: "Architecture", href: "/docs/architecture" },
      { title: "Learn (tutorials)", href: "/learn" },
    ],
  },
  {
    title: "Components",
    links: [
      { title: "All components", href: "/components" },
      { title: "Blocks", href: "/blocks" },
      { title: "Patterns", href: "/patterns" },
      { title: "Templates", href: "/templates" },
    ],
  },
  {
    title: "Design",
    links: [
      { title: "Foundations", href: "/foundations" },
      { title: "Tokens", href: "/tokens" },
      { title: "Icons", href: "/icons" },
      { title: "Brand", href: "/brand" },
      { title: "Theme Studio", href: "/theme" },
    ],
  },
  {
    title: "Develop",
    links: [
      { title: "CLI", href: "/develop/cli" },
      { title: "MCP", href: "/develop/mcp" },
      { title: "Registry", href: "/develop/registry" },
      { title: "Codemods", href: "/develop/codemods" },
      { title: "Figma", href: "/develop/figma" },
    ],
  },
  {
    title: "Resources",
    links: [
      { title: "Changelog", href: "/changelog" },
      { title: "Releases", href: "/releases" },
      { title: "Roadmap", href: "/roadmap" },
      { title: "Accessibility", href: "/accessibility" },
      { title: "Status", href: "/status" },
      { title: "Governance", href: "/governance" },
    ],
  },
];

/** Footer columns (crawlable full-IA fallback, spec §2.4.6). */
export const FOOTER: NavGroup[] = [
  {
    title: "Learn",
    links: [
      { title: "Getting started", href: "/docs/getting-started" },
      { title: "Installation", href: "/docs/installation" },
      { title: "Theming", href: "/docs/theming" },
      { title: "Frameworks", href: "/docs/frameworks/next" },
      { title: "FAQ", href: "/docs/faq" },
    ],
  },
  {
    title: "Build",
    links: [
      { title: "Components", href: "/components" },
      { title: "Blocks", href: "/blocks" },
      { title: "Patterns", href: "/patterns" },
      { title: "Templates", href: "/templates" },
      { title: "Playground", href: "/play" },
    ],
  },
  {
    title: "Design & tokens",
    links: [
      { title: "Foundations", href: "/foundations" },
      { title: "Tokens", href: "/tokens" },
      { title: "Icons", href: "/icons" },
      { title: "Brand", href: "/brand" },
      { title: "Theme Studio", href: "/theme" },
    ],
  },
  {
    title: "Develop & meta",
    links: [
      { title: "CLI", href: "/develop/cli" },
      { title: "MCP", href: "/develop/mcp" },
      { title: "Registry", href: "/develop/registry" },
      { title: "Contributing", href: "/contributing" },
      { title: "Community", href: "/community" },
    ],
  },
];
