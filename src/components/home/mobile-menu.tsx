"use client";

import { MenuIcon } from "@qeetrix/icons";
import {
  IconButton,
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@qeetrix/ui";
import Github from "@thesvg/react/github";
import { ThemeSwitch } from "fumadocs-ui/layouts/shared/slots/theme-switch";
import Link from "next/link";
import { links, primaryNav } from "@/lib/site-links";

/**
 * The primary navigation below the `lg` breakpoint: a sheet that closes when a link is chosen. Its
 * footer carries the theme switch, which the header drops on phones to make room for search.
 */
export function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <IconButton
            icon={MenuIcon}
            aria-label="Open menu"
            variant="ghost"
            className="lg:hidden"
          />
        }
      />
      <SheetContent side="right" className="w-72">
        <SheetHeader>
          <SheetTitle>Qeetrix</SheetTitle>
        </SheetHeader>
        <SheetBody>
          <nav aria-label="Primary">
            <ul className="flex flex-col">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <SheetClose
                    render={
                      <Link
                        href={item.href}
                        className="block rounded-md px-3 py-2.5 text-body text-foreground transition-colors duration-fast hover:bg-surface-interactive focus-visible:focus-ring"
                      />
                    }
                  >
                    {item.label}
                  </SheetClose>
                </li>
              ))}
            </ul>
          </nav>
          <a
            href={links.github}
            className="mt-4 flex items-center gap-2 rounded-md px-3 py-2.5 text-body text-muted-foreground transition-colors duration-fast hover:bg-surface-interactive hover:text-foreground focus-visible:focus-ring"
          >
            <Github variant="mono" aria-hidden className="size-4" />
            GitHub
          </a>
        </SheetBody>
        <SheetFooter className="flex-row items-center justify-between border-t border-border-subtle">
          <span className="text-label text-muted-foreground">Theme</span>
          <ThemeSwitch />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
