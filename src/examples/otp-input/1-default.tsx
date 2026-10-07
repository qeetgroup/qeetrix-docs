import { Field, FieldDescription, FieldLabel, OTPInput } from "@qeetrix/ui";

/** One box per digit. Pasting a whole code fills every box, and `onComplete` fires on the last digit. */
export default function OTPInputDefault() {
  return (
    <Field>
      <FieldLabel>Verification code</FieldLabel>
      <OTPInput length={6} groupSize={3} />
      <FieldDescription>
        Enter the 6-digit code from your authenticator app.
      </FieldDescription>
    </Field>
  );
}
