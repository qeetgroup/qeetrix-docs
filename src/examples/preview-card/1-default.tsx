import {
  Link,
  PreviewCard,
  PreviewCardContent,
  PreviewCardTrigger,
} from "@qeetrix/ui";

/**
 * A link that previews its destination on hover or focus. Pass `title`, `description` and `url`
 * (and `imageUrl` for a hero image) and the content lays the preview out for you.
 */
export default function PreviewCardDefault() {
  return (
    <p className="max-w-sm text-sm text-muted-foreground">
      From 1 November, settlements follow the{" "}
      <PreviewCard>
        <PreviewCardTrigger
          render={
            <Link
              inline
              external
              href="https://docs.qeet.in/pay/payout-schedules"
            />
          }
        >
          T+1 payout schedule
        </PreviewCardTrigger>
        <PreviewCardContent
          title="Payout schedules · Qeet Pay"
          description="How Qeet Pay batches captured payments and settles them to your bank account on a T+1 or T+2 cycle, and what holds a payout back."
          url="docs.qeet.in/pay/payout-schedules"
        />
      </PreviewCard>{" "}
      for all UPI and card payments.
    </p>
  );
}
