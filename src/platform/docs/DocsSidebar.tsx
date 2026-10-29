// The docs navigation, Qeetrix's own Sidebar: group labels, round navigation icons, counts, two
// levels of folders each stepping in on a guide line, a folder that is also a page (its row the
// link, its chevron the fold), and the current page marked with the Ember bar. Rendered to HTML,
// as the docs chrome runs no React: docs-nav.ts folds them, and filters the whole tree.
import { XIcon } from "@qeetrix/icons/icons/x";
import { Badge, IconButton, type QeetrixIcon } from "@qeetrix/react";
import { SearchField, Sidebar, SidebarGroup, SidebarItem } from "@qeetrix/react/experimental";
import type { ReactNode } from "react";
import { ThemeMenu } from "../chrome/ThemeMenu";
import { Logo } from "../components/Logo";
import type { DocsChrome, DocsNavItem } from "../site";

/** A brand's own mark as a Sidebar icon, drawn per scheme when the mark has two drawings. */
const brandIcon = ([light, dark]: NonNullable<DocsNavItem["brand"]>) =>
  // biome-ignore lint/correctness/noComponentHookFactories: rendered to HTML once, never re-rendered, so there's no state to lose.
  function BrandIcon({ className }: { className?: string }) {
    return (
      <span className={`doc-nav-brand ${className ?? ""}`}>
        <Logo name={light} className={dark ? "only-light" : undefined} />
        {dark && <Logo name={dark} className="only-dark" />}
      </span>
    );
  } as unknown as QeetrixIcon;

const iconOf = (node: DocsNavItem) => (node.brand ? brandIcon(node.brand) : node.icon);

const badgeOf = (node: DocsNavItem): ReactNode =>
  node.isNew ? (
    <Badge tone="brand" size="sm">
      New
    </Badge>
  ) : (
    node.count
  );

/** Every page, with where it lives: Components › Actions. */
const pagesOf = (
  nodes: readonly DocsNavItem[],
  path: string[],
): { node: DocsNavItem; path: string[] }[] =>
  nodes.flatMap((n) => [
    ...(n.href ? [{ node: n, path }] : []),
    ...(n.items ? pagesOf(n.items, [...path, n.label]) : []),
  ]);

export default function DocsSidebar({ docs, current }: { docs: DocsChrome; current?: string }) {
  const holds = (n: DocsNavItem): boolean => n.id === current || !!n.items?.some(holds);

  const render = (n: DocsNavItem): ReactNode => (
    <SidebarItem
      key={n.label}
      label={n.label}
      href={n.href}
      icon={iconOf(n)}
      badge={badgeOf(n)}
      current={n.id === current}
      filledWhenCurrent={n.filledWhenCurrent}
      defaultOpen={n.items ? n.open || holds(n) : undefined}
      data-holds-current={n.items?.some(holds) ? "" : undefined}
    >
      {n.items?.map(render)}
    </SidebarItem>
  );

  const pages = docs.groups.flatMap((g) => pagesOf(g.items, [g.label]));

  return (
    <Sidebar
      label="Docs"
      title={
        <SearchField
          className="doc-nav-find"
          aria-label="Filter navigation"
          placeholder="Filter navigation"
          endAdornment={
            <IconButton
              icon={XIcon}
              aria-label="Clear search"
              size="sm"
              tone="neutral"
              tooltip={false}
              className="qx-search-field-clear"
              hidden
              data-doc-nav-clear
            />
          }
        />
      }
      footer={
        <>
          <SidebarGroup>
            {docs.help.map((n) => (
              <SidebarItem key={n.label} label={n.label} href={n.href} icon={n.icon} />
            ))}
          </SidebarGroup>
          <div className="doc-nav-end">
            <span>
              <code>{docs.version.name}</code>
              {` ${docs.version.version}`}
            </span>
            <ThemeMenu id="doc-nav-theme-menu" />
          </div>
        </>
      }
    >
      {docs.groups.map((g) => (
        <SidebarGroup key={g.label} label={g.label} data-doc-nav-tree>
          {g.items.map(render)}
        </SidebarGroup>
      ))}
      {/* The filter's results: every page with where it lives, shown while there's a query. */}
      <SidebarGroup label="Pages" hidden data-doc-nav-results>
        {pages.map(({ node, path }) => (
          <SidebarItem
            key={`${path.join("/")}/${node.label}`}
            label={node.label}
            href={node.href}
            current={node.id === current}
            badge={<span className="doc-nav-path">{path.at(-1)}</span>}
            data-match={`${node.label} ${path.join(" ")}`.toLowerCase()}
          />
        ))}
      </SidebarGroup>
    </Sidebar>
  );
}
