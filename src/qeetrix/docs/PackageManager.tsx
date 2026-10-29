// The reader's package manager, chosen once in the page header and remembered: every install
// command on the page follows it. PmChoice is the chooser; PmCommand is one command.
import { Toggle, ToggleGroup } from "@qeetrix/react";
import { CopyButton } from "@qeetrix/react/experimental";
import { useEffect, useState } from "react";
import { Logo } from "@/platform/components/Logo";

type Pm = "bun" | "pnpm" | "npm" | "yarn";
const KEY = "qx-docs-pm";
const EVENT = "qx-docs-pm";
const managers: { id: Pm; label: string; verb: string }[] = [
  { id: "bun", label: "Bun", verb: "bun add" },
  { id: "pnpm", label: "pnpm", verb: "pnpm add" },
  { id: "npm", label: "npm", verb: "npm install" },
  { id: "yarn", label: "Yarn", verb: "yarn add" },
];

function usePm(): [Pm, (pm: Pm) => void] {
  const [pm, setPm] = useState<Pm>("bun");
  useEffect(() => {
    const saved = localStorage.getItem(KEY) as Pm | null;
    if (saved && managers.some((m) => m.id === saved)) setPm(saved);
    const on = (e: Event) => setPm((e as CustomEvent<Pm>).detail);
    addEventListener(EVENT, on);
    return () => removeEventListener(EVENT, on);
  }, []);
  const choose = (next: Pm) => {
    localStorage.setItem(KEY, next);
    dispatchEvent(new CustomEvent(EVENT, { detail: next }));
  };
  return [pm, choose];
}

function Mark({ id }: { id: Pm }) {
  if (id === "pnpm")
    return (
      <>
        <Logo name="pnpm-light" className="qd-pm-logo only-light" />
        <Logo name="pnpm-dark" className="qd-pm-logo only-dark" />
      </>
    );
  return (
    <Logo
      name={id === "yarn" ? "yarn-mono" : id}
      className={`qd-pm-logo${id === "yarn" ? " qd-pm-yarn" : ""}`}
    />
  );
}

export function PmChoice() {
  const [pm, choose] = usePm();
  return (
    <div className="qd-pm-choice">
      <span>Package manager</span>
      <ToggleGroup
        variant="segmented"
        size="sm"
        aria-label="Package manager for this page"
        value={[pm]}
        onValueChange={(v) => v[0] && choose(v[0] as Pm)}
      >
        {managers.map((m) => (
          <Toggle key={m.id} value={m.id}>
            <Mark id={m.id} />
            {m.label}
          </Toggle>
        ))}
      </ToggleGroup>
    </div>
  );
}

/** One install command. `peer` is added for Yarn, which doesn't install peers itself. */
export function PmCommand({ packages, peer }: { packages: string; peer?: string }) {
  const [pm, choose] = usePm();
  const manager = managers.find((m) => m.id === pm) ?? managers[0];
  const command = `${manager.verb} ${packages}${pm === "yarn" && peer ? ` ${peer}` : ""}`;
  return (
    <div className="qd-cmd">
      <div className="qd-cmd-bar" role="tablist" aria-label="Package manager">
        {managers.map((m) => (
          <button
            key={m.id}
            type="button"
            role="tab"
            aria-selected={m.id === pm}
            className="qd-cmd-tab"
            onClick={() => choose(m.id)}
          >
            <Mark id={m.id} />
            {m.label}
          </button>
        ))}
        <span className="qd-cmd-copy">
          <CopyButton value={command}>Copy</CopyButton>
        </span>
      </div>
      <pre className="qd-cmd-line">
        <code>
          <span className="qd-cmd-prompt" aria-hidden="true">
            $
          </span>
          {command}
        </code>
      </pre>
    </div>
  );
}
