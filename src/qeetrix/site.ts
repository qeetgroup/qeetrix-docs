import type { SiteChrome } from "@/platform/site";
import { nativeLibraries, packages } from "./packages";

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
  platforms: "/components/platforms",
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
  android: "/get-started/android",
  ios: "/get-started/ios",
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
  androidRepo: "https://github.com/qeetgroup/qeetrix-android",
  iosRepo: "https://github.com/qeetgroup/qeetrix-ios",

  qeet,
  qeetEcosystem: `${qeet}/ecosystem`,
  qeetBusinesses: `${qeet}/products`,
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
  icon: "/icon.svg",
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
    tagline:
      "The Qeet Group design system: components, tokens and icons for the web, iOS and Android.",
    action: { label: "Get started", href: links.docs },
    // The release a page was built from, read from the installed packages (packages.ts).
    feature: {
      label: "Latest release",
      title: `${packages.react.name} ${packages.react.version}`,
      line: `With ${packages.tokens.name} ${packages.tokens.version} and ${packages.icons.name} ${packages.icons.version}; Qeetrix for iOS ${nativeLibraries.ios.version} and for Android ${nativeLibraries.android.version}.`,
      link: { label: "Release notes", href: links.changelog.react },
    },
    columns: [
      {
        title: "Get started",
        links: [
          { label: "Introduction", href: links.docs },
          { label: "Installation", href: links.installation },
          { label: "Frameworks", href: links.frameworks },
          { label: "Android", href: links.android },
          { label: "iOS", href: links.ios },
          { label: "AI tools", href: links.aiTools },
        ],
      },
      {
        title: "Foundations",
        links: [
          { label: "Colour", href: links.colour },
          { label: "Typography", href: links.typography },
          { label: "Spacing", href: links.spacing },
          { label: "Elevation", href: links.elevation },
          { label: "Motion", href: links.motion },
          { label: "Icons", href: links.icons },
        ],
      },
      {
        title: "Components",
        links: [
          { label: "Overview", href: links.components },
          { label: "Platforms", href: links.platforms },
          { label: "Button", href: links.button },
          { label: "Table", href: links.table },
          { label: "Dialog", href: links.dialog },
          { label: "Patterns", href: links.patterns },
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "Release notes", href: links.changelog.react },
          { label: "Release phases", href: links.releasePhases },
          { label: "Storybook", href: links.storybook },
          { label: "Contributing", href: links.contributing },
          { label: "Support", href: links.support },
        ],
      },
      {
        title: "Qeet Group",
        links: [
          { label: "qeet.in", href: links.qeet },
          { label: "All businesses", href: links.qeetBusinesses },
        ],
      },
    ],
    follow: {
      title: "Follow Qeet Group",
      links: [
        { name: "LinkedIn", label: "Qeet Group on LinkedIn", href: links.linkedIn },
        { name: "X", label: "Qeet Group on X", href: links.x },
        { name: "Instagram", label: "Qeet Group on Instagram", href: links.instagram },
        { name: "GitHub", label: "Qeetrix on GitHub", href: links.github },
      ],
    },
    legal: `© ${new Date().getFullYear()} Qeet Group · MIT licence`,
    based: "Qeet Group's design system · Based in India",
    signature: "Qeet Group",
  },
};
