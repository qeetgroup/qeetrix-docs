// Components › Toggle: its examples, the real Toggle with the code for each. Shared by the page
// (doc.tsx) and the island that runs them (Live.tsx), so a toggle presses: nothing here reads token
// data.
import { BellIcon } from "@qeetrix/icons/icons/bell";
import { BoldIcon } from "@qeetrix/icons/icons/bold";
import { ItalicIcon } from "@qeetrix/icons/icons/italic";
import { PinIcon } from "@qeetrix/icons/icons/pin";
import { StarIcon } from "@qeetrix/icons/icons/star";
import { UnderlineIcon } from "@qeetrix/icons/icons/underline";
import { Inline, Text, Toggle } from "@qeetrix/react";
import { useState } from "react";
import type { ExampleDoc } from "../types";

/** A toggle the page reads from: its state drives the line beside it. */
function Pinned() {
  const [pinned, setPinned] = useState(true);
  return (
    <Inline gap="md" align="center">
      <Toggle icon={PinIcon} filledWhenPressed pressed={pinned} onPressedChange={setPinned}>
        Pin to top
      </Toggle>
      <Text tone="subtle">
        {pinned
          ? "Acme Pvt Ltd stays at the top of the list."
          : "Acme Pvt Ltd sorts with the rest."}
      </Text>
    </Inline>
  );
}

export const examples: ExampleDoc[] = [
  {
    id: "states",
    title: "Off, on and disabled",
    line: "Pressed shows as a fill. An icon alone needs a name, which shows as its tooltip.",
    code: `<Inline gap="sm">
  <Toggle icon={BoldIcon} aria-label="Bold" />
  <Toggle icon={ItalicIcon} aria-label="Italic" defaultPressed />
  <Toggle icon={UnderlineIcon} aria-label="Underline" disabled />
  <Toggle icon={ItalicIcon} aria-label="Italic, locked" disabled defaultPressed />
</Inline>`,
    render: () => (
      <Inline gap="sm">
        <Toggle icon={BoldIcon} aria-label="Bold" />
        <Toggle icon={ItalicIcon} aria-label="Italic" defaultPressed />
        <Toggle icon={UnderlineIcon} aria-label="Underline" disabled />
        <Toggle icon={ItalicIcon} aria-label="Italic, locked" disabled defaultPressed />
      </Inline>
    ),
  },
  {
    id: "with-a-label",
    title: "With a label",
    line: "The icon leads its label. filledWhenPressed swaps to the icon's filled drawing.",
    code: `<Inline gap="sm">
  <Toggle icon={StarIcon} filledWhenPressed defaultPressed>Favourite</Toggle>
  <Toggle icon={BellIcon} filledWhenPressed>Notify me</Toggle>
  <Toggle>Show archived</Toggle>
</Inline>`,
    render: () => (
      <Inline gap="sm">
        <Toggle icon={StarIcon} filledWhenPressed defaultPressed>
          Favourite
        </Toggle>
        <Toggle icon={BellIcon} filledWhenPressed>
          Notify me
        </Toggle>
        <Toggle>Show archived</Toggle>
      </Inline>
    ),
  },
  {
    id: "sizes",
    title: "Sizes",
    line: "A control's height in the region's density; inside a group, the group's size wins.",
    code: `<Inline gap="sm" align="center">
  <Toggle size="sm" icon={BoldIcon} aria-label="Bold, small" defaultPressed />
  <Toggle size="md" icon={BoldIcon} aria-label="Bold, medium" defaultPressed />
  <Toggle size="lg" icon={BoldIcon} aria-label="Bold, large" defaultPressed />
</Inline>`,
    render: () => (
      <Inline gap="sm" align="center">
        <Toggle size="sm" icon={BoldIcon} aria-label="Bold, small" defaultPressed />
        <Toggle size="md" icon={BoldIcon} aria-label="Bold, medium" defaultPressed />
        <Toggle size="lg" icon={BoldIcon} aria-label="Bold, large" defaultPressed />
      </Inline>
    ),
  },
  {
    id: "tooltips",
    title: "Tooltips",
    line: "An icon-only toggle shows its name; tooltip adds a shortcut, tooltipSide moves it.",
    code: `<Inline gap="sm">
  <Toggle icon={BoldIcon} aria-label="Bold" tooltip="Bold (Ctrl+B)" tooltipSide="bottom" />
  <Toggle icon={ItalicIcon} aria-label="Italic" tooltip="Italic (Ctrl+I)" tooltipSide="bottom" />
  <Toggle icon={UnderlineIcon} aria-label="Underline" tooltip="Underline (Ctrl+U)" tooltipSide="bottom" />
</Inline>`,
    render: () => (
      <Inline gap="sm">
        <Toggle icon={BoldIcon} aria-label="Bold" tooltip="Bold (Ctrl+B)" tooltipSide="bottom" />
        <Toggle
          icon={ItalicIcon}
          aria-label="Italic"
          tooltip="Italic (Ctrl+I)"
          tooltipSide="bottom"
        />
        <Toggle
          icon={UnderlineIcon}
          aria-label="Underline"
          tooltip="Underline (Ctrl+U)"
          tooltipSide="bottom"
        />
      </Inline>
    ),
  },
  {
    id: "controlled",
    title: "Controlled",
    line: "pressed and onPressedChange: the page follows the toggle.",
    code: `const [pinned, setPinned] = useState(true);

<Inline gap="md" align="center">
  <Toggle icon={PinIcon} filledWhenPressed pressed={pinned} onPressedChange={setPinned}>
    Pin to top
  </Toggle>
  <Text tone="subtle">{pinned ? "Acme Pvt Ltd stays at the top of the list." : "Acme Pvt Ltd sorts with the rest."}</Text>
</Inline>`,
    render: () => <Pinned />,
  },
];
