import {
  Field,
  FieldContent,
  FieldControl,
  FieldDescription,
  FieldLabel,
  Separator,
  Switch,
} from "@qeetrix/ui";

const settings = [
  {
    id: "passkeys",
    title: "Require passkeys",
    body: "Owners, Admins and Billing sign in with a passkey only.",
    on: true,
  },
  {
    id: "new-device",
    title: "Alert on new devices",
    body: "Email the user when their account signs in somewhere new.",
    on: true,
  },
  {
    id: "ip",
    title: "Restrict console by IP",
    body: "Only the Bengaluru office and the corporate VPN.",
    on: false,
  },
];

/**
 * A 1px rule between the sections of a settings panel. It is horizontal and full width by
 * default, and carries `role="separator"`.
 */
export default function SeparatorDefault() {
  return (
    <div className="flex w-md flex-col">
      {settings.map((setting, index) => (
        <div key={setting.id}>
          {index > 0 && <Separator className="my-4" />}
          <Field orientation="horizontal">
            <FieldContent>
              <FieldLabel>{setting.title}</FieldLabel>
              <FieldDescription>{setting.body}</FieldDescription>
            </FieldContent>
            <FieldControl render={<Switch defaultChecked={setting.on} />} />
          </Field>
        </div>
      ))}
    </div>
  );
}
