// Icons › In components (Iconography.tsx renders it to HTML): each demo's icon size, read from the
// rendered <svg>, named by its size token, so the label can't drift from the library.
for (const label of document.querySelectorAll<HTMLElement>("[data-qf-icon-size]")) {
  const names: Record<string, string> = JSON.parse(label.dataset.qfIconSize ?? "{}");
  const width = label
    .closest(".qf-ico-demo")
    ?.querySelector(".qf-ico-demo-stage svg")
    ?.getAttribute("width");
  if (!width) continue;
  label.textContent = names[width] ? `${width}px · ${names[width]}` : `${width}px`;
}

export {};
