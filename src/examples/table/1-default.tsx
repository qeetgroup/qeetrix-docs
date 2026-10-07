import {
  StatusPill,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@qeetrix/ui";

const invoices = [
  {
    id: "QP-INV-2026-00409",
    customer: "Acme India Pvt Ltd",
    status: "succeeded",
    amount: "₹1,41,600.00",
  },
  {
    id: "QP-INV-2026-00410",
    customer: "Kaveri Logistics",
    status: "pending",
    amount: "₹58,410.00",
  },
  {
    id: "QP-INV-2026-00411",
    customer: "Zenith Foods",
    status: "failed",
    amount: "₹23,600.00",
  },
  {
    id: "QP-INV-2026-00412",
    customer: "Lotus Health",
    status: "succeeded",
    amount: "₹2,06,500.00",
  },
];

/**
 * The styled parts of a native table: header, body, footer and caption. Figures use tabular
 * numerals, so right-aligned amounts line up. For sorting, search and pagination, use
 * `DataTable`.
 *
 * @layout wide
 */
export default function TableDefault() {
  return (
    <Table>
      <TableCaption>Invoices issued in October 2026</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-end">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-mono">{invoice.id}</TableCell>
            <TableCell>{invoice.customer}</TableCell>
            <TableCell>
              <StatusPill status={invoice.status} />
            </TableCell>
            <TableCell className="text-end">{invoice.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-end">₹4,30,110.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
