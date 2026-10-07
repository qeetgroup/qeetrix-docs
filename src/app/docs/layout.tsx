// Spacious: the full-width layout fumadocs.dev uses — the page sits in an inset panel beside the
// sidebar, with page actions at the top of the panel.
import { Toaster } from "@qeetrix/ui";
import { DocsLayout } from "fumadocs-ui/layouts/spacious";
import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";

export default function Layout({ children }: LayoutProps<"/docs">) {
  return (
    <DocsLayout tree={source.getPageTree()} {...baseOptions()}>
      {children}
      {/* For the toast examples; renders nothing until a toast fires. */}
      <Toaster />
    </DocsLayout>
  );
}
