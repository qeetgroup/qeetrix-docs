// Components › Pagination: its documentation, from @qeetrix/react 0.2.0 (experimental/pagination),
// the Storybook stories (navigation/pagination.stories.tsx) and the changelog. Its examples page
// live (Live.tsx); the figures are the real Pagination, server-rendered.
import { Stack, Table } from "@qeetrix/react";
import { Pagination } from "@qeetrix/react/experimental";
import { NAV_TESTED } from "../navigation";
import type { ComponentDoc } from "../types";
import { COLUMNS, examples, USERS } from "./examples";

const noop = () => {};

/** Three users and their bar, the bar first or last. */
const List = ({ barFirst = false }) => {
  const bar = (
    <Still label={`Pagination, ${barFirst ? "above" : "under"} the list`} offset={0} total={137} />
  );
  const table = (
    <Table
      label="Users"
      rows={USERS.slice(0, 3)}
      rowId={(user) => user.id}
      rowLabel={(user) => user.name}
      columns={COLUMNS.slice(0, 2)}
    />
  );
  return (
    <Stack gap="sm">
      {barFirst ? bar : table}
      {barFirst ? table : bar}
    </Stack>
  );
};

const Still = ({
  label,
  ...props
}: {
  label: string;
  offset: number;
  total?: number;
  pageSizes?: number[];
}) => (
  <div className="qc-pages-stage">
    <Pagination pageSize={25} onOffsetChange={noop} messages={{ label }} {...props} />
  </div>
);

export const pagination: ComponentDoc = {
  name: "Pagination",
  slug: "pagination",
  category: "navigation",
  status: "experimental",
  since: "0.0.6",
  lede: "Pages of a long list, for offset and limit APIs: the range on show, then First, Previous, Next and Last.",
  exports: ["Pagination", "ShowMore"],
  renders: '<nav aria-label="Pagination">',
  source: "experimental/pagination",
  story: "components/navigation/pagination.stories.tsx",
  examples,

  usage: {
    useFor: [
      "A server-paged list: users, sessions, audit events.",
      "Under a Table, in its Card's footer.",
    ],
    notFor: [
      { text: "A few dozen rows: show them all", use: "Table" },
      { text: "Steps of a flow", use: "Steps" },
    ],
    anatomyFigure: <Still label="Pagination" offset={25} total={1284} pageSizes={[25, 50, 100]} />,
    anatomy: [
      {
        slot: "pagination-size",
        element: "<span>",
        note: "Rows per page, with pageSizes: a Select.",
      },
      {
        slot: "pagination-range",
        element: '<span role="status">',
        note: "The range on show, announced politely as it changes.",
      },
      {
        slot: "previous",
        select: '[aria-label="Previous page"]',
        element: "<button>",
        note: "First and Previous: off on the first page.",
      },
      {
        slot: "next",
        select: '[aria-label="Next page"]',
        element: "<button>",
        note: "Next and Last: Last only with a total.",
      },
    ],
    rules: [
      {
        title: "Under the list",
        doLine: "At the list's end, where the rows run out.",
        dontLine: "Above it: paging before reading.",
        doIt: <List />,
        dontIt: <List barFirst />,
      },
      {
        title: "Back to the first page",
        doLine: "A new page size, or a new filter: the first page of the new list.",
        dontLine: "The old offset kept: a page past the end, empty.",
        doIt: <Still label="Pagination, first page" offset={0} total={42} />,
        dontIt: <Still label="Pagination, past the end" offset={100} total={42} />,
      },
    ],
    content: [
      'The range reads "26–50 of 1,284", grouped for the locale.',
      "Its strings come from QeetrixProvider, in English and Hindi.",
      "Each bar on a page is a landmark: name each apart, with messages.label.",
    ],
  },

  api: {
    props: [
      {
        name: "offset",
        type: "number",
        default: "required",
        note: "The zero-based offset of this page's first row: the API's offset.",
      },
      {
        name: "pageSize",
        type: "number",
        default: "required",
        note: "Rows per page: the API's limit.",
      },
      {
        name: "onOffsetChange",
        type: "(offset) => void",
        default: "required",
        note: "Called with the new offset.",
      },
      {
        name: "hasPrevious · hasNext · onPrevious · onNext",
        type: "boolean · () => void",
        default: "—",
        note: "Cursor paging instead of offset: Previous and Next alone; offset, if known, shows the range.",
      },
      {
        name: "ShowMore: hasMore · onMore · loading · label · end",
        type: "…",
        default: "—",
        note: "Show more under a growing list; end once there's nothing more, announced.",
      },
      {
        name: "total",
        type: "number",
        default: "—",
        note: "The total, when the API returns one. Without it there's no Last, and Next stays on while a full page comes back.",
      },
      {
        name: "itemsOnPage",
        type: "number",
        default: "a full page",
        note: "Rows this page returned, or what's left of total.",
      },
      { name: "loading", type: "boolean", default: "false", note: "Turns the buttons off." },
      {
        name: "pageSizes · onPageSizeChange",
        type: "number[] · (size) => void",
        default: "—",
        note: 'Offers a "Rows per page" select. Go back to the first page with a new size.',
      },
      {
        name: "locale · messages",
        type: "string · object",
        default: "the provider's",
        note: "The numbers' locale, and this bar's strings.",
      },
    ],
    parts: [
      { slot: "pagination", element: "<nav>", note: 'The landmark, named "Pagination".' },
      { slot: "pagination-size", element: "<span>", note: "The rows-per-page label and Select." },
      {
        slot: "pagination-range",
        element: '<span role="status">',
        note: "The range, each number in a <bdi>.",
      },
      { slot: "icon-button", element: "<button>", note: "First, Previous, Next, Last." },
      { slot: "show-more", element: "<div>", note: "ShowMore: its button, then its end line." },
    ],
    recipes: [
      {
        title: "From the address",
        line: "Keep offset and limit in the URL, so a page can be shared and Back returns to it.",
        file: "users.tsx",
        code: `const { offset = 0, limit = 25 } = useSearch();
const { data } = useUsers({ offset, limit });

<Pagination
  offset={offset}
  pageSize={limit}
  total={data?.total}
  loading={!data}
  onOffsetChange={(next) => navigate({ search: { offset: next, limit } })}
/>`,
      },
    ],
  },

  accessibility: {
    keyboard: [
      {
        keys: ["Tab"],
        action: "To rows per page, then each button: one that's off stays focusable, so it's read.",
      },
      { keys: ["Enter", "Space"], action: "Goes to that page." },
    ],
    checks: [
      {
        check: "Landmark",
        result: 'A navigation landmark, named "Pagination" or by messages.label.',
      },
      { check: "Announced", result: "The new range, politely, when it changes." },
      {
        check: "Names",
        result: "First page, Previous page, Next page and Last page; each shows as a tooltip.",
      },
      {
        check: "Right to left",
        result: "The chevrons point the reading way; the numbers keep their order.",
      },
    ],
    tested: NAV_TESTED,
  },

  changelog: [
    {
      version: "0.2.0",
      items: [
        "Cursor paging: hasPrevious and hasNext give Previous and Next alone.",
        "ShowMore: a growing list's next page, then its end.",
      ],
    },
    {
      version: "0.1.0",
      items: ["The range reads correctly right to left.", "Takes an aria-label override."],
    },
    {
      version: "0.0.5",
      items: [
        'Pagination: for offset/limit APIs, with or without a total; the range ("1–25 of 1,284", grouped for the locale) announced politely; First, Previous, Next and, with a total, Last; an optional "Rows per page"; buttons off while loading; chevrons mirrored right to left.',
      ],
    },
  ],

  related: [
    { name: "Table", when: "What it pages" },
    { name: "Card", when: "Its footer holds it" },
    { name: "Select", when: "Rows per page" },
  ],
};
