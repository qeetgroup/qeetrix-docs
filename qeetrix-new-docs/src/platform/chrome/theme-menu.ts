// The theme menu's choice (ThemeMenu.tsx): saved where the pre-paint script (theme.ts) reads it,
// applied to <html> at once, and shown in every theme menu on the page. System clears the saved
// choice, so the pre-paint script's listener keeps following the device.
const key = "qx-color-scheme";
const root = document.documentElement;
const labels: Record<string, string> = { light: "Light", dark: "Dark", system: "System" };

const sync = () => {
  const choice = root.getAttribute("data-scheme-choice") ?? "system";
  for (const item of document.querySelectorAll<HTMLElement>("[data-theme-choice]")) {
    item.setAttribute("aria-checked", String(item.dataset.themeChoice === choice));
  }
  for (const trigger of document.querySelectorAll("[data-theme-trigger]")) {
    trigger.setAttribute("aria-label", `Theme: ${labels[choice] ?? labels.system}`);
  }
};

document.addEventListener("click", (event) => {
  const item = (event.target as Element).closest<HTMLElement>("[data-theme-choice]");
  const choice = item?.dataset.themeChoice;
  if (!choice || !(choice in labels)) return;
  try {
    if (choice === "system") localStorage.removeItem(key);
    else localStorage.setItem(key, choice);
  } catch {}
  const system = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  root.setAttribute("data-qx-color-scheme", choice === "system" ? system : choice);
  root.setAttribute("data-scheme-choice", choice);
  sync();
});

sync();

// A module, so its names stay its own.
export {};
