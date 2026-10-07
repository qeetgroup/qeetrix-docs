import {
  AccessibilityIcon,
  ArrowLeftRightIcon,
  LayersIcon,
  PaletteIcon,
} from "@qeetrix/icons";
import Nextdotjs from "@thesvg/react/nextdotjs";
import Tanstack from "@thesvg/react/tanstack";
import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { links } from "@/lib/site-links";
import { container, SectionHeader, tone } from "./section";

const icon = "size-9 shrink-0";

type Guide = {
  /** Brand marks come from thesvg; concepts from @qeetrix/icons. */
  icon: ReactNode;
  title: string;
  description: string;
  href: string;
};

/** Each card opens the guide, or the guide section, that covers it. */
const guides: Guide[] = [
  {
    icon: <Nextdotjs aria-hidden className={icon} />,
    title: "Next.js",
    description: "App Router ready with full support.",
    href: links.nextjs,
  },
  {
    icon: <Tanstack aria-hidden className={icon} />,
    title: "TanStack Start",
    description: "File-based routing and SSR support.",
    href: links.tanstackStart,
  },
  {
    icon: <PaletteIcon aria-hidden className={cn(icon, tone.brand)} />,
    title: "Theming",
    description: "Light, dark and custom themes from tokens.",
    href: links.theming,
  },
  {
    icon: <AccessibilityIcon aria-hidden className={cn(icon, tone.blue)} />,
    title: "Accessibility",
    description: "WCAG 2.2 AA target, built in.",
    href: links.accessibility,
  },
  {
    icon: <LayersIcon aria-hidden className={cn(icon, tone.sky)} />,
    title: "SSR / RSC",
    description: "Optimized for performance and modern React.",
    href: links.serverComponents,
  },
  {
    icon: <ArrowLeftRightIcon aria-hidden className={cn(icon, tone.violet)} />,
    title: "RTL",
    description: "Right-to-left support with logical properties.",
    href: links.rtl,
  },
];

export function ProductionGuides() {
  return (
    <section
      aria-labelledby="setup-title"
      className={`${container} flex flex-col gap-8 py-14`}
    >
      <SectionHeader
        id="setup-title"
        eyebrow="From install to production"
        title="Get up and running in minutes."
        description="Integrate Qeetrix into your stack and follow best practices for a production-ready setup."
      />
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {guides.map(({ icon, title, description, href }) => (
          <li
            key={title}
            className="relative flex items-start gap-3.5 rounded-xl border border-border-subtle bg-card p-4 transition-[box-shadow,border-color] duration-fast hover:border-border hover:shadow-hover"
          >
            {icon}
            <div className="flex min-w-0 flex-col gap-0.5">
              <h3 className="text-label font-semibold text-foreground">
                <Link
                  href={href}
                  className="rounded-sm after:absolute after:inset-0 after:rounded-xl focus-visible:outline-none focus-visible:after:focus-ring"
                >
                  {title}
                </Link>
              </h3>
              <p className="text-caption text-muted-foreground">
                {description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
