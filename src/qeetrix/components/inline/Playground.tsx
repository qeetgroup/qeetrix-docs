// Components › Inline › Playground: the spec the playground kit draws. An island.
import { Inline } from "@qeetrix/react";
import { Cell } from "../layout";
import { element } from "../PlaygroundCode";
import PlaygroundKit, { type Spec } from "../PlaygroundKit";

const ITEMS = ["Engineering", "Finance", "People", "Sales", "Support"];

const spec: Spec = {
  file: "groups.tsx",
  imports: [[["Badge", "Inline"], "@qeetrix/react"]],
  component: "Inline",
  controls: [
    {
      prop: "gap",
      label: "Gap",
      kind: "choice",
      initial: "sm",
      omit: "sm",
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
    {
      prop: "justify",
      label: "Justify",
      kind: "choice",
      initial: "start",
      omit: "start",
      options: [
        ["start", "start"],
        ["center", "center"],
        ["end", "end"],
        ["between", "between"],
      ],
    },
    {
      prop: "wrap",
      label: "Wrap",
      kind: "switch",
      initial: true,
      code: (value) => (value ? null : ["wrap", "{false}"]),
    },
  ],
  inner: () => ITEMS.flatMap((item) => element("Badge", [], item)),
  render: (v) => (
    <div className="qc-cells">
      <Inline gap={v.gap as "sm"} justify={v.justify as "start"} wrap={Boolean(v.wrap)}>
        {ITEMS.map((item) => (
          <Cell key={item}>{item}</Cell>
        ))}
      </Inline>
    </div>
  ),
};

export default function Playground() {
  return <PlaygroundKit spec={spec} />;
}
