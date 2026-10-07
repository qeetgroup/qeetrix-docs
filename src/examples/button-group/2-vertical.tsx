import { LocateFixedIcon, ZoomInIcon, ZoomOutIcon } from "@qeetrix/icons";
import { ButtonGroup, ButtonGroupItem } from "@qeetrix/ui";

/** `orientation="vertical"` stacks the group, as map and canvas controls do. */
export default function ButtonGroupVertical() {
  return (
    <ButtonGroup orientation="vertical" aria-label="Map controls">
      <ButtonGroupItem variant="outline" size="icon" aria-label="Zoom in">
        <ZoomInIcon aria-hidden />
      </ButtonGroupItem>
      <ButtonGroupItem variant="outline" size="icon" aria-label="Zoom out">
        <ZoomOutIcon aria-hidden />
      </ButtonGroupItem>
      <ButtonGroupItem
        variant="outline"
        size="icon"
        aria-label="Centre on my location"
      >
        <LocateFixedIcon aria-hidden />
      </ButtonGroupItem>
    </ButtonGroup>
  );
}
