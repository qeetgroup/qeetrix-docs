import { Notification, Progress } from "@qeetrix/ui";

/**
 * `loading` swaps the icon for a spinner and marks the card busy. Children render below the
 * description, which suits a progress bar for a long-running job.
 */
export default function NotificationLoading() {
  return (
    <Notification
      loading
      title="Exporting audit log"
      description="Northwind Retail · 1–30 Sep · 18,240 events"
      className="w-full max-w-md"
    >
      <Progress
        value={64}
        size="sm"
        aria-label="Audit log export"
        className="mt-2"
      />
    </Notification>
  );
}
