import { RefreshCwIcon } from "@qeetrix/icons";
import { IconButton } from "@qeetrix/ui";

/** `loading` swaps the icon for a spinner in the same square, so a toolbar never shifts while an action runs. */
export default function IconButtonLoading() {
  return (
    <div className="flex items-center gap-3">
      <IconButton
        icon={RefreshCwIcon}
        variant="outline"
        aria-label="Refresh sessions"
      />
      <IconButton
        icon={RefreshCwIcon}
        variant="outline"
        aria-label="Refresh sessions"
        loading
      />
    </div>
  );
}
