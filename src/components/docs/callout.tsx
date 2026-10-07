import {
  CircleAlertIcon,
  CircleCheckIcon,
  InfoIcon,
  LightbulbIcon,
  TriangleAlertIcon,
} from "@qeetrix/icons";
// @qeetrix/ui's cn knows the type-role sizes (text-label, text-body, …); the plain one drops them.
import { cn } from "@qeetrix/ui";
import type { ComponentType, ReactNode, SVGProps } from "react";

type Tone = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  frame: string;
  glyph: string;
};

const TONES: Record<string, Tone> = {
  info: {
    icon: InfoIcon,
    frame: "border-info/25 bg-info-subtle",
    glyph: "text-info-text",
  },
  warn: {
    icon: TriangleAlertIcon,
    frame: "border-warning/30 bg-warning-subtle",
    glyph: "text-warning-text",
  },
  error: {
    icon: CircleAlertIcon,
    frame: "border-destructive/25 bg-destructive-subtle",
    glyph: "text-destructive-text",
  },
  success: {
    icon: CircleCheckIcon,
    frame: "border-success/25 bg-success-subtle",
    glyph: "text-success-text",
  },
  idea: {
    icon: LightbulbIcon,
    frame: "border-border-brand/30 bg-brand-subtle",
    glyph: "text-[var(--qx-color-text-brand)]",
  },
};

const ALIASES: Record<string, string> = {
  warning: "warn",
  danger: "error",
  tip: "idea",
};

/**
 * A note set apart from the text, in the feedback colours of Qeetrix's own Callout. Takes
 * Fumadocs' `type` (info · warn · error · success · idea, plus the warning/danger/tip aliases)
 * and `title`, so pages written for the default callout keep working.
 */
export function Callout({
  type = "info",
  title,
  icon,
  className,
  children,
}: {
  type?: string;
  title?: ReactNode;
  icon?: ReactNode;
  className?: string;
  children?: ReactNode;
}) {
  const tone = TONES[ALIASES[type] ?? type] ?? TONES.info;
  const Icon = tone.icon;
  return (
    <div
      role="note"
      className={cn(
        "not-prose my-6 flex gap-3 rounded-xl border px-4 py-3.5 text-body text-foreground",
        tone.frame,
        className,
      )}
    >
      <span
        className={cn(
          "mt-0.5 flex size-5 shrink-0 items-center justify-center [&_svg]:size-4.5",
          tone.glyph,
        )}
      >
        {icon ?? <Icon aria-hidden />}
      </span>
      <div className="flex min-w-0 flex-col gap-1 leading-relaxed [&_a]:font-medium [&_a]:underline [&_a]:underline-offset-2 [&_code]:rounded [&_code]:bg-card/70 [&_code]:px-1 [&_code]:py-px [&_code]:font-mono [&_code]:text-[0.85em] [&_p]:m-0">
        {title ? <p className="font-semibold">{title}</p> : null}
        <div className="text-foreground/90">{children}</div>
      </div>
    </div>
  );
}
