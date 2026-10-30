// Components › Popover › Playground: the spec the playground kit draws. An island.
import { Button, Popover, PopoverContent, PopoverTrigger, Text } from "@qeetrix/react";
import { element, indent, opening } from "../PlaygroundCode";
import PlaygroundKit, { type Spec } from "../PlaygroundKit";

const spec: Spec = {
  file: "filters.tsx",
  imports: [[["Button", "Popover", "PopoverContent", "PopoverTrigger"], "@qeetrix/react"]],
  component: "Popover",
  controls: [
    { prop: "title", label: "Title", kind: "text", initial: "Filter members", code: () => null },
    {
      prop: "side",
      label: "Side",
      kind: "choice",
      initial: "bottom",
      options: [
        ["top", "Top"],
        ["bottom", "Bottom"],
        ["left", "Left"],
        ["right", "Right"],
      ],
      code: () => null,
    },
    {
      prop: "align",
      label: "Align",
      kind: "choice",
      initial: "center",
      options: [
        ["start", "Start"],
        ["center", "Centre"],
        ["end", "End"],
      ],
      code: () => null,
    },
  ],
  inner: (v) => {
    const content: Array<[string, string?]> = v.title
      ? [["title", `"${v.title}"`]]
      : [["aria-label", '"Filters"']];
    if (v.side !== "bottom") content.push(["side", `"${v.side}"`]);
    if (v.align !== "center") content.push(["align", `"${v.align}"`]);
    return [
      ...element("PopoverTrigger", [["render", '{<Button variant="soft">Filter</Button>}']]),
      ...opening("PopoverContent", content),
      ...indent([[["…"]]]),
      [["</"], ["PopoverContent"], [">"]],
    ];
  },
  render: (v) => (
    <Popover>
      <PopoverTrigger render={<Button variant="soft">Filter</Button>} />
      <PopoverContent
        title={String(v.title) || undefined}
        aria-label={v.title ? undefined : "Filters"}
        side={v.side as "bottom"}
        align={v.align as "center"}
      >
        <Text size="sm">Status, role and team.</Text>
      </PopoverContent>
    </Popover>
  ),
};

export default function Playground() {
  return <PlaygroundKit spec={spec} />;
}
