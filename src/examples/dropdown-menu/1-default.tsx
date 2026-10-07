import {
  ChevronDownIcon,
  CreditCardIcon,
  KeyRoundIcon,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
} from "@qeetrix/icons";
import {
  Avatar,
  AvatarFallback,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@qeetrix/ui";

/**
 * A button that opens a list of actions. The arrow keys move through the items, Enter runs one,
 * and Escape closes the menu and returns focus to the button. `DropdownMenuShortcut` only shows a
 * shortcut; binding it is up to you.
 */
export default function DropdownMenuDefault() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>
        <Avatar size="xs">
          <AvatarFallback aria-hidden>AM</AvatarFallback>
        </Avatar>
        Aarav Mehta
        <ChevronDownIcon data-icon="inline-end" aria-hidden />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>aarav@northwind.in</DropdownMenuLabel>
          <DropdownMenuItem>
            <UserIcon aria-hidden />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <KeyRoundIcon aria-hidden />
            Passkeys
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCardIcon aria-hidden />
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SettingsIcon aria-hidden />
            Settings
            <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOutIcon aria-hidden />
          Sign out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
