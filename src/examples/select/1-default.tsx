import {
  Field,
  FieldControl,
  FieldDescription,
  FieldLabel,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@qeetrix/ui";

const roles = ["Admin", "Developer", "Viewer"];

/** Inside a `Field`, the trigger takes the label and description. */
export default function SelectDefault() {
  return (
    <Field className="w-64">
      <FieldLabel>Role</FieldLabel>
      <Select name="role" defaultValue="Developer">
        <FieldControl
          render={
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
          }
        />
        <SelectContent>
          {roles.map((role) => (
            <SelectItem key={role} value={role}>
              {role}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FieldDescription>
        Developers can create API keys and read service logs.
      </FieldDescription>
    </Field>
  );
}
