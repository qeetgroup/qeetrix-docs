// The density switch (DensitySwitch.tsx): the choice goes on the page's specimens as
// data-qx-density (the tokens' own scope, so bars and controls follow) and data-qf-density (which
// value each label shows), and the switch shows it pressed.
const scope = document.querySelector<HTMLElement>("[data-qf-density]");
const toggles = [...document.querySelectorAll<HTMLElement>("[data-density-choice]")];

const choose = (density: string) => {
  scope?.setAttribute("data-qf-density", density);
  scope?.setAttribute("data-qx-density", density);
  for (const toggle of toggles) {
    const pressed = toggle.dataset.densityChoice === density;
    toggle.setAttribute("aria-pressed", String(pressed));
    toggle.toggleAttribute("data-pressed", pressed);
    // Without React, Base UI's roving focus never starts: each toggle takes its own Tab stop.
    toggle.tabIndex = 0;
  }
};

for (const toggle of toggles)
  toggle.addEventListener("click", () => choose(toggle.dataset.densityChoice ?? "default"));
choose(scope?.getAttribute("data-qf-density") ?? "default");

export {};
