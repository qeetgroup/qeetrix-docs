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
  /** The product's name, shown beside its icon: "Qeetrix". */
  name: string;
  /**
   * The product's own icon, its rounded tile in the Qeet format (Qeet orange, the product's mark in
   * a white disc), shown before the name in the header and the footer. One square file that reads
   * on light and dark: the favicon, so the page and the browser tab show the same icon.
   */
  icon: string;
  /** The home page. */
  home: string;
  /** The primary navigation, in the header and the mobile menu. */
  nav: readonly SiteLink[];
  /** The source repository, linked from the header. */
  github: SiteLink;
  /**
   * The footer every Qeet site ends on (qeet.in's, as Qeet ID's site has it): always dark; the product
   * and its line, a feature beside them, the link columns, where to follow the group, the legal line,
   * and the group's name set at the width of the page.
   */
  footer: {
    /** One line under the name. */
    tagline: string;
    /** The button under the line: where to start. */
    action: SiteLink;
    /** Beside the name, where qeet.in has its newsletter and Qeet ID its status: a label, a title, a line, a link. */
    feature: { label: string; title: string; line: string; link: SiteLink };
    columns: readonly { title: string; links: readonly SiteLink[] }[];
    /** Where to follow the organisation, by each network's name. */
    follow: { title: string; links: readonly (SiteLink & { name: string })[] };
    /** The copyright line. */
    legal: string;
    /** Beside it: whose this is, and where. */
    based: string;
    /** The organisation's name, set at the width of the page under it all: every Qeet site signs off with it. */
    signature: string;
  };
}

/** A page in the docs navigation, or a folder of pages; a folder with an href is a page too. */
export interface DocsNavItem {
  label: string;
  /** Marks the current page: a docs page names its id. */
  id?: string;
  href?: string;
  icon?: QeetrixIcon;
  /**
   * The icon fills when its page is current, as Qeetrix's SidebarItem does by default; false keeps
   * the outline. An icon with no filled drawing keeps its outline either way.
   */
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
