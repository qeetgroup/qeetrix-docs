import { RootProvider } from "fumadocs-ui/provider/next";
import type { Metadata, Viewport } from "next";
import "./global.css";
import { openGraphBase } from "@/lib/metadata";
import { appDescription, appName, siteUrl } from "@/lib/shared";

// Icons, the manifest, the sitemap and robots.txt are file conventions in this directory. No
// canonical URL here: every page sets its own (lib/metadata.ts), and one set on the layout
// would be inherited by any page that forgot to.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: appName,
    template: `%s | ${appName}`,
  },
  description: appDescription,
  applicationName: appName,
  publisher: "Qeet Group",
  openGraph: { ...openGraphBase, images: "/og/image.png" },
};

/** The canvas colour of each theme (`color.surface.canvas`), for the browser's own UI. */
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfaf9" },
    { media: "(prefers-color-scheme: dark)", color: "#0e0d0d" },
  ],
};

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
