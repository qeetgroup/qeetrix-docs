import { DatePicker, Field, FieldDescription, FieldLabel } from "@qeetrix/ui";

/** A field that opens a calendar. Inside a `Field`, the trigger takes the label and description. */
export default function DatePickerDefault() {
  return (
    <Field className="w-72">
      <FieldLabel>Contract start</FieldLabel>
      <DatePicker placeholder="Pick a date" clearable />
      <FieldDescription>Access begins at 00:00 on this day.</FieldDescription>
    </Field>
  );
}
