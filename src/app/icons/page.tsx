import type { Metadata } from "next";
import { IconBrowser } from "@/components/icon-browser";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Icons",
  description:
    "Browse and copy Qeetrix icons — the Qeet brand set plus lucide, standardised through the <Icon> wrapper.",
};

export default function IconsPage() {
  return (
    <PageShell
      variant="wide"
      title="Icons"
      crumbs={[{ title: "Icons" }]}
      lead="The Qeet brand icons plus lucide, all standardised through the <Icon> wrapper (--qx-icon-* sizing). Click any icon to copy its import."
    >
      <IconBrowser />
    </PageShell>
  );
}
