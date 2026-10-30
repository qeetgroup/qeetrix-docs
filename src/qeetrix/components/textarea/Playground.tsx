// Components › Textarea › Playground: the spec the playground kit draws. An island.
import { Field, Textarea } from "@qeetrix/react";
import PlaygroundKit, { type Spec } from "../PlaygroundKit";

const spec: Spec = {
  file: "note.tsx",
  imports: [[["Field", "Textarea"], "@qeetrix/react"]],
  component: "Textarea",
  field: true,
  wrap: (v) => ({ component: "Field", props: [["label", `"${v.label || "Label"}"`]] }),
  controls: [
    { prop: "label", label: "Field label", kind: "text", initial: "Note", code: () => null },
    {
      prop: "placeholder",
      label: "Placeholder",
      kind: "text",
      initial: "e.g. Renewal due in November",
    },
    { prop: "rows", label: "Rows to start", kind: "number", initial: "3", omit: "3" },
    { prop: "maxRows", label: "Most rows", kind: "number", initial: "6" },
    { prop: "disabled", label: "Disabled", kind: "switch", initial: false },
  ],
  render: (v) => (
    <Field label={String(v.label) || "Label"}>
      <Textarea
        placeholder={String(v.placeholder) || undefined}
        rows={Number(v.rows) || 3}
        maxRows={Number(v.maxRows) || undefined}
        disabled={Boolean(v.disabled)}
      />
    </Field>
  ),
};

export default function Playground() {
  return <PlaygroundKit spec={spec} />;
}
