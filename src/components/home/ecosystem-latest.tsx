import {
  ArrowRightIcon,
  BellIcon,
  CreditCardIcon,
  FileTextIcon,
  GiftIcon,
  type IconProps,
  PackageIcon,
  UserIcon,
  UsersIcon,
} from "@qeetrix/icons";
import type { ComponentType } from "react";
import { cn } from "@/lib/cn";
import { library } from "@/lib/library";
import { links, products } from "@/lib/site-links";
import { container, SectionHeader, tone } from "./section";

type Icon = ComponentType<IconProps<"outline">>;

/** Each product's mark, by name; the tile behind it is the same colour, tinted. */
const productIcons: Record<(typeof products)[number]["name"], [Icon, string]> =
  {
    "Qeet ID": [UserIcon, tone.blue],
    "Qeet Pay": [CreditCardIcon, tone.green],
    "Qeet Notify": [BellIcon, tone.brand],
    "Qeet Logs": [FileTextIcon, tone.violet],
    "Qeet People": [UsersIcon, tone.pink],
  };

type Update = {
  icon: Icon;
  tone: string;
  title: string;
  description: string;
  href: string;
};

/** Only destinations that exist. There is no public roadmap or Storybook, so neither is listed. */
const updates: Update[] = [
  {
    icon: GiftIcon,
    tone: tone.red,
    title: "Latest release",
    description: "New components, improvements and fixes.",
    href: links.latestRelease,
  },
  {
    icon: FileTextIcon,
    tone: tone.neutral,
    title: "Changelog",
    description: "See what's new and what's changed.",
    href: links.changelog,
  },
  {
    icon: PackageIcon,
    tone: tone.violet,
    title: "npm package",
    description: `Install ${library.name} from the npm registry.`,
    href: links.npm,
  },
  {
    icon: UsersIcon,
    tone: tone.red,
    title: "Contributing",
    description: "Help make Qeetrix better.",
    href: links.contributing,
  },
];

const card =
  "group flex items-center gap-4 rounded-xl border border-border-subtle bg-card transition-[box-shadow,border-color] duration-fast hover:border-border hover:shadow-hover focus-visible:focus-ring";

function Arrow() {
  return (
    <ArrowRightIcon
      aria-hidden
      className="ms-auto size-4 shrink-0 text-muted-foreground transition-[translate,color] duration-fast group-hover:translate-x-0.5 group-hover:text-foreground rtl:rotate-180"
    />
  );
}

export function EcosystemLatest() {
  return (
    <div className={container}>
      <div className="grid gap-12 border-t border-border-subtle py-14 lg:grid-cols-[1.6fr_1fr] lg:gap-0">
        <section
          aria-labelledby="ecosystem-title"
          className="flex flex-col gap-6 lg:pe-10"
        >
          <SectionHeader
            id="ecosystem-title"
            align="start"
            eyebrow="The Qeet ecosystem"
            title="Built for the Qeet ecosystem."
            description="A connected set of products and services for modern teams."
          />
          {/* Two wide cards, then three: the first row carries the two products people meet first. */}
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
            {products.map((product, index) => {
              const [Icon, color] = productIcons[product.name];
              return (
                <li
                  key={product.name}
                  className={cn(
                    "flex",
                    index < 2 ? "lg:col-span-3" : "lg:col-span-2",
                  )}
                >
                  <a href={product.href} className={cn(card, "flex-1 p-4")}>
                    <span
                      className={cn(
                        "flex size-11 shrink-0 items-center justify-center rounded-lg bg-current/10",
                        color,
                      )}
                    >
                      <Icon aria-hidden className="size-5" />
                    </span>
                    <span className="flex min-w-0 flex-col">
                      <span className="text-body font-semibold text-foreground">
                        {product.name}
                      </span>
                      <span className="text-caption text-muted-foreground">
                        {product.tagline}
                      </span>
                    </span>
                    <Arrow />
                  </a>
                </li>
              );
            })}
          </ul>
        </section>

        <section
          aria-labelledby="latest-title"
          className="flex flex-col gap-6 lg:border-s lg:border-border-subtle lg:ps-10"
        >
          <SectionHeader
            id="latest-title"
            align="start"
            eyebrow="Latest and ongoing"
            title="Latest from Qeetrix."
            description="Stay up to date with releases, guides and project updates."
          />
          <ul className="flex flex-col gap-2">
            {updates.map(({ icon: Icon, tone, title, description, href }) => (
              <li key={title}>
                <a href={href} className={cn(card, "px-4 py-2.5")}>
                  <Icon aria-hidden className={cn("size-5 shrink-0", tone)} />
                  <span className="flex min-w-0 flex-col">
                    <span className="text-label font-semibold text-foreground underline-offset-2 group-hover:underline">
                      {title}
                    </span>
                    <span className="text-caption text-muted-foreground">
                      {description}
                    </span>
                  </span>
                  <Arrow />
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
