"use client";

import {
  FingerprintPatternIcon,
  MonitorSmartphoneIcon,
  ScrollTextIcon,
  ShieldCheckIcon,
  UsersIcon,
  UsersRoundIcon,
} from "@qeetrix/icons";
import {
  Avatar,
  AvatarFallback,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Separator,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@qeetrix/ui";
import { useState } from "react";

const groups = [
  {
    label: "Directory",
    items: [
      { id: "users", label: "Users", icon: UsersIcon, badge: "48" },
      { id: "groups", label: "Groups", icon: UsersRoundIcon, badge: "6" },
      { id: "roles", label: "Roles", icon: ShieldCheckIcon },
    ],
  },
  {
    label: "Security",
    items: [
      {
        id: "sessions",
        label: "Sessions",
        icon: MonitorSmartphoneIcon,
        badge: "12",
      },
      { id: "passkeys", label: "Passkeys", icon: FingerprintPatternIcon },
      { id: "audit-log", label: "Audit log", icon: ScrollTextIcon },
    ],
  },
];

/**
 * An app shell: `SidebarProvider` wraps the `Sidebar` and the page beside it, `SidebarInset`. With
 * `collapsible="icon"`, the trigger or the rail collapse it to icons, and each item's `tooltip`
 * names it while collapsed. In an app ⌘/Ctrl+B toggles it too, and the sidebar is fixed to the
 * viewport; here the frame's transform contains it.
 *
 * @layout wide
 */
export default function SidebarDefault() {
  const [active, setActive] = useState("users");
  const group = groups.find((entry) =>
    entry.items.some((item) => item.id === active),
  );
  const page = group?.items.find((item) => item.id === active);

  return (
    <div className="relative h-[28rem] overflow-hidden rounded-lg border border-border bg-background transform-gpu">
      <SidebarProvider className="h-full min-h-0">
        <Sidebar collapsible="icon" className="h-full">
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" tooltip="Northwind Retail">
                  <Avatar shape="square">
                    <AvatarFallback>NR</AvatarFallback>
                  </Avatar>
                  <span className="grid min-w-0 leading-tight">
                    <span className="truncate font-semibold">
                      Northwind Retail
                    </span>
                    <span className="truncate text-caption text-muted-foreground">
                      Qeet ID
                    </span>
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent>
            {groups.map((entry) => (
              <SidebarGroup key={entry.label}>
                <SidebarGroupLabel>{entry.label}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {entry.items.map((item) => (
                      <SidebarMenuItem key={item.id}>
                        <SidebarMenuButton
                          isActive={item.id === active}
                          tooltip={item.label}
                          onClick={() => setActive(item.id)}
                        >
                          <item.icon aria-hidden />
                          <span>{item.label}</span>
                        </SidebarMenuButton>
                        {item.badge ? (
                          <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                        ) : null}
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" tooltip="Aarav Mehta">
                  <Avatar>
                    <AvatarFallback>AM</AvatarFallback>
                  </Avatar>
                  <span className="grid min-w-0 leading-tight">
                    <span className="truncate font-medium">Aarav Mehta</span>
                    <span className="truncate text-caption text-muted-foreground">
                      aarav@northwind.in
                    </span>
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>
        <SidebarInset>
          <header className="flex h-12 shrink-0 items-center gap-2 border-b border-border px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-4 self-center" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>{group?.label}</BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{page?.label}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <div className="flex flex-col gap-1 p-4">
            <h4 className="font-heading text-base font-semibold">
              {page?.label}
            </h4>
            <p className="text-sm text-muted-foreground">
              Pick another item in the sidebar, or collapse it with the button
              above.
            </p>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
