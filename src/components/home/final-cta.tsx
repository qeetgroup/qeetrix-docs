import { ArrowRightIcon } from "@qeetrix/icons";
import { buttonVariants } from "@qeetrix/ui";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { links } from "@/lib/site-links";
import { BrandTitle, container } from "./section";

/** A quiet close: one line, two actions — not a second hero. */
export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden">
      <div
        aria-hidden
        className="home-dots pointer-events-none absolute inset-0"
      />
      <div
        className={`${container} relative flex flex-col items-center gap-3 border-t border-border-subtle py-16 text-center md:py-20`}
      >
        <h2
          id="cta-title"
          data-home-reveal
          className="font-display text-title font-bold text-foreground md:text-(length:--home-cta-size)"
        >
          <BrandTitle>Start building with Qeetrix.</BrandTitle>
        </h2>
        <p
          data-home-reveal
          data-home-delay="60"
          className="max-w-xl text-(length:--home-section-lead) text-muted-foreground"
        >
          One package. Every surface. Built for the Qeet ecosystem.
        </p>
        <div
          data-home-reveal
          data-home-delay="120"
          className="mt-5 flex flex-wrap justify-center gap-3"
        >
          <Link
            href={links.docs}
            className={cn(
              buttonVariants({ size: "lg" }),
              "home-action min-h-11",
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
              "home-action min-h-11",
            )}
          >
            Browse components
          </Link>
        </div>
      </div>
    </section>
  );
}
