"use client";

import { TableOfContents, type TocItem } from "@qeetrix/ui";
import { usePathname } from "next/navigation";
import * as React from "react";

const CONTENT_ID = "doc-content";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\da-z\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Right-rail table of contents. Scans the rendered `#doc-content` region for
 * h2/h3 headings, assigns stable ids where missing, and feeds the library's
 * scroll-spy `TableOfContents`. Runs on the client so every existing prose
 * page gains an "On this page" rail with zero per-page changes. Renders
 * nothing when a page has fewer than two headings.
 *
 * Keyed by pathname so it remounts (and re-scans) on client-side navigation.
 */
export function DocToc() {
  const pathname = usePathname();
  return <DocTocRail key={pathname} />;
}

function DocTocRail() {
  const [items, setItems] = React.useState<TocItem[]>([]);

  React.useEffect(() => {
    const root = document.getElementById(CONTENT_ID);
    if (!root) return;
    const headings = Array.from(root.querySelectorAll<HTMLHeadingElement>("h2, h3"));
    const seen = new Set<string>();
    const next: TocItem[] = [];
    for (const el of headings) {
      const label = el.textContent?.trim();
      if (!label) continue;
      let id = el.id || slugify(label);
      if (!id) continue;
      let n = 2;
      const base = id;
      while (seen.has(id)) id = `${base}-${n++}`;
      seen.add(id);
      if (!el.id) el.id = id;
      el.style.scrollMarginTop = "5rem";
      next.push({ id, label, depth: el.tagName === "H3" ? 1 : 0 });
    }
    setItems(next);
  }, []);

  if (items.length < 2) return null;

  return (
    <div className="text-sm">
      <p className="mb-3 font-ui text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        On this page
      </p>
      <TableOfContents items={items} />
    </div>
  );
}
