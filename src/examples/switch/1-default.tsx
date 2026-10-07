import {
  Field,
  FieldContent,
  FieldControl,
  FieldDescription,
  FieldLabel,
  Switch,
} from "@qeetrix/ui";

/** An on/off setting that applies at once. A horizontal `Field` adds a description and wires it up. */
export default function SwitchDefault() {
  return (
    <Field orientation="horizontal" className="w-full max-w-md">
      <FieldContent>
        <FieldLabel>Require a passkey</FieldLabel>
        <FieldDescription>
          Members without one are asked to add it at their next sign-in.
        </FieldDescription>
      </FieldContent>
      <FieldControl render={<Switch defaultChecked />} />
    </Field>
  );
}
