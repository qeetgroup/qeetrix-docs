import { Autocomplete, Field, FieldDescription, FieldLabel } from "@qeetrix/ui";

const departments = [
  "Engineering",
  "Finance",
  "Human Resources",
  "Legal",
  "Marketing",
  "Operations",
  "Sales",
  "Support",
];

/** Free text with suggestions: the list helps, but any value is allowed — unlike Combobox, which requires one of its options. */
export default function AutocompleteDefault() {
  return (
    <Field className="w-72">
      <FieldLabel>Department</FieldLabel>
      <Autocomplete items={departments} placeholder="Start typing…" />
      <FieldDescription>Pick one, or enter a new department.</FieldDescription>
    </Field>
  );
}
