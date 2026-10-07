"use client";

import { Pagination } from "@qeetrix/ui";
import { useState } from "react";

const invoices = [
  {
    number: "QP-INV-2026-00412",
    customer: "Northwind Retail",
    amount: "₹1,18,000.00",
  },
  {
    number: "QP-INV-2026-00411",
    customer: "Sahyadri Foods",
    amount: "₹42,480.00",
  },
  {
    number: "QP-INV-2026-00410",
    customer: "Kaveri Textiles",
    amount: "₹2,36,000.00",
  },
  {
    number: "QP-INV-2026-00409",
    customer: "Northwind Retail",
    amount: "₹9,440.00",
  },
  {
    number: "QP-INV-2026-00408",
    customer: "Indus Logistics",
    amount: "₹75,520.00",
  },
  {
    number: "QP-INV-2026-00407",
    customer: "Malabar Spices",
    amount: "₹14,160.00",
  },
  {
    number: "QP-INV-2026-00406",
    customer: "Sahyadri Foods",
    amount: "₹59,000.00",
  },
  {
    number: "QP-INV-2026-00405",
    customer: "Kaveri Textiles",
    amount: "₹1,770.00",
  },
  {
    number: "QP-INV-2026-00404",
    customer: "Indus Logistics",
    amount: "₹3,30,400.00",
  },
  {
    number: "QP-INV-2026-00403",
    customer: "Malabar Spices",
    amount: "₹28,320.00",
  },
];

const PAGE_SIZE = 3;

/**
 * For an API that only returns a next cursor: pass `pageSize` instead of `total`, and leave out
 * `onPrev`, so Prev falls back to `onFirst`. `loading` disables the controls and shows a spinner
 * while the next page is fetched.
 *
 * @layout wide
 */
export default function PaginationCursor() {
  const [cursor, setCursor] = useState(0);
  const [loading, setLoading] = useState(false);
  const rows = invoices.slice(cursor, cursor + PAGE_SIZE);

  // Stands in for a request: the next page arrives after a moment.
  const load = (next: number) => {
    setLoading(true);
    setTimeout(() => {
      setCursor(next);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="mx-auto w-full max-w-xl overflow-hidden rounded-lg border border-border bg-card">
      <ul className="divide-y divide-border text-sm">
        {rows.map((invoice) => (
          <li
            key={invoice.number}
            className="flex items-center justify-between gap-3 px-3 py-2"
          >
            <div className="min-w-0">
              <div className="truncate font-mono">{invoice.number}</div>
              <div className="truncate text-caption text-muted-foreground">
                {invoice.customer}
              </div>
            </div>
            <span className="tabular-nums">{invoice.amount}</span>
          </li>
        ))}
      </ul>
      <Pagination
        hasPrev={cursor > 0}
        hasNext={cursor + PAGE_SIZE < invoices.length}
        onFirst={() => load(0)}
        onNext={() => load(cursor + PAGE_SIZE)}
        itemsOnPage={rows.length}
        pageSize={PAGE_SIZE}
        loading={loading}
      />
    </div>
  );
}
