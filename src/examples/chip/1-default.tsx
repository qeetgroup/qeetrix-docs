import { Chip, ChipGroup } from "@qeetrix/ui";

/**
 * A `ChipGroup` is single-select by default: a radio group with one tab stop, where the arrow
 * keys move the selection. The selected chip shows a check mark, so selection never rests on
 * colour alone.
 */
export default function ChipDefault() {
  return (
    <ChipGroup aria-label="Invoice status" defaultValue="all">
      <Chip value="all">All</Chip>
      <Chip value="paid">Paid</Chip>
      <Chip value="due">Due</Chip>
      <Chip value="overdue">Overdue</Chip>
      <Chip value="draft">Draft</Chip>
    </ChipGroup>
  );
}
