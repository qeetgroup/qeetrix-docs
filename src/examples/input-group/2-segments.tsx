import {
  Field,
  FieldControl,
  FieldDescription,
  FieldLabel,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@qeetrix/ui";

/** `variant="segment"` sets fixed text apart from what the user types, at either end. */
export default function InputGroupSegments() {
  return (
    <Field className="w-96">
      <FieldLabel>Sign-in address</FieldLabel>
      <InputGroup>
        <InputGroupAddon variant="segment">https://</InputGroupAddon>
        <FieldControl render={<InputGroupInput defaultValue="northwind" />} />
        <InputGroupAddon align="end" variant="segment">
          .qeet.in
        </InputGroupAddon>
      </InputGroup>
      <FieldDescription>Your members sign in at this address.</FieldDescription>
    </Field>
  );
}
