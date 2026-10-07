import { CountryPicker, Field, FieldLabel } from "@qeetrix/ui";

/** Every country by its ISO code, named in the reader's language. By default it is the native list — best on mobile and for autofill. `priority` puts the likeliest first. */
export default function CountryPickerDefault() {
  return (
    <Field className="w-72">
      <FieldLabel>Country of registration</FieldLabel>
      <CountryPicker
        defaultValue="IN"
        priority={["IN", "SG", "AE", "GB", "US"]}
      />
    </Field>
  );
}
