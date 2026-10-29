// The Icon browser (IconBrowser.tsx renders it to HTML): search by name, tag, alias or category; switch
// shape and drawing, and take the size and the colour from their islands ("qf-icon-size" and
// "qf-icon-colour" events); move through the grid with the arrow keys (one Tab stop); open an icon's
// details in the details island (IconDetail.tsx, a "qf-icon-detail" event), which stays open while
// you pick others; copy its import, JSX or SVG, in the colour picked. The query and the category live
// in the address (?q=…#category), so a search can be shared.
import { copyText } from "../foundations/copy";

const root = document.querySelector<HTMLElement>("[data-qf-browser]");

if (root) {
  const sheet = root.dataset.sheet ?? "/icons/sprite";
  const input = root.querySelector<HTMLInputElement>('input[type="search"]');
  const clear = root.querySelector<HTMLElement>("[data-qf-browser-clear]");
  const count = root.querySelector<HTMLElement>("[data-qf-count]");
  const empty = root.querySelector<HTMLElement>("[data-qf-empty]");
  const grid = root.querySelector<HTMLElement>("[data-qf-grid]");
  const cats = [...root.querySelectorAll<HTMLButtonElement>("[data-cat]")];
  const buttons = [...root.querySelectorAll<HTMLButtonElement>(".qf-browser-icon")];
  const icons = buttons.map((button, index) => ({
    index,
    rank: 0,
    /** The parts of the icon's own name, which rank above its tags. */
    parts: (button.dataset.id ?? "").split("-"),
    button,
    item: button.parentElement as HTMLElement,
    use: button.querySelector("use") as SVGUseElement,
    id: button.dataset.id ?? "",
    // Every word an icon answers to: its id's parts, its tags, aliases and categories.
    words: [button.dataset.id, button.dataset.t, button.dataset.a, button.dataset.c]
      .join(" ")
      .toLowerCase()
      .split(/[\s,-]+/)
      .filter(Boolean),
    cats: (button.dataset.c ?? "").split(" "),
  }));
  const total = icons.length.toLocaleString("en-IN");
  // The address's search, read before anything changes the address.
  const params = new URLSearchParams(location.search);
  const state = {
    query: params.get("q") ?? "",
    cat: "",
    shape: "round",
    drawing: "outline",
    color: "default",
    own: "",
    size: "24",
    selected: "",
  };

  /** The sheet an icon draws from: filled only where the icon has a filled drawing. */
  const hrefOf = (button: HTMLElement, id: string) =>
    `${sheet}/${state.shape}-${state.drawing === "filled" && button.hasAttribute("data-filled") ? "filled" : "outline"}.svg#${id}`;

  /** The icons shown, in the order they're shown: by rank, then by the package's order. */
  const visible = () =>
    icons.filter((icon) => !icon.item.hidden).sort((a, b) => a.rank - b.rank || a.index - b.index);

  /** How well an icon answers the query: its exact name, then a name that starts with it, then its name's words, then its tags. */
  const rankOf = (icon: (typeof icons)[number], query: string, words: string[]) => {
    if (!query) return 0;
    if (icon.id === query.replaceAll(" ", "-")) return 0;
    if (icon.id.startsWith(query.replaceAll(" ", "-"))) return 1;
    if (words.every((word) => icon.parts.some((part) => part.startsWith(word)))) return 2;
    return 3;
  };

  const filter = () => {
    const words = state.query.toLowerCase().split(/\s+/).filter(Boolean);
    let shown = 0;
    for (const icon of icons) {
      // Each word of the query starts one of the icon's words: "lock" finds lock, not clock.
      const match =
        (!state.cat || icon.cats.includes(state.cat)) &&
        words.every((word) => icon.words.some((answer) => answer.startsWith(word)));
      icon.item.hidden = !match;
      // The grid shows the best matches first; the DOM keeps the package's order.
      icon.rank = match ? rankOf(icon, state.query.toLowerCase(), words) : 0;
      icon.item.style.order = String(icon.rank);
      if (match) shown++;
    }
    if (count)
      count.textContent =
        shown === icons.length
          ? `${total} icons`
          : `${shown.toLocaleString("en-IN")} of ${total} icons`;
    if (empty) empty.hidden = shown > 0;
    if (clear && input) clear.hidden = input.value === "";
    // One Tab stop: the first visible icon, unless the selected one is still visible.
    const stops = visible();
    const stop = stops.find((icon) => icon.id === state.selected) ?? stops[0];
    for (const icon of icons) icon.button.tabIndex = icon === stop ? 0 : -1;
    // The address carries the search, so it can be shared.
    const url = new URL(location.href);
    if (state.query) url.searchParams.set("q", state.query);
    else url.searchParams.delete("q");
    url.hash = state.cat;
    history.replaceState(null, "", url);
  };

  const redraw = () => {
    for (const icon of icons) icon.use.setAttribute("href", hrefOf(icon.button, icon.id));
    if (state.selected) show(state.selected, false);
  };

  /** The colour as CSS: a token's custom property, your own colour, or nothing for the default. */
  const colourOf = () =>
    state.color === "own"
      ? state.own
      : state.color === "default"
        ? ""
        : `var(--qx-color-icon-${state.color})`;

  const paint = () => {
    const colour = colourOf();
    // The grid and the details both read --qf-icon-color; unset, each keeps its own default.
    if (colour) root.style.setProperty("--qf-icon-color", colour);
    else root.style.removeProperty("--qf-icon-color");
  };

  /* ── Switches: shape and drawing ── */

  for (const toggle of root.querySelectorAll<HTMLElement>("[data-browser-switch]")) {
    const name = toggle.dataset.browserSwitch as "shape" | "drawing";
    const press = () => {
      for (const other of root.querySelectorAll<HTMLElement>(`[data-browser-switch="${name}"]`)) {
        const pressed = other.dataset.value === state[name];
        other.setAttribute("aria-pressed", String(pressed));
        other.toggleAttribute("data-pressed", pressed);
        // Without React, Base UI's roving focus never starts: each toggle takes its own Tab stop.
        other.tabIndex = 0;
      }
    };
    toggle.addEventListener("click", () => {
      state[name] = toggle.dataset.value ?? state[name];
      press();
      redraw();
    });
    press();
  }

  /* ── Colour: from its island, a token or your own ── */

  root.addEventListener("qf-icon-colour", (event) => {
    const choice = (event as CustomEvent<{ token: string } | { own: string }>).detail;
    if ("own" in choice) {
      state.color = "own";
      state.own = choice.own;
    } else state.color = choice.token;
    paint();
  });

  /* ── Size: from the slider island ── */

  root.addEventListener("qf-icon-size", (event) => {
    state.size = String((event as CustomEvent<number>).detail);
    grid?.style.setProperty("--qf-icon-size", `${state.size}px`);
  });

  /* ── Categories ── */

  const pickCategory = (cat: string) => {
    state.cat = cats.some((button) => button.dataset.cat === cat) ? cat : "";
    for (const button of cats)
      button.setAttribute("aria-pressed", String(button.dataset.cat === state.cat));
    filter();
  };
  for (const button of cats)
    button.addEventListener("click", () => pickCategory(button.dataset.cat ?? ""));

  /* ── Search ── */

  input?.addEventListener("input", () => {
    state.query = input.value.trim();
    filter();
  });
  input?.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && input.value !== "") {
      event.preventDefault();
      input.value = "";
      state.query = "";
      filter();
    }
  });
  clear?.addEventListener("click", () => {
    if (!input) return;
    input.value = "";
    state.query = "";
    filter();
    input.focus();
  });

  /* ── The grid: arrow keys move between visible icons, by row and column ── */

  grid?.addEventListener("keydown", (event) => {
    const current = (event.target as Element).closest<HTMLButtonElement>(".qf-browser-icon");
    if (!current) return;
    const list = visible();
    const at = list.findIndex((icon) => icon.button === current);
    // Icons per row: how many share the first row's top. (Not offsetTop: content-visibility makes
    // each tile its own offset parent, so every icon reads 0.)
    const top = list[0]?.item.getBoundingClientRect().top;
    const secondRow = list.findIndex(
      (icon) => Math.abs(icon.item.getBoundingClientRect().top - (top ?? 0)) > 1,
    );
    const perRow = secondRow === -1 ? list.length : secondRow;
    let next = at;
    if (event.key === "ArrowRight") next = at + 1;
    else if (event.key === "ArrowLeft") next = at - 1;
    else if (event.key === "ArrowDown") next = at + perRow;
    else if (event.key === "ArrowUp") next = at - perRow;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = list.length - 1;
    else return;
    event.preventDefault();
    if (next < 0 || next >= list.length) return;
    const target = list[next];
    if (!target) return;
    for (const icon of list) icon.button.tabIndex = icon === target ? 0 : -1;
    target.button.focus();
  });

  /* ── Details ── */

  const list = (text: string | undefined) => (text ? text.replaceAll(" ", ", ") : "—");

  function show(id: string, open = true) {
    const icon = icons.find((entry) => entry.id === id);
    if (!icon) return;
    state.selected = id;
    for (const entry of icons) entry.button.toggleAttribute("data-selected", entry.id === id);
    const { button } = icon;
    dispatchEvent(
      new CustomEvent("qf-icon-detail", {
        detail: {
          id,
          name: button.dataset.name ?? id,
          categories: list(button.dataset.c),
          tags: button.dataset.t || "—",
          drawings: button.hasAttribute("data-filled") ? "Outline and filled" : "Outline",
          direction: button.hasAttribute("data-mirror") ? "Flips by itself" : "The same both ways",
          href: hrefOf(button, id),
          open,
        },
      }),
    );
  }

  /** Clears the pick, and puts focus back on its icon. */
  const unpick = () => {
    const back = icons.find((icon) => icon.id === state.selected)?.button;
    state.selected = "";
    for (const entry of icons) entry.button.removeAttribute("data-selected");
    back?.focus();
  };

  grid?.addEventListener("click", (event) => {
    const button = (event.target as Element).closest<HTMLButtonElement>(".qf-browser-icon");
    if (button?.dataset.id) show(button.dataset.id);
  });
  // The panel's own Close or Escape.
  addEventListener("qf-icon-detail-closed", unpick);
  // Escape from the grid closes it too.
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      state.selected &&
      !(event.target as Element).closest('input[type="search"], [data-slot="floating-panel"]')
    ) {
      dispatchEvent(new Event("qf-icon-detail-hide"));
      unpick();
    }
  });

  /* ── Copy: the import, the JSX, the SVG itself ── */

  const sheets = new Map<string, Promise<Document>>();
  const sheetOf = (url: string) => {
    if (!sheets.has(url))
      sheets.set(
        url,
        fetch(url)
          .then((response) => response.text())
          .then((text) => new DOMParser().parseFromString(text, "image/svg+xml")),
      );
    return sheets.get(url) as Promise<Document>;
  };

  async function svgOf(id: string, button: HTMLElement): Promise<string> {
    const [url] = hrefOf(button, id).split("#");
    const symbol = (await sheetOf(url ?? "")).getElementById(id);
    if (!symbol) return "";
    const attributes = [
      "viewBox",
      "fill",
      "stroke",
      "stroke-width",
      "stroke-linecap",
      "stroke-linejoin",
    ]
      .filter((name) => symbol.hasAttribute(name))
      .map((name) => ` ${name}="${symbol.getAttribute(name)}"`)
      .join("");
    // Parsed as XML, every child repeats the namespace: one, on the <svg>, is enough.
    const inner = symbol.innerHTML.replaceAll(' xmlns="http://www.w3.org/2000/svg"', "");
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${state.size}" height="${state.size}"${attributes}>${inner}</svg>`;
    // A file keeps currentColor, unless a colour was picked: then it's that colour, as hex, in this theme.
    return state.color === "default" ? svg : svg.replaceAll("currentColor", hexOf(button));
  }

  /** The colour an icon is painted with, as #rrggbb: tokens are oklch, which a file can't rely on. */
  function hexOf(button: HTMLElement): string {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 1;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) return "currentColor";
    context.fillStyle = getComputedStyle(button.querySelector("svg") ?? button).color;
    context.fillRect(0, 0, 1, 1);
    const [r = 0, g = 0, b = 0] = context.getImageData(0, 0, 1, 1).data;
    return `#${[r, g, b].map((channel) => channel.toString(16).padStart(2, "0")).join("")}`;
  }

  // The details render in their island, so copying listens on the page.
  document.addEventListener("click", async (event) => {
    const button = (event.target as Element).closest<HTMLElement>("[data-qf-copy]");
    if (!button) return;
    const icon = icons.find((entry) => entry.id === state.selected);
    if (!icon) return;
    const name = icon.button.dataset.name ?? icon.id;
    const kind = button.dataset.qfCopy;
    const colour = colourOf();
    const text =
      kind === "import"
        ? `import { ${name} } from "@qeetrix/icons";`
        : kind === "jsx"
          ? `<${name}${state.shape === "sharp" ? ' shape="sharp"' : ""}${state.drawing === "filled" && icon.button.hasAttribute("data-filled") ? ' variant="filled"' : ""} size={${state.size}}${colour ? ` style={{ color: "${colour}" }}` : ""} />`
          : svgOf(icon.id, icon.button);
    // The SVG goes in as a promise, so the write starts in the click (copy.ts).
    await copyText(text);
    const label = button.querySelector<HTMLElement>('[data-slot="button-label"]');
    if (!label) return;
    // The label to come back to, kept from the first copy: a second within the pause reads "Copied".
    label.dataset.label ??= label.textContent ?? "";
    label.textContent = "Copied";
    clearTimeout(Number(label.dataset.timer));
    label.dataset.timer = String(
      setTimeout(() => {
        label.textContent = label.dataset.label ?? "";
      }, 1200),
    );
  });

  /* ── Start: the address's search and category ── */

  if (input) input.value = state.query;
  pickCategory(decodeURIComponent(location.hash.slice(1)));
}
