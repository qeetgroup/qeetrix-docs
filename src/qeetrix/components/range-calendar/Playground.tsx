// Components › Range calendar › Playground: the spec the playground kit draws. An island.
import { RangeCalendar } from "@qeetrix/react/experimental";
import { DAY_OFF_CODE, isWeekend, TODAY } from "../dates";
import PlaygroundKit, { type Spec } from "../PlaygroundKit";

const spec: Spec = {
  file: "leave.tsx",
  imports: [[["RangeCalendar"], "@qeetrix/react/experimental"]],
  preamble: (v) => (v.weekdays ? DAY_OFF_CODE : []),
  component: "RangeCalendar",
  fixed: () => [["defaultValue", '{{ start: "2026-11-02", end: "2026-11-06" }}']],
  controls: [
    {
      prop: "locale",
      label: "Locale",
      kind: "choice",
      initial: "en-IN",
      omit: "en-IN",
      options: [
        ["en-IN", "en-IN"],
        ["en-GB", "en-GB"],
        ["en-US", "en-US"],
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
    <RangeCalendar
      key={String(v.locale)}
      defaultValue={{ start: "2026-11-02", end: "2026-11-06" }}
      locale={String(v.locale)}
      min={v.fromToday ? TODAY : undefined}
      isDateDisabled={v.weekdays ? isWeekend : undefined}
      disabled={Boolean(v.disabled)}
      readOnly={Boolean(v.readOnly)}
      today={TODAY}
    />
  ),
};

export default function Playground() {
  return <PlaygroundKit spec={spec} />;
}
