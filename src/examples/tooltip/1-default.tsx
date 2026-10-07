import { CopyIcon } from "@qeetrix/icons";
import { Button, Tooltip, TooltipContent, TooltipTrigger } from "@qeetrix/ui";

/**
 * A short label for a control, shown on hover and on keyboard focus. Touch devices don't show
 * tooltips, so the icon-only button still names itself with `aria-label`.
 */
export default function TooltipDefault() {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-border bg-card py-1 ps-3 pe-1">
      <code className="font-mono text-sm">qid_live_3Hk9Lm2Q</code>
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Copy client ID"
            />
          }
        >
          <CopyIcon aria-hidden />
        </TooltipTrigger>
        <TooltipContent>Copy client ID</TooltipContent>
      </Tooltip>
    </div>
  );
}
