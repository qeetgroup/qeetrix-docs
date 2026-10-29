// Components › Input › Playground: the spec the playground kit draws. An island.
import { MailIcon } from "@qeetrix/icons/icons/mail";
import { SearchIcon } from "@qeetrix/icons/icons/search";
import { Field, Input } from "@qeetrix/react";
import PlaygroundKit, { type Spec } from "../PlaygroundKit";

const ICONS = { none: undefined, search: SearchIcon, mail: MailIcon };
const NAMES = { none: "", search: "SearchIcon", mail: "MailIcon" };

const spec: Spec = {
  file: "amount.tsx",
  imports: [[["Field", "Input"], "@qeetrix/react"]],
  component: "Input",
  field: true,
  wrap: (v) => ({ component: "Field", props: [["label", `"${v.label || "Label"}"`]] }),
  controls: [
    { prop: "label", label: "Field label", kind: "text", initial: "Amount", code: () => null },
    { prop: "placeholder", label: "Placeholder", kind: "text", initial: "e.g. 50,000" },
    {
      prop: "icon",
      label: "Icon",
      kind: "choice",
      initial: "none",
      options: [
        ["none", "None"],
        ["search", "Search"],
        ["mail", "Mail"],
      ],
      code: (value) =>
        value === "none" ? null : ["icon", `{${NAMES[value as keyof typeof NAMES]}}`],
    },
    { prop: "startAdornment", label: "Before the value", kind: "text", initial: "₹" },
    { prop: "endAdornment", label: "After the value", kind: "text", initial: "" },
    { prop: "disabled", label: "Disabled", kind: "switch", initial: false },
    { prop: "readOnly", label: "Read-only", kind: "switch", initial: false },
  ],
  render: (v) => (
    <Field label={String(v.label) || "Label"}>
      <Input
        placeholder={String(v.placeholder) || undefined}
        icon={ICONS[v.icon as keyof typeof ICONS]}
        startAdornment={String(v.startAdornment) || undefined}
        endAdornment={String(v.endAdornment) || undefined}
        disabled={Boolean(v.disabled)}
        readOnly={Boolean(v.readOnly)}
      />
    </Field>
  ),
};

export default function Playground() {
  return <PlaygroundKit spec={spec} />;
}
