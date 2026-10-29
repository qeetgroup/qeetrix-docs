import { colorSchemeScript as qeetrixScheme } from "@qeetrix/react";

/**
 * Before the first paint: Qeetrix's colorSchemeScript sets `data-qx-color-scheme` (and, on Apple
 * platforms, `data-qx-platform`, which Kbd reads) on `<html>` from the saved choice, and keeps
 * following the device while System is chosen. The docs add the choice itself (light, dark or
 * system) as `data-scheme-choice`, which the static theme menu shows. Inlined in the head, so there
 * is no flash.
 */
export const colorSchemeScript = `${qeetrixScheme({ followSystem: true })};(() => {
  let saved = null;
  try { saved = localStorage.getItem("qx-color-scheme"); } catch {}
  document.documentElement.setAttribute("data-scheme-choice", saved === "light" || saved === "dark" ? saved : "system");
})();`;
