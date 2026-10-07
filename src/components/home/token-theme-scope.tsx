"use client";

import { MoonIcon, SunIcon } from "@qeetrix/icons";
import { SegmentedControl, SegmentedControlItem } from "@qeetrix/ui";
import { type ReactNode, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * A local theme for the token diagram: switching applies the library's own `.dark` scope to the
 * diagram only, so every swatch and value re-resolves through the real CSS variables while the page
 * keeps its theme. The switch sits on the section's heading row; colour changes ride the duration
 * tokens, which reduced motion collapses.
 */
export function TokenThemeScope({
  header,
  aside,
  children,
}: {
  header: ReactNode;
  aside: ReactNode;
  children: ReactNode;
}) {
  const [theme, setTheme] = useState("light");
  return (
    <div className="flex flex-col gap-8">
      <div className="relative flex flex-col items-center gap-5">
        {header}
        <SegmentedControl
          value={theme}
          onValueChange={setTheme}
          aria-label="Token theme"
          className="lg:absolute lg:inset-e-0 lg:bottom-1"
        >
          <SegmentedControlItem value="light">
            <SunIcon aria-hidden />
            Light
          </SegmentedControlItem>
          <SegmentedControlItem value="dark">
            <MoonIcon aria-hidden />
            Dark
          </SegmentedControlItem>
        </SegmentedControl>
      </div>
      <div className="grid gap-8 lg:grid-cols-[1fr_9rem]">
        {/* The negative margin keeps the cards on the content edge; the padding is the dark frame. */}
        <div
          className={cn(
            "-m-3 rounded-xl p-3 text-foreground transition-colors duration-normal",
            theme === "dark" ? "dark bg-canvas" : "bg-transparent",
          )}
        >
          {children}
        </div>
        {aside}
      </div>
    </div>
  );
}
