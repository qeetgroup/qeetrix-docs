// Components › Slider › Playground: the spec the playground kit draws. An island.
import { Slider } from "@qeetrix/react";
import PlaygroundKit, { type Spec } from "../PlaygroundKit";

const spec: Spec = {
  file: "seats.tsx",
  imports: [[["Slider"], "@qeetrix/react"]],
  component: "Slider",
  field: true,
  controls: [
    { prop: "label", label: "Label", kind: "text", initial: "Seats" },
    { prop: "min", label: "Lowest", kind: "number", initial: "0" },
    { prop: "max", label: "Highest", kind: "number", initial: "500" },
    { prop: "step", label: "Step", kind: "number", initial: "10", omit: "1" },
    {
      prop: "range",
      label: "A range",
      kind: "switch",
      initial: false,
      code: (value) => (value ? ["defaultValue", "{[50, 250]}"] : ["defaultValue", "{120}"]),
    },
    { prop: "showValue", label: "Show the value", kind: "switch", initial: true },
    { prop: "disabled", label: "Disabled", kind: "switch", initial: false },
  ],
  render: (v) => (
    <Slider
      key={String(v.range)}
      label={String(v.label) || "Label"}
      min={Number(v.min) || 0}
      max={Number(v.max) || 100}
      step={Number(v.step) || 1}
      defaultValue={v.range ? [50, 250] : 120}
      showValue={Boolean(v.showValue)}
      disabled={Boolean(v.disabled)}
    />
  ),
};

export default function Playground() {
  return <PlaygroundKit spec={spec} />;
}
