import Github from "@thesvg/react/github";
import {
  FullSearchTrigger,
  SearchTrigger,
} from "fumadocs-ui/layouts/shared/slots/search-trigger";
import { ThemeSwitch } from "fumadocs-ui/layouts/shared/slots/theme-switch";
import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { links, primaryNav } from "@/lib/site-links";
import { MobileMenu } from "./mobile-menu";
import { container } from "./section";

/**
 * The landing page's header. Search and the theme switch are the very controls the docs shell
 * uses (Fumadocs' search trigger and theme switch), so moving into /docs keeps one search dialog
 * and one theme.
 */
export function HomeHeader() {
  return (
    <header className="sticky top-0 z-(--qx-z-sticky) border-b border-border-subtle bg-background">
      <div className={`${container} flex h-16 items-center gap-6`}>
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 rounded-md font-heading text-heading font-semibold text-foreground focus-visible:focus-ring"
        >
          <BrandMark height={22} />
          Qeetrix
        </Link>

        <nav aria-label="Primary" className="mx-auto hidden lg:block">
          <ul className="flex items-center gap-1">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-md px-3.5 py-2 text-body text-foreground/80 transition-colors duration-fast hover:text-foreground focus-visible:focus-ring"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ms-auto flex items-center gap-2 lg:ms-0">
          <FullSearchTrigger className="hidden w-60 md:flex" />
          <SearchTrigger className="md:hidden" />
          <span
            aria-hidden
            className="mx-1 hidden h-5 w-px bg-border-subtle sm:block"
          />
          <ThemeSwitch className="hidden sm:flex" />
          <a
            href={links.github}
            aria-label="Qeetrix on GitHub"
            className="inline-flex size-9 items-center justify-center rounded-md text-foreground transition-colors duration-fast hover:bg-surface-interactive focus-visible:focus-ring"
          >
            <Github variant="mono" aria-hidden className="size-6" />
          </a>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
