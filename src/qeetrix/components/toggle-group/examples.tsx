// Components › Toggle group: its examples, the real ToggleGroup with the code for each. Shared by
// the page (doc.tsx) and the island that runs them (Live.tsx), so a group presses and its arrow
// keys move: nothing here reads token data.
import { BoldIcon } from "@qeetrix/icons/icons/bold";
import { ItalicIcon } from "@qeetrix/icons/icons/italic";
import { LayoutGridIcon } from "@qeetrix/icons/icons/layout-grid";
import { ListIcon } from "@qeetrix/icons/icons/list";
import { TextAlignCenterIcon } from "@qeetrix/icons/icons/text-align-center";
import { TextAlignEndIcon } from "@qeetrix/icons/icons/text-align-end";
import { TextAlignStartIcon } from "@qeetrix/icons/icons/text-align-start";
import { UnderlineIcon } from "@qeetrix/icons/icons/underline";
import { Inline, Separator, Stack, Text, Toggle, ToggleGroup } from "@qeetrix/react";
import { useState } from "react";
import type { ExampleDoc } from "../types";

/** One view among a few, read by the page. */
function Period() {
  const [period, setPeriod] = useState(["30d"]);
  const days = { "7d": 7, "30d": 30, "90d": 90 }[period[0] ?? "30d"];
  return (
    <Stack gap="sm" align="start">
      <ToggleGroup
        value={period}
        onValueChange={(next) => next.length && setPeriod(next)}
        aria-label="Sign-in activity period"
      >
        <Toggle value="7d">7 days</Toggle>
        <Toggle value="30d">30 days</Toggle>
        <Toggle value="90d">90 days</Toggle>
      </ToggleGroup>
      <Text tone="subtle">Sign-ins over the last {days} days.</Text>
    </Stack>
  );
}

export const examples: ExampleDoc[] = [
  {
    id: "segmented",
    title: "One view among a few",
    line: "segmented, the default: one joined control, one choice. Arrow keys move between them.",
    code: `<ToggleGroup defaultValue={["grid"]} aria-label="Members view">
  <Toggle value="grid" icon={LayoutGridIcon} filledWhenPressed>Grid</Toggle>
  <Toggle value="list" icon={ListIcon}>List</Toggle>
</ToggleGroup>`,
    render: () => (
      <ToggleGroup defaultValue={["grid"]} aria-label="Members view">
        <Toggle value="grid" icon={LayoutGridIcon} filledWhenPressed>
          Grid
        </Toggle>
        <Toggle value="list" icon={ListIcon}>
          List
        </Toggle>
      </ToggleGroup>
    ),
  },
  {
    id: "controlled",
    title: "Controlled",
    line: "value and onValueChange: keep one pressed, and let the page follow it.",
    code: `const [period, setPeriod] = useState(["30d"]);

<ToggleGroup value={period} onValueChange={(next) => next.length && setPeriod(next)} aria-label="Sign-in activity period">
  <Toggle value="7d">7 days</Toggle>
  <Toggle value="30d">30 days</Toggle>
  <Toggle value="90d">90 days</Toggle>
</ToggleGroup>`,
    render: () => <Period />,
  },
  {
    id: "several-at-once",
    title: "Several at once",
    line: "separate and multiple: a set of tools, each on or off.",
    code: `<ToggleGroup variant="separate" multiple size="sm" aria-label="Formatting">
  <Toggle value="bold" icon={BoldIcon} aria-label="Bold" tooltip="Bold (Ctrl+B)" />
  <Toggle value="italic" icon={ItalicIcon} aria-label="Italic" tooltip="Italic (Ctrl+I)" />
  <Toggle value="underline" icon={UnderlineIcon} aria-label="Underline" tooltip="Underline (Ctrl+U)" />
</ToggleGroup>`,
    render: () => (
      <ToggleGroup variant="separate" multiple size="sm" aria-label="Formatting">
        <Toggle value="bold" icon={BoldIcon} aria-label="Bold" tooltip="Bold (Ctrl+B)" />
        <Toggle value="italic" icon={ItalicIcon} aria-label="Italic" tooltip="Italic (Ctrl+I)" />
        <Toggle
          value="underline"
          icon={UnderlineIcon}
          aria-label="Underline"
          tooltip="Underline (Ctrl+U)"
        />
      </ToggleGroup>
    ),
  },
  {
    id: "in-a-toolbar",
    title: "In a toolbar",
    line: "Tools beside a choice, split by a rule.",
    code: `<Inline gap="md" align="center">
  <ToggleGroup variant="separate" multiple size="sm" aria-label="Formatting">
    <Toggle value="bold" icon={BoldIcon} aria-label="Bold" tooltipSide="bottom" />
    <Toggle value="italic" icon={ItalicIcon} aria-label="Italic" tooltipSide="bottom" />
    <Toggle value="underline" icon={UnderlineIcon} aria-label="Underline" tooltipSide="bottom" />
  </ToggleGroup>
  <Separator orientation="vertical" />
  <ToggleGroup size="sm" defaultValue={["start"]} aria-label="Text alignment">
    <Toggle value="start" icon={TextAlignStartIcon} aria-label="Align start" tooltipSide="bottom" />
    <Toggle value="center" icon={TextAlignCenterIcon} aria-label="Align centre" tooltipSide="bottom" />
    <Toggle value="end" icon={TextAlignEndIcon} aria-label="Align end" tooltipSide="bottom" />
  </ToggleGroup>
</Inline>`,
    render: () => (
      <div className="qc-toolbar-demo">
        <Inline gap="md" align="center">
          <ToggleGroup variant="separate" multiple size="sm" aria-label="Formatting">
            <Toggle value="bold" icon={BoldIcon} aria-label="Bold" tooltipSide="bottom" />
            <Toggle value="italic" icon={ItalicIcon} aria-label="Italic" tooltipSide="bottom" />
            <Toggle
              value="underline"
              icon={UnderlineIcon}
              aria-label="Underline"
              tooltipSide="bottom"
            />
          </ToggleGroup>
          <Separator orientation="vertical" />
          <ToggleGroup size="sm" defaultValue={["start"]} aria-label="Text alignment">
            <Toggle
              value="start"
              icon={TextAlignStartIcon}
              aria-label="Align start"
              tooltipSide="bottom"
            />
            <Toggle
              value="center"
              icon={TextAlignCenterIcon}
              aria-label="Align centre"
              tooltipSide="bottom"
            />
            <Toggle
              value="end"
              icon={TextAlignEndIcon}
              aria-label="Align end"
              tooltipSide="bottom"
            />
          </ToggleGroup>
        </Inline>
      </div>
    ),
  },
  {
    id: "vertical",
    title: "Vertical",
    line: 'orientation="vertical": stacked, and the up and down arrows move.',
    code: `<ToggleGroup orientation="vertical" defaultValue={["name"]} aria-label="Sort by">
  <Toggle value="name">Name</Toggle>
  <Toggle value="last-sign-in">Last sign-in</Toggle>
  <Toggle value="created">Created</Toggle>
</ToggleGroup>`,
    render: () => (
      <ToggleGroup orientation="vertical" defaultValue={["name"]} aria-label="Sort by">
        <Toggle value="name">Name</Toggle>
        <Toggle value="last-sign-in">Last sign-in</Toggle>
        <Toggle value="created">Created</Toggle>
      </ToggleGroup>
    ),
  },
];
