// Copy for the Foundations and Icons pages (kit.tsx renders to HTML): a control with data-copy-value
// copies it, one with data-copy-file copies the file at that address (a logo's SVG); either is marked
// data-copied for a moment, which shows its check.

/**
 * Copies text, or text still on its way. The clipboard write starts in the click itself: Safari
 * refuses one that starts after an await, so a fetched text goes in as a promise.
 */
export async function copyText(text: string | Promise<string>): Promise<void> {
  if (typeof text !== "string" && typeof ClipboardItem !== "undefined") {
    const blob = text.then((value) => new Blob([value], { type: "text/plain" }));
    await navigator.clipboard?.write([new ClipboardItem({ "text/plain": blob })]);
    return;
  }
  await navigator.clipboard?.writeText(await text);
}

document.addEventListener("click", async (event) => {
  const control = (event.target as Element).closest<HTMLElement>(
    "[data-copy-value], [data-copy-file]",
  );
  if (!control) return;
  const { copyValue, copyFile } = control.dataset;
  if (copyValue) await copyText(copyValue);
  else if (copyFile) await copyText(fetch(copyFile).then((response) => response.text()));
  else return;
  control.toggleAttribute("data-copied", true);
  setTimeout(() => control.toggleAttribute("data-copied", false), 1200);
});
