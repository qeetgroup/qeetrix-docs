// Components › Grid › Playground: the spec the playground kit draws. An island.
import { Grid } from "@qeetrix/react";
import { Cell } from "../layout";
import PlaygroundKit, { type Spec } from "../PlaygroundKit";

const spec: Spec = {
  file: "cards.tsx",
  imports: [[["Grid"], "@qeetrix/react"]],
  component: "Grid",
  children: () => "…",
  controls: [
    {
      prop: "columns",
      label: "Columns",
      kind: "choice",
      initial: "3",
      options: [
        ["1", "1"],
        ["2", "2"],
        ["3", "3"],
        ["4", "4"],
        ["6", "6"],
      ],
      code: (value) => ["columns", `{${value}}`],
    },
    {
      prop: "gap",
      label: "Gap",
      kind: "choice",
      initial: "md",
      omit: "md",
      options: [
        ["none", "none"],
        ["xs", "xs"],
        ["sm", "sm"],
        ["md", "md"],
        ["lg", "lg"],
        ["xl", "xl"],
        ["2xl", "2xl"],
      ],
    },
  ],
  render: (v) => (
    <div className="qc-grid-stage">
      <Grid columns={Number(v.columns) as 3} gap={v.gap as "md"}>
        {["1", "2", "3", "4", "5", "6"].map((label) => (
          <Cell key={label}>{label}</Cell>
        ))}
      </Grid>
    </div>
  ),
};

export default function Playground() {
  return <PlaygroundKit spec={spec} />;
}
