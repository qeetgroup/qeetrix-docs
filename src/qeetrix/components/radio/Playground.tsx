// Components › Radio › Playground: the spec the playground kit draws. An island.
import { Radio, RadioGroup } from "@qeetrix/react";
import { element } from "../PlaygroundCode";
import PlaygroundKit, { type Spec } from "../PlaygroundKit";

const spec: Spec = {
  file: "session-length.tsx",
  imports: [[["Radio", "RadioGroup"], "@qeetrix/react"]],
  component: "RadioGroup",
  inner: () => [
    ...element("Radio", [
      ["value", '"1h"'],
      ["label", '"1 hour"'],
    ]),
    ...element("Radio", [
      ["value", '"8h"'],
      ["label", '"8 hours"'],
    ]),
    ...element("Radio", [
      ["value", '"24h"'],
      ["label", '"24 hours"'],
    ]),
  ],
  controls: [
    { prop: "label", label: "Label", kind: "text", initial: "Session length" },
    { prop: "description", label: "Description", kind: "text", initial: "" },
    {
      prop: "orientation",
      label: "Orientation",
      kind: "choice",
      initial: "vertical",
      omit: "vertical",
      options: [
        ["vertical", "Vertical"],
        ["horizontal", "Horizontal"],
      ],
    },
    { prop: "error", label: "Error", kind: "text", initial: "" },
    { prop: "disabled", label: "Disabled", kind: "switch", initial: false },
  ],
  after: () => [["defaultValue", '"8h"']],
  render: (v) => (
    <RadioGroup
      label={String(v.label) || "Label"}
      description={String(v.description) || undefined}
      orientation={v.orientation as "vertical" | "horizontal"}
      error={String(v.error) || undefined}
      disabled={Boolean(v.disabled)}
      defaultValue="8h"
    >
      <Radio value="1h" label="1 hour" />
      <Radio value="8h" label="8 hours" />
      <Radio value="24h" label="24 hours" />
    </RadioGroup>
  ),
};

export default function Playground() {
  return <PlaygroundKit spec={spec} />;
}
