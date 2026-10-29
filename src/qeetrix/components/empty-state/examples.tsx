// Components › Empty state: its examples, the real EmptyState and DataState with the code for
// each. Shared by the page (doc.tsx) and the island that runs them (Live.tsx), as DataState moves
// between its states: nothing here reads token data.
import { CircleAlertIcon } from "@qeetrix/icons/icons/circle-alert";
import { FunnelXIcon } from "@qeetrix/icons/icons/funnel-x";
import { KeyRoundIcon } from "@qeetrix/icons/icons/key-round";
import { PlusIcon } from "@qeetrix/icons/icons/plus";
import { SearchXIcon } from "@qeetrix/icons/icons/search-x";
import { UsersIcon } from "@qeetrix/icons/icons/users";
import { Button, Inline, Link, Text, Toggle, ToggleGroup } from "@qeetrix/react";
import { DataState, EmptyState } from "@qeetrix/react/experimental";
import { useState } from "react";
import type { ExampleDoc } from "../types";

export const NoUsers = ({ level }: { level?: 2 | 3 }) => (
  <EmptyState
    icon={UsersIcon}
    title="No users yet"
    description="Invite your team, or connect a directory to sync them."
    actions={<Button icon={PlusIcon}>Invite users</Button>}
    level={level}
  />
);

type State = "loading" | "error" | "empty" | "loaded";

function States() {
  const [state, setState] = useState<State>("loading");
  return (
    <div className="qc-empty-stage">
      <Inline justify="center">
        <ToggleGroup
          aria-label="State"
          value={[state]}
          onValueChange={(value) => value[0] && setState(value[0] as State)}
        >
          <Toggle value="loading">Loading</Toggle>
          <Toggle value="error">Error</Toggle>
          <Toggle value="empty">Empty</Toggle>
          <Toggle value="loaded">Loaded</Toggle>
        </ToggleGroup>
      </Inline>
      <DataState
        loading={state === "loading"}
        error={state === "error" ? new Error("503") : undefined}
        empty={state === "empty"}
        emptyState={
          <EmptyState
            size="section"
            icon={KeyRoundIcon}
            title="No API keys yet"
            description="Create a key to call the Management API."
            actions={<Button icon={PlusIcon}>Create API key</Button>}
          />
        }
        onRetry={() => setState("loading")}
      >
        <Text>3 API keys: production, staging, CI.</Text>
      </DataState>
    </div>
  );
}

export const examples: ExampleDoc[] = [
  {
    id: "nothing-yet",
    title: "Nothing yet",
    line: "A 24px icon, what's missing, why and what to do, and one primary action.",
    code: `<EmptyState
  icon={UsersIcon}
  title="No users yet"
  description="Invite your team, or connect a directory to sync them."
  actions={<Button icon={PlusIcon}>Invite users</Button>}
/>`,
    render: () => (
      <div className="qc-empty-stage">
        <NoUsers />
      </div>
    ),
  },
  {
    id: "no-results",
    title: "No results",
    line: "Say what was searched for, and the way back.",
    code: `<EmptyState
  size="section"
  icon={SearchXIcon}
  title="No users match “priya.s”"
  description="Check the spelling, or search by email."
  actions={<Button variant="soft" icon={FunnelXIcon}>Clear search</Button>}
/>`,
    render: () => (
      <div className="qc-empty-stage">
        <EmptyState
          size="section"
          icon={SearchXIcon}
          title="No users match “priya.s”"
          description="Check the spelling, or search by email."
          actions={
            <Button variant="soft" icon={FunnelXIcon}>
              Clear search
            </Button>
          }
        />
      </div>
    ),
  },
  {
    id: "an-error",
    title: "An error",
    line: 'tone="danger" colours the icon. Say that what matters is safe, and how to try again.',
    code: `<EmptyState
  size="section"
  tone="danger"
  icon={CircleAlertIcon}
  title="Couldn't load API keys"
  description="Your keys are safe. Try again in a moment."
  actions={<Button variant="soft">Try again</Button>}
/>`,
    render: () => (
      <div className="qc-empty-stage">
        <EmptyState
          size="section"
          tone="danger"
          icon={CircleAlertIcon}
          title="Couldn't load API keys"
          description="Your keys are safe. Try again in a moment."
          actions={<Button variant="soft">Try again</Button>}
        />
      </div>
    ),
  },
  {
    id: "a-second-way-in",
    title: "A second way in",
    line: "children, under the actions in small subtle text: a link to the docs, or another way to start.",
    code: `<EmptyState size="section" icon={KeyRoundIcon} title="No API keys yet" … actions={…}>
  <Link href="/docs/api-keys">About API keys</Link>
</EmptyState>`,
    render: () => (
      <div className="qc-empty-stage">
        <EmptyState
          size="section"
          icon={KeyRoundIcon}
          title="No API keys yet"
          description="Create a key to call the Management API."
          actions={<Button icon={PlusIcon}>Create API key</Button>}
        >
          <Link href="#api-keys">About API keys</Link>
        </EmptyState>
      </div>
    ),
  },
  {
    id: "every-state",
    title: "Every state",
    line: "DataState: loading, then error, then empty, then the content. The raw error is never shown; onRetry adds Try again.",
    code: `<DataState
  loading={isLoading}
  error={error}
  empty={keys.length === 0}
  emptyState={<EmptyState size="section" title="No API keys yet" … />}
  onRetry={refetch}
>
  <KeyList keys={keys} />
</DataState>`,
    render: () => <States />,
  },
];
