import {
  DateTimePicker,
  Field,
  FieldDescription,
  FieldLabel,
} from "@qeetrix/ui";

/** A date and a time of day in one field: the calendar, with a time picker beneath it. */
export default function DateTimePickerDefault() {
  return (
    <Field className="w-80">
      <FieldLabel>Send announcement at</FieldLabel>
      <DateTimePicker
        placeholder="Pick a date and time"
        minuteStep={15}
        hourCycle={12}
      />
      <FieldDescription>In your time zone.</FieldDescription>
    </Field>
  );
}
