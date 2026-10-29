// Anatomy (tabs/Usage.astro): numbers each part of the component drawn large, by its data-slot, with
// a mark above or below it and a leader to its edge; again when the page's width changes.
// - Marks sit outside the whole figure (the component drawn, and every part), each leader reaching
//   in to its part: a range's days are marked from outside the month, not over its other days.
// - A part in the figure's upper half is marked above, in its lower half below; parts level with
//   the middle (a button's label, zone and icon) alternate by their number: below, above, below.
// - A part is marked at the middle of what it shows (a label's words, not its full width); one
//   that holds a smaller part centred on it (the zone holds the icon) at its start edge.
// - The part that holds all the others (a button's root) is placed last, where there's room: near
//   its start, else its middle, else its end. Other marks that would touch take the other side,
//   then step apart.
for (const anatomy of document.querySelectorAll<HTMLElement>("[data-qc-anat]")) {
  // Each part's selector: its data-slot, or a narrower one (the chosen day).
  const selectors: string[] = JSON.parse(anatomy.dataset.qcAnat ?? "[]");
  const stage = anatomy.querySelector<HTMLElement>(".qc-anat-stage");
  const marks = anatomy.querySelector<HTMLElement>("[data-qc-anat-marks]");

  /** What a part shows: its contents' box, narrower than a block's full width. */
  const shownOf = (element: Element) => {
    const range = document.createRange();
    range.selectNodeContents(element);
    const rect = range.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0 ? rect : element.getBoundingClientRect();
  };

  const place = () => {
    if (!stage || !marks) return;
    const box = stage.getBoundingClientRect();
    const rtl = getComputedStyle(stage).direction === "rtl";
    const rem = Number.parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    const css = getComputedStyle(stage);
    const lead = Number.parseFloat(css.getPropertyValue("--qc-leader")) * rem || 20;
    const size = Number.parseFloat(css.getPropertyValue("--qc-mark")) * rem || 24;
    const parts = selectors
      .map((selector, index) => {
        const element = stage.querySelector(selector);
        return element
          ? { index, rect: element.getBoundingClientRect(), shown: shownOf(element) }
          : undefined;
      })
      .filter((part) => part !== undefined);
    if (!parts.length) return;
    // The whole figure: the component drawn, and every part.
    const drawn = stage.querySelector(".qc-anat-figure > *")?.getBoundingClientRect();
    const top = Math.min(
      ...parts.map((part) => part.rect.top),
      drawn?.top ?? Number.POSITIVE_INFINITY,
    );
    const bottom = Math.max(
      ...parts.map((part) => part.rect.bottom),
      drawn?.bottom ?? Number.NEGATIVE_INFINITY,
    );
    const centre = (top + bottom) / 2;
    const middleOf = (rect: DOMRect) => rect.left + rect.width / 2;
    const contains = (outer: DOMRect, inner: DOMRect) =>
      outer.left <= inner.left + 1 &&
      outer.right >= inner.right - 1 &&
      outer.top <= inner.top + 1 &&
      outer.bottom >= inner.bottom - 1;
    const holdsAll = (part: (typeof parts)[number]) =>
      parts.length > 1 && parts.every((other) => other === part || contains(part.rect, other.rect));
    const taken: Record<"above" | "below", number[]> = { above: [], below: [] };
    const clash = (side: "above" | "below", x: number) =>
      taken[side].some((other) => Math.abs(other - x) < size + 4);
    const other = (side: "above" | "below") => (side === "above" ? "below" : "above");
    marks.replaceChildren();
    // The parts first, the one that holds them all last.
    for (const part of [...parts].sort((a, b) => Number(holdsAll(a)) - Number(holdsAll(b)))) {
      const { rect, shown, index } = part;
      const middle = rect.top + rect.height / 2;
      let side: "above" | "below" =
        Math.abs(middle - centre) < 4
          ? index % 2 === 0
            ? "below"
            : "above"
          : middle < centre
            ? "above"
            : "below";
      const start = rtl ? rect.right : rect.left;
      const end = rtl ? rect.left : rect.right;
      const inset = Math.min(16, rect.width / 4) * (rtl ? -1 : 1);
      let x: number;
      if (holdsAll(part)) {
        // Where there's room along it: near its start, its middle, near its end.
        const spots = [start + inset, middleOf(rect), end - inset];
        const free =
          spots.find((spot) => !clash(side, spot)) ??
          spots.find((spot) => !clash(other(side), spot));
        if (free !== undefined && clash(side, free)) side = other(side);
        x = free ?? spots[0] ?? middleOf(rect);
      } else {
        const holdsCentred = parts.some(
          (inner) =>
            inner !== part &&
            contains(rect, inner.rect) &&
            inner.rect.width < rect.width &&
            Math.abs(middleOf(inner.rect) - middleOf(rect)) < 12,
        );
        x = holdsCentred ? start : middleOf(shown);
        if (clash(side, x) && !clash(other(side), x)) side = other(side);
      }
      while (clash(side, x)) x += (size + 4) * (rtl ? -1 : 1);
      taken[side].push(x);
      const markTop = side === "below" ? bottom + lead : top - lead - size;
      const reach = side === "below" ? markTop - rect.bottom : rect.top - (markTop + size);
      const mark = document.createElement("li");
      mark.textContent = String(index + 1);
      mark.dataset.side = side;
      mark.style.setProperty("--qc-x", `${x - box.left}px`);
      mark.style.setProperty("--qc-top", `${markTop - box.top}px`);
      mark.style.setProperty("--qc-reach", `${Math.max(0, reach)}px`);
      marks.append(mark);
    }
    // In number order, for anything that reads them in turn.
    marks.replaceChildren(
      ...[...marks.children].sort((a, b) => Number(a.textContent) - Number(b.textContent)),
    );
  };

  place();
  new ResizeObserver(place).observe(anatomy);
  document.fonts?.ready.then(place);
}

export {};
