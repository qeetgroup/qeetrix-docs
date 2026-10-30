// Components › Avatar: its documentation, from @qeetrix/react 0.4.0 (avatar.d.ts, avatar.js,
// avatar.css), the Storybook stories (media/avatar.stories.tsx) and the changelog. Its examples run
// live (Live.tsx), as a photo shows once it has loaded; the figures show the initials,
// server-rendered.
import { Avatar, Inline, Text } from "@qeetrix/react";
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
      { text: "A record's status", use: "Badge" },
      { text: "An icon for a thing", use: "Icon button" },
    ],
    anatomyFigure: (
      <Avatar name="Priya Sharma" size="xl" status={{ label: "Online", tone: "success" }} />
    ),
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
      {
        slot: "avatar-status",
        element: "<span>",
        note: "The status dot on the bottom-end corner, cut out of the avatar with a 2px gap.",
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
      {
        title: "Say the status too",
        doLine: "Where the status matters, it's in words beside the name.",
        dontLine: "The dot alone beside a name: the avatar is decorative, so no one hears it.",
        // AvatarItem takes no status in 0.4.0 (QTRX-207), so the rows are Avatar and Text.
        doIt: (
          <Inline gap="sm" align="center">
            <Avatar name="Priya Sharma" status={{ label: "Online", tone: "success" }} decorative />
            <Text>Priya Sharma · Online</Text>
          </Inline>
        ),
        dontIt: (
          <Inline gap="sm" align="center">
            <Avatar name="Priya Sharma" status={{ label: "Online", tone: "success" }} decorative />
            <Text>Priya Sharma</Text>
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
      columns: ["Size", "Pixels", "Status dot", "For"],
      rows: [
        ["sm", "24", "8", "A table row, an avatar group"],
        ["md", "32", "10", "A list or a menu: the height of two lines"],
        ["lg", "40", "12", "A header, a card"],
        ["xl", "48", "14", "A profile"],
      ],
    },
    content: [
      "name is the person's full name, as they write it.",
      "For an organisation, its name without Pvt Ltd or Inc.",
      "decorative when the name is written beside it, so it isn't read twice.",
      'A status label in words, as a person would say it: "Online", "Away", "In a meeting".',
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
        name: "status",
        type: "AvatarStatus: { label: string; tone?: AvatarStatusTone }",
        default: "—",
        note: 'A dot on the bottom-end corner, 8 to 14px with the size. label is read with the name: "Priya Sharma, Online".',
      },
      {
        name: "status.tone",
        type: 'AvatarStatusTone: "neutral" | "brand" | "info" | "success" | "warning" | "danger"',
        default: '"neutral"',
        note: "Badge's tones: success for online, warning for away.",
      },
      {
        name: "decorative",
        type: "boolean",
        default: "false",
        note: "The name is shown beside it: hidden from assistive technology, its status too.",
      },
    ],
    parts: [
      {
        slot: "avatar",
        element: '<span role="img">',
        note: "data-size, data-shape, data-status; aria-label.",
      },
      { slot: "avatar-image", element: '<img alt="">', note: "The photo, once loaded." },
      { slot: "avatar-fallback", element: "<span>", note: "The initials, aria-hidden." },
      { slot: "avatar-status", element: "<span>", note: "The status dot, aria-hidden; data-tone." },
    ],
    recipes: [
      {
        title: "In a list",
        line: "Beside the name, the avatar adds nothing to hear: AvatarItem hides it and keeps the two lines a md avatar's height.",
        file: "member.tsx",
        code: `import { AvatarItem } from "@qeetrix/react/experimental";

<AvatarItem name={user.name} description={user.email} src={user.photoUrl} />`,
      },
      {
        title: "Presence from your data",
        line: "Map each state to an AvatarStatus once, and pass it.",
        file: "presence.tsx",
        code: `import { Avatar, type AvatarStatus } from "@qeetrix/react";

const PRESENCE: Record<Presence, AvatarStatus> = {
  online: { label: "Online", tone: "success" },
  away: { label: "Away", tone: "warning" },
  offline: { label: "Offline" },
};

<Avatar name={user.name} src={user.photoUrl} status={PRESENCE[user.presence]} />`,
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
      {
        check: "Status",
        result:
          'Read with the name, "Priya Sharma, Online"; the dot is aria-hidden. It sits on the bottom-end corner, the left one in right to left, and is drawn in CanvasText in forced colours.',
      },
    ],
    tested: DISPLAY_TESTED,
  },

  changelog: [
    {
      version: "0.4.0",
      items: [
        'status={{ label, tone }}: a round dot on the bottom-end corner in Badge\'s tones, 8 to 14px with the size, cut out of the avatar with a 2px gap. The avatar is named "Priya Sharma, Online". Types AvatarStatus and AvatarStatusTone.',
        "AvatarItem's name and description wrap instead of ending in an ellipsis, so neither is cut.",
      ],
    },
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
