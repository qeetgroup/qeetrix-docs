import { Button, Link, SkipNav, SkipNavContent } from "@qeetrix/ui";

const navigation = [
  "Payments",
  "Invoices",
  "Settlements",
  "Refunds",
  "Customers",
];

const invoices = [
  {
    number: "QP-INV-2026-00412",
    customer: "Northwind Retail",
    amount: "₹1,18,000",
  },
  {
    number: "QP-INV-2026-00411",
    customer: "Sahyadri Foods",
    amount: "₹42,480",
  },
  {
    number: "QP-INV-2026-00410",
    customer: "Kaveri Textiles",
    amount: "₹2,36,000",
  },
];

/**
 * The skip link stays out of view until it has focus: click the line above the frame, then press
 * Tab. Enter jumps past the header to `SkipNavContent`, the page's `<main>`, so the next Tab lands
 * on its first control. In an app it comes first in `<body>` and is fixed to the viewport; here
 * the frame's transform contains it.
 *
 * @layout wide
 */
export default function SkipNavDefault() {
  return (
    <div className="flex w-full flex-col gap-2">
      <p className="text-caption text-muted-foreground">
        Click this line, then press Tab.
      </p>
      <div className="relative h-72 overflow-hidden rounded-lg border border-border bg-background transform-gpu">
        <SkipNav />
        <header className="flex items-center gap-6 border-b border-border px-4 py-3">
          <span className="font-heading text-sm font-semibold">Qeet Pay</span>
          <nav aria-label="Primary">
            <ul className="flex flex-wrap gap-x-4 gap-y-1">
              {navigation.map((item) => (
                <li key={item}>
                  <Link href="#" variant="muted" size="sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>
        <SkipNavContent className="flex flex-col gap-3 p-4">
          <div className="flex items-center justify-between gap-3">
            <h4 className="font-heading text-base font-medium">Invoices</h4>
            <Button size="sm">New invoice</Button>
          </div>
          <ul className="divide-y divide-border rounded-md border border-border text-sm">
            {invoices.map((invoice) => (
              <li
                key={invoice.number}
                className="flex items-center justify-between gap-3 px-3 py-2"
              >
                <span className="font-mono">{invoice.number}</span>
                <span className="truncate text-muted-foreground">
                  {invoice.customer}
                </span>
                <span className="tabular-nums">{invoice.amount}</span>
              </li>
            ))}
          </ul>
        </SkipNavContent>
      </div>
    </div>
  );
}
