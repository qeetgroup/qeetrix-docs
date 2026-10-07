"use client";

import {
  ArrowLeftRightIcon,
  ChevronRightIcon,
  MoonIcon,
  Rows3Icon,
} from "@qeetrix/icons";
import {
  DensityProvider,
  DirectionProvider,
  SegmentedControl,
  SegmentedControlItem,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Toggle,
} from "@qeetrix/ui";
import { type ReactNode, useState } from "react";
import { cn } from "@/lib/cn";
import { type ShowcaseGroupId, showcaseGroups } from "./showcase-panels";

/**
 * Unset density is the library's default size. `DensityProvider density="comfortable"` is not
 * that default — it opts into the roomier comfortable scale — so the provider wraps only when
 * compact is on.
 */
function Density({
  compact,
  children,
}: {
  compact: boolean;
  children: ReactNode;
}) {
  return compact ? (
    <DensityProvider density="compact">{children}</DensityProvider>
  ) : (
    children
  );
}

/**
 * The live workbench: real components, grouped, with the three things the library's tokens and
 * providers switch — theme (a local `.dark` scope), density and direction. The page's own theme
 * is left alone. Code views arrive pre-highlighted from the server.
 */
export function LiveShowcase({
  code,
}: {
  code: Record<ShowcaseGroupId, ReactNode>;
}) {
  const [view, setView] = useState("preview");
  const [dark, setDark] = useState(false);
  // Compact by default: a workbench shows more at once. The toggle returns to the default size.
  const [compact, setCompact] = useState(true);
  const [rtl, setRtl] = useState(false);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-rest">
      <div className="flex flex-wrap items-center gap-3 border-b border-border-subtle px-4 py-2.5">
        <span aria-hidden className="flex gap-2">
          <span className="size-3 rounded-full bg-destructive" />
          <span className="size-3 rounded-full bg-rating-filled" />
          <span className="size-3 rounded-full bg-success" />
        </span>
        <div className="ms-auto flex flex-wrap items-center gap-1">
          <Toggle
            size="sm"
            pressed={dark}
            onPressedChange={setDark}
            aria-label="Dark theme"
          >
            <MoonIcon aria-hidden />
          </Toggle>
          <Toggle
            size="sm"
            pressed={compact}
            onPressedChange={setCompact}
            aria-label="Compact density"
          >
            <Rows3Icon aria-hidden />
          </Toggle>
          <Toggle
            size="sm"
            pressed={rtl}
            onPressedChange={setRtl}
            aria-label="Right-to-left"
          >
            <ArrowLeftRightIcon aria-hidden />
          </Toggle>
          <span aria-hidden className="mx-2 h-5 w-px bg-border-subtle" />
          <SegmentedControl
            size="sm"
            value={view}
            onValueChange={setView}
            aria-label="View"
          >
            <SegmentedControlItem value="preview">Preview</SegmentedControlItem>
            <SegmentedControlItem value="code">Code</SegmentedControlItem>
          </SegmentedControl>
        </div>
      </div>

      <Tabs
        defaultValue="components"
        orientation="vertical"
        className="gap-0 data-[orientation=vertical]:flex-col md:items-stretch md:data-[orientation=vertical]:flex-row"
      >
        <TabsList
          variant="line"
          aria-label="Component groups"
          className="grid w-full shrink-0 grid-cols-2 gap-x-3 gap-y-0.5 border-b border-border-subtle p-3 data-[orientation=vertical]:border-s-0 sm:grid-cols-3 md:flex md:w-52 md:data-[orientation=vertical]:h-auto md:self-stretch md:border-e md:border-b-0"
        >
          {showcaseGroups.map(({ id, label, icon: Icon }) => (
            <TabsTrigger
              key={id}
              value={id}
              className="gap-2.5 pe-2 font-normal after:hidden hover:bg-surface-interactive data-[orientation=vertical]:h-9 data-[active]:bg-brand-subtle data-[active]:font-medium data-[active]:text-brand"
            >
              <Icon aria-hidden />
              {label}
              <ChevronRightIcon
                aria-hidden
                className="ms-auto size-3.5 opacity-60 rtl:rotate-180"
              />
            </TabsTrigger>
          ))}
        </TabsList>

        {showcaseGroups.map(({ id, panel: Panel }) => (
          <TabsContent key={id} value={id} className="min-w-0 flex-1">
            {view === "code" ? (
              <div className="p-4">{code[id]}</div>
            ) : (
              <DirectionProvider direction={rtl ? "rtl" : "ltr"}>
                <Density compact={compact}>
                  <div
                    className={cn(
                      "h-full bg-canvas p-4 text-foreground transition-colors duration-normal",
                      dark && "dark",
                      compact && "home-compact-type",
                    )}
                  >
                    <Panel />
                  </div>
                </Density>
              </DirectionProvider>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
