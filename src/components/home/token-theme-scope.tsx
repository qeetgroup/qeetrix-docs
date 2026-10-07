"use client";

import {
  ArrowDownIcon,
  ArrowRightIcon,
  MoonIcon,
  PaletteIcon,
  RotateCcwIcon,
  SunIcon,
} from "@qeetrix/icons";
import {
  IconButton,
  SegmentedControl,
  SegmentedControlItem,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@qeetrix/ui";
import {
  type CSSProperties,
  type ReactNode,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

export type TokenAccent = {
  id: string;
  label: string;
  path: string;
  value: string;
  hover: string;
  bright: string;
  ramp: string[];
};

function observePageTheme(notify: () => void) {
  const observer = new MutationObserver(notify);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function readPageTheme() {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function TokenThemeScope({
  header,
  aside,
  children,
  accents,
}: {
  header: ReactNode;
  aside: ReactNode;
  children: ReactNode;
  accents: TokenAccent[];
}) {
  const pageTheme = useSyncExternalStore<"light" | "dark" | null>(
    observePageTheme,
    readPageTheme,
    () => null,
  );
  const [selectedTheme, setTheme] = useState<string | null>(null);
  const theme = selectedTheme ?? pageTheme;
  const [accentId, setAccentId] = useState(accents[0].id);
  const accent =
    accents.find((candidate) => candidate.id === accentId) ?? accents[0];
  const accentGroup = useId();
  const flow = useRef<HTMLDivElement>(null);
  const accentStyle = {
    "--primary": accent.value,
    "--ring": theme === "dark" ? accent.bright : accent.value,
    "--qx-color-action-primary": accent.value,
    "--qx-color-action-primary-hover": accent.hover,
    "--qx-color-action-primary-active": accent.hover,
    "--qx-color-text-brand": theme
      ? theme === "dark"
        ? accent.bright
        : accent.hover
      : undefined,
    "--qx-color-border-brand": theme === "dark" ? accent.bright : accent.value,
    "--qx-color-focus-ring": theme === "dark" ? accent.bright : accent.value,
    "--qx-color-surface-brand-subtle": `color-mix(in oklab, ${accent.value} 12%, var(--qx-color-surface-default))`,
  } as CSSProperties;

  function replayFlow() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    for (const animation of flow.current?.getAnimations({ subtree: true }) ??
      []) {
      if (
        animation instanceof CSSAnimation &&
        animation.animationName.startsWith("home-")
      ) {
        animation.currentTime = 0;
        animation.play();
      }
    }
  }

  return (
    <div className="flex flex-col gap-8">
      {header}
      <div
        data-home-theme={theme ?? undefined}
        data-home-reveal
        style={accentStyle}
        className="home-token-scope overflow-hidden rounded-lg border border-border bg-card text-foreground shadow-hover"
      >
        <div className="flex flex-wrap items-center gap-x-6 gap-y-4 border-b border-border-subtle bg-surface-sunken/35 px-5 py-4 sm:px-8">
          <span className="flex items-center gap-2 text-label font-medium">
            <PaletteIcon aria-hidden className="size-4 text-brand" />
            Token studio
          </span>
          <fieldset className="flex items-center gap-1.5">
            <legend className="sr-only">Accent color</legend>
            {accents.map((option) => (
              <label
                key={option.id}
                title={option.label}
                className="group/swatch flex size-11 cursor-pointer items-center justify-center rounded-full"
              >
                <input
                  type="radio"
                  className="peer sr-only"
                  name={accentGroup}
                  value={option.id}
                  checked={accentId === option.id}
                  onChange={() => {
                    setAccentId(option.id);
                    replayFlow();
                  }}
                  aria-label={option.label}
                />
                <span
                  aria-hidden
                  className="flex size-8 items-center justify-center rounded-full border border-transparent transition-colors duration-fast peer-checked:border-foreground peer-focus-visible:focus-ring"
                >
                  <span
                    className="size-6 rounded-full shadow-rest"
                    style={{ background: option.value }}
                  />
                </span>
              </label>
            ))}
          </fieldset>
          <div className="flex shrink-0 items-center gap-2 sm:ms-auto">
            <SegmentedControl
              value={theme ?? "light"}
              onValueChange={(value) => {
                setTheme(value);
                replayFlow();
              }}
              aria-label="Token theme"
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
            <Tooltip>
              <TooltipTrigger
                render={
                  <IconButton
                    icon={RotateCcwIcon}
                    variant="ghost"
                    aria-label="Replay token flow"
                    onClick={replayFlow}
                  />
                }
              />
              <TooltipContent>Replay token flow</TooltipContent>
            </Tooltip>
          </div>
        </div>
        <div
          ref={flow}
          className="home-token-flow grid lg:grid-cols-[0.85fr_1.4fr]"
        >
          <div className="flex min-w-0 flex-col border-b border-border-subtle bg-surface-sunken/20 p-5 sm:p-8 lg:border-e lg:border-b-0">
            <div data-token-stage="1" className="flex flex-col gap-4">
              <h3 className="flex items-center gap-3 text-label font-semibold">
                <span className="font-mono text-caption text-muted-foreground">
                  01
                </span>
                Primitive value
              </h3>
              <div className="flex h-16 gap-1.5" aria-hidden>
                {accent.ramp.map((value) => (
                  <span
                    key={value}
                    className="min-w-0 flex-1 rounded-md border border-border-subtle"
                    style={{ background: value }}
                  />
                ))}
              </div>
              <div className="flex flex-col gap-1">
                <code className="font-mono text-label text-foreground">
                  {accent.path}
                </code>
                <code className="font-mono text-caption wrap-anywhere text-muted-foreground">
                  {accent.value}
                </code>
              </div>
            </div>
            <div
              aria-hidden
              className="home-token-connector flex items-center gap-3 py-5 text-brand"
            >
              <span className="h-px flex-1 bg-border-subtle" />
              <ArrowDownIcon className="size-4" />
              <span className="h-px flex-1 bg-border-subtle" />
            </div>
            <div data-token-stage="2" className="flex flex-col gap-4">
              <h3 className="flex items-center gap-3 text-label font-semibold">
                <span className="font-mono text-caption text-muted-foreground">
                  02
                </span>
                Semantic role
              </h3>
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="size-9 shrink-0 rounded-md bg-primary"
                />
                <div className="min-w-0">
                  <p className="text-label font-medium">Primary action</p>
                  <code className="font-mono text-caption wrap-anywhere text-muted-foreground">
                    color.action.primary
                  </code>
                </div>
                <ArrowRightIcon
                  aria-hidden
                  className="ms-auto hidden size-4 shrink-0 text-brand lg:block rtl:rotate-180"
                />
              </div>
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="size-9 shrink-0 rounded-md border border-border-brand/30 bg-brand-subtle"
                />
                <div className="min-w-0">
                  <p className="text-label font-medium">Brand surface</p>
                  <code className="font-mono text-caption wrap-anywhere text-muted-foreground">
                    color.surface.brand-subtle
                  </code>
                </div>
              </div>
            </div>
          </div>
          <div
            data-token-stage="3"
            className="home-token-output relative flex min-w-0 flex-col gap-6 p-5 sm:p-8"
          >
            <div
              aria-hidden
              className="home-token-pulse absolute inset-x-0 top-0 h-0.5 bg-primary"
            />
            <h3 className="flex items-center gap-3 text-label font-semibold">
              <span className="font-mono text-caption text-muted-foreground">
                03
              </span>
              Component tokens
            </h3>
            {children}
          </div>
        </div>
        <div className="grid gap-3 border-t border-border-subtle bg-surface-sunken/35 px-5 py-4 font-mono text-caption sm:px-8 lg:grid-cols-[0.85fr_1.4fr] lg:gap-16">
          <div className="min-w-0">
            <span className="text-brand">--qx-color-action-primary</span>
            <span className="text-muted-foreground">:</span>
            <br />
            <span className="wrap-anywhere text-muted-foreground">
              {`${accent.value};`}
            </span>
          </div>
          <div className="min-w-0">
            <span className="wrap-anywhere text-brand">
              --qx-component-button-primary-background
            </span>
            <span className="text-muted-foreground">:</span>
            <br />
            <span className="wrap-anywhere text-muted-foreground">
              var(--qx-color-action-primary);
            </span>
          </div>
        </div>
        <span className="sr-only" aria-live="polite">
          {accent.label}, {theme} theme.
        </span>
      </div>
      {aside}
    </div>
  );
}
