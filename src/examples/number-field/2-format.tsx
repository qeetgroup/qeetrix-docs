import { Field, FieldLabel, NumberField } from "@qeetrix/ui";

/** `format` takes `Intl.NumberFormat` options — a currency with a step of 500, or a percentage. */
export default function NumberFieldFormat() {
  return (
    <div className="flex flex-wrap gap-4">
      <Field className="w-56">
        <FieldLabel>Monthly budget</FieldLabel>
        <NumberField
          defaultValue={25000}
          step={500}
          min={0}
          locale="en-IN"
          format={{
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
          }}
        />
      </Field>
      <Field className="w-44">
        <FieldLabel>Discount</FieldLabel>
        <NumberField
          defaultValue={0.15}
          step={0.05}
          min={0}
          max={1}
          format={{ style: "percent" }}
        />
      </Field>
    </div>
  );
}
