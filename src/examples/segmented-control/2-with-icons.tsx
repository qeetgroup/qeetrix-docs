import { LayoutGridIcon, ListIcon } from "@qeetrix/icons";
import { SegmentedControl, SegmentedControlItem } from "@qeetrix/ui";

/** Segments take any content — here a view switcher with an icon beside each label. */
export default function SegmentedControlWithIcons() {
  return (
    <SegmentedControl aria-label="View" size="sm" defaultValue="list">
      <SegmentedControlItem value="list">
        <ListIcon className="size-4" aria-hidden />
        List
      </SegmentedControlItem>
      <SegmentedControlItem value="grid">
        <LayoutGridIcon className="size-4" aria-hidden />
        Grid
      </SegmentedControlItem>
    </SegmentedControl>
  );
}
