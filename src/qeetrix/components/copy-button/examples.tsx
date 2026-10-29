// Components › Copy button: its examples, the real CopyButton with the code for each. Shared by the
// page (doc.tsx) and the island that runs them (Live.tsx), so they copy: nothing here reads token
// data.
import { Inline, QeetrixProvider, Stack, Text } from "@qeetrix/react";
import { CopyButton } from "@qeetrix/react/experimental";
import { hi } from "@qeetrix/react/locales/hi";
import type { ExampleDoc } from "../types";

const CREDENTIALS = [
  ["Client ID", "Copy client ID", "qid_app_01J9ZK4T7B2R"],
  ["Redirect URI", "Copy redirect URI", "https://console.acme.in/auth/callback"],
  ["Tenant", "Copy tenant ID", "tnt_acme_01HZX3"],
] as const;

/** A fresh invite link, made at the moment it's copied. */
const inviteLink = () => `https://acme.qeet.in/join/${Math.random().toString(36).slice(2, 10)}`;

export const examples: ExampleDoc[] = [
  {
    id: "variants",
    title: "Icon or label",
    line: "An icon alone, named by label; or a label, which makes it a Button. Ghost and neutral by default.",
    code: `<Inline gap="md">
  <CopyButton value="usr_01J8K2M4PQ" label="Copy user ID" />
  <CopyButton value="org_acme_01HZX3" label="Copy organisation ID" variant="soft" />
  <CopyButton value="usr_01J8K2M4PQ" label="Copy user ID">Copy ID</CopyButton>
  <CopyButton value="sk_live_51Hx…" label="Copy the secret" variant="soft">Copy secret</CopyButton>
</Inline>`,
    render: () => (
      <Inline gap="md">
        <CopyButton value="usr_01J8K2M4PQ" label="Copy user ID" />
        <CopyButton value="org_acme_01HZX3" label="Copy organisation ID" variant="soft" />
        <CopyButton value="usr_01J8K2M4PQ" label="Copy user ID">
          Copy ID
        </CopyButton>
        <CopyButton value="sk_live_51Hx…" label="Copy the secret" variant="soft">
          Copy secret
        </CopyButton>
      </Inline>
    ),
  },
  {
    id: "beside-its-value",
    title: "Beside its value",
    line: "Each value with its own button, named for it.",
    code: `<Stack gap="md">
  {CREDENTIALS.map(([term, label, value]) => (
    <Inline key={term} justify="between" wrap={false}>
      <Stack gap="none">
        <Text size="sm" tone="subtle">{term}</Text>
        <Text mono truncate>{value}</Text>
      </Stack>
      <CopyButton value={value} label={label} />
    </Inline>
  ))}
</Stack>`,
    render: () => (
      <div className="qc-narrow">
        <Stack gap="md">
          {CREDENTIALS.map(([term, label, value]) => (
            <Inline key={term} justify="between" wrap={false}>
              <Stack gap="none">
                <Text size="sm" tone="subtle">
                  {term}
                </Text>
                <Text mono truncate>
                  {value}
                </Text>
              </Stack>
              <CopyButton value={value} label={label} />
            </Inline>
          ))}
        </Stack>
      </div>
    ),
  },
  {
    id: "made-when-copied",
    title: "Made when it's copied",
    line: "value can be a function, even an async one: a fresh link on every copy.",
    code: `<CopyButton value={() => createInviteLink()} label="Copy an invite link">
  Copy invite link
</CopyButton>`,
    render: () => (
      <CopyButton value={inviteLink} label="Copy an invite link">
        Copy invite link
      </CopyButton>
    ),
  },
  {
    id: "sizes",
    title: "Sizes",
    line: "Square, at a control's height; with a label, a Button's.",
    code: `<Inline gap="sm" align="center">
  <CopyButton value="usr_01J8K2M4PQ" label="Copy user ID, small" size="sm" />
  <CopyButton value="usr_01J8K2M4PQ" label="Copy user ID, medium" size="md" />
  <CopyButton value="usr_01J8K2M4PQ" label="Copy user ID, large" size="lg" />
</Inline>`,
    render: () => (
      <Inline gap="sm" align="center">
        <CopyButton value="usr_01J8K2M4PQ" label="Copy user ID, small" size="sm" />
        <CopyButton value="usr_01J8K2M4PQ" label="Copy user ID, medium" size="md" />
        <CopyButton value="usr_01J8K2M4PQ" label="Copy user ID, large" size="lg" />
      </Inline>
    ),
  },
  {
    id: "in-hindi",
    title: "In Hindi",
    line: 'Its words come from QeetrixProvider: "कॉपी करें", then "कॉपी हो गया".',
    code: `import { hi } from "@qeetrix/react/locales/hi";

<QeetrixProvider locale="hi-IN" messages={hi}>
  <CopyButton value="usr_01J8K2M4PQ" />
</QeetrixProvider>`,
    render: () => (
      <QeetrixProvider locale="hi-IN" messages={hi}>
        <CopyButton value="usr_01J8K2M4PQ" />
      </QeetrixProvider>
    ),
  },
];
