import { StatusPill } from "@qeetrix/ui";

/**
 * An unknown string falls back to neutral styling with a title-cased label (`past_due` →
 * "Past due"). For a status the mapping doesn't know, set `kind` and the label yourself;
 * `dot={false}` drops the leading dot.
 */
export default function StatusPillCustom() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <StatusPill status="past_due" />
      <StatusPill kind="warning">Settlement on hold</StatusPill>
      <StatusPill kind="info">KYC in review</StatusPill>
      <StatusPill status="active" dot={false} />
    </div>
  );
}
