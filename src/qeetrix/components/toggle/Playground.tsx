// Components › Toggle › Playground, in the browser: the real Toggle beside a control for each of its
// props, and the code it takes, to copy. An island.
import { BoldIcon } from "@qeetrix/icons/icons/bold";
import { PinIcon } from "@qeetrix/icons/icons/pin";
import { StarIcon } from "@qeetrix/icons/icons/star";
import { XIcon } from "@qeetrix/icons/icons/x";
import { Switch, TextField, Toggle } from "@qeetrix/react";
import { useState } from "react";
import Choice, { IconChoice } from "../PlaygroundChoice";
import PlaygroundCode, { element, importLine, type Piece } from "../PlaygroundCode";

const ICONS = {
  none: { icon: undefined, name: "", label: "No icon", Glyph: XIcon },
  star: { icon: StarIcon, name: "StarIcon", label: "Star", Glyph: StarIcon },
  pin: { icon: PinIcon, name: "PinIcon", label: "Pin", Glyph: PinIcon },
  bold: { icon: BoldIcon, name: "BoldIcon", label: "Bold", Glyph: BoldIcon },
} as const;
type IconKey = keyof typeof ICONS;
type Size = "sm" | "md" | "lg";
type Side = "top" | "bottom";

interface Set {
  label: string;
  name: string;
  icon: IconKey;
  filled: boolean;
  size: Size;
  side: Side;
  pressed: boolean;
  disabled: boolean;
}

function codeOf(set: Set): Piece[][] {
  const chosen = ICONS[set.icon];
  const iconOnly = chosen.name !== "" && set.label === "";
  const props: Array<[string, string?]> = [];
  if (set.size !== "md") props.push(["size", `"${set.size}"`]);
  if (chosen.name) props.push(["icon", `{${chosen.name}}`]);
  if (chosen.name && set.filled) props.push(["filledWhenPressed"]);
  if (iconOnly) props.push(["aria-label", `"${set.name}"`]);
  if (iconOnly && set.side !== "top") props.push(["tooltipSide", `"${set.side}"`]);
  if (set.pressed) props.push(["defaultPressed"]);
  if (set.disabled) props.push(["disabled"]);
  const lines: Piece[][] = [];
  if (chosen.name) lines.push(importLine([chosen.name], "@qeetrix/icons"));
  lines.push(
    importLine(["Toggle"], "@qeetrix/react"),
    [],
    ...element("Toggle", props, iconOnly ? undefined : set.label || "Label"),
  );
  return lines;
}

export default function Playground() {
  const [set, setSet] = useState<Set>({
    label: "Favourite",
    name: "Favourite",
    icon: "star",
    filled: true,
    size: "md",
    side: "top",
    pressed: true,
    disabled: false,
  });
  const change =
    <K extends keyof Set>(key: K) =>
    (value: Set[K]) =>
      setSet((current) => ({ ...current, [key]: value }));
  const chosen = ICONS[set.icon];
  const iconOnly = chosen.name !== "" && set.label === "";

  return (
    <div className="qc-play">
      <div className="qc-play-stage">
        <Toggle
          key={`${set.icon}-${set.label === ""}`}
          size={set.size}
          icon={chosen.icon}
          filledWhenPressed={set.filled}
          aria-label={iconOnly ? set.name : undefined}
          tooltipSide={set.side}
          pressed={set.pressed}
          onPressedChange={change("pressed")}
          disabled={set.disabled}
        >
          {iconOnly ? undefined : set.label || "Label"}
        </Toggle>
      </div>
      <div className="qc-play-controls">
        <TextField
          label="Label (empty: icon only)"
          value={set.label}
          onValueChange={change("label")}
        />
        {iconOnly && (
          <TextField label="Name (aria-label)" value={set.name} onValueChange={change("name")} />
        )}
        <IconChoice label="Icon" value={set.icon} onChange={change("icon")} icons={ICONS} />
        <Choice
          label="Size"
          value={set.size}
          onChange={change("size")}
          options={[
            ["sm", "sm"],
            ["md", "md"],
            ["lg", "lg"],
          ]}
        />
        {iconOnly && (
          <Choice
            label="Tooltip side"
            value={set.side}
            onChange={change("side")}
            options={[
              ["top", "Top"],
              ["bottom", "Bottom"],
            ]}
          />
        )}
        <div className="qc-play-switches">
          <Switch label="Pressed" checked={set.pressed} onCheckedChange={change("pressed")} />
          <Switch
            label="Filled when pressed"
            checked={set.filled}
            onCheckedChange={change("filled")}
            disabled={!chosen.name}
          />
          <Switch label="Disabled" checked={set.disabled} onCheckedChange={change("disabled")} />
        </div>
      </div>
      <PlaygroundCode file="favourite.tsx" lines={codeOf(set)} />
    </div>
  );
}
