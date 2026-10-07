"use client";

import { type ActiveFilter, FilterBar, type FilterField } from "@qeetrix/ui";
import { useState } from "react";

const fields: FilterField[] = [
  {
    key: "status",
    label: "Status",
    options: [
      { label: "Captured", value: "captured" },
      { label: "Failed", value: "failed" },
      { label: "Refunded", value: "refunded" },
    ],
  },
  {
    key: "method",
    label: "Method",
    options: [
      { label: "UPI", value: "upi" },
      { label: "Card", value: "card" },
      { label: "Netbanking", value: "netbanking" },
    ],
  },
  {
    key: "amount",
    label: "Amount (₹)",
    operators: ["more than", "less than", "equals"],
  },
  { key: "customer", label: "Customer email" },
];

/**
 * Active filters are chips: the body reopens the builder to edit one, and × removes it.
 * "Add filter" walks through field, operator and value: a field with `options` offers a picker,
 * one without takes free text. Filters are controlled through `value` and `onValueChange`; giving
 * `search` or `onSearchChange` adds the search field.
 *
 * @layout wide
 */
export default function FilterBarDefault() {
  const [filters, setFilters] = useState<ActiveFilter[]>([
    { field: "status", operator: "is", value: "failed" },
    { field: "method", operator: "is", value: "upi" },
  ]);
  const [search, setSearch] = useState("");

  return (
    <FilterBar
      fields={fields}
      value={filters}
      onValueChange={setFilters}
      search={search}
      onSearchChange={setSearch}
      searchPlaceholder="Search payments…"
    />
  );
}
