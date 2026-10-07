import { Chip, ChipGroup } from "@qeetrix/ui";

/** `multiple` turns the chips into independent toggle buttons, each its own tab stop. */
export default function ChipMultiple() {
  return (
    <ChipGroup
      multiple
      size="sm"
      aria-label="Notification channels"
      defaultValue={["email", "push"]}
    >
      <Chip value="email">Email</Chip>
      <Chip value="sms">SMS</Chip>
      <Chip value="push">Push</Chip>
      <Chip value="whatsapp">WhatsApp</Chip>
      <Chip value="slack">Slack</Chip>
    </ChipGroup>
  );
}
