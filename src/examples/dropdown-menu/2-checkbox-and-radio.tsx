import { SlidersHorizontalIcon } from "@qeetrix/icons";
import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@qeetrix/ui";

/**
 * Checkbox items toggle on their own; radio items pick one from a group. Neither closes the menu
 * when chosen, so several can be changed in one go. Both take `checked` / `value` to be
 * controlled, or `defaultChecked` / `defaultValue` as here.
 *
 * @title Checkbox and radio items
 */
export default function DropdownMenuCheckboxAndRadio() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>
        <SlidersHorizontalIcon data-icon="inline-start" aria-hidden />
        View
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Columns</DropdownMenuLabel>
          <DropdownMenuCheckboxItem defaultChecked>
            Customer
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem defaultChecked>
            Payment method
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>Fee</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem defaultChecked>
            GST
          </DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup defaultValue="newest">
          <DropdownMenuLabel>Sort by</DropdownMenuLabel>
          <DropdownMenuRadioItem value="newest">
            Newest first
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="amount">
            Amount, high to low
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="status">Status</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
