// Components › Avatar: its documentation, from @qeetrix/react 0.2.0 (avatar.d.ts, avatar.js), the
// Storybook stories (media/avatar.stories.tsx) and the changelog. Its examples run live
// (Live.tsx), as a photo shows once it has loaded; the figures show the initials, server-rendered.
import { Avatar, Inline } from "@qeetrix/react";
import { DISPLAY_TESTED } from "../display";
import type { ComponentDoc } from "../types";
import { examples, SIZES } from "./examples";

export const avatar: ComponentDoc = {
  name: "Avatar",
  slug: "avatar",
  category: "data-display",
  status: "stable",
  since: "0.0.2",
  lede: "A person, or an organisation, application or tenant: their photo or logo, or their initials.",
  exports: ["Avatar"],
  renders: '<span role="img">',
  source: "avatar",
  story: "components/media/avatar.stories.tsx",
  examples,

  usage: {
    useFor: [
      "Who someone is, in a list, a menu or a header.",
      "A tenant or an application, as a square.",
    ],
    notFor: [
      { text: "Several people at once", use: "Avatar group" },
      { text: "A status", use: "Badge" },
      { text: "An icon for a thing", use: "Icon button" },
    ],
    anatomyFigure: <Avatar name="Priya Sharma" size="xl" />,
    anatomy: [
      {
        slot: "avatar",
        element: '<span role="img">',
        note: "Named by name: one image to a screen reader.",
      },
      {
        slot: "avatar-fallback",
        element: "<span>",
        note: "The initials, while the photo loads or when it fails; avatar-image once it's in.",
      },
    ],
    rules: [
      {
        title: "Squares for things",
        doLine: "A tenant as a square: it never reads as a person.",
        dontLine: "A tenant as a circle, among people.",
        doIt: (
          <Inline gap="md">
            <Avatar name="Priya Sharma" size="lg" />
            <Avatar name="Globex India" shape="square" size="lg" />
          </Inline>
        ),
        dontIt: (
          <Inline gap="md">
            <Avatar name="Priya Sharma" size="lg" />
            <Avatar name="Globex India" size="lg" />
          </Inline>
        ),
      },
    ],
    sizes: {
      line: "Fixed, at every density.",
      specimen: (
        <Inline gap="lg" align="end">
          {SIZES.map(([size]) => (
            <Avatar key={size} name="Priya Sharma" size={size} />
          ))}
        </Inline>
      ),
      columns: ["Size", "Pixels", "For"],
      rows: [
        ["sm", "24", "A table row, an avatar group"],
        ["md", "32", "A list or a menu: the height of two lines"],
        ["lg", "40", "A header, a card"],
        ["xl", "48", "A profile"],
      ],
    },
    content: [
      "name is the person's full name, as they write it.",
      "For an organisation, its name without Pvt Ltd or Inc.",
      "decorative when the name is written beside it, so it isn't read twice.",
    ],
  },

  api: {
    props: [
      {
        name: "name",
        type: "string",
        default: "required",
        note: "The text alternative, and the initials: the first word's letter and the last's. A legal form (Pvt Ltd, LLP, Inc) doesn't count.",
      },
      {
        name: "src",
        type: "string",
        default: "—",
        note: "The photo or logo; the initials show while it loads, and if it fails.",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg" | "xl"',
        default: '"md"',
        note: "24, 32, 40 or 48px.",
      },
      {
        name: "shape",
        type: '"circle" | "square"',
        default: '"circle"',
        note: "Circle for a person; square, with a control's corners, for anything else.",
      },
      {
        name: "decorative",
        type: "boolean",
        default: "false",
        note: "The name is shown beside it: hidden from assistive technology.",
      },
    ],
    parts: [
      { slot: "avatar", element: '<span role="img">', note: "data-size, data-shape; aria-label." },
      { slot: "avatar-image", element: '<img alt="">', note: "The photo, once loaded." },
      { slot: "avatar-fallback", element: "<span>", note: "The initials, aria-hidden." },
    ],
    recipes: [
      {
        title: "In a list",
        line: "Beside the name, the avatar adds nothing to hear: AvatarItem hides it and keeps the two lines a md avatar's height.",
        file: "member.tsx",
        code: `import { AvatarItem } from "@qeetrix/react/experimental";

<AvatarItem name={user.name} description={user.email} src={user.photoUrl} />`,
      },
    ],
  },

  accessibility: {
    keyboard: [],
    checks: [
      { check: "Name", result: 'role="img", named by name; the initials are aria-hidden.' },
      { check: "Beside a name", result: "decorative hides it, so the name isn't read twice." },
      { check: "Photo", result: 'The image has alt="": the avatar\'s name already says who.' },
      { check: "Initials", result: "Centred on the capitals' height, in every engine." },
    ],
    tested: DISPLAY_TESTED,
  },

  changelog: [
    {
      version: "0.2.0",
      items: ["A company's legal form doesn't count towards its initials: \"Acme Pvt Ltd\" is AC."],
    },
    {
      version: "0.1.0",
      items: ['shape: "circle", or "square" for organisations, applications and tenants.'],
    },
    {
      version: "0.0.6",
      items: [
        "Initials are centred on the capitals' own height, not the font's room for descenders.",
      ],
    },
    {
      version: "0.0.2",
      items: ["Avatar: a circle with the photo, or initials while it loads or when it fails."],
    },
  ],

  related: [
    { name: "Avatar group", when: "Several at once" },
    { name: "Table", when: "A person in a row" },
    { name: "Menu", when: "An account menu" },
  ],
};
