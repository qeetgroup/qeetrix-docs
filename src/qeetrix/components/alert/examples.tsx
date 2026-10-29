// Components › Alert: its examples, the real Alert with the code for each. Shared by the page
// (doc.tsx) and the island that runs them (Live.tsx), as Dismiss and announce need React: nothing
// here reads token data.
import { EyeIcon } from "@qeetrix/icons/icons/eye";
import { KeyRoundIcon } from "@qeetrix/icons/icons/key-round";
import { WrenchIcon } from "@qeetrix/icons/icons/wrench";
import { Button, QeetrixProvider, Stack } from "@qeetrix/react";
import { Alert } from "@qeetrix/react/experimental";
import { hi } from "@qeetrix/react/locales/hi";
import { useState } from "react";
import type { ExampleDoc } from "../types";

function Dismissible() {
  const [shown, setShown] = useState(true);
  return shown ? (
    <Alert tone="success" title="Directory synced" onDismiss={() => setShown(false)}>
      1,284 users are up to date.
    </Alert>
  ) : (
    <Button variant="soft" onClick={() => setShown(true)}>
      Show it again
    </Button>
  );
}

function Announced() {
  const [failed, setFailed] = useState(false);
  return (
    <Stack gap="md">
      <Button variant="soft" onClick={() => setFailed(true)} disabled={failed}>
        Sync now
      </Button>
      {failed && (
        <Alert tone="danger" title="Directory sync failed" announce="urgent">
          Azure AD rejected the client secret.
        </Alert>
      )}
    </Stack>
  );
}

export const examples: ExampleDoc[] = [
  {
    id: "tones",
    title: "Tones",
    line: 'The icon and a hidden word carry the tone ("Warning:"), never colour alone.',
    code: `<Alert tone="info" title="You're in Development">Sign-ins here don't reach production.</Alert>
<Alert tone="success" title="Directory synced">1,284 users are up to date.</Alert>
<Alert tone="warning" title="Directory sync is behind">Users added in the last hour may be missing.</Alert>
<Alert tone="danger" title="Directory sync failed">Azure AD rejected the client secret.</Alert>`,
    render: () => (
      <Stack gap="lg" className="qc-alert-stage">
        <Alert tone="info" title="You're in Development">
          Sign-ins here don't reach production.
        </Alert>
        <Alert tone="success" title="Directory synced">
          1,284 users are up to date.
        </Alert>
        <Alert tone="warning" title="Directory sync is behind">
          Users added in the last hour may be missing.
        </Alert>
        <Alert tone="danger" title="Directory sync failed">
          Azure AD rejected the client secret.
        </Alert>
      </Stack>
    ),
  },
  {
    id: "with-actions",
    title: "With actions",
    line: "actions under the text: one primary at most.",
    code: `<Alert
  tone="danger"
  title="Directory sync failed"
  actions={
    <>
      <Button size="sm">Retry sync</Button>
      <Button size="sm" variant="ghost" tone="neutral">View details</Button>
    </>
  }
>
  The last three attempts timed out.
</Alert>`,
    render: () => (
      <div className="qc-alert-stage">
        <Alert
          tone="danger"
          title="Directory sync failed"
          actions={
            <>
              <Button size="sm">Retry sync</Button>
              <Button size="sm" variant="ghost" tone="neutral">
                View details
              </Button>
            </>
          }
        >
          The last three attempts timed out.
        </Alert>
      </div>
    ),
  },
  {
    id: "dismiss",
    title: "Dismiss",
    line: "onDismiss adds a Dismiss button. You decide whether the alert comes back.",
    code: `<Alert tone="success" title="Directory synced" onDismiss={() => setShown(false)}>
  1,284 users are up to date.
</Alert>`,
    render: () => (
      <div className="qc-alert-stage">
        <Dismissible />
      </div>
    ),
  },
  {
    id: "your-own-icon",
    title: "Your own icon",
    line: "icon, in place of the tone's: an eye for viewing as someone else.",
    code: `<Alert tone="warning" icon={EyeIcon} title="You're viewing as Priya Sharma">
  Anything you change is done as her.
</Alert>`,
    render: () => (
      <Stack gap="lg" className="qc-alert-stage">
        <Alert tone="warning" icon={EyeIcon} title="You're viewing as Priya Sharma">
          Anything you change is done as her.
        </Alert>
        <Alert tone="info" icon={KeyRoundIcon} title="The signing key rotates in 7 days" />
      </Stack>
    ),
  },
  {
    id: "page-banner",
    title: "Page banner",
    line: 'variant="banner": a notice about the whole app, one line across the page, its actions at the end. In AppShell\'s banners.',
    code: `<Alert
  variant="banner"
  icon={WrenchIcon}
  title="Maintenance on Sunday 2 November, 01:00–02:00 IST."
  actions={<Button size="sm" variant="ghost" tone="neutral">Details</Button>}
  onDismiss={dismiss}
>
  Sign-in keeps working.
</Alert>`,
    render: () => (
      <Stack gap="md" className="qc-banner-stage">
        <Alert
          variant="banner"
          tone="warning"
          icon={EyeIcon}
          title="You're viewing as Priya Sharma"
          actions={
            <Button size="sm" tone="neutral">
              Exit
            </Button>
          }
        >
          (priya@acme.in). Anything you change is done as her.
        </Alert>
        <Alert
          variant="banner"
          icon={WrenchIcon}
          title="Maintenance on Sunday 2 November, 01:00–02:00 IST."
          actions={
            <Button size="sm" variant="ghost" tone="neutral">
              Details
            </Button>
          }
          onDismiss={() => {}}
        >
          Sign-in keeps working.
        </Alert>
      </Stack>
    ),
  },
  {
    id: "after-something-happens",
    title: "After something happens",
    line: 'announce: "urgent" interrupts (role="alert") for an error that blocks the task; "polite" waits its turn. Only for an alert that appears.',
    code: `{failed && (
  <Alert tone="danger" title="Directory sync failed" announce="urgent">
    Azure AD rejected the client secret.
  </Alert>
)}`,
    render: () => (
      <div className="qc-alert-stage">
        <Announced />
      </div>
    ),
  },
  {
    id: "in-hindi",
    title: "In Hindi",
    line: "QeetrixProvider's messages: the hidden tone word and Dismiss.",
    code: `<QeetrixProvider messages={hi}>
  <Alert tone="warning" title="डायरेक्टरी सिंक पीछे है" onDismiss={dismiss}>…</Alert>
</QeetrixProvider>`,
    render: () => (
      <div className="qc-alert-stage" lang="hi">
        <QeetrixProvider messages={hi}>
          <Alert tone="warning" title="डायरेक्टरी सिंक पीछे है" onDismiss={() => {}}>
            पिछले एक घंटे में जोड़े गए उपयोगकर्ता शायद नहीं दिखें।
          </Alert>
        </QeetrixProvider>
      </div>
    ),
  },
];
