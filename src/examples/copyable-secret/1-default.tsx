import { TriangleAlertIcon } from "@qeetrix/icons";
import { CopyableSecret } from "@qeetrix/ui";

/**
 * For a secret shown once: the value stays fully visible, since masking it would defeat the
 * point, and the button confirms only after the copy succeeds.
 */
export default function CopyableSecretDefault() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-3 rounded-lg border border-border bg-card p-5">
      <div>
        <p className="text-label font-semibold">Client secret</p>
        <p className="mt-1 flex items-center gap-1.5 text-caption text-muted-foreground">
          <TriangleAlertIcon
            className="size-3.5 text-warning-text"
            aria-hidden
          />
          Copy it now. You won't be able to see it again.
        </p>
      </div>
      <CopyableSecret value="qx_sk_live_4fT9mW2pLx8bR6vN1cQz7hJ3" />
    </div>
  );
}
