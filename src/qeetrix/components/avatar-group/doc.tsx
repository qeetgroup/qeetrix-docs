// Components › Avatar group: its documentation, from @qeetrix/react 0.2.0
// (experimental/avatar-group), the Storybook stories (media/avatar-group.stories.tsx) and the
// changelog. Its examples run live (Live.tsx); the figures are server-rendered.
import { Avatar, Inline } from "@qeetrix/react";
import { AvatarGroup } from "@qeetrix/react/experimental";
import { DISPLAY_TESTED } from "../display";
import type { ComponentDoc } from "../types";
import { examples, PEOPLE } from "./examples";

export const avatarGroup: ComponentDoc = {
  name: "Avatar group",
  slug: "avatar-group",
  category: "data-display",
  status: "experimental",
  since: "0.0.8",
  lede: "A few people at a glance, then +N. One image to a screen reader, named in full.",
  exports: ["AvatarGroup"],
  renders: '<span role="img">',
  source: "experimental/avatar-group",
  story: "components/media/avatar-group.stories.tsx",
  examples,

  usage: {
    useFor: ["A group's members, in a row of a table.", "Who uses an application, at a glance."],
    notFor: [
      { text: "One person", use: "Avatar" },
      { text: "Everyone, to scan or choose", use: "Table" },
    ],
    anatomyFigure: <AvatarGroup people={PEOPLE} total={412} size="lg" />,
    anatomy: [
      {
        slot: "avatar-group",
        element: '<span role="img">',
        note: '"412 people: Priya Sharma, Rahul Verma, Ananya Iyer and 409 more".',
      },
      {
        slot: "avatar",
        select: '[data-slot="avatar-group"] > [data-slot="avatar"]',
        element: "<span>",
        note: "The first max, a hairline apart, so initials stay whole.",
      },
      {
        slot: "avatar-group-more",
        element: "<span>",
        note: "+N: the rest, aria-hidden.",
      },
    ],
    rules: [
      {
        title: "One group, one image",
        doLine: "One AvatarGroup: one image, its name the whole list.",
        dontLine: "Avatars side by side: each read on its own, with no count.",
        doIt: <AvatarGroup people={PEOPLE} total={412} size="md" />,
        dontIt: (
          <Inline gap="xs">
            {PEOPLE.slice(0, 5).map((person) => (
              <Avatar key={person.name} name={person.name} />
            ))}
          </Inline>
        ),
      },
    ],
    content: [
      "people in the order that matters: owners, or the most recent.",
      "total is the real count: 412, not the length of the page.",
      'For things, say what they are: "{count} applications: {names}".',
    ],
  },

  api: {
    props: [
      {
        name: "people",
        type: "{ name, src? }[]",
        default: "required",
        note: "The people, or the first few when total is larger.",
      },
      { name: "max", type: "number", default: "3", note: "How many show before +N." },
      {
        name: "total",
        type: "number",
        default: "people.length",
        note: "How many there are in all: a group's 412 members.",
      },
      {
        name: "size · shape",
        type: "AvatarSize · AvatarShape",
        default: '"sm" · "circle"',
        note: "sm fits a table row; square for organisations and applications, with a square +N.",
      },
      {
        name: "locale · messages",
        type: "string · object",
        default: "the provider's",
        note: 'The counts and the list of names; label is "{count} people: {names}".',
      },
    ],
    parts: [
      {
        slot: "avatar-group",
        element: '<span role="img">',
        note: "aria-label: the count and the names.",
      },
      { slot: "avatar", element: "<span>", note: "Each Avatar, decorative inside the group." },
      { slot: "avatar-group-more", element: "<span>", note: "+N, aria-hidden." },
    ],
    recipes: [
      {
        title: "From a paged API",
        line: "Pass the first page's people and the API's total: the name says how many in all.",
        file: "group-row.tsx",
        code: `const { data } = useGroupMembers(group.id, { limit: 3 });

<AvatarGroup people={data.members} total={data.total} />`,
      },
    ],
  },

  accessibility: {
    keyboard: [],
    checks: [
      {
        check: "One image",
        result:
          'role="img", named in full: "412 people: Priya Sharma, Rahul Verma, Ananya Iyer and 409 more".',
      },
      { check: "Locale", result: "The count and the list follow the locale: and, और." },
      {
        check: "Edges",
        result: "A hairline between avatars keeps initials whole on any background.",
      },
    ],
    tested: DISPLAY_TESTED,
  },

  changelog: [
    { version: "0.1.0", items: ["shape, passed to each avatar, with a square +N."] },
    {
      version: "0.0.8",
      items: [
        "AvatarGroup: the first max avatars, a hairline apart, then +N; one image to assistive technology, named in full.",
      ],
    },
  ],

  related: [
    { name: "Avatar", when: "One person" },
    { name: "Table", when: "Its usual home" },
  ],
};
