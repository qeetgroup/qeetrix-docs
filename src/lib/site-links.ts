/**
 * Every destination the homepage links to, in one place. Each one is real: a route in this site,
 * a file or page in the public qeetgroup/qeetrix-ui repository, the npm package, or a route the
 * qeet.in site defines (qeet-group/src/app). Nothing here is a placeholder.
 */

export const libraryRepo = "https://github.com/qeetgroup/qeetrix-ui";
const qeetSite = "https://qeet.in";

export const links = {
  docs: "/docs",
  installation: "/docs/installation",
  components: "/docs/components",
  foundations: "/docs/foundations",
  guides: "/docs/guides",
  patterns: "/docs/patterns",
  resources: "/docs/resources",

  colors: "/docs/foundations/colors",
  typography: "/docs/foundations/typography",
  spacing: "/docs/foundations/spacing",
  elevation: "/docs/foundations/elevation",
  motion: "/docs/foundations/motion",
  icons: "/docs/foundations/icons",

  nextjs: "/docs/guides/nextjs",
  tanstackStart: "/docs/guides/tanstack-start",
  theming: "/docs/guides/theming",
  accessibility: "/docs/guides/accessibility",
  serverComponents: "/docs/guides/nextjs#use-components",
  rtl: "/docs/guides/accessibility#right-to-left",

  github: libraryRepo,
  releases: `${libraryRepo}/releases`,
  latestRelease: `${libraryRepo}/releases/latest`,
  changelog: `${libraryRepo}/blob/main/CHANGELOG.md`,
  contributing: `${libraryRepo}/blob/main/CONTRIBUTING.md`,
  npm: "https://www.npmjs.com/package/@qeetrix/ui",

  qeetAbout: `${qeetSite}/company/about`,
  qeetEcosystem: `${qeetSite}/ecosystem`,
  qeetCareers: `${qeetSite}/careers`,
  qeetContact: `${qeetSite}/contact`,
  qeetPrivacy: `${qeetSite}/legal/privacy`,
  qeetTerms: `${qeetSite}/legal/terms`,

  // Qeet Group's own accounts, as qeet.in links them.
  qeetX: "https://x.com/qeetgroup",
  qeetLinkedIn: "https://www.linkedin.com/company/qeetgroup",
  qeetInstagram: "https://www.instagram.com/qeetgroup",
} as const;

/** The primary navigation, shared by the header and the mobile menu. */
export const primaryNav = [
  { label: "Docs", href: links.docs },
  { label: "Components", href: links.components },
  { label: "Foundations", href: links.foundations },
  { label: "Guides", href: links.guides },
  { label: "Patterns", href: links.patterns },
  { label: "Resources", href: links.resources },
] as const;

/**
 * Qeet products, as qeet.in lists them (qeet-group/src/content/products/*.mdx): the name, what the
 * product does in a few words, and whether it is available or still in development.
 */
export const products = [
  {
    name: "Qeet ID",
    tagline: "Authentication and user management.",
    status: "available",
    href: `${qeetSite}/products/qeet-id`,
  },
  {
    name: "Qeet Pay",
    tagline: "Payments and billing infrastructure.",
    status: "development",
    href: `${qeetSite}/products/qeet-pay`,
  },
  {
    name: "Qeet Notify",
    tagline: "Multi-channel notifications.",
    status: "available",
    href: `${qeetSite}/products/qeet-notify`,
  },
  {
    name: "Qeet Logs",
    tagline: "Observability and audit logs.",
    status: "available",
    href: `${qeetSite}/products/qeet-logs`,
  },
  {
    name: "Qeet People",
    tagline: "HR, payroll and attendance.",
    status: "development",
    href: `${qeetSite}/products/qeet-people`,
  },
] as const;
