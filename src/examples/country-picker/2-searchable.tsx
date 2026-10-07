import { CountryPicker, Field, FieldLabel } from "@qeetrix/ui";

/** `searchable` swaps the native list for type-to-filter. Search matches the local name, the English name and the code, ignoring accents. */
export default function CountryPickerSearchable() {
  return (
    <Field className="w-72">
      <FieldLabel>Billing country</FieldLabel>
      <CountryPicker searchable placeholder="Search countries…" />
    </Field>
  );
}
