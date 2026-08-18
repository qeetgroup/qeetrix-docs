import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { SearchView } from "@/components/search-view";

export const metadata: Metadata = {
  title: "Search",
  description: "Search components, tokens, foundations, and pages.",
  robots: { index: false },
};

export default function Page() {
  return (
    <PageShell
      title="Search"
      crumbs={[{ title: "Search" }]}
      lead="Search components, tokens, foundations, and pages."
    >
      <SearchView />
    </PageShell>
  );
}
