// Components › Command palette, drawn still: its markup and classes as the palette renders them
// (experimental/command-palette.js), open, for the anatomy and the do-and-don'ts. The palette itself
// is a dialog over the page, opened only in the browser.
import { SearchIcon } from "@qeetrix/icons/icons/search";
import type { QeetrixIcon } from "@qeetrix/react";

export interface StillItem {
  label: string;
  description?: string;
  meta?: string;
  icon?: QeetrixIcon;
}

export default function Still({
  query,
  groups,
  footer = true,
}: {
  query: string;
  groups: Array<{ label?: string; items: StillItem[] }>;
  footer?: boolean;
}) {
  return (
    <div className="qx-command qc-still-palette" data-slot="command-palette">
      <div className="qx-command-search">
        <SearchIcon size={16} className="qx-command-search-icon" aria-hidden />
        <span className="qx-command-input">{query}</span>
      </div>
      <div className="qx-command-list" data-slot="command-list">
        {groups.map((group, at) => (
          <div key={group.label ?? at} className="qx-command-group">
            {group.label && <div className="qx-command-group-label">{group.label}</div>}
            {group.items.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="qx-command-item"
                  data-slot="command-item"
                  data-highlighted={at === 0 && index === 0 ? "" : undefined}
                >
                  {Icon && (
                    <span className="qx-command-item-leading" data-slot="command-item-leading">
                      <Icon size={16} className="qx-command-item-icon" aria-hidden />
                    </span>
                  )}
                  <span className="qx-command-body">
                    <span className="qx-command-text">
                      <span className="qx-command-label">{item.label}</span>
                      {item.description && (
                        <span className="qx-command-description">{item.description}</span>
                      )}
                    </span>
                    {item.meta && (
                      <span className="qx-command-meta" data-slot="command-item-meta">
                        {item.meta}
                      </span>
                    )}
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      {footer && (
        <div className="qx-command-footer" aria-hidden>
          <span>
            <kbd className="qx-command-key">↑</kbd>
            <kbd className="qx-command-key">↓</kbd> to move
          </span>
          <span>
            <kbd className="qx-command-key">↵</kbd> to open
          </span>
          <span>
            <kbd className="qx-command-key">Esc</kbd> to close
          </span>
        </div>
      )}
    </div>
  );
}
