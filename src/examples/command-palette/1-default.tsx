"use client";

import {
  KeyRoundIcon,
  LayoutDashboardIcon,
  LinkIcon,
  ReceiptIcon,
  SearchIcon,
  UserPlusIcon,
  WalletIcon,
} from "@qeetrix/icons";
import {
  Button,
  CommandPalette,
  type CommandPaletteItem,
  toast,
} from "@qeetrix/ui";
import { useState } from "react";

const items: CommandPaletteItem[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    group: "Go to",
    icon: <LayoutDashboardIcon />,
  },
  {
    id: "payments",
    title: "Payments",
    group: "Go to",
    icon: <ReceiptIcon />,
    keywords: ["transactions", "upi", "card"],
  },
  {
    id: "payouts",
    title: "Payouts",
    group: "Go to",
    icon: <WalletIcon />,
    keywords: ["settlements"],
  },
  {
    id: "link",
    title: "Create payment link",
    group: "Actions",
    icon: <LinkIcon />,
    shortcut: ["⌘", "L"],
  },
  {
    id: "invite",
    title: "Invite team member",
    group: "Actions",
    icon: <UserPlusIcon />,
  },
  {
    id: "keys",
    title: "API keys",
    group: "Settings",
    icon: <KeyRoundIcon />,
    keywords: ["secret", "token", "developer"],
  },
];

/**
 * A search box over grouped commands. You own the open state, so open it from a button, or from
 * a ⌘K handler of your own (the palette binds no shortcut). The arrow keys move, Enter runs the
 * command, and Escape or a click on the backdrop closes it.
 */
export default function CommandPaletteDefault() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="outline" className="w-64" onClick={() => setOpen(true)}>
        <SearchIcon data-icon="inline-start" aria-hidden />
        <span className="flex-1 text-start text-muted-foreground">
          Search Qeet Pay…
        </span>
      </Button>
      <CommandPalette
        open={open}
        onOpenChange={setOpen}
        items={items}
        placeholder="Search pages and actions…"
        onSelect={(item) => toast(`Opening ${item.title}`)}
      />
    </>
  );
}
