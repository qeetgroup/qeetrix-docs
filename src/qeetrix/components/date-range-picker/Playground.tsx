// Components › Date range picker › Playground: the spec the playground kit draws. An island.
import { Field } from "@qeetrix/react";
import { DateRangePicker } from "@qeetrix/react/experimental";
import { DAY_OFF_CODE, isWeekend, TODAY } from "../dates";
import PlaygroundKit, { type Spec } from "../PlaygroundKit";

const PRESETS = ["today", "last7Days", "last30Days", "thisMonth", "lastMonth"] as const;

const spec: Spec = {
  file: "period.tsx",
  imports: [
    [["Field"], "@qeetrix/react"],
    [["DateRangePicker"], "@qeetrix/react/experimental"],
  ],
  preamble: (v) => (v.weekdays ? DAY_OFF_CODE : []),
  component: "DateRangePicker",
  field: true,
  wrap: (v) => ({ component: "Field", props: [["label", `"${v.label || "Label"}"`]] }),
  controls: [
    { prop: "label", label: "Field label", kind: "text", initial: "Period", code: () => null },
    {
      prop: "presets",
      label: "Presets",
      kind: "switch",
      initial: true,
      code: (value) =>
        value
          ? ["presets", '{["today", "last7Days", "last30Days", "thisMonth", "lastMonth"]}']
          : null,
    },
    {
      prop: "untilToday",
      label: "Until today",
      kind: "switch",
      initial: true,
      code: (value) => (value ? ["max", "{today}"] : null),
    },
    {
      prop: "weekdays",
      label: "Weekdays only",
      kind: "switch",
      initial: false,
      code: (value) => (value ? ["isDateDisabled", "{isWeekend}"] : null),
    },
    { prop: "disabled", label: "Disabled", kind: "switch", initial: false },
  ],
  render: (v) => (
    <Field label={String(v.label) || "Label"}>
      <DateRangePicker
        presets={v.presets ? PRESETS : undefined}
        max={v.untilToday ? TODAY : undefined}
        isDateDisabled={v.weekdays ? isWeekend : undefined}
        disabled={Boolean(v.disabled)}
        today={TODAY}
      />
    </Field>
  ),
};

export default function Playground() {
  return <PlaygroundKit spec={spec} />;
}
