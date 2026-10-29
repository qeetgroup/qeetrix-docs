// Components › Description list › Playground: the spec the playground kit draws. An island.
import { DescriptionItem, DescriptionList } from "@qeetrix/react/experimental";
import { element } from "../PlaygroundCode";
import PlaygroundKit, { type Spec } from "../PlaygroundKit";

const FACTS: Array<[string, string]> = [
  ["Sessions", "3 active"],
  ["MFA", "Passkey"],
  ["Applications", "12"],
  ["Source", "Azure AD"],
];

const spec: Spec = {
  file: "user-summary.tsx",
  imports: [[["DescriptionItem", "DescriptionList"], "@qeetrix/react/experimental"]],
  component: "DescriptionList",
  controls: [
    {
      prop: "layout",
      label: "Layout",
      kind: "choice",
      initial: "rows",
      omit: "rows",
      options: [
        ["rows", "Rows"],
        ["columns", "Columns"],
      ],
    },
    {
      prop: "columns",
      label: "Columns",
      kind: "choice",
      initial: "2",
      omit: "2",
      options: [
        ["1", "1"],
        ["2", "2"],
        ["3", "3"],
        ["4", "4"],
      ],
      code: (value) => (value === "2" ? null : ["columns", `{${value}}`]),
      when: (v) => v.layout === "columns",
    },
    { prop: "empty", label: "A value not set", kind: "switch", initial: false, code: () => null },
  ],
  inner: (v) => [
    ...FACTS.flatMap(([term, value]) => element("DescriptionItem", [["term", `"${term}"`]], value)),
    ...(v.empty ? element("DescriptionItem", [["term", '"Manager"']]) : []),
  ],
  render: (v) => (
    <div className="qc-crumb-header">
      <DescriptionList layout={v.layout as "rows"} columns={Number(v.columns) as 2}>
        {FACTS.map(([term, value]) => (
          <DescriptionItem key={term} term={term}>
            {value}
          </DescriptionItem>
        ))}
        {v.empty && <DescriptionItem term="Manager" />}
      </DescriptionList>
    </div>
  ),
};

export default function Playground() {
  return <PlaygroundKit spec={spec} />;
}
