import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { PlayTabs } from "@/components/play-tabs";

export const metadata: Metadata = {
  title: "Playground",
  description:
    "Tweak real Qeetrix component props live, copy the code, or edit in a full in-browser sandbox.",
};

export default function PlayPage() {
  return (
    <PageShell
      title="Playground"
      crumbs={[{ title: "Playground" }]}
      lead="Controls: tweak props on the real @qeetrix/ui components and copy the code. Live sandbox: edit self-contained components in a full in-browser bundle."
    >
      <PlayTabs />
    </PageShell>
  );
}
