// Components › Text field: its examples, the real TextField with the code for each. Shared by the
// page (doc.tsx) and the island that runs them (Live.tsx): nothing here reads token data.
import { MailIcon } from "@qeetrix/icons/icons/mail";
import { Grid, Link, QeetrixProvider, Stack, TextField } from "@qeetrix/react";
import { hi } from "@qeetrix/react/locales/hi";
import type { ExampleDoc } from "../types";

/** The work-email rule, as a form would check it. */
const workEmail = (value: unknown) =>
  typeof value === "string" && value !== "" && !value.endsWith("@acme.in")
    ? "Use your acme.in email, like priya@acme.in."
    : null;

export const examples: ExampleDoc[] = [
  {
    id: "states",
    title: "Optional, invalid, disabled, read-only",
    line: "Optional is marked; required isn't. An error replaces the description while it shows.",
    code: `<Stack gap="lg">
  <TextField label="Trade name" optional placeholder="e.g. Acme" />
  <TextField label="PAN" defaultValue="ABCDE1234F" error="This PAN is already registered." />
  <TextField label="Tenant ID" disabled defaultValue="ten_8f2c1a9b3e47" />
  <TextField label="Client ID" readOnly defaultValue="qid_live_8f2c1a9b3e47" />
</Stack>`,
    render: () => (
      <div className="qc-narrow">
        <Stack gap="lg">
          <TextField label="Trade name" optional placeholder="e.g. Acme" />
          <TextField
            label="PAN"
            defaultValue="ABCDE1234F"
            error="This PAN is already registered."
          />
          <TextField label="Tenant ID" disabled defaultValue="ten_8f2c1a9b3e47" />
          <TextField label="Client ID" readOnly defaultValue="qid_live_8f2c1a9b3e47" />
        </Stack>
      </div>
    ),
  },
  {
    id: "icon-and-affixes",
    title: "Icon and affixes",
    line: "A leading icon, and text before or after the value: ₹, .qeet.in.",
    code: `<Stack gap="lg">
  <TextField label="Work email" type="email" icon={MailIcon} placeholder="e.g. priya@acme.in" />
  <TextField label="Subdomain" defaultValue="acme" endAdornment=".qeet.in" />
  <TextField label="Credit limit" defaultValue="1,24,500" startAdornment="₹" />
</Stack>`,
    render: () => (
      <div className="qc-narrow">
        <Stack gap="lg">
          <TextField
            label="Work email"
            type="email"
            icon={MailIcon}
            placeholder="e.g. priya@acme.in"
          />
          <TextField label="Subdomain" defaultValue="acme" endAdornment=".qeet.in" />
          <TextField label="Credit limit" defaultValue="1,24,500" startAdornment="₹" />
        </Stack>
      </div>
    ),
  },
  {
    id: "with-help",
    title: "With help",
    line: "description sits under the field; help opens behind ⓘ, for a setting that needs explaining.",
    code: `<TextField
  label="Redirect URI"
  placeholder="e.g. https://payroll.acme.in/callback"
  description="Exactly as your app sends it."
  help={<>Where Qeet ID sends people back after they sign in. <Link href="#redirects">About redirect URIs</Link></>}
/>`,
    render: () => (
      <div className="qc-narrow">
        <TextField
          label="Redirect URI"
          placeholder="e.g. https://payroll.acme.in/callback"
          description="Exactly as your app sends it."
          help={
            <>
              Where Qeet ID sends people back after they sign in.{" "}
              <Link href="#with-help">About redirect URIs</Link>
            </>
          }
        />
      </div>
    ),
  },
  {
    id: "validation",
    title: "Validation",
    line: 'validate checks the value; validationMode="onBlur" says so as you leave the field.',
    code: `<TextField
  label="Work email"
  type="email"
  validationMode="onBlur"
  validate={(value) => (value.endsWith("@acme.in") ? null : "Use your acme.in email, like priya@acme.in.")}
/>`,
    render: () => (
      <div className="qc-narrow">
        <TextField
          label="Work email"
          type="email"
          defaultValue="priya@gmail.com"
          validationMode="onBlur"
          validate={workEmail}
        />
      </div>
    ),
  },
  {
    id: "in-a-form",
    title: "In a form",
    line: "Rows on the grid; autoComplete and type let the browser help.",
    code: `<Grid columns={2} gap="lg">
  <TextField label="Full name" autoComplete="name" defaultValue="Rahul Verma" />
  <TextField label="Work email" type="email" autoComplete="email" defaultValue="rahul@acme.in" />
  <TextField label="Company" autoComplete="organization" defaultValue="Acme Pvt Ltd" />
  <TextField label="Phone" optional type="tel" autoComplete="tel" placeholder="e.g. 98765 43210" />
</Grid>`,
    render: () => (
      <div className="qc-wide">
        <Grid columns={2} gap="lg">
          <TextField label="Full name" autoComplete="name" defaultValue="Rahul Verma" />
          <TextField
            label="Work email"
            type="email"
            autoComplete="email"
            defaultValue="rahul@acme.in"
          />
          <TextField label="Company" autoComplete="organization" defaultValue="Acme Pvt Ltd" />
          <TextField
            label="Phone"
            optional
            type="tel"
            autoComplete="tel"
            placeholder="e.g. 98765 43210"
          />
        </Grid>
      </div>
    ),
  },
  {
    id: "in-hindi",
    title: "In Hindi",
    line: 'Its words, "(वैकल्पिक)" among them, come from QeetrixProvider.',
    code: `<QeetrixProvider locale="hi-IN" messages={hi}>
  <TextField label="कानूनी नाम" defaultValue="Acme Private Limited" />
  <TextField label="व्यापार नाम" optional placeholder="जैसे Acme" />
</QeetrixProvider>`,
    render: () => (
      <QeetrixProvider locale="hi-IN" messages={hi}>
        <div className="qc-narrow">
          <Stack gap="lg">
            <TextField label="कानूनी नाम" defaultValue="Acme Private Limited" />
            <TextField label="व्यापार नाम" optional placeholder="जैसे Acme" />
          </Stack>
        </div>
      </QeetrixProvider>
    ),
  },
];
