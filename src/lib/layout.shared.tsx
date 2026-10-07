import { BookOpenIcon } from "@qeetrix/icons";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { gitConfig } from "./shared";

/**
 * Options for the docs layout. The brand lives in the site header above it, so the sidebar's
 * title names the docs instead of repeating the logo.
 */
export function baseOptions(): BaseLayoutProps {
  return {
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
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
