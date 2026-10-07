import { Kbd, KbdGroup } from "@qeetrix/ui";

/**
 * One `Kbd` per key, combined with `KbdGroup`. Give symbol keys a spoken `label` (⌘ is
 * "Command"); keys that are already words need none.
 */
export default function KbdDefault() {
  return (
    <div className="flex flex-wrap items-center gap-6 text-label">
      <KbdGroup>
        <Kbd label="Command">⌘</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <Kbd>Shift</Kbd>
        <Kbd>P</Kbd>
      </KbdGroup>
      <Kbd label="Enter">↵</Kbd>
      <Kbd>Esc</Kbd>
    </div>
  );
}
