// Components › Description list: its documentation, from @qeetrix/react 0.2.0
// (experimental/description-list), the Storybook stories (data-display/description-list.stories.tsx)
// and the changelog. Its examples run live (Live.tsx), so their copy buttons copy.
import { Badge, Text } from "@qeetrix/react";
import { DescriptionItem, DescriptionList } from "@qeetrix/react/experimental";
import type { ReactNode } from "react";
import { DISPLAY_TESTED } from "../display";
import type { ComponentDoc } from "../types";
import { examples } from "./examples";

const Fold = ({ children }: { children: ReactNode }) => (
  <div className="qc-fold-stage">{children}</div>
);

export const descriptionList: ComponentDoc = {
  name: "Description list",
  slug: "description-list",
  category: "data-display",
  status: "experimental",
  since: "0.0.6",
  lede: "Facts about one record, as terms and values: each pair read together, every detail page lined up the same way.",
  exports: ["DescriptionList", "DescriptionItem"],
  renders: "<dl>",
  source: "experimental/description-list",
  story: "components/data-display/description-list.stories.tsx",
  examples,

  usage: {
    useFor: [
      "A record's details: a user's email and status, a key's scopes.",
      "A summary in a card, beside its actions.",
    ],
    notFor: [
      { text: "Many records to compare", use: "Table" },
      { text: "Key numbers at a glance", use: "Stat" },
      { text: "Fields to edit", use: "Form" },
    ],
    anatomyFigure: (
      <Fold>
        <DescriptionList>
          <DescriptionItem term="Status">
            <Badge tone="success">Active</Badge>
          </DescriptionItem>
          <DescriptionItem term="Manager" />
        </DescriptionList>
      </Fold>
    ),
    anatomy: [
      { slot: "description-item", element: "<div>", note: "One pair, a line below it." },
      { slot: "description-term", element: "<dt>", note: "What the value is." },
      {
        slot: "description-value",
        element: "<dd>",
        note: "The value: text, a Badge, a link, a copy button.",
      },
      {
        slot: "not-set",
        select: ".qx-description-empty",
        element: "<span>",
        note: '"—", read as "Not set".',
      },
    ],
    rules: [
      {
        title: "Pairs, not a paragraph",
        doLine: "Each fact a term and its value: scanned, and read in pairs.",
        dontLine: "The facts run together in a sentence.",
        doIt: (
          <Fold>
            <DescriptionList>
              <DescriptionItem term="Email">priya@acme.in</DescriptionItem>
              <DescriptionItem term="Department">Engineering</DescriptionItem>
            </DescriptionList>
          </Fold>
        ),
        dontIt: (
          <Fold>
            <Text>Priya's email is priya@acme.in and she works in Engineering.</Text>
          </Fold>
        ),
      },
      {
        title: "Show what's not set",
        doLine: 'An empty value as "—": the field exists, with nothing in it.',
        dontLine: "The pair left out: is there no manager, or no field?",
        doIt: (
          <Fold>
            <DescriptionList>
              <DescriptionItem term="Email">priya@acme.in</DescriptionItem>
              <DescriptionItem term="Manager" />
            </DescriptionList>
          </Fold>
        ),
        dontIt: (
          <Fold>
            <DescriptionList>
              <DescriptionItem term="Email">priya@acme.in</DescriptionItem>
            </DescriptionList>
          </Fold>
        ),
      },
    ],
    content: [
      "Terms a word or two, sentence case, no colon: Email, Last sign-in.",
      "Values as shown elsewhere: a Badge for a status, mono for an ID.",
      "Leave a value empty, not N/A: it shows —, read as Not set.",
    ],
  },

  api: {
    props: [
      {
        name: "layout",
        type: '"rows" | "columns"',
        default: '"rows"',
        note: "Rows: the term beside its value. Columns: the term above, in up to columns columns.",
      },
      {
        name: "columns",
        type: "1 | 2 | 3 | 4",
        default: "2",
        note: "In columns: the most, fewer where there isn't room (at least 8rem each).",
      },
      {
        name: "DescriptionItem: term",
        type: "ReactNode",
        default: "required",
        note: 'What the value is: "Email".',
      },
      {
        name: "DescriptionItem: children",
        type: "ReactNode",
        default: "—",
        note: 'The value. Empty shows "—", read as "Not set".',
      },
      {
        name: "DescriptionItem: description · action",
        type: "ReactNode",
        default: "—",
        note: "A sentence under the value, and an action at the row's end: a Settings row.",
      },
      {
        name: "DescriptionItem: messages",
        type: "object",
        default: "the provider's",
        note: 'The "Not set" string.',
      },
    ],
    parts: [
      { slot: "description-list", element: "<dl>", note: "data-layout." },
      { slot: "description-item", element: "<div>", note: "One pair." },
      { slot: "description-term", element: "<dt>", note: "The term." },
      { slot: "description-value", element: "<dd>", note: "The value." },
    ],
    recipes: [
      {
        title: "With a copy button",
        line: "An ID or a key and its CopyButton, side by side in the value.",
        file: "key-details.tsx",
        code: `<DescriptionItem term="Key ID">
  <Text mono>kid_8f2c1a9b</Text>
  <CopyButton value="kid_8f2c1a9b" label="Copy key ID" size="sm" />
</DescriptionItem>`,
      },
    ],
  },

  accessibility: {
    keyboard: [],
    checks: [
      { check: "Pairs", result: "A <dl> of <dt> and <dd>: each term is read with its value." },
      { check: "Not set", result: 'An empty value reads "Not set"; the "—" is hidden.' },
      { check: "Narrow", result: "Under 24rem the term moves above its value; the order is kept." },
    ],
    tested: DISPLAY_TESTED,
  },

  changelog: [
    {
      version: "0.2.0",
      items: ["DescriptionItem: description and action, for a Settings row."],
    },
    {
      version: "0.0.6",
      items: [
        'DescriptionList and DescriptionItem: term and value pairs in a semantic dl. rows, the term beside its value, above it under 24rem, edge to edge in a Card; columns, in up to columns columns of at least 8rem. An empty value shows "—", read as "Not set".',
      ],
    },
  ],

  related: [
    { name: "Card", when: "Its usual home" },
    { name: "Copy button", when: "Copy a value" },
    { name: "Stat", when: "Key numbers" },
  ],
};
