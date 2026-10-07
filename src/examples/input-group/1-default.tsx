import { SearchIcon } from "@qeetrix/icons";
import { InputGroup, InputGroupAddon, InputGroupInput, Kbd } from "@qeetrix/ui";

/** An input with addons inside its frame — a leading icon and a trailing shortcut hint. */
export default function InputGroupDefault() {
  return (
    <InputGroup className="w-80">
      <InputGroupAddon>
        <SearchIcon aria-hidden />
      </InputGroupAddon>
      <InputGroupInput
        aria-label="Search members"
        placeholder="Search members"
      />
      <InputGroupAddon align="end">
        <Kbd>/</Kbd>
      </InputGroupAddon>
    </InputGroup>
  );
}
