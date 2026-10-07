import { Button, Notification } from "@qeetrix/ui";

/**
 * An event card: the status sits in the icon tile, the time sits opposite the title, and an
 * `action` goes below the description. `destructive` and `error` cards announce assertively
 * (`role="alert"`); the other variants politely (`role="status"`).
 */
export default function NotificationDefault() {
  return (
    <Notification
      variant="success"
      title="Payout settled"
      description="₹4,82,300 reached HDFC Bank ••4821."
      time="2 min ago"
      action={
        <Button size="sm" variant="outline">
          View payout
        </Button>
      }
      className="w-full max-w-md"
    />
  );
}
