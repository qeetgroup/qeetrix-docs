// Components › Table: its examples, the real Table with the code for each. Shared by the page
// (doc.tsx) and the island that runs them (Live.tsx): nothing here reads token data. Times are
// relative to a fixed now, so the server's text and the browser's match.
import { DownloadIcon } from "@qeetrix/icons/icons/download";
import { PlusIcon } from "@qeetrix/icons/icons/plus";
import { UsersIcon } from "@qeetrix/icons/icons/users";
import {
  Badge,
  Button,
  Card,
  formatCurrency,
  formatRelativeTime,
  IconButton,
  Inline,
  MenuItem,
  MenuSeparator,
  Stack,
  Table,
  type TableColumn,
  type TableSort,
  Text,
} from "@qeetrix/react";
import {
  AvatarItem,
  DataState,
  EmptyState,
  Pagination,
  SearchField,
} from "@qeetrix/react/experimental";
import { type ComponentProps, useState } from "react";
import type { ExampleDoc } from "../types";

/** The docs' now: 29 October 2026, 9:30 in Bengaluru. */
const NOW = Date.UTC(2026, 9, 29, 4, 0);
const minutes = (n: number) => NOW - n * 60_000;

type Status = "Active" | "Invited" | "Blocked";
export interface User {
  name: string;
  email: string;
  status: Status;
  mfa: string;
  department: string;
  lastSignIn: number;
}

const user = (
  name: string,
  email: string,
  status: Status,
  mfa: string,
  department: string,
  lastSignIn: number,
): User => ({ name, email, status, mfa, department, lastSignIn });

/** The Qeet ID console's users. */
export const USERS: User[] = [
  user("Priya Sharma", "priya@acme.in", "Active", "Passkey", "Engineering", minutes(2)),
  user("Rahul Verma", "rahul.verma@acme.in", "Active", "Passkey", "Finance", minutes(18)),
  user("Ananya Iyer", "ananya@acme.in", "Active", "Authenticator", "Engineering", minutes(64)),
  user("Karthik Reddy", "karthik.r@acme.in", "Invited", "—", "Sales", minutes(180)),
  user("Meera Nair", "meera.nair@acme.in", "Active", "Passkey", "People", minutes(26 * 60)),
  user("Arjun Mehta", "arjun@acme.in", "Blocked", "Authenticator", "Support", minutes(3 * 1440)),
];

const TONE = { Active: "success", Invited: "info", Blocked: "danger" } as const;

export const COLUMNS: TableColumn<User>[] = [
  {
    id: "name",
    header: "Name",
    sortable: true,
    cell: (row) => <AvatarItem name={row.name} description={row.email} />,
  },
  {
    id: "status",
    header: "Status",
    cell: (row) => <Badge tone={TONE[row.status]}>{row.status}</Badge>,
  },
  { id: "mfa", header: "MFA", cell: (row) => row.mfa },
  {
    id: "lastSignIn",
    header: "Last sign-in",
    align: "end",
    sortable: true,
    sortFirst: "descending",
    cell: (row) => formatRelativeTime(row.lastSignIn, "en-IN", NOW),
  },
];

/** Every column but the sort's: for a plain list. */
const PLAIN = COLUMNS.map(({ sortable, sortFirst, ...column }) => column);

/** The rows in a sort's order: what the server would send back. */
export function sorted(rows: readonly User[], sort: TableSort | null): User[] {
  if (!sort) return [...rows];
  const sign = sort.direction === "ascending" ? 1 : -1;
  return [...rows].sort((a, b) =>
    sort.column === "name"
      ? sign * a.name.localeCompare(b.name, "en-IN")
      : sign * (a.lastSignIn - b.lastSignIn),
  );
}

export const userActions = () => (
  <>
    <MenuItem>View profile</MenuItem>
    <MenuItem>Reset MFA</MenuItem>
    <MenuSeparator />
    <MenuItem tone="danger">Suspend</MenuItem>
  </>
);

const bulkActions = () => (
  <>
    <Button variant="soft" tone="neutral">
      Reset MFA
    </Button>
    <Button variant="soft" tone="danger">
      Suspend
    </Button>
  </>
);

/** A router's link in miniature: it handles the click itself, so the docs page stays put. */
function RouterLink({ to, onClick, ...props }: ComponentProps<"a"> & { to: string }) {
  return (
    <a
      {...props}
      href={to}
      onClick={(event) => {
        onClick?.(event);
        event.preventDefault();
      }}
    />
  );
}

const base = {
  rowId: (row: User) => row.email,
  rowLabel: (row: User) => row.name,
};

function Sorting() {
  const [sort, setSort] = useState<TableSort | null>({
    column: "lastSignIn",
    direction: "descending",
  });
  return (
    <Table
      label="Users, sorted"
      rows={sorted(USERS.slice(0, 5), sort)}
      columns={COLUMNS}
      sort={sort}
      onSortChange={setSort}
      {...base}
    />
  );
}

function Opening() {
  const [opened, setOpened] = useState("");
  return (
    <Stack gap="sm">
      <Table
        label="Users, opening"
        rows={USERS.slice(0, 4)}
        columns={PLAIN}
        renderRowLink={(row) => <RouterLink to={`#user-${row.email}`} />}
        onRowClick={(row) => setOpened(row.name)}
        rowActions={userActions}
        {...base}
      />
      <Text size="sm" tone="subtle">
        {opened ? `Opened: ${opened}.` : "Open a row: its name, or anywhere on it."}
      </Text>
    </Stack>
  );
}

function InACard() {
  const [offset, setOffset] = useState(0);
  return (
    <Card
      footer={
        <Pagination
          offset={offset}
          pageSize={5}
          total={1284}
          onOffsetChange={setOffset}
          messages={{ label: "Pagination, users" }}
        />
      }
    >
      <Table
        label="Users, in a card"
        rows={USERS.slice(0, 5)}
        columns={PLAIN}
        selectable
        toolbar={
          <Inline gap="md" justify="between" style={{ flex: 1 }}>
            <SearchField aria-label="Search users" placeholder="Search by name or email" />
            <IconButton icon={DownloadIcon} aria-label="Download CSV" tone="neutral" size="lg" />
          </Inline>
        }
        bulkActions={bulkActions}
        rowActions={userActions}
        {...base}
      />
    </Card>
  );
}

interface Invoice {
  id: string;
  customer: string;
  issued: string;
  amount: number;
}

const INVOICES: Invoice[] = [
  { id: "INV-2026-0412", customer: "Acme Pvt Ltd", issued: "1 Oct 2026", amount: 124500 },
  { id: "INV-2026-0413", customer: "Globex India", issued: "8 Oct 2026", amount: 8250 },
  { id: "INV-2026-0414", customer: "Initech Labs", issued: "15 Oct 2026", amount: 1048000 },
];

const STATE_COLUMNS = PLAIN.filter((column) => column.id !== "mfa");

export const examples: ExampleDoc[] = [
  {
    id: "rows-of-records",
    title: "Rows of records",
    line: "label, rows, rowId, rowLabel and columns: each column an id, a header and a cell.",
    code: `const columns: TableColumn<User>[] = [
  { id: "name", header: "Name", cell: (row) => <AvatarItem name={row.name} description={row.email} /> },
  { id: "status", header: "Status", cell: (row) => <Badge tone={tone[row.status]}>{row.status}</Badge> },
  { id: "mfa", header: "MFA", cell: (row) => row.mfa },
  { id: "lastSignIn", header: "Last sign-in", align: "end", cell: (row) => formatRelativeTime(row.lastSignIn) },
];

<Table label="Users" rows={users} rowId={(row) => row.id} rowLabel={(row) => row.name} columns={columns} />`,
    render: () => (
      <div className="qc-table-figure">
        <Table label="Users" rows={USERS.slice(0, 4)} columns={PLAIN} {...base} />
      </div>
    ),
  },
  {
    id: "sorting",
    title: "Sorting",
    line: "sortable: the header is a button. A click sorts one way, then the other, then back to the server's order; the rows arrive sorted.",
    code: `const [sort, setSort] = useState<TableSort | null>({ column: "lastSignIn", direction: "descending" });

<Table rows={useUsers({ sort }).rows} sort={sort} onSortChange={setSort} … />

{ id: "lastSignIn", header: "Last sign-in", sortable: true, sortFirst: "descending", … }`,
    render: () => (
      <div className="qc-table-figure">
        <Sorting />
      </div>
    ),
  },
  {
    id: "selection",
    title: "Selection",
    line: "selectable: a checkbox per row, and the header's for the page. While any are chosen, a bar holds the count, bulkActions and Clear.",
    code: `<Table
  selectable
  bulkActions={(ids) => (
    <>
      <Button variant="soft" tone="neutral">Reset MFA</Button>
      <Button variant="soft" tone="danger">Suspend</Button>
    </>
  )}
  …
/>`,
    render: () => (
      <div className="qc-table-figure">
        <Table
          label="Users, selectable"
          rows={USERS.slice(0, 4)}
          columns={PLAIN}
          selectable
          defaultSelected={["rahul.verma@acme.in"]}
          bulkActions={bulkActions}
          {...base}
        />
      </div>
    ),
  },
  {
    id: "opening-a-row",
    title: "Opening a row",
    line: "renderRowLink or rowHref: the first column's cell is the row's link, and a click anywhere else on the row follows it. rowActions: a menu at its end.",
    code: `<Table
  renderRowLink={(row) => <Link to="/users/$id" params={{ id: row.id }} />}
  rowActions={(row) => (
    <>
      <MenuItem>View profile</MenuItem>
      <MenuItem>Reset MFA</MenuItem>
      <MenuSeparator />
      <MenuItem tone="danger">Suspend</MenuItem>
    </>
  )}
  …
/>`,
    render: () => (
      <div className="qc-table-figure">
        <Opening />
      </div>
    ),
  },
  {
    id: "amounts",
    title: "Amounts",
    line: "numeric: tabular figures, end-aligned, so the digits line up.",
    code: `{ id: "amount", header: "Amount", numeric: true, cell: (row) => formatCurrency(row.amount, "INR") }`,
    render: () => (
      <div className="qc-table-figure">
        <Table
          label="Invoices"
          rows={INVOICES}
          rowId={(row) => row.id}
          rowLabel={(row) => row.id}
          columns={[
            { id: "id", header: "Invoice", cell: (row) => row.id },
            { id: "customer", header: "Customer", cell: (row) => row.customer },
            { id: "issued", header: "Issued", cell: (row) => row.issued },
            {
              id: "amount",
              header: "Amount",
              numeric: true,
              cell: (row) => formatCurrency(row.amount, "INR", "en-IN"),
            },
          ]}
        />
      </div>
    ),
  },
  {
    id: "loading-empty-and-error",
    title: "Loading, empty and error",
    line: "In the table, under its header: placeholder rows while the first page loads; empty and error in their place.",
    code: `<Table rows={[]} loading … />
<Table rows={[]} empty={<EmptyState size="section" title="No users yet" … />} … />
<Table rows={[]} error={<DataState error={error} onRetry={refetch} />} … />`,
    render: () => (
      <div className="qc-table-figure">
        <Stack gap="lg">
          <Table
            label="Users, loading"
            rows={[]}
            columns={STATE_COLUMNS}
            loading
            loadingRows={2}
            {...base}
          />
          <Table
            label="Users, empty"
            rows={[]}
            columns={STATE_COLUMNS}
            empty={
              <EmptyState
                size="section"
                icon={UsersIcon}
                title="No users yet"
                description="Invite your team, or connect a directory."
                actions={<Button icon={PlusIcon}>Invite users</Button>}
              />
            }
            {...base}
          />
          <Table
            label="Users, failed"
            rows={[]}
            columns={STATE_COLUMNS}
            error={<DataState error="failed" onRetry={() => {}} />}
            {...base}
          />
        </Stack>
      </div>
    ),
  },
  {
    id: "refreshing",
    title: "Refreshing",
    line: "loading with rows on show: they stay readable, a busy line runs under the header, and Loading is announced.",
    code: `<Table rows={users} loading={isFetching} … />`,
    render: () => (
      <div className="qc-table-figure">
        <Table
          label="Users, refreshing"
          rows={USERS.slice(0, 3)}
          columns={STATE_COLUMNS}
          loading
          {...base}
        />
      </div>
    ),
  },
  {
    id: "in-a-card",
    title: "In a card",
    line: "A Table as a Card's body runs edge to edge: the toolbar above, Pagination in the footer.",
    code: `<Card footer={<Pagination offset={offset} pageSize={25} total={1284} onOffsetChange={setOffset} />}>
  <Table
    toolbar={<SearchField aria-label="Search users" placeholder="Search by name or email" />}
    selectable
    bulkActions={bulkActions}
    rowActions={rowActions}
    …
  />
</Card>`,
    render: () => (
      <div className="qc-table-figure">
        <InACard />
      </div>
    ),
  },
];
