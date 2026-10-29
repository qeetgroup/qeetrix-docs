// Components › Badge › Playground: the spec the playground kit draws. An island.
import { CircleCheckIcon } from "@qeetrix/icons/icons/circle-check";
import { Badge } from "@qeetrix/react";
import PlaygroundKit, { type Spec } from "../PlaygroundKit";
import { TONES } from "./examples";

const spec: Spec = {
  file: "status.tsx",
  imports: (v) => [
    ...(v.icon ? ([[["CircleCheckIcon"], "@qeetrix/icons"]] as Array<[string[], string]>) : []),
    [["Badge"], "@qeetrix/react"],
  ],
  component: "Badge",
  children: (v) => String(v.text) || "Active",
  controls: [
    { prop: "text", label: "Text", kind: "text", initial: "Active", code: () => null },
    {
      prop: "tone",
      label: "Tone",
      kind: "choice",
      initial: "success",
      omit: "neutral",
      options: TONES.map(([tone]) => [tone, tone[0]?.toUpperCase() + tone.slice(1)]),
    },
    {
      prop: "variant",
      label: "Variant",
      kind: "choice",
      initial: "subtle",
      omit: "subtle",
      options: [
        ["subtle", "Subtle"],
        ["solid", "Solid"],
      ],
    },
    {
      prop: "size",
      label: "Size",
      kind: "choice",
      initial: "md",
      omit: "md",
      options: [
        ["md", "md"],
        ["sm", "sm"],
      ],
    },
    {
      prop: "icon",
      label: "Icon",
      kind: "switch",
      initial: false,
      code: (value) => (value ? ["icon", "{CircleCheckIcon}"] : null),
    },
  ],
  render: (v) => (
    <Badge
      tone={v.tone as "success"}
      variant={v.variant as "subtle"}
      size={v.size as "md"}
      icon={v.icon ? CircleCheckIcon : undefined}
    >
      {String(v.text) || "Active"}
    </Badge>
  ),
};

export default function Playground() {
  return <PlaygroundKit spec={spec} />;
}
