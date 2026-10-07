import {
  Table,
  TableBody,
  TableEmpty,
  TableHead,
  TableHeader,
  TableRow,
} from "@qeetrix/ui";

/**
 * `TableEmpty` is a full-width body row for "nothing to show". Set `colSpan` to the number of
 * visible columns. It never takes the row hover, because it isn't data.
 *
 * @layout wide
 */
export default function TableEmptyExample() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Refund</TableHead>
          <TableHead>Payment</TableHead>
          <TableHead>Reason</TableHead>
          <TableHead className="text-end">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableEmpty colSpan={4}>
          No refunds match “Zenith Foods” in the last 30 days.
        </TableEmpty>
      </TableBody>
    </Table>
  );
}
