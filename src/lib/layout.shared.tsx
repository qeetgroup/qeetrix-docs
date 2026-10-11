import { BookOpenIcon } from "@qeetrix/icons";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

/**
 * Options for the docs layout. The brand, the theme switch and the GitHub link live in the site
 * header above it, so the sidebar's title names the docs instead of repeating the logo, and the
 * layout draws neither its own theme switch nor a GitHub icon link.
 */
export function baseOptions(): BaseLayoutProps {
  return {
    themeSwitch: { enabled: false },
    nav: {
      title: (
        <>
          <BookOpenIcon
            aria-hidden
            className="size-4 text-[var(--qx-color-text-brand)]"
          />
          Documentation
        </>
      ),
    },
  };
}
