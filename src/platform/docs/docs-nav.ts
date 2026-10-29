// The docs navigation's behaviour (DocsSidebar.tsx is Qeetrix's Sidebar, rendered to HTML): a
// folder opens and closes on its chevron, as the Sidebar does once React runs, and the filter
// searches the whole tree, listing every match with where it lives.
const nav = document.querySelector<HTMLElement>(".doc-nav");

if (nav) {
  nav.addEventListener("click", (event) => {
    const fold = (event.target as Element).closest<HTMLElement>(
      ".qx-sidebar-fold, button.qx-sidebar-item[aria-controls]",
    );
    const list = fold && document.getElementById(fold.getAttribute("aria-controls") ?? "");
    if (!fold || !list) return;
    const open = fold.getAttribute("aria-expanded") !== "true";
    fold.setAttribute("aria-expanded", String(open));
    fold.toggleAttribute("data-open", open);
    list.hidden = !open;
    // A closed folder carries the current mark for the page inside it.
    const row = fold
      .closest(".qx-sidebar-entry")
      ?.querySelector<HTMLElement>(":scope > .qx-sidebar-item");
    if (row?.hasAttribute("data-holds-current"))
      row.toggleAttribute("data-current", !open || row.getAttribute("aria-current") === "page");
  });

  const input = nav.querySelector<HTMLInputElement>('input[type="search"]');
  const clear = nav.querySelector<HTMLElement>("[data-doc-nav-clear]");
  const results = nav.querySelector<HTMLElement>("[data-doc-nav-results]");
  const label = results?.querySelector(".qx-sidebar-group-label");
  const groups = nav.querySelectorAll<HTMLElement>("[data-doc-nav-tree]");
  const pages = [...(results?.querySelectorAll<HTMLElement>("[data-match]") ?? [])].map((link) => ({
    entry: link.closest("li") as HTMLElement,
    text: link.dataset.match ?? "",
  }));

  const filter = () => {
    if (!input || !results) return;
    const query = input.value.trim().toLowerCase();
    let found = 0;
    for (const { entry, text } of pages) {
      const match = query !== "" && text.includes(query);
      entry.hidden = !match;
      if (match) found++;
    }
    results.hidden = query === "";
    for (const group of groups) group.hidden = query !== "";
    if (clear) clear.hidden = input.value === "";
    if (label)
      label.textContent = found ? `${found} ${found === 1 ? "page" : "pages"}` : "No pages match";
  };

  input?.addEventListener("input", filter);
  // Escape clears the filter first, as Qeetrix's SearchField does.
  input?.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || input.value === "") return;
    event.preventDefault();
    input.value = "";
    filter();
  });
  clear?.addEventListener("click", () => {
    if (!input) return;
    input.value = "";
    filter();
    input.focus();
  });
  // A page restored from history may bring its query back.
  filter();
}

// A module, so its names stay its own.
export {};
