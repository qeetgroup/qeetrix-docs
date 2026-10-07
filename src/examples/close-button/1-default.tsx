import { CloseButton } from "@qeetrix/ui";

/** The dismiss control for panels, notices and dialogs: labelled "Close" unless you say otherwise. */
export default function CloseButtonDefault() {
  return (
    <div className="relative w-full max-w-sm rounded-lg border border-border bg-card p-4 pe-12">
      <p className="text-label font-medium">
        Passkeys are now on for your team
      </p>
      <p className="mt-1 text-caption text-muted-foreground">
        Members are asked to add one the next time they sign in.
      </p>
      <CloseButton
        aria-label="Dismiss notice"
        className="absolute end-2 top-2"
      />
    </div>
  );
}
