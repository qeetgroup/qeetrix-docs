import { CloseButton } from "@qeetrix/ui";

/** `icon-xs` for chips and toasts, `icon-sm` (the default) for dialogs and sheets, `icon` for larger surfaces. */
export default function CloseButtonSizes() {
  return (
    <div className="flex items-center gap-4">
      <CloseButton size="icon-xs" />
      <CloseButton size="icon-sm" />
      <CloseButton size="icon" />
    </div>
  );
}
