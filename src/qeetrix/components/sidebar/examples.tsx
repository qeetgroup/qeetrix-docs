// Components › Sidebar: its examples, the real Sidebar with the code for each. Shared by the page
// (doc.tsx) and the island that runs them (Live.tsx), as categories open and the filter narrows.
// Its rail needs an AppShell, so it's a frame (frames.tsx). Nothing here reads token data.
import { AppWindowIcon } from "@qeetrix/icons/icons/app-window";
import { HouseIcon } from "@qeetrix/icons/icons/house";
import { PlugIcon } from "@qeetrix/icons/icons/plug";
import { ScrollTextIcon } from "@qeetrix/icons/icons/scroll-text";
import { UsersIcon } from "@qeetrix/icons/icons/users";
import { Badge, QeetrixProvider } from "@qeetrix/react";
import { Sidebar, SidebarGroup, SidebarItem } from "@qeetrix/react/experimental";
import { hi } from "@qeetrix/react/locales/hi";
import { ConsoleSidebar, routerLink } from "../console";
import { FrameOf } from "../FrameOf";
import type { ExampleDoc } from "../types";

/** Qeet ID's items, with Enterprise SSO current: its category opens to show it. */
export const Nested = ({
  label = "Qeet ID",
  filter = false,
  title,
}: {
  label?: string;
  filter?: boolean;
  title?: string;
}) => (
  <Sidebar label={label} filter={filter} title={title}>
    <SidebarGroup>
      <SidebarItem label="Overview" href="#overview" render={routerLink} icon={HouseIcon} />
    </SidebarGroup>
    <SidebarGroup label="Directory">
      <SidebarItem label="Users" href="#users" render={routerLink} icon={UsersIcon} badge="1,284" />
    </SidebarGroup>
    <SidebarGroup label="Access">
      <SidebarItem
        label="Applications"
        href="#apps"
        render={routerLink}
        icon={AppWindowIcon}
        badge="12"
      />
      <SidebarItem label="Connections" icon={PlugIcon}>
        <SidebarItem label="Passkeys" href="#passkeys" render={routerLink} />
        <SidebarItem label="Enterprise SSO" href="#sso" render={routerLink} current />
        <SidebarItem label="Social" href="#social" render={routerLink} />
      </SidebarItem>
    </SidebarGroup>
    <SidebarGroup label="Security">
      <SidebarItem
        label="Audit logs"
        href="#audit"
        render={routerLink}
        icon={ScrollTextIcon}
        disabled
        badge={<Badge tone="brand">Pro</Badge>}
      />
    </SidebarGroup>
  </Sidebar>
);

export const examples: ExampleDoc[] = [
  {
    id: "a-consoles-navigation",
    title: "A console's navigation",
    line: "Links only, in groups under small capitals; the current page carries the Ember bar and aria-current. This site's own navigation is one.",
    code: `<Sidebar label="Qeet ID">
  <SidebarGroup label="Directory">
    <SidebarItem label="Users" href="/users" icon={UsersIcon} current badge="1,284" />
    <SidebarItem label="Groups" href="/groups" icon={UserGroupIcon} badge="38" />
  </SidebarGroup>
</Sidebar>`,
    render: () => (
      <div className="qc-side-stage">
        <ConsoleSidebar />
      </div>
    ),
  },
  {
    id: "categories",
    title: "Categories",
    line: "One level of nesting: an item with children is a category. It opens when it holds the current page; closed, it carries the current mark.",
    code: `<SidebarItem label="Connections" icon={PlugIcon}>
  <SidebarItem label="Passkeys" href="/connections/passkeys" />
  <SidebarItem label="Enterprise SSO" href="/connections/sso" current />
</SidebarItem>`,
    render: () => (
      <div className="qc-side-stage">
        <Nested label="Qeet ID, categories" />
      </div>
    ),
  },
  {
    id: "a-title-and-a-filter",
    title: "A title and a filter",
    line: 'title heads the area; filter adds "Filter navigation", which narrows the items as you type.',
    code: `<Sidebar label="Qeet ID" title="Identity" filter>…</Sidebar>`,
    render: () => (
      <div className="qc-side-stage">
        <Nested label="Qeet ID, filtered" title="Identity" filter />
      </div>
    ),
  },
  {
    id: "the-rail",
    title: "The rail",
    line: "In an AppShell, collapsed: 48px of icons, the labels as tooltips. It opens while hovered or focused.",
    code: `<AppShell defaultSidebarCollapsed sidebar={<Sidebar label="Qeet ID">…</Sidebar>} … />`,
    render: () => (
      <FrameOf
        window={1280}
        height="640px"
        id="app-shell"
        query="?collapsed&plain"
        title="Example: the sidebar as a rail"
      />
    ),
  },
  {
    id: "in-hindi",
    title: "In Hindi",
    line: "lang drops the group labels' tracking, which would loosen Devanagari; the filter's strings come from the provider.",
    code: `<QeetrixProvider locale="hi-IN" messages={hi}>
  <div lang="hi">
    <Sidebar label="Qeet ID" title="पहचान" filter>…</Sidebar>
  </div>
</QeetrixProvider>`,
    render: () => (
      <div className="qc-side-stage" lang="hi">
        <QeetrixProvider locale="hi-IN" messages={hi}>
          <Sidebar label="Qeet ID, हिन्दी" title="पहचान" filter>
            <SidebarGroup>
              <SidebarItem label="अवलोकन" href="#overview" render={routerLink} icon={HouseIcon} />
            </SidebarGroup>
            <SidebarGroup label="डायरेक्टरी">
              <SidebarItem
                label="उपयोगकर्ता"
                href="#users"
                render={routerLink}
                icon={UsersIcon}
                current
              />
            </SidebarGroup>
          </Sidebar>
        </QeetrixProvider>
      </div>
    ),
  },
];
