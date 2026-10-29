// Components › Number field › Playground: the spec the playground kit draws. An island.
import { Field } from "@qeetrix/react";
import { NumberField } from "@qeetrix/react/experimental";
import PlaygroundKit, { type Spec } from "../PlaygroundKit";

const spec: Spec = {
  file: "seats.tsx",
  imports: [
    [["Field"], "@qeetrix/react"],
    [["NumberField"], "@qeetrix/react/experimental"],
  ],
  component: "NumberField",
  field: true,
  wrap: (v) => ({ component: "Field", props: [["label", `"${v.label || "Label"}"`]] }),
  controls: [
    { prop: "label", label: "Field label", kind: "text", initial: "Seats", code: () => null },
    { prop: "min", label: "Lowest", kind: "number", initial: "1" },
    { prop: "max", label: "Highest", kind: "number", initial: "500" },
    { prop: "step", label: "Step", kind: "number", initial: "1", omit: "1" },
    { prop: "endAdornment", label: "Unit after", kind: "text", initial: "" },
    {
      prop: "steppers",
      label: "Steppers",
      kind: "switch",
      initial: true,
      code: (value) => (value ? null : ["steppers", "{false}"]),
    },
    { prop: "disabled", label: "Disabled", kind: "switch", initial: false },
  ],
  fixed: () => [["defaultValue", "{25}"]],
  render: (v) => (
    <Field label={String(v.label) || "Label"}>
      <NumberField
        min={Number(v.min) || undefined}
        max={Number(v.max) || undefined}
        step={Number(v.step) || 1}
        endAdornment={String(v.endAdornment) || undefined}
        steppers={Boolean(v.steppers)}
        disabled={Boolean(v.disabled)}
        defaultValue={25}
      />
    </Field>
  ),
};

export default function Playground() {
  return <PlaygroundKit spec={spec} />;
}
