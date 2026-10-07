import { Field, FieldLabel, TimezonePicker } from "@qeetrix/ui";

/** `searchable` filters as you type — by zone id, city, zone name ("India Standard Time") or offset ("+5:30"). */
export default function TimezonePickerSearchable() {
  return (
    <Field className="w-80">
      <FieldLabel>Reporting time zone</FieldLabel>
      <TimezonePicker searchable placeholder="Search time zones…" />
    </Field>
  );
}
