import {
  Field,
  FieldControl,
  FieldError,
  FieldLabel,
  FieldSuccess,
  FieldWarning,
  Input,
} from "@qeetrix/ui";

/** A message under the control sets its state: an error marks it invalid, a warning or success tints it. */
export default function FieldMessages() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-5">
      <Field>
        <FieldLabel>Subdomain</FieldLabel>
        <FieldControl render={<Input defaultValue="northwind" />} />
        <FieldError>northwind.qeet.in is already taken.</FieldError>
      </Field>
      <Field>
        <FieldLabel>Session timeout (minutes)</FieldLabel>
        <FieldControl render={<Input defaultValue="720" />} />
        <FieldWarning>
          Over 8 hours is longer than most security policies allow.
        </FieldWarning>
      </Field>
      <Field>
        <FieldLabel>Custom domain</FieldLabel>
        <FieldControl render={<Input defaultValue="id.northwind.in" />} />
        <FieldSuccess>DNS verified.</FieldSuccess>
      </Field>
    </div>
  );
}
