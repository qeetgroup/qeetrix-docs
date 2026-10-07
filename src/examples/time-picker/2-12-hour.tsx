import { Field, FieldLabel, TimePicker } from "@qeetrix/ui";

/** `hourCycle={12}` adds an AM/PM column; `withSeconds` adds seconds. The value stays 24-hour. */
export default function TimePicker12Hour() {
  return (
    <Field>
      <FieldLabel>Maintenance window starts</FieldLabel>
      <TimePicker defaultValue="23:30:00" hourCycle={12} withSeconds />
    </Field>
  );
}
