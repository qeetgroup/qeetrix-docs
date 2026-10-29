// Components › Checkbox › Playground: the spec the playground kit draws. An island.
import { Checkbox } from "@qeetrix/react";
import PlaygroundKit, { type Spec } from "../PlaygroundKit";

const spec: Spec = {
  file: "summary.tsx",
  imports: [[["Checkbox"], "@qeetrix/react"]],
  component: "Checkbox",
  controls: [
    { prop: "label", label: "Label", kind: "text", initial: "Email me a weekly summary" },
    { prop: "description", label: "Description", kind: "text", initial: "Every Monday at 9 am." },
    { prop: "defaultChecked", label: "Checked", kind: "switch", initial: true },
    { prop: "indeterminate", label: "Mixed", kind: "switch", initial: false },
    { prop: "disabled", label: "Disabled", kind: "switch", initial: false },
  ],
  render: (v) => (
    <Checkbox
      key={`${v.defaultChecked}`}
      label={String(v.label) || "Label"}
      description={String(v.description) || undefined}
      defaultChecked={Boolean(v.defaultChecked)}
      indeterminate={Boolean(v.indeterminate)}
      disabled={Boolean(v.disabled)}
    />
  ),
};

export default function Playground() {
  return <PlaygroundKit spec={spec} />;
}
