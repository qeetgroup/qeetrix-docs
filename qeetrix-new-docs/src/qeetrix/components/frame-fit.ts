// Fits each console frame with a window width (FrameOf.tsx) to its column: it lays out at its own
// width, as a console's media queries read the window, and is zoomed down to the space it has.
const fit = (frame: HTMLIFrameElement) => {
  const window = Number(frame.dataset.window);
  const space = frame.parentElement?.clientWidth ?? window;
  frame.style.zoom = String(Math.min(1, space / window));
};

const frames = [...document.querySelectorAll<HTMLIFrameElement>("iframe[data-window]")];
const watch = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const frame = entry.target.querySelector<HTMLIFrameElement>("iframe[data-window]");
    if (frame) fit(frame);
  }
});
for (const frame of frames) {
  fit(frame);
  if (frame.parentElement) watch.observe(frame.parentElement);
}

export {};
