// The token filter (TokenFilter.tsx): rows whose token, name or use match stay; the rest of the page
// (specimens, empty groups, sections with no match) steps aside while there's a query.
const bar = document.querySelector<HTMLElement>("[data-qf-filter]");
const input = bar?.querySelector<HTMLInputElement>('input[type="search"]');
const clear = bar?.querySelector<HTMLElement>("[data-qf-filter-clear]");
const count = bar?.querySelector<HTMLElement>("[data-qf-filter-count]");
const sections = [...document.querySelectorAll<HTMLElement>(".doc-content > .doc-sec")];
const rows = [
  ...document.querySelectorAll<HTMLTableRowElement>(
    ".qf-tokens tbody tr:not(.qf-tokens-group), .qf-ftable tbody tr",
  ),
].map((row) => ({
  row,
  text: row.textContent?.toLowerCase() ?? "",
}));
const total = document.querySelectorAll(".qf-tokens tbody tr:not(.qf-tokens-group)").length;
const out = (el: Element, gone: boolean) => el.toggleAttribute("data-qf-out", gone);

const filter = () => {
  if (!input) return;
  const query = input.value.trim().toLowerCase();
  for (const { row, text } of rows) out(row, query !== "" && !text.includes(query));
  // A group's label goes with its last matching row; a table, its specimen and a section with them.
  for (const body of document.querySelectorAll(".qf-tokens tbody")) {
    const label = body.querySelector(".qf-tokens-group");
    if (label)
      out(
        label,
        query !== "" && !body.querySelector("tr:not(.qf-tokens-group):not([data-qf-out])"),
      );
  }
  for (const section of sections) {
    const tables = section.querySelectorAll("table");
    const matches = section.querySelector("tbody tr:not(.qf-tokens-group):not([data-qf-out])");
    out(section, query !== "" && (tables.length === 0 || !matches));
    for (const extra of section.querySelectorAll(".qf-specimen > :not(:has(table)), .qf-lede"))
      out(extra, query !== "");
    for (const table of tables)
      out(
        table.closest(".qf-tokens-wrap, .qf-ftable-wrap, .qf-specimen-group") ?? table,
        query !== "" && !table.querySelector("tbody tr:not(.qf-tokens-group):not([data-qf-out])"),
      );
  }
  const shown = document.querySelectorAll(
    ".qf-tokens tbody tr:not(.qf-tokens-group):not([data-qf-out])",
  ).length;
  if (count)
    count.textContent =
      query === "" ? `${total} tokens` : shown ? `${shown} of ${total} tokens` : "No tokens match";
  if (clear) clear.hidden = input.value === "";
};

input?.addEventListener("input", filter);
input?.addEventListener("keydown", (event) => {
  if (event.key !== "Escape" || input.value === "") return;
  event.preventDefault();
  input.value = "";
  filter();
});
clear?.addEventListener("click", () => {
  if (!input) return;
  input.value = "";
  filter();
  input.focus();
});
filter();

// A module, so its names stay its own.
export {};
