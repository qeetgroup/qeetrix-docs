import { Combobox, Field, FieldLabel } from "@qeetrix/ui";

const people = [
  { value: "aarav", label: "Aarav Mehta", description: "aarav@northwind.in" },
  { value: "diya", label: "Diya Sharma", description: "diya@northwind.in" },
  { value: "kabir", label: "Kabir Rao", description: "kabir@northwind.in" },
  { value: "meera", label: "Meera Iyer", description: "meera@northwind.in" },
  { value: "rohan", label: "Rohan Gupta", description: "rohan@northwind.in" },
];

/** Type to filter, then pick one option. Search also matches each option's `description`. */
export default function ComboboxDefault() {
  return (
    <Field className="w-72">
      <FieldLabel>Assign to</FieldLabel>
      <Combobox items={people} placeholder="Search people…" />
    </Field>
  );
}
