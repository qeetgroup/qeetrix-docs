// The motion preview (MotionPreview.tsx): Reduced sets every duration token to 0ms on the demos'
// scope, as @qeetrix/tokens does under prefers-reduced-motion, and marks the scope so the demos'
// badges say so; Full clears both.
const scope = document.querySelector<HTMLElement>("[data-qf-motion]");
const toggles = [...document.querySelectorAll<HTMLElement>("[data-motion-choice]")];
const durations: string[] = JSON.parse(scope?.dataset.durations ?? "[]");

const choose = (choice: string) => {
  const reduced = choice === "reduced";
  for (const name of durations) {
    if (reduced) scope?.style.setProperty(name, "0ms");
    else scope?.style.removeProperty(name);
  }
  scope?.toggleAttribute("data-qf-reduced", reduced);
  for (const toggle of toggles) {
    const pressed = toggle.dataset.motionChoice === choice;
    toggle.setAttribute("aria-pressed", String(pressed));
    toggle.toggleAttribute("data-pressed", pressed);
    // Without React, Base UI's roving focus never starts: each toggle takes its own Tab stop.
    toggle.tabIndex = 0;
  }
};

for (const toggle of toggles)
  toggle.addEventListener("click", () => choose(toggle.dataset.motionChoice ?? "full"));
choose("full");

export {};
