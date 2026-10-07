import { ProgressCircle } from "@qeetrix/ui";

/**
 * `sm` (40 px), `md` (60 px, the default) and `lg` (80 px), or any size in pixels. `sm` leaves out
 * the centre percentage unless you set `showLabel`; `strokeWidth` sets the ring's thickness.
 */
export default function ProgressCircleSizes() {
  return (
    <div className="flex items-center gap-6">
      <ProgressCircle value={40} size="sm" aria-label="Profile completion" />
      <ProgressCircle value={40} size="md" aria-label="Profile completion" />
      <ProgressCircle value={40} size="lg" aria-label="Profile completion" />
      <ProgressCircle
        value={40}
        size={104}
        strokeWidth={12}
        aria-label="Profile completion"
      />
    </div>
  );
}
