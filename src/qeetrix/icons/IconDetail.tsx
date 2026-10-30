// The Icon browser's details, in the browser: Qeetrix's FloatingPanel, moved by its head and resized
// from its corner, open while you pick other icons, and opening where you left it. An island beside
// the server-rendered grid: browser.ts tells it which icon with a "qf-icon-detail" event on the
// window, hears "qf-icon-detail-closed" when it closes, and copies from its data-qf-copy buttons.
// It opens into the browser (PortalContainer), so it takes the colour picked there.
import { CopyIcon } from "@qeetrix/icons/icons/copy";
import { Button, PortalContainer } from "@qeetrix/react";
import { FloatingPanel } from "@qeetrix/react/experimental";
import { useEffect, useRef, useState } from "react";

/** What browser.ts knows of the icon on show. */
export interface IconDetailData {
  id: string;
  name: string;
  categories: string;
  tags: string;
  drawings: string;
  direction: string;
  /** Its sheet and symbol, in the shape and drawing picked. */
  href: string;
  /** Open the panel; otherwise only bring an open one up to date. */
  open: boolean;
}

const SIZES = [16, 24, 32, 48, 64];

export default function IconDetail() {
  const [icon, setIcon] = useState<IconDetailData | null>(null);
  const [open, setOpen] = useState(false);
  // It stays below the docs header.
  const [top, setTop] = useState(0);
  const inside = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setTop(document.querySelector(".site-header")?.getBoundingClientRect().height ?? 0);
    const show = (event: Event) => {
      const next = (event as CustomEvent<IconDetailData>).detail;
      setIcon(next);
      if (next.open) setOpen(true);
    };
    const hide = () => setOpen(false);
    addEventListener("qf-icon-detail", show);
    addEventListener("qf-icon-detail-hide", hide);
    return () => {
      removeEventListener("qf-icon-detail", show);
      removeEventListener("qf-icon-detail-hide", hide);
    };
  }, []);
  return (
    <div className="qf-detail-portal" ref={inside}>
      <PortalContainer container={inside}>
        <FloatingPanel
          open={open && icon !== null}
          onOpenChange={(next) => {
            setOpen(next);
            if (!next) dispatchEvent(new Event("qf-icon-detail-closed"));
          }}
          title={icon?.id ?? "Icon"}
          storageKey="qeetrix-docs:icon-details"
          topOffset={top}
          minWidth={288}
          minHeight={256}
          className="qf-detail"
        >
          {icon && (
            <div className="qf-detail-body" data-qf-detail>
              <div className="qf-detail-stage" aria-hidden="true">
                <svg width="96" height="96" aria-hidden="true">
                  <use href={icon.href} />
                </svg>
              </div>
              <div className="qf-detail-sizes" aria-hidden="true">
                {SIZES.map((size) => (
                  <span key={size}>
                    <svg width={size} height={size} aria-hidden="true">
                      <use href={icon.href} />
                    </svg>
                    <code>{size}</code>
                  </span>
                ))}
              </div>
              <dl className="qf-detail-facts">
                <div>
                  <dt>Component</dt>
                  <dd>
                    <code>{icon.name}</code>
                  </dd>
                </div>
                <div>
                  <dt>Categories</dt>
                  <dd>{icon.categories}</dd>
                </div>
                <div>
                  <dt>Tags</dt>
                  <dd>{icon.tags}</dd>
                </div>
                <div>
                  <dt>Drawings</dt>
                  <dd>{icon.drawings}</dd>
                </div>
                <div>
                  <dt>Right to left</dt>
                  <dd>{icon.direction}</dd>
                </div>
              </dl>
              <pre className="qf-detail-code">
                <code>{`import { ${icon.name} } from "@qeetrix/icons";`}</code>
              </pre>
              <div className="qf-detail-copy">
                {(
                  [
                    ["import", "Copy import"],
                    ["jsx", "Copy JSX"],
                    ["svg", "Copy SVG"],
                  ] as const
                ).map(([kind, label]) => (
                  <Button
                    key={kind}
                    size="sm"
                    variant="soft"
                    tone="neutral"
                    icon={CopyIcon}
                    data-qf-copy={kind}
                  >
                    {label}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </FloatingPanel>
      </PortalContainer>
    </div>
  );
}
