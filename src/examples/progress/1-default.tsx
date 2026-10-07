import { Progress } from "@qeetrix/ui";

/**
 * `label` captions the bar and gives it its accessible name; the value shows opposite, as a
 * percentage by default. Without a label, name the bar with `aria-label`.
 */
export default function ProgressDefault() {
  return (
    <Progress
      label="Uploading payroll-sep-2026.csv"
      value={64}
      className="w-80"
    />
  );
}
