// Spacing › Breakpoints (Spacing.tsx renders the ruler to HTML): the band this window falls in is
// marked current, and the marker sits at this window's width, following a resize.
const marker = document.querySelector<HTMLElement>(".qf-spacing-marker[data-ruler-end]");
const bands = [...document.querySelectorAll<HTMLElement>(".qf-spacing-band[data-min]")];

const place = () => {
  if (!marker) return;
  const width = innerWidth;
  const end = Number(marker.dataset.rulerEnd);
  const current = bands.filter((band) => width >= Number(band.dataset.min)).at(-1);
  for (const band of bands) band.toggleAttribute("data-current", band === current);
  marker.style.insetInlineStart = `${(Math.min(width, end) / end) * 100}%`;
  marker.toggleAttribute("data-flip", width / end > 0.8);
  const label = marker.querySelector("span");
  if (label) label.textContent = `This window · ${width}px`;
  marker.hidden = false;
};

addEventListener("resize", place, { passive: true });
place();

// A module, so its names stay its own.
export {};
