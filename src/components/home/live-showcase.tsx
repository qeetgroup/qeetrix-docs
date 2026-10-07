"use client";

import {
  ArrowLeftRightIcon,
  ChevronRightIcon,
  CodeIcon,
  MonitorIcon,
  MoonIcon,
  Rows3Icon,
  SunIcon,
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
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@qeetrix/ui";
import { type ReactNode, useState } from "react";
import { cn } from "@/lib/cn";
import { type ShowcaseGroupId, showcaseGroups } from "./showcase-panels";

function Density({
  compact,
  children,
}: {
  compact: boolean;
  children: ReactNode;
}) {
  return (
    <DensityProvider density={compact ? "compact" : "comfortable"}>
      {children}
    </DensityProvider>
  );
}

/**
 * The live workbench: real components, grouped, with the three things the library's tokens and
 * providers switch — theme (a local `.dark` scope), density and direction. The page's own theme
 * is left alone. Code views arrive pre-highlighted from the server.
 */
export function LiveShowcase({
  code,
  version,
}: {
  code: Record<ShowcaseGroupId, ReactNode>;
  version: string;
}) {
  const [view, setView] = useState("preview");
  const [theme, setTheme] = useState("page");
  const [compact, setCompact] = useState(true);
  const [rtl, setRtl] = useState(false);

  return (
    <section
      aria-label="Component workbench"
      className="home-workbench overflow-hidden rounded-lg border border-border bg-card shadow-rest"
    >
      <div className="flex flex-wrap items-center gap-x-4 gap-y-3 border-b border-border-subtle bg-surface-sunken/30 px-4 py-3">
        <div className="flex items-center gap-2 text-muted-foreground">
          <CodeIcon aria-hidden className="size-4 text-brand" />
          <span className="font-mono text-caption text-foreground">
            @qeetrix/ui
          </span>
          <span className="text-caption">v{version}</span>
        </div>
        <div className="flex w-full flex-wrap items-center gap-1 sm:ms-auto sm:w-auto">
          <SegmentedControl
            size="sm"
            value={theme}
            onValueChange={setTheme}
            aria-label="Preview theme"
          >
            <SegmentedControlItem
              value="page"
              title="Match page theme"
              className="min-h-9 min-w-9 px-2"
            >
              <MonitorIcon aria-hidden />
              <span className="sr-only">Page theme</span>
            </SegmentedControlItem>
            <SegmentedControlItem
              value="light"
              title="Light preview"
              className="min-h-9 min-w-9 px-2"
            >
              <SunIcon aria-hidden />
              <span className="sr-only">Light preview</span>
            </SegmentedControlItem>
            <SegmentedControlItem
              value="dark"
              title="Dark preview"
              className="min-h-9 min-w-9 px-2"
            >
              <MoonIcon aria-hidden />
              <span className="sr-only">Dark preview</span>
            </SegmentedControlItem>
          </SegmentedControl>
          <Tooltip>
            <TooltipTrigger
              render={
                <Toggle
                  size="sm"
                  className="min-h-9 min-w-9"
                  pressed={compact}
                  onPressedChange={setCompact}
                  aria-label="Compact density"
                />
              }
            >
              <Rows3Icon aria-hidden />
            </TooltipTrigger>
            <TooltipContent>Compact density</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              render={
                <Toggle
                  size="sm"
                  className="min-h-9 min-w-9"
                  pressed={rtl}
                  onPressedChange={setRtl}
                  aria-label="Right-to-left"
                />
              }
            >
              <ArrowLeftRightIcon aria-hidden />
            </TooltipTrigger>
            <TooltipContent>Right-to-left layout</TooltipContent>
          </Tooltip>
          <span
            aria-hidden
            className="mx-1 hidden h-5 w-px bg-border-subtle sm:block"
          />
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
              className="gap-2.5 pe-2 font-normal after:hidden transition-colors duration-normal hover:bg-surface-interactive data-[orientation=vertical]:h-11 data-[active]:bg-brand-subtle data-[active]:font-medium data-[active]:text-brand md:data-[orientation=vertical]:h-9"
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
          <TabsContent
            key={id}
            value={id}
            className="home-state-enter min-w-0 flex-1"
          >
            {view === "code" ? (
              <div className="p-4">{code[id]}</div>
            ) : (
              <DirectionProvider direction={rtl ? "rtl" : "ltr"}>
                <Density compact={compact}>
                  <div
                    data-home-theme={theme === "page" ? undefined : theme}
                    className={cn(
                      "home-workbench-stage h-full min-h-80 bg-canvas p-4 text-foreground transition-colors duration-normal",
                      theme === "dark" && "dark",
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
    </section>
  );
}
