import type { SiteChrome } from "@/platform/site";
import { packages } from "./packages";

const repo = "https://github.com/qeetgroup/qeetrix-react";
const qeet = "https://qeet.in";

/**
 * Every destination the Qeetrix docs link to, in one place. Paths are this site's routes; the pages
 * behind them are built page by page, so until a page lands its link leads nowhere. Everything
 * else is a real page: the package repositories, npm, and qeet.in.
 */
export const links = {
  home: "/",
  docs: "/get-started/introduction",
  installation: "/get-started/installation",
  frameworks: "/get-started/frameworks",
  aiTools: "/get-started/ai-tools",
  migration: "/get-started/migration",
  components: "/components",
  icons: "/icons",
  foundations: "/foundations",
  guides: "/guides",
  patterns: "/patterns",
  resources: "/resources",

  colour: "/foundations/colour",
  typography: "/foundations/typography",
  spacing: "/foundations/spacing",
  motion: "/foundations/motion",
  elevation: "/foundations/elevation",
  brand: "/icons/brand",
  button: "/components/button",
  table: "/components/table",
  dialog: "/components/dialog",
  nextjs: "/get-started/frameworks/nextjs",
  tanstackStart: "/get-started/frameworks/tanstack-start",
  vite: "/get-started/frameworks/vite",
  theming: "/guides/theming",
  releasePhases: "/resources/release-phases",

  github: repo,
  storybook: "https://github.com/qeetgroup/qeetrix-story",
  feedback: "https://github.com/qeetgroup/qeetrix-docs/issues",
  source: "https://github.com/qeetgroup/qeetrix-docs/blob/main/src/pages",
  releases: `${repo}/releases`,
  contributing: `${repo}#contributing-and-security`,
  support: `${repo}/issues`,
  npm: "https://www.npmjs.com/package/@qeetrix/react",
  tokensRepo: "https://github.com/qeetgroup/qeetrix-tokens",
  iconsRepo: "https://github.com/qeetgroup/qeetrix-icons",
  iconsNpm: "https://www.npmjs.com/package/@qeetrix/icons",
  tokensNpm: "https://www.npmjs.com/package/@qeetrix/tokens",
  changelog: {
    react: `${repo}/blob/main/packages/react/CHANGELOG.md`,
    tokens: "https://github.com/qeetgroup/qeetrix-tokens/blob/main/CHANGELOG.md",
    icons: "https://github.com/qeetgroup/qeetrix-icons/blob/main/CHANGELOG.md",
  },
  android: "https://github.com/qeetgroup/qeetrix-android",
  ios: "https://github.com/qeetgroup/qeetrix-ios",

  qeet,
  qeetEcosystem: `${qeet}/ecosystem`,
  products: {
    id: `${qeet}/products/qeet-id`,
    pay: `${qeet}/products/qeet-pay`,
    people: `${qeet}/products/qeet-people`,
    notify: `${qeet}/products/qeet-notify`,
    logs: `${qeet}/products/qeet-logs`,
    ai: `${qeet}/products/qeet-ai`,
  },
  // Qeet Group's own accounts, as qeet.in links them.
  x: "https://x.com/qeetgroup",
  linkedIn: "https://www.linkedin.com/company/qeetgroup",
  instagram: "https://www.instagram.com/qeetgroup",
} as const;

/** The Qeetrix docs' header and footer. */
export const site: SiteChrome = {
  name: "Qeetrix",
  home: links.home,
  nav: [
    { label: "Docs", href: links.docs },
    { label: "Components", href: links.components },
    { label: "Icons", href: links.icons },
    { label: "Foundations", href: links.foundations },
    { label: "Guides", href: links.guides },
    { label: "Patterns", href: links.patterns },
    { label: "Resources", href: links.resources },
  ],
  github: { label: "Qeetrix on GitHub", href: links.github },
  footer: {
    tagline: "The Qeet Group design system.",
    columns: [
      {
        title: "Get started",
        links: [
          { label: "Introduction", href: links.docs },
          { label: "Installation", href: links.installation },
          { label: "Next.js", href: links.nextjs },
          { label: "TanStack Start", href: links.tanstackStart },
        ],
      },
      {
        title: "Foundations",
        links: [
          { label: "Colour", href: links.colour },
          { label: "Typography", href: links.typography },
          { label: "Spacing", href: links.spacing },
          { label: "Motion", href: links.motion },
        ],
      },
      {
        title: "Components",
        links: [
          { label: "Overview", href: links.components },
          { label: "Button", href: links.button },
          { label: "Table", href: links.table },
          { label: "Dialog", href: links.dialog },
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "Release notes", href: links.changelog.react },
          { label: "Release phases", href: links.releasePhases },
          { label: "Contributing", href: links.contributing },
          { label: "Support", href: links.support },
        ],
      },
    ],
    social: [
      { label: "Qeet Group on X", href: links.x, logo: "x-mono" },
      { label: "Qeet Group on LinkedIn", href: links.linkedIn, logo: "linkedin" },
      { label: "Qeet Group on Instagram", href: links.instagram, logo: "instagram-mono" },
      { label: "Qeetrix on GitHub", href: links.github, logo: "github-mono" },
    ],
    legal: `© ${new Date().getFullYear()} Qeet Group · MIT licence`,
    meta: [packages.react, packages.tokens, packages.icons]
      .map((p) => `${p.name} ${p.version}`)
      .join(" · "),
  },
};
