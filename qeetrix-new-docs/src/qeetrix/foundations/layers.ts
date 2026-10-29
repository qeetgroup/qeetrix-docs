// Elevation › Layers (Elevation.tsx renders it to HTML): the view switch flips the stage between
// exploded and composed, and shows its choice pressed.
const stage = document.querySelector<HTMLElement>("[data-qf-layers]");
const toggles = [...document.querySelectorAll<HTMLElement>("[data-view-choice]")];

const choose = (view: string) => {
  stage?.setAttribute("data-view", view);
  for (const toggle of toggles) {
    const pressed = toggle.dataset.viewChoice === view;
    toggle.setAttribute("aria-pressed", String(pressed));
    toggle.toggleAttribute("data-pressed", pressed);
    // Without React, Base UI's roving focus never starts: each toggle takes its own Tab stop.
    toggle.tabIndex = 0;
  }
};

for (const toggle of toggles)
  toggle.addEventListener("click", () => choose(toggle.dataset.viewChoice ?? "exploded"));
choose(stage?.getAttribute("data-view") ?? "exploded");

export {};
