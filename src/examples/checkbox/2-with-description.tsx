import {
  Checkbox,
  Field,
  FieldContent,
  FieldControl,
  FieldDescription,
  FieldLabel,
} from "@qeetrix/ui";

/** A horizontal `Field` adds a description and wires it to the checkbox. */
export default function CheckboxWithDescription() {
  return (
    <Field orientation="horizontal" className="w-80">
      <FieldControl render={<Checkbox defaultChecked />} />
      <FieldContent>
        <FieldLabel>Remember this device for 30 days</FieldLabel>
        <FieldDescription>
          Skip the passkey prompt on this browser. Revoke it any time from
          Sessions.
        </FieldDescription>
      </FieldContent>
    </Field>
  );
}
