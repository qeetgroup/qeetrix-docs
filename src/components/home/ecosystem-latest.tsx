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
import { BrandMark } from "@/components/brand-mark";
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
  "group flex items-center gap-4 rounded-md transition-colors duration-normal hover:bg-surface-interactive focus-visible:focus-ring";

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
      <div className="grid gap-12 border-t border-border-subtle py-16 md:py-20 xl:grid-cols-[1.6fr_1fr] xl:grid-rows-[auto_1fr] xl:gap-x-0 xl:gap-y-8">
        <section
          aria-labelledby="ecosystem-title"
          className="flex flex-col gap-8 xl:row-span-2 xl:grid xl:grid-rows-subgrid xl:pe-12"
        >
          <SectionHeader
            id="ecosystem-title"
            align="start"
            title="Built for the Qeet ecosystem."
            description="Different products. Familiar interactions. One set of foundations."
          />
          <div className="grid gap-5 sm:grid-cols-[9rem_1fr] sm:gap-8">
            <div
              data-home-reveal
              className="home-ecosystem-hub relative flex items-center gap-3 py-5 sm:flex-col sm:justify-center sm:text-center"
            >
              <BrandMark height={40} />
              <div className="flex flex-col gap-1">
                <span className="font-display text-heading font-semibold text-foreground">
                  Qeetrix
                </span>
                <span className="text-caption text-muted-foreground">
                  Shared foundations
                </span>
              </div>
            </div>
            <ul className="relative flex flex-col gap-2 sm:border-s sm:border-border-strong sm:ps-6">
              {products
                .filter((product) => product.name !== "Qeet People")
                .map((product, index) => {
                  const [Icon, color] = productIcons[product.name];
                  return (
                    <li
                      key={product.name}
                      data-home-reveal
                      data-home-delay={index * 50}
                      className="home-ecosystem-link relative flex"
                    >
                      <a
                        href={product.href}
                        className={cn(card, "flex-1 px-3 py-3")}
                      >
                        <span
                          className={cn(
                            "flex size-10 shrink-0 items-center justify-center rounded-md bg-current/10",
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
                          {product.status === "development" && (
                            <span className="mt-1 text-micro text-muted-foreground">
                              In development
                            </span>
                          )}
                        </span>
                        <Arrow />
                      </a>
                    </li>
                  );
                })}
              <li
                data-home-reveal
                data-home-delay="200"
                className="home-ecosystem-link relative flex items-center gap-4 px-3 py-3"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-md border border-dashed border-border-strong text-muted-foreground">
                  <PackageIcon aria-hidden className="size-5" />
                </span>
                <span className="flex min-w-0 flex-col">
                  <span className="text-body font-semibold text-foreground">
                    Future products
                  </span>
                  <span className="text-caption text-muted-foreground">
                    More products, one design system.
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </section>

        <section
          aria-labelledby="latest-title"
          className="flex flex-col gap-8 xl:row-span-2 xl:grid xl:grid-rows-subgrid xl:border-s xl:border-border-subtle xl:ps-10"
        >
          <SectionHeader
            id="latest-title"
            align="start"
            title="Latest from Qeetrix."
            description="Stay up to date with releases, guides and project updates."
          />
          <ul className="flex flex-col gap-2">
            {updates.map(({ icon: Icon, tone, title, description, href }) => (
              <li
                key={title}
                data-home-reveal
                className="border-b border-border-subtle last:border-b-0"
              >
                <a href={href} className={cn(card, "px-2 py-5")}>
                  <Icon aria-hidden className={cn("size-5 shrink-0", tone)} />
                  <span className="flex min-w-0 flex-col">
                    <span className="text-label font-semibold text-foreground underline-offset-2 group-hover:underline">
                      {title}
                      {title === "Latest release" && (
                        <span className="ms-2 font-mono text-caption font-normal text-brand">
                          v{library.version}
                        </span>
                      )}
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
