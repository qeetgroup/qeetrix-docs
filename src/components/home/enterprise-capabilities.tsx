import {
  ArrowLeftRightIcon,
  AudioWaveformIcon,
  BoxIcon,
  DatabaseIcon,
  type IconProps,
  LayersIcon,
  Rows2Icon,
  ShieldCheckIcon,
  SunIcon,
} from "@qeetrix/icons";
import type { ComponentType } from "react";
import { cn } from "@/lib/cn";
import { container, SectionHeader, tone } from "./section";

type Capability = {
  icon: ComponentType<IconProps<"outline">>;
  tone: string;
  title: string;
  description: string;
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
    description:
      "WCAG 2.2 AA target, keyboard support, semantic markup and screen-reader-friendly components.",
  },
  {
    icon: SunIcon,
    tone: tone.gold,
    title: "Themes",
    description:
      "Light and dark themes with design tokens and brand customization.",
  },
  {
    icon: ArrowLeftRightIcon,
    tone: tone.violet,
    title: "Direction",
    description:
      "Built-in RTL support with logical properties and mirrored layouts.",
  },
  {
    icon: LayersIcon,
    tone: tone.sky,
    title: "Rendering",
    description:
      "SSR and React Server Components ready, optimized for modern frameworks.",
  },
  {
    icon: AudioWaveformIcon,
    tone: tone.pink,
    title: "Motion",
    description:
      "Thoughtful motion with accessible defaults and reduced motion support.",
  },
  {
    icon: Rows2Icon,
    tone: tone.neutral,
    title: "Density",
    description:
      "Flexible density options for different use cases and screen sizes.",
  },
  {
    icon: DatabaseIcon,
    tone: tone.brand,
    title: "Design tokens",
    description:
      "Primitive, semantic and component tokens for consistent, scalable design and theming.",
  },
  {
    icon: BoxIcon,
    tone: tone.teal,
    title: "Component manifest",
    description:
      "Machine-readable metadata for tooling, automation and discovery.",
  },
];

export function EnterpriseCapabilities() {
  return (
    <section aria-labelledby="enterprise-title" className={container}>
      <div className="flex flex-col gap-8 border-t border-border-subtle py-14">
        <SectionHeader
          id="enterprise-title"
          eyebrow="Built for real-world teams"
          title="Enterprise by construction."
          description="A design system that meets the needs of modern product teams at scale."
        />
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map(({ icon: Icon, tone, title, description }) => (
            <li
              key={title}
              className="flex items-start gap-4 rounded-xl border border-border-subtle bg-card p-5"
            >
              <Icon aria-hidden className={cn("size-9 shrink-0", tone)} />
              <div className="flex min-w-0 flex-col gap-1">
                <h3 className="text-body font-semibold text-foreground">
                  {title}
                </h3>
                <p className="text-body text-muted-foreground">{description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
