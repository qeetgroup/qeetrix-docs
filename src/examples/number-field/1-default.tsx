import { Field, FieldDescription, FieldLabel, NumberField } from "@qeetrix/ui";

/** A number with stepper buttons, kept between `min` and `max`. The arrow keys step it too. */
export default function NumberFieldDefault() {
  return (
    <Field className="w-56">
      <FieldLabel>Seats</FieldLabel>
      <NumberField defaultValue={25} min={1} max={500} />
      <FieldDescription>Billed per seat, per month.</FieldDescription>
    </Field>
  );
}
