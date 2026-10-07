import { ArrowRightIcon } from "@qeetrix/icons";
import { buttonVariants } from "@qeetrix/ui";
import Link from "next/link";
import { links } from "@/lib/site-links";
import { container } from "./section";

/** A quiet close: one line, two actions — not a second hero. */
export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden">
      <div
        aria-hidden
        className="home-dots pointer-events-none absolute inset-0"
      />
      <div
        className={`${container} relative flex flex-col items-center gap-2 py-16 text-center`}
      >
        <h2
          id="cta-title"
          className="font-display text-title font-bold text-foreground md:text-(length:--home-cta-size)"
        >
          Start building with Qeetrix<span className="text-primary">.</span>
        </h2>
        <p className="text-(length:--home-section-lead) text-muted-foreground">
          One package. Every surface. Built for the Qeet ecosystem.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Link href={links.docs} className={buttonVariants()}>
            Get started
            <ArrowRightIcon
              data-icon="inline-end"
              aria-hidden
              className="rtl:rotate-180"
            />
          </Link>
          <Link
            href={links.components}
            className={buttonVariants({ variant: "outline" })}
          >
            Browse components
          </Link>
        </div>
      </div>
    </section>
  );
}
