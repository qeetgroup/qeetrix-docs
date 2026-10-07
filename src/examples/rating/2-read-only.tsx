import { Rating } from "@qeetrix/ui";

/** `readOnly` with `allowHalf` and `showValue` displays an average rather than asking for one. */
export default function RatingReadOnly() {
  return (
    <div className="flex items-center gap-3">
      <Rating
        value={4.5}
        allowHalf
        readOnly
        showValue
        size="sm"
        aria-label="Average rating"
      />
      <span className="text-caption text-muted-foreground">
        from 128 reviews
      </span>
    </div>
  );
}
