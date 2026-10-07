import {
  TextAlignCenterIcon,
  TextAlignEndIcon,
  TextAlignStartIcon,
} from "@qeetrix/icons";
import { Toggle, ToggleGroup } from "@qeetrix/ui";

/** `ToggleGroup` makes the toggles one choice — at most one pressed — and one tab stop. Add `multiple` to allow several. */
export default function ToggleGroupExample() {
  return (
    <ToggleGroup aria-label="Text alignment" defaultValue={["start"]}>
      <Toggle value="start" aria-label="Align start">
        <TextAlignStartIcon aria-hidden />
      </Toggle>
      <Toggle value="center" aria-label="Align centre">
        <TextAlignCenterIcon aria-hidden />
      </Toggle>
      <Toggle value="end" aria-label="Align end">
        <TextAlignEndIcon aria-hidden />
      </Toggle>
    </ToggleGroup>
  );
}
