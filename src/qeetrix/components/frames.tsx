// The console frame's examples that need a window of their own: a console at its desktop width,
// scaled to the column (an embedded shell in the column would take its narrow layout, as it
// should), and a phone's.
// Each is drawn at /frames/<id>/ and shown in an iframe; options come from the address
// (?collapsed&panel=help&density=comfortable).
import { QeetLogo } from "@qeetrix/icons";
import { BellIcon } from "@qeetrix/icons/icons/bell";
import { EyeIcon } from "@qeetrix/icons/icons/eye";
import { WrenchIcon } from "@qeetrix/icons/icons/wrench";
import { Avatar, Button, IconButton, SkipLink } from "@qeetrix/react";
import {
  Alert,
  AppShell,
  type AppShellDensity,
  PageContent,
  PageHeader,
  TopBar,
} from "@qeetrix/react/experimental";
import type { ReactNode } from "react";
import {
  ConsoleSidebar,
  ConsoleTopBar,
  DRAWERS,
  routerLink,
  ScopeBars,
  UsersActions,
  UsersBreadcrumb,
  UsersPage,
  UsersSummary,
} from "./console";
import { AccountSettings, SignIn, UserDetail } from "./patterns";

const shell = (
  params: URLSearchParams,
  extra?: { banners?: ReactNode; notifications?: ReactNode },
) => (
  <AppShell
    topBar={<ConsoleTopBar />}
    sidebar={<ConsoleSidebar />}
    drawers={DRAWERS}
    defaultSidebarCollapsed={params.has("collapsed")}
    defaultActiveDrawer={params.get("panel")}
    density={(params.get("density") as AppShellDensity | null) ?? "compact"}
    {...extra}
  >
    <UsersPage summary={!params.has("plain")} />
  </AppShell>
);

/** Each frame, by id: what /frames/<id>/ draws. */
export const FRAMES: Record<string, (params: URLSearchParams) => ReactNode> = {
  "app-shell": (params) => shell(params),
  "app-shell-banners": (params) =>
    shell(params, {
      banners: (
        <Alert
          variant="banner"
          tone="warning"
          icon={EyeIcon}
          title="You're viewing as Rahul Verma"
          actions={
            <Button size="sm" tone="neutral">
              Stop viewing
            </Button>
          }
        >
          Anything you change is done as him.
        </Alert>
      ),
      notifications: (
        <Alert
          tone="info"
          icon={WrenchIcon}
          title="Maintenance on Sunday 2 November, 01:00–02:00 IST"
        >
          Sign-in keeps working.
        </Alert>
      ),
    }),
  "top-bar": () => <ConsoleTopBar />,
  "top-bar-scope": () => <ScopeBars />,
  "top-bar-minimal": () => (
    <TopBar
      logo={<QeetLogo variant="dark" height={20} />}
      product="Qeet Notify"
      href="#home"
      render={routerLink}
      actions={<IconButton icon={BellIcon} aria-label="Notifications" tone="neutral" />}
      account={<Avatar name="Priya Sharma" size="sm" />}
    />
  ),
  "page-header": (params) => (
    <>
      <PageHeader
        breadcrumb={<UsersBreadcrumb />}
        title="Users"
        count={1284}
        description="People who can sign in to Acme Pvt Ltd's applications."
        actions={<UsersActions />}
        summary={params.has("summary") ? <UsersSummary /> : undefined}
      />
      <PageContent />
    </>
  ),
  "skip-link": (params) => (
    <>
      <SkipLink messages={params.has("hi") ? { label: "मुख्य सामग्री पर जाएँ" } : undefined} />
      <nav aria-label="Qeet ID" className="qc-frame-nav">
        <a href="#users">Users</a> · <a href="#groups">Groups</a> · <a href="#roles">Roles</a> ·{" "}
        <a href="#keys">API keys</a>
      </nav>
      <main id="main" tabIndex={-1} className="qc-frame-main">
        <h1>Users</h1>
        <p>Press Tab: the first stop is Skip to main content.</p>
      </main>
    </>
  ),
  "pattern-sign-in": () => <SignIn />,
  "pattern-user-detail": () => <UserDetail />,
  "pattern-account-settings": () => <AccountSettings />,
  "page-header-minimal": () => (
    <>
      <PageHeader title="Webhooks" actions={<Button>Add endpoint</Button>} />
      <PageContent />
    </>
  ),
};
