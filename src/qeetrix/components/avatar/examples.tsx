// Components › Avatar: its examples, the real Avatar with the code for each. Shared by the page
// (doc.tsx) and the island that runs them (Live.tsx), as a photo shows once it has loaded: nothing
// here reads token data. The photo is a drawing, as in the stories; the logo is Qeet's.
import { Avatar, type AvatarStatusTone, Inline, Stack, Text } from "@qeetrix/react";
import { AvatarItem } from "@qeetrix/react/experimental";
import type { ExampleDoc } from "../types";

export const PHOTO = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#d8c3a5"/><circle cx="32" cy="25" r="12" fill="#8d5b3e"/><path d="M8 64c2-15 12-22 24-22s22 7 24 22z" fill="#3d5a80"/></svg>',
)}`;

export const SIZES = [
  ["sm", "24"],
  ["md", "32"],
  ["lg", "40"],
  ["xl", "48"],
] as const;

/** A person's presence, as a status: who, the words, the dot's tone. */
export const STATUSES: ReadonlyArray<readonly [string, string, AvatarStatusTone]> = [
  ["Priya Sharma", "Online", "success"],
  ["Rahul Verma", "Away", "warning"],
  ["Ananya Iyer", "Busy", "danger"],
  ["Karthik Reddy", "Offline", "neutral"],
];

export const examples: ExampleDoc[] = [
  {
    id: "initials",
    title: "Initials",
    line: "name: the text alternative, and the initials, from the first word and the last.",
    code: `<Avatar name="Priya Sharma" />`,
    render: () => (
      <Inline gap="md" align="center">
        <Avatar name="Priya Sharma" />
        <Avatar name="Rahul Verma" />
        <Avatar name="Ananya Iyer" />
      </Inline>
    ),
  },
  {
    id: "a-photo",
    title: "A photo",
    line: "src: the photo. The initials show while it loads, and if it fails.",
    code: `<Avatar name="Rahul Verma" src={user.photoUrl} />`,
    render: () => (
      <Inline gap="md" align="center">
        <Avatar name="Rahul Verma" src={PHOTO} size="lg" />
        <Avatar name="Priya Sharma" src="data:image/png;base64,AAAA" size="lg" />
      </Inline>
    ),
  },
  {
    id: "sizes",
    title: "Sizes",
    line: "sm 24, md 32, lg 40 and xl 48px; md by default.",
    code: `<Avatar name="Priya Sharma" size="sm" />
<Avatar name="Priya Sharma" />
<Avatar name="Priya Sharma" size="lg" />
<Avatar name="Priya Sharma" size="xl" />`,
    render: () => (
      <Inline gap="lg" align="end">
        {SIZES.map(([size, px]) => (
          <Stack key={size} gap="xs" align="center">
            <Avatar name="Priya Sharma" size={size} />
            <Text size="sm" tone="subtle">
              {px}
            </Text>
          </Stack>
        ))}
      </Inline>
    ),
  },
  {
    id: "a-status",
    title: "A status",
    line: 'status: a dot on the bottom-end corner, in Badge\'s tones, 8 to 14px with the size. Its label is read with the name: "Priya Sharma, Online".',
    code: `<Avatar name="Priya Sharma" size="sm" status={{ label: "Online", tone: "success" }} />
<Avatar name="Rahul Verma" src={user.photoUrl} status={{ label: "Away", tone: "warning" }} />
<Avatar name="Ananya Iyer" size="lg" status={{ label: "Busy", tone: "danger" }} />
<Avatar name="Karthik Reddy" size="xl" status={{ label: "Offline" }} />`,
    render: () => (
      <Inline gap="lg" align="end">
        {STATUSES.map(([name, label, tone], index) => (
          <Avatar
            key={name}
            name={name}
            size={SIZES[index]?.[0]}
            src={index === 1 ? PHOTO : undefined}
            status={{ label, tone }}
          />
        ))}
      </Inline>
    ),
  },
  {
    id: "people-and-tenants",
    title: "People and tenants",
    line: 'A person is a circle; an organisation, an application or a tenant is a square, shape="square", so it never reads as a person.',
    code: `<Avatar name="Priya Sharma" />
<Avatar name="Globex India" shape="square" />
<Avatar name="Qeet" src="/logos/qeet.svg" shape="square" />`,
    render: () => (
      <Inline gap="md" align="center">
        <Avatar name="Priya Sharma" size="lg" />
        <Avatar name="Globex India" shape="square" size="lg" />
        <Avatar name="Qeet" src="/icons/logos/qeet.svg" shape="square" size="lg" />
      </Inline>
    ),
  },
  {
    id: "beside-a-name",
    title: "Beside a name",
    line: "decorative hides it where the name is written beside it. AvatarItem, from experimental, draws the pair.",
    code: `import { AvatarItem } from "@qeetrix/react/experimental";

<AvatarItem name="Priya Sharma" description="priya@acme.in" />`,
    render: () => (
      <Stack gap="md">
        <AvatarItem name="Priya Sharma" description="priya@acme.in" />
        <AvatarItem name="Rahul Verma" description="Admin · Finance" src={PHOTO} />
        <AvatarItem name="Globex India" description="Tenant · 1,284 users" shape="square" />
      </Stack>
    ),
  },
];
