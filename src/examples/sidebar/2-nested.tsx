import {
  ArrowLeftRightIcon,
  ReceiptIndianRupeeIcon,
  UsersIcon,
  WalletIcon,
} from "@qeetrix/icons";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
} from "@qeetrix/ui";

/**
 * `SidebarMenuSub` nests pages under a parent item. Mark only the current page `isActive`: its
 * parent shows that it contains the current page on its own. `collapsible="none"` renders a
 * static panel that never collapses.
 *
 * @layout wide
 */
export default function SidebarNested() {
  return (
    <div className="h-96 overflow-hidden rounded-lg border border-border bg-background">
      <SidebarProvider className="h-full min-h-0">
        <Sidebar collapsible="none" className="border-e border-sidebar-border">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Qeet Pay</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton render={<a href="#payments" />}>
                      <WalletIcon aria-hidden />
                      <span>Payments</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton render={<a href="#invoices" />}>
                      <ReceiptIndianRupeeIcon aria-hidden />
                      <span>Invoices</span>
                    </SidebarMenuButton>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton href="#all-invoices">
                          <span>All invoices</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton href="#drafts">
                          <span>Drafts</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton href="#gst-returns" isActive>
                          <span>GST returns</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton render={<a href="#settlements" />}>
                      <ArrowLeftRightIcon aria-hidden />
                      <span>Settlements</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton render={<a href="#customers" />}>
                      <UsersIcon aria-hidden />
                      <span>Customers</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <div className="flex flex-col gap-1 p-4">
            <h4 className="font-heading text-base font-semibold">
              GST returns
            </h4>
            <p className="text-sm text-muted-foreground">
              GSTR-1 for September 2026 is due on 11 October.
            </p>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
