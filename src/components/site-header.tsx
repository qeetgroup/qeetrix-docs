"use client";

// @qeetrix/ui's cn knows the type-role sizes (text-label, text-body, …); the plain one drops them.
import { cn } from "@qeetrix/ui";
import Github from "@thesvg/react/github";
import {
  FullSearchTrigger,
  SearchTrigger,
} from "fumadocs-ui/layouts/shared/slots/search-trigger";
import { ThemeSwitch } from "fumadocs-ui/layouts/shared/slots/theme-switch";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandMark } from "@/components/brand-mark";
import { MobileMenu } from "@/components/home/mobile-menu";
import { container } from "@/components/home/section";
import { links, primaryNav } from "@/lib/site-links";

/** The nav entry a path belongs to: the longest matching href, so /docs/components beats /docs. */
function activeHref(pathname: string) {
  let best: string | undefined;
  for (const { href } of primaryNav) {
    const match = pathname === href || pathname.startsWith(`${href}/`);
    if (match && (!best || href.length > best.length)) best = href;
  }
  return best;
}

/**
 * The site header, one component for the homepage, the docs and the icon browser, so all three
 * have the same brand, navigation, search, theme switch and GitHub link at the same size. Search
 * and the theme switch are Fumadocs' own controls, so there is one search dialog and one theme
 * across the site. The section you are in is marked; on the homepage nothing is.
 *
 * Its height is `--site-header-height` (global.css): the docs layout and the icon browser offset
 * their sticky parts by it.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const active = activeHref(pathname);

  return (
    <header className="home-header sticky top-0 z-(--qx-z-sticky) border-b border-border-subtle bg-background/95 supports-backdrop-filter:bg-background/85 supports-backdrop-filter:backdrop-blur-xl">
      <div className={`${container} flex h-16 items-center gap-6`}>
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 rounded-md font-heading text-heading font-semibold text-foreground focus-visible:focus-ring"
        >
          <BrandMark height={22} />
          Qeetrix
        </Link>

        <nav aria-label="Primary" className="mx-auto hidden xl:block">
          <ul className="flex items-center gap-1">
            {primaryNav.map((item) => {
              const current = item.href === active;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={current ? "page" : undefined}
                    className={cn(
                      "rounded-md px-3.5 py-2 text-body transition-colors duration-fast hover:bg-surface-interactive hover:text-foreground focus-visible:focus-ring",
                      current
                        ? "bg-surface-interactive font-medium text-foreground"
                        : "text-foreground/80",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ms-auto flex items-center gap-2 xl:ms-0">
          <FullSearchTrigger className="hidden w-52 md:flex 2xl:w-60" />
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
