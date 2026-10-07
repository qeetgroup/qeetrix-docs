import {
  Badge,
  Link,
  PreviewCard,
  PreviewCardContent,
  PreviewCardDescription,
  PreviewCardTitle,
  PreviewCardTrigger,
  PreviewCardUrl,
} from "@qeetrix/ui";

/**
 * Leave out the template props and compose the content yourself from `PreviewCardTitle`,
 * `PreviewCardDescription` and `PreviewCardUrl`, with anything else the preview needs, such as a
 * status badge.
 */
export default function PreviewCardComposed() {
  return (
    <p className="max-w-sm text-sm text-muted-foreground">
      Kabir shared{" "}
      <PreviewCard>
        <PreviewCardTrigger
          render={<Link inline href="https://pay.qeet.in/i/INV-2041" />}
        >
          INV-2041
        </PreviewCardTrigger>
        <PreviewCardContent className="flex w-80 flex-col gap-1.5">
          <div className="flex items-start justify-between gap-2">
            <PreviewCardTitle>Invoice INV-2041</PreviewCardTitle>
            <Badge variant="warning">Overdue</Badge>
          </div>
          <PreviewCardDescription>
            Northwind Retail · ₹48,260.00 including GST, due 15 October 2026.
            Two reminders sent.
          </PreviewCardDescription>
          <PreviewCardUrl>pay.qeet.in/i/INV-2041</PreviewCardUrl>
        </PreviewCardContent>
      </PreviewCard>{" "}
      in the finance channel.
    </p>
  );
}
