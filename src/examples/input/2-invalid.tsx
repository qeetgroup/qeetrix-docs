import {
  Field,
  FieldControl,
  FieldError,
  FieldLabel,
  Input,
} from "@qeetrix/ui";

/** A `FieldError` with content marks the field invalid and sets `aria-invalid` on the input. */
export default function InputInvalid() {
  return (
    <Field className="w-72">
      <FieldLabel>Custom domain</FieldLabel>
      <FieldControl render={<Input defaultValue="acme" />} />
      <FieldError>
        Enter a fully qualified domain, such as id.acme.in.
      </FieldError>
    </Field>
  );
}
