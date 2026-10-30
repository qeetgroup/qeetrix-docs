// Icons › The set (Iconography.tsx renders it to HTML): the bar switches the wall between round and
// sharp, outline and filled, and shows its choices pressed. Copying is copy.ts.
const wall = document.querySelector<HTMLElement>("[data-qf-wall]");

const wire = (attribute: "shape" | "drawing") => {
  const toggles = [...document.querySelectorAll<HTMLElement>(`[data-wall-${attribute}]`)];
  const choose = (value: string) => {
    wall?.setAttribute(`data-${attribute}`, value);
    for (const toggle of toggles) {
      const pressed = toggle.getAttribute(`data-wall-${attribute}`) === value;
      toggle.setAttribute("aria-pressed", String(pressed));
      toggle.toggleAttribute("data-pressed", pressed);
      // Without React, Base UI's roving focus never starts: each toggle takes its own Tab stop.
      toggle.tabIndex = 0;
    }
  };
  for (const toggle of toggles)
    toggle.addEventListener("click", () =>
      choose(toggle.getAttribute(`data-wall-${attribute}`) ?? ""),
    );
  choose(wall?.getAttribute(`data-${attribute}`) ?? "");
};

wire("shape");
wire("drawing");

export {};
