import { IndianRupeeIcon, UsersIcon, WebhookIcon } from "@qeetrix/icons";
import { Stat } from "@qeetrix/ui";

/**
 * A KPI tile: label, value, an optional `delta` arrowed by `trend`, a `hint` and an `icon`.
 * `trend="neutral"` draws a level dash, so "no change" isn't told by colour alone. The tile is
 * a group named by its label.
 *
 * @layout wide
 */
export default function StatDefault() {
  return (
    <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
      <Stat
        label="Monthly revenue"
        value="₹18.4L"
        delta="+12.4%"
        trend="up"
        hint="vs. September"
        icon={IndianRupeeIcon}
      />
      <Stat
        label="Active members"
        value="2,140"
        delta="+86"
        trend="up"
        hint="Joined this month"
        icon={UsersIcon}
      />
      <Stat
        label="Webhook success rate"
        value="99.2%"
        delta="0.0%"
        trend="neutral"
        hint="Last 7 days"
        icon={WebhookIcon}
      />
    </div>
  );
}
