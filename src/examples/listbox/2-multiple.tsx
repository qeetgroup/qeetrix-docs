import { Listbox } from "@qeetrix/ui";

const events = [
  { value: "user.created", label: "user.created" },
  { value: "user.deleted", label: "user.deleted" },
  { value: "session.revoked", label: "session.revoked" },
  { value: "mfa.enrolled", label: "mfa.enrolled" },
  { value: "invoice.paid", label: "invoice.paid" },
];

/** `multiple` lets several options be chosen; Shift + arrow keys extend the selection. */
export default function ListboxMultiple() {
  return (
    <Listbox
      aria-label="Webhook events"
      options={events}
      multiple
      defaultValue={["user.created", "session.revoked"]}
      className="w-72"
    />
  );
}
