// Components › Meter › Playground: the spec the playground kit draws. An island.
import { Meter } from "@qeetrix/react";
import PlaygroundKit, { type Spec } from "../PlaygroundKit";

const spec: Spec = {
  file: "plan-usage.tsx",
  imports: [[["Meter"], "@qeetrix/react"]],
  component: "Meter",
  controls: [
    { prop: "label", label: "Label", kind: "text", initial: "Storage used" },
    { prop: "value", label: "Value", kind: "number", initial: "68" },
    {
      prop: "tone",
      label: "Tone",
      kind: "choice",
      initial: "brand",
      omit: "brand",
      options: [
        ["brand", "Brand"],
        ["neutral", "Neutral"],
        ["info", "Info"],
        ["success", "Success"],
        ["warning", "Warning"],
        ["danger", "Danger"],
      ],
    },
    { prop: "showValue", label: "Show value", kind: "switch", initial: true },
  ],
  render: (v) => (
    <div className="qc-bar-stage">
      <Meter
        label={String(v.label) || undefined}
        aria-label={v.label ? undefined : "Storage used"}
        value={Math.min(100, Math.max(0, Number(v.value) || 0))}
        tone={v.tone as "brand"}
        showValue={Boolean(v.showValue)}
      />
    </div>
  ),
};

export default function Playground() {
  return <PlaygroundKit spec={spec} />;
}
