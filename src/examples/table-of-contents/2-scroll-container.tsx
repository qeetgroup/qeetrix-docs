"use client";

import { TableOfContents, type TocItem } from "@qeetrix/ui";
import { type MouseEvent, useRef, useState } from "react";

const sections = [
  {
    id: "toc-policy-general",
    label: "General",
    depth: 0,
    body: "Tenant name Northwind Retail, primary domain northwind.in and the default locale, English (India).",
  },
  {
    id: "toc-policy-sign-in",
    label: "Sign-in methods",
    depth: 0,
    body: "Choose how members authenticate. Passkeys are the default for every new member.",
  },
  {
    id: "toc-policy-passkeys",
    label: "Passkeys",
    depth: 1,
    body: "Synced passkeys and hardware keys are allowed. Owners and Admins must register a hardware key.",
  },
  {
    id: "toc-policy-sso",
    label: "Single sign-on",
    depth: 1,
    body: "SAML with Okta is connected; members on northwind.in are redirected to Okta.",
  },
  {
    id: "toc-policy-sessions",
    label: "Sessions",
    depth: 0,
    body: "Sessions expire after 12 hours, or after 30 idle minutes for Admins.",
  },
  {
    id: "toc-policy-residency",
    label: "Data residency",
    depth: 0,
    body: "Identity data is stored in Mumbai, with backups in Hyderabad.",
  },
];

const items: TocItem[] = sections.map(({ id, label, depth }) => ({
  id,
  label,
  depth,
}));

/**
 * The built-in scroll-spy measures against the viewport, not a scroll container. For an article
 * that scrolls inside a panel of its own, work out the current section from the panel and pass it
 * as `activeId`. `depth` indents sub-sections; the indicator stays on the track at every depth.
 *
 * @layout wide
 */
export default function TableOfContentsScrollContainer() {
  const panel = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState(items[0].id);

  // The current section is the last heading scrolled to the top of the panel.
  const onScroll = () => {
    const element = panel.current;
    if (!element) return;
    const top = element.getBoundingClientRect().top;
    let current = items[0].id;
    for (const item of items) {
      const heading = document.getElementById(item.id);
      if (heading && heading.getBoundingClientRect().top - top <= 24) {
        current = item.id;
      }
    }
    const atEnd =
      element.scrollTop + element.clientHeight >= element.scrollHeight - 1;
    setActiveId(atEnd ? items[items.length - 1].id : current);
  };

  // Following an outline link scrolls the panel, not the page.
  const onNavigate = (event: MouseEvent) => {
    const link = (event.target as Element).closest("a");
    const heading = link && document.getElementById(link.hash.slice(1));
    if (!panel.current || !heading) return;
    event.preventDefault();
    panel.current.scrollTo({ top: heading.offsetTop - 16, behavior: "smooth" });
  };

  return (
    <div className="grid w-full gap-8 sm:grid-cols-[minmax(0,1fr)_12rem]">
      <div
        ref={panel}
        onScroll={onScroll}
        className="relative h-72 overflow-y-auto rounded-lg border border-border bg-background p-5"
      >
        <div className="flex flex-col gap-6 pb-16">
          {sections.map((section) => {
            const Heading = section.depth === 0 ? "h4" : "h5";
            return (
              <section key={section.id} className="flex flex-col gap-1.5">
                <Heading
                  id={section.id}
                  className={
                    section.depth === 0
                      ? "font-heading text-base font-medium"
                      : "text-sm font-medium"
                  }
                >
                  {section.label}
                </Heading>
                <p className="text-sm text-muted-foreground">{section.body}</p>
              </section>
            );
          })}
        </div>
      </div>
      <TableOfContents
        items={items}
        activeId={activeId}
        onClickCapture={onNavigate}
        className="hidden sm:block"
      />
    </div>
  );
}
