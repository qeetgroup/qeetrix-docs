// The Qeetrix docs' navigation, footer and source, for the platform's docs frame. Grouped as Carbon
// groups its site; component families nest under their category, as Atlassian nests a family's
// variants. Short labels. Counts come from the installed packages (counts.ts).
import { BlocksIcon } from "@qeetrix/icons/icons/blocks";
import { BookOpenIcon } from "@qeetrix/icons/icons/book-open";
import { BotIcon } from "@qeetrix/icons/icons/bot";
import { DownloadIcon } from "@qeetrix/icons/icons/download";
import { LayersIcon } from "@qeetrix/icons/icons/layers";
import { LayoutTemplateIcon } from "@qeetrix/icons/icons/layout-template";
import { LifeBuoyIcon } from "@qeetrix/icons/icons/life-buoy";
import { MessageSquareTextIcon } from "@qeetrix/icons/icons/message-square-text";
import { PaletteIcon } from "@qeetrix/icons/icons/palette";
import { RouteIcon } from "@qeetrix/icons/icons/route";
import { ScrollTextIcon } from "@qeetrix/icons/icons/scroll-text";
import { ShapesIcon } from "@qeetrix/icons/icons/shapes";
import { formatNumber } from "@qeetrix/react";
import type { DocsChrome, DocsNavItem } from "@/platform/site";
import { counts } from "../counts";
import { packages } from "../packages";
import { links, site } from "../site";
import { categories, categoryHref, componentHref, slug } from "./components";

/** Pages under a folder, by name: Guides › Theming is /guides/theming. */
/** Pages under a section, each with the id its page marks current: "guides-theming". */
const pages = (base: string, labels: string[], prefix: string): DocsNavItem[] =>
  labels.map((label) => ({
    id: `${prefix}-${slug(label)}`,
    label,
    href: `${base}/${slug(label)}`,
  }));

export const docs: DocsChrome = {
  groups: [
    {
      label: "Get started",
      items: [
        {
          id: "introduction",
          label: "Introduction",
          href: links.docs,
          icon: BookOpenIcon,
          filledWhenCurrent: true,
        },
        { id: "installation", label: "Installation", href: links.installation, icon: DownloadIcon },
        {
          id: "frameworks",
          label: "Frameworks",
          href: links.frameworks,
          icon: LayersIcon,
          items: [
            {
              id: "nextjs",
              label: "Next.js",
              href: links.nextjs,
              brand: ["nextdotjs", "nextdotjs-dark"],
            },
            {
              id: "tanstack-start",
              label: "TanStack Start",
              href: links.tanstackStart,
              brand: ["tanstack"],
            },
            { id: "vite", label: "Vite", href: links.vite, brand: ["vite"], isNew: true },
          ],
        },
        { id: "ai-tools", label: "AI tools", href: links.aiTools, icon: BotIcon, isNew: true },
        { id: "migration", label: "Migration", href: links.migration, icon: RouteIcon },
      ],
    },
    {
      label: "Building blocks",
      items: [
        {
          id: "foundations",
          label: "Foundations",
          href: links.foundations,
          icon: PaletteIcon,
          // Storybook's order (qeetrix-story), whose pages these are; its Iconography and Brand pages
          // are under Icons.
          items: [
            { id: "foundations-colour", label: "Colour", href: links.colour },
            { id: "foundations-typography", label: "Typography", href: links.typography },
            { id: "foundations-spacing", label: "Spacing", href: links.spacing },
            { id: "foundations-elevation", label: "Elevation", href: links.elevation },
            { id: "foundations-motion", label: "Motion", href: links.motion },
          ],
        },
        {
          id: "components",
          label: "Components",
          href: links.components,
          icon: BlocksIcon,
          count: String(counts.components),
          items: categories.map((c) => ({
            id: `components-${c.id}`,
            label: c.name,
            href: categoryHref(c.id),
            count: String(c.items.length),
            items: c.items.map((item) => ({
              id: `component-${slug(item.name)}`,
              label: item.name,
              href: componentHref(item.name),
            })),
          })),
        },
        {
          id: "patterns",
          label: "Patterns",
          href: links.patterns,
          icon: LayoutTemplateIcon,
          items: pages(
            links.patterns,
            ["Sign-in", "Dashboard header", "User detail", "Account settings"],
            "patterns",
          ),
        },
        {
          id: "icons",
          label: "Icons",
          href: links.icons,
          icon: ShapesIcon,
          count: formatNumber(counts.icons, "en-IN"),
          // The Icons page is Storybook's Iconography; Brand is its Brand page (logo, colour, tenants).
          items: [
            { id: "icons-browser", label: "Icon browser", href: `${links.icons}/browser` },
            { id: "icons-brand", label: "Brand", href: links.brand },
          ],
        },
      ],
    },
    {
      label: "Guides",
      items: pages(
        links.guides,
        ["Theming", "Accessibility", "Right to left", "Server rendering"],
        "guides",
      ),
    },
    {
      label: "Resources",
      items: [
        { label: "Release notes", href: links.changelog.react, icon: ScrollTextIcon },
        {
          id: "release-phases",
          label: "Release phases",
          href: links.releasePhases,
          icon: LayersIcon,
        },
      ],
    },
  ],
  help: [
    { label: "Feedback", href: links.feedback, icon: MessageSquareTextIcon },
    { label: "Support", href: links.support, icon: LifeBuoyIcon },
  ],
  version: packages.react,
  footer: {
    legal: site.footer.legal,
    links: [
      { label: "Release notes", href: links.changelog.react },
      { label: "GitHub", href: links.github },
      { label: "npm", href: links.npm },
      { label: "qeet.in", href: links.qeet },
    ],
  },
  source: (file) => `${links.source}/${file}`,
};
