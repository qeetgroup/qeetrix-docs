// Components › Breadcrumb: its documentation, from @qeetrix/react 0.2.0 (experimental/breadcrumb),
// the Storybook stories (navigation/breadcrumb.stories.tsx) and the changelog. Server-safe: its
// examples and figures are rendered with the page.
import { Breadcrumb, BreadcrumbItem } from "@qeetrix/react/experimental";
import { NAV_TESTED } from "../navigation";
import type { ComponentDoc } from "../types";
import { Crumbs, examples, Trail } from "./examples";

export const breadcrumb: ComponentDoc = {
  name: "Breadcrumb",
  slug: "breadcrumb",
  category: "navigation",
  status: "experimental",
  since: "0.0.4",
  lede: "Where the page sits: links up the hierarchy, and the current page last. Server-safe.",
  exports: ["Breadcrumb", "BreadcrumbItem"],
  renders: '<nav aria-label="Breadcrumb">',
  source: "experimental/breadcrumb",
  story: "components/navigation/breadcrumb.stories.tsx",
  examples,

  usage: {
    useFor: [
      "A record's page, two or more levels down: Directory › Users › Priya Sharma.",
      "A page header, above the title.",
    ],
    notFor: [
      { text: "One level down: a single way back", use: "Link" },
      { text: "Steps of a flow", use: "Steps" },
      { text: "Views of the same page", use: "Tabs" },
    ],
    anatomyFigure: <Trail />,
    anatomy: [
      { slot: "breadcrumb", element: "<nav>", note: 'A landmark, named "Breadcrumb".' },
      {
        slot: "link",
        select: ".qx-breadcrumb-link",
        element: "<a>",
        note: "A level up; your router's link through render.",
      },
      {
        slot: "separator",
        select: '[data-slot="breadcrumb-item"] + [data-slot="breadcrumb-item"] > svg',
        element: "<svg>",
        note: "A 12px chevron, hidden from screen readers; it mirrors right to left.",
      },
      {
        slot: "current",
        select: ".qx-breadcrumb-current",
        element: '<span aria-current="page">',
        note: "This page: text, not a link.",
      },
    ],
    rules: [
      {
        title: "Start at the section",
        doLine: "From the section the sidebar is on: the sidebar holds the top.",
        dontLine: "Home and the product first: the trail is long, and its labels truncate.",
        doIt: (
          <Crumbs>
            <Trail label="Breadcrumb, from the section" />
          </Crumbs>
        ),
        dontIt: (
          <Crumbs>
            <Breadcrumb label="Breadcrumb, from home">
              <BreadcrumbItem href="#home">Home</BreadcrumbItem>
              <BreadcrumbItem href="#qeet-id">Qeet ID</BreadcrumbItem>
              <BreadcrumbItem href="#directory">Directory</BreadcrumbItem>
              <BreadcrumbItem href="#users">Users</BreadcrumbItem>
              <BreadcrumbItem current>Priya Sharma</BreadcrumbItem>
            </Breadcrumb>
          </Crumbs>
        ),
      },
      {
        title: "The hierarchy, not the history",
        doLine: "Where the page sits, the same however you came.",
        dontLine: "The pages visited, in order.",
        doIt: (
          <Crumbs>
            <Trail label="Breadcrumb, the hierarchy" />
          </Crumbs>
        ),
        dontIt: (
          <Crumbs>
            <Breadcrumb label="Breadcrumb, the history">
              <BreadcrumbItem href="#users">Users</BreadcrumbItem>
              <BreadcrumbItem href="#groups">Groups</BreadcrumbItem>
              <BreadcrumbItem href="#users">Users</BreadcrumbItem>
              <BreadcrumbItem current>Priya Sharma</BreadcrumbItem>
            </Breadcrumb>
          </Crumbs>
        ),
      },
    ],
    content: [
      "Each page's own title, shortened only if it must be.",
      "The current page last, as plain text: a link to it goes nowhere.",
      "No separators in the text: the chevrons are drawn.",
    ],
  },

  api: {
    props: [
      {
        name: "label",
        type: "string",
        default: '"Breadcrumb"',
        note: "Names the landmark. Server-safe, so the provider's strings don't reach it: pass a translation. aria-label overrides it.",
      },
      {
        name: "children",
        type: "BreadcrumbItem[]",
        default: "required",
        note: "The items, the current page last.",
      },
      {
        name: "BreadcrumbItem: href",
        type: "string",
        default: "—",
        note: "Where it goes. The current item takes none.",
      },
      {
        name: "BreadcrumbItem: render",
        type: "ReactElement",
        default: "an <a>",
        note: 'A router link instead: render={<Link to="/users" />}.',
      },
      {
        name: "BreadcrumbItem: current",
        type: "boolean",
        default: "false",
        note: 'The current page: plain text, aria-current="page".',
      },
      {
        name: "BreadcrumbItem: children",
        type: "ReactNode",
        default: "required",
        note: "The page's name; past 240px it truncates and, as text, keeps a title.",
      },
    ],
    parts: [
      { slot: "breadcrumb", element: "<nav>", note: "The landmark, holding an <ol>." },
      {
        slot: "breadcrumb-item",
        element: "<li>",
        note: "One level: its separator, then its link.",
      },
    ],
    recipes: [
      {
        title: "With your router",
        line: "render gives the item your router's link; href still goes on the item.",
        file: "user-page.tsx",
        code: `import { Link } from "@tanstack/react-router";

<BreadcrumbItem href="/directory/users" render={<Link to="/directory/users" />}>
  Users
</BreadcrumbItem>`,
      },
    ],
  },

  accessibility: {
    keyboard: [
      { keys: ["Tab"], action: "To each link in turn; the current page isn't a stop." },
      { keys: ["Enter"], action: "Follows the link." },
    ],
    checks: [
      { check: "Landmark", result: 'A navigation landmark, named "Breadcrumb" or by label.' },
      { check: "List", result: "An ordered list: its length and each position are read." },
      { check: "Current", result: 'aria-current="page" on the last item.' },
      { check: "Separators", result: "aria-hidden: never read." },
      { check: "Right to left", result: "The chevrons mirror." },
    ],
    tested: NAV_TESTED,
  },

  changelog: [
    { version: "0.1.0", items: ["Takes an aria-label over its label."] },
    {
      version: "0.0.3",
      items: [
        "Breadcrumb and BreadcrumbItem: server-safe; mirrored chevrons; long labels truncate and keep a title.",
      ],
    },
  ],

  related: [
    { name: "Page header", when: "Where it sits" },
    { name: "Link", when: "One way back" },
    { name: "Sidebar", when: "The top of the hierarchy" },
  ],
};
