import { ColorPicker, Field, FieldDescription, FieldLabel } from "@qeetrix/ui";

/** A swatch, a hex field and the system picker in one control, with presets for your palette. */
export default function ColorPickerDefault() {
  return (
    <Field className="w-72">
      <FieldLabel>Brand colour</FieldLabel>
      <ColorPicker
        defaultValue="#D9480F"
        presets={[
          "#D9480F",
          "#1971C2",
          "#2F9E44",
          "#7048E8",
          "#E03131",
          "#212529",
        ]}
      />
      <FieldDescription>
        Used for buttons and links on your sign-in page.
      </FieldDescription>
    </Field>
  );
}
