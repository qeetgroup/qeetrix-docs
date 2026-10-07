import { ArrowRightIcon, ChevronRightIcon } from "@qeetrix/icons";
import { buttonVariants } from "@qeetrix/ui";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { library } from "@/lib/library";
import { links } from "@/lib/site-links";
import { InstallCommand } from "./install-command";
import { container } from "./section";

/** The packages the hero's install bar adds; the bar supplies each package manager's verb. */
const installPackages = "@qeetrix/ui @qeetrix/icons";

export function HomeHero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div
        aria-hidden
        className="home-dots pointer-events-none absolute inset-0"
      />
      <div
        className={`${container} relative flex flex-col items-center pt-14 pb-12 text-center md:pt-20 md:pb-16`}
      >
        <a
          href={links.releases}
          className="group inline-flex items-center gap-2 rounded-full border border-border-brand/40 bg-brand-subtle px-3.5 py-1.5 text-label text-brand transition-colors duration-fast hover:bg-brand-subtle-hover focus-visible:focus-ring"
        >
          <span aria-hidden className="size-1.5 rounded-full bg-primary" />
          <span>
            {library.name} v{library.version}
            <span aria-hidden> · </span>
            <span className="sr-only">, </span>
            Built for the Qeet ecosystem
          </span>
          <ChevronRightIcon
            aria-hidden
            className="size-3.5 transition-transform duration-fast group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
          />
        </a>

        <h1
          id="hero-title"
          className="mt-7 max-w-4xl font-display text-display font-bold text-balance text-foreground tracking-(--qx-typography-display-letter-spacing) md:text-(length:--home-hero-size) md:leading-[1.02]"
        >
          The design system for every Qeet interface
          <span className="text-primary">.</span>
        </h1>

        <p className="mt-5 max-w-2xl text-(length:--home-lead-size) leading-snug text-pretty text-muted-foreground">
          Accessible React components, tokens, foundations and patterns for
          building consistent products across the Qeet ecosystem.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href={links.docs}
            className={cn(buttonVariants({ size: "lg" }), "px-6")}
          >
            Get started
            <ArrowRightIcon
              data-icon="inline-end"
              aria-hidden
              className="rtl:rotate-180"
            />
          </Link>
          <Link
            href={links.components}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "px-6",
            )}
          >
            Browse components
          </Link>
        </div>

        <div className="mt-8 flex w-full justify-center">
          <InstallCommand packages={installPackages} />
        </div>
      </div>
    </section>
  );
}
