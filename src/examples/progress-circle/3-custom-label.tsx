import { CheckIcon } from "@qeetrix/icons";
import { ProgressCircle } from "@qeetrix/ui";

/** `label` replaces the centre percentage with your own content, such as a count or an icon. */
export default function ProgressCircleCustomLabel() {
  return (
    <div className="flex flex-wrap items-center gap-8">
      <div className="flex items-center gap-3">
        <ProgressCircle
          value={60}
          size="lg"
          label="3/5"
          aria-label="KYC documents"
        />
        <div>
          <div className="text-label font-medium">KYC documents</div>
          <div className="text-caption text-muted-foreground">
            3 of 5 uploaded
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <ProgressCircle
          value={100}
          size="lg"
          label={<CheckIcon aria-hidden className="size-6" />}
          aria-label="Bank account verification"
        />
        <div>
          <div className="text-label font-medium">Bank account</div>
          <div className="text-caption text-muted-foreground">Verified</div>
        </div>
      </div>
    </div>
  );
}
