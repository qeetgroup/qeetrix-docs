// Components › Popover: its examples, the real Popover with the code for each. Shared by the page
// (doc.tsx) and the island that runs them (Live.tsx): nothing here reads token data.
import { ListFilterIcon } from "@qeetrix/icons/icons/list-filter";
import { PencilIcon } from "@qeetrix/icons/icons/pencil";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  IconButton,
  Inline,
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  TextField,
} from "@qeetrix/react";
import { useState } from "react";
import type { ExampleDoc } from "../types";

function Filters() {
  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button variant="soft" icon={ListFilterIcon}>
            Filter
          </Button>
        }
      />
      <PopoverContent title="Filter members" description="Shown: 1,284 of 1,284.">
        <Stack gap="lg">
          <CheckboxGroup label="Status" defaultValue={["active"]}>
            <Checkbox value="active" label="Active" />
            <Checkbox value="invited" label="Invited" />
            <Checkbox value="suspended" label="Suspended" />
          </CheckboxGroup>
          <Inline gap="sm" justify="end">
            <PopoverClose render={<Button variant="ghost">Clear</Button>} />
            <PopoverClose render={<Button>Apply</Button>} />
          </Inline>
        </Stack>
      </PopoverContent>
    </Popover>
  );
}

function InlineEdit() {
  const [name, setName] = useState("Payroll");
  const [draft, setDraft] = useState(name);
  return (
    <Inline gap="xs" align="center">
      <Text>{name}</Text>
      <Popover onOpenChange={(open) => open && setDraft(name)}>
        <PopoverTrigger
          render={
            <IconButton icon={PencilIcon} aria-label="Rename the application" tone="neutral" />
          }
        />
        <PopoverContent aria-label="Rename the application">
          <Stack gap="md">
            <TextField label="Application name" value={draft} onValueChange={setDraft} />
            <Inline gap="sm" justify="end">
              <PopoverClose render={<Button variant="ghost">Cancel</Button>} />
              <PopoverClose render={<Button onClick={() => setName(draft || name)}>Save</Button>} />
            </Inline>
          </Stack>
        </PopoverContent>
      </Popover>
    </Inline>
  );
}

export const examples: ExampleDoc[] = [
  {
    id: "filters",
    title: "Filters",
    line: "Content on demand, anchored to its trigger. Focus moves in; Escape and an outside click close it, and focus comes back.",
    code: `<Popover>
  <PopoverTrigger render={<Button variant="soft" icon={ListFilterIcon}>Filter</Button>} />
  <PopoverContent title="Filter members" description="Shown: 1,284 of 1,284.">
    <CheckboxGroup label="Status" defaultValue={["active"]}>…</CheckboxGroup>
    <PopoverClose render={<Button>Apply</Button>} />
  </PopoverContent>
</Popover>`,
    render: () => <Filters />,
  },
  {
    id: "sides",
    title: "Sides",
    line: "side and align: bottom and centre by default; it flips when there's no room.",
    code: `<PopoverContent side="top" title="On top">…</PopoverContent>`,
    render: () => (
      <Inline gap="md">
        {(["top", "bottom", "left", "right"] as const).map((side) => (
          <Popover key={side}>
            <PopoverTrigger render={<Button variant="soft">{side}</Button>} />
            <PopoverContent side={side} title={`Opens ${side}`}>
              <Text size="sm">Anchored to its trigger.</Text>
            </PopoverContent>
          </Popover>
        ))}
      </Inline>
    ),
  },
  {
    id: "inline-edit",
    title: "Inline edit",
    line: "No visible title: aria-label names it. Save closes it and shows the new name.",
    code: `<Popover>
  <PopoverTrigger render={<IconButton icon={PencilIcon} aria-label="Rename the application" tone="neutral" />} />
  <PopoverContent aria-label="Rename the application">
    <TextField label="Application name" value={draft} onValueChange={setDraft} />
    <PopoverClose render={<Button onClick={save}>Save</Button>} />
  </PopoverContent>
</Popover>`,
    render: () => <InlineEdit />,
  },
];
