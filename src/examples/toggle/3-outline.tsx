import { BellOffIcon, PinIcon, StarIcon } from "@qeetrix/icons";
import { Toggle } from "@qeetrix/ui";

/** `variant="outline"` with a label, for a toggle that stands on its own in a page header. */
export default function ToggleOutline() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Toggle variant="outline" defaultPressed>
        <StarIcon aria-hidden />
        Starred
      </Toggle>
      <Toggle variant="outline">
        <PinIcon aria-hidden />
        Pin to sidebar
      </Toggle>
      <Toggle variant="outline" size="sm">
        <BellOffIcon aria-hidden />
        Mute
      </Toggle>
    </div>
  );
}
