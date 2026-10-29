// Components › Date picker › Playground: the spec the playground kit draws. An island.
import { Field } from "@qeetrix/react";
import { DatePicker } from "@qeetrix/react/experimental";
import { DAY_OFF_CODE, isWeekend, TODAY } from "../dates";
import PlaygroundKit, { type Spec } from "../PlaygroundKit";

const spec: Spec = {
  file: "joining-date.tsx",
  imports: [
    [["Field"], "@qeetrix/react"],
    [["DatePicker"], "@qeetrix/react/experimental"],
  ],
  preamble: (v) => (v.weekdays ? DAY_OFF_CODE : []),
  component: "DatePicker",
  field: true,
  wrap: (v) => ({ component: "Field", props: [["label", `"${v.label || "Label"}"`]] }),
  controls: [
    {
      prop: "label",
      label: "Field label",
      kind: "text",
      initial: "Joining date",
      code: () => null,
    },
    {
      prop: "locale",
      label: "Locale",
      kind: "choice",
      initial: "en-IN",
      omit: "en-IN",
      options: [
        ["en-IN", "en-IN"],
        ["en-US", "en-US"],
        ["en-GB", "en-GB"],
      ],
    },
    {
      prop: "fromToday",
      label: "From today",
      kind: "switch",
      initial: false,
      code: (value) => (value ? ["min", "{today}"] : null),
    },
    {
      prop: "weekdays",
      label: "Weekdays only",
      kind: "switch",
      initial: false,
      code: (value) => (value ? ["isDateDisabled", "{isWeekend}"] : null),
    },
    { prop: "disabled", label: "Disabled", kind: "switch", initial: false },
    { prop: "readOnly", label: "Read-only", kind: "switch", initial: false },
  ],
  render: (v) => (
    <Field label={String(v.label) || "Label"} key={String(v.locale)}>
      <DatePicker
        defaultValue="2026-11-02"
        locale={String(v.locale)}
        min={v.fromToday ? TODAY : undefined}
        isDateDisabled={v.weekdays ? isWeekend : undefined}
        disabled={Boolean(v.disabled)}
        readOnly={Boolean(v.readOnly)}
        today={TODAY}
      />
    </Field>
  ),
  fixed: () => [["defaultValue", '"2026-11-02"']],
};

export default function Playground() {
  return <PlaygroundKit spec={spec} />;
}
