// Components › App shell: its examples. Most are a console page in an iframe (frames.tsx), drawn
// at a console's width and scaled to the column, as a shell in the column would take its narrow
// layout; the last is an embedded shell in the page, laid out by its box. Shared by the page
// (doc.tsx) and the island that runs them (Live.tsx): nothing here reads token data.
import { AppShell } from "@qeetrix/react/experimental";
import { ConsoleSidebar, ConsoleTopBar, DRAWERS, UsersPage } from "../console";
import { FrameOf } from "../FrameOf";
import type { ExampleDoc } from "../types";

export const examples: ExampleDoc[] = [
  {
    id: "the-console-frame",
    title: "The console frame",
    line: "The black scope bar across the top, the ruled navigation, the page, and panels on the end edge that the bar's tools open.",
    code: `<AppShell
  topBar={<TopBar product="Qeet ID" … />}
  sidebar={<Sidebar label="Qeet ID">…</Sidebar>}
  drawers={[{ id: "help", label: "Help", icon: CircleQuestionMarkIcon, content: <HelpPanel /> }]}
>
  <PageHeader title="Users" … />
  <PageContent>…</PageContent>
</AppShell>`,
    render: () => (
      <FrameOf
        id="app-shell"
        window={1280}
        height="720px"
        title="Example: the Qeet ID console, on its Users page"
      />
    ),
  },
  {
    id: "the-rail",
    title: "The rail",
    line: "sidebarCollapsed: the navigation folds to a 48px rail of icons, which opens while hovered or focused. Keep the choice in the user's settings.",
    code: `<AppShell
  sidebarCollapsed={collapsed}
  onSidebarCollapsedChange={(next) => saveSetting("sidebarCollapsed", next)}
  …
/>`,
    render: () => (
      <FrameOf
        window={1280}
        height="720px"
        id="app-shell"
        query="?collapsed"
        title="Example: the console with its navigation as a rail"
      />
    ),
  },
  {
    id: "a-panel",
    title: "A panel",
    line: "drawers: help, the assistant, activity. Their triggers sit in the top bar; one is open at a time, beside the page.",
    code: `<AppShell drawers={drawers} defaultActiveDrawer="help" … />`,
    render: () => (
      <FrameOf
        window={1280}
        height="720px"
        id="app-shell"
        query="?panel=help&plain"
        title="Example: the console with its Help panel open"
      />
    ),
  },
  {
    id: "banners-and-messages",
    title: "Banners and messages",
    line: "banners: about the whole app, under the bar, edge to edge. notifications: about this page, above its header.",
    code: `<AppShell
  banners={<Alert variant="banner" tone="warning" icon={EyeIcon} title="You're viewing as Rahul Verma" … />}
  notifications={<Alert tone="info" title="Maintenance on Sunday 2 November" … />}
  …
/>`,
    render: () => (
      <FrameOf
        window={1280}
        height="720px"
        id="app-shell-banners"
        query="?plain"
        title="Example: the console with a banner and a page message"
      />
    ),
  },
  {
    id: "on-a-phone",
    title: "On a phone",
    line: "Under 840px the navigation becomes a drawer behind the bar's menu button, and the scope path one switcher.",
    code: `<AppShell topBar={…} sidebar={…}>…</AppShell>`,
    render: () => (
      <FrameOf
        id="app-shell"
        query="?plain"
        narrow
        height="40rem"
        title="Example: the console on a phone's width"
      />
    ),
  },
  {
    id: "inside-a-page",
    title: "Inside a page",
    line: "embedded: the shell fills its box, with no <main> or skip link. Its layout, its bar and its page header follow the box's width, here a narrow one: the navigation opens inside it.",
    code: `<div style={{ blockSize: 480 }}>
  <AppShell embedded topBar={<TopBar … />} sidebar={<Sidebar label="Qeet ID">…</Sidebar>}>
    <PageHeader headingLevel={3} title="Users" … />
  </AppShell>
</div>`,
    render: () => (
      <div className="qc-shell-box">
        <AppShell
          embedded
          topBar={<ConsoleTopBar />}
          sidebar={<ConsoleSidebar label="Qeet ID, inside a page" />}
          drawers={DRAWERS}
        >
          <UsersPage summary={false} headingLevel={3} />
        </AppShell>
      </div>
    ),
  },
];
