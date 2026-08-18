"use client";

import type { CommandPaletteItem } from "@qeetrix/ui";
import { Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { buildItems } from "@/lib/search-index";

type Hit = { item: CommandPaletteItem; href: string; group: string };

/** Narrow the (unknown) payload down to items that resolve to a route. */
function hrefOf(payload: unknown): string | undefined {
  if (payload && typeof payload === "object" && "href" in payload) {
    const href = (payload as { href: unknown }).href;
    if (typeof href === "string") return href;
  }
  return undefined;
}

function haystack(item: CommandPaletteItem): string {
  return [item.title, item.group ?? "", ...(item.keywords ?? [])].join(" ").toLowerCase();
}

export function SearchView() {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Only routable items are searchable here (skip the toggle-theme action).
  const hits = useMemo<Hit[]>(
    () =>
      buildItems().flatMap((item) => {
        const href = hrefOf(item.payload);
        return href ? [{ item, href, group: item.group ?? "Other" }] : [];
      }),
    [],
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const q = query.trim().toLowerCase();
  const filtered = q ? hits.filter((h) => haystack(h.item).includes(q)) : hits;

  // Cluster by group heading, preserving first-seen order.
  const groups = useMemo(() => {
    const map = new Map<string, Hit[]>();
    for (const hit of filtered) {
      const list = map.get(hit.group);
      if (list) list.push(hit);
      else map.set(hit.group, [hit]);
    }
    return [...map.entries()];
  }, [filtered]);

  return (
    <div className="space-y-8">
      <div className="relative">
        <Search
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
        />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search components, tokens, foundations, and pages…"
          aria-label="Search"
          className="h-11 w-full rounded-lg border border-border bg-card pr-3 pl-9 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        />
      </div>

      <p className="text-sm text-muted-foreground" aria-live="polite">
        {filtered.length} result{filtered.length === 1 ? "" : "s"}
        {q ? (
          <>
            {" "}
            for <span className="font-medium text-foreground">{query}</span>
          </>
        ) : null}
      </p>

      {groups.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-8 text-center">
          <p className="font-medium text-foreground">No matches</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Nothing matched “{query}”. Try a component, token, or foundation name.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {groups.map(([group, items]) => (
            <section key={group} className="space-y-2">
              <h2 className="font-display text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                {group}
              </h2>
              <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
                {items.map((hit) => (
                  <li key={hit.item.id}>
                    <Link
                      href={hit.href}
                      className="flex items-center justify-between gap-3 px-4 py-3 text-sm transition-colors hover:bg-muted"
                    >
                      <span className="text-foreground">{hit.item.title}</span>
                      <span className="shrink-0 font-mono text-xs text-muted-foreground">
                        {hit.group}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
