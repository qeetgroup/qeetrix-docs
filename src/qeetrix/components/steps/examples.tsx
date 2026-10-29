// Components › Steps: its examples, the real Steps with the code for each. Shared by the page
// (doc.tsx) and the island that runs them (Live.tsx): nothing here reads token data.
import { ArrowRightIcon } from "@qeetrix/icons/icons/arrow-right";
import {
  Button,
  Card,
  Field,
  Inline,
  Input,
  mirrorInRtl,
  QeetrixProvider,
  Stack,
  Text,
} from "@qeetrix/react";
import { Steps } from "@qeetrix/react/experimental";
import { hi } from "@qeetrix/react/locales/hi";
import { useState } from "react";
import type { ExampleDoc } from "../types";

export const ADD_APP = [
  { label: "Choose type" },
  { label: "Configure" },
  { label: "Assign users" },
  { label: "Review" },
];

export const SAML = [
  { label: "Upload IdP metadata", description: "acme-idp-metadata.xml" },
  { label: "Map attributes", description: "Email, name and groups" },
  { label: "Test sign-in", description: "priya@acme.in" },
  { label: "Turn it on", description: "Everyone at acme.in" },
];

const Forward = mirrorInRtl(ArrowRightIcon);

function AddApplication() {
  const [current, setCurrent] = useState(1);
  const done = current === ADD_APP.length;
  return (
    <div className="qc-steps-card">
      <Card
        title="Add an application"
        level={3}
        footer={
          <Inline gap="sm" justify="end">
            <Button
              variant="ghost"
              disabled={current === 0}
              onClick={() => setCurrent((step) => Math.max(0, step - 1))}
            >
              Back
            </Button>
            <Button
              icon={Forward}
              disabled={done}
              onClick={() => setCurrent((step) => Math.min(ADD_APP.length, step + 1))}
            >
              {current === ADD_APP.length - 1 ? "Create application" : "Continue"}
            </Button>
          </Inline>
        }
      >
        <Stack gap="xl">
          <Steps steps={ADD_APP} current={current} onStepSelect={setCurrent} />
          {done ? (
            <Text>Payroll portal is ready.</Text>
          ) : (
            <Field label="Application name">
              <Input defaultValue="Payroll portal" />
            </Field>
          )}
        </Stack>
      </Card>
    </div>
  );
}

export const examples: ExampleDoc[] = [
  {
    id: "a-short-wizard",
    title: "A short wizard",
    line: "Done steps filled with a tick, the current one outlined, those to come grey: an ordered list.",
    code: `const steps = [
  { label: "Choose type" },
  { label: "Configure" },
  { label: "Assign users" },
  { label: "Review" },
];

<Steps steps={steps} current={1} />`,
    render: () => (
      <div className="qc-steps-stage">
        <Steps steps={ADD_APP} current={1} />
      </div>
    ),
  },
  {
    id: "vertical",
    title: "Vertical",
    line: 'orientation="vertical", with a description under each label: for a longer setup.',
    code: `<Steps
  orientation="vertical"
  current={2}
  steps={[
    { label: "Upload IdP metadata", description: "acme-idp-metadata.xml" },
    { label: "Map attributes", description: "Email, name and groups" },
    { label: "Test sign-in", description: "priya@acme.in" },
    { label: "Turn it on", description: "Everyone at acme.in" },
  ]}
/>`,
    render: () => (
      <div className="qc-steps-stage" data-narrow="">
        <Steps steps={SAML} current={2} orientation="vertical" />
      </div>
    ),
  },
  {
    id: "back-to-a-done-step",
    title: "Back to a done step",
    line: "onStepSelect: done steps become buttons back to themselves. Steps ahead never are.",
    code: `const [current, setCurrent] = useState(1);

<Steps steps={steps} current={current} onStepSelect={setCurrent} />`,
    render: () => <AddApplication />,
  },
  {
    id: "narrow",
    title: "Narrow",
    line: "Under 24rem, only the current step's label shows; the markers keep their place.",
    code: `<Steps steps={steps} current={2} />`,
    render: () => (
      <div className="qc-steps-stage" data-narrow="">
        <Steps steps={ADD_APP} current={2} />
      </div>
    ),
  },
  {
    id: "a-step-that-failed",
    title: "A step that failed",
    line: 'status: "failed" or "attention", read after the name; a later step can stay done.',
    code: `const steps = [
  { label: "Upload IdP metadata" },
  { label: "Map attributes" },
  { label: "Test sign-in", status: "failed" },
  { label: "Turn it on" },
];

<Steps steps={steps} current={2} orientation="vertical" />`,
    render: () => (
      <div className="qc-steps-stage">
        <Steps
          steps={[
            { label: "Upload IdP metadata", description: "acme-idp-metadata.xml" },
            { label: "Map attributes", description: "Email, name and groups" },
            {
              label: "Test sign-in",
              description: "The assertion's signature didn't match",
              status: "failed",
            },
            { label: "Turn it on", description: "Everyone at acme.in" },
          ]}
          current={2}
          orientation="vertical"
        />
      </div>
    ),
  },
  {
    id: "all-done",
    title: "All done",
    line: "current={steps.length}: every step ticked.",
    code: `<Steps steps={steps} current={steps.length} />`,
    render: () => (
      <div className="qc-steps-stage">
        <Steps steps={ADD_APP} current={ADD_APP.length} />
      </div>
    ),
  },
  {
    id: "in-hindi",
    title: "In Hindi",
    line: 'QeetrixProvider\'s messages: the list\'s name, and "Completed" and "Not started" for screen readers.',
    code: `import { hi } from "@qeetrix/react/locales/hi";

<QeetrixProvider messages={hi}>
  <Steps steps={steps} current={1} />
</QeetrixProvider>`,
    render: () => (
      <div className="qc-steps-stage" lang="hi">
        <QeetrixProvider messages={hi}>
          <Steps
            steps={[
              { label: "प्रकार चुनें" },
              { label: "सेट करें" },
              { label: "उपयोगकर्ता जोड़ें" },
              { label: "जाँचें" },
            ]}
            current={1}
          />
        </QeetrixProvider>
      </div>
    ),
  },
];
