import { SettingsIcon } from "@qeetrix/icons";
import { IconButton } from "@qeetrix/ui";

/** Four sizes; the icon is 12px at `icon-xs` and 16px at the others. */
export default function IconButtonSizes() {
  return (
    <div className="flex items-center gap-3">
      <IconButton
        icon={SettingsIcon}
        variant="outline"
        size="icon-xs"
        aria-label="Settings"
      />
      <IconButton
        icon={SettingsIcon}
        variant="outline"
        size="icon-sm"
        aria-label="Settings"
      />
      <IconButton
        icon={SettingsIcon}
        variant="outline"
        size="icon"
        aria-label="Settings"
      />
      <IconButton
        icon={SettingsIcon}
        variant="outline"
        size="icon-lg"
        aria-label="Settings"
      />
    </div>
  );
}
