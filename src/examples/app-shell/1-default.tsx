"use client";

import {
  BellIcon,
  DownloadIcon,
  LandmarkIcon,
  LayoutDashboardIcon,
  PlusIcon,
  QeetLogo,
  ReceiptIndianRupeeIcon,
  SettingsIcon,
  UsersIcon,
  WalletIcon,
} from "@qeetrix/icons";
import {
  AppShellContent,
  AppShellHeader,
  Avatar,
  AvatarFallback,
  Button,
  IconButton,
  PageHeader,
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
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  type StatusKind,
  StatusPill,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@qeetrix/ui";
import { useState } from "react";

const nav = [
  { id: "overview", label: "Overview", icon: LayoutDashboardIcon },
  { id: "payments", label: "Payments", icon: WalletIcon },
  { id: "invoices", label: "Invoices", icon: ReceiptIndianRupeeIcon },
  { id: "customers", label: "Customers", icon: UsersIcon },
  { id: "settlements", label: "Settlements", icon: LandmarkIcon },
];

const invoices: {
  number: string;
  customer: string;
  status: StatusKind;
  label: string;
  total: string;
}[] = [
  {
    number: "QP-INV-00412",
    customer: "Northwind Retail",
    status: "warning",
    label: "Due",
    total: "₹1,41,600",
  },
  {
    number: "QP-INV-00411",
    customer: "Acme India",
    status: "success",
    label: "Paid",
    total: "₹59,000",
  },
  {
    number: "QP-INV-00410",
    customer: "Lotus Foods",
    status: "danger",
    label: "Overdue",
    total: "₹23,600",
  },
  {
    number: "QP-INV-00409",
    customer: "Kaveri Textiles",
    status: "success",
    label: "Paid",
    total: "₹88,500",
  },
  {
    number: "QP-INV-00408",
    customer: "Indus Logistics",
    status: "success",
    label: "Paid",
    total: "₹1,18,000",
  },
  {
    number: "QP-INV-00407",
    customer: "Saffron Hotels",
    status: "muted",
    label: "Draft",
    total: "₹35,400",
  },
];

/**
 * The console layout: `SidebarProvider` renders the row and `SidebarInset` is the page column
 * (and its `<main>`), so the content region renders as a plain element with
 * `AppShellContent render={<div />}`. Collapse the sidebar with the trigger; only the content
 * region scrolls, beneath the header.
 *
 * The desktop sidebar is `position: fixed`; the frame's `transform` makes it the sidebar's
 * containing block here, and `h-full` sizes the sidebar to the frame instead of the viewport.
 *
 * @layout wide
 */
export default function AppShellDefault() {
  const [active, setActive] = useState("invoices");
  const title = nav.find((item) => item.id === active)?.label;

  return (
    <div className="relative h-96 overflow-hidden rounded-lg border border-border bg-background transform-gpu">
      <SidebarProvider className="h-full min-h-0">
        <Sidebar collapsible="icon" className="h-full">
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" className="pointer-events-none">
                  <QeetLogo height={32} className="shrink-0 dark:hidden" />
                  <QeetLogo
                    height={32}
                    variant="dark"
                    className="hidden shrink-0 dark:block"
                  />
                  <span className="grid min-w-0 flex-1 leading-tight">
                    <span className="truncate text-sm font-semibold">
                      Qeet Pay
                    </span>
                    <span className="truncate text-caption text-muted-foreground">
                      Northwind Retail
                    </span>
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Billing</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {nav.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        tooltip={item.label}
                        isActive={active === item.id}
                        onClick={() => setActive(item.id)}
                      >
                        <item.icon aria-hidden />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Settings">
                  <SettingsIcon aria-hidden />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="min-h-0 overflow-hidden">
          <AppShellHeader>
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-4 self-center" />
            <span className="truncate text-sm font-medium">{title}</span>
            <div className="ms-auto flex items-center gap-2">
              <IconButton
                icon={BellIcon}
                variant="ghost"
                aria-label="Notifications"
              />
              <Avatar size="sm" name="Aarav Mehta">
                <AvatarFallback />
              </Avatar>
            </div>
          </AppShellHeader>
          <AppShellContent render={<div />} className="flex flex-col gap-6">
            <PageHeader
              title={title}
              description="Tax invoices issued by Northwind Retail Pvt Ltd, GSTIN 29ABCDE1234F1Z5."
              actions={
                <>
                  <Button variant="outline">
                    <DownloadIcon data-icon="inline-start" aria-hidden />
                    Export
                  </Button>
                  <Button>
                    <PlusIcon data-icon="inline-start" aria-hidden />
                    New invoice
                  </Button>
                </>
              }
            />
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-end">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.number}>
                    <TableCell>
                      <div className="font-medium">{invoice.customer}</div>
                      <div className="font-mono text-caption text-muted-foreground">
                        {invoice.number}
                      </div>
                    </TableCell>
                    <TableCell>
                      <StatusPill kind={invoice.status}>
                        {invoice.label}
                      </StatusPill>
                    </TableCell>
                    <TableCell className="text-end tabular-nums">
                      {invoice.total}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AppShellContent>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
