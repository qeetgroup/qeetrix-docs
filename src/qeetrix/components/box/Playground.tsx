// Components › Box › Playground: the spec the playground kit draws. An island.
import { Box, Text } from "@qeetrix/react";
import PlaygroundKit, { type Spec } from "../PlaygroundKit";
import { BACKGROUNDS } from "./examples";

const spec: Spec = {
  file: "panel.tsx",
  imports: [[["Box", "Text"], "@qeetrix/react"]],
  component: "Box",
  children: () => "<Text>Payroll portal</Text>",
  controls: [
    {
      prop: "padding",
      label: "Padding",
      kind: "choice",
      initial: "lg",
      options: [
        ["none", "none"],
        ["xs", "xs"],
        ["sm", "sm"],
        ["md", "md"],
        ["lg", "lg"],
        ["xl", "xl"],
      ],
    },
    {
      prop: "background",
      label: "Background",
      kind: "choice",
      initial: "raised",
      options: BACKGROUNDS.map((value): [string, string] => [value, value]),
    },
    {
      prop: "border",
      label: "Border",
      kind: "choice",
      initial: "default",
      options: [
        ["none", "none"],
        ["subtle", "subtle"],
        ["default", "default"],
        ["strong", "strong"],
      ],
    },
    {
      prop: "radius",
      label: "Corners",
      kind: "choice",
      initial: "surface",
      options: [
        ["none", "none"],
        ["control", "control"],
        ["surface", "surface"],
        ["full", "full"],
      ],
    },
  ],
  render: (v) => (
    <Box
      padding={v.padding as "lg"}
      background={v.background as "raised"}
      border={v.border as "default"}
      radius={v.radius as "surface"}
    >
      <Text>Payroll portal</Text>
    </Box>
  ),
};

export default function Playground() {
  return <PlaygroundKit spec={spec} />;
}
