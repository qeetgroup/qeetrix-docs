import { NumberFormatter } from "@qeetrix/ui";

/**
 * `notation="compact"` shortens large figures for tiles and charts, in the locale's own units:
 * crore and lakh in `en-IN`, millions in `en-US`. `prefix` and `suffix` add text around the
 * number.
 */
export default function NumberFormatterCompact() {
  return (
    <div className="grid grid-cols-3 gap-8 text-center">
      <div>
        <div className="font-heading text-2xl font-semibold">
          <NumberFormatter
            value={12450000}
            locale="en-IN"
            notation="compact"
            options={{ style: "currency", currency: "INR" }}
          />
        </div>
        <div className="text-caption text-muted-foreground">
          Settled this month
        </div>
      </div>
      <div>
        <div className="font-heading text-2xl font-semibold">
          <NumberFormatter value={12450000} locale="en-US" notation="compact" />
        </div>
        <div className="text-caption text-muted-foreground">API requests</div>
      </div>
      <div>
        <div className="font-heading text-2xl font-semibold">
          <NumberFormatter
            value={1499}
            locale="en-IN"
            prefix="₹"
            suffix="/mo"
          />
        </div>
        <div className="text-caption text-muted-foreground">Growth plan</div>
      </div>
    </div>
  );
}
