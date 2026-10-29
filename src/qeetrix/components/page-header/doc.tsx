// Components › Page header: its documentation, from @qeetrix/react 0.2.0
// (experimental/page-header), the Storybook stories (layout/page-header.stories.tsx) and the
// changelog. Its examples run live, their titles an <h3> (headingLevel); the phone's is a page in an
// iframe (frames.tsx). The anatomy keeps the default <h1>, inside a figure hidden from assistive
// technology.
import { Badge, Button } from "@qeetrix/react";
import { PageHeader } from "@qeetrix/react/experimental";
import { UsersActions, UsersBreadcrumb } from "../console";
import { FRAME_TESTED } from "../console-frame";
import type { ComponentDoc } from "../types";
import { examples } from "./examples";

export const pageHeader: ComponentDoc = {
  name: "Page header",
  slug: "page-header",
  category: "console-frame",
  status: "experimental",
  since: "0.0.4",
  lede: "The head of a console page: where it sits, its title and count, actions, key numbers and tabs, on a ruled band.",
  exports: ["PageHeader", "PageHeaderBack", "PageContent"],
  renders: "<h1>",
  source: "experimental/page-header",
  story: "components/layout/page-header.stories.tsx",
  examples,

  usage: {
    useFor: [
      "Every console page, as its first child.",
      "A record's page, with a back link and its status.",
    ],
    notFor: [
      { text: "A section inside a page", use: "Card" },
      { text: "A dialog's title", use: "Dialog" },
    ],
    anatomyFigure: (
      <div className="qc-header-figure">
        <PageHeader
          breadcrumb={<UsersBreadcrumb />}
          title="Users"
          count={1284}
          status={<Badge tone="success">Synced</Badge>}
          description="People who can sign in to Acme Pvt Ltd's applications."
          actions={<UsersActions />}
        />
      </div>
    ),
    anatomy: [
      {
        slot: "breadcrumb",
        element: "<nav>",
        note: "Where the page sits; or back, one level down.",
      },
      {
        slot: "title",
        select: '[data-slot="page-header"] h1',
        element: "<h1>",
        note: "The page's one <h1>.",
      },
      {
        slot: "page-header-count",
        element: "<span>",
        note: "A number beside the title, for the locale.",
      },
      { slot: "badge", element: "<span>", note: "status: a Badge beside the title." },
      { slot: "page-header-description", element: "<p>", note: "One line under the title." },
      {
        slot: "page-header-actions",
        element: "<div>",
        note: "The primary last: one solid, one soft at most.",
      },
    ],
    rules: [
      {
        title: "One primary, last",
        doLine: "Export soft, Add endpoint solid at the end.",
        dontLine: "Three solid buttons: nothing leads.",
        doIt: (
          <div className="qc-header-figure">
            <PageHeader
              headingLevel={3}
              title="Webhooks"
              actions={
                <>
                  <Button variant="soft">Export</Button>
                  <Button>Add endpoint</Button>
                </>
              }
            />
          </div>
        ),
        dontIt: (
          <div
            className="qc-header-figure"
            role="img"
            aria-label="Don't: three solid actions in a page header"
          >
            <div inert>
              <PageHeader
                headingLevel={3}
                title="Webhooks"
                actions={
                  <>
                    <Button>Test</Button>
                    <Button>Export</Button>
                    <Button>Add endpoint</Button>
                  </>
                }
              />
            </div>
          </div>
        ),
      },
    ],
    content: [
      "The title is the page's name in the sidebar: Users.",
      "The description, one line: what the page holds.",
      "Actions are verbs: Invite users, Export.",
    ],
  },

  api: {
    props: [
      {
        name: "title",
        type: "ReactNode",
        default: "required",
        note: "The page title: the page's one <h1>.",
      },
      {
        name: "headingLevel",
        type: "1 | 2 | 3 | 4 | 5 | 6",
        default: "1",
        note: "The title's level, inside another page: a preview, a docs example. It looks the same.",
      },
      {
        name: "leading",
        type: "ReactNode",
        default: "—",
        note: "A record's logo or Avatar (decorative) before the title, outside the heading.",
      },
      {
        name: "breadcrumb",
        type: "ReactNode",
        default: "—",
        note: "Where the page sits: a Breadcrumb.",
      },
      {
        name: "back",
        type: "ReactNode",
        default: "—",
        note: "A PageHeaderBack, for a page one level down; instead of a breadcrumb.",
      },
      {
        name: "count",
        type: "ReactNode",
        default: "—",
        note: "A number beside the title, formatted for the locale.",
      },
      { name: "status", type: "ReactNode", default: "—", note: "A Badge beside the title." },
      { name: "description", type: "ReactNode", default: "—", note: "One line under the title." },
      {
        name: "actions",
        type: "ReactNode",
        default: "—",
        note: "Buttons at the end: the primary last.",
      },
      {
        name: "summary",
        type: "ReactNode",
        default: "—",
        note: "A StatGroup, edge to edge under the title.",
      },
      {
        name: "tabs",
        type: "ReactNode",
        default: "—",
        note: "A TabsList at the foot, its rule edge to edge.",
      },
      {
        name: "PageHeaderBack: href · render · children",
        type: "…",
        default: '"Back"',
        note: 'An arrow and the parent\'s name, read "Back to Users".',
      },
      {
        name: "PageContent: width",
        type: '"full" | "narrow"',
        default: '"full"',
        note: "full for tables; narrow, 800px, for forms and records.",
      },
    ],
    parts: [
      { slot: "page-header", element: "<div>", note: "The ruled band." },
      { slot: "page-header-count", element: "<span>", note: "The count." },
      { slot: "page-header-description", element: "<p>", note: "The line under the title." },
      { slot: "page-header-actions", element: "<div>", note: "The actions." },
      { slot: "page-header-summary", element: "<div>", note: "The key numbers." },
      { slot: "page-content", element: "<div>", note: "The work surface: data-width." },
    ],
    recipes: [
      {
        title: "Inside another page",
        line: "A preview in a drawer keeps the page's outline: headingLevel under the drawer's title.",
        file: "WebhookPreview.tsx",
        code: `<DrawerContent title="Preview">
  <DrawerBody>
    <PageHeader headingLevel={3} title="Webhooks" actions={<Button>Add endpoint</Button>} />
  </DrawerBody>
</DrawerContent>`,
      },
    ],
  },

  accessibility: {
    keyboard: [
      { keys: ["Tab"], action: "The breadcrumb or back link, then the actions, then the tabs." },
    ],
    checks: [
      { check: "Heading", result: "The title is the page's <h1>, or the headingLevel given." },
      { check: "Back", result: 'Its arrow points the reading way; it\'s read "Back to Users".' },
      { check: "Count", result: "Formatted for the provider's locale." },
    ],
    tested: FRAME_TESTED,
  },

  changelog: [
    {
      version: "0.2.2",
      items: ["Inside an embedded AppShell its gutter narrows by the shell's box, not the window."],
    },
    {
      version: "0.2.0",
      items: [
        "headingLevel: the title's level, default 1, for a header inside another page.",
        "leading: a record's logo or Avatar before the title.",
      ],
    },
    {
      version: "0.1.0",
      items: [
        "back and PageHeaderBack: a back link above the title, router-friendly.",
        "Its tabs sit on the gutter, with the rule edge to edge; count follows the provider's locale.",
      ],
    },
    {
      version: "0.0.3",
      items: [
        "PageHeader and PageContent: the head of a console page, on a ruled band above the work surface. Server-safe.",
      ],
    },
  ],

  related: [
    { name: "Breadcrumb", when: "Where the page sits" },
    { name: "Tabs", when: "Its views" },
    { name: "Stat", when: "Its key numbers" },
  ],
};
