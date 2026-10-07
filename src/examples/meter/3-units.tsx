import { Meter } from "@qeetrix/ui";

/**
 * `format` takes `Intl.NumberFormat` options and shows the value itself in those units rather
 * than as a percentage. `locale` sets the formatting locale, here Indian digit grouping.
 */
export default function MeterUnits() {
  return (
    <div className="flex w-80 flex-col gap-5">
      <Meter
        label="File storage (50 GB)"
        value={34.2}
        max={50}
        format={{ style: "unit", unit: "gigabyte", maximumFractionDigits: 1 }}
      />
      <Meter
        label="Card spend limit (₹2,00,000)"
        value={142_500}
        max={200_000}
        locale="en-IN"
        format={{
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0,
        }}
      />
    </div>
  );
}
