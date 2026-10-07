import { StatusPill } from "@qeetrix/ui";

const statuses = [
  "active",
  "verified",
  "processing",
  "invited",
  "pending",
  "expiring",
  "revoked",
  "failed",
  "draft",
  "archived",
];

/**
 * Pass the status string your API returns, in any case, and the pill picks the colour and the
 * label: green for active, red for revoked, and so on. The label always names the state, so the
 * colour is never the only cue.
 */
export default function StatusPillDefault() {
  return (
    <div className="flex max-w-md flex-wrap items-center justify-center gap-2">
      {statuses.map((status) => (
        <StatusPill key={status} status={status} />
      ))}
    </div>
  );
}
