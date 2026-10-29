// Overlays drawn still, for their anatomy and their do-and-don'ts: each popup's markup and classes as
// @qeetrix/react renders it (dialog.js, drawer.js, popover.js, tooltip.js, menu.js, toast.js), open,
// in the page. The overlays themselves open in a portal, in the browser only; the examples run them.
// Pictures, hidden from assistive technology: no roles here; the docs state the real ones.
import { CircleAlertIcon } from "@qeetrix/icons/icons/circle-alert";
import { CircleCheckIcon } from "@qeetrix/icons/icons/circle-check";
import { InfoIcon } from "@qeetrix/icons/icons/info";
import { TriangleAlertIcon } from "@qeetrix/icons/icons/triangle-alert";
import { XIcon } from "@qeetrix/icons/icons/x";
import { Button, IconButton, type QeetrixIcon } from "@qeetrix/react";
import type { ReactNode } from "react";

const Close = () => (
  <IconButton icon={XIcon} aria-label="Close" size="sm" tone="neutral" tooltip={false} />
);

export function StillDialog({
  intent = "standard",
  size = "sm",
  title,
  description,
  body,
  footer,
  dismissible = true,
}: {
  intent?: "standard" | "danger" | "warning";
  size?: "sm" | "md";
  title: string;
  description?: string;
  body?: ReactNode;
  footer: ReactNode;
  dismissible?: boolean;
}) {
  return (
    <div className="qc-still">
      <div className="qx-dialog" data-slot="dialog-popup" data-intent={intent} data-size={size}>
        <div className="qx-dialog-header" data-slot="dialog-header">
          <h2 className="qx-dialog-title" data-slot="dialog-title">
            {title}
          </h2>
          {description && (
            <p className="qx-dialog-description" data-slot="dialog-description">
              {description}
            </p>
          )}
        </div>
        {body && (
          <div className="qx-dialog-body" data-slot="dialog-body">
            {body}
          </div>
        )}
        <div className="qx-dialog-footer" data-slot="dialog-footer">
          {footer}
        </div>
        {dismissible && (
          <div className="qx-dialog-close" data-slot="dialog-close">
            <Close />
          </div>
        )}
      </div>
    </div>
  );
}

export function StillDrawer({
  title,
  description,
  body,
  footer,
}: {
  title: string;
  description?: string;
  body: ReactNode;
  footer: ReactNode;
}) {
  return (
    <div className="qc-still">
      <div className="qx-drawer" data-slot="drawer-popup" data-side="end" data-size="sm">
        <div className="qx-drawer-header" data-slot="drawer-header">
          <h2 className="qx-drawer-title" data-slot="drawer-title">
            {title}
          </h2>
          {description && (
            <p className="qx-drawer-description" data-slot="drawer-description">
              {description}
            </p>
          )}
        </div>
        <div className="qx-drawer-body" data-slot="drawer-body">
          {body}
        </div>
        <div className="qx-drawer-footer" data-slot="drawer-footer">
          {footer}
        </div>
        <div className="qx-drawer-close" data-slot="drawer-close">
          <Close />
        </div>
      </div>
    </div>
  );
}

export function StillPopover({
  title,
  description,
  children,
}: {
  title?: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <div className="qc-still">
      <div className="qx-popover" data-slot="popover-popup">
        {title && (
          <div className="qx-popover-header" data-slot="popover-header">
            <h2 className="qx-popover-title" data-slot="popover-title">
              {title}
            </h2>
            {description && (
              <p className="qx-popover-description" data-slot="popover-description">
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

/** A tooltip open above its trigger, with its pointer facing down to it. */
export function StillTooltip({ children }: { children: ReactNode }) {
  return (
    <div className="qx-tooltip qc-still-tooltip" data-slot="tooltip-popup" data-side="top">
      {children}
      <div className="qx-tooltip-arrow" data-slot="tooltip-arrow" data-side="top" />
    </div>
  );
}

export interface StillItem {
  label: string;
  icon?: QeetrixIcon;
  shortcut?: string;
  description?: string;
  tone?: "danger";
  highlighted?: boolean;
  separator?: boolean;
  group?: string;
}

export function StillMenu({ items }: { items: StillItem[] }) {
  return (
    <div className="qc-still">
      <div className="qx-menu" data-slot="menu-popup">
        {items.map((item) => {
          if (item.separator)
            return (
              <div
                key={`separator-${item.label}`}
                className="qx-menu-separator"
                data-slot="menu-separator"
              />
            );
          if (item.group)
            return (
              <div
                key={`group-${item.group}`}
                className="qx-menu-group-label"
                data-slot="menu-group-label"
              >
                {item.group}
              </div>
            );
          const Icon = item.icon;
          const label = (
            <span className="qx-menu-item-label" data-slot="menu-item-label">
              {item.label}
            </span>
          );
          return (
            <div
              key={item.label}
              className="qx-menu-item"
              data-slot="menu-item"
              data-tone={item.tone}
              data-highlighted={item.highlighted ? "" : undefined}
              data-description={item.description ? "" : undefined}
            >
              {Icon && (
                <Icon
                  shape="sharp"
                  size={16}
                  aria-hidden
                  className="qx-menu-item-icon"
                  data-slot="menu-item-icon"
                />
              )}
              {item.description ? (
                <span className="qx-menu-item-text" data-slot="menu-item-text">
                  {label}
                  <span className="qx-menu-item-description" data-slot="menu-item-description">
                    {item.description}
                  </span>
                </span>
              ) : (
                label
              )}
              <span className="qx-menu-shortcut" data-slot="menu-shortcut" aria-hidden>
                {item.shortcut}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const TONE_ICONS = {
  info: InfoIcon,
  success: CircleCheckIcon,
  warning: TriangleAlertIcon,
  danger: CircleAlertIcon,
};

export function StillToast({
  tone = "info",
  title,
  description,
  action,
}: {
  tone?: keyof typeof TONE_ICONS;
  title: string;
  description?: string;
  action?: string;
}) {
  const Icon = TONE_ICONS[tone];
  return (
    <div className="qc-still">
      <div className="qx-toast" data-slot="toast" data-tone={tone}>
        <Icon
          shape="sharp"
          size={16}
          aria-hidden
          className="qx-toast-icon"
          data-slot="toast-icon"
        />
        <div className="qx-toast-content" data-slot="toast-content">
          <h2 className="qx-toast-title" data-slot="toast-title">
            {title}
          </h2>
          {description && (
            <p className="qx-toast-description" data-slot="toast-description">
              {description}
            </p>
          )}
        </div>
        {action && (
          <Button variant="ghost" size="sm" className="qx-toast-action">
            {action}
          </Button>
        )}
        <Close />
      </div>
    </div>
  );
}
