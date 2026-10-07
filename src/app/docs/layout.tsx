// Spacious: the full-width layout fumadocs.dev uses — the page sits in an inset panel beside the
// sidebar, which collapses, and the sidebar's menu switches between the docs sections (the layout
// tabs). The site header sits above it; `--fd-banner-height` is how Fumadocs layouts make room for
// a bar above them, so the layout's height and sticky offsets account for the header.
import { Toaster } from "@qeetrix/ui";
import { DocsLayout } from "fumadocs-ui/layouts/spacious";
import { SiteHeader } from "@/components/site-header";
import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";

export default function Layout({ children }: LayoutProps<"/docs">) {
  return (
    <div className="flex flex-1 flex-col [--fd-banner-height:var(--site-header-height)]">
      <SiteHeader />
      <DocsLayout tree={source.getPageTree()} {...baseOptions()}>
        {children}
        {/* For the toast examples; renders nothing until a toast fires. */}
        <Toaster />
      </DocsLayout>
    </div>
  );
}
