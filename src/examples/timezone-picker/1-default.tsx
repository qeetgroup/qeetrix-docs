import { Field, FieldLabel, TimezonePicker } from "@qeetrix/ui";

/** Every IANA time zone with its UTC offset, as the native list by default. */
export default function TimezonePickerDefault() {
  return (
    <Field className="w-80">
      <FieldLabel>Time zone</FieldLabel>
      <TimezonePicker defaultValue="Asia/Kolkata" />
    </Field>
  );
}
