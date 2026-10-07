import { ChevronLeftIcon, ChevronRightIcon } from "@qeetrix/icons";
import { ButtonGroup, ButtonGroupItem } from "@qeetrix/ui";

/** Related actions joined into one control: the inner corners merge and the borders collapse. */
export default function ButtonGroupDefault() {
  return (
    <ButtonGroup aria-label="Calendar navigation">
      <ButtonGroupItem variant="outline" size="icon" aria-label="Previous week">
        <ChevronLeftIcon aria-hidden />
      </ButtonGroupItem>
      <ButtonGroupItem variant="outline">Today</ButtonGroupItem>
      <ButtonGroupItem variant="outline" size="icon" aria-label="Next week">
        <ChevronRightIcon aria-hidden />
      </ButtonGroupItem>
    </ButtonGroup>
  );
}
