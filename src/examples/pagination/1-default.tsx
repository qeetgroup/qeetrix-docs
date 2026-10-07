"use client";

import { Pagination } from "@qeetrix/ui";
import { useState } from "react";

const members = [
  { name: "Aarav Mehta", email: "aarav@northwind.in", role: "Owner" },
  { name: "Diya Sharma", email: "diya@northwind.in", role: "Admin" },
  { name: "Kabir Rao", email: "kabir@northwind.in", role: "Admin" },
  { name: "Meera Iyer", email: "meera@northwind.in", role: "Member" },
  { name: "Rohan Gupta", email: "rohan@northwind.in", role: "Member" },
  { name: "Ananya Nair", email: "ananya@northwind.in", role: "Member" },
  { name: "Vihaan Joshi", email: "vihaan@northwind.in", role: "Member" },
  { name: "Isha Reddy", email: "isha@northwind.in", role: "Auditor" },
  { name: "Arjun Malhotra", email: "arjun@northwind.in", role: "Member" },
  { name: "Saanvi Kulkarni", email: "saanvi@northwind.in", role: "Member" },
  { name: "Reyansh Bose", email: "reyansh@northwind.in", role: "Member" },
  { name: "Tara Menon", email: "tara@northwind.in", role: "Member" },
  { name: "Neel Desai", email: "neel@northwind.in", role: "Member" },
  { name: "Kavya Pillai", email: "kavya@northwind.in", role: "Member" },
];

const PAGE_SIZE = 4;
const LAST_PAGE = Math.ceil(members.length / PAGE_SIZE) - 1;

/**
 * The footer of a list screen: First, Prev and Next, and a label that is announced politely when
 * the page changes. With a `total`, the label reads "Showing 4 of 14".
 *
 * @layout wide
 */
export default function PaginationDefault() {
  const [page, setPage] = useState(0);
  const rows = members.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <div className="mx-auto w-full max-w-xl overflow-hidden rounded-lg border border-border bg-card">
      <ul className="divide-y divide-border text-sm">
        {rows.map((member) => (
          <li
            key={member.email}
            className="flex items-center justify-between gap-3 px-3 py-2"
          >
            <div className="min-w-0">
              <div className="truncate font-medium">{member.name}</div>
              <div className="truncate text-caption text-muted-foreground">
                {member.email}
              </div>
            </div>
            <span className="text-muted-foreground">{member.role}</span>
          </li>
        ))}
      </ul>
      <Pagination
        hasPrev={page > 0}
        hasNext={page < LAST_PAGE}
        onFirst={() => setPage(0)}
        onPrev={() => setPage(page - 1)}
        onNext={() => setPage(page + 1)}
        itemsOnPage={rows.length}
        total={members.length}
      />
    </div>
  );
}
