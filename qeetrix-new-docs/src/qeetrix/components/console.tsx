// The Qeet ID console, after the stories' fixture: the top bar, the sidebar and the Users page that
// the Console frame's pages show, alone or together. Shared by their examples, their frames
// (frames.tsx) and their figures: nothing here reads token data.
import { QeetLogo } from "@qeetrix/icons";
import { ActivityIcon } from "@qeetrix/icons/icons/activity";
import { AppWindowIcon } from "@qeetrix/icons/icons/app-window";
import { BuildingIcon } from "@qeetrix/icons/icons/building";
import { CircleQuestionMarkIcon } from "@qeetrix/icons/icons/circle-question-mark";
import { DownloadIcon } from "@qeetrix/icons/icons/download";
import { FingerprintPatternIcon } from "@qeetrix/icons/icons/fingerprint-pattern";
import { HouseIcon } from "@qeetrix/icons/icons/house";
import { KeyRoundIcon } from "@qeetrix/icons/icons/key-round";
import { LayoutGridIcon } from "@qeetrix/icons/icons/layout-grid";
import { LifeBuoyIcon } from "@qeetrix/icons/icons/life-buoy";
import { MonitorSmartphoneIcon } from "@qeetrix/icons/icons/monitor-smartphone";
import { PlugIcon } from "@qeetrix/icons/icons/plug";
import { PlusIcon } from "@qeetrix/icons/icons/plus";
import { ScrollTextIcon } from "@qeetrix/icons/icons/scroll-text";
import { SettingsIcon } from "@qeetrix/icons/icons/settings";
import { ShieldCheckIcon } from "@qeetrix/icons/icons/shield-check";
import { ShieldUserIcon } from "@qeetrix/icons/icons/shield-user";
import { SparklesIcon } from "@qeetrix/icons/icons/sparkles";
import { UserGroupIcon } from "@qeetrix/icons/icons/user-group";
import { UsersIcon } from "@qeetrix/icons/icons/users";
import { WebhookIcon } from "@qeetrix/icons/icons/webhook";
import {
  Avatar,
  Button,
  Card,
  type HeadingLevel,
  IconButton,
  Menu,
  MenuContent,
  MenuItem,
  MenuTrigger,
  Stack,
  Tab,
  Table,
  Tabs,
  TabsList,
  Text,
} from "@qeetrix/react";
import {
  type AppShellDrawer,
  Breadcrumb,
  BreadcrumbItem,
  PageContent,
  PageHeader,
  Pagination,
  Sidebar,
  SidebarGroup,
  SidebarItem,
  Stat,
  StatGroup,
  TopBar,
  TopBarSearch,
  TopBarSwitcher,
} from "@qeetrix/react/experimental";
import type { ComponentProps } from "react";
import { COLUMNS, USERS } from "./table/examples";

/** A router's link in miniature: it handles the click itself, so the page stays put. */
export function RouterLink({ href, onClick, ...props }: ComponentProps<"a">) {
  return (
    <a
      {...props}
      href={href}
      onClick={(event) => {
        onClick?.(event);
        event.preventDefault();
      }}
    />
  );
}

export const routerLink = <RouterLink />;

/** The scope path: organisation, then environment, each a menu. */
export const Scope = () => (
  <>
    <Menu>
      <MenuTrigger render={<TopBarSwitcher mark="AC" label="Acme Pvt Ltd" />} />
      <MenuContent>
        <MenuItem>Acme Pvt Ltd</MenuItem>
        <MenuItem>Acme Labs</MenuItem>
      </MenuContent>
    </Menu>
    <Menu>
      <MenuTrigger render={<TopBarSwitcher status="success" label="Production" />} />
      <MenuContent>
        <MenuItem>Production</MenuItem>
        <MenuItem>Development</MenuItem>
      </MenuContent>
    </Menu>
  </>
);

/** A bar per environment: the switcher's dot and its name. */
export const ScopeBars = () => (
  <Stack gap="md">
    {(
      [
        ["Production", "success"],
        ["Staging", "warning"],
        ["Development", "info"],
      ] as const
    ).map(([label, status]) => (
      <TopBar
        key={label}
        aria-label={`Qeet ID, ${label}`}
        logo={<QeetLogo variant="dark" height={20} />}
        product="Qeet ID"
        href="#home"
        render={routerLink}
        context={
          <Menu>
            <MenuTrigger render={<TopBarSwitcher status={status} label={label} />} />
            <MenuContent>
              <MenuItem>Production</MenuItem>
              <MenuItem>Staging</MenuItem>
              <MenuItem>Development</MenuItem>
            </MenuContent>
          </Menu>
        }
      />
    ))}
  </Stack>
);

export const ConsoleTopBar = ({ search = true }) => (
  <TopBar
    launcher={<IconButton icon={LayoutGridIcon} aria-label="Qeet products" tone="neutral" />}
    logo={<QeetLogo variant="dark" height={20} />}
    product="Qeet ID"
    href="#home"
    render={routerLink}
    context={<Scope />}
    search={
      search ? <TopBarSearch placeholder="Search or jump to…" shortcut={["⌘", "K"]} /> : undefined
    }
    actions={<IconButton icon={SettingsIcon} aria-label="Settings" tone="neutral" />}
    account={<Avatar name="Priya Sharma" size="sm" />}
  />
);

export const ConsoleSidebar = ({ label = "Qeet ID" }) => (
  <Sidebar
    label={label}
    footer={
      <SidebarGroup>
        <SidebarItem label="Help and docs" href="#help" render={routerLink} icon={LifeBuoyIcon} />
      </SidebarGroup>
    }
  >
    <SidebarGroup>
      <SidebarItem label="Overview" href="#overview" render={routerLink} icon={HouseIcon} />
    </SidebarGroup>
    <SidebarGroup label="Directory">
      <SidebarItem
        label="Users"
        href="#users"
        render={routerLink}
        icon={UsersIcon}
        current
        filledWhenCurrent
        badge="1,284"
      />
      <SidebarItem
        label="Groups"
        href="#groups"
        render={routerLink}
        icon={UserGroupIcon}
        badge="38"
      />
      <SidebarItem label="Organisations" href="#orgs" render={routerLink} icon={BuildingIcon} />
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
        <SidebarItem label="Enterprise SSO" href="#sso" render={routerLink} />
        <SidebarItem label="Social" href="#social" render={routerLink} />
      </SidebarItem>
      <SidebarItem label="Roles" href="#roles" render={routerLink} icon={ShieldUserIcon} />
    </SidebarGroup>
    <SidebarGroup label="Security">
      <SidebarItem
        label="Authentication"
        href="#authn"
        render={routerLink}
        icon={FingerprintPatternIcon}
      />
      <SidebarItem
        label="Sessions"
        href="#sessions"
        render={routerLink}
        icon={MonitorSmartphoneIcon}
      />
      <SidebarItem label="Policies" href="#policies" render={routerLink} icon={ShieldCheckIcon} />
      <SidebarItem label="Audit logs" href="#audit" render={routerLink} icon={ScrollTextIcon} />
    </SidebarGroup>
    <SidebarGroup label="Developers">
      <SidebarItem label="API keys" href="#keys" render={routerLink} icon={KeyRoundIcon} />
      <SidebarItem label="Webhooks" href="#webhooks" render={routerLink} icon={WebhookIcon} />
    </SidebarGroup>
  </Sidebar>
);

export const DRAWERS: AppShellDrawer[] = [
  {
    id: "assistant",
    label: "Qeet AI",
    icon: SparklesIcon,
    badge: true,
    content: <Text>Ask about your users: "Who hasn't added a passkey yet?"</Text>,
  },
  {
    id: "help",
    label: "Help",
    icon: CircleQuestionMarkIcon,
    content: (
      <Stack gap="sm">
        <Text weight="semibold">Users</Text>
        <Text size="sm" tone="subtle">
          People who can sign in to your organisation's applications. Invite them, or connect a
          directory to sync them.
        </Text>
      </Stack>
    ),
  },
  {
    id: "activity",
    label: "Activity",
    icon: ActivityIcon,
    content: (
      <Stack gap="sm">
        <Text size="sm">Rahul Verma reset MFA for Arjun Mehta · 9:12 IST</Text>
        <Text size="sm">Azure AD sync added 3 users · 9:26 IST</Text>
      </Stack>
    ),
  },
];

export const UsersSummary = () => (
  <StatGroup aria-label="Users at a glance">
    <Stat label="Total users" value={1284} note="+38 this week" tone="positive" />
    <Stat label="Active, last 30 days" value={1102} note="85.8% of users" />
    <Stat label="Passkey adoption" value="72%" note="+6 pts this month" tone="positive" />
    <Stat label="Pending invitations" value={64} note="9 expire this week" tone="warning" />
  </StatGroup>
);

export const UsersBreadcrumb = () => (
  <Breadcrumb>
    <BreadcrumbItem href="#directory" render={routerLink}>
      Directory
    </BreadcrumbItem>
    <BreadcrumbItem current>Users</BreadcrumbItem>
  </Breadcrumb>
);

export const UsersActions = () => (
  <>
    <Button variant="soft" icon={DownloadIcon}>
      Export
    </Button>
    <Button icon={PlusIcon}>Invite users</Button>
  </>
);

/** Directory › Users: the page inside the frame, or inside an example at a lower heading level. */
export const UsersPage = ({
  summary = true,
  headingLevel,
}: {
  summary?: boolean;
  headingLevel?: HeadingLevel;
}) => (
  <Tabs defaultValue="all">
    <PageHeader
      headingLevel={headingLevel}
      breadcrumb={<UsersBreadcrumb />}
      title="Users"
      count={1284}
      description="People who can sign in to Acme Pvt Ltd's applications. Synced from Azure AD 4 minutes ago."
      actions={<UsersActions />}
      summary={summary ? <UsersSummary /> : undefined}
      tabs={
        <TabsList aria-label="Users">
          <Tab value="all">All users</Tab>
          <Tab value="invitations">Invitations</Tab>
          <Tab value="blocked">Blocked</Tab>
        </TabsList>
      }
    />
    <PageContent>
      <Card
        footer={
          <Pagination
            offset={0}
            pageSize={5}
            total={1284}
            onOffsetChange={() => {}}
            messages={{ label: "Pagination, users" }}
          />
        }
      >
        <Table
          label="Users"
          rows={USERS.slice(0, 5)}
          rowId={(row) => row.email}
          rowLabel={(row) => row.name}
          columns={COLUMNS}
          selectable
          defaultSort={{ column: "lastSignIn", direction: "descending" }}
        />
      </Card>
    </PageContent>
  </Tabs>
);
