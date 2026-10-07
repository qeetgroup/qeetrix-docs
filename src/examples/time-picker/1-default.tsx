import { Field, FieldDescription, FieldLabel, TimePicker } from "@qeetrix/ui";

/** A time of day from hour and minute columns, as `"HH:mm"`. `minuteStep` sets the minute choices. */
export default function TimePickerDefault() {
  return (
    <Field>
      <FieldLabel>Send the daily digest at</FieldLabel>
      <TimePicker defaultValue="09:30" minuteStep={15} />
      <FieldDescription>
        Every weekday, in each member's time zone.
      </FieldDescription>
    </Field>
  );
}
