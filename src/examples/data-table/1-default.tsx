"use client";

import { Badge, type ColumnDef, DataTable } from "@qeetrix/ui";

type Member = {
  name: string;
  email: string;
  role: string;
  status: "Active" | "Invited" | "Suspended";
};

const members: Member[] = [
  {
    name: "Rohan Mehta",
    email: "rohan.mehta@acme.in",
    role: "Admin",
    status: "Active",
  },
  {
    name: "Priya Nair",
    email: "priya.nair@acme.in",
    role: "Developer",
    status: "Active",
  },
  {
    name: "Arjun Rao",
    email: "arjun.rao@acme.in",
    role: "Developer",
    status: "Invited",
  },
  {
    name: "Neha Joshi",
    email: "neha.joshi@acme.in",
    role: "Viewer",
    status: "Active",
  },
  {
    name: "Kabir Singh",
    email: "kabir.singh@acme.in",
    role: "Viewer",
    status: "Suspended",
  },
  {
    name: "Ananya Iyer",
    email: "ananya.iyer@acme.in",
    role: "Developer",
    status: "Active",
  },
];

const tone = {
  Active: "success",
  Invited: "info",
  Suspended: "muted",
} as const;

const columns: ColumnDef<Member>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "role", header: "Role" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={tone[row.original.status]}>{row.original.status}</Badge>
    ),
  },
];

/**
 * Sorting, search, row selection and pagination out of the box.
 *
 * @layout wide
 */
export default function DataTableDefault() {
  return (
    <DataTable
      columns={columns}
      data={members}
      label="Acme India members"
      searchPlaceholder="Search members…"
      enableRowSelection
      pageSize={5}
    />
  );
}
