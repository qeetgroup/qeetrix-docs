// Components › Select › Playground: the spec the playground kit draws. An island.
import { Field, Select } from "@qeetrix/react";
import PlaygroundKit, { type Spec } from "../PlaygroundKit";
import { CYCLES } from "./examples";

const spec: Spec = {
  file: "billing-cycle.tsx",
  imports: [[["Field", "Select"], "@qeetrix/react"]],
  preamble: [
    "const cycles = [",
    '  { value: "monthly", label: "Monthly" },',
    '  { value: "quarterly", label: "Quarterly" },',
    '  { value: "yearly", label: "Yearly" },',
    "];",
  ],
  component: "Select",
  field: true,
  fixed: () => [["items", "{cycles}"]],
  wrap: (v) => ({
    component: "Field",
    props: [
      ["label", `"${v.label || "Label"}"`],
      ...(v.error ? ([["error", `"${v.error}"`]] as Array<[string, string]>) : []),
    ],
  }),
  controls: [
    {
      prop: "label",
      label: "Field label",
      kind: "text",
      initial: "Billing cycle",
      code: () => null,
    },
    { prop: "placeholder", label: "Placeholder", kind: "text", initial: "e.g. Monthly" },
    { prop: "error", label: "Error", kind: "text", initial: "", code: () => null },
    { prop: "multiple", label: "Several", kind: "switch", initial: false },
    { prop: "disabled", label: "Disabled", kind: "switch", initial: false },
  ],
  render: (v) => (
    <Field
      label={String(v.label) || "Label"}
      error={String(v.error) || undefined}
      key={String(v.multiple)}
    >
      <Select
        items={CYCLES}
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
