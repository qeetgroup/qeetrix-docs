// Components › Table: its documentation, from @qeetrix/react 0.2.0 (table.d.ts, table.js,
// parts.js), the Storybook stories (data-display/table.stories.tsx) and the changelog. Its
// examples sort and select live (Live.tsx); the figures are the real Table, server-rendered.
import { Table } from "@qeetrix/react";
import { DISPLAY_TESTED } from "../display";
import type { ComponentDoc } from "../types";
import { COLUMNS, examples, USERS, type User, userActions } from "./examples";

const base = { rowId: (row: User) => row.email, rowLabel: (row: User) => row.name };
const PLAIN = COLUMNS.map(({ sortable, sortFirst, ...column }) => column);

export const table: ComponentDoc = {
  name: "Table",
  slug: "table",
  category: "data-display",
  status: "stable",
  since: "0.0.2",
  lede: "The one way to show records. Columns and rows in; sorting, selection, row actions and every state built in.",
  exports: ["Table", "TableColumn", "TableSort"],
  renders: "<table>",
  source: "table",
  story: "components/data-display/table.stories.tsx",
  examples,

  usage: {
    useFor: [
      "A console's list of records: users, sessions, invoices, audit events.",
      "A few read-only rows to compare.",
      "A server-paged list, with Pagination.",
    ],
    notFor: [
      { text: "One record's facts", use: "Description list" },
      { text: "Recent activity, newest first", use: "Timeline" },
      { text: "A hierarchy to open and close", use: "Tree view" },
    ],
    anatomyFigure: (
      <div className="qc-table-figure">
        <Table
          label="Users"
          rows={USERS.slice(0, 2)}
          columns={[
            { id: "name", header: "Name", cell: (row) => row.name },
            COLUMNS[3] as (typeof COLUMNS)[number],
          ]}
          selectable
          defaultSelected={["priya@acme.in"]}
          defaultSort={{ column: "lastSignIn", direction: "descending" }}
          rowActions={userActions}
          {...base}
        />
      </div>
    ),
    anatomy: [
      {
        slot: "table-count",
        element: "<span>",
        note: "While rows are chosen: the count, bulkActions and Clear, in the toolbar's place.",
      },
      {
        slot: "table-head",
        select: '[data-slot="table-head"][aria-sort]',
        element: '<th scope="col">',
        note: "A sorted column: aria-sort, and its arrow.",
      },
      {
        slot: "checkbox",
        select: '[data-slot="table-body"] [role="checkbox"]',
        element: '<span role="checkbox">',
        note: 'A row\'s checkbox, named "Select Priya Sharma".',
      },
      {
        slot: "table-row",
        select: '[data-slot="table-body"] [data-slot="table-row"]',
        element: "<tr>",
        note: "A chosen row keeps its Ember tint.",
      },
      {
        slot: "row-actions",
        select: '[data-slot="table-body"] [data-slot="icon-button"]',
        element: "<button>",
        note: 'Its actions, a menu named "Actions for Priya Sharma".',
      },
    ],
    rules: [
      {
        title: "Status as a word",
        doLine: "A Badge that says it: Active, Blocked.",
        dontLine: "A colour alone: what does green mean?",
        doIt: (
          <Table
            label="Users, with badges"
            rows={USERS.slice(3, 6)}
            columns={PLAIN.slice(0, 2)}
            {...base}
          />
        ),
        dontIt: (
          <Table
            label="Users, with dots"
            rows={USERS.slice(3, 6)}
            columns={[
              PLAIN[0] as (typeof PLAIN)[number],
              {
                id: "status",
                header: "Status",
                cell: (row) => (
                  <span
                    className="qc-dot"
                    data-tone={
                      row.status === "Blocked"
                        ? "danger"
                        : row.status === "Invited"
                          ? "info"
                          : "success"
                    }
                  />
                ),
              },
            ]}
            {...base}
          />
        ),
      },
      {
        title: "Numbers at the end",
        doLine: "Times and amounts end-aligned, so they line up.",
        dontLine: "Start-aligned figures: the digits wander.",
        doIt: (
          <Table
            label="Users, end-aligned"
            rows={USERS.slice(0, 3)}
            columns={[PLAIN[0] as (typeof PLAIN)[number], PLAIN[3] as (typeof PLAIN)[number]]}
            {...base}
          />
        ),
        dontIt: (
          <Table
            label="Users, start-aligned"
            rows={USERS.slice(0, 3)}
            columns={[
              PLAIN[0] as (typeof PLAIN)[number],
              { ...(PLAIN[3] as (typeof PLAIN)[number]), align: "start" },
            ]}
            {...base}
          />
        ),
      },
    ],
    content: [
      "Headers in sentence case, a word or two: Last sign-in.",
      'Name the table with label: "Users", as the page heading says.',
      "An empty cell shows —; say why in the empty state, not in a cell.",
    ],
  },

  api: {
    props: [
      { name: "label", type: "string", default: "required", note: 'Names the table: "Users".' },
      {
        name: "rows · rowId · rowLabel",
        type: "Row[] · (row) => string",
        default: "required",
        note: "The rows on show (this page), each one's stable id, and its name: for its link, checkbox and menu.",
      },
      {
        name: "columns",
        type: "TableColumn<Row>[]",
        default: "required",
        note: "id, header, cell(row); and sortable, sortFirst, align, numeric, width, primary, priority.",
      },
      {
        name: "sort · defaultSort · onSortChange",
        type: "TableSort | null",
        default: "null",
        note: "{ column, direction }, or null for the server's own order. The rows arrive sorted.",
      },
      {
        name: "selectable",
        type: "boolean",
        default: "false",
        note: "A checkbox per row; the header's selects or clears the page.",
      },
      {
        name: "selected · defaultSelected · onSelectedChange",
        type: "string[]",
        default: "[]",
        note: "The chosen rows' ids; they may include rows on other pages.",
      },
      {
        name: "rowSelectable · rowUnselectableReason",
        type: "(row) => boolean · (row) => string",
        default: "every row",
        note: "A row that can't be chosen: its checkbox disabled, described by the reason; the header's leaves it out.",
      },
      {
        name: "bulkActions · toolbar",
        type: "(ids) => ReactNode · ReactNode",
        default: "—",
        note: "The bar above: the toolbar, or while rows are chosen, the count, bulkActions and Clear.",
      },
      {
        name: "rowActions",
        type: "(row) => ReactNode",
        default: "—",
        note: "MenuItems, in a menu at each row's end; nothing leaves that row without one.",
      },
      {
        name: "rowHref · renderRowLink · onRowClick",
        type: "(row) => …",
        default: "—",
        note: "Each row opens its record: the primary cell holds the link, and a click elsewhere on the row follows it.",
      },
      {
        name: "currentRow",
        type: "string",
        default: "—",
        note: "The id of the row whose record is open beside the list: aria-current, tinted.",
      },
      {
        name: "loading · loadingRows",
        type: "boolean · number",
        default: "false · 5",
        note: "Placeholder rows with none yet; with rows, a busy line. Loading is announced.",
      },
      {
        name: "empty · error",
        type: "ReactNode",
        default: '"No results"',
        note: "In place of the rows: an EmptyState, a DataState.",
      },
      {
        name: "rowDepth · rowHasChildren · rowPath",
        type: "(row) => …",
        default: "—",
        note: "Tree rows that fold, in tree order: a tree grid, ← folds and → opens.",
      },
      {
        name: "expanded · defaultExpanded · onExpandedChange",
        type: "string[]",
        default: "[]",
        note: "The open rows' ids.",
      },
      {
        name: "stickyFirstColumn",
        type: "boolean",
        default: "false",
        note: "The first column stays as a matrix scrolls sideways.",
      },
    ],
    parts: [
      { slot: "table", element: "<div>", note: "The bar, the table and its announcements." },
      { slot: "table-bar", element: "<div>", note: "The toolbar, or the selection's bar." },
      { slot: "table-toolbar", element: "<div>", note: "toolbar, filling the bar." },
      {
        slot: "table-scroll",
        element: "<div>",
        note: "Scrolls sideways only while it overflows: a named region then.",
      },
      { slot: "table-element", element: "<table>", note: "aria-label; aria-busy while loading." },
      { slot: "table-head", element: '<th scope="col">', note: "aria-sort when sorted." },
      { slot: "table-sort", element: "<button>", note: "A sortable header's button." },
      { slot: "table-row", element: "<tr>", note: "data-selected; data-clickable." },
      { slot: "table-cell", element: "<td>", note: "data-align, data-numeric." },
      {
        slot: "table-row-link",
        element: "<a>",
        note: "The primary cell's link, or a <button> with onRowClick alone.",
      },
    ],
    recipes: [
      {
        title: "Server-paged",
        line: "The table holds the sort and the selection; the server sorts and pages. Send both, show what comes back.",
        file: "users.tsx",
        code: `const [sort, setSort] = useState<TableSort | null>(null);
const [offset, setOffset] = useState(0);
const { data, isFetching } = useUsers({ sort, offset, limit: 25 });

<Table rows={data?.rows ?? []} sort={sort} onSortChange={setSort} loading={isFetching} … />
<Pagination offset={offset} pageSize={25} total={data?.total} onOffsetChange={setOffset} />`,
      },
      {
        title: "Narrow screens",
        line: "priority: low columns hide under 640px, medium under 480px; wider still, the table scrolls itself.",
        file: "audit-log.tsx",
        code: `const columns: TableColumn<Event>[] = [
  { id: "event", header: "Event", cell: (e) => e.name, primary: true },
  { id: "actor", header: "Actor", cell: (e) => e.actor, priority: "medium" },
  { id: "ip", header: "IP address", cell: (e) => e.ip, priority: "low" },
];`,
      },
    ],
  },

  accessibility: {
    keyboard: [
      {
        keys: ["Tab"],
        action: "Through the bar, the sort buttons, the checkboxes, the row links and the menus.",
      },
      {
        keys: ["Enter", "Space"],
        action: "Sorts by a header; ticks a row; opens a row or its menu.",
      },
    ],
    checks: [
      {
        check: "Name",
        result: "The table is named by label; the header cells are column headers.",
      },
      { check: "Sort", result: "aria-sort on the sorted column; its header is a button." },
      {
        check: "Rows",
        result: 'Each checkbox and menu is named for its row: "Select Priya Sharma".',
      },
      { check: "Announced", result: "Loading, and the number chosen, politely." },
    ],
    tested: DISPLAY_TESTED,
  },

  changelog: [
    {
      version: "0.2.2",
      items: [
        "The selection's bar wraps on a narrow page.",
        "A wide table scrolls before it's measured, so a server-rendered one doesn't overflow.",
      ],
    },
    {
      version: "0.2.0",
      items: [
        "It scrolls sideways itself while it overflows: no ScrollArea around it.",
        "Columns' priority; rowSelectable, currentRow, tree rows and stickyFirstColumn.",
        "toolbar fills the bar; a row's link is named by rowLabel.",
      ],
    },
    {
      version: "0.1.0",
      items: [
        "Clickable rows: rowHref, renderRowLink and onRowClick, with primary on a column.",
        "Refreshing rows stay readable, with a busy line under the header; refreshes are announced.",
        "The selection count follows the locale; the header no longer jumps when the first row is ticked.",
      ],
    },
    {
      version: "0.0.6",
      items: [
        "One Table: label, rows, rowId, rowLabel and columns, with sorting, selection, row actions, a sticky header and the loading, empty and error states built in. TableCaption and the other parts are no longer exported.",
        "Cells keep space above and below, so two-line content doesn't touch the row lines.",
      ],
    },
    {
      version: "0.0.2",
      items: [
        "Table and its parts: a neutral header band, row heights from the density, numeric cells in tabular figures.",
      ],
    },
  ],

  related: [
    { name: "Pagination", when: "Pages of it" },
    { name: "Badge", when: "A status in a cell" },
    { name: "Description list", when: "One record" },
  ],
};
