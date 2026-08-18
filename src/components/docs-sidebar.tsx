"use client";

import { cn } from "@qeetrix/ui";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AREAS, getArea, isLinkActive, type SideArea } from "@/lib/nav";

/**
 * Contextual left-rail navigation tree. Resolves the current area from the
 * pathname and renders its grouped links with an active-state marker. Used
 * both in the desktop sticky rail (PageShell) and the mobile nav Sheet.
 */
export function DocsNavTree({
  area: areaProp,
  onNavigate,
  className,
}: {
  /** Override the resolved area (mobile Sheet shows a chosen area). */
  area?: SideArea;
  /** Called after a link is chosen — lets the mobile Sheet close itself. */
  onNavigate?: () => void;
  className?: string;
}) {
  const pathname = usePathname();
  const area = areaProp ?? getArea(pathname) ?? AREAS[0];

  return (
    <nav aria-label={`${area.title} navigation`} className={cn("text-sm", className)}>
      <div className="space-y-6">
        {area.groups.map((group) => (
          <div key={group.title}>
            <p className="mb-2 px-3 font-ui text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              {group.title}
            </p>
            <ul className="space-y-0.5">
              {group.links.map((link) => {
                const active = isLinkActive(link.href, pathname);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      onClick={onNavigate}
                      className={cn(
                        "block rounded-md border-s-2 px-3 py-1.5 transition-colors",
                        active
                          ? "border-brand bg-brand/5 font-medium text-foreground"
                          : "border-transparent text-muted-foreground hover:border-border hover:bg-accent hover:text-foreground",
                      )}
                    >
                      {link.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}
