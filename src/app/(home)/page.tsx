import { CapabilityStrip } from "@/components/home/capability-strip";
import { ComponentShowcase } from "@/components/home/component-showcase";
import { EcosystemLatest } from "@/components/home/ecosystem-latest";
import { EnterpriseCapabilities } from "@/components/home/enterprise-capabilities";
import { ExploreQeetrix } from "@/components/home/explore-qeetrix";
import { FinalCta } from "@/components/home/final-cta";
import { HomeHero } from "@/components/home/home-hero";
import { ProductionGuides } from "@/components/home/production-guides";
import { TokenArchitecture } from "@/components/home/token-architecture";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <CapabilityStrip />
      <ComponentShowcase />
      <ExploreQeetrix />
      <TokenArchitecture />
      <ProductionGuides />
      <EnterpriseCapabilities />
      <EcosystemLatest />
      <FinalCta />
    </>
  );
}
