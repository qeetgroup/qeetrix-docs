"use client";

import {
  BracesIcon,
  FileCodeIcon,
  HashIcon,
  TerminalIcon,
} from "@qeetrix/icons";
// @qeetrix/ui's cn knows the type-role sizes (text-label, text-body, …); the plain one drops them.
import { cn } from "@qeetrix/ui";
import BunLogo from "@thesvg/react/bun";
import NpmLogo from "@thesvg/react/npm";
import PnpmLogo from "@thesvg/react/pnpm";
import ReactLogo from "@thesvg/react/react";
import TypeScriptLogo from "@thesvg/react/typescript";
import YarnLogo from "@thesvg/react/yarn";
import { Pre } from "fumadocs-ui/components/codeblock";
import {
  Tabs,
  TabsContent,
  TabsList,
  type TabsProps,
  TabsTrigger,
} from "fumadocs-ui/components/ui/tabs";
import {
  type ComponentProps,
  createContext,
  type ReactNode,
  use,
  useRef,
} from "react";
import { CopyButton } from "@/components/docs/copy-button";

const LANGUAGES: Record<string, { label: string; icon: ReactNode }> = {
  tsx: { label: "TSX", icon: <ReactLogo variant="mono" aria-hidden /> },
  jsx: { label: "JSX", icon: <ReactLogo variant="mono" aria-hidden /> },
  ts: {
    label: "TypeScript",
    icon: <TypeScriptLogo variant="mono" aria-hidden />,
  },
  typescript: {
    label: "TypeScript",
    icon: <TypeScriptLogo variant="mono" aria-hidden />,
  },
  js: { label: "JavaScript", icon: <FileCodeIcon aria-hidden /> },
  javascript: { label: "JavaScript", icon: <FileCodeIcon aria-hidden /> },
  css: { label: "CSS", icon: <HashIcon aria-hidden /> },
  json: { label: "JSON", icon: <BracesIcon aria-hidden /> },
  bash: { label: "Terminal", icon: <TerminalIcon aria-hidden /> },
  sh: { label: "Terminal", icon: <TerminalIcon aria-hidden /> },
  shell: { label: "Terminal", icon: <TerminalIcon aria-hidden /> },
  html: { label: "HTML", icon: <FileCodeIcon aria-hidden /> },
};

export function languageInfo(language: string | undefined): {
  label: string;
  icon: ReactNode;
} {
  const known = language ? LANGUAGES[language] : undefined;
  if (known) return known;
  return {
    label: language && language !== "plaintext" ? language : "Text",
    icon: <FileCodeIcon aria-hidden />,
  };
}

type CodeBlockProps = ComponentProps<"pre"> & {
  title?: string;
  "data-language"?: string;
  allowCopy?: string | boolean;
  /** Extra controls for the header, before the copy button. */
  actions?: ReactNode;
  /** Classes for the scrolling area, e.g. to cap its height. */
  viewportClassName?: string;
  bare?: boolean;
};

/**
 * Every highlighted block on the site. A header names the file (from ```tsx title="…") or the
 * language, with its mark, and carries a labelled copy button; the body scrolls on its own. The
 * `shiki` classes and colour variables stay on the frame, where Fumadocs' code styles look for
 * them. `bare` drops the frame's border and corners for blocks inside another surface.
 */
export function CodeBlock({
  title,
  "data-language": language,
  allowCopy = true,
  actions,
  viewportClassName,
  bare = false,
  className,
  style,
  children,
  icon: _icon,
  tabIndex: _tabIndex,
  ...props
}: CodeBlockProps & { icon?: unknown }) {
  const area = useRef<HTMLElement>(null);
  const inTabs = use(InTabs);
  const info = languageInfo(language);
  const copyable = allowCopy !== false && allowCopy !== "false";
  const readCode = () => {
    const pre = area.current?.querySelector("pre");
    if (!pre) return "";
    const clone = pre.cloneNode(true) as HTMLElement;
    for (const node of clone.querySelectorAll(".nd-copy-ignore")) {
      node.replaceWith("\n");
    }
    return clone.textContent ?? "";
  };

  return (
    <figure
      dir="ltr"
      data-code-block=""
      className={cn(
        "not-prose group/code relative overflow-hidden bg-surface-subtle text-code shiki",
        bare || inTabs
          ? "rounded-none border-0"
          : "my-6 rounded-xl border border-border-subtle shadow-xs dark:border-border",
        className,
      )}
      style={style}
    >
      {inTabs ? (
        copyable ? (
          <CopyButton
            value={readCode}
            className="absolute end-2 top-2.5 z-10 bg-surface-subtle"
          />
        ) : null
      ) : (
        <div className="flex h-10 items-center gap-2 border-b border-border-subtle bg-surface/60 ps-3.5 pe-1.5 text-caption text-muted-foreground">
          <span className="flex size-4 shrink-0 items-center justify-center [&_svg]:size-3.5">
            {info.icon}
          </span>
          <figcaption className="min-w-0 flex-1 truncate font-medium text-foreground/80">
            {title ?? info.label}
          </figcaption>
          {actions}
          {copyable ? <CopyButton value={readCode} showLabel /> : null}
        </div>
      )}
      <section
        ref={area}
        // biome-ignore lint/a11y/noNoninteractiveTabindex: the code can scroll sideways, so keyboard users need to focus it.
        tabIndex={0}
        aria-label={title ?? `${info.label} code`}
        className={cn(
          "fd-scroll-container max-h-[600px] overflow-auto py-4 text-[0.8125rem] leading-relaxed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
          viewportClassName,
        )}
      >
        <Pre {...props}>{children}</Pre>
      </section>
    </figure>
  );
}

/** Set inside <CodeTabs>, whose tab bar is the header, so each block drops its own. */
const InTabs = createContext(false);

const MANAGERS: Record<string, ReactNode> = {
  bun: <BunLogo variant="mono" aria-hidden />,
  npm: <NpmLogo variant="mono" aria-hidden />,
  pnpm: <PnpmLogo variant="mono" aria-hidden />,
  yarn: <YarnLogo variant="mono" aria-hidden />,
};

/**
 * Tabbed code — package-manager commands from ```npm blocks, and `tab="…"` groups. The tab bar is
 * the block's header; package managers get their marks.
 */
export function CodeTabs({ className, children, ...props }: TabsProps) {
  return (
    <InTabs value={true}>
      <Tabs
        {...props}
        className={cn(
          "not-prose my-6 overflow-hidden rounded-xl border border-border-subtle bg-surface-subtle shadow-xs",
          typeof className === "string" ? className : undefined,
        )}
      >
        {children}
      </Tabs>
    </InTabs>
  );
}

export function CodeTabsList({
  className,
  ...props
}: ComponentProps<typeof TabsList>) {
  return (
    <TabsList
      {...props}
      className={cn(
        "flex h-10 items-center gap-1 overflow-x-auto border-b border-border-subtle bg-surface/60 px-1.5",
        typeof className === "string" ? className : undefined,
      )}
    />
  );
}

export function CodeTabsTrigger({
  value,
  children,
  className: _className,
  ...props
}: ComponentProps<typeof TabsTrigger>) {
  const mark = typeof value === "string" ? MANAGERS[value] : undefined;
  return (
    <TabsTrigger
      value={value}
      {...props}
      className={(state) =>
        cn(
          "inline-flex h-7 shrink-0 items-center gap-1.5 rounded-md px-2.5 text-caption font-medium transition-colors duration-fast focus-visible:focus-ring [&_svg]:size-3.5",
          state.active
            ? "bg-card text-foreground shadow-xs ring-1 ring-border-subtle"
            : "text-muted-foreground hover:text-foreground",
        )
      }
    >
      {mark}
      {children}
    </TabsTrigger>
  );
}

export function CodeTab(props: ComponentProps<typeof TabsContent>) {
  return <TabsContent {...props} />;
}
