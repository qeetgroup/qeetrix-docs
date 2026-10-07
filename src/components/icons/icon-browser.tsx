"use client";

import {
  ArrowUpRightIcon,
  RotateCcwIcon,
  SearchIcon,
  SearchXIcon,
  ShapesIcon,
  SlidersHorizontalIcon,
  XIcon,
} from "@qeetrix/icons";
// @qeetrix/ui's cn knows the type-role sizes (text-label, text-body, …); the plain one drops them.
import {
  cn,
  SegmentedControl,
  SegmentedControlItem,
  Sheet,
  SheetBody,
  SheetContent,
  SheetHeader,
  SheetTitle,
  Slider,
} from "@qeetrix/ui";
import Link from "next/link";
import {
  memo,
  type ReactNode,
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { CopyButton } from "@/components/docs/copy-button";
import { links } from "@/lib/site-links";
import {
  type Catalogue,
  COLORS,
  type ColorId,
  DEFAULT_SIZE,
  DEFAULT_STROKE,
  type DrawingSet,
  type Icon,
  type Look,
  loadCatalogue,
  loadSet,
  type Shape,
  searchIcons,
  type Variant,
} from "./icon-data";
import { IconDetail, IconGlyph } from "./icon-detail";

type SetKey = `${Shape}-${Variant}`;

const DEFAULT_LOOK: Look = {
  shape: "round",
  variant: "outline",
  size: DEFAULT_SIZE,
  stroke: DEFAULT_STROKE,
  color: "default",
};

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const list = window.matchMedia(query);
    const update = () => setMatches(list.matches);
    update();
    list.addEventListener("change", update);
    return () => list.removeEventListener("change", update);
  }, [query]);
  return matches;
}

/**
 * The icon browser at /icons: every @qeetrix/icons icon, searchable and filterable by category,
 * in either shape and either variant, at the size, stroke and colour you set — with a detail panel
 * that copies the JSX, the import or the SVG, or downloads the file. The data comes from
 * public/icon-data (scripts/generate-icons.mjs); the state lives in the URL, so a view can be
 * shared.
 */
export function IconBrowser({
  version,
  total,
}: {
  version: string;
  total: number;
}) {
  const [catalogue, setCatalogue] = useState<Catalogue | null>(null);
  const [failed, setFailed] = useState(false);
  const [sets, setSets] = useState<Partial<Record<SetKey, DrawingSet>>>({});
  const [look, setLook] = useState<Look>(DEFAULT_LOOK);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const search = useRef<HTMLInputElement>(null);
  const wide = useMediaQuery("(min-width: 80rem)");
  const deferredQuery = useDeferredValue(query);
  const ready = useRef(false);

  // Load the catalogue, and read the view from the URL.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setQuery(params.get("q") ?? "");
    setCategory(params.get("category") ?? "");
    setSelected(params.get("icon"));
    setLook((current) => ({
      ...current,
      shape: params.get("shape") === "sharp" ? "sharp" : "round",
      variant: params.get("variant") === "filled" ? "filled" : "outline",
    }));
    ready.current = true;
    loadCatalogue(version).then(setCatalogue, () => setFailed(true));
  }, [version]);

  // Keep the URL in step, without adding history entries.
  useEffect(() => {
    if (!ready.current) return;
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (category) params.set("category", category);
    if (look.shape !== "round") params.set("shape", look.shape);
    if (look.variant !== "outline") params.set("variant", look.variant);
    if (selected) params.set("icon", selected);
    const next = `${window.location.pathname}${params.size ? `?${params}` : ""}`;
    window.history.replaceState(window.history.state, "", next);
  }, [query, category, look.shape, look.variant, selected]);

  const ensureSet = useCallback(
    (shape: Shape, variant: Variant) => {
      const key: SetKey = `${shape}-${variant}`;
      loadSet(version, shape, variant).then(
        (set) =>
          setSets((current) =>
            current[key] ? current : { ...current, [key]: set },
          ),
        () => setFailed(true),
      );
    },
    [version],
  );

  // The set on show, and — once an icon is open — the other drawings its panel previews.
  useEffect(() => {
    ensureSet(look.shape, look.variant);
  }, [ensureSet, look.shape, look.variant]);
  useEffect(() => {
    if (!selected) return;
    for (const shape of ["round", "sharp"] as const)
      for (const variant of ["outline", "filled"] as const)
        ensureSet(shape, variant);
  }, [ensureSet, selected]);

  // "/" focuses search; Escape closes the open icon.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const typing = target?.closest(
        "input, textarea, select, [contenteditable='true']",
      );
      if (event.key === "/" && !typing && !event.metaKey && !event.ctrlKey) {
        event.preventDefault();
        search.current?.focus();
      } else if (event.key === "Escape" && !typing) {
        setSelected(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const labels = useMemo(
    () => new Map(catalogue?.categories.map((c) => [c.id, c.label]) ?? []),
    [catalogue],
  );
  const filledOnly = look.variant === "filled";
  const pool = useMemo(
    () =>
      catalogue?.icons.filter(
        (icon) =>
          (!category || icon.categories.includes(category)) &&
          (!filledOnly || icon.hasFilled),
      ) ?? [],
    [catalogue, category, filledOnly],
  );
  const results = useMemo(
    () => searchIcons(pool, deferredQuery, labels),
    [pool, deferredQuery, labels],
  );
  const grouped = !deferredQuery.trim() && !category;
  const groups = useMemo(() => {
    if (!grouped) return [{ id: "results", label: "", icons: results }];
    const byCategory = new Map<string, Icon[]>();
    for (const icon of results) {
      const id = icon.categories[0];
      const list = byCategory.get(id);
      if (list) list.push(icon);
      else byCategory.set(id, [icon]);
    }
    return [...byCategory]
      .map(([id, icons]) => ({ id, label: labels.get(id) ?? id, icons }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [grouped, results, labels]);

  const selectedIcon = selected ? catalogue?.byId.get(selected) : undefined;
  const set = sets[`${look.shape}-${look.variant}`];
  const filledCount = useMemo(
    () => catalogue?.icons.filter((icon) => icon.hasFilled).length ?? 0,
    [catalogue],
  );
  const onSelect = useCallback(
    (id: string) => setSelected((current) => (current === id ? null : id)),
    [],
  );
  const changeLook = (change: Partial<Look>) =>
    setLook((current) => ({ ...current, ...change }));
  const reset = () => {
    setQuery("");
    setCategory("");
  };

  const rail = catalogue ? (
    <Rail
      catalogue={catalogue}
      category={category}
      look={look}
      onCategory={(id) => {
        setCategory(id);
        setFiltersOpen(false);
      }}
      onLook={changeLook}
    />
  ) : (
    <RailSkeleton />
  );

  // The panel, docked on wide screens or in a sheet on narrower ones; its sticky header takes the
  // colour of the surface it sits on.
  const renderDetail = (headerClassName?: string) =>
    selectedIcon ? (
      <IconDetail
        icon={selectedIcon}
        look={look}
        sets={sets}
        categoryLabels={labels}
        onLook={changeLook}
        onCategory={(id) => {
          setQuery("");
          setCategory(id);
        }}
        onSearch={(tag) => {
          setCategory("");
          setQuery(tag);
        }}
        onClose={() => setSelected(null)}
        headerClassName={headerClassName}
      />
    ) : null;

  return (
    <div className="flex w-full flex-1">
      <aside
        aria-label="Categories and customizer"
        className="sticky top-(--site-header-height) hidden h-[calc(100dvh-var(--site-header-height))] w-64 shrink-0 overflow-y-auto border-e border-border-subtle bg-background px-4 pt-6 pb-10 lg:block"
      >
        {rail}
      </aside>

      <main id="main" className="flex min-w-0 flex-1 flex-col">
        <Hero version={version} total={total} />

        <div className="sticky top-(--site-header-height) z-20 border-y border-border-subtle bg-card/85 backdrop-blur-md">
          <div className="flex flex-wrap items-center gap-2 px-4 py-3 md:px-8">
            <label className="group relative flex h-10 min-w-0 max-w-2xl flex-1 basis-64 items-center rounded-xl border border-border-subtle bg-background shadow-xs transition-colors duration-fast focus-within:border-border-brand focus-within:ring-3 focus-within:ring-ring/20">
              <SearchIcon
                aria-hidden
                className="ms-3.5 size-4 shrink-0 text-muted-foreground"
              />
              <span className="sr-only">Search icons</span>
              <input
                ref={search}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={`Search ${total.toLocaleString("en")} icons…`}
                className="h-full min-w-0 flex-1 bg-transparent px-3 text-body text-foreground outline-none placeholder:text-muted-foreground [&::-webkit-search-cancel-button]:hidden"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    search.current?.focus();
                  }}
                  aria-label="Clear search"
                  className="me-2 inline-flex size-6 items-center justify-center rounded-md text-muted-foreground hover:bg-surface-interactive hover:text-foreground focus-visible:focus-ring"
                >
                  <XIcon className="size-3.5" aria-hidden />
                </button>
              ) : (
                <kbd className="me-3 hidden rounded border border-border-subtle bg-card px-1.5 font-mono text-micro text-muted-foreground sm:inline-block">
                  /
                </kbd>
              )}
            </label>
            <div className="ms-auto flex flex-wrap items-center gap-2">
              <SegmentedControl
                aria-label="Shape"
                size="sm"
                value={look.shape}
                onValueChange={(value) => changeLook({ shape: value as Shape })}
              >
                <SegmentedControlItem value="round">Round</SegmentedControlItem>
                <SegmentedControlItem value="sharp">Sharp</SegmentedControlItem>
              </SegmentedControl>
              <SegmentedControl
                aria-label="Variant"
                size="sm"
                value={look.variant}
                onValueChange={(value) =>
                  changeLook({ variant: value as Variant })
                }
              >
                <SegmentedControlItem value="outline">
                  Outline
                </SegmentedControlItem>
                <SegmentedControlItem value="filled">
                  Filled
                </SegmentedControlItem>
              </SegmentedControl>
              <button
                type="button"
                onClick={() => setFiltersOpen(true)}
                className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border-subtle bg-card px-2.5 text-label font-medium text-foreground lg:hidden"
              >
                <SlidersHorizontalIcon className="size-4" aria-hidden />
                Filters
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 pb-2.5 text-caption text-muted-foreground md:px-8">
            <span aria-live="polite">
              {catalogue
                ? `${results.length.toLocaleString("en")} ${results.length === 1 ? "icon" : "icons"}`
                : "Loading icons…"}
              {category ? ` in ${labels.get(category)}` : ""}
              {filledOnly && catalogue
                ? ` · ${filledCount.toLocaleString("en")} have a filled drawing`
                : ""}
            </span>
            {query || category ? (
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 font-medium text-foreground hover:bg-surface-interactive focus-visible:focus-ring"
              >
                <RotateCcwIcon className="size-3" aria-hidden />
                Clear filters
              </button>
            ) : null}
          </div>
        </div>

        <div className="flex-1 px-4 pt-6 pb-16 md:px-8">
          {failed ? (
            <EmptyState
              title="The icons didn't load"
              body="Reload the page to try again."
            />
          ) : !catalogue ? (
            <GridSkeleton />
          ) : results.length === 0 ? (
            <EmptyState
              title={`No icons match “${deferredQuery.trim()}”`}
              body={
                filledOnly
                  ? "Only icons with a filled drawing are shown. Try Outline, or a broader word."
                  : "Try a broader word, a synonym, or another category."
              }
              action={
                <button
                  type="button"
                  onClick={() => {
                    reset();
                    changeLook({ variant: "outline" });
                  }}
                  className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border-subtle bg-card px-3 text-label font-medium text-foreground shadow-xs hover:bg-surface-interactive focus-visible:focus-ring"
                >
                  <RotateCcwIcon className="size-4" aria-hidden />
                  Show all icons
                </button>
              }
            />
          ) : (
            <div className="flex flex-col gap-10">
              {groups.map((group) => (
                <section
                  key={group.id}
                  aria-label={group.label || "Results"}
                  className="[contain-intrinsic-size:auto_640px] [content-visibility:auto]"
                >
                  {group.label ? (
                    <h2 className="mb-3 flex items-baseline gap-2 text-label font-semibold text-foreground">
                      {group.label}
                      <span className="font-normal text-muted-foreground">
                        {group.icons.length}
                      </span>
                    </h2>
                  ) : null}
                  <div className="grid grid-cols-[repeat(auto-fill,minmax(6.5rem,1fr))] gap-1.5">
                    {group.icons.map((icon) => (
                      <IconTile
                        key={icon.id}
                        icon={icon}
                        set={set}
                        look={look}
                        selected={icon.id === selected}
                        onSelect={onSelect}
                      />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>
      </main>

      <aside
        aria-label="Icon details"
        className="sticky top-(--site-header-height) hidden h-[calc(100dvh-var(--site-header-height))] w-[22rem] shrink-0 overflow-y-auto overscroll-contain border-s border-border-subtle bg-background xl:block"
      >
        {renderDetail() ?? <DetailPlaceholder />}
      </aside>

      <Sheet
        open={!wide && Boolean(selectedIcon)}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      >
        <SheetContent
          side="right"
          className="w-[min(24rem,100vw)]"
          showCloseButton={false}
        >
          <SheetTitle className="sr-only">
            {selectedIcon?.componentName ?? "Icon"}
          </SheetTitle>
          <SheetBody className="p-0">
            {renderDetail("bg-(--qx-component-dialog-background)/90")}
          </SheetBody>
        </SheetContent>
      </Sheet>

      <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
        <SheetContent side="left" className="w-72">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <SheetBody>{rail}</SheetBody>
        </SheetContent>
      </Sheet>
    </div>
  );
}

const IconTile = memo(function IconTile({
  icon,
  set,
  look,
  selected,
  onSelect,
}: {
  icon: Icon;
  set: DrawingSet | undefined;
  look: Look;
  selected: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(icon.id)}
      aria-pressed={selected}
      aria-label={icon.componentName}
      title={icon.componentName}
      data-selected={selected || undefined}
      className="group flex aspect-square flex-col items-center justify-center gap-2 rounded-xl border border-transparent p-2 text-foreground transition-[background-color,border-color,box-shadow] duration-fast focus-visible:focus-ring data-selected:border-border-brand data-selected:bg-brand-subtle/60 data-selected:shadow-xs [&:not([data-selected]):hover]:border-border-subtle [&:not([data-selected]):hover]:bg-card [&:not([data-selected]):hover]:shadow-xs"
    >
      <span className="flex flex-1 items-center justify-center">
        <IconGlyph set={set} id={icon.id} look={look} />
      </span>
      <span className="w-full truncate text-center text-[0.6875rem] leading-tight text-muted-foreground group-hover:text-foreground group-data-selected:text-foreground">
        {icon.id}
      </span>
    </button>
  );
});

function Hero({ version, total }: { version: string; total: number }) {
  const install = "bun add @qeetrix/icons";
  return (
    <section className="relative overflow-hidden border-border-subtle px-4 pt-10 pb-8 md:px-8 md:pt-12">
      <div className="preview-canvas pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)] opacity-70" />
      <div className="relative flex flex-col gap-4">
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border-subtle bg-card px-2.5 py-1 font-mono text-micro text-muted-foreground shadow-xs">
          <ShapesIcon
            className="size-3.5 text-[var(--qx-color-text-brand)]"
            aria-hidden
          />
          @qeetrix/icons {version}
        </span>
        <h1 className="font-heading text-title font-semibold tracking-tight text-foreground md:text-[calc(var(--qx-typography-title-font-size)*1.25)]">
          Icons
        </h1>
        <p className="max-w-2xl text-[calc(var(--qx-typography-body-font-size)*1.15)] leading-relaxed text-muted-foreground">
          {total.toLocaleString("en")} icons, each drawn in a round and a sharp
          shape, many with a filled variant. One React component per icon —
          typed, tree-shaken and decorative by default.
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex h-9 items-center gap-1 rounded-lg border border-border-subtle bg-card ps-3 pe-1 shadow-xs">
            <span className="select-none font-mono text-code text-muted-foreground">
              $
            </span>
            <code className="font-mono text-code text-foreground">
              {install}
            </code>
            <CopyButton value={install} label="Copy install command" />
          </div>
          <Link
            href={links.icons}
            className="group inline-flex h-9 items-center gap-1.5 rounded-lg px-3 text-label font-medium text-foreground transition-colors duration-fast hover:bg-surface-interactive focus-visible:focus-ring"
          >
            Usage guide
            <ArrowUpRightIcon
              className="size-3.5 transition-transform duration-fast group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Rail({
  catalogue,
  category,
  look,
  onCategory,
  onLook,
}: {
  catalogue: Catalogue;
  category: string;
  look: Look;
  onCategory: (id: string) => void;
  onLook: (change: Partial<Look>) => void;
}) {
  const categories = useMemo(
    () =>
      [...catalogue.categories].sort((a, b) => a.label.localeCompare(b.label)),
    [catalogue],
  );
  const changed =
    look.size !== DEFAULT_SIZE ||
    look.stroke !== DEFAULT_STROKE ||
    look.color !== "default";
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 rounded-xl border border-border-subtle bg-card p-4 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-label font-semibold text-foreground">
            Customize
          </span>
          <button
            type="button"
            onClick={() =>
              onLook({
                size: DEFAULT_SIZE,
                stroke: DEFAULT_STROKE,
                color: "default",
              })
            }
            disabled={!changed}
            aria-label="Reset size, stroke and colour"
            className="inline-flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors duration-fast hover:bg-surface-interactive hover:text-foreground focus-visible:focus-ring disabled:opacity-40"
          >
            <RotateCcwIcon className="size-3.5" aria-hidden />
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-caption font-medium text-muted-foreground">
            Colour
          </span>
          <div
            role="radiogroup"
            aria-label="Colour"
            className="grid grid-cols-7 gap-1"
          >
            {COLORS.map((color) => (
              // biome-ignore lint/a11y/useSemanticElements: colour swatches acting as one radio group.
              <button
                key={color.id}
                type="button"
                role="radio"
                aria-checked={look.color === color.id}
                aria-label={color.label}
                title={color.label}
                onClick={() => onLook({ color: color.id as ColorId })}
                className="flex aspect-square w-full items-center justify-center rounded-full border border-border-subtle transition-shadow duration-fast focus-visible:focus-ring aria-checked:ring-2 aria-checked:ring-border-brand aria-checked:ring-offset-1 aria-checked:ring-offset-card"
              >
                <span
                  className="size-3.5 rounded-full"
                  style={{
                    background:
                      color.id === "default" ? "var(--foreground)" : color.css,
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        <RangeField
          label="Size"
          value={look.size}
          unit="px"
          min={16}
          max={64}
          step={4}
          onChange={(size) => onLook({ size })}
        />
        <RangeField
          label="Stroke"
          value={look.stroke}
          min={1}
          max={3}
          step={0.25}
          disabled={look.variant === "filled"}
          hint={look.variant === "filled" ? "Outline only" : undefined}
          onChange={(stroke) => onLook({ stroke })}
        />
      </div>

      <nav aria-label="Icon categories" className="flex flex-col gap-0.5">
        <span className="mb-1.5 px-2 text-micro font-semibold tracking-wide text-muted-foreground uppercase">
          Categories
        </span>
        <CategoryButton
          active={!category}
          label="All icons"
          count={catalogue.icons.length}
          onClick={() => onCategory("")}
        />
        {categories.map((entry) => (
          <CategoryButton
            key={entry.id}
            active={category === entry.id}
            label={entry.label}
            count={entry.count}
            onClick={() => onCategory(entry.id)}
          />
        ))}
      </nav>
    </div>
  );
}

function CategoryButton({
  active,
  label,
  count,
  onClick,
}: {
  active: boolean;
  label: string;
  count: number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active || undefined}
      className={cn(
        "relative flex h-8 items-center justify-between gap-2 rounded-md px-2 text-start text-label transition-colors duration-fast focus-visible:focus-ring",
        active
          ? "bg-sidebar-selected font-medium text-sidebar-selected-foreground before:absolute before:inset-y-[25%] before:start-0 before:w-(--qx-component-sidebar-indicator-width) before:rounded-full before:bg-sidebar-indicator"
          : "text-muted-foreground hover:bg-surface-interactive hover:text-foreground",
      )}
    >
      <span className="truncate">{label}</span>
      <span className="font-mono text-micro tabular-nums text-muted-foreground">
        {count}
      </span>
    </button>
  );
}

function RangeField({
  label,
  value,
  unit = "",
  min,
  max,
  step,
  disabled = false,
  hint,
  onChange,
}: {
  label: string;
  value: number;
  unit?: string;
  min: number;
  max: number;
  step: number;
  disabled?: boolean;
  hint?: string;
  onChange: (value: number) => void;
}) {
  return (
    <div className={cn("flex flex-col gap-2.5", disabled && "opacity-50")}>
      <div className="flex items-center justify-between text-caption">
        <span className="font-medium text-muted-foreground">{label}</span>
        <span className="font-mono tabular-nums text-foreground">
          {hint ?? `${value}${unit}`}
        </span>
      </div>
      <Slider
        aria-label={label}
        value={value}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        onValueChange={(next) =>
          onChange(Array.isArray(next) ? (next[0] as number) : (next as number))
        }
      />
    </div>
  );
}

function DetailPlaceholder() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 px-8 text-center">
      <div className="preview-canvas flex size-24 items-center justify-center rounded-2xl border border-border-subtle dark:border-border">
        <ShapesIcon
          className="size-9 text-[var(--qx-color-text-brand)]"
          aria-hidden
        />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-label font-semibold text-foreground">
          Choose an icon
        </p>
        <p className="text-caption text-muted-foreground">
          See every drawing, copy the JSX, the import or the SVG, or download
          the file.
        </p>
      </div>
      <p className="flex items-center gap-1.5 text-caption text-muted-foreground">
        <kbd className="rounded border border-border-subtle bg-card px-1.5 font-mono text-micro">
          /
        </kbd>
        to search
        <span aria-hidden>·</span>
        <kbd className="rounded border border-border-subtle bg-card px-1.5 font-mono text-micro">
          Esc
        </kbd>
        to close
      </p>
    </div>
  );
}

function EmptyState({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: ReactNode;
}) {
  return (
    <div className="mx-auto flex max-w-sm flex-col items-center gap-3 py-20 text-center">
      <span className="flex size-12 items-center justify-center rounded-xl border border-border-subtle bg-card text-muted-foreground shadow-xs">
        <SearchXIcon className="size-5" aria-hidden />
      </span>
      <p className="text-label font-semibold text-foreground">{title}</p>
      <p className="text-caption text-muted-foreground">{body}</p>
      {action}
    </div>
  );
}

function GridSkeleton() {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(6.5rem,1fr))] gap-1.5">
      {Array.from({ length: 48 }, (_, index) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: static placeholders.
          key={index}
          className="flex aspect-square flex-col items-center justify-center gap-3 rounded-xl"
        >
          <span className="size-6 animate-pulse rounded-md bg-muted" />
          <span className="h-2 w-12 animate-pulse rounded bg-muted" />
        </div>
      ))}
    </div>
  );
}

function RailSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <div className="h-56 animate-pulse rounded-xl bg-muted" />
      {Array.from({ length: 12 }, (_, index) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: static placeholders.
          key={index}
          className="h-6 animate-pulse rounded-md bg-muted/70"
        />
      ))}
    </div>
  );
}
