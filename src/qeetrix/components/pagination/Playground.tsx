// Components › Pagination › Playground: the spec the playground kit draws. An island.
import { Pagination } from "@qeetrix/react/experimental";
import { useState } from "react";
import PlaygroundKit, { type Spec, type Values } from "../PlaygroundKit";

const SIZES = [10, 25, 50];

function Live({ v }: { v: Values }) {
  const size = Number(v.pageSize);
  const [shown, setShown] = useState(size);
  const [pageSize, setPageSize] = useState(size);
  const [offset, setOffset] = useState(size);
  // A new page size from the controls starts again on the first page, as a list would.
  if (shown !== size) {
    setShown(size);
    setPageSize(size);
    setOffset(0);
  }
  return (
    <div className="qc-pages-stage">
      <Pagination
        offset={offset}
        pageSize={pageSize}
        total={v.total ? 1284 : undefined}
        loading={Boolean(v.loading)}
        onOffsetChange={setOffset}
        messages={{ label: "Pagination, playground" }}
        pageSizes={v.pageSizes ? SIZES : undefined}
        onPageSizeChange={(next) => {
          setPageSize(next);
          setOffset(0);
        }}
      />
    </div>
  );
}

const spec: Spec = {
  file: "users.tsx",
  imports: [[["Pagination"], "@qeetrix/react/experimental"]],
  component: "Pagination",
  preamble: ["const [offset, setOffset] = useState(0);"],
  fixed: () => [["offset", "{offset}"]],
  controls: [
    {
      prop: "pageSize",
      label: "Page size",
      kind: "choice",
      initial: "25",
      options: [
        ["10", "10"],
        ["25", "25"],
        ["50", "50"],
      ],
      code: (value) => ["pageSize", `{${value}}`],
    },
    {
      prop: "total",
      label: "Total known",
      kind: "switch",
      initial: true,
      code: (value) => (value ? ["total", "{1284}"] : null),
    },
    { prop: "loading", label: "Loading", kind: "switch", initial: false },
    {
      prop: "pageSizes",
      label: "Rows per page",
      kind: "switch",
      initial: false,
      code: (value) => (value ? ["pageSizes", "{[10, 25, 50]}"] : null),
    },
  ],
  after: (v) => [
    ["onOffsetChange", "{setOffset}"],
    ...(v.pageSizes ? ([["onPageSizeChange", "{setPageSize}"]] as Array<[string, string]>) : []),
  ],
  render: (v) => <Live v={v} />,
};

export default function Playground() {
  return <PlaygroundKit spec={spec} />;
}
