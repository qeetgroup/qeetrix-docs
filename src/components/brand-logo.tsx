import { cn } from "@qeetrix/ui";
import Bun from "@thesvg/react/bun";
import Css from "@thesvg/react/css3";
import Html from "@thesvg/react/html5";
import JavaScript from "@thesvg/react/javascript";
import Nextjs from "@thesvg/react/nextdotjs";
import Npm from "@thesvg/react/npm";
import Pnpm from "@thesvg/react/pnpm";
import ReactMark from "@thesvg/react/react";
import Tanstack from "@thesvg/react/tanstack";
import TypeScript from "@thesvg/react/typescript";
import Yarn from "@thesvg/react/yarn";

export type BrandName =
  | "bun"
  | "css"
  | "html"
  | "javascript"
  | "nextjs"
  | "npm"
  | "pnpm"
  | "react"
  | "tanstack"
  | "typescript"
  | "yarn";

/**
 * Yarn's brand blue. theSVG's Yarn file is a disc (`.st0`) and the cat (`.st1`) whose colours came
 * from a stylesheet it no longer carries, so both paint `currentColor`; the disc takes the blue
 * from `color` and the cat is filled white again.
 */
const YARN_BLUE = "#2C8EBB";

/**
 * A tool's own logo in its brand colours, from theSVG, legible on either theme. Where a logo has
 * a drawing per background (pnpm's grey squares, React's two blues) both are rendered and the
 * `.dark` class shows the right one, as BrandMark does for the Qeet logo — no client JavaScript,
 * no flash. Next.js's black disc is inverted on dark, as Next.js shows it there. `data-brand`
 * keeps surrounding styles (the sidebar's icon tint) off the logo's colours.
 */
export function BrandLogo({
  name,
  className,
}: {
  name: BrandName;
  className?: string;
}) {
  const props = { "aria-hidden": true, "data-brand": "", className } as const;
  switch (name) {
    case "bun":
      return <Bun {...props} />;
    case "npm":
      return <Npm {...props} />;
    case "typescript":
      return <TypeScript {...props} />;
    case "javascript":
      return <JavaScript {...props} />;
    case "css":
      return <Css {...props} />;
    case "html":
      return <Html {...props} />;
    case "tanstack":
      return <Tanstack {...props} />;
    case "yarn":
      return (
        <Yarn
          {...props}
          className={cn("[&_.st1]:fill-white", className)}
          style={{ color: YARN_BLUE }}
        />
      );
    case "nextjs":
      return <Nextjs {...props} className={cn("dark:invert", className)} />;
    case "pnpm":
      return (
        <>
          <Pnpm
            {...props}
            variant="light"
            className={cn("dark:hidden", className)}
          />
          <Pnpm
            {...props}
            variant="dark"
            className={cn("hidden dark:block", className)}
          />
        </>
      );
    case "react":
      return (
        <>
          <ReactMark
            {...props}
            variant="light"
            className={cn("dark:hidden", className)}
          />
          <ReactMark
            {...props}
            variant="dark"
            className={cn("hidden dark:block", className)}
          />
        </>
      );
  }
}
