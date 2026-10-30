// Components › Combobox › Playground: the spec the playground kit draws. An island.
import { Field } from "@qeetrix/react";
import { Combobox } from "@qeetrix/react/experimental";
import PlaygroundKit, { type Spec } from "../PlaygroundKit";
import { PEOPLE } from "./examples";

const spec: Spec = {
  file: "owner.tsx",
  imports: [
    [["Field"], "@qeetrix/react"],
    [["Combobox"], "@qeetrix/react/experimental"],
  ],
  component: "Combobox",
  field: true,
  fixed: () => [["items", "{people}"]],
  wrap: (v) => ({ component: "Field", props: [["label", `"${v.label || "Label"}"`]] }),
  controls: [
    { prop: "label", label: "Field label", kind: "text", initial: "Owner", code: () => null },
    { prop: "placeholder", label: "Placeholder", kind: "text", initial: "e.g. Priya Sharma" },
    { prop: "multiple", label: "Several", kind: "switch", initial: false },
    { prop: "disabled", label: "Disabled", kind: "switch", initial: false },
  ],
  render: (v) => (
    <Field label={String(v.label) || "Label"} key={String(v.multiple)}>
      <Combobox
        items={PEOPLE}
        placeholder={String(v.placeholder) || undefined}
        multiple={Boolean(v.multiple)}
        disabled={Boolean(v.disabled)}
      />
    </Field>
  ),
};

export default function Playground() {
  return <PlaygroundKit spec={spec} />;
}
