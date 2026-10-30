// Components › Toast: its examples, the real toasts with the code for each. Shared by the page
// (doc.tsx) and the island that runs them (Live.tsx): nothing here reads token data. Each example has
// its own ToastProvider, as an app has one.
import { Button, Inline, QeetrixProvider, ToastProvider, useToast } from "@qeetrix/react";
import { hi } from "@qeetrix/react/locales/hi";
import type { ReactNode } from "react";
import type { ExampleDoc } from "../types";

const save = (ok: boolean) =>
  new Promise<string>((resolve, reject) =>
    window.setTimeout(
      () => (ok ? resolve("INV-2026-0042") : reject(new Error("The network dropped"))),
      1200,
    ),
  );

function Tones() {
  const toast = useToast();
  return (
    <Inline gap="sm">
      <Button
        variant="soft"
        onClick={() =>
          toast.add({ title: "Sync scheduled", description: "Directory sync runs at 02:00 IST." })
        }
      >
        Info
      </Button>
      <Button
        variant="soft"
        onClick={() =>
          toast.add({ title: "Invoice sent", description: "To finance@acme.in.", tone: "success" })
        }
      >
        Success
      </Button>
      <Button
        variant="soft"
        onClick={() =>
          toast.add({ title: "Seats running low", description: "3 of 50 left.", tone: "warning" })
        }
      >
        Warning
      </Button>
      <Button
        variant="soft"
        onClick={() =>
          toast.add({
            title: "Couldn't send the invoice",
            description: "Stays until you close it.",
            tone: "danger",
          })
        }
      >
        Danger
      </Button>
    </Inline>
  );
}

function WithUndo() {
  const toast = useToast();
  return (
    <Button
      tone="danger"
      variant="soft"
      onClick={() =>
        toast.add({
          title: "Priya Sharma removed",
          tone: "success",
          action: {
            label: "Undo",
            onClick: () => toast.add({ title: "Priya Sharma is back", tone: "info" }),
          },
        })
      }
    >
      Remove Priya Sharma
    </Button>
  );
}

function Pending() {
  const toast = useToast();
  return (
    <Inline gap="sm">
      <Button
        variant="soft"
        onClick={() =>
          toast.promise(save(true), {
            loading: { title: "Sending the invoice…" },
            success: (id) => ({ title: `${id} sent` }),
            error: { title: "Couldn't send it" },
          })
        }
      >
        Send, and it works
      </Button>
      <Button
        variant="soft"
        onClick={() =>
          toast
            .promise(save(false), {
              loading: { title: "Sending the invoice…" },
              success: { title: "Sent" },
              error: (reason) => ({
                title: "Couldn't send it",
                description: String((reason as Error).message),
              }),
            })
            .catch(() => {})
        }
      >
        Send, and it fails
      </Button>
    </Inline>
  );
}

function Hindi() {
  const toast = useToast();
  return (
    <Button variant="soft" onClick={() => toast.add({ title: "चालान भेजा गया", tone: "success" })}>
      चालान भेजें
    </Button>
  );
}

const Provided = ({ children }: { children: ReactNode }) => (
  <ToastProvider>{children}</ToastProvider>
);

export const examples: ExampleDoc[] = [
  {
    id: "tones",
    title: "Tones",
    line: "Info, success, warning and danger, each with its status edge and icon. Danger stays until it's closed, and is announced at once.",
    code: `const toast = useToast();

<Button onClick={() => toast.add({ title: "Invoice sent", description: "To finance@acme.in.", tone: "success" })}>Send</Button>`,
    render: () => (
      <Provided>
        <Tones />
      </Provided>
    ),
  },
  {
    id: "with-undo",
    title: "With Undo",
    line: "One action at most: Undo, for something just done.",
    code: `toast.add({
  title: "Priya Sharma removed",
  tone: "success",
  action: { label: "Undo", onClick: () => restore(member) },
});`,
    render: () => (
      <Provided>
        <WithUndo />
      </Provided>
    ),
  },
  {
    id: "while-it-works",
    title: "While it works",
    line: "promise: a spinner while it's pending, then success or the reason it failed.",
    code: `toast.promise(sendInvoice(), {
  loading: { title: "Sending the invoice…" },
  success: (id) => ({ title: \`\${id} sent\` }),
  error: (reason) => ({ title: "Couldn't send it", description: reason.message }),
});`,
    render: () => (
      <Provided>
        <Pending />
      </Provided>
    ),
  },
  {
    id: "in-hindi",
    title: "In Hindi",
    line: "The region's name and the close button's come from QeetrixProvider.",
    code: `<QeetrixProvider locale="hi-IN" messages={hi}>
  <ToastProvider>…</ToastProvider>
</QeetrixProvider>`,
    render: () => (
      <QeetrixProvider locale="hi-IN" messages={hi}>
        <Provided>
          <Hindi />
        </Provided>
      </QeetrixProvider>
    ),
  },
];
