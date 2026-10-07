import { ProgressCircle } from "@qeetrix/ui";

/**
 * A ring with the percentage in its centre. Its accessible name defaults to that percentage, so
 * pass an `aria-label` that says what is progressing.
 */
export default function ProgressCircleDefault() {
  return (
    <div className="flex items-center gap-4">
      <ProgressCircle value={75} aria-label="Onboarding checklist" />
      <div>
        <div className="text-label font-medium">Onboarding checklist</div>
        <div className="text-caption text-muted-foreground">
          6 of 8 tasks done
        </div>
      </div>
    </div>
  );
}
