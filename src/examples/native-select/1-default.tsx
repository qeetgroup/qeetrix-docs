import {
  Field,
  FieldControl,
  FieldDescription,
  FieldLabel,
  NativeSelect,
} from "@qeetrix/ui";

/** The browser's own picker: best on mobile and for long, simple lists. */
export default function NativeSelectDefault() {
  return (
    <Field className="w-64">
      <FieldLabel>Place of supply</FieldLabel>
      <FieldControl
        render={
          <NativeSelect defaultValue="KA">
            <option value="KA">Karnataka</option>
            <option value="MH">Maharashtra</option>
            <option value="TN">Tamil Nadu</option>
            <option value="DL">Delhi</option>
          </NativeSelect>
        }
      />
      <FieldDescription>
        Decides CGST + SGST or IGST on the invoice.
      </FieldDescription>
    </Field>
  );
}
