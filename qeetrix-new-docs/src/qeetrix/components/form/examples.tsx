// Components › Form: its examples, the real Form with the code for each. Shared by the page (doc.tsx)
// and the island that runs them (Live.tsx): nothing here reads token data. The server is a timer.
import { ArrowRightIcon } from "@qeetrix/icons/icons/arrow-right";
import { Button, mirrorInRtl, Radio, RadioGroup, Stack, Text, TextField } from "@qeetrix/react";
import { ErrorSummary, Form } from "@qeetrix/react/experimental";
import { useState } from "react";
import type { ExampleDoc } from "../types";

const Next = mirrorInRtl(ArrowRightIcon);

/** An invite form that checks itself on submit. */
function Invite() {
  const [sent, setSent] = useState("");
  return (
    <Form onFormSubmit={(values) => setSent(`Invite sent to ${values.email}.`)}>
      <TextField
        label="Full name"
        name="name"
        autoComplete="off"
        validate={(value) => (value ? null : "Enter their full name.")}
      />
      <TextField
        label="Work email"
        name="email"
        type="email"
        autoComplete="off"
        validate={(value) =>
          String(value ?? "").includes("@") ? null : "Enter a work email, like priya@acme.in."
        }
      />
      <RadioGroup label="Role" name="role" defaultValue="member">
        <Radio value="member" label="Member" />
        <Radio value="admin" label="Admin" />
      </RadioGroup>
      <Stack gap="sm" align="start">
        <Button type="submit" icon={Next}>
          Send invite
        </Button>
        {sent && <Text tone="subtle">{sent}</Text>}
      </Stack>
    </Form>
  );
}

/** The same form, and the server's answer: a field's error, by its name. */
function Taken() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  return (
    <Form
      errors={errors}
      onFormSubmit={(values) => {
        setBusy(true);
        window.setTimeout(() => {
          setErrors({ email: `${values.email} is already a member of Acme.` });
          setBusy(false);
        }, 600);
      }}
    >
      <TextField
        label="Work email"
        name="email"
        type="email"
        required
        defaultValue="priya@acme.in"
        autoComplete="off"
      />
      <Button type="submit" icon={Next} loading={busy}>
        Send invite
      </Button>
    </Form>
  );
}

export const examples: ExampleDoc[] = [
  {
    id: "checked-on-submit",
    title: "Checked on submit",
    line: "Send it empty: the summary lists what to fix, in each field's own words, takes focus, and links to each field.",
    code: `<Form onFormSubmit={(values) => invite(values)}>
  <TextField label="Full name" name="name" validate={(value) => (value ? null : "Enter their full name.")} />
  <TextField label="Work email" name="email" type="email" validate={(value) => (value.includes("@") ? null : "Enter a work email, like priya@acme.in.")} />
  <RadioGroup label="Role" name="role" defaultValue="member">
    <Radio value="member" label="Member" />
    <Radio value="admin" label="Admin" />
  </RadioGroup>
  <Button type="submit" icon={Next}>Send invite</Button>
</Form>`,
    render: () => (
      <div className="qc-wide">
        <Invite />
      </div>
    ),
  },
  {
    id: "server-errors",
    title: "Server errors",
    line: "errors, keyed by each field's name: they show on the field and in the summary.",
    code: `const [errors, setErrors] = useState({});

<Form errors={errors} onFormSubmit={async (values) => setErrors(await invite(values))}>
  <TextField label="Work email" name="email" type="email" required />
  <Button type="submit" icon={Next}>Send invite</Button>
</Form>`,
    render: () => (
      <div className="qc-wide">
        <Taken />
      </div>
    ),
  },
  {
    id: "error-summary",
    title: "The summary on its own",
    line: "ErrorSummary: a danger alert with a heading, each item worded as its field's error and linked to it.",
    code: `<ErrorSummary
  autoFocus={false}
  items={[
    { id: "email", message: "Enter a work email, like priya@acme.in." },
    { id: "role", message: "Choose a role." },
  ]}
/>`,
    render: () => (
      <div className="qc-wide">
        <ErrorSummary
          autoFocus={false}
          items={[
            { message: "Enter a work email, like priya@acme.in." },
            { message: "Choose a role." },
          ]}
        />
      </div>
    ),
  },
];
