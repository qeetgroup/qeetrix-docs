import { HomeFooter } from "@/components/home/home-footer";
import { HomeHeader } from "@/components/home/home-header";

/**
 * The landing page's own shell. /docs keeps the Fumadocs docs layout; both share the root
 * provider, so search and theme are one system across the site.
 */
export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <>
      <HomeHeader />
      <main id="main" className="flex flex-1 flex-col">
        {children}
      </main>
      <HomeFooter />
    </>
  );
}
