// The docs search: a native <dialog> (SiteHeader.astro) over the product's /search-index.json,
// fetched on first open. ⌘K or Ctrl+K anywhere, or / outside a field, opens it; the arrows move
// through the results, Enter follows one, Escape closes. No React.
interface Entry {
  title: string;
  url: string;
  section: string;
  line?: string;
  keywords?: string;
}

const dialog = document.querySelector<HTMLDialogElement>("#site-search");
const input = dialog?.querySelector<HTMLInputElement>("[data-search-input]");
const list = dialog?.querySelector<HTMLElement>("[data-search-results]");
const note = dialog?.querySelector<HTMLElement>("[data-search-note]");
const status = dialog?.querySelector<HTMLElement>("[data-search-status]");

let index: Entry[] | undefined;
let active = -1;
let shown: Entry[] = [];

const load = async () => {
  index ??= await fetch("/search-index.json").then((response) =>
    response.ok ? response.json() : [],
  );
  return index ?? [];
};

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

const select = (next: number) => {
  const options = list?.querySelectorAll<HTMLElement>("[role=option]") ?? [];
  active = options.length ? (next + options.length) % options.length : -1;
  for (const [i, option] of [...options].entries())
    option.setAttribute("aria-selected", String(i === active));
  const current = options[active];
  if (current) {
    input?.setAttribute("aria-activedescendant", current.id);
    current.scrollIntoView({ block: "nearest" });
  } else input?.removeAttribute("aria-activedescendant");
};

const render = async () => {
  if (!input || !list || !note || !status) return;
  const query = input.value.trim().toLowerCase();
  const words = query.split(/\s+/).filter(Boolean);
  const entries = await load();
  shown = words.length
    ? entries
        .map((entry) => [entry, score(entry, words)] as const)
        .filter(([, value]) => value > 0)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 12)
        .map(([entry]) => entry)
    : [];
  list.replaceChildren(
    ...shown.map((entry, i) => {
      const item = document.createElement("div");
      item.id = `site-search-${i}`;
      item.setAttribute("role", "option");
      item.setAttribute("aria-selected", "false");
      const link = document.createElement("a");
      link.href = entry.url;
      link.tabIndex = -1;
      const title = document.createElement("b");
      title.textContent = entry.title;
      const meta = document.createElement("span");
      meta.textContent = entry.line ? `${entry.section} · ${entry.line}` : entry.section;
      link.append(title, meta);
      item.append(link);
      return item;
    }),
  );
  input.setAttribute("aria-expanded", String(shown.length > 0));
  note.hidden = words.length > 0 && shown.length > 0;
  note.textContent = words.length
    ? `No results for “${input.value.trim()}”.`
    : "Pages, guides and every component.";
  status.textContent = words.length
    ? `${shown.length} ${shown.length === 1 ? "result" : "results"}`
    : "";
  select(0);
};

const open = () => {
  if (!dialog || dialog.open) return;
  dialog.showModal();
  input?.select();
  void load();
};

if (dialog && input) {
  for (const button of document.querySelectorAll("[data-site-search]"))
    button.addEventListener("click", open);
  document.addEventListener("keydown", (event) => {
    const typing =
      event.target instanceof HTMLElement &&
      event.target.closest("input, textarea, select, [contenteditable]");
    if ((event.key === "k" || event.key === "K") && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      if (dialog.open) dialog.close();
      else open();
    } else if (event.key === "/" && !typing && !dialog.open) {
      event.preventDefault();
      open();
    }
  });
  input.addEventListener("input", () => void render());
  input.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      select(active + (event.key === "ArrowDown" ? 1 : -1));
    } else if (event.key === "Escape") {
      // A search field's Escape only clears it: here it closes the search, as the hint says.
      event.preventDefault();
      dialog.close();
    } else if (event.key === "Enter" && shown[active]) {
      event.preventDefault();
      location.href = shown[active].url;
    }
  });
  // A click on the backdrop lands on the dialog itself; the panel fills the rest.
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
}

export {};
