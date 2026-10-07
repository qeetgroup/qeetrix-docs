import { CheckboxCard, CheckboxCardGroup } from "@qeetrix/ui";

const channels = [
  {
    value: "email",
    title: "Email",
    body: "Receipts, invoices and security alerts.",
  },
  { value: "sms", title: "SMS", body: "Sign-in codes and urgent alerts only." },
  {
    value: "whatsapp",
    title: "WhatsApp",
    body: "Delivery and payment updates.",
  },
];

/** A checkbox with room to explain the choice. The whole card is the target; lay out its content as you like. */
export default function CheckboxCardDefault() {
  return (
    <CheckboxCardGroup
      aria-label="Notification channels"
      className="w-full max-w-md"
    >
      {channels.map((channel) => (
        <CheckboxCard
          key={channel.value}
          value={channel.value}
          defaultChecked={channel.value !== "whatsapp"}
        >
          <span className="flex flex-col gap-0.5">
            <span className="font-medium">{channel.title}</span>
            <span className="text-caption text-muted-foreground">
              {channel.body}
            </span>
          </span>
        </CheckboxCard>
      ))}
    </CheckboxCardGroup>
  );
}
