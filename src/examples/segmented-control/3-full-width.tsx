import { SegmentedControl, SegmentedControlItem } from "@qeetrix/ui";

/** `fullWidth` shares the width evenly — a billing-period switch at the top of a pricing card. */
export default function SegmentedControlFullWidth() {
  return (
    <div className="w-full max-w-xs">
      <SegmentedControl
        aria-label="Billing period"
        fullWidth
        defaultValue="yearly"
      >
        <SegmentedControlItem value="monthly">Monthly</SegmentedControlItem>
        <SegmentedControlItem value="yearly">
          Yearly · save 20%
        </SegmentedControlItem>
      </SegmentedControl>
    </div>
  );
}
