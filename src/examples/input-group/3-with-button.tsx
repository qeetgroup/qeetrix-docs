import { EyeIcon } from "@qeetrix/icons";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@qeetrix/ui";

/** `InputGroupButton` puts an action inside the field, sized to it. */
export default function InputGroupWithButton() {
  return (
    <InputGroup className="w-80">
      <InputGroupInput
        aria-label="API key"
        readOnly
        defaultValue="qx_pk_live_••••••••••••7h3J"
        className="font-mono"
      />
      <InputGroupAddon align="end">
        <InputGroupButton aria-label="Reveal key">
          <EyeIcon aria-hidden />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
