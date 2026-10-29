// Components › Command palette: its examples, the real CommandPalette with the code for each. Shared
// by the page (doc.tsx) and the island that runs them (Live.tsx), so a palette opens. On this page
// ⌘K is the docs' own search, so each palette here sets hotkey={false}.
import { AppWindowIcon } from "@qeetrix/icons/icons/app-window";
import { DownloadIcon } from "@qeetrix/icons/icons/download";
import { KeyRoundIcon } from "@qeetrix/icons/icons/key-round";
import { SearchIcon } from "@qeetrix/icons/icons/search";
import { ShieldCheckIcon } from "@qeetrix/icons/icons/shield-check";
import { UserPlusIcon } from "@qeetrix/icons/icons/user-plus";
import { Button, QeetrixProvider, Stack, Text } from "@qeetrix/react";
import { type CommandGroup, type CommandItem, CommandPalette } from "@qeetrix/react/experimental";
import { hi } from "@qeetrix/react/locales/hi";
import { useEffect, useRef, useState } from "react";
import type { ExampleDoc } from "../types";

/** A console's results: people, apps, settings with where they live, and actions with their keys. */
export const GROUPS: CommandGroup[] = [
  {
    label: "Users",
    items: [
      {
        value: "usr_1",
        label: "Priya Sharma",
        description: "priya@acme.in · Engineering",
        avatar: { name: "Priya Sharma" },
      },
      {
        value: "usr_2",
        label: "Priyanka Rao",
        description: "priyanka@acme.in · Finance",
        avatar: { name: "Priyanka Rao" },
      },
      {
        value: "usr_3",
        label: "Rahul Verma",
        description: "rahul.verma@acme.in · Finance",
        avatar: { name: "Rahul Verma" },
      },
    ],
  },
  {
    label: "Applications",
    items: [
      { value: "app_1", label: "Payroll", meta: "OIDC", icon: AppWindowIcon },
      { value: "app_2", label: "Expense desk", meta: "SAML", icon: AppWindowIcon },
    ],
  },
  {
    label: "Settings",
    items: [
      {
        value: "set_1",
        label: "Two-step sign-in",
        meta: "Security › Policies",
        icon: ShieldCheckIcon,
        keywords: ["MFA", "2FA", "OTP"],
      },
      {
        value: "set_2",
        label: "Signing keys",
        meta: "Developers",
        icon: KeyRoundIcon,
        keywords: ["JWKS", "rotate"],
      },
    ],
  },
  {
    label: "Actions",
    items: [
      { value: "act_1", label: "Invite a user", icon: UserPlusIcon, shortcut: ["I"] },
      {
        value: "act_2",
        label: "Export audit log",
        description: "Needs the Auditor role",
        icon: DownloadIcon,
        disabled: true,
      },
    ],
  },
];

/** The top bar's search, opening the palette, and what was chosen. */
function Console({
  groups = GROUPS,
  onQueryChange,
  loading,
}: {
  groups?: CommandGroup[];
  onQueryChange?: (query: string) => void;
  loading?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [chosen, setChosen] = useState<CommandItem>();
  return (
    <Stack gap="sm" align="center">
      <Button variant="soft" icon={SearchIcon} onClick={() => setOpen(true)}>
        Search or jump to
      </Button>
      <Text tone="subtle" size="sm">
        {chosen ? `Opened ${chosen.label}.` : "Try “mfa”, “priya” or “keys”."}
      </Text>
      <CommandPalette
        groups={groups}
        open={open}
        onOpenChange={setOpen}
        onSelect={setChosen}
        hotkey={false}
        onQueryChange={onQueryChange}
        loading={loading}
      />
    </Stack>
  );
}

/** Results from a server: a short wait, then what matches. */
function Searching() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState<CommandGroup[]>([]);
  const timer = useRef<number>(undefined);
  useEffect(() => {
    window.clearTimeout(timer.current);
    if (!query.trim()) {
      setGroups([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    timer.current = window.setTimeout(() => {
      const words = query.toLowerCase();
      setGroups(
        GROUPS.map((group) => ({
          ...group,
          items: group.items.filter((item) =>
            [item.label, item.description, ...(item.keywords ?? [])]
              .join(" ")
              .toLowerCase()
              .includes(words),
          ),
        })).filter((group) => group.items.length),
      );
      setLoading(false);
    }, 600);
  }, [query]);
  return <Console groups={groups} onQueryChange={setQuery} loading={loading} />;
}

export const examples: ExampleDoc[] = [
  {
    id: "grouped-results",
    title: "Grouped results",
    line: "Opened from the top bar's search, or ⌘K. Type to filter; arrows move, Enter opens, Escape closes.",
    code: `const [open, setOpen] = useState(false);

<Button variant="soft" icon={SearchIcon} onClick={() => setOpen(true)}>Search or jump to</Button>
<CommandPalette
  groups={groups}
  open={open}
  onOpenChange={setOpen}
  onSelect={(item) => navigate(item.value)}
/>`,
    render: () => <Console />,
  },
  {
    id: "searching-on-the-server",
    title: "Searching on the server",
    line: 'onQueryChange searches yourself; loading shows "Searching…" and groups are shown as given.',
    code: `const [query, setQuery] = useState("");
const { data, isFetching } = useSearch(query);

<CommandPalette
  groups={data ?? []}
  onQueryChange={setQuery}
  loading={isFetching}
  open={open}
  onOpenChange={setOpen}
  onSelect={(item) => navigate(item.value)}
/>`,
    render: () => <Searching />,
  },
  {
    id: "in-hindi",
    title: "In Hindi",
    line: "Its words, its placeholder and its key hints come from QeetrixProvider.",
    code: `import { hi } from "@qeetrix/react/locales/hi";

<QeetrixProvider locale="hi-IN" messages={hi}>
  <CommandPalette groups={groups} open={open} onOpenChange={setOpen} onSelect={(item) => navigate(item.value)} />
</QeetrixProvider>`,
    render: () => (
      <QeetrixProvider locale="hi-IN" messages={hi}>
        <Console />
      </QeetrixProvider>
    ),
  },
];
