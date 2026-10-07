import { Meter } from "@qeetrix/ui";

/**
 * A reading within a known range, such as seats or storage used. With no `format`, the value
 * beside the label is the percentage of the way from `min` to `max`.
 */
export default function MeterDefault() {
  return <Meter label="Seats used" value={412} max={500} className="w-72" />;
}
