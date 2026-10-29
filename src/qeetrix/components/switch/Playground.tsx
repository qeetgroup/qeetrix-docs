// Components › Switch › Playground: the spec the playground kit draws. An island.
import { Switch } from "@qeetrix/react";
import PlaygroundKit, { type Spec } from "../PlaygroundKit";

const spec: Spec = {
  file: "summary.tsx",
  imports: [[["Switch"], "@qeetrix/react"]],
  component: "Switch",
  controls: [
    { prop: "label", label: "Label", kind: "text", initial: "Email me a weekly summary" },
    { prop: "description", label: "Description", kind: "text", initial: "Every Monday at 9 am." },
    { prop: "defaultChecked", label: "On", kind: "switch", initial: true },
    { prop: "disabled", label: "Disabled", kind: "switch", initial: false },
  ],
  render: (v) => (
    <Switch
      key={`${v.defaultChecked}`}
      label={String(v.label) || "Label"}
      description={String(v.description) || undefined}
      defaultChecked={Boolean(v.defaultChecked)}
      disabled={Boolean(v.disabled)}
    />
  ),
};

export default function Playground() {
  return <PlaygroundKit spec={spec} />;
}
