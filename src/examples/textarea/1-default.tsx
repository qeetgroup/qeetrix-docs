import {
  Field,
  FieldControl,
  FieldDescription,
  FieldLabel,
  Textarea,
} from "@qeetrix/ui";

/** Multi-line text on the same field styles as `Input`. */
export default function TextareaDefault() {
  return (
    <Field className="w-full max-w-md">
      <FieldLabel>Reason for access</FieldLabel>
      <FieldControl
        render={
          <Textarea
            rows={4}
            placeholder="Investigating ticket #4821 — need read access to billing for 24 hours."
          />
        }
      />
      <FieldDescription>Approvers see this with your request.</FieldDescription>
    </Field>
  );
}
