import {
  Field,
  FieldControl,
  FieldLabel,
  FieldSuccess,
  FieldWarning,
  Input,
} from "@qeetrix/ui";

/** Non-blocking feedback: a warning that still lets the form submit, and a confirmation. */
export default function InputWarningAndSuccess() {
  return (
    <div className="flex w-72 flex-col gap-4">
      <Field>
        <FieldLabel>Invitee email</FieldLabel>
        <FieldControl
          render={<Input type="email" defaultValue="neha.joshi@gmail.com" />}
        />
        <FieldWarning>Outside acme.in: they'll join as a guest.</FieldWarning>
      </Field>
      <Field>
        <FieldLabel>Tenant slug</FieldLabel>
        <FieldControl render={<Input defaultValue="acme-india" />} />
        <FieldSuccess>id.qeet.in/t/acme-india is available.</FieldSuccess>
      </Field>
    </div>
  );
}
