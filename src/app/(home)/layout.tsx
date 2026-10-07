import { HomeFooter } from "@/components/home/home-footer";
import { SiteHeader } from "@/components/site-header";

/**
 * The landing page's own shell. The header is the site header the docs and the icon browser use
 * too; all share the root provider, so search and theme are one system across the site.
 */
export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex flex-1 flex-col">
        {children}
      </main>
      <HomeFooter />
    </>
  );
}
