import { Stat } from "@qeetrix/ui";

/**
 * `trend` is the direction of the arrow; `tone` is whether that is good news, which sets the
 * colour. It defaults from the trend (up is positive), so set it when up is bad, as for error
 * rate, or down is good, as for latency.
 *
 * @layout wide
 */
export default function StatTone() {
  return (
    <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
      <Stat
        label="Error rate"
        value="0.84%"
        delta="+0.31 pts"
        trend="up"
        tone="negative"
        hint="Token endpoint, last 24 hours"
      />
      <Stat
        label="p95 latency"
        value="148 ms"
        delta="−34 ms"
        trend="down"
        tone="positive"
        hint="Token endpoint, last 24 hours"
      />
      <Stat
        label="Failed sign-ins"
        value="1,204"
        delta="−18%"
        trend="down"
        tone="positive"
        hint="vs. last week"
      />
    </div>
  );
}
