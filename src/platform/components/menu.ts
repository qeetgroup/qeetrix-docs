// Menus without React, for the server-rendered chrome (the theme menu, Copy page). A trigger with
// `data-site-menu` and `aria-controls` opens its popup (StaticMenu.tsx, drawn with Qeetrix's Menu
// classes) beside it, and the menu behaves as Qeetrix's Menu does: arrow keys, Home and End and a
// letter move, Enter or Space chooses, Escape closes and returns focus, Tab leaves, a pointer
// highlights, a click outside closes. It also works inside a native modal <dialog>, where a menu
// portalled to the body can't. Loaded once per page by Document.astro.

const gap = 4;

interface Open {
  trigger: HTMLElement;
  positioner: HTMLElement;
  popup: HTMLElement;
}

let active: Open | null = null;

const items = (popup: HTMLElement) => [
  ...popup.querySelectorAll<HTMLElement>('[role^="menuitem"]:not([aria-disabled="true"])'),
];

/** Beside the trigger on the preferred side, or the other side when that one has no room. */
function place({ trigger, positioner, popup }: Open) {
  const rect = trigger.getBoundingClientRect();
  const { offsetWidth: width, offsetHeight: height } = popup;
  const above = rect.top - gap;
  const below = innerHeight - rect.bottom - gap;
  const top =
    popup.dataset.preferSide === "top"
      ? above >= height || above > below
      : !(below >= height || below > above);
  popup.dataset.side = top ? "top" : "bottom";

  const rtl = getComputedStyle(trigger).direction === "rtl";
  const end = (positioner.dataset.align === "end") !== rtl;
  const left = Math.max(
    gap,
    Math.min(end ? rect.right - width : rect.left, innerWidth - width - gap),
  );
  positioner.style.left = `${left}px`;
  positioner.style.top = `${top ? rect.top - gap - height : rect.bottom + gap}px`;
}

function show(trigger: HTMLElement, focus: "popup" | "first" | "last") {
  const positioner = document.getElementById(trigger.getAttribute("aria-controls") ?? "");
  const popup = positioner?.querySelector<HTMLElement>('[role="menu"]');
  if (!positioner || !popup) return;
  if (active) hide(false);
  active = { trigger, positioner, popup };

  // Out of the flow before it shows, so the trigger it's placed by doesn't move.
  positioner.style.position = "fixed";
  positioner.hidden = false;
  popup.removeAttribute("data-ending-style");
  popup.setAttribute("data-starting-style", "");
  place(active);
  trigger.setAttribute("aria-expanded", "true");
  trigger.setAttribute("data-popup-open", "");
  requestAnimationFrame(() =>
    requestAnimationFrame(() => popup.removeAttribute("data-starting-style")),
  );

  const all = items(popup);
  const checked = all.find((item) => item.getAttribute("aria-checked") === "true");
  if (focus === "popup") popup.focus({ preventScroll: true });
  else (focus === "last" ? all.at(-1) : (checked ?? all[0]))?.focus({ preventScroll: true });
}

function hide(returnFocus: boolean) {
  if (!active) return;
  const { trigger, positioner, popup } = active;
  active = null;
  trigger.setAttribute("aria-expanded", "false");
  trigger.removeAttribute("data-popup-open");
  for (const item of items(popup)) item.removeAttribute("data-highlighted");
  if (returnFocus) trigger.focus({ preventScroll: true });

  // Fade out as Qeetrix's Menu does, then hide; a menu reopened meanwhile stays.
  popup.setAttribute("data-ending-style", "");
  Promise.all(popup.getAnimations().map((animation) => animation.finished)).then(() => {
    if (active?.popup === popup || !popup.hasAttribute("data-ending-style")) return;
    positioner.hidden = true;
    popup.removeAttribute("data-ending-style");
  });
}

document.addEventListener("click", (event) => {
  const target = event.target as Element;
  const trigger = target.closest<HTMLElement>("[data-site-menu]");
  if (trigger) {
    // A click from the keyboard (Enter or Space) has no pointer: it starts on the first item.
    if (active?.trigger === trigger) hide(false);
    else show(trigger, event.detail === 0 ? "first" : "popup");
    return;
  }
  const item = target.closest<HTMLElement>('[role^="menuitem"]');
  if (item && active?.popup.contains(item)) hide(true);
});

document.addEventListener("pointerdown", (event) => {
  const target = event.target as Node;
  if (active && !active.positioner.contains(target) && !active.trigger.contains(target))
    hide(false);
});

document.addEventListener("keydown", (event) => {
  const target = event.target as HTMLElement;
  const trigger = target.closest<HTMLElement>("[data-site-menu]");
  if (trigger && (event.key === "ArrowDown" || event.key === "ArrowUp")) {
    event.preventDefault();
    show(trigger, event.key === "ArrowUp" ? "last" : "first");
    return;
  }
  if (!active?.positioner.contains(target)) return;

  const all = items(active.popup);
  const at = all.indexOf(target);
  const move = (index: number) => all[(index + all.length) % all.length]?.focus();
  if (event.key === "ArrowDown") move(at + 1);
  else if (event.key === "ArrowUp") move(at < 0 ? -1 : at - 1);
  else if (event.key === "Home") move(0);
  else if (event.key === "End") move(-1);
  else if (event.key === "Escape") hide(true);
  else if ((event.key === "Enter" || event.key === " ") && at >= 0) target.click();
  else if (event.key.length === 1 && /\S/.test(event.key)) {
    // A letter jumps to the next item that starts with it.
    const key = event.key.toLowerCase();
    const next = [...all.slice(at + 1), ...all.slice(0, at + 1)].find((item) =>
      item.textContent?.trim().toLowerCase().startsWith(key),
    );
    next?.focus();
  } else return;
  event.preventDefault();
});

// The highlight follows focus, and a pointer moves focus, as in Qeetrix's Menu.
document.addEventListener("focusin", (event) => {
  if (!active) return;
  const target = event.target as Element;
  for (const item of items(active.popup)) item.toggleAttribute("data-highlighted", item === target);
});

document.addEventListener("pointermove", (event) => {
  if (!active || event.pointerType === "touch") return;
  const item = (event.target as Element).closest<HTMLElement>('[role^="menuitem"]');
  if (item && active.popup.contains(item) && document.activeElement !== item)
    item.focus({ preventScroll: true });
});

document.addEventListener("pointerout", (event) => {
  if (
    !active?.popup.contains(event.target as Node) ||
    active.popup.contains(event.relatedTarget as Node | null)
  )
    return;
  active.popup.focus({ preventScroll: true });
});

// Focus leaving the menu (Tab, or a click elsewhere) closes it.
document.addEventListener("focusout", (event) => {
  const next = event.relatedTarget as Node | null;
  if (
    active?.positioner.contains(event.target as Node) &&
    next &&
    !active.positioner.contains(next) &&
    !active.trigger.contains(next)
  )
    hide(false);
});

for (const type of ["scroll", "resize"]) {
  addEventListener(type, () => active && place(active), { passive: true, capture: true });
}

// A module, so its names stay its own.
export {};
