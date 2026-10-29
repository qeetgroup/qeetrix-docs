// Components › App shell: its documentation, from @qeetrix/react 0.2.2 (experimental/app-shell),
// the Storybook stories (layout/app-shell.stories.tsx) and the changelog. Its examples are console
// pages in iframes at a console's width (frames.tsx), and one embedded shell in the page; the
// anatomy draws the default shell inside the figure, sized down, with its <main>.
import { AppShell } from "@qeetrix/react/experimental";
import { ConsoleSidebar, ConsoleTopBar, DRAWERS, UsersPage } from "../console";
import { FRAME_TESTED } from "../console-frame";
import { FrameOf } from "../FrameOf";
import type { ComponentDoc } from "../types";
import { examples } from "./examples";

export const appShell: ComponentDoc = {
  name: "App shell",
  slug: "app-shell",
  category: "console-frame",
  status: "experimental",
  since: "0.0.4",
  lede: "The frame of a Qeet console: the scope bar, the navigation, the page, and panels on the end edge.",
  exports: ["AppShell", "useAppShell"],
  renders: "<main>",
  source: "experimental/app-shell",
  story: "components/layout/app-shell.stories.tsx",
  examples,

  usage: {
    useFor: ["Every page of a Qeet console: one shell, around the routes."],
    notFor: [{ text: "A frame inside a page or a dialog", use: "Card" }],
    anatomyFigure: (
      <div className="qc-shell-figure">
        <AppShell
          topBar={<ConsoleTopBar />}
          sidebar={<ConsoleSidebar label="Qeet ID, figure" />}
          drawers={DRAWERS}
          defaultActiveDrawer="help"
          mainId="figure-main"
        >
          <UsersPage summary={false} />
        </AppShell>
      </div>
    ),
    anatomy: [
      { slot: "app-shell-top", element: "<div>", note: "The scope bar: a TopBar, full width." },
      {
        slot: "app-shell-nav",
        element: "<div>",
        note: "The navigation: a Sidebar, ruled; it collapses to a rail.",
      },
      {
        slot: "app-shell-main",
        element: "<main>",
        note: "The page: a PageHeader and PageContent. The skip link targets it.",
      },
      { slot: "app-shell-panel", element: "<aside>", note: "An open panel, beside the page." },
    ],
    rules: [
      {
        title: "One shell, around every route",
        doLine: "The shell mounts once; routes change the page inside it.",
        dontLine: "A shell per page: the bar and the navigation redraw, and the rail forgets.",
        doIt: (
          <FrameOf
            window={1280}
            height="640px"
            id="app-shell"
            query="?plain&collapsed"
            title="Do: one shell around the routes"
          />
        ),
        dontIt: (
          <FrameOf
            window={1280}
            height="640px"
            id="page-header-minimal"
            title="Don't: a page with no shell around it"
          />
        ),
      },
    ],
    content: [
      "Name the Sidebar for the product: it names the navigation landmark.",
      "Panels have short labels: Help, Activity, Qeet AI.",
      "Banners for the whole app; notifications for this page.",
    ],
  },

  api: {
    props: [
      { name: "topBar", type: "ReactNode", default: "—", note: "The global bar: a TopBar." },
      { name: "sidebar", type: "ReactNode", default: "—", note: "The navigation: a Sidebar." },
      {
        name: "drawers",
        type: "{ id, label, icon, content, badge?, width?, resizable? }[]",
        default: "—",
        note: "End-edge panels; their triggers sit in the TopBar. width, 320 by default; resizable, a splitter on its start edge.",
      },
      {
        name: "activeDrawer · defaultActiveDrawer · onActiveDrawerChange",
        type: "string | null",
        default: "null",
        note: "The open panel's id.",
      },
      {
        name: "sidebarCollapsed · defaultSidebarCollapsed · onSidebarCollapsedChange",
        type: "boolean",
        default: "false",
        note: "The rail. Persist it in the user's settings.",
      },
      {
        name: "banners",
        type: "ReactNode",
        default: "—",
        note: 'Page banners: Alerts with variant="banner".',
      },
      {
        name: "notifications",
        type: "ReactNode",
        default: "—",
        note: "Page messages, above the page header.",
      },
      {
        name: "density",
        type: '"compact" | "default" | "comfortable" | "inherit"',
        default: '"compact"',
        note: "The frame's density: consoles are dense.",
      },
      {
        name: "mainId",
        type: "string",
        default: '"main"',
        note: "The main region's id, for the skip link.",
      },
      {
        name: "embedded",
        type: "boolean",
        default: "false",
        note: "A shell inside a page, a preview: it fills its box, with no <main> or skip link; its layout follows the box.",
      },
      {
        name: "useAppShell()",
        type: "{ collapsed }",
        default: "—",
        note: "The shell's state, for content in its bar or sidebar.",
      },
    ],
    parts: [
      { slot: "app-shell", element: "<div>", note: "The frame; 100dvh tall." },
      { slot: "app-shell-top", element: "<div>", note: "The bar." },
      { slot: "app-shell-nav", element: "<div>", note: "The navigation column, sticky." },
      { slot: "app-shell-collapse", element: "<button>", note: "Collapse, or Expand." },
      { slot: "app-shell-main", element: "<main>", note: "The page; a <div> when embedded." },
      {
        slot: "app-shell-panel",
        element: "<aside>",
        note: "An open panel; a drawer under 1200px.",
      },
    ],
    recipes: [
      {
        title: "Around your routes",
        line: "Put the shell in the root layout, so it survives navigation and the rail keeps its state.",
        file: "routes/__root.tsx",
        code: `export const Route = createRootRoute({
  component: () => (
    <AppShell topBar={<ConsoleTopBar />} sidebar={<ConsoleSidebar />} drawers={drawers}>
      <Outlet />
    </AppShell>
  ),
});`,
      },
    ],
  },

  accessibility: {
    keyboard: [
      {
        keys: ["Tab"],
        action: "First, the skip link to the page; then the bar, the navigation and the page.",
      },
      {
        keys: ["Esc"],
        action:
          "Closes the navigation drawer, on a narrow screen. A panel closes with its Close button.",
      },
    ],
    checks: [
      {
        check: "Landmarks",
        result: "The page is the one <main>; the navigation is named by the Sidebar's label.",
      },
      { check: "Skip link", result: "Built in, to mainId." },
      { check: "Rail", result: "Labels become tooltips and stay the accessible names." },
      {
        check: "Narrow",
        result: "Under 840px the navigation is a drawer behind the bar's menu button.",
      },
    ],
    tested: FRAME_TESTED,
  },

  changelog: [
    {
      version: "0.2.2",
      items: ["Embedded, its TopBar and PageHeader follow its box's width too, not the window's."],
    },
    {
      version: "0.2.0",
      items: [
        "embedded: a shell inside a page, laid out by its box.",
        "A panel's width, and resizable: a window-splitter handle on its start edge.",
      ],
    },
    { version: "0.1.0", items: ["Without a top bar, the frame leaves no empty band."] },
    { version: "0.0.8", items: ["banners: the slot for page banners, under the top bar."] },
    {
      version: "0.0.3",
      items: [
        "AppShell: the black scope bar across the full width; the ruled navigation column, which collapses to a 48px icon rail that expands while hovered or focused; the page; and end-edge panels opened from the bar.",
      ],
    },
  ],

  related: [
    { name: "Top bar", when: "Its bar" },
    { name: "Sidebar", when: "Its navigation" },
    { name: "Page header", when: "Each page's head" },
  ],
};
