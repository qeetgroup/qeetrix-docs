import { Separator } from "@qeetrix/ui";

const sessions = [
  { id: "s1", device: "MacBook Pro · Safari", place: "Bengaluru" },
  { id: "s2", device: "iPhone 15 · Qeet ID app", place: "Bengaluru" },
  { id: "s3", device: "Windows · Chrome", place: "Pune" },
];

const keys = [
  { id: "k1", name: "Northwind POS", prefix: "qk_live_7HC2" },
  { id: "k2", name: "Payroll sync", prefix: "qk_live_VBQ4" },
];

/**
 * `variant="muted"` is one step quieter: it divides items inside a section, while the default
 * rule divides the sections themselves.
 */
export default function SeparatorMuted() {
  return (
    <div className="flex w-80 flex-col gap-3">
      <div className="flex flex-col">
        <p className="pb-2 text-sm font-medium">Active sessions</p>
        {sessions.map((session, index) => (
          <div key={session.id}>
            {index > 0 && <Separator variant="muted" />}
            <div className="flex justify-between gap-3 py-2 text-sm">
              <span>{session.device}</span>
              <span className="text-muted-foreground">{session.place}</span>
            </div>
          </div>
        ))}
      </div>
      <Separator />
      <div className="flex flex-col">
        <p className="pb-2 text-sm font-medium">API keys</p>
        {keys.map((key, index) => (
          <div key={key.id}>
            {index > 0 && <Separator variant="muted" />}
            <div className="flex justify-between gap-3 py-2 text-sm">
              <span>{key.name}</span>
              <span className="font-mono text-caption text-muted-foreground">
                {key.prefix}…
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
