import { Label, Switch } from "@qeetrix/ui";

const settings = [
  { label: "New sign-in from an unknown device", on: true },
  { label: "Password changed", on: true },
  { label: "Weekly security digest", on: false },
  { label: "Product announcements", on: false },
];

/** A list of settings with `size="sm"` switches, each named by its `Label`. */
export default function SwitchSettings() {
  return (
    <div className="w-full max-w-md divide-y divide-border rounded-lg border border-border bg-card">
      {settings.map((setting) => (
        <Label
          key={setting.label}
          className="flex items-center justify-between gap-4 px-4 py-3 font-normal"
        >
          {setting.label}
          <Switch size="sm" defaultChecked={setting.on} />
        </Label>
      ))}
    </div>
  );
}
