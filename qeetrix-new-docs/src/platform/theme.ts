/**
 * Sets `data-qx-color-scheme` on `<html>` before the first paint: the reader's saved choice, else
 * the system setting, which it keeps following. Inlined in the head, so there is no flash.
 */
export const colorSchemeScript = `(() => {
  const key = "qx-color-scheme";
  const root = document.documentElement;
  const system = matchMedia("(prefers-color-scheme: dark)");
  const apply = () => {
    let saved = null;
    try { saved = localStorage.getItem(key); } catch {}
    const scheme = saved === "light" || saved === "dark" ? saved : system.matches ? "dark" : "light";
    root.setAttribute("data-qx-color-scheme", scheme);
  };
  apply();
  system.addEventListener("change", apply);
})();`;
