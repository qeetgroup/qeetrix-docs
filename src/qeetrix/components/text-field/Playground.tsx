// Components › Text field › Playground: the spec the playground kit draws. An island.
import { TextField } from "@qeetrix/react";
import PlaygroundKit, { type Spec } from "../PlaygroundKit";

const spec: Spec = {
  file: "work-email.tsx",
  imports: [[["TextField"], "@qeetrix/react"]],
  component: "TextField",
  field: true,
  controls: [
    { prop: "label", label: "Label", kind: "text", initial: "Work email" },
    { prop: "placeholder", label: "Placeholder", kind: "text", initial: "e.g. priya@acme.in" },
    {
      prop: "description",
      label: "Description",
      kind: "text",
      initial: "We send the invite here.",
    },
    { prop: "error", label: "Error", kind: "text", initial: "" },
    { prop: "optional", label: "Optional", kind: "switch", initial: false },
    { prop: "disabled", label: "Disabled", kind: "switch", initial: false },
    { prop: "readOnly", label: "Read-only", kind: "switch", initial: false },
  ],
  render: (v) => (
    <TextField
      label={String(v.label) || "Label"}
      placeholder={String(v.placeholder) || undefined}
      description={String(v.description) || undefined}
      error={String(v.error) || undefined}
      optional={Boolean(v.optional)}
      disabled={Boolean(v.disabled)}
      readOnly={Boolean(v.readOnly)}
    />
  ),
};

export default function Playground() {
  return <PlaygroundKit spec={spec} />;
}
