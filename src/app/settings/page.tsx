import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { SettingsView } from "@/components/settings-view";

export const metadata: Metadata = {
  title: "Settings",
  description: "Reader preferences, stored locally in this browser.",
  robots: { index: false },
};

export default function Page() {
  return (
    <PageShell
      title="Settings"
      crumbs={[{ title: "Settings" }]}
      lead="Your preferences, stored locally in this browser."
    >
      <SettingsView />
    </PageShell>
  );
}
