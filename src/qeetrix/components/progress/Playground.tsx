// Components › Progress › Playground: the spec the playground kit draws. An island.
import { Progress } from "@qeetrix/react";
import PlaygroundKit, { type Spec } from "../PlaygroundKit";

const spec: Spec = {
  file: "upload.tsx",
  imports: [[["Progress"], "@qeetrix/react"]],
  component: "Progress",
  controls: [
    { prop: "label", label: "Label", kind: "text", initial: "Uploading invoices.csv" },
    {
      prop: "value",
      label: "Value",
      kind: "choice",
      initial: "40",
      options: [
        ["null", "Unknown"],
        ["0", "0"],
        ["40", "40"],
        ["72", "72"],
        ["100", "100"],
      ],
      code: (value) => ["value", `{${value}}`],
    },
    {
      prop: "tone",
      label: "Tone",
      kind: "choice",
      initial: "brand",
      omit: "brand",
      options: [
        ["brand", "Brand"],
        ["success", "Success"],
        ["danger", "Danger"],
      ],
    },
    { prop: "showValue", label: "Show value", kind: "switch", initial: true },
  ],
  render: (v) => (
    <div className="qc-bar-stage">
      <Progress
        label={String(v.label) || undefined}
        aria-label={v.label ? undefined : "Upload"}
        value={v.value === "null" ? null : Number(v.value)}
        tone={v.tone as "brand"}
        showValue={Boolean(v.showValue)}
      />
    </div>
  ),
};

export default function Playground() {
  return <PlaygroundKit spec={spec} />;
}
