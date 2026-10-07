"use client";

import { DownloadIcon, TrashIcon, UserCogIcon } from "@qeetrix/icons";
import {
  ActionBar,
  ActionBarItem,
  ActionBarSeparator,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@qeetrix/ui";
import { useState } from "react";

const members = [
  { id: "u1", name: "Aarav Mehta", email: "aarav@northwind.in", role: "Owner" },
  { id: "u2", name: "Diya Sharma", email: "diya@northwind.in", role: "Admin" },
  { id: "u3", name: "Kabir Rao", email: "kabir@northwind.in", role: "Member" },
  { id: "u4", name: "Meera Iyer", email: "meera@northwind.in", role: "Member" },
];

/**
 * The bar appears while rows are selected and offers actions for all of them. It is fixed to the
 * viewport in an app; here the frame's `transform` makes it the bar's containing block, so it
 * floats at the bottom of the table instead of the page.
 *
 * @layout wide
 */
export default function ActionBarDefault() {
  const [selected, setSelected] = useState<string[]>(["u3", "u4"]);
  const toggle = (id: string, checked: boolean) =>
    setSelected((current) =>
      checked ? [...current, id] : current.filter((entry) => entry !== id),
    );
  const all = selected.length === members.length;

  return (
    <div className="relative h-96 overflow-hidden rounded-lg border border-border bg-background transform-gpu">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10">
              <Checkbox
                aria-label="Select all members"
                checked={all}
                indeterminate={selected.length > 0 && !all}
                onCheckedChange={(checked) =>
                  setSelected(checked ? members.map((member) => member.id) : [])
                }
              />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member) => (
            <TableRow
              key={member.id}
              data-state={selected.includes(member.id) ? "selected" : undefined}
            >
              <TableCell>
                <Checkbox
                  aria-label={`Select ${member.name}`}
                  checked={selected.includes(member.id)}
                  onCheckedChange={(checked) => toggle(member.id, checked)}
                />
              </TableCell>
              <TableCell>
                <div className="font-medium">{member.name}</div>
                <div className="text-caption text-muted-foreground">
                  {member.email}
                </div>
              </TableCell>
              <TableCell>{member.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ActionBar
        open={selected.length > 0}
        selectionCount={selected.length}
        onClearSelection={() => setSelected([])}
      >
        <ActionBarItem variant="ghost">
          <UserCogIcon data-icon="inline-start" aria-hidden />
          Change role
        </ActionBarItem>
        <ActionBarItem variant="ghost">
          <DownloadIcon data-icon="inline-start" aria-hidden />
          Export
        </ActionBarItem>
        <ActionBarSeparator />
        <ActionBarItem variant="destructive">
          <TrashIcon data-icon="inline-start" aria-hidden />
          Remove
        </ActionBarItem>
      </ActionBar>
    </div>
  );
}
