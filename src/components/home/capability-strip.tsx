import {
  ArrowLeftRightIcon,
  BoxIcon,
  LayersIcon,
  ShieldCheckIcon,
  SunIcon,
} from "@qeetrix/icons";
import ReactLogo from "@thesvg/react/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { library } from "@/lib/library";
import { container, tone } from "./section";

const icon = "size-10 shrink-0";

type Capability = {
  /** Brand marks come from thesvg; concepts from @qeetrix/icons. */
  icon: ReactNode;
  label: string;
  detail: string;
};

/** The reference wording; the module count and React major come from the installed package. */
function capabilities(): Capability[] {
  return [
    {
      icon: <BoxIcon aria-hidden className={cn(icon, tone.brand)} />,
      label: `${library.componentCount} modules`,
      detail: "Production ready",
    },
    {
      icon: (
        <>
          <ReactLogo
            variant="light"
            aria-hidden
            className={cn(icon, "dark:hidden")}
          />
          <ReactLogo
            variant="dark"
            aria-hidden
            className={cn(icon, "hidden dark:block")}
          />
        </>
      ),
      label: library.reactMajor ? `React ${library.reactMajor}` : "React",
      detail: "Latest support",
    },
    {
      icon: <SunIcon aria-hidden className={cn(icon, tone.gold)} />,
      label: "Light + Dark",
      detail: "Beautiful by default",
    },
    {
      icon: (
        <ArrowLeftRightIcon aria-hidden className={cn(icon, tone.violet)} />
      ),
      label: "RTL",
      detail: "Full support",
    },
    {
      icon: <ShieldCheckIcon aria-hidden className={cn(icon, tone.green)} />,
      label: "WCAG 2.2 AA",
      detail: "Accessibility target",
    },
    {
      icon: <LayersIcon aria-hidden className={cn(icon, tone.neutral)} />,
      label: "One package",
      detail: "Everything you need",
    },
  ];
}

export function CapabilityStrip() {
  return (
    <section aria-label="At a glance" className={container}>
      <ul className="grid grid-cols-2 gap-y-6 border-t border-border-subtle py-7 sm:grid-cols-3 lg:grid-cols-6 lg:divide-x lg:divide-border-subtle">
        {capabilities().map(({ icon, label, detail }) => (
          <li
            key={label}
            className="flex items-center gap-3.5 px-3 lg:justify-center lg:first:justify-start lg:first:ps-0 lg:last:justify-end lg:last:pe-0"
          >
            {icon}
            <div className="min-w-0">
              <p className="text-label font-semibold text-foreground">
                {label}
              </p>
              <p className="text-caption text-muted-foreground">{detail}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
