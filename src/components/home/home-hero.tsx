import { ArrowRightIcon, ChevronRightIcon } from "@qeetrix/icons";
import { buttonVariants } from "@qeetrix/ui";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { library } from "@/lib/library";
import { links } from "@/lib/site-links";
import { InstallCommand } from "./install-command";
import { BrandTitle, container } from "./section";

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
        className={`${container} relative flex flex-col items-center pt-10 pb-10 text-center md:pt-16 md:pb-12`}
      >
        <a
          data-home-reveal
          href={links.releases}
          className="group inline-flex min-h-9 items-center gap-2 rounded-full border border-border-brand/40 bg-brand-subtle px-3.5 py-1.5 text-label text-brand transition-colors duration-fast hover:bg-brand-subtle-hover focus-visible:focus-ring"
        >
          <span aria-hidden className="size-1.5 rounded-full bg-primary" />
          <span>
            {library.name} v{library.version}
            <span aria-hidden> · </span>
            <span className="sr-only">, </span>
            <span className="sm:hidden">Latest release</span>
            <span className="hidden sm:inline">
              Built for the Qeet ecosystem
            </span>
          </span>
          <ChevronRightIcon
            aria-hidden
            className="size-3.5 transition-transform duration-fast group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
          />
        </a>

        <h1
          id="hero-title"
          data-home-reveal
          data-home-delay="60"
          className="mt-6 w-full max-w-5xl font-display text-display font-bold text-balance text-foreground md:text-(length:--home-hero-size) md:leading-[1.08]"
        >
          <span className="block">
            <BrandTitle>Qeetrix.</BrandTitle>
          </span>
          <BrandTitle>One system. Every interface.</BrandTitle>
        </h1>

        <p
          data-home-reveal
          data-home-delay="120"
          className="mt-5 max-w-2xl text-body leading-relaxed text-pretty text-muted-foreground sm:text-(length:--home-lead-size) sm:leading-snug"
        >
          Accessible React components, connected tokens, and production patterns
          for the products your team ships.
        </p>

        <div
          data-home-reveal
          data-home-delay="180"
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          <Link
            href={links.docs}
            className={cn(
              buttonVariants({ size: "lg" }),
              "home-action min-h-11 px-6",
            )}
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
              "home-action min-h-11 px-6",
            )}
          >
            Browse components
          </Link>
        </div>

        <div
          data-home-reveal
          data-home-delay="220"
          className="mt-8 flex w-full justify-center"
        >
          <InstallCommand packages={installPackages} />
        </div>
      </div>
    </section>
  );
}
