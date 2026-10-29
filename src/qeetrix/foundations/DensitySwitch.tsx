// The density switch at the top of the Spacing page: Qeetrix's segmented ToggleGroup rendered to
// HTML. density.ts applies the choice to the page's specimens, so every bar and value follows it.
import { Toggle, ToggleGroup } from "@qeetrix/react";
import { DENSITIES } from "./data";

const LABELS = { compact: "Compact", default: "Default", comfortable: "Comfortable" } as const;

export default function DensitySwitch() {
  return (
    <div className="qf-toolbar" data-qf-density-switch>
      <span className="qf-toolbar-label">Density</span>
      <ToggleGroup
        variant="segmented"
        size="sm"
        aria-label="Density for this page"
        defaultValue={["default"]}
      >
        {DENSITIES.map((density) => (
          <Toggle key={density} value={density} data-density-choice={density}>
            {LABELS[density]}
          </Toggle>
        ))}
      </ToggleGroup>
      <span className="qf-toolbar-note">Every bar and value below follows it</span>
    </div>
  );
}
