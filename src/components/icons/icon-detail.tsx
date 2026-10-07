"use client";

import {
  ArrowLeftRightIcon,
  CodeIcon,
  CopyIcon,
  DownloadIcon,
  FileCodeIcon,
  PackageIcon,
  XIcon,
} from "@qeetrix/icons";
// @qeetrix/ui's cn knows the type-role sizes (text-label, text-body, …); the plain one drops them.
import { cn } from "@qeetrix/ui";
import { type ReactNode, useState } from "react";
import { CopyButton, useCopy } from "@/components/docs/copy-button";
import {
  COLORS,
  type DrawingSet,
  directImportSnippet,
  displayName,
  type Icon,
  importSnippet,
  jsxSnippet,
  type Look,
  type Shape,
  svgMarkup,
  svgProps,
  type Variant,
} from "./icon-data";

/** One drawing of an icon, sized and coloured for the current look. */
export function IconGlyph({
  set,
  id,
  look,
  size = look.size,
  className,
}: {
  set: DrawingSet | undefined;
  id: string;
  look: Look;
  size?: number;
  className?: string;
}) {
  if (!set?.icons[id]) {
    return (
      <span
        aria-hidden
        className={cn("block animate-pulse rounded-md bg-muted", className)}
        style={{ width: size * 0.8, height: size * 0.8 }}
      />
    );
  }
  const color = COLORS.find((entry) => entry.id === look.color)?.css;
  return (
    <svg
      {...svgProps(set, id, look)}
      width={size}
      height={size}
      aria-hidden
      focusable="false"
      className={cn("shrink-0", className)}
      style={{ color }}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: build-time markup rendered from @qeetrix/icons' own components.
      dangerouslySetInnerHTML={{ __html: set.icons[id] }}
    />
  );
}

/** A tiny highlighter for the one-line snippets here, in the site's code colours. */
function highlight(code: string): ReactNode[] {
  const tokens =
    /("[^"]*")|\b(import|from)\b|(<\/?|\/>|>|[{}=;,])|\b([A-Z][A-Za-z0-9]*)\b|\b([a-z][A-Za-z]*)(?==)|(\d+(?:\.\d+)?)/g;
  const out: ReactNode[] = [];
  let last = 0;
  for (const match of code.matchAll(tokens)) {
    const index = match.index ?? 0;
    if (index > last) out.push(code.slice(last, index));
    const [text, string, keyword, punctuation, component, attribute, number] =
      match;
    const role = string
      ? "string"
      : keyword
        ? "keyword"
        : punctuation
          ? "punctuation"
          : component
            ? "function"
            : attribute
              ? "attribute"
              : number
                ? "constant"
                : "foreground";
    out.push(
      <span key={index} style={{ color: `var(--code-${role})` }}>
        {text}
      </span>,
    );
    last = index + text.length;
  }
  if (last < code.length) out.push(code.slice(last));
  return out;
}

function Snippet({ label, code }: { label: string; code: string }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border-subtle bg-surface-subtle">
      <div className="flex h-8 items-center justify-between border-b border-border-subtle ps-3 pe-1 text-micro font-medium text-muted-foreground uppercase tracking-wide">
        {label}
        <CopyButton value={code} label={`Copy ${label.toLowerCase()}`} />
      </div>
      <pre className="px-3 py-2.5 font-mono text-[0.75rem] leading-relaxed whitespace-pre-wrap text-foreground [overflow-wrap:anywhere]">
        {highlight(code)}
      </pre>
    </div>
  );
}

function ActionButton({
  icon,
  children,
  onClick,
  done,
}: {
  icon: ReactNode;
  children: ReactNode;
  onClick: () => void;
  done?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-done={done || undefined}
      className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-border-subtle bg-card px-3 text-label font-medium text-foreground shadow-xs transition-colors duration-fast hover:bg-surface-interactive focus-visible:focus-ring data-done:border-success/40 data-done:text-success-text [&_svg]:size-4"
    >
      {icon}
      {children}
    </button>
  );
}

const DRAWINGS: { shape: Shape; variant: Variant }[] = [
  { shape: "round", variant: "outline" },
  { shape: "round", variant: "filled" },
  { shape: "sharp", variant: "outline" },
  { shape: "sharp", variant: "filled" },
];

const capitalize = (word: string) => word[0].toUpperCase() + word.slice(1);

/**
 * Everything about one icon: a large preview on the canvas, its four drawings to switch between,
 * copy and download actions for the look on show, the import lines, and the categories and tags
 * it is filed under — each a way back into the grid.
 */
export function IconDetail({
  icon,
  look,
  sets,
  categoryLabels,
  onLook,
  onCategory,
  onSearch,
  onClose,
  headerClassName = "bg-background/90",
}: {
  icon: Icon;
  look: Look;
  sets: Partial<Record<`${Shape}-${Variant}`, DrawingSet>>;
  categoryLabels: Map<string, string>;
  onLook: (change: Partial<Look>) => void;
  onCategory: (id: string) => void;
  onSearch: (query: string) => void;
  onClose?: () => void;
  /** The sticky header's background, matching the surface the panel sits on. */
  headerClassName?: string;
}) {
  const variant: Variant = icon.hasFilled ? look.variant : "outline";
  const shown = { ...look, variant };
  const set = sets[`${look.shape}-${variant}`];
  const jsx = jsxSnippet(icon, shown);
  const [jsxCopied, copyJsx] = useCopy();
  const [svgCopied, copySvg] = useCopy();
  const [downloaded, setDownloaded] = useState(false);

  const download = () => {
    if (!set) return;
    const blob = new Blob([svgMarkup(set, icon.id, shown)], {
      type: "image/svg+xml",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${icon.id}${look.shape === "sharp" ? "-sharp" : ""}${variant === "filled" ? "-filled" : ""}.svg`;
    link.click();
    URL.revokeObjectURL(url);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 1600);
  };

  return (
    <div className="flex flex-col">
      {/* Stays at the top of the scrolling panel, so the name and the close button never scroll away. */}
      <div
        className={cn(
          "sticky top-0 z-10 flex items-start justify-between gap-3 border-b border-border-subtle px-5 pt-5 pb-4 backdrop-blur-md",
          headerClassName,
        )}
      >
        <div className="flex min-w-0 flex-col gap-1">
          <h2 className="truncate font-heading text-heading font-semibold text-foreground">
            {displayName(icon.id)}
          </h2>
          <div className="flex items-center gap-1">
            <code className="truncate font-mono text-caption text-muted-foreground">
              {icon.componentName}
            </code>
            <CopyButton
              value={icon.componentName}
              label="Copy component name"
              className="size-6"
            />
          </div>
        </div>
        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close details"
            className="inline-flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors duration-fast hover:bg-surface-interactive hover:text-foreground focus-visible:focus-ring"
          >
            <XIcon className="size-4" aria-hidden />
          </button>
        ) : null}
      </div>

      <div className="flex flex-col gap-5 px-5 pt-5 pb-8">
        <div className="preview-canvas relative flex aspect-[4/3] items-center justify-center rounded-xl border border-border-subtle dark:border-border">
          <IconGlyph
            set={set}
            id={icon.id}
            look={shown}
            size={Math.max(80, look.size * 3)}
          />
          <span className="absolute start-3 bottom-2.5 font-mono text-micro text-muted-foreground">
            {look.size}px
            {variant === "outline" ? ` · ${look.stroke} stroke` : " · filled"}
          </span>
          {icon.mirrors ? (
            <span className="absolute end-3 bottom-2.5 inline-flex items-center gap-1 rounded-full border border-border-subtle bg-card px-2 py-0.5 text-micro text-muted-foreground">
              <ArrowLeftRightIcon className="size-3" aria-hidden />
              Mirrors in RTL
            </span>
          ) : null}
        </div>

        <div
          role="radiogroup"
          aria-label="Drawing"
          className="grid grid-cols-4 gap-2"
        >
          {DRAWINGS.map((drawing) => {
            const available = drawing.variant === "outline" || icon.hasFilled;
            const active =
              drawing.shape === look.shape && drawing.variant === variant;
            return (
              // biome-ignore lint/a11y/useSemanticElements: a row of visual swatches acting as one radio group.
              <button
                key={`${drawing.shape}-${drawing.variant}`}
                type="button"
                role="radio"
                aria-checked={active}
                aria-label={`${capitalize(drawing.shape)} ${drawing.variant}`}
                title={
                  available
                    ? undefined
                    : `${icon.componentName} has no filled drawing`
                }
                disabled={!available}
                onClick={() =>
                  onLook({ shape: drawing.shape, variant: drawing.variant })
                }
                className={cn(
                  "group flex flex-col items-center gap-1.5 rounded-lg border px-1 pt-2.5 pb-2 transition-colors duration-fast focus-visible:focus-ring disabled:cursor-not-allowed disabled:opacity-40",
                  active
                    ? "border-border-brand bg-brand-subtle/60"
                    : "border-border-subtle bg-card hover:bg-surface-interactive",
                )}
              >
                <span className="flex size-8 items-center justify-center">
                  {available ? (
                    <IconGlyph
                      set={sets[`${drawing.shape}-${drawing.variant}`]}
                      id={icon.id}
                      look={{
                        ...look,
                        shape: drawing.shape,
                        variant: drawing.variant,
                      }}
                      size={22}
                    />
                  ) : (
                    <span className="text-micro text-muted-foreground">—</span>
                  )}
                </span>
                <span className="flex flex-col items-center text-[0.6875rem] leading-tight">
                  <span className="font-medium text-foreground">
                    {capitalize(drawing.shape)}
                  </span>
                  <span className="text-muted-foreground">
                    {capitalize(drawing.variant)}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <ActionButton
            icon={<CodeIcon aria-hidden />}
            onClick={() => copyJsx(jsx)}
            done={jsxCopied}
          >
            {jsxCopied ? "Copied" : "Copy JSX"}
          </ActionButton>
          <ActionButton
            icon={<FileCodeIcon aria-hidden />}
            onClick={() => set && copySvg(svgMarkup(set, icon.id, shown))}
            done={svgCopied}
          >
            {svgCopied ? "Copied" : "Copy SVG"}
          </ActionButton>
          <ActionButton
            icon={<DownloadIcon aria-hidden />}
            onClick={download}
            done={downloaded}
          >
            {downloaded ? "Saved" : "Download"}
          </ActionButton>
          <CopyImport icon={icon} />
        </div>

        <div className="flex flex-col gap-2">
          <Snippet label="React" code={`${importSnippet(icon)}\n\n${jsx}`} />
          <Snippet label="Direct import" code={directImportSnippet(icon)} />
        </div>

        <dl className="flex flex-col gap-3 text-caption">
          <div className="flex flex-col gap-1.5">
            <dt className="font-medium text-muted-foreground">Categories</dt>
            <dd className="flex flex-wrap gap-1.5">
              {icon.categories.map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => onCategory(id)}
                  className="rounded-full border border-border-subtle bg-card px-2.5 py-0.5 text-foreground transition-colors duration-fast hover:border-border-brand hover:text-[var(--qx-color-text-brand)] focus-visible:focus-ring"
                >
                  {categoryLabels.get(id) ?? id}
                </button>
              ))}
            </dd>
          </div>
          {icon.tags.length > 0 ? (
            <div className="flex flex-col gap-1.5">
              <dt className="font-medium text-muted-foreground">Tags</dt>
              <dd className="flex flex-wrap gap-1.5">
                {icon.tags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => onSearch(tag)}
                    className="rounded-md bg-surface-subtle px-2 py-0.5 text-muted-foreground transition-colors duration-fast hover:bg-surface-interactive hover:text-foreground focus-visible:focus-ring"
                  >
                    {tag}
                  </button>
                ))}
              </dd>
            </div>
          ) : null}
          {icon.aliases.length > 0 ? (
            <div className="flex flex-col gap-1">
              <dt className="font-medium text-muted-foreground">
                Earlier names
              </dt>
              <dd className="font-mono text-muted-foreground">
                {icon.aliases.join(" · ")}
              </dd>
            </div>
          ) : null}
        </dl>
      </div>
    </div>
  );
}

function CopyImport({ icon }: { icon: Icon }) {
  const [copied, copy] = useCopy();
  return (
    <ActionButton
      icon={copied ? <CopyIcon aria-hidden /> : <PackageIcon aria-hidden />}
      onClick={() => copy(importSnippet(icon))}
      done={copied}
    >
      {copied ? "Copied" : "Copy import"}
    </ActionButton>
  );
}
