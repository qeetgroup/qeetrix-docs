import {
  ArrowLeftRightIcon,
  ArrowRightIcon,
  AudioWaveformIcon,
  BoxIcon,
  DatabaseIcon,
  type IconProps,
  LayersIcon,
  Rows2Icon,
  ShieldCheckIcon,
  SunIcon,
} from "@qeetrix/icons";
import { ServerCodeBlock } from "fumadocs-ui/components/codeblock.rsc";
import Link from "next/link";
import type { ComponentType } from "react";
import { cn } from "@/lib/cn";
import { library } from "@/lib/library";
import { links } from "@/lib/site-links";
import { container, SectionHeader, tone } from "./section";

type Capability = {
  icon: ComponentType<IconProps<"outline">>;
  tone: string;
  title: string;
  description: string;
  href: string;
};

/**
 * Engineering evidence, not adjectives. Accessibility names the target and what is built in; it
 * does not claim the library is "compliant" or that every component has a completed audit.
 */
const capabilities: Capability[] = [
  {
    icon: ShieldCheckIcon,
    tone: tone.green,
    title: "Accessibility",
    href: links.accessibility,
    description:
      "WCAG 2.2 AA target, keyboard support, semantic markup and screen-reader-friendly components.",
  },
  {
    icon: SunIcon,
    tone: tone.gold,
    title: "Themes",
    href: links.theming,
    description:
      "Light and dark themes with design tokens and brand customization.",
  },
  {
    icon: ArrowLeftRightIcon,
    tone: tone.violet,
    title: "Direction",
    href: links.rtl,
    description:
      "Built-in RTL support with logical properties and mirrored layouts.",
  },
  {
    icon: LayersIcon,
    tone: tone.sky,
    title: "Rendering",
    href: links.serverComponents,
    description:
      "SSR and React Server Components ready, optimized for modern frameworks.",
  },
  {
    icon: AudioWaveformIcon,
    tone: tone.pink,
    title: "Motion",
    href: links.motion,
    description:
      "Thoughtful motion with accessible defaults and reduced motion support.",
  },
  {
    icon: Rows2Icon,
    tone: tone.neutral,
    title: "Density",
    href: "#showcase",
    description:
      "Flexible density options for different use cases and screen sizes.",
  },
  {
    icon: DatabaseIcon,
    tone: tone.brand,
    title: "Design tokens",
    href: links.foundations,
    description:
      "Primitive, semantic and component tokens for consistent, scalable design and theming.",
  },
  {
    icon: BoxIcon,
    tone: tone.teal,
    title: "Component manifest",
    href: `${links.github}/blob/main/component-manifest.json`,
    description:
      "Machine-readable metadata for tooling, automation and discovery.",
  },
];

export function EnterpriseCapabilities() {
  return (
    <section aria-labelledby="enterprise-title" className={container}>
      <div className="flex flex-col gap-10 border-t border-border-subtle py-16 md:py-20">
        <SectionHeader
          id="enterprise-title"
          title="Enterprise by construction."
          description="The less visible details, considered from the start. Documented, inspectable, and built into the system."
          align="start"
        />
        <div className="grid gap-10 xl:grid-cols-[1.65fr_1fr] xl:gap-16">
          <ul className="grid gap-x-8 sm:grid-cols-2">
            {capabilities.map(
              ({ icon: Icon, tone, title, description, href }, index) => (
                <li
                  key={title}
                  data-home-reveal
                  data-home-delay={(index % 2) * 60}
                  className="border-t border-border-subtle"
                >
                  <Link
                    href={href}
                    className="group flex h-full items-start gap-4 rounded-md py-5 focus-visible:focus-ring"
                  >
                    <Icon
                      aria-hidden
                      className={cn("mt-0.5 size-9 shrink-0", tone)}
                    />
                    <div className="flex min-w-0 flex-col gap-2">
                      <h3 className="flex items-center gap-2 text-body font-semibold text-foreground">
                        {title}
                        <ArrowRightIcon
                          aria-hidden
                          className="size-3.5 shrink-0 text-muted-foreground opacity-0 transition-[opacity,transform] duration-fast group-hover:translate-x-0.5 group-hover:opacity-100 group-focus-visible:opacity-100 rtl:rotate-180"
                        />
                      </h3>
                      <p className="text-label leading-relaxed text-muted-foreground">
                        {description}
                      </p>
                    </div>
                  </Link>
                </li>
              ),
            )}
          </ul>
          <aside
            data-home-reveal
            className="flex min-w-0 flex-col gap-5 border-t border-border-subtle pt-6 xl:border-s xl:border-t-0 xl:ps-8 xl:pt-0"
          >
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-body font-semibold text-foreground">
                Installed release
              </h3>
              <a
                href={links.latestRelease}
                className="rounded-sm font-mono text-caption text-brand underline-offset-4 hover:underline focus-visible:focus-ring"
              >
                v{library.version}
              </a>
            </div>
            <ServerCodeBlock
              lang="json"
              code={JSON.stringify(
                {
                  package: library.name,
                  version: library.version,
                  modules: library.componentCount,
                  stable: library.stable,
                  beta: library.beta,
                  manifestSchema: library.schemaVersion,
                },
                null,
                2,
              )}
            />
            <p className="text-label leading-relaxed text-muted-foreground">
              Release data comes from the installed package and its component
              manifest.
            </p>
            <a
              href={`${links.github}/blob/main/component-manifest.json`}
              className="group inline-flex min-h-11 items-center gap-2 self-start rounded-md text-label font-medium text-brand focus-visible:focus-ring"
            >
              Inspect the manifest
              <ArrowRightIcon
                aria-hidden
                className="size-4 transition-transform duration-fast group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
              />
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}
