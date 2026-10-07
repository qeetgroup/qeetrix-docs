"use client";

import {
  CopyButton,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@qeetrix/ui";
import Bun from "@thesvg/react/bun";
import Npm from "@thesvg/react/npm";
import Pnpm from "@thesvg/react/pnpm";
import Yarn from "@thesvg/react/yarn";
import { useState } from "react";

const logo = "size-4 shrink-0";

/** Each package manager's install verb and mark. pnpm's mark has a variant per theme. */
const managers = [
  {
    id: "bun",
    label: "Bun",
    verb: "bun add",
    logo: <Bun aria-hidden className={logo} />,
  },
  {
    id: "pnpm",
    label: "pnpm",
    verb: "pnpm add",
    logo: (
      <>
        <Pnpm variant="light" aria-hidden className={`${logo} dark:hidden`} />
        <Pnpm
          variant="dark"
          aria-hidden
          className={`${logo} hidden dark:block`}
        />
      </>
    ),
  },
  {
    id: "npm",
    label: "npm",
    verb: "npm install",
    logo: <Npm aria-hidden className={logo} />,
  },
  {
    id: "yarn",
    label: "Yarn",
    verb: "yarn add",
    // thesvg's default Yarn drawing relies on a stylesheet it strips, so it paints solid; the mono
    // drawing has the cat cut out and takes Yarn's brand blue.
    logo: (
      <Yarn variant="mono" aria-hidden className={`${logo} text-[#2C8EBB]`} />
    ),
  },
] as const;

type Manager = (typeof managers)[number];

function ManagerLabel({
  manager,
  compact,
}: {
  manager: Manager;
  compact?: boolean;
}) {
  return (
    <span className="flex items-center gap-2">
      {manager.logo}
      <span className={compact ? "hidden sm:inline" : undefined}>
        {manager.label}
      </span>
    </span>
  );
}

/**
 * The hero's command bar: a package-manager picker, the command as code, and the library's
 * CopyButton on its own segment, copying whichever command is showing. The picker shows only the mark on
 * phones, so the command keeps the room.
 */
export function InstallCommand({ packages }: { packages: string }) {
  const [manager, setManager] = useState<Manager>(managers[0]);
  const command = `${manager.verb} ${packages}`;

  return (
    <div className="flex h-12 w-full max-w-xl items-center overflow-hidden rounded-lg border border-border bg-card shadow-rest">
      <Select
        value={manager.id}
        onValueChange={(value) => {
          const next = managers.find((m) => m.id === value);
          if (next) setManager(next);
        }}
      >
        <SelectTrigger
          aria-label="Package manager"
          className="h-full shrink-0 gap-2 rounded-none border-0 border-e border-border-subtle bg-transparent ps-3 pe-2 text-label shadow-none hover:bg-surface-interactive data-[size=default]:h-full sm:ps-4 sm:pe-3"
        >
          <SelectValue>
            {(value: string) => {
              const selected = managers.find((m) => m.id === value);
              return selected ? (
                <ManagerLabel manager={selected} compact />
              ) : null;
            }}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {managers.map((item) => (
            <SelectItem key={item.id} value={item.id}>
              <ManagerLabel manager={item} />
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {/* Phones scroll the command rather than cut it off; the copy button always copies it whole. */}
      <code className="no-scrollbar min-w-0 flex-1 overflow-x-auto px-3 text-start font-mono text-caption whitespace-nowrap text-foreground sm:truncate sm:px-4 sm:text-code">
        {command}
      </code>
      {/* The copy control sits on its own segment, divided from the command. */}
      <span className="flex h-full shrink-0 items-center border-s border-border-subtle px-1.5">
        <CopyButton value={command} variant="ghost" />
      </span>
    </div>
  );
}
