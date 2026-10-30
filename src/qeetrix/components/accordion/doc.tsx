// Components › Accordion: its documentation, from @qeetrix/react 0.2.0 (accordion.d.ts,
// accordion.js), the Storybook stories (layout/accordion.stories.tsx) and the changelog. Its
// examples open live (Live.tsx); the figures are the real Accordion, server-rendered.
import { Accordion, AccordionItem } from "@qeetrix/react";
import type { ReactNode } from "react";
import { NAV_TESTED } from "../navigation";
import type { ComponentDoc } from "../types";
import { examples, Questions } from "./examples";

const Fold = ({ children }: { children: ReactNode }) => (
  <div className="qc-fold-stage">{children}</div>
);

export const accordion: ComponentDoc = {
  name: "Accordion",
  slug: "accordion",
  category: "navigation",
  status: "stable",
  since: "0.0.2",
  lede: "Sections that fold, ruled between. Each title is a heading and a button.",
  exports: ["Accordion", "AccordionItem"],
  renders: "<h3><button>",
  source: "accordion",
  story: "components/layout/accordion.stories.tsx",
  examples,

  usage: {
    useFor: [
      "Questions and answers.",
      "Settings grouped by topic, read one at a time.",
      "Long detail most people skip.",
    ],
    notFor: [
      { text: "One section: Show more, Advanced", use: "Collapsible" },
      { text: "Views to switch between", use: "Tabs" },
      { text: "Content everyone needs", use: "Card" },
    ],
    anatomyFigure: (
      <Fold>
        <Questions />
      </Fold>
    ),
    anatomy: [
      {
        slot: "accordion-item",
        element: "<div>",
        note: "One section, ruled from the next.",
      },
      { slot: "accordion-header", element: "<h3>", note: "The heading, at headingLevel." },
      {
        slot: "accordion-trigger",
        element: "<button>",
        note: "The title, full width: aria-expanded.",
      },
      {
        slot: "chevron",
        select: ".qx-accordion-icon",
        element: "<svg>",
        note: "Turns as the section opens.",
      },
      { slot: "accordion-panel", element: '<div role="region">', note: "The content." },
    ],
    rules: [
      {
        title: "Titles that say what's inside",
        doLine: "A question or a topic: read without opening.",
        dontLine: "Vague titles: every section must be opened to find anything.",
        doIt: (
          <Fold>
            <Questions open={[]} />
          </Fold>
        ),
        dontIt: (
          <Fold>
            <Accordion>
              <AccordionItem value="more" title="More information">
                …
              </AccordionItem>
              <AccordionItem value="details" title="Details">
                …
              </AccordionItem>
              <AccordionItem value="other" title="Other">
                …
              </AccordionItem>
            </Accordion>
          </Fold>
        ),
      },
      {
        title: "Not for what everyone needs",
        doLine: "Detail most people skip, folded.",
        dontLine: "The one field everyone must fill, hidden in a fold.",
        doIt: (
          <Fold>
            <Accordion>
              <AccordionItem value="tokens" title="Token lifetimes">
                …
              </AccordionItem>
              <AccordionItem value="session" title="Session limits">
                …
              </AccordionItem>
            </Accordion>
          </Fold>
        ),
        dontIt: (
          <Fold>
            <Accordion>
              <AccordionItem value="name" title="Application name (required)">
                …
              </AccordionItem>
              <AccordionItem value="redirect" title="Redirect URL (required)">
                …
              </AccordionItem>
            </Accordion>
          </Fold>
        ),
      },
    ],
    content: [
      "Titles in sentence case: a question, or a topic in a few words.",
      "No full stop, unless it's a question.",
      "Keep each section short; a long one wants its own page.",
    ],
  },

  api: {
    props: [
      {
        name: "value · defaultValue",
        type: "string[]",
        default: "[]",
        note: "The open sections' values: an array, even when only one can be open.",
      },
      {
        name: "onValueChange",
        type: "(value[], details) => void",
        default: "—",
        note: "Called with the open sections' values.",
      },
      {
        name: "multiple",
        type: "boolean",
        default: "false",
        note: "Let several be open; otherwise opening one closes the other.",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        note: "Every section stays as it is.",
      },
      {
        name: "AccordionItem: title",
        type: "ReactNode",
        default: "required",
        note: "The trigger's text.",
      },
      {
        name: "AccordionItem: value",
        type: "string",
        default: "an id",
        note: "What value holds when it's open: set it to open or control the section.",
      },
      {
        name: "AccordionItem: headingLevel",
        type: "2 – 6",
        default: "3",
        note: "The heading that wraps the trigger.",
      },
      {
        name: "AccordionItem: disabled",
        type: "boolean",
        default: "false",
        note: "This section doesn't open or close.",
      },
    ],
    parts: [
      { slot: "accordion", element: "<div>", note: "The root." },
      { slot: "accordion-item", element: "<div>", note: "data-open while open." },
      { slot: "accordion-header", element: "<h3>", note: "The heading." },
      { slot: "accordion-trigger", element: "<button>", note: "aria-expanded, aria-controls." },
      {
        slot: "accordion-panel",
        element: '<div role="region">',
        note: 'hidden="until-found" while closed.',
      },
      { slot: "accordion-content", element: "<div>", note: "The padded content." },
    ],
    recipes: [
      {
        title: "Find in page",
        line: "A closed section's text stays in the page, hidden until found: Ctrl+F opens the section that holds the match.",
        file: "faq.tsx",
        code: `<Accordion>
  <AccordionItem value="sso" title="Which SSO protocols are supported?">
    SAML 2.0 and OpenID Connect.
  </AccordionItem>
</Accordion>`,
      },
    ],
  },

  accessibility: {
    keyboard: [
      { keys: ["Tab"], action: "To the next title: each is its own Tab stop." },
      { keys: ["Enter", "Space"], action: "Opens or closes the section." },
    ],
    checks: [
      {
        check: "Headings",
        result: "Each trigger sits in a heading, so the sections are in the page's outline.",
      },
      {
        check: "State",
        result: "aria-expanded on the trigger; the panel is a region labelled by it.",
      },
      { check: "Find in page", result: "A closed section opens when it holds the match." },
      { check: "Reduced motion", result: "The height doesn't animate." },
    ],
    tested: NAV_TESTED,
  },

  changelog: [
    {
      version: "0.4.0",
      items: ["A disabled trigger's chevron dims with its text, to icon.disabled."],
    },
    { version: "0.1.0", items: ["Panel text uses Qeet Sans on a page that sets no font."] },
    {
      version: "0.0.2",
      items: [
        "Accordion and AccordionItem: ruled sections with a title.sm trigger inside a heading (headingLevel), and a turning chevron; the panel's height animates; find in page opens a closed section that holds the match.",
      ],
    },
  ],

  related: [
    { name: "Collapsible", when: "One section" },
    { name: "Tabs", when: "Views to switch" },
    { name: "Card", when: "Grouping that stays open" },
  ],
};
