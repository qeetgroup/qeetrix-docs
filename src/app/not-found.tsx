import { buttonVariants, cn } from "@qeetrix/ui";
import type { Metadata } from "next";
import Link from "next/link";
import { container } from "@/components/home/section";
import { SiteHeader } from "@/components/site-header";
import { links } from "@/lib/site-links";

export const metadata: Metadata = {
  title: "Page not found",
};

/** Every unmatched URL, and every `notFound()`: the site header, and a way back in. */
export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main
        className={cn(
          container,
          "flex flex-1 flex-col items-center justify-center gap-6 py-24 text-center",
        )}
      >
        <p className="font-mono text-label text-muted-foreground">404</p>
        <h1 className="font-display text-title font-bold text-balance text-foreground">
          This page doesn&apos;t exist
        </h1>
        <p className="max-w-md text-body text-muted-foreground">
          It may have moved when the docs were reorganised. Search with ⌘K, or
          start from one of these.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href={links.docs} className={buttonVariants()}>
            Documentation
          </Link>
          <Link
            href={links.components}
            className={buttonVariants({ variant: "outline" })}
          >
            Components
          </Link>
          <Link
            href={links.iconBrowser}
            className={buttonVariants({ variant: "outline" })}
          >
            Icons
          </Link>
        </div>
      </main>
    </>
  );
}
