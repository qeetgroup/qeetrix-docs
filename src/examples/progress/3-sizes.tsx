import { Progress } from "@qeetrix/ui";

/**
 * `size` sets the track's thickness: `sm`, `md` (the default) or `lg`. Meter uses the same scale,
 * so a bar and a gauge of one size line up.
 */
export default function ProgressSizes() {
  return (
    <div className="flex w-80 flex-col gap-5">
      <Progress size="sm" label="Onboarding tasks" value={25} />
      <Progress size="md" label="Payroll run" value={60} />
      <Progress size="lg" label="Data export" value={85} />
    </div>
  );
}
