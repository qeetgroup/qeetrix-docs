// Components › Table › Playground: the spec the playground kit draws. An island.
import { Table, type TableSort } from "@qeetrix/react";
import { useState } from "react";
import PlaygroundKit, { type Spec, type Values } from "../PlaygroundKit";
import { COLUMNS, sorted, USERS, userActions } from "./examples";

const PLAIN = COLUMNS.map(({ sortable, sortFirst, ...column }) => column);

const FIRST: TableSort = { column: "lastSignIn", direction: "descending" };

/** The table, sorting its rows as the server would. */
function Users({ v }: { v: Values }) {
  const [sort, setSort] = useState<TableSort | null>(FIRST);
  return (
    <Table
      label="Users, playground"
      rows={sorted(USERS.slice(0, Number(v.rows)), v.sortable ? sort : null)}
      rowId={(row) => row.email}
      rowLabel={(row) => row.name}
      columns={v.sortable ? COLUMNS : PLAIN}
      sort={v.sortable ? sort : null}
      onSortChange={setSort}
      selectable={Boolean(v.selectable)}
      rowActions={v.rowActions ? userActions : undefined}
      loading={Boolean(v.loading)}
    />
  );
}

const spec: Spec = {
  file: "users.tsx",
  imports: (v) => [[v.sortable ? ["Table", "type TableSort"] : ["Table"], "@qeetrix/react"]],
  component: "Table",
  preamble: (v) =>
    v.sortable
      ? [
          'const [sort, setSort] = useState<TableSort | null>({ column: "lastSignIn", direction: "descending" });',
        ]
      : [],
  after: (v) => (v.sortable ? [["onSortChange", "{setSort}"]] : []),
  fixed: () => [
    ["label", '"Users"'],
    ["rows", "{users}"],
    ["rowId", "{(row) => row.id}"],
    ["rowLabel", "{(row) => row.name}"],
    ["columns", "{columns}"],
  ],
  controls: [
    {
      prop: "rows",
      label: "Rows",
      kind: "choice",
      initial: "4",
      options: [
        ["0", "None"],
        ["2", "2"],
        ["4", "4"],
      ],
      code: () => null,
    },
    {
      prop: "sortable",
      label: "Sortable",
      kind: "switch",
      initial: true,
      code: (value) => (value ? ["sort", "{sort}"] : null),
    },
    { prop: "selectable", label: "Selectable", kind: "switch", initial: false },
    {
      prop: "rowActions",
      label: "Row actions",
      kind: "switch",
      initial: false,
      code: (value) => (value ? ["rowActions", "{rowActions}"] : null),
    },
    { prop: "loading", label: "Loading", kind: "switch", initial: false },
  ],
  render: (v) => (
    <div className="qc-table-figure">
      <Users v={v} />
    </div>
  ),
};

export default function Playground() {
  return <PlaygroundKit spec={spec} />;
}
