import { CapabilityStrip } from "@/components/home/capability-strip";
import { ComponentShowcase } from "@/components/home/component-showcase";
import { EcosystemLatest } from "@/components/home/ecosystem-latest";
import { EnterpriseCapabilities } from "@/components/home/enterprise-capabilities";
import { ExploreQeetrix } from "@/components/home/explore-qeetrix";
import { FinalCta } from "@/components/home/final-cta";
import { HomeHero } from "@/components/home/home-hero";
import { HomeMotion } from "@/components/home/home-motion";
import { HomeThemeStyles } from "@/components/home/home-theme-styles";
import { ProductionGuides } from "@/components/home/production-guides";
import { TokenArchitecture } from "@/components/home/token-architecture";
import { pageMetadata } from "@/lib/metadata";
import { appDescription, appName, siteUrl } from "@/lib/shared";

export const metadata = pageMetadata({
  title: { absolute: `${appName} — the Qeet design system` },
  description: appDescription,
  path: "/",
  image: "/og/image.png",
});

/** Names the site to search engines, which show it beside results instead of the bare domain. */
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: appName,
  url: siteUrl,
  description: appDescription,
  publisher: {
    "@type": "Organization",
    name: "Qeet Group",
    url: "https://qeet.in",
  },
};

export default function HomePage() {
  return (
    <HomeMotion>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD is a script element; `<` is escaped.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <HomeThemeStyles />
      <HomeHero />
      <CapabilityStrip />
      <ComponentShowcase />
      <ExploreQeetrix />
      <TokenArchitecture />
      <ProductionGuides />
      <EnterpriseCapabilities />
      <EcosystemLatest />
      <FinalCta />
    </HomeMotion>
  );
}
