// Components › Sidebar: its documentation, from @qeetrix/react 0.2.0 (experimental/sidebar), the
// Storybook stories (navigation/sidebar.stories.tsx) and the changelog. Its examples run live
// (Live.tsx); the figures are the real Sidebar, server-rendered.
import { HouseIcon } from "@qeetrix/icons/icons/house";
import { UsersIcon } from "@qeetrix/icons/icons/users";
import { Sidebar, SidebarGroup, SidebarItem } from "@qeetrix/react/experimental";
import type { ReactNode } from "react";
import { routerLink } from "../console";
import { FRAME_TESTED } from "../console-frame";
import type { ComponentDoc } from "../types";
import { examples, Nested } from "./examples";

const Column = ({ children }: { children: ReactNode }) => (
  <div className="qc-side-stage" data-short="">
    {children}
  </div>
);

export const sidebar: ComponentDoc = {
  name: "Sidebar",
  slug: "sidebar",
  category: "console-frame",
  status: "experimental",
  since: "0.0.4",
  lede: "A console's navigation: links only, in groups, one level of nesting, every item in the Tab order.",
  exports: ["Sidebar", "SidebarGroup", "SidebarItem"],
  renders: "<nav>",
  source: "experimental/sidebar",
  story: "components/navigation/sidebar.stories.tsx",
  examples,

  usage: {
    useFor: ["A console's sections, in AppShell's sidebar.", "A docs site's pages, as this one's."],
    notFor: [
      { text: "Views of one page", use: "Tabs" },
      { text: "A hierarchy of data", use: "Tree view" },
      { text: "Actions", use: "Menu" },
    ],
    anatomyFigure: (
      <div className="qc-side-figure">
        <Nested label="Qeet ID, anatomy" />
      </div>
    ),
    anatomy: [
      {
        slot: "sidebar-group-label",
        element: "<div>",
        note: "A group's label, tracked small capitals.",
      },
      {
        slot: "current",
        select: '[aria-current="page"]',
        element: '<a aria-current="page">',
        note: "The current page: the Ember bar, weight 600.",
      },
      {
        slot: "sidebar-item-badge",
        element: "<span>",
        note: "A count or a Badge; hidden in the rail.",
      },
      {
        slot: "category",
        select: '[data-slot="sidebar-item"] > button',
        element: "<button>",
        note: "A category: it opens and closes its items.",
      },
      {
        slot: "disabled",
        select: '[aria-disabled="true"]',
        element: '<a aria-disabled="true">',
        note: "Outside the plan: greyed, out of the Tab order, still found by a screen reader.",
      },
    ],
    rules: [
      {
        title: "Destinations, not actions",
        doLine: "Pages to go to, each a link.",
        dontLine: "Invite and Export among the pages: actions belong on the page.",
        doIt: (
          <Column>
            <Sidebar label="Qeet ID, destinations">
              <SidebarGroup label="Directory">
                <SidebarItem
                  label="Users"
                  href="#users"
                  render={routerLink}
                  icon={UsersIcon}
                  current
                />
                <SidebarItem
                  label="Overview"
                  href="#overview"
                  render={routerLink}
                  icon={HouseIcon}
                />
              </SidebarGroup>
            </Sidebar>
          </Column>
        ),
        dontIt: (
          <Column>
            <Sidebar label="Qeet ID, actions">
              <SidebarGroup label="Directory">
                <SidebarItem
                  label="Users"
                  href="#users"
                  render={routerLink}
                  icon={UsersIcon}
                  current
                />
                <SidebarItem label="Invite users" href="#invite" render={routerLink} />
                <SidebarItem label="Export CSV" href="#export" render={routerLink} />
              </SidebarGroup>
            </Sidebar>
          </Column>
        ),
      },
    ],
    content: [
      "Labels are the pages' titles, short: Users, Audit logs.",
      "Group labels name an area: Directory, Security.",
      "Icons, round, for destinations; on every top item, or none.",
    ],
  },

  api: {
    props: [
      {
        name: "label",
        type: "string",
        default: "required",
        note: 'Names the navigation landmark: "Qeet ID".',
      },
      { name: "title", type: "ReactNode", default: "—", note: 'The area\'s heading: "Identity".' },
      {
        name: "filter",
        type: "boolean",
        default: "false",
        note: '"Filter navigation": narrows the items as you type.',
      },
      {
        name: "footer",
        type: "ReactNode",
        default: "—",
        note: "Below the items: help, what's new.",
      },
      {
        name: "SidebarGroup: label",
        type: "ReactNode",
        default: "—",
        note: "Without one, space alone separates it.",
      },
      {
        name: "SidebarItem: label",
        type: "string",
        default: "required",
        note: "The text; in the rail, the tooltip.",
      },
      {
        name: "SidebarItem: href · render",
        type: "string · ReactElement",
        default: "—",
        note: "Where it goes; a router link.",
      },
      {
        name: "SidebarItem: icon · filledWhenCurrent",
        type: "QeetrixIcon · boolean",
        default: "— · false",
        note: "A 16px round icon; filled while current.",
      },
      {
        name: "SidebarItem: current",
        type: "boolean",
        default: "false",
        note: 'aria-current="page" and the Ember bar.',
      },
      {
        name: "SidebarItem: badge",
        type: "ReactNode",
        default: "—",
        note: "A count or a Badge at the end.",
      },
      {
        name: "SidebarItem: disabled",
        type: "boolean",
        default: "false",
        note: "Greyed, out of the Tab order; aria-disabled.",
      },
      {
        name: "SidebarItem: children · defaultOpen",
        type: "SidebarItem[] · boolean",
        default: "— · holds the current",
        note: "One level of items: a category, open when it holds the current page.",
      },
    ],
    parts: [
      { slot: "sidebar", element: "<div>", note: "The column." },
      { slot: "sidebar-nav", element: "<nav>", note: "The landmark, named by label." },
      { slot: "sidebar-group", element: "<div>", note: "A group, between hairlines." },
      { slot: "sidebar-group-label", element: "<div>", note: "Its label." },
      { slot: "sidebar-item", element: "<li>", note: "An item: its link, or a category's button." },
      { slot: "sidebar-item-badge", element: "<span>", note: "The count." },
    ],
    recipes: [
      {
        title: "With your router",
        line: "render takes the router's link; current comes from the route.",
        file: "console-sidebar.tsx",
        code: `const { pathname } = useLocation();

<SidebarItem label="Users" href="/users" render={<Link to="/users" />} current={pathname.startsWith("/users")} icon={UsersIcon} />`,
      },
    ],
  },

  accessibility: {
    keyboard: [
      { keys: ["Tab"], action: "Each available item in turn: every item is a Tab stop." },
      { keys: ["Enter"], action: "Follows a link." },
      { keys: ["Enter", "Space"], action: "Opens or closes a category." },
    ],
    checks: [
      { check: "Landmark", result: "A navigation landmark, named by label." },
      { check: "Current", result: 'aria-current="page"; a closed category carries the mark too.' },
      {
        check: "Disabled",
        result: "A link with aria-disabled: out of the Tab order, still in the list.",
      },
      { check: "Hindi", result: 'Under lang="hi", group labels lose their tracking.' },
    ],
    tested: FRAME_TESTED,
  },

  changelog: [
    { version: "0.1.0", items: ["A 12px count sits on the label's baseline."] },
    {
      version: "0.0.3",
      items: [
        "Sidebar, SidebarGroup and SidebarItem: links only, one level of nesting, every item in the Tab order; the current page gets aria-current, the 3px Ember bar, weight 600 and an Ember icon; groups between hairlines under tracked small capitals; in the rail, labels become tooltips.",
      ],
    },
  ],

  related: [
    { name: "App shell", when: "Where it sits" },
    { name: "Top bar", when: "Above it" },
    { name: "Breadcrumb", when: "Below the top level" },
  ],
};
