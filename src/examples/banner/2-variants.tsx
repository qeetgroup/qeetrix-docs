import { SparklesIcon } from "@qeetrix/icons";
import { Banner } from "@qeetrix/ui";

/**
 * A subtle tint with the status hue on the icon only, so a bar that stays up for days stays
 * calm. Status variants bring their own icon; the neutral `default` has none unless you pass
 * `icon`, and `icon={null}` removes it.
 *
 * @layout wide
 */
export default function BannerVariants() {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-background">
      <Banner aria-label="New feature" icon={<SparklesIcon aria-hidden />}>
        New: export payroll registers straight to Tally.
      </Banner>
      <Banner variant="success" aria-label="Migration complete">
        All 724 members moved to Qeet ID. Passwords keep working until 30 Nov.
      </Banner>
      <Banner variant="warning" aria-label="Seat limit">
        You have used 470 of 500 seats on the Growth plan.
      </Banner>
      <Banner variant="destructive" aria-label="Payment failed">
        The October invoice payment failed. Update the card to avoid suspension
        on 15 Oct.
      </Banner>
    </div>
  );
}
