import {
  Field,
  FieldControl,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  Input,
} from "@qeetrix/ui";

/** `FieldSet` and `FieldLegend` name a group of fields; `FieldGroup` lays them out. */
export default function FieldFieldset() {
  return (
    <FieldSet className="w-full max-w-lg">
      <FieldLegend>Billing details</FieldLegend>
      <FieldGroup className="grid gap-4 sm:grid-cols-2">
        <Field className="sm:col-span-2">
          <FieldLabel>Legal name</FieldLabel>
          <FieldControl
            render={<Input defaultValue="Northwind Retail Pvt Ltd" />}
          />
        </Field>
        <Field>
          <FieldLabel>GSTIN</FieldLabel>
          <FieldControl render={<Input defaultValue="29ABCDE1234F1Z5" />} />
        </Field>
        <Field>
          <FieldLabel>PIN code</FieldLabel>
          <FieldControl
            render={<Input inputMode="numeric" defaultValue="560001" />}
          />
        </Field>
      </FieldGroup>
    </FieldSet>
  );
}
