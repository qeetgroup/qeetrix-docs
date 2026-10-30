// The docs search: Qeetrix's CommandPalette over the product's /search-index.json, fetched on first
// open. ⌘K or Ctrl+K anywhere (the palette's own hotkey), / outside a field, or the header's Search
// button opens it (search.ts, which also catches a click before this island has hydrated). The
// results are ranked here, through onQueryChange: every word must match, a title that starts with
// one counts most. They're grouped by section, each section where its best result ranks.
import { QeetrixProvider } from "@qeetrix/react";
import { type CommandGroup, type CommandItem, CommandPalette } from "@qeetrix/react/experimental";
import { useEffect, useMemo, useState } from "react";

interface Entry {
  title: string;
  url: string;
  section: string;
  line?: string;
  keywords?: string;
}

declare global {
  interface Window {
    /** Set by search.ts when Search is asked for before this island has hydrated. */
    qxSearchPending?: boolean;
    /** Set once this island is ready, so search.ts leaves ⌘K to the palette. */
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

const item = (entry: Entry): CommandItem => ({
  value: entry.url,
  label: entry.title,
  description: entry.line,
});

/** Before anything is typed: where most people start. */
const START = "Get started";
const STARTERS = ["Introduction", "Installation", "Frameworks", "AI tools", "Migration"];

const rank = (entries: Entry[], query: string): CommandGroup[] => {
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) {
    const starters = STARTERS.flatMap((title) =>
      entries.filter((entry) => entry.section === START && entry.title === title),
    );
    return starters.length ? [{ label: START, items: starters.map(item) }] : [];
  }
  const ranked = entries
    .map((entry) => [entry, score(entry, words)] as const)
    .filter(([, value]) => value > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .map(([entry]) => entry);
  const sections = new Map<string, Entry[]>();
  for (const entry of ranked)
    sections.set(entry.section, [...(sections.get(entry.section) ?? []), entry]);
  return [...sections].map(([label, list]) => ({ label, items: list.map(item) }));
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

  const groups = useMemo(() => rank(entries ?? [], query), [entries, query]);

  return (
    <QeetrixProvider locale="en-IN">
      <CommandPalette
        open={open}
        onOpenChange={setOpen}
        groups={groups}
        onQueryChange={setQuery}
        loading={open && !entries}
        placeholder="Search the docs"
        messages={{ label: "Search the docs" }}
        onSelect={(chosen) => location.assign(chosen.value)}
      />
    </QeetrixProvider>
  );
}
