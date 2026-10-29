// Components › Top bar: its documentation, from @qeetrix/react 0.2.0 (experimental/top-bar), the
// Storybook stories (navigation/top-bar.stories.tsx) and the changelog. Its examples run live
// (Live.tsx); the figures are the real TopBar, server-rendered.
import { QeetLogo } from "@qeetrix/icons";
import { Avatar } from "@qeetrix/react";
import { TopBar, TopBarSwitcher } from "@qeetrix/react/experimental";
import { ConsoleTopBar, routerLink } from "../console";
import { FRAME_TESTED } from "../console-frame";
import type { ComponentDoc } from "../types";
import { examples } from "./examples";

export const topBar: ComponentDoc = {
  name: "Top bar",
  slug: "top-bar",
  category: "console-frame",
  status: "experimental",
  since: "0.0.4",
  lede: "The scope bar of a Qeet console: the product, where you are in it, search, tools and account.",
  exports: ["TopBar", "TopBarSwitcher", "TopBarSearch"],
  renders: "<header>",
  source: "experimental/top-bar",
  story: "components/navigation/top-bar.stories.tsx",
  examples,

  usage: {
    useFor: [
      "The top of every console page, in AppShell's topBar.",
      "Switching the organisation or the environment.",
    ],
    notFor: [
      { text: "A page's own title and actions", use: "Page header" },
      { text: "The product's sections", use: "Sidebar" },
    ],
    anatomyFigure: (
      <div className="qc-bar-figure">
        <ConsoleTopBar search={false} />
      </div>
    ),
    anatomy: [
      {
        slot: "top-bar-launcher",
        element: "<div>",
        note: "The suite launcher: a Menu of Qeet products.",
      },
      { slot: "top-bar-identity", element: "<a>", note: "The mark and the product's name: home." },
      {
        slot: "top-bar-switcher",
        element: "<button>",
        note: "A step of the scope path; it opens a Menu.",
      },
      { slot: "avatar", element: '<span role="img">', note: "The account, after a rule." },
    ],
    rules: [
      {
        title: "The status in words",
        doLine: "The environment named, its dot beside it.",
        dontLine: "A dot alone: which one is Production?",
        doIt: (
          <div className="qc-bar-wide">
            <TopBar
              aria-label="Qeet ID, named"
              logo={<QeetLogo variant="dark" height={20} />}
              product="Qeet ID"
              href="#home"
              render={routerLink}
              context={<TopBarSwitcher status="success" label="Production" />}
            />
          </div>
        ),
        dontIt: (
          <div className="qc-bar-wide">
            <TopBar
              aria-label="Qeet ID, a dot"
              logo={<QeetLogo variant="dark" height={20} />}
              product="Qeet ID"
              href="#home"
              render={routerLink}
              context={<TopBarSwitcher status="success" label="Env 1" />}
            />
          </div>
        ),
      },
      {
        title: "Tools, not pages",
        doLine: "A few utility buttons: settings, notifications.",
        dontLine: "The product's sections in the bar: they belong in the Sidebar.",
        doIt: (
          <div className="qc-bar-wide">
            <TopBar
              aria-label="Qeet ID, tools"
              logo={<QeetLogo variant="dark" height={20} />}
              product="Qeet ID"
              account={<Avatar name="Priya Sharma" size="sm" />}
            />
          </div>
        ),
        dontIt: (
          <div className="qc-bar-wide">
            <TopBar
              aria-label="Qeet ID, sections"
              logo={<QeetLogo variant="dark" height={20} />}
              product="Qeet ID"
              context={
                <>
                  <TopBarSwitcher label="Users" />
                  <TopBarSwitcher label="Groups" />
                </>
              }
            />
          </div>
        ),
      },
    ],
    content: [
      "product is the product's name: Qeet ID.",
      "The scope path outermost first: organisation, then environment.",
      'The search placeholder is its name: "Search or jump to…".',
    ],
  },

  api: {
    props: [
      {
        name: "product",
        type: "string",
        default: "required",
        note: 'The product\'s name: "Qeet ID".',
      },
      {
        name: "logo",
        type: "ReactNode",
        default: "—",
        note: 'The mark: <QeetLogo variant="dark" height={20} />.',
      },
      {
        name: "href · render",
        type: "string · ReactElement",
        default: "—",
        note: "The identity's link home; a router link.",
      },
      {
        name: "launcher",
        type: "ReactNode",
        default: "—",
        note: "A Menu of Qeet products behind a neutral IconButton.",
      },
      {
        name: "context",
        type: "ReactNode",
        default: "—",
        note: "The scope path: TopBarSwitchers, a slash before each.",
      },
      {
        name: "search",
        type: "ReactNode",
        default: "—",
        note: "A TopBarSearch, centred; hidden below 840px.",
      },
      {
        name: "actions",
        type: "ReactNode",
        default: "—",
        note: "Neutral IconButtons, after the AppShell's panel triggers.",
      },
      {
        name: "account",
        type: "ReactNode",
        default: "—",
        note: "An Avatar trigger, after a rule.",
      },
      {
        name: "TopBarSwitcher: label · mark · status",
        type: "ReactNode · ReactNode · status",
        default: "—",
        note: "The current scope; a small square of initials or a logo; a dot for an environment.",
      },
      {
        name: "TopBarSearch: placeholder · shortcut",
        type: "string · string[]",
        default: "required · —",
        note: "The prompt, which names it; the keys shown at its end. Wire the shortcut yourself.",
      },
    ],
    parts: [
      {
        slot: "top-bar",
        element: "<header>",
        note: "Dark in both schemes, under a 2px Ember line.",
      },
      { slot: "top-bar-identity", element: "<a>", note: "The mark and the name." },
      { slot: "top-bar-switcher", element: "<button>", note: "A scope step." },
      { slot: "top-bar-search-trigger", element: "<button>", note: "The search." },
    ],
    recipes: [
      {
        title: "The search shortcut",
        line: "TopBarSearch shows the keys; the product wires them, and opens its CommandPalette.",
        file: "console-top-bar.tsx",
        code: `const [open, setOpen] = useState(false);

<TopBarSearch placeholder="Search or jump to…" shortcut={["⌘", "K"]} aria-keyshortcuts="Meta+K Control+K" onClick={() => setOpen(true)} />
<CommandPalette open={open} onOpenChange={setOpen} … />`,
      },
    ],
  },

  accessibility: {
    keyboard: [
      { keys: ["Tab"], action: "Launcher, home, the scope path, search, tools, account." },
      { keys: ["Enter", "Space"], action: "Opens a switcher's menu or the search." },
    ],
    checks: [
      { check: "Status", result: "An environment's dot is never alone: its label names it." },
      {
        check: "Search",
        result:
          "Named by its placeholder. Pass aria-keyshortcuts, so its shortcut is announced too.",
      },
      { check: "Narrow", result: "Below 600px the tools gather in one named menu." },
    ],
    tested: FRAME_TESTED,
  },

  changelog: [
    {
      version: "0.2.2",
      items: [
        "Inside an embedded AppShell it goes compact by the shell's box, not the window.",
      ],
    },
    {
      version: "0.1.0",
      items: [
        "A compact layout: below 840px the scope path collapses into one switcher; below 600px the product name hides behind the logo and the panel tools gather in one menu.",
      ],
    },
    {
      version: "0.0.3",
      items: [
        "TopBar, TopBarSwitcher and TopBarSearch: the console's scope bar, black in both schemes, topped by a 2px Ember line.",
      ],
    },
  ],

  related: [
    { name: "App shell", when: "Where it sits" },
    { name: "Command palette", when: "What search opens" },
    { name: "Menu", when: "The switchers' menus" },
  ],
};
