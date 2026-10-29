// A menu's markup for menu.ts: Qeetrix's Menu popup and items, rendered to HTML. The trigger is any
// button with `data-site-menu`, `aria-haspopup="menu"`, `aria-expanded="false"` and `aria-controls`
// set to the popup's id.
import type { QeetrixIcon } from "@qeetrix/react";
import type { HTMLAttributes, ReactNode } from "react";
import "./menu.css";

interface PopupProps {
  id: string;
  label: string;
  /** The side it opens on when there's room. */
  side?: "top" | "bottom";
  /** Which edge it lines up with the trigger's. */
  align?: "start" | "end";
  className?: string;
  children: ReactNode;
}

export function MenuPopup({
  id,
  label,
  side = "bottom",
  align = "start",
  className,
  children,
}: PopupProps) {
  return (
    <div id={id} className="qx-menu-positioner" data-align={align} hidden>
      <div
        className={className ? `qx-menu ${className}` : "qx-menu"}
        role="menu"
        aria-label={label}
        tabIndex={-1}
        data-side={side}
        data-prefer-side={side}
      >
        {children}
      </div>
    </div>
  );
}

/** An action, with Qeetrix's sharp 16px icon at its start. */
export function MenuItem({
  icon: Icon,
  children,
  ...props
}: { icon?: QeetrixIcon; children: ReactNode } & HTMLAttributes<HTMLDivElement>) {
  return (
    <div role="menuitem" className="qx-menu-item" tabIndex={-1} {...props}>
      {Icon && <Icon shape="sharp" size={16} aria-hidden className="qx-menu-item-icon" />}
      <span className="qx-menu-item-label">{children}</span>
    </div>
  );
}

export function MenuSeparator() {
  return <hr className="qx-menu-separator" />;
}
