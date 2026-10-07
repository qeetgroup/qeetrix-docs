import {
  ArrowUpRightIcon,
  ChevronRightIcon,
  PackageIcon,
} from "@qeetrix/icons";
import { StatusPill } from "@qeetrix/ui";
import Github from "@thesvg/react/github";
import Link from "next/link";
import type { ReactNode } from "react";
import { CopyButton } from "@/components/docs/copy-button";
import type { ComponentMeta } from "@/lib/components";
import { resolveIcon } from "@/lib/icons";
import { links } from "@/lib/site-links";

const STATUS = {
  stable: { label: "Stable", kind: "success" },
  beta: { label: "Beta", kind: "info" },
  experimental: { label: "Experimental", kind: "warning" },
  deprecated: { label: "Deprecated", kind: "danger" },
} as const;

const AUDIT = {
  audited: "Audited",
  partial: "Partly audited",
  "not-audited": "Not yet audited",
} as const;

/**
 * The top of every docs page: where it sits (section, and a component's group), the title and
 * lead, and the page actions. A component page adds its status and a strip of facts — the import,
 * the source file at this release, the package and the accessibility pattern — so the questions
 * a reader brings to a component page are answered before the first example.
 */
export function DocsPageHeader({
  section,
  title,
  description,
  actions,
  component,
}: {
  section: { name: string; url: string };
  title: ReactNode;
  description?: ReactNode;
  actions: ReactNode;
  component?: { meta: ComponentMeta; version: string } | null;
}) {
  const meta = component?.meta;
  const status = meta ? STATUS[meta.status] : null;

  return (
    <header className="not-prose flex flex-col gap-6 border-b border-border-subtle pb-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <nav
          aria-label="Breadcrumb"
          className="flex min-w-0 items-center gap-1.5 text-label text-muted-foreground"
        >
          <Link
            href={section.url}
            className="rounded-sm font-medium text-[var(--qx-color-text-brand)] transition-opacity duration-fast hover:opacity-80 focus-visible:focus-ring"
          >
            {section.name}
          </Link>
          {meta?.group ? (
            <>
              <ChevronRightIcon
                className="size-3.5 shrink-0 opacity-60"
                aria-hidden
              />
              <span className="flex items-center gap-1.5 truncate [&_svg]:size-3.5">
                {resolveIcon(meta.group.icon)}
                {meta.group.name}
              </span>
            </>
          ) : null}
        </nav>
        <div className="flex items-center gap-2">{actions}</div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <h1 className="font-heading text-title font-semibold tracking-tight text-foreground md:text-[calc(var(--qx-typography-title-font-size)*1.2)]">
            {title}
          </h1>
          {status ? (
            <StatusPill kind={status.kind} dot>
              {status.label}
            </StatusPill>
          ) : null}
        </div>
        {description ? (
          <p className="max-w-[46rem] text-[calc(var(--qx-typography-body-font-size)*1.2)] leading-relaxed text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>

      {meta && component ? (
        <dl className="grid overflow-hidden rounded-xl border border-border-subtle bg-surface-subtle text-label sm:grid-cols-[8rem_1fr]">
          <MetaRow label="Import">
            <code className="min-w-0 truncate font-mono text-code text-foreground">
              {meta.importLine}
            </code>
            <CopyButton
              value={meta.importLine}
              label="Copy import"
              className="-my-1 ms-auto"
            />
          </MetaRow>
          <MetaRow label="Source">
            <ExternalLink href={meta.sourceUrl}>
              <Github variant="mono" aria-hidden className="size-3.5" />
              <span className="truncate font-mono text-code">
                {meta.sourcePath}
              </span>
            </ExternalLink>
          </MetaRow>
          <MetaRow label="Package">
            <ExternalLink href={links.npm}>
              <PackageIcon className="size-3.5" aria-hidden />
              <span>
                @qeetrix/ui{" "}
                <span className="text-muted-foreground">
                  {component.version}
                </span>
              </span>
            </ExternalLink>
          </MetaRow>
          <MetaRow label="Accessibility" last>
            <span className="text-foreground">
              {meta.pattern ? (
                <>
                  WAI-ARIA <code className="font-mono">{meta.pattern}</code>{" "}
                  pattern
                </>
              ) : (
                "No ARIA pattern"
              )}
              <span className="text-muted-foreground">
                {" "}
                · {AUDIT[meta.audit]}
              </span>
            </span>
          </MetaRow>
        </dl>
      ) : null}
    </header>
  );
}

function MetaRow({
  label,
  last = false,
  children,
}: {
  label: string;
  last?: boolean;
  children: ReactNode;
}) {
  const rule = last ? "" : "border-b border-border-subtle";
  return (
    <>
      <dt
        className={`px-4 pt-3 text-caption font-medium text-muted-foreground sm:py-3 ${last ? "" : "sm:border-b sm:border-border-subtle"}`}
      >
        {label}
      </dt>
      <dd
        className={`flex min-w-0 items-center gap-2 px-4 pt-1 pb-3 sm:py-3 ${rule}`}
      >
        {children}
      </dd>
    </>
  );
}

function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group inline-flex min-w-0 items-center gap-2 rounded-sm text-foreground transition-colors duration-fast hover:text-[var(--qx-color-text-brand)] focus-visible:focus-ring"
    >
      {children}
      <ArrowUpRightIcon
        className="size-3.5 shrink-0 text-muted-foreground transition-transform duration-fast group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        aria-hidden
      />
    </a>
  );
}
