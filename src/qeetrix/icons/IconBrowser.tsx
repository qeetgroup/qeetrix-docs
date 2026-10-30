// The Icon browser: every icon in a grid, found by name, tag, alias or category, in either shape
// and drawing, at any size from 12 to 64 and in any icon colour; one opens its details beside the
// grid, in Qeetrix's FloatingPanel. Rendered to HTML: the icons draw from the build's sheets
// (pages/icons/sprite) and browser.ts does the searching, switching, keyboard and copying; the size,
// the colour and the details are islands (`size`, `colour`, `detail`).
import { SearchXIcon } from "@qeetrix/icons/icons/search-x";
import { XIcon } from "@qeetrix/icons/icons/x";
import { iconManifest } from "@qeetrix/icons/manifest";
import { IconButton, Toggle, ToggleGroup } from "@qeetrix/react";
import { SearchField } from "@qeetrix/react/experimental";
import type { ReactNode } from "react";

const ICONS = iconManifest.icons;
const SHEET = "/icons/sprite";

/** Every category, largest first, with how many icons it holds. */
const CATEGORIES = Object.entries(
  ICONS.reduce<Record<string, number>>((count, icon) => {
    for (const category of icon.categories ?? []) count[category] = (count[category] ?? 0) + 1;
    return count;
  }, {}),
).sort((a, b) => b[1] - a[1]);

export const categoryName = (id: string) =>
  (id.charAt(0).toUpperCase() + id.slice(1)).replaceAll("-", " and ");
const total = ICONS.length.toLocaleString("en-IN");

function Switch({
  label,
  name,
  options,
  value,
}: {
  label: string;
  name: string;
  options: Array<[string, string]>;
  value: string;
}) {
  return (
    <span className="qf-browser-switch">
      <span className="qf-toolbar-label">{label}</span>
      <ToggleGroup
        variant="segmented"
        size="sm"
        aria-label={`${label} of the icons`}
        defaultValue={[value]}
      >
        {options.map(([option, text]) => (
          <Toggle key={option} value={option} data-browser-switch={name} data-value={option}>
            {text}
          </Toggle>
        ))}
      </ToggleGroup>
    </span>
  );
}

export default function IconBrowser({
  size,
  colour,
  detail,
}: {
  size?: ReactNode;
  colour?: ReactNode;
  detail?: ReactNode;
}) {
  return (
    <div className="qf-browser" data-qf-browser data-sheet={SHEET}>
      <div className="qf-toolbar qf-browser-bar">
        <span className="qf-browser-row">
          <SearchField
            className="qf-browser-search"
            aria-label="Search icons"
            placeholder={`Search ${total} icons`}
            endAdornment={
              <IconButton
                icon={XIcon}
                aria-label="Clear search"
                size="sm"
                tone="neutral"
                tooltip={false}
                className="qx-search-field-clear"
                hidden
                data-qf-browser-clear
              />
            }
          />
          <span className="qf-browser-count" role="status" data-qf-count>
            {total} icons
          </span>
          {colour}
        </span>
        <span className="qf-browser-row">
          <Switch
            label="Shape"
            name="shape"
            value="round"
            options={[
              ["round", "Round"],
              ["sharp", "Sharp"],
            ]}
          />
          <Switch
            label="Drawing"
            name="drawing"
            value="outline"
            options={[
              ["outline", "Outline"],
              ["filled", "Filled"],
            ]}
          />
          {size}
        </span>
      </div>

      <fieldset className="qf-browser-cats" aria-label="Category">
        <button type="button" className="qf-browser-cat" data-cat="" aria-pressed="true">
          All <span>{total}</span>
        </button>
        {CATEGORIES.map(([id, count]) => (
          <button
            key={id}
            type="button"
            className="qf-browser-cat"
            data-cat={id}
            aria-pressed="false"
          >
            {categoryName(id)} <span>{count}</span>
          </button>
        ))}
      </fieldset>

      <ul className="qf-browser-grid" aria-label="Icons" data-qf-grid>
        {ICONS.map((icon, i) => (
          <li key={icon.id}>
            <button
              type="button"
              className="qf-browser-icon"
              tabIndex={i === 0 ? 0 : -1}
              data-id={icon.id}
              data-name={icon.componentName}
              data-c={(icon.categories ?? []).join(" ")}
              data-t={(icon.tags ?? []).join(", ")}
              data-a={(icon.aliases ?? []).join(", ")}
              data-filled={icon.variants.includes("filled") ? "" : undefined}
              data-mirror={icon.directionality === "mirror" ? "" : undefined}
              aria-label={icon.componentName}
            >
              <svg aria-hidden="true" width="24" height="24">
                <use href={`${SHEET}/round-outline.svg#${icon.id}`} />
              </svg>
              <span>{icon.id}</span>
            </button>
          </li>
        ))}
      </ul>

      <div className="qf-browser-empty" hidden data-qf-empty>
        <SearchXIcon size={24} aria-hidden />
        <b>No icons match</b>
        <span>Try a tag instead, like “money”, “user” or “arrow”.</span>
      </div>

      {detail}
    </div>
  );
}
