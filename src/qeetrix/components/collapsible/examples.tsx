// Components › Collapsible: its examples, the real Collapsible with the code for each. Shared by
// the page (doc.tsx) and the island that runs them (Live.tsx): nothing here reads token data. The
// trigger's chevron turns by itself.
import { ChevronDownIcon } from "@qeetrix/icons/icons/chevron-down";
import {
  Box,
  Button,
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
  Inline,
  Stack,
  Text,
} from "@qeetrix/react";
import { useState } from "react";
import type { ExampleDoc } from "../types";

export const Facts = ({ rows }: { rows: Array<[string, string]> }) => (
  <Stack gap="xs">
    {rows.map(([term, value]) => (
      <Inline key={term} justify="between">
        <Text size="sm" tone="subtle">
          {term}
        </Text>
        <Text size="sm">{value}</Text>
      </Inline>
    ))}
  </Stack>
);

/** An application's advanced settings, folded under a ghost button whose chevron turns. */
export const Advanced = ({
  defaultOpen = false,
  disabled = false,
  label = "Advanced settings",
}) => (
  <Collapsible defaultOpen={defaultOpen} disabled={disabled}>
    <Stack gap="sm">
      <div>
        <CollapsibleTrigger
          render={
            <Button variant="ghost" icon={ChevronDownIcon}>
              {label}
            </Button>
          }
        />
      </div>
      <CollapsiblePanel>
        <Box border="default" radius="control" padding="md">
          <Facts
            rows={[
              ["Token lifetime", "3,600 s"],
              ["Clock skew", "30 s"],
              ["Audience", "api.id.qeet.in"],
            ]}
          />
        </Box>
      </CollapsiblePanel>
    </Stack>
  </Collapsible>
);

const MEMBERS = ["Priya Sharma", "Rahul Verma", "Ananya Iyer", "Vikram Nair", "Meera Reddy"];

function ShowMore() {
  const [open, setOpen] = useState(false);
  const rest = MEMBERS.length - 2;
  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <Stack gap="sm">
        <Stack gap="xs">
          {MEMBERS.slice(0, 2).map((name) => (
            <Text key={name}>{name}</Text>
          ))}
        </Stack>
        <CollapsiblePanel>
          <Stack gap="xs">
            {MEMBERS.slice(2).map((name) => (
              <Text key={name}>{name}</Text>
            ))}
          </Stack>
        </CollapsiblePanel>
        <div>
          <CollapsibleTrigger
            render={<Button variant="ghost">{open ? "Show fewer" : `Show ${rest} more`}</Button>}
          />
        </div>
      </Stack>
    </Collapsible>
  );
}

export const examples: ExampleDoc[] = [
  {
    id: "advanced-settings",
    title: "Advanced settings",
    line: "The trigger is your own control, through render: here a ghost Button.",
    code: `<Collapsible>
  <CollapsibleTrigger render={<Button variant="ghost" icon={ChevronDownIcon}>Advanced settings</Button>} />
  <CollapsiblePanel>…</CollapsiblePanel>
</Collapsible>`,
    render: () => (
      <div className="qc-fold-stage">
        <Advanced />
      </div>
    ),
  },
  {
    id: "show-more",
    title: "Show more",
    line: "open and onOpenChange: the trigger after the panel, its words following the state.",
    code: `const [open, setOpen] = useState(false);

<Collapsible open={open} onOpenChange={setOpen}>
  …
  <CollapsiblePanel>…</CollapsiblePanel>
  <CollapsibleTrigger render={<Button variant="ghost">{open ? "Show fewer" : "Show 3 more"}</Button>} />
</Collapsible>`,
    render: () => (
      <div className="qc-fold-stage">
        <ShowMore />
      </div>
    ),
  },
  {
    id: "open-at-first",
    title: "Open at first",
    line: "defaultOpen: open until it's closed.",
    code: `<Collapsible defaultOpen>…</Collapsible>`,
    render: () => (
      <div className="qc-fold-stage">
        <Advanced defaultOpen />
      </div>
    ),
  },
  {
    id: "disabled",
    title: "Disabled",
    line: "disabled: the trigger does nothing; the panel stays as it is.",
    code: `<Collapsible disabled>…</Collapsible>`,
    render: () => (
      <div className="qc-fold-stage">
        <Advanced disabled />
      </div>
    ),
  },
];
