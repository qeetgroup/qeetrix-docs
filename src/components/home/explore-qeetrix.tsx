import {
  ArrowRightIcon,
  BookOpenIcon,
  BoxIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  FileTextIcon,
  type IconProps,
  LayersIcon,
  WorkflowIcon,
} from "@qeetrix/icons";
import { Button, Switch } from "@qeetrix/ui";
import Link from "next/link";
import type { ComponentType, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { links } from "@/lib/site-links";
import { container, SectionHeader, tone } from "./section";

/** Miniature previews — real components and semantic tokens, drawn small and inert. */

/** A placeholder bar: the previews sketch structure, not content. */
function Bar({ className }: { className?: string }) {
  return (
    <span className={cn("block h-1.5 rounded-full bg-muted", className)} />
  );
}

function ComponentsPreview() {
  return (
    <div className="flex flex-col gap-2.5" inert>
      <div className="flex items-center gap-2">
        <Button size="sm">Button</Button>
        <span className="flex h-7 flex-1 items-center justify-between rounded-md border border-border-subtle px-2">
          <Bar className="w-3/5" />
          <ChevronDownIcon className="size-3.5 text-muted-foreground" />
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="flex h-7 flex-1 items-center rounded-md border border-border-subtle px-2">
          <Bar className="w-2/3" />
        </span>
        <span className="size-7 rounded-md border border-border-subtle" />
        <Switch defaultChecked aria-label="Preview switch" />
      </div>
    </div>
  );
}

const swatches = [
  "bg-primary",
  "bg-(--qx-color-border-brand)",
  "bg-brand-subtle",
  "bg-muted",
  "bg-foreground",
];

function FoundationsPreview() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        {swatches.map((swatch) => (
          <span
            key={swatch}
            className={`size-7 rounded-full border border-border-subtle ${swatch}`}
          />
        ))}
      </div>
      <div className="flex items-baseline gap-5 font-display text-heading">
        <span className="font-bold text-foreground">Aa</span>
        <span className="text-muted-foreground">Aa</span>
        <span className="font-light text-muted-foreground/70">Aa</span>
      </div>
    </div>
  );
}

function PatternsPreview() {
  return (
    <div className="grid h-20 grid-cols-[1.25rem_1fr] gap-2 rounded-md border border-border-subtle bg-canvas p-2">
      <div className="flex flex-col items-center gap-1.5 pt-1">
        {[0, 1, 2, 3].map((dot) => (
          <span key={dot} className="size-1.5 rounded-full bg-border-strong" />
        ))}
      </div>
      <div className="flex flex-col gap-1.5">
        <Bar className="h-2 w-1/3" />
        <div className="grid flex-1 grid-cols-3 gap-1.5">
          <span className="col-span-2 rounded-sm bg-muted" />
          <span className="rounded-sm bg-muted" />
          <span className="rounded-sm bg-muted" />
          <span className="col-span-2 rounded-sm bg-muted" />
        </div>
      </div>
    </div>
  );
}

function GuidesPreview() {
  return (
    <ol className="flex flex-col gap-2 rounded-md border border-border-subtle p-2.5 text-caption text-foreground">
      {["Install", "Configure", "Build"].map((step, index) => (
        <li key={step} className="flex items-center gap-2">
          <span
            className={cn(
              "flex size-5 shrink-0 items-center justify-center rounded-full text-micro font-semibold",
              index === 0
                ? "bg-info-subtle text-info"
                : "bg-muted text-muted-foreground",
            )}
          >
            {index + 1}
          </span>
          {step}
          <Bar className="ms-auto w-2/5" />
        </li>
      ))}
    </ol>
  );
}

function ResourcesPreview() {
  return (
    <ul className="flex flex-col gap-2 text-muted-foreground">
      {["w-3/4", "w-1/2", "w-2/3", "w-2/5"].map((width) => (
        <li key={width} className="flex items-center gap-2">
          <FileTextIcon className="size-3.5 shrink-0" />
          <Bar className={width} />
          <ChevronRightIcon className="ms-auto size-3.5 shrink-0 rtl:rotate-180" />
        </li>
      ))}
    </ul>
  );
}

type Entry = {
  icon: ComponentType<IconProps<"outline">>;
  tone: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  preview: ReactNode;
};

const entries: Entry[] = [
  {
    icon: BoxIcon,
    tone: tone.brand,
    title: "Components",
    description:
      "Production-ready React components with built-in accessibility and variants.",
    cta: "Browse components",
    href: links.components,
    preview: <ComponentsPreview />,
  },
  {
    icon: LayersIcon,
    tone: tone.sky,
    title: "Foundations",
    description:
      "Design tokens, theming and core primitives for consistent design and development.",
    cta: "Explore foundations",
    href: links.foundations,
    preview: <FoundationsPreview />,
  },
  {
    icon: WorkflowIcon,
    tone: tone.violet,
    title: "Patterns",
    description:
      "Common layout and interaction patterns for real product experiences.",
    cta: "View patterns",
    href: links.patterns,
    preview: <PatternsPreview />,
  },
  {
    icon: BookOpenIcon,
    tone: tone.gold,
    title: "Guides",
    description:
      "Step-by-step tutorials and best practices for building with Qeetrix.",
    cta: "Read guides",
    href: links.guides,
    preview: <GuidesPreview />,
  },
  {
    icon: FileTextIcon,
    tone: tone.green,
    title: "Resources",
    description:
      "Changelog, releases and additional resources to keep you up to date.",
    cta: "View resources",
    href: links.resources,
    preview: <ResourcesPreview />,
  },
];

export function ExploreQeetrix() {
  return (
    <section
      aria-labelledby="explore-title"
      className={`${container} flex flex-col gap-8 py-14`}
    >
      <SectionHeader
        id="explore-title"
        eyebrow="Explore Qeetrix"
        title="Everything you need to build with confidence."
        description="From ready-to-use components to in-depth guides, explore everything the Qeetrix design system has to offer."
      />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {entries.map(
          ({ icon: Icon, tone, title, description, cta, href, preview }) => (
            <li
              key={title}
              className="group relative flex flex-col gap-4 rounded-xl border border-border-subtle bg-card p-6 transition-[box-shadow,border-color] duration-fast hover:border-border hover:shadow-hover"
            >
              <Icon aria-hidden className={cn("size-8", tone)} />
              <div className="flex flex-col gap-1.5">
                <h3 className="font-heading text-heading font-bold text-foreground">
                  <Link
                    href={href}
                    className="rounded-sm after:absolute after:inset-0 after:rounded-xl focus-visible:outline-none focus-visible:after:focus-ring"
                  >
                    {title}
                  </Link>
                </h3>
                <p className="text-body text-muted-foreground">{description}</p>
              </div>
              <div aria-hidden className="mt-auto pt-1">
                {preview}
              </div>
              <p
                aria-hidden
                className="flex items-center gap-1.5 text-label font-medium text-brand"
              >
                {cta}
                <ArrowRightIcon className="size-3.5 transition-transform duration-fast group-hover:translate-x-0.5 rtl:rotate-180" />
              </p>
            </li>
          ),
        )}
      </ul>
    </section>
  );
}
