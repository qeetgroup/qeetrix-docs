import {
  Field,
  FieldControl,
  FieldDescription,
  FieldLabel,
  PasswordInput,
} from "@qeetrix/ui";

/** A password field with a show/hide toggle. */
export default function PasswordInputDefault() {
  return (
    <Field className="w-72">
      <FieldLabel>Password</FieldLabel>
      <FieldControl
        render={
          <PasswordInput
            autoComplete="current-password"
            defaultValue="correct-horse"
          />
        }
      />
      <FieldDescription>At least 12 characters.</FieldDescription>
    </Field>
  );
}
