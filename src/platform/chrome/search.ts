// The docs search's triggers, without React: the header's Search button, / outside a field, and ⌘K
// or Ctrl+K until the palette (SearchPalette.tsx, an island hydrated when the browser is idle) is
// ready. Each asks the palette to open with a "qx-search-open" event; one that comes before it has
// hydrated is kept in qxSearchPending, and the palette opens as soon as it's ready.
const ask = () => {
  window.qxSearchPending = true;
  document.dispatchEvent(new Event("qx-search-open"));
};

for (const button of document.querySelectorAll("[data-site-search]"))
  button.addEventListener("click", ask);

document.addEventListener("keydown", (event) => {
  const typing =
    event.target instanceof HTMLElement &&
    event.target.closest("input, textarea, select, [contenteditable]");
  if ((event.key === "k" || event.key === "K") && (event.metaKey || event.ctrlKey)) {
    // Once the palette is ready, its own hotkey opens and closes it.
    if (window.qxSearchReady) return;
    event.preventDefault();
    ask();
  } else if (event.key === "/" && !typing && !event.metaKey && !event.ctrlKey && !event.altKey) {
    event.preventDefault();
    ask();
  }
});

export {};
