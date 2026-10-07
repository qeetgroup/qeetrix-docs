import { FileCard } from "@qeetrix/ui";

/**
 * Tiles for a file grid: a preview above the name, with size and metadata on one muted line.
 * A long name truncates with the full name in a tooltip, and the extension is shown on its own
 * so the type stays visible. `selected` adds the brand tint and a 2px outline.
 *
 * @layout wide
 */
export default function FileCardDefault() {
  return (
    <div className="grid w-full max-w-2xl grid-cols-3 gap-3 self-center">
      <FileCard
        name="Payroll register — September 2026.xlsx"
        size="248 KB"
        meta="Kabir Rao"
      />
      <FileCard
        name="Offer letter — Meera Iyer.pdf"
        size="1.2 MB"
        meta="Diya Sharma"
        selected
      />
      <FileCard
        name="Store front, Indiranagar.png"
        size="3.4 MB"
        meta="Aarav Mehta"
      />
    </div>
  );
}
