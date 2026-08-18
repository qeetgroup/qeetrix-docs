import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Plausible } from "@/components/plausible";
import { Providers } from "@/components/providers";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WebVitals } from "@/components/web-vitals";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.title, template: "%s — Qeetrix" },
  description: SITE.description,
  applicationName: "Qeetrix",
  keywords: [
    "Qeetrix",
    "design system",
    "React components",
    "Base UI",
    "Tailwind v4",
    "design tokens",
    "accessible components",
    "shadcn alternative",
  ],
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    url: SITE.url,
    siteName: "Qeetrix",
    type: "website",
    images: [{ url: "/og", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    images: ["/og"],
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "Qeetrix",
      url: SITE.url,
      description: SITE.description,
    },
    {
      "@type": "SoftwareApplication",
      name: SITE.package,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Web",
      softwareVersion: SITE.version,
      description: SITE.description,
      url: SITE.url,
      author: { "@type": "Organization", name: "Qeet Group", url: SITE.suite },
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only rounded-md border border-border bg-card px-3 py-2 text-sm font-medium focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50"
        >
          Skip to content
        </a>
        <Providers>
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </Providers>
        <Plausible />
        <WebVitals />
      </body>
    </html>
  );
}
