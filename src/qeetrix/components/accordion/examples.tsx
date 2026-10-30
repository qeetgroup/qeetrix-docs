// Components › Accordion: its examples, the real Accordion with the code for each. Shared by the
// page (doc.tsx) and the island that runs them (Live.tsx): nothing here reads token data.
import { Accordion, AccordionItem, Button, Heading, Inline, Stack } from "@qeetrix/react";
import { useState } from "react";
import type { ExampleDoc } from "../types";

/** Qeet ID's questions: a value, the question, its answer. */
export const FAQ: Array<[value: string, title: string, answer: string]> = [
  [
    "passkeys",
    "What is a passkey?",
    "A phishing-resistant credential bound to your device: face, fingerprint or screen lock.",
  ],
  [
    "mfa",
    "Can I require MFA for everyone?",
    "Yes. Admins can enforce MFA across Acme Pvt Ltd, with exceptions per role.",
  ],
  [
    "sso",
    "Which SSO protocols are supported?",
    "SAML 2.0 and OpenID Connect, for inbound and outbound federation.",
  ],
];

export const Questions = ({ multiple = false, open = ["passkeys"] }) => (
  <Accordion multiple={multiple} defaultValue={open}>
    {FAQ.map(([value, title, answer]) => (
      <AccordionItem key={value} value={value} title={title}>
        {answer}
      </AccordionItem>
    ))}
  </Accordion>
);

function OpenAll() {
  const [open, setOpen] = useState<string[]>([]);
  const all = open.length === FAQ.length;
  return (
    <Stack gap="md">
      <Inline justify="end">
        <Button variant="ghost" onClick={() => setOpen(all ? [] : FAQ.map(([value]) => value))}>
          {all ? "Close all" : "Open all"}
        </Button>
      </Inline>
      <Accordion multiple value={open} onValueChange={(value) => setOpen(value as string[])}>
        {FAQ.map(([value, title, answer]) => (
          <AccordionItem key={value} value={value} title={title}>
            {answer}
          </AccordionItem>
        ))}
      </Accordion>
    </Stack>
  );
}

export const examples: ExampleDoc[] = [
  {
    id: "questions",
    title: "Questions",
    line: "One open at a time: opening a section closes the one that was open.",
    code: `<Accordion defaultValue={["passkeys"]}>
  <AccordionItem value="passkeys" title="What is a passkey?">…</AccordionItem>
  <AccordionItem value="mfa" title="Can I require MFA for everyone?">…</AccordionItem>
  <AccordionItem value="sso" title="Which SSO protocols are supported?">…</AccordionItem>
</Accordion>`,
    render: () => (
      <div className="qc-fold-stage">
        <Questions />
      </div>
    ),
  },
  {
    id: "several-open",
    title: "Several open",
    line: "multiple: each section opens and closes on its own.",
    code: `<Accordion multiple defaultValue={["passkeys", "mfa"]}>…</Accordion>`,
    render: () => (
      <div className="qc-fold-stage">
        <Questions multiple open={["passkeys", "mfa"]} />
      </div>
    ),
  },
  {
    id: "disabled",
    title: "Disabled",
    line: "disabled on a section keeps it shut; on the Accordion, every section.",
    code: `<AccordionItem value="einvoice" title="E-invoicing (IRN)" disabled>
  Available on the Business plan.
</AccordionItem>`,
    render: () => (
      <div className="qc-fold-stage">
        <Accordion defaultValue={["tax"]}>
          <AccordionItem value="tax" title="Tax settings">
            GST at 18%. GSTIN 29ABCDE1234F1Z5.
          </AccordionItem>
          <AccordionItem value="numbering" title="Invoice numbering">
            INV-2026-0412
          </AccordionItem>
          <AccordionItem value="einvoice" title="E-invoicing (IRN)" disabled>
            Available on the Business plan.
          </AccordionItem>
        </Accordion>
      </div>
    ),
  },
  {
    id: "heading-level",
    title: "Heading level",
    line: "headingLevel: each trigger sits in a heading, h3 by default. One level under the heading above it.",
    code: `<Heading level={3}>Advanced options</Heading>
<Accordion>
  <AccordionItem value="tokens" headingLevel={4} title="Token lifetimes">…</AccordionItem>
</Accordion>`,
    render: () => (
      <div className="qc-fold-stage">
        <Stack gap="md">
          <Heading level={3} size="title-md">
            Advanced options
          </Heading>
          <Accordion>
            <AccordionItem value="tokens" headingLevel={4} title="Token lifetimes">
              Access tokens 1 hour, refresh tokens 30 days.
            </AccordionItem>
            <AccordionItem value="session" headingLevel={4} title="Session limits">
              12 hours, or 30 minutes idle.
            </AccordionItem>
            <AccordionItem value="ip" headingLevel={4} title="IP allow list">
              No ranges yet.
            </AccordionItem>
          </Accordion>
        </Stack>
      </div>
    ),
  },
  {
    id: "open-all",
    title: "Open all",
    line: "value and onValueChange, controlled: a button opens or closes every section.",
    code: `const [open, setOpen] = useState<string[]>([]);

<Button variant="ghost" onClick={() => setOpen(all ? [] : values)}>Open all</Button>
<Accordion multiple value={open} onValueChange={setOpen}>…</Accordion>`,
    render: () => (
      <div className="qc-fold-stage">
        <OpenAll />
      </div>
    ),
  },
];
