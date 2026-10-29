// Components › Dialog: its examples, the real Dialog with the code for each. Shared by the page
// (doc.tsx) and the island that runs them (Live.tsx): nothing here reads token data.
import {
  Button,
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
  Inline,
  QeetrixProvider,
  Stack,
  Text,
  TextField,
} from "@qeetrix/react";
import { hi } from "@qeetrix/react/locales/hi";
import { useState } from "react";
import type { ExampleDoc } from "../types";

function EditProfile() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="soft">Edit profile</Button>} />
      <DialogContent
        title="Edit profile"
        description="Members of Acme Pvt Ltd see this name and email."
      >
        <DialogBody>
          <Stack gap="lg">
            <TextField label="Display name" defaultValue="Priya Sharma" />
            <TextField label="Work email" type="email" defaultValue="priya.sharma@acme.in" />
          </Stack>
        </DialogBody>
        <DialogFooter>
          <DialogClose render={<Button variant="ghost">Cancel</Button>} />
          <DialogClose render={<Button>Save changes</Button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Intents() {
  return (
    <Inline gap="md">
      <Dialog intent="warning">
        <DialogTrigger render={<Button variant="soft">Turn off enforcement</Button>} />
        <DialogContent
          title="Turn off passkey enforcement?"
          description="Members will be able to sign in with a password again."
        >
          <DialogFooter>
            <DialogClose render={<Button variant="ghost">Cancel</Button>} />
            <DialogClose render={<Button>Turn off</Button>} />
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog intent="danger">
        <DialogTrigger render={<Button tone="danger">Revoke key</Button>} />
        <DialogContent
          title="Revoke this API key?"
          description="The qeet-pay reconciler stops working at once. This can't be undone."
          size="sm"
        >
          <DialogFooter>
            <DialogClose render={<Button variant="ghost">Cancel</Button>} />
            <DialogClose render={<Button tone="danger">Revoke key</Button>} />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Inline>
  );
}

function Sizes() {
  return (
    <Inline gap="md">
      {(["sm", "md", "lg"] as const).map((size) => (
        <Dialog key={size}>
          <DialogTrigger render={<Button variant="soft">{size}</Button>} />
          <DialogContent
            title={`A ${size} dialog`}
            description={
              { sm: "400px: a question.", md: "560px: a short form.", lg: "800px: a longer task." }[
                size
              ]
            }
            size={size}
          >
            <DialogFooter>
              <DialogClose render={<Button>Done</Button>} />
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ))}
    </Inline>
  );
}

function LongBody() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="soft">Review terms</Button>} />
      <DialogContent title="Data processing terms" description="Version 4, from 1 November 2026.">
        <DialogBody>
          <Stack gap="md">
            {Array.from({ length: 12 }, (_, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: the clauses are numbered, in order.
              <Text key={index}>
                {index + 1}. Acme Pvt Ltd processes members' personal data only to run Qeet ID, in
                India, and keeps sign-in records for 400 days.
              </Text>
            ))}
          </Stack>
        </DialogBody>
        <DialogFooter>
          <DialogClose render={<Button variant="ghost">Not now</Button>} />
          <DialogClose render={<Button>Accept</Button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Controlled() {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState("");
  return (
    <Stack gap="sm" align="center">
      <Button tone="danger" onClick={() => setOpen(true)}>
        Delete 3 users
      </Button>
      <Text tone="subtle" size="sm">
        {done || "Nothing deleted yet."}
      </Text>
      <Dialog intent="danger" open={open} onOpenChange={setOpen}>
        <DialogContent
          title="Delete 3 users?"
          description="Priya Sharma, Rahul Verma and Ananya Iyer lose access at once."
          size="sm"
        >
          <DialogFooter>
            <DialogClose render={<Button variant="ghost">Cancel</Button>} />
            <Button
              tone="danger"
              onClick={() => {
                setDone("3 users deleted.");
                setOpen(false);
              }}
            >
              Delete users
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Stack>
  );
}

export const examples: ExampleDoc[] = [
  {
    id: "a-task",
    title: "A task",
    line: "A trigger, a title, a body and the actions. Focus lands on the first field; Escape and an outside click close it.",
    code: `<Dialog>
  <DialogTrigger render={<Button variant="soft">Edit profile</Button>} />
  <DialogContent title="Edit profile" description="Members of Acme Pvt Ltd see this name and email.">
    <DialogBody>
      <TextField label="Display name" defaultValue="Priya Sharma" />
    </DialogBody>
    <DialogFooter>
      <DialogClose render={<Button variant="ghost">Cancel</Button>} />
      <DialogClose render={<Button>Save changes</Button>} />
    </DialogFooter>
  </DialogContent>
</Dialog>`,
    render: () => <EditProfile />,
  },
  {
    id: "intents",
    title: "Warning and danger",
    line: "intent: an alert dialog with an amber or red line. A danger dialog closes only by its actions.",
    code: `<Dialog intent="danger">
  <DialogTrigger render={<Button tone="danger">Revoke key</Button>} />
  <DialogContent title="Revoke this API key?" description="The qeet-pay reconciler stops working at once. This can't be undone." size="sm">
    <DialogFooter>
      <DialogClose render={<Button variant="ghost">Cancel</Button>} />
      <DialogClose render={<Button tone="danger">Revoke key</Button>} />
    </DialogFooter>
  </DialogContent>
</Dialog>`,
    render: () => <Intents />,
  },
  {
    id: "sizes",
    title: "Sizes",
    line: "sm 400, md 560, lg 800 and xl 1120px, never wider than the window less 48px; fullscreen for a whole-screen task.",
    code: `<DialogContent title="A short form" size="md">…</DialogContent>`,
    render: () => <Sizes />,
  },
  {
    id: "a-long-body",
    title: "A long body",
    line: "DialogBody scrolls between a fixed header and footer; with nothing to focus in it, it takes focus to scroll by keys.",
    code: `<DialogContent title="Data processing terms" description="Version 4, from 1 November 2026.">
  <DialogBody>{terms}</DialogBody>
  <DialogFooter>…</DialogFooter>
</DialogContent>`,
    render: () => <LongBody />,
  },
  {
    id: "controlled",
    title: "Controlled",
    line: "open and onOpenChange: open it from code, close it once the action is done.",
    code: `const [open, setOpen] = useState(false);

<Button tone="danger" onClick={() => setOpen(true)}>Delete 3 users</Button>
<Dialog intent="danger" open={open} onOpenChange={setOpen}>
  <DialogContent title="Delete 3 users?" size="sm">
    <DialogFooter>
      <DialogClose render={<Button variant="ghost">Cancel</Button>} />
      <Button tone="danger" onClick={() => { deleteUsers(); setOpen(false); }}>Delete users</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
    render: () => <Controlled />,
  },
  {
    id: "in-hindi",
    title: "In Hindi",
    line: "The close button's name comes from QeetrixProvider.",
    code: `<QeetrixProvider locale="hi-IN" messages={hi}>
  <Dialog>…</Dialog>
</QeetrixProvider>`,
    render: () => (
      <QeetrixProvider locale="hi-IN" messages={hi}>
        <Dialog>
          <DialogTrigger render={<Button variant="soft">प्रोफ़ाइल बदलें</Button>} />
          <DialogContent title="प्रोफ़ाइल बदलें" description="Acme Pvt Ltd के सदस्य यह नाम देखते हैं।">
            <DialogBody>
              <TextField label="नाम" defaultValue="प्रिया शर्मा" />
            </DialogBody>
            <DialogFooter>
              <DialogClose render={<Button variant="ghost">रद्द करें</Button>} />
              <DialogClose render={<Button>सहेजें</Button>} />
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </QeetrixProvider>
    ),
  },
];
