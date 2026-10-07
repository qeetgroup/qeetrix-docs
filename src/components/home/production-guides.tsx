import {
  AccessibilityIcon,
  ArrowLeftRightIcon,
  ArrowRightIcon,
  LayersIcon,
  PaletteIcon,
} from "@qeetrix/icons";
import Nextdotjs from "@thesvg/react/nextdotjs";
import Tanstack from "@thesvg/react/tanstack";
import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { links } from "@/lib/site-links";
import { BrandTitle, container, SectionHeader, tone } from "./section";

const icon = "size-7 shrink-0";

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
      className={`${container} flex flex-col gap-10 py-16 md:py-20`}
    >
      <SectionHeader
        id="setup-title"
        title="A short path from install to interface."
        description="Use your framework. Keep your workflow. Start with the pieces you need."
        align="start"
      />
      <ol className="grid gap-8 border-y border-border-subtle py-8 md:grid-cols-3 md:gap-6">
        {[
          { title: "Install", code: "bun add @qeetrix/ui @qeetrix/icons" },
          { title: "Add styles", code: '@import "@qeetrix/ui/styles.css";' },
          { title: "Build", code: "<Button>Get started</Button>" },
        ].map(({ title, code }, index) => (
          <li
            key={title}
            data-home-reveal
            data-home-delay={index * 70}
            className="flex min-w-0 flex-col gap-4"
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-caption text-brand">
                0{index + 1}
              </span>
              <h3 className="text-body font-semibold text-foreground">
                <BrandTitle>{title}</BrandTitle>
              </h3>
              {index < 2 && (
                <ArrowRightIcon
                  aria-hidden
                  className="ms-auto hidden size-4 text-muted-foreground md:block rtl:rotate-180"
                />
              )}
            </div>
            <code className="font-mono text-caption leading-relaxed wrap-anywhere text-muted-foreground">
              {code}
            </code>
          </li>
        ))}
      </ol>
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <nav aria-label="Framework guides">
          <ul className="flex flex-col gap-3">
            {guides.slice(0, 2).map(({ icon, title, description, href }) => (
              <li key={title} data-home-reveal>
                <Link
                  href={href}
                  className="home-framework group flex items-center gap-5 rounded-lg border border-border-subtle bg-card px-5 py-6 transition-colors duration-normal hover:border-border-strong focus-visible:focus-ring"
                >
                  {icon}
                  <div className="flex min-w-0 flex-col gap-1">
                    <h3 className="text-heading font-semibold text-foreground">
                      <BrandTitle>{title}</BrandTitle>
                    </h3>
                    <p className="text-label text-muted-foreground">
                      {description}
                    </p>
                  </div>
                  <ArrowRightIcon
                    aria-hidden
                    className="ms-auto size-5 shrink-0 text-brand transition-transform duration-normal group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Production guides">
          <ul className="grid gap-x-8 gap-y-1 sm:grid-cols-2">
            {guides.slice(2).map(({ icon, title, description, href }) => (
              <li key={title} data-home-reveal>
                <Link
                  href={href}
                  className="group flex h-full flex-col items-start gap-3 rounded-md py-4 focus-visible:focus-ring"
                >
                  {icon}
                  <h3 className="flex items-center gap-2 text-body font-semibold text-foreground">
                    <BrandTitle>{title}</BrandTitle>
                    <ArrowRightIcon
                      aria-hidden
                      className="size-3.5 text-muted-foreground transition-transform duration-fast group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                    />
                  </h3>
                  <p className="text-label text-muted-foreground">
                    {description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
