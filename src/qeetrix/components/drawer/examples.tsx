// Components › Drawer: its examples, the real Drawer with the code for each. Shared by the page
// (doc.tsx) and the island that runs them (Live.tsx): nothing here reads token data.
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
  Field,
  Inline,
  Select,
  Stack,
  TextField,
} from "@qeetrix/react";
import type { ExampleDoc } from "../types";

const ROLES = [
  { value: "member", label: "Member" },
  { value: "admin", label: "Admin" },
  { value: "auditor", label: "Auditor" },
];

function EditMember({
  side = "end",
  size = "md",
  dismissible = true,
  label = "Edit member",
}: {
  side?: "start" | "end";
  size?: "sm" | "md" | "lg";
  dismissible?: boolean;
  label?: string;
}) {
  return (
    <Drawer side={side} dismissible={dismissible}>
      <DrawerTrigger render={<Button variant="soft">{label}</Button>} />
      <DrawerContent
        title="Priya Sharma"
        description="Engineering · joined 2 March 2026"
        size={size}
      >
        <DrawerBody>
          <Stack gap="lg">
            <TextField label="Display name" defaultValue="Priya Sharma" />
            <TextField label="Work email" type="email" defaultValue="priya.sharma@acme.in" />
            <Field label="Role">
              <Select items={ROLES} defaultValue="member" />
            </Field>
          </Stack>
        </DrawerBody>
        <DrawerFooter>
          <DrawerClose
            render={<Button variant="ghost">{dismissible ? "Cancel" : "Discard changes"}</Button>}
          />
          <DrawerClose render={<Button>Save changes</Button>} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export const examples: ExampleDoc[] = [
  {
    id: "beside-the-page",
    title: "Beside the page",
    line: "A full-height panel from the end edge, the page still in view. Focus goes to the first field; Escape, an outside click or a swipe close it.",
    code: `<Drawer>
  <DrawerTrigger render={<Button variant="soft">Edit member</Button>} />
  <DrawerContent title="Priya Sharma" description="Engineering · joined 2 March 2026">
    <DrawerBody>
      <TextField label="Display name" defaultValue="Priya Sharma" />
    </DrawerBody>
    <DrawerFooter>
      <DrawerClose render={<Button variant="ghost">Cancel</Button>} />
      <DrawerClose render={<Button>Save changes</Button>} />
    </DrawerFooter>
  </DrawerContent>
</Drawer>`,
    render: () => <EditMember />,
  },
  {
    id: "sides",
    title: "Start or end",
    line: "side: end is the right in left-to-right text, the left in right-to-left.",
    code: `<Drawer side="start">…</Drawer>
<Drawer side="end">…</Drawer>`,
    render: () => (
      <Inline gap="md">
        <EditMember side="start" label="From the start" />
        <EditMember side="end" label="From the end" />
      </Inline>
    ),
  },
  {
    id: "sizes",
    title: "Sizes",
    line: "sm 400, md 560 and lg 800px, never wider than the window less 48px.",
    code: `<DrawerContent title="Priya Sharma" size="lg">…</DrawerContent>`,
    render: () => (
      <Inline gap="md">
        <EditMember size="sm" label="sm" />
        <EditMember size="md" label="md" />
        <EditMember size="lg" label="lg" />
      </Inline>
    ),
  },
  {
    id: "unsaved-work",
    title: "Unsaved work",
    line: "dismissible={false}: only its own actions close it, so a stray click loses nothing.",
    code: `<Drawer dismissible={false}>
  …
  <DrawerFooter>
    <DrawerClose render={<Button variant="ghost">Discard changes</Button>} />
    <DrawerClose render={<Button>Save changes</Button>} />
  </DrawerFooter>
</Drawer>`,
    render: () => <EditMember dismissible={false} />,
  },
];
