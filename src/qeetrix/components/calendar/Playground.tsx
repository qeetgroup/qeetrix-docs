// Components › Calendar › Playground: the spec the playground kit draws. An island.
import { Calendar } from "@qeetrix/react/experimental";
import { DAY_OFF_CODE, isWeekend, TODAY } from "../dates";
import PlaygroundKit, { type Spec } from "../PlaygroundKit";

const spec: Spec = {
  file: "review.tsx",
  imports: [[["Calendar"], "@qeetrix/react/experimental"]],
  preamble: (v) => (v.weekdays ? DAY_OFF_CODE : []),
  component: "Calendar",
  fixed: () => [["defaultValue", '"2026-10-14"']],
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
    <Calendar
      key={String(v.locale)}
      defaultValue="2026-10-14"
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
