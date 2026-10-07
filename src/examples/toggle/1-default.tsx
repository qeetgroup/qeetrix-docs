import { BoldIcon, ItalicIcon, UnderlineIcon } from "@qeetrix/icons";
import { Toggle } from "@qeetrix/ui";

/** A two-state button: pressed or not. Icon-only toggles need an `aria-label`. */
export default function ToggleDefault() {
  return (
    <div className="flex items-center gap-1">
      <Toggle aria-label="Bold" defaultPressed>
        <BoldIcon aria-hidden />
      </Toggle>
      <Toggle aria-label="Italic">
        <ItalicIcon aria-hidden />
      </Toggle>
      <Toggle aria-label="Underline">
        <UnderlineIcon aria-hidden />
      </Toggle>
    </div>
  );
}
