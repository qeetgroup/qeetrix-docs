"use client";

import {
  Button,
  buttonVariants,
  cn,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@qeetrix/ui";
import { Github, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CommandMenu } from "@/components/command-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { AREAS, getArea, isLinkActive, type SideArea } from "@/lib/nav";
import { SITE } from "@/lib/site";

/** Column count for an area's mega-menu, from its group count. */
function panelClass(groups: number): string {
  if (groups >= 3) return "w-184 grid-cols-3";
  if (groups === 2) return "w-128 grid-cols-2";
  return "w-72 grid-cols-1";
}

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 font-display text-lg font-semibold">
      <span className="inline-block size-5 rounded-md bg-brand" aria-hidden />
      Qeetrix
    </Link>
  );
}

function AreaMenu({ area, active }: { area: SideArea; active: boolean }) {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className={cn(active && "text-brand-text")}>
        {area.title}
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className={cn("grid gap-x-6 gap-y-4 p-2", panelClass(area.groups.length))}>
          {area.groups.map((group) => (
            <div key={group.title}>
              <p className="px-2 pb-1 font-ui text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                {group.title}
              </p>
              <ul>
                {group.links.map((link) => (
                  <li key={link.href}>
                    <NavigationMenuLink render={<Link href={link.href} />}>
                      <div className="font-medium text-foreground">{link.title}</div>
                      {link.description && (
                        <p className="line-clamp-1 text-xs text-muted-foreground">
                          {link.description}
                        </p>
                      )}
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

function MobileNav({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open navigation" />
        }
      >
        <Menu className="size-5" />
      </SheetTrigger>
      <SheetContent side="left" className="w-80 max-w-[85vw]">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto px-4 pb-8">
          <div className="space-y-6 text-sm">
            {AREAS.map((area) => (
              <div key={area.id}>
                <p className="mb-2 font-display text-sm font-semibold text-foreground">
                  {area.title}
                </p>
                {area.groups.map((group) => (
                  <ul key={group.title} className="mb-3 space-y-0.5">
                    {group.links.map((link) => {
                      const active = isLinkActive(link.href, pathname);
                      return (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            onClick={close}
                            aria-current={active ? "page" : undefined}
                            className={cn(
                              "block rounded-md border-s-2 px-3 py-1.5 transition-colors",
                              active
                                ? "border-brand bg-brand/5 font-medium text-foreground"
                                : "border-transparent text-muted-foreground hover:bg-accent hover:text-foreground",
                            )}
                          >
                            {link.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                ))}
              </div>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const activeArea = getArea(pathname);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md backdrop-saturate-150">
      <div className="mx-auto flex h-14 max-w-360 items-center gap-2 px-4 sm:px-6">
        <MobileNav pathname={pathname} />
        <Logo />

        <NavigationMenu className="ml-2 hidden lg:flex">
          <NavigationMenuList>
            {AREAS.map((area) => (
              <AreaMenu key={area.id} area={area} active={activeArea?.id === area.id} />
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <CommandMenu />
          <Link
            href="/play"
            className={buttonVariants({
              variant: "outline",
              size: "sm",
              className: "hidden md:inline-flex",
            })}
          >
            Playground
          </Link>
          <ThemeToggle />
          <a
            href={SITE.github}
            target="_blank"
            rel="noreferrer"
            aria-label="Qeetrix on GitHub"
            className={buttonVariants({
              variant: "ghost",
              size: "icon",
              className: "hidden sm:inline-flex",
            })}
          >
            <Github className="size-4" />
          </a>
        </div>
      </div>
    </header>
  );
}
