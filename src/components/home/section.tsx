import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * The page's shared content width — header, every section and the footer. Wide screens get side
 * padding that grows with the viewport rather than a narrow reading column.
 */
export const container = "mx-auto w-full max-w-[96rem] px-6 lg:px-12 xl:px-20";

/**
 * Category colours for the page's icons, drawn from the library's data-visualisation and feedback
 * tokens so each has a light and a dark value. Brand marks (React, Next.js, TanStack) keep their
 * own colours.
 */
export const tone = {
  brand: "text-primary",
  blue: "text-chart-1",
  teal: "text-chart-2",
  violet: "text-chart-4",
  pink: "text-chart-5",
  sky: "text-chart-7",
  green: "text-success",
  gold: "text-rating-filled",
  red: "text-destructive",
  neutral: "text-muted-foreground",
} as const;

/** Eyebrow, heading and one line of supporting copy above a section. */
export function SectionHeader({
  id,
  eyebrow,
  title,
  description,
  align = "center",
}: {
  /** Labels the section: pass the same id to the `<section aria-labelledby>`. */
  id: string;
  eyebrow: string;
  title: string;
  description?: ReactNode;
  align?: "center" | "start";
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2",
        align === "center" && "items-center text-center",
      )}
    >
      <p className="text-caption font-semibold uppercase tracking-wide text-brand">
        {eyebrow}
      </p>
      <h2
        id={id}
        className="font-display text-title font-bold text-balance text-foreground md:text-(length:--home-section-title)"
      >
        {title}
      </h2>
      {description && (
        <p className="max-w-3xl text-(length:--home-section-lead) text-pretty text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}
