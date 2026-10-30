import { ChevronDownIcon } from "@qeetrix/icons/icons/chevron-down";
import { Menu, MenuContent, MenuRadioGroup, MenuRadioItem, MenuTrigger } from "@qeetrix/react";
import { CopyButton } from "@qeetrix/react/experimental";
import { type ReactNode, useState } from "react";
import { Logo } from "@/platform/components/Logo";
import { install } from "../install";

/** Each package manager's install verb and mark; pnpm's mark has a drawing per scheme. */
const managers: { id: string; label: string; verb: string; logo: ReactNode }[] = [
  { id: "bun", label: "Bun", verb: "bun add", logo: <Logo name="bun" className="home-pm-logo" /> },
  {
    id: "pnpm",
    label: "pnpm",
    verb: "pnpm add",
    logo: (
      <>
        <Logo name="pnpm-light" className="home-pm-logo only-light" />
        <Logo name="pnpm-dark" className="home-pm-logo only-dark" />
      </>
    ),
  },
  {
    id: "npm",
    label: "npm",
    verb: "npm install",
    logo: <Logo name="npm" className="home-pm-logo" />,
  },
  {
    id: "yarn",
    label: "Yarn",
    verb: "yarn add",
    logo: <Logo name="yarn-mono" className="home-pm-logo home-pm-yarn" />,
  },
];

/** Today's hero command bar: a package-manager picker, the command, and Copy on its own segment. */
export default function InstallCommand() {
  const [id, setId] = useState("bun");
  const manager = managers.find((m) => m.id === id) ?? managers[0];
  const command = `${manager.verb} ${install.packages}`;

  return (
    <div className="home-install">
      <Menu>
        <MenuTrigger className="home-pm" aria-label={`Package manager: ${manager.label}`}>
          {manager.logo}
          <span className="home-pm-label">{manager.label}</span>
          <ChevronDownIcon size={16} aria-hidden className="home-pm-chevron" />
        </MenuTrigger>
        <MenuContent align="start">
          <MenuRadioGroup value={id} onValueChange={(value) => setId(String(value))}>
            {managers.map((m) => (
              <MenuRadioItem key={m.id} value={m.id}>
                <span className="home-pm-item">
                  {m.logo}
                  {m.label}
                </span>
              </MenuRadioItem>
            ))}
          </MenuRadioGroup>
        </MenuContent>
      </Menu>
      <code className="home-install-cmd">{command}</code>
      <span className="home-install-copy">
        <CopyButton value={command}>Copy</CopyButton>
      </span>
    </div>
  );
}
