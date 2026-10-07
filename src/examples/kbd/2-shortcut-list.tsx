import { Kbd, KbdGroup } from "@qeetrix/ui";

const shortcuts = [
  { action: "Search users", keys: [{ key: "/" }] },
  {
    action: "Open command menu",
    keys: [{ key: "⌘", label: "Command" }, { key: "K" }],
  },
  {
    action: "Save changes",
    keys: [{ key: "⌘", label: "Command" }, { key: "S" }],
  },
  {
    action: "Revoke selected sessions",
    keys: [{ key: "Shift" }, { key: "⌫", label: "Backspace" }],
  },
];

/** The cap is drawn from its own text colour, so it reads on cards, menus and buttons alike. */
export default function KbdShortcutList() {
  return (
    <dl className="w-80 divide-y divide-border rounded-lg border border-border bg-card text-label">
      {shortcuts.map((shortcut) => (
        <div
          key={shortcut.action}
          className="flex items-center justify-between gap-4 px-4 py-2.5"
        >
          <dt>{shortcut.action}</dt>
          <dd>
            <KbdGroup>
              {shortcut.keys.map((key) => (
                <Kbd key={key.key} label={key.label}>
                  {key.key}
                </Kbd>
              ))}
            </KbdGroup>
          </dd>
        </div>
      ))}
    </dl>
  );
}
