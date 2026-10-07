import { SegmentedControl, SegmentedControlItem } from "@qeetrix/ui";

/** One choice from a few, always visible. The indicator slides to the selection; the arrow keys move it. */
export default function SegmentedControlDefault() {
  return (
    <SegmentedControl aria-label="Range" defaultValue="week">
      <SegmentedControlItem value="day">Day</SegmentedControlItem>
      <SegmentedControlItem value="week">Week</SegmentedControlItem>
      <SegmentedControlItem value="month">Month</SegmentedControlItem>
      <SegmentedControlItem value="quarter">Quarter</SegmentedControlItem>
    </SegmentedControl>
  );
}
