import {
  Field,
  FieldControl,
  FieldDescription,
  FieldLabel,
  Input,
} from "@qeetrix/ui";

/** `FieldControl` wires the label and description to the input for assistive technology. */
export default function InputField() {
  return (
    <Field className="w-72">
      <FieldLabel>Work email</FieldLabel>
      <FieldControl
        render={<Input type="email" placeholder="rohan.mehta@acme.in" />}
      />
      <FieldDescription>
        We'll send the invitation to this address.
      </FieldDescription>
    </Field>
  );
}
