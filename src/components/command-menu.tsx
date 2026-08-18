"use client";

import { CommandPalette, type CommandPaletteItem, useTheme } from "@qeetrix/ui";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { buildItems, type SearchPayload } from "@/lib/search-index";

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const items = useMemo(() => buildItems(), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const onSelect = (item: CommandPaletteItem) => {
    const p = item.payload as SearchPayload | undefined;
    if (!p) return;
    if ("action" in p && p.action === "toggle-theme") {
      setTheme(theme === "dark" ? "light" : "dark");
      return;
    }
    if ("href" in p) router.push(p.href);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex h-8 items-center gap-2 rounded-lg border border-border bg-card px-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        aria-label="Search (Command or Control + K)"
      >
        <Search className="size-4" />
        <span className="hidden sm:inline">Search…</span>
        <kbd className="ml-2 hidden rounded border border-border bg-muted px-1.5 font-mono text-[0.65rem] sm:inline">
          ⌘K
        </kbd>
      </button>
      <CommandPalette
        open={open}
        onOpenChange={setOpen}
        items={items}
        onSelect={onSelect}
        placeholder="Search components, tokens, docs…"
        emptyMessage="No matches — try a component or token name."
      />
    </>
  );
}
