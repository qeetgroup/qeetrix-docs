import { QeetLogo } from "@qeetrix/icons";
import {
  AppShell,
  AppShellContent,
  AppShellHeader,
  AppShellMain,
  Button,
  PageHeader,
  StatusPill,
} from "@qeetrix/ui";

const channels = [
  { id: "email", label: "Email", detail: "diya.sharma@northwind.in", on: true },
  {
    id: "sms",
    label: "SMS",
    detail: "+91 98450 12345 · DLT registered",
    on: true,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    detail: "Order and payment updates",
    on: false,
  },
  {
    id: "push",
    label: "Push",
    detail: "Qeet ID Authenticator on iPhone",
    on: true,
  },
  {
    id: "digest",
    label: "Weekly digest",
    detail: "Every Monday at 9:00 am IST",
    on: false,
  },
];

/**
 * The header-above-content arrangement: `AppShell` → `AppShellMain` → `AppShellHeader` +
 * `AppShellContent`, which is then the page's `<main>`. A sidebar would go first inside
 * `AppShell`; this hosted Qeet Notify page has none. `AppShell` is at least the viewport's height
 * by default (`min-h-svh`); `h-full min-h-0` fits it to this frame instead.
 *
 * @layout wide
 */
export default function AppShellHeaderAndContent() {
  return (
    <div className="h-96 overflow-hidden rounded-lg border border-border bg-background">
      <AppShell className="h-full min-h-0">
        <AppShellMain>
          <AppShellHeader>
            <QeetLogo height={24} className="shrink-0 dark:hidden" />
            <QeetLogo
              height={24}
              variant="dark"
              className="hidden shrink-0 dark:block"
            />
            <span className="text-sm font-semibold">Qeet Notify</span>
            <Button variant="outline" size="sm" className="ms-auto">
              Unsubscribe from all
            </Button>
          </AppShellHeader>
          <AppShellContent>
            <div className="mx-auto flex max-w-xl flex-col gap-4">
              <PageHeader
                title="Where we reach you"
                description="Security alerts always go to email and push, whatever you choose here."
              />
              <ul className="divide-y divide-border rounded-lg border border-border bg-card">
                {channels.map((channel) => (
                  <li
                    key={channel.id}
                    className="flex items-center justify-between gap-3 p-3"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium">{channel.label}</p>
                      <p className="truncate text-caption text-muted-foreground">
                        {channel.detail}
                      </p>
                    </div>
                    <StatusPill kind={channel.on ? "success" : "muted"}>
                      {channel.on ? "On" : "Off"}
                    </StatusPill>
                  </li>
                ))}
              </ul>
            </div>
          </AppShellContent>
        </AppShellMain>
      </AppShell>
    </div>
  );
}
