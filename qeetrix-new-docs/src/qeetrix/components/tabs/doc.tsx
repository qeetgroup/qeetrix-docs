// Components › Tabs: its documentation, from @qeetrix/react 0.2.0 (tabs.d.ts, tabs.js), the
// Storybook stories (navigation/tabs.stories.tsx) and the changelog. Its examples switch live
// (Live.tsx); the figures are the real Tabs, drawn still: the selected tab carries the Ember bar
// from the first paint.
import { Badge, Tab, Tabs, TabsList, TabsPanel, Text } from "@qeetrix/react";
import { NAV_TESTED } from "../navigation";
import type { ComponentDoc } from "../types";
import { APP, examples, USER } from "./examples";

/** The anatomy's handle on the bar: a still figure never measures the sliding indicator, which
 *  stays hidden there while the tab draws the bar, so the mark needs a box of its own. */
const Bar = () => <span className="qc-tab-bar" aria-hidden="true" />;

/** Tabs drawn still: the real list, the selected one carrying the bar, and its panel. */
function StillTabs({
  tabs,
  selected,
  label,
  panel,
}: {
  tabs: Array<[value: string, label: string]>;
  selected: string;
  label: string;
  panel?: string;
}) {
  return (
    <div className="qc-tabs-stage">
      <Tabs defaultValue={selected}>
        <TabsList aria-label={label}>
          {tabs.map(([value, name]) => (
            <Tab key={value} value={value}>
              {name}
            </Tab>
          ))}
        </TabsList>
        {panel && (
          <TabsPanel value={selected} className="qc-tab-panel">
            <Text tone="subtle">{panel}</Text>
          </TabsPanel>
        )}
      </Tabs>
    </div>
  );
}

const user = USER.slice(0, 3).map(([value, label]): [string, string] => [value, label]);

export const tabs: ComponentDoc = {
  name: "Tabs",
  slug: "tabs",
  category: "navigation",
  status: "stable",
  since: "0.0.2",
  lede: "Views of the same thing, one at a time. One Tab stop; the arrow keys move between them.",
  exports: ["Tabs", "TabsList", "Tab", "TabsPanel"],
  renders: '<div role="tablist">',
  source: "tabs",
  story: "components/navigation/tabs.stories.tsx",
  examples,

  usage: {
    useFor: [
      "Views of one record: a user's profile, security and sessions.",
      "A few views of one card or panel, contained.",
      "A page header's sections, under the title.",
    ],
    notFor: [
      { text: "Steps to take in order", use: "Steps" },
      { text: "Sections to read one after another", use: "Accordion" },
      { text: "A filter or a mode for the same view", use: "Toggle group" },
    ],
    anatomyFigure: (
      <div className="qc-tabs-stage">
        <Tabs defaultValue="users">
          <TabsList aria-label="Payroll portal">
            {APP.slice(0, 3).map(([value, label, Icon]) => (
              <Tab
                key={value}
                value={value}
                icon={Icon}
                filledWhenSelected
                badge={value === "users" ? 642 : undefined}
              >
                {label}
                {value === "users" && <Bar />}
              </Tab>
            ))}
          </TabsList>
          <TabsPanel value="users" className="qc-tab-panel">
            <Text tone="subtle">Engineering, Finance and People</Text>
          </TabsPanel>
        </Tabs>
      </div>
    ),
    anatomy: [
      { slot: "tabs-list", element: '<div role="tablist">', note: "The tabs: one Tab stop." },
      {
        slot: "tab",
        select: '[data-slot="tab"][aria-selected="true"]',
        element: '<button role="tab">',
        note: "The selected tab: weight 600, its icon filled.",
      },
      { slot: "tab-badge", element: "<span>", note: "A count, on the label's baseline." },
      {
        slot: "tabs-indicator",
        select: ".qc-tab-bar",
        element: "<span>",
        note: "The Ember bar; it slides to a new tab.",
      },
      { slot: "tabs-panel", element: '<div role="tabpanel">', note: "The selected tab's view." },
    ],
    rules: [
      {
        title: "Views, not steps",
        doLine: "Views of one user, read in any order.",
        dontLine: "A flow in tabs: nothing says what's done. Use Steps.",
        doIt: <StillTabs tabs={user} selected="profile" label="Priya Sharma" />,
        dontIt: (
          <StillTabs
            tabs={[
              ["details", "1. Details"],
              ["members", "2. Members"],
              ["review", "3. Review"],
            ]}
            selected="details"
            label="New group"
          />
        ),
      },
      {
        title: "A word or two",
        doLine: "Short nouns: the page says whose they are.",
        dontLine: "Labels that repeat the page, and scroll.",
        doIt: <StillTabs tabs={user} selected="security" label="Priya Sharma" />,
        dontIt: (
          <StillTabs
            tabs={[
              ["profile", "Priya's profile"],
              ["security", "Priya's security settings"],
              ["sessions", "Priya's sessions"],
            ]}
            selected="security"
            label="Priya Sharma"
          />
        ),
      },
      {
        title: "Counts that help choose",
        doLine: "One count, where it says what's waiting.",
        dontLine: "A count on every tab: nothing stands out.",
        doIt: (
          <div className="qc-tabs-stage">
            <Tabs defaultValue="all">
              <TabsList aria-label="Users, one count">
                <Tab value="all">All</Tab>
                <Tab value="invited" badge={<Badge tone="info">12</Badge>}>
                  Invited
                </Tab>
                <Tab value="blocked">Blocked</Tab>
              </TabsList>
            </Tabs>
          </div>
        ),
        dontIt: (
          <div className="qc-tabs-stage">
            <Tabs defaultValue="all">
              <TabsList aria-label="Users, every count">
                <Tab value="all" badge={1284}>
                  All
                </Tab>
                <Tab value="invited" badge={12}>
                  Invited
                </Tab>
                <Tab value="blocked" badge={3}>
                  Blocked
                </Tab>
              </TabsList>
            </Tabs>
          </div>
        ),
      },
    ],
    content: [
      "One or two words, nouns: Profile, Security, Sessions.",
      "Sentence case. Icons on every tab, or none.",
      "Name the list with aria-label: the page's subject.",
    ],
  },

  api: {
    props: [
      {
        name: "Tabs: value · defaultValue",
        type: "string",
        default: "the first tab",
        note: "The selected tab's value.",
      },
      {
        name: "Tabs: onValueChange",
        type: "(value, details) => void",
        default: "—",
        note: "Called with the new value.",
      },
      {
        name: "Tabs: orientation",
        type: '"horizontal" | "vertical"',
        default: '"horizontal"',
        note: "Vertical carries the line and the bar on the start edge.",
      },
      {
        name: "TabsList: variant",
        type: '"line" | "contained"',
        default: '"line"',
        note: "Line for a page's views; contained, a segmented strip, for a card's.",
      },
      {
        name: "TabsList: activateOnFocus",
        type: "boolean",
        default: "true",
        note: "Select as focus moves; off for slow panels, so Enter or Space selects.",
      },
      {
        name: "Tab: value",
        type: "string",
        default: "required",
        note: "Matches its TabsPanel's value.",
      },
      {
        name: "Tab: icon · filledWhenSelected",
        type: "QeetrixIcon · boolean",
        default: "— · false",
        note: "A 16px leading icon, filled while selected (for icons that have a filled drawing).",
      },
      {
        name: "Tab: badge",
        type: "ReactNode",
        default: "—",
        note: "A number, formatted for the locale as a neutral Badge; or your own Badge.",
      },
      {
        name: "Tab: disabled",
        type: "boolean",
        default: "false",
        note: "Can't be selected; it stays reachable by the arrow keys, so it's read.",
      },
      {
        name: "TabsPanel: keepMounted",
        type: "boolean",
        default: "false",
        note: "Keep a hidden panel in the page, so its state survives.",
      },
    ],
    parts: [
      { slot: "tabs", element: "<div>", note: "The root: data-orientation." },
      { slot: "tabs-list", element: '<div role="tablist">', note: "data-variant." },
      { slot: "tab", element: '<button role="tab">', note: "aria-selected; data-active." },
      { slot: "tab-label", element: "<span>", note: "The label and its count." },
      { slot: "tab-badge", element: "<span>", note: "The count." },
      { slot: "tabs-indicator", element: "<span>", note: "The bar." },
      { slot: "tabs-panel", element: '<div role="tabpanel">', note: "One view." },
    ],
    recipes: [
      {
        title: "In the address",
        line: "Keep the view in the URL, so it can be shared and Back returns to it.",
        file: "user-page.tsx",
        code: `const { tab = "profile" } = useSearch();

<Tabs value={tab} onValueChange={(value) => navigate({ search: { tab: value } })}>
  …
</Tabs>`,
      },
      {
        title: "Sub-pages",
        line: "Views that are pages of their own, each a route: TabNav, links drawn as tabs.",
        file: "users-layout.tsx",
        code: `import { TabNav, TabNavLink } from "@qeetrix/react";

<TabNav aria-label="Users">
  <TabNavLink render={<RouterLink to="/users" />}>All users</TabNavLink>
  <TabNavLink render={<RouterLink to="/users/invitations" />} badge={12}>Invitations</TabNavLink>
</TabNav>`,
      },
      {
        title: "Under a page header",
        line: "PageHeader takes a TabsList in tabs; wrap the header and the panels in one Tabs.",
        file: "application-page.tsx",
        code: `import { PageContent, PageHeader } from "@qeetrix/react/experimental";

<Tabs defaultValue="users">
  <PageHeader title="Payroll portal" tabs={<TabsList aria-label="Payroll portal">…</TabsList>} />
  <PageContent>
    <TabsPanel value="users">…</TabsPanel>
  </PageContent>
</Tabs>`,
      },
    ],
  },

  accessibility: {
    keyboard: [
      { keys: ["Tab"], action: "To the selected tab, then on to its panel." },
      {
        keys: ["←", "→"],
        action: "The previous or next tab, selected as it's reached. Up and Down when vertical.",
      },
      { keys: ["Home", "End"], action: "The first or last tab." },
      { keys: ["Enter", "Space"], action: "Selects the focused tab, when activateOnFocus is off." },
    ],
    checks: [
      {
        check: "Roles",
        result: "tablist, tab with aria-selected, and tabpanel, each panel labelled by its tab.",
      },
      { check: "Name", result: "The list is named by its aria-label." },
      { check: "Right to left", result: "The arrow keys follow the reading way." },
      {
        check: "Forced colours",
        result: "The bar is drawn in Highlight, the line in CanvasText.",
      },
    ],
    tested: NAV_TESTED,
  },

  changelog: [
    {
      version: "0.2.0",
      items: [
        "The selected tab carries the Ember bar from the first paint, before React runs.",
        "TabNav and TabNavLink: sub-pages as links, drawn as tabs.",
      ],
    },
    {
      version: "0.1.0",
      items: [
        'TabsList variant="contained": a segmented strip.',
        "Tab badge: a count, formatted for the locale.",
        "A 12px count sits on the label's baseline.",
      ],
    },
    {
      version: "0.0.2",
      items: [
        "Tabs, TabsList, Tab and TabsPanel: the 3px Ember bar slides under the selected tab; a selected tab has weight 600 and can fill its icon; 12px padding at compact density, 16px otherwise; activateOnFocus on by default; vertical tabs carry the line and the bar on the start edge.",
      ],
    },
  ],

  related: [
    { name: "Toggle group", when: "A mode, not a view" },
    { name: "Steps", when: "A flow in order" },
    { name: "Accordion", when: "Sections stacked" },
  ],
};
