import { Field, FieldLabel, MultiSelect } from "@qeetrix/ui";

const scopes = [
  { value: "users:read", label: "users:read" },
  { value: "users:write", label: "users:write" },
  { value: "sessions:read", label: "sessions:read" },
  { value: "sessions:revoke", label: "sessions:revoke" },
  { value: "audit:read", label: "audit:read" },
];

/** `MultiSelect` is the same control for several values, shown as chips. */
export default function ComboboxMultiSelect() {
  return (
    <Field className="w-80">
      <FieldLabel>API key scopes</FieldLabel>
      <MultiSelect
        items={scopes}
        defaultValue={["users:read", "audit:read"]}
        placeholder="Add a scope…"
      />
    </Field>
  );
}
