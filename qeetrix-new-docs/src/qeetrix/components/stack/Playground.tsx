// Components › Stack › Playground: the spec the playground kit draws. An island.
import { Stack } from "@qeetrix/react";
import { Cell } from "../layout";
import { element } from "../PlaygroundCode";
import PlaygroundKit, { type Spec } from "../PlaygroundKit";

const ITEMS = ["Passkeys", "Authenticator apps", "SMS codes"];

const spec: Spec = {
  file: "methods.tsx",
  imports: [[["Stack"], "@qeetrix/react"]],
  component: "Stack",
  controls: [
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
    {
      prop: "align",
      label: "Align",
      kind: "choice",
      initial: "stretch",
      omit: "stretch",
      options: [
        ["stretch", "stretch"],
        ["start", "start"],
        ["center", "center"],
        ["end", "end"],
      ],
    },
  ],
  inner: () => ITEMS.flatMap((item) => element("Method", [["name", `"${item}"`]])),
  render: (v) => (
    <div className="qc-cells">
      <Stack gap={v.gap as "md"} align={v.align as "stretch"}>
        {ITEMS.map((item) => (
          <Cell key={item}>{item}</Cell>
        ))}
      </Stack>
    </div>
  ),
};

export default function Playground() {
  return <PlaygroundKit spec={spec} />;
}
