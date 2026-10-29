// Components › Tooltip: its examples, the real Tooltip with the code for each. Shared by the page
// (doc.tsx) and the island that runs them (Live.tsx): nothing here reads token data.
import { BoldIcon } from "@qeetrix/icons/icons/bold";
import { DownloadIcon } from "@qeetrix/icons/icons/download";
import { ItalicIcon } from "@qeetrix/icons/icons/italic";
import { UnderlineIcon } from "@qeetrix/icons/icons/underline";
import { Button, IconButton, Inline, Tooltip, TooltipProvider } from "@qeetrix/react";
import type { ExampleDoc } from "../types";

export const examples: ExampleDoc[] = [
  {
    id: "a-short-label",
    title: "A short label",
    line: "Around one control: after 500ms of hover, or at once on keyboard focus. Never on touch.",
    code: `<Tooltip content="Download INV-2026-0042 (PDF)">
  <IconButton icon={DownloadIcon} aria-label="Download invoice" tooltip={false} />
</Tooltip>`,
    render: () => (
      <Tooltip content="Download INV-2026-0042 (PDF)">
        <IconButton icon={DownloadIcon} aria-label="Download invoice" tooltip={false} />
      </Tooltip>
    ),
  },
  {
    id: "sides",
    title: "Sides",
    line: "side, align and sideOffset; top by default, flipped when there's no room.",
    code: `<Tooltip content="Opens below" side="bottom">
  <Button variant="soft">bottom</Button>
</Tooltip>`,
    render: () => (
      <Inline gap="md">
        {(["top", "right", "bottom", "left"] as const).map((side) => (
          <Tooltip key={side} content={`Opens ${side}`} side={side}>
            <Button variant="soft">{side}</Button>
          </Tooltip>
        ))}
      </Inline>
    ),
  },
  {
    id: "a-toolbar",
    title: "A toolbar",
    line: "TooltipProvider groups neighbours: once one is open, the next opens at once.",
    code: `<TooltipProvider>
  <Tooltip content="Bold (Ctrl+B)"><IconButton icon={BoldIcon} aria-label="Bold" tooltip={false} /></Tooltip>
  <Tooltip content="Italic (Ctrl+I)"><IconButton icon={ItalicIcon} aria-label="Italic" tooltip={false} /></Tooltip>
  <Tooltip content="Underline (Ctrl+U)"><IconButton icon={UnderlineIcon} aria-label="Underline" tooltip={false} /></Tooltip>
</TooltipProvider>`,
    render: () => (
      <TooltipProvider>
        <Inline gap="xs">
          <Tooltip content="Bold (Ctrl+B)">
            <IconButton icon={BoldIcon} aria-label="Bold" tone="neutral" tooltip={false} />
          </Tooltip>
          <Tooltip content="Italic (Ctrl+I)">
            <IconButton icon={ItalicIcon} aria-label="Italic" tone="neutral" tooltip={false} />
          </Tooltip>
          <Tooltip content="Underline (Ctrl+U)">
            <IconButton
              icon={UnderlineIcon}
              aria-label="Underline"
              tone="neutral"
              tooltip={false}
            />
          </Tooltip>
        </Inline>
      </TooltipProvider>
    ),
  },
  {
    id: "delay",
    title: "Delay",
    line: "delay and closeDelay, in ms: 0 for a dense tool where it should show at once.",
    code: `<Tooltip content="Shown at once" delay={0}>
  <Button variant="soft">No delay</Button>
</Tooltip>`,
    render: () => (
      <Inline gap="md">
        <Tooltip content="After 500ms">
          <Button variant="soft">Default</Button>
        </Tooltip>
        <Tooltip content="Shown at once" delay={0}>
          <Button variant="soft">No delay</Button>
        </Tooltip>
      </Inline>
    ),
  },
];
