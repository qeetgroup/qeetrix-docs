// Components › Pagination: its examples, the real Pagination with the code for each. Shared by the
// page (doc.tsx) and the island that runs them (Live.tsx): nothing here reads token data.
import { Badge, Card, QeetrixProvider, Stack, Table, type TableColumn, Text } from "@qeetrix/react";
import { Pagination, ShowMore } from "@qeetrix/react/experimental";
import { hi } from "@qeetrix/react/locales/hi";
import { useState } from "react";
import type { ExampleDoc } from "../types";

/** A bar that moves: offset in state, as a list's page would keep it. */
export function Bar({
  start = 25,
  pageSize = 25,
  total = 1284 as number | undefined,
  itemsOnPage = undefined as number | undefined,
  loading = false,
  label = "",
}) {
  const [offset, setOffset] = useState(start);
  return (
    <div className="qc-pages-stage">
      <Pagination
        offset={offset}
        pageSize={pageSize}
        total={total}
        itemsOnPage={itemsOnPage}
        loading={loading}
        onOffsetChange={setOffset}
        messages={label ? { label } : undefined}
      />
    </div>
  );
}

function RowsPerPage() {
  const [offset, setOffset] = useState(0);
  const [pageSize, setPageSize] = useState(25);
  return (
    <div className="qc-pages-stage">
      <Pagination
        offset={offset}
        pageSize={pageSize}
        total={1284}
        onOffsetChange={setOffset}
        messages={{ label: "Pagination, rows per page" }}
        pageSizes={[25, 50, 100]}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setOffset(0);
        }}
      />
    </div>
  );
}

/** A cursor API: Previous and Next alone, the range from the page's own offset. */
function Cursor() {
  const [page, setPage] = useState(1);
  return (
    <div className="qc-pages-stage">
      <Pagination
        offset={page * 25}
        pageSize={25}
        hasPrevious={page > 0}
        hasNext={page < 3}
        onPrevious={() => setPage(page - 1)}
        onNext={() => setPage(page + 1)}
        messages={{ label: "Pagination, cursor" }}
      />
    </div>
  );
}

const EVENTS = [
  "Priya Sharma signed in · 2 minutes ago",
  "Rahul Verma added a passkey · 1 hour ago",
  "Ananya Rao was invited · yesterday",
  "Arjun Iyer reset two-step · 3 days ago",
  "Meera Nair left Finance · last week",
  "Kabir Shah was suspended · 2 weeks ago",
];

/** A list that grows a page at a time, to its end. */
function Older() {
  const [shown, setShown] = useState(2);
  return (
    <div className="qc-pages-stage">
      <Stack gap="sm">
        {EVENTS.slice(0, shown).map((event) => (
          <Text key={event}>{event}</Text>
        ))}
        <ShowMore
          hasMore={shown < EVENTS.length}
          onMore={() => setShown(shown + 2)}
          label="Show older events"
          end="That's everything since 29 September."
        />
      </Stack>
    </div>
  );
}

interface User {
  id: string;
  name: string;
  email: string;
  status: "Active" | "Invited" | "Suspended";
}

const FIRST = ["Priya", "Rahul", "Ananya", "Vikram", "Meera", "Arjun", "Kavya", "Rohan", "Sneha"];
const LAST = ["Sharma", "Verma", "Iyer", "Nair", "Reddy", "Gupta", "Menon", "Joshi", "Rao"];
const STATUSES: User["status"][] = ["Active", "Active", "Active", "Invited", "Suspended"];

/** 137 users of Acme Pvt Ltd, the same on every render. */
export const USERS: User[] = Array.from({ length: 137 }, (_, index) => {
  const first = FIRST[index % FIRST.length] as string;
  const last = LAST[(index * 4 + Math.floor(index / FIRST.length)) % LAST.length] as string;
  return {
    id: `usr_${String(index + 1).padStart(4, "0")}`,
    name: `${first} ${last}`,
    email: `${first}.${last}${index > 8 ? index : ""}@acme.in`.toLowerCase(),
    status: STATUSES[index % STATUSES.length] as User["status"],
  };
});

const TONE = { Active: "success", Invited: "info", Suspended: "danger" } as const;
export const COLUMNS: TableColumn<User>[] = [
  { id: "name", header: "Name", cell: (user) => user.name },
  { id: "email", header: "Email", cell: (user) => user.email },
  {
    id: "status",
    header: "Status",
    cell: (user) => <Badge tone={TONE[user.status]}>{user.status}</Badge>,
  },
];

function UsersCard() {
  const [offset, setOffset] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  return (
    <div className="qc-pages-card">
      <Card
        title="Users"
        level={3}
        footer={
          <Pagination
            offset={offset}
            pageSize={pageSize}
            total={USERS.length}
            onOffsetChange={setOffset}
            messages={{ label: "Pagination, users" }}
            pageSizes={[5, 10, 25]}
            onPageSizeChange={(size) => {
              setPageSize(size);
              setOffset(0);
            }}
          />
        }
      >
        <Table
          label="Users"
          rows={USERS.slice(offset, offset + pageSize)}
          rowId={(user) => user.id}
          rowLabel={(user) => user.name}
          columns={COLUMNS.filter((column) => column.id !== "email")}
        />
      </Card>
    </div>
  );
}

export const examples: ExampleDoc[] = [
  {
    id: "with-a-total",
    title: "With a total",
    line: "offset and pageSize, as the API takes them: the range, announced as it changes, then First, Previous, Next and Last.",
    code: `const [offset, setOffset] = useState(25);

<Pagination offset={offset} pageSize={25} total={1284} onOffsetChange={setOffset} />`,
    render: () => <Bar label="Pagination, with a total" />,
  },
  {
    id: "without-a-total",
    title: "Without a total",
    line: "For an API that doesn't count: no Last, and Next stays on while a full page comes back.",
    code: `<Pagination offset={offset} pageSize={25} itemsOnPage={rows.length} onOffsetChange={setOffset} />`,
    render: () => (
      <Bar start={50} total={undefined} itemsOnPage={25} label="Pagination, open-ended" />
    ),
  },
  {
    id: "cursor-paging",
    title: "Cursor paging",
    line: "hasPrevious and hasNext, for an API that gives the next cursor: Previous and Next alone.",
    code: `<Pagination
  offset={offset}
  pageSize={25}
  hasPrevious={cursors.length > 0}
  hasNext={Boolean(data?.next)}
  onPrevious={back}
  onNext={() => forward(data.next)}
/>`,
    render: () => <Cursor />,
  },
  {
    id: "show-more",
    title: "Show more",
    line: "ShowMore appends the next page under a growing list, then says there's no more.",
    code: `<ShowMore
  hasMore={Boolean(data?.next)}
  loading={isFetching}
  onMore={() => fetchNext()}
  label="Show older events"
  end="That's everything since 29 September."
/>`,
    render: () => <Older />,
  },
  {
    id: "rows-per-page",
    title: "Rows per page",
    line: "pageSizes offers a select; onPageSizeChange takes the new size, back on the first page.",
    code: `<Pagination
  offset={offset}
  pageSize={pageSize}
  total={1284}
  onOffsetChange={setOffset}
  pageSizes={[25, 50, 100]}
  onPageSizeChange={(size) => {
    setPageSize(size);
    setOffset(0);
  }}
/>`,
    render: () => <RowsPerPage />,
  },
  {
    id: "loading",
    title: "Loading",
    line: "loading turns the buttons off while the next page comes.",
    code: `<Pagination offset={offset} pageSize={25} total={1284} loading onOffsetChange={setOffset} />`,
    render: () => <Bar loading label="Pagination, loading" />,
  },
  {
    id: "under-a-table",
    title: "Under a table",
    line: "In a Card's footer: the rows and the bar move together.",
    code: `<Card
  title="Users"
  footer={<Pagination offset={offset} pageSize={pageSize} total={users.length} onOffsetChange={setOffset} />}
>
  <Table label="Users" rows={users.slice(offset, offset + pageSize)} … />
</Card>`,
    render: () => <UsersCard />,
  },
  {
    id: "in-hindi",
    title: "In Hindi",
    line: "QeetrixProvider's messages and locale: the strings, and the numbers grouped for India.",
    code: `import { hi } from "@qeetrix/react/locales/hi";

<QeetrixProvider locale="hi-IN" messages={hi}>
  <Pagination offset={0} pageSize={25} total={128400} onOffsetChange={setOffset} />
</QeetrixProvider>`,
    render: () => (
      <div lang="hi">
        <QeetrixProvider locale="hi-IN" messages={hi}>
          <Bar start={0} total={128400} />
        </QeetrixProvider>
      </div>
    ),
  },
];
