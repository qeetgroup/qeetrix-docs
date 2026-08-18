import { Badge, cn } from "@qeetrix/ui";
import Link from "next/link";
import { DocToc } from "@/components/doc-toc";
import { DocsNavTree } from "@/components/docs-sidebar";

type Crumb = { title: string; href?: string };

/**
 * Layout of the content page (spec §15.2, three-column reading frame):
 *  - `doc`  — sticky left nav rail · measure-capped prose · sticky right TOC (default)
 *  - `wide` — sticky left nav rail · full-width content (catalog / grid pages)
 *  - `bare` — single centered column, no rails (special pages)
 */
type ShellVariant = "doc" | "wide" | "bare";

function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  if (crumbs.length === 0) return null;
  return (
    <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
        </li>
        {crumbs.map((c) => (
          <li key={c.title} className="flex items-center gap-1.5">
            <span aria-hidden>/</span>
            {c.href ? (
              <Link href={c.href} className="hover:text-foreground">
                {c.title}
              </Link>
            ) : (
              <span aria-current="page" className="text-foreground">
                {c.title}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

function Header({ title, lead, status }: { title: string; lead?: string; status?: string }) {
  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
        {status && <Badge variant="secondary">{status}</Badge>}
      </div>
      {lead && <p className="mt-3 max-w-2xl text-lg text-muted-foreground text-pretty">{lead}</p>}
    </>
  );
}

/** Shared content-page scaffold: three-column reading frame + breadcrumb + title + lead + body. */
export function PageShell({
  title,
  lead,
  crumbs = [],
  status,
  variant = "doc",
  children,
}: {
  title: string;
  lead?: string;
  crumbs?: Crumb[];
  status?: string;
  variant?: ShellVariant;
  children?: React.ReactNode;
}) {
  if (variant === "bare") {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <Breadcrumb crumbs={crumbs} />
        <Header title={title} lead={lead} status={status} />
        <div id="doc-content" className="mt-8">
          {children}
        </div>
      </div>
    );
  }

  const withToc = variant === "doc";

  return (
    <div className="mx-auto w-full max-w-360 px-4 sm:px-6">
      <div
        className={cn(
          "lg:grid lg:gap-10",
          withToc
            ? "lg:grid-cols-[15rem_minmax(0,1fr)] xl:grid-cols-[15rem_minmax(0,1fr)_14rem]"
            : "lg:grid-cols-[15rem_minmax(0,1fr)]",
        )}
      >
        {/* Left rail — contextual section navigation */}
        <aside className="hidden lg:block">
          <div className="sticky top-14 max-h-[calc(100vh-3.5rem)] overflow-y-auto py-12 pe-2">
            <DocsNavTree />
          </div>
        </aside>

        {/* Content column */}
        <div className="min-w-0 py-10 lg:py-12">
          <Breadcrumb crumbs={crumbs} />
          <div className={withToc ? "max-w-3xl" : undefined}>
            <Header title={title} lead={lead} status={status} />
          </div>
          <div id="doc-content" className={cn("mt-8", withToc && "max-w-3xl")}>
            {children}
          </div>
        </div>

        {/* Right rail — on-page table of contents (doc variant only) */}
        {withToc && (
          <aside className="hidden xl:block">
            <div className="sticky top-14 max-h-[calc(100vh-3.5rem)] overflow-y-auto py-12 ps-2">
              <DocToc />
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}

/** Honesty-ladder notice for pages whose surface is specified but not yet built. */
export function InDevelopment({ children }: { children?: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 text-sm shadow-rest">
      <p className="font-medium text-foreground">In active development</p>
      <p className="mt-1 text-muted-foreground">
        {children ??
          "This surface is specified in the ui.qeet.in platform spec and is being built. The route, IA, and metadata are live; rich content is landing next."}
      </p>
    </div>
  );
}
