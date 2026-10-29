// The examples' bars (Example.astro renders them to HTML): each switches its own stage to light or
// dark (following the page until it's set), to a density, or to right to left; shows its code; and
// copies it. Without React, the Toggles are pressed and focused here. A frame on the stage follows
// the same switches.
for (const example of document.querySelectorAll<HTMLElement>("[data-qc-ex]")) {
  const stage = example.querySelector<HTMLElement>("[data-qc-ex-stage]");
  const code = example.querySelector<HTMLElement>("[data-qc-ex-code]");
  const state = { scheme: "", density: "default", dir: false, code: false };
  const pageScheme = () =>
    document.documentElement.getAttribute("data-qx-color-scheme") === "dark" ? "dark" : "light";

  const set = (toggle: HTMLElement, on: boolean) => {
    toggle.setAttribute("aria-pressed", String(on));
    toggle.toggleAttribute("data-pressed", on);
    // Base UI's roving focus starts with React; here each toggle keeps its own Tab stop.
    toggle.tabIndex = 0;
  };

  const show = () => {
    for (const toggle of example.querySelectorAll<HTMLElement>("[data-qc-ex-set]")) {
      const { qcExSet: name, value } = toggle.dataset;
      if (name === "scheme") set(toggle, value === (state.scheme || pageScheme()));
      else if (name === "density") set(toggle, value === state.density);
      else if (name === "dir") set(toggle, state.dir);
      else if (name === "code") set(toggle, state.code);
    }
    if (!stage) return;
    if (state.scheme) stage.setAttribute("data-qx-color-scheme", state.scheme);
    else stage.removeAttribute("data-qx-color-scheme");
    stage.setAttribute("data-qx-density", state.density);
    stage.dir = state.dir ? "rtl" : "ltr";
    // A frame (a console page in an iframe) is its own document: set its root the same way.
    for (const frame of stage.querySelectorAll("iframe")) {
      const root = frame.contentDocument?.documentElement;
      if (!root) continue;
      root.setAttribute("data-qx-color-scheme", state.scheme || pageScheme());
      root.setAttribute("data-qx-density", state.density);
      root.dir = state.dir ? "rtl" : "ltr";
    }
    if (code) code.hidden = !state.code;
  };

  for (const frame of stage?.querySelectorAll("iframe") ?? []) frame.addEventListener("load", show);

  example.addEventListener("click", async (event) => {
    const target = event.target as Element;
    const toggle = target.closest<HTMLElement>("[data-qc-ex-set]");
    if (toggle) {
      const { qcExSet: name, value } = toggle.dataset;
      if (name === "scheme") state.scheme = value ?? "";
      else if (name === "density") state.density = value ?? "default";
      else if (name === "dir") state.dir = !state.dir;
      else if (name === "code") state.code = !state.code;
      show();
      return;
    }
    const copy = target.closest<HTMLElement>("[data-qc-ex-copy]");
    if (!copy) return;
    await navigator.clipboard?.writeText(copy.dataset.qcExCopy ?? "");
    const label = copy.querySelector('[data-slot="button-label"]');
    if (!label) return;
    label.textContent = "Copied";
    setTimeout(() => {
      label.textContent = "Copy";
    }, 1600);
  });

  // Until a scheme is picked here, the stage follows the page's.
  new MutationObserver(() => {
    if (!state.scheme) show();
  }).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-qx-color-scheme"],
  });

  show();
}

export {};
