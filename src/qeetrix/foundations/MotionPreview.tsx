// The motion preview at the top of the Motion page: Qeetrix's segmented ToggleGroup rendered to
// HTML. motion-preview.ts plays the page's demos as reduced motion does: every duration 0ms.
import { Toggle, ToggleGroup } from "@qeetrix/react";

export default function MotionPreview() {
  return (
    <div className="qf-toolbar" data-qf-motion-switch>
      <span className="qf-toolbar-label">Motion</span>
      <ToggleGroup
        variant="segmented"
        size="sm"
        aria-label="Preview motion"
        defaultValue={["full"]}
      >
        <Toggle value="full" data-motion-choice="full">
          Full
        </Toggle>
        <Toggle value="reduced" data-motion-choice="reduced">
          Reduced
        </Toggle>
      </ToggleGroup>
      <span className="qf-toolbar-note">
        Reduced is what people who ask their system for less motion get
      </span>
    </div>
  );
}
