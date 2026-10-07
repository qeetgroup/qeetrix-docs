import { Meter } from "@qeetrix/ui";

/**
 * `intent` colours the fill for thresholds you decide: `success`, `warning` or `danger`. The value
 * stays beside the label, so colour is never the only signal.
 */
export default function MeterIntent() {
  return (
    <div className="flex w-80 flex-col gap-5">
      <Meter label="Passkey adoption" value={92} intent="success" />
      <Meter label="Seats used" value={470} max={500} intent="warning" />
      <Meter
        label="API requests this month"
        value={9_870}
        max={10_000}
        intent="danger"
      />
    </div>
  );
}
