import { Field, FieldControl, FieldLabel, MaskInput } from "@qeetrix/ui";

/** The mask formats as you type: `#` takes a digit, `A` a letter, `*` either, and anything else is fixed text. */
export default function MaskInputPhone() {
  return (
    <Field className="w-64">
      <FieldLabel>Mobile number</FieldLabel>
      <FieldControl
        render={<MaskInput mask="+91 ##### #####" inputMode="numeric" />}
      />
    </Field>
  );
}
