import type { QeetrixIcon } from "@qeetrix/react";
import type { LogoName } from "./components/Logo";

/** A link in the site's chrome. */
export interface SiteLink {
  label: string;
  href: string;
}

/**
 * What the platform's header and footer need from the product that uses them. Each product (the
 * Qeetrix docs today; Qeet ID and Qeet Pay docs later) supplies one.
 */
export interface SiteChrome {
  /** The product's name, shown beside the Qeet logo: "Qeetrix". */
  name: string;
  /** The home page. */
  home: string;
  /** The primary navigation, in the header and the mobile menu. */
  nav: readonly SiteLink[];
  /** The source repository, linked from the header. */
  github: SiteLink;
  footer: {
    /** One line under the name. */
    tagline: string;
    columns: readonly { title: string; links: readonly SiteLink[] }[];
    social: readonly (SiteLink & { logo: LogoName })[];
    /** The copyright line. */
    legal: string;
    /** An optional second line at the end, e.g. the package versions. */
    meta?: string;
  };
}

/** A page in the docs navigation, or a folder of pages; a folder with an href is a page too. */
export interface DocsNavItem {
  label: string;
  /** Marks the current page: a docs page names its id. */
  id?: string;
  href?: string;
  icon?: QeetrixIcon;
  /** The icon fills when its page is current (for icons with a filled drawing). */
  filledWhenCurrent?: boolean;
  /** A brand's own mark instead of an icon: its light drawing, and its dark one where it has one. */
  brand?: readonly [light: LogoName, dark?: LogoName];
  /** A count beside the label. */
  count?: string;
  /** Marked New. */
  isNew?: boolean;
  /** Open even when the current page isn't inside it. */
  open?: boolean;
  items?: readonly DocsNavItem[];
}

/** What the platform's docs frame needs from the product: its navigation, footer and source. */
export interface DocsChrome {
  /** The navigation rail, in labelled groups. */
  groups: readonly { label: string; items: readonly DocsNavItem[] }[];
  /** The links at the rail's foot (feedback, support). */
  help: readonly DocsNavItem[];
  /** The package and version at the very foot, beside the theme menu. */
  version: { name: string; version: string };
  /** The slim footer under each page. */
  footer: { legal: string; links: readonly SiteLink[] };
  /** A page's source file, for Edit on GitHub. */
  source: (file: string) => string;
}
