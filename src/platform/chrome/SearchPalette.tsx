// The docs search: Qeetrix's SiteSearch over the product's /search-index.json, fetched on first
// open. ⌘K or Ctrl+K anywhere (the search's own hotkey), / outside a field, or the header's Search
// button opens it (search.ts, which also catches a click before this island has hydrated). The
// results are ranked here, through onQueryChange: every word must match, a title that starts with
// one counts most. Each result is a link, its section in small caps over it, and a component's
// status beside that, as its page shows it.
import { Badge, QeetrixProvider } from "@qeetrix/react";
import { SiteSearch, type SiteSearchResult } from "@qeetrix/react/experimental";
import { useEffect, useMemo, useState } from "react";

interface Entry {
  title: string;
  url: string;
  section: string;
  line?: string;
  keywords?: string;
  /** A component's release phase. */
  status?: "stable" | "experimental";
}

declare global {
  interface Window {
    /** Set by search.ts when Search is asked for before this island has hydrated. */
    qxSearchPending?: boolean;
    /** Set once this island is ready, so search.ts leaves ⌘K to the search. */
    qxSearchReady?: boolean;
  }
}

let index: Promise<Entry[]> | undefined;
const load = () =>
  (index ??= fetch("/search-index.json")
    .then((response) => (response.ok ? response.json() : []))
    .catch(() => []));

/** Every word must match; the title's start counts most, then the title, then the rest. */
const score = (entry: Entry, words: string[]) => {
  const title = entry.title.toLowerCase();
  const rest = `${entry.section} ${entry.line ?? ""} ${entry.keywords ?? ""}`.toLowerCase();
  let total = 0;
  for (const word of words) {
    if (title.startsWith(word)) total += 4;
    else if (title.includes(word)) total += 2;
    else if (rest.includes(word)) total += 1;
    else return 0;
  }
  return total;
};

/** How many results are shown: the docs have no search page to send the rest to. */
const SHOWN = 10;

/** Before anything is typed: where most people start. Each finds its page first. */
const SUGGESTIONS = ["Installation", "Button", "Date picker", "Colour", "Theming"];

/** A component's section is its category, under Components. */
const kindOf = (entry: Entry) => (entry.status ? `Components · ${entry.section}` : entry.section);

const result = (entry: Entry): SiteSearchResult => ({
  href: entry.url,
  title: entry.title,
  kind: kindOf(entry),
  ...(entry.line ? { description: entry.line } : {}),
  ...(entry.status
    ? {
        badge: (
          <Badge tone={entry.status === "stable" ? "success" : "warning"}>
            {entry.status === "stable" ? "Stable" : "Experimental"}
          </Badge>
        ),
      }
    : {}),
});

const rank = (entries: Entry[], query: string): SiteSearchResult[] => {
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  return entries
    .map((entry) => [entry, score(entry, words)] as const)
    .filter(([, value]) => value > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, SHOWN)
    .map(([entry]) => result(entry));
};

export function SearchPalette() {
  const [open, setOpen] = useState(false);
  const [entries, setEntries] = useState<Entry[]>();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const show = () => {
      window.qxSearchPending = false;
      setOpen(true);
    };
    document.addEventListener("qx-search-open", show);
    window.qxSearchReady = true;
    if (window.qxSearchPending) show();
    return () => {
      document.removeEventListener("qx-search-open", show);
      window.qxSearchReady = false;
    };
  }, []);

  useEffect(() => {
    if (open && !entries) void load().then(setEntries);
  }, [open, entries]);

  const results = useMemo(() => rank(entries ?? [], query), [entries, query]);

  return (
    <QeetrixProvider locale="en-IN">
      <SiteSearch
        open={open}
        onOpenChange={setOpen}
        title="Search Qeetrix"
        placeholder="Search components, foundations, guides…"
        suggestions={SUGGESTIONS}
        results={results}
        onQueryChange={setQuery}
        loading={open && !entries && query.trim() !== ""}
      />
    </QeetrixProvider>
  );
}
