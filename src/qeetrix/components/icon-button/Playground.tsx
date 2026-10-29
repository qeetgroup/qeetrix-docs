// Components › Icon button › Playground, in the browser: the real IconButton beside a control for
// each of its props (its name and its tooltip too), and the code it takes, to copy. An island.
import { CopyIcon } from "@qeetrix/icons/icons/copy";
import { PencilIcon } from "@qeetrix/icons/icons/pencil";
import { SettingsIcon } from "@qeetrix/icons/icons/settings";
import { TrashIcon } from "@qeetrix/icons/icons/trash";
import { type ButtonTone, type ButtonVariant, IconButton, Switch, TextField } from "@qeetrix/react";
import { useState } from "react";
import Choice, { IconChoice } from "../PlaygroundChoice";
import PlaygroundCode, { element, importLine, type Piece } from "../PlaygroundCode";

const ICONS = {
  pencil: { icon: PencilIcon, name: "PencilIcon", label: "Pencil", Glyph: PencilIcon },
  settings: { icon: SettingsIcon, name: "SettingsIcon", label: "Settings", Glyph: SettingsIcon },
  copy: { icon: CopyIcon, name: "CopyIcon", label: "Copy", Glyph: CopyIcon },
  trash: { icon: TrashIcon, name: "TrashIcon", label: "Trash", Glyph: TrashIcon },
} as const;
type IconKey = keyof typeof ICONS;
type Size = "sm" | "md" | "lg";
type Tip = "name" | "text" | "off";
type Side = "top" | "bottom" | "left" | "right";

interface Set {
  name: string;
  icon: IconKey;
  variant: ButtonVariant;
  tone: ButtonTone;
  size: Size;
  tip: Tip;
  tipText: string;
  side: Side;
  loading: boolean;
  disabled: boolean;
}

/** The code for the icon button as set, each piece tagged with its token. */
function codeOf(set: Set): Piece[][] {
  const props: Array<[string, string?]> = [];
  if (set.variant !== "ghost") props.push(["variant", `"${set.variant}"`]);
  if (set.tone !== "brand") props.push(["tone", `"${set.tone}"`]);
  if (set.size !== "md") props.push(["size", `"${set.size}"`]);
  props.push(["icon", `{${ICONS[set.icon].name}}`], ["aria-label", `"${set.name}"`]);
  if (set.tip === "text") props.push(["tooltip", `"${set.tipText}"`]);
  if (set.tip === "off") props.push(["tooltip", "{false}"]);
  if (set.tip !== "off" && set.side !== "top") props.push(["tooltipSide", `"${set.side}"`]);
  if (set.loading) props.push(["loading"]);
  if (set.disabled) props.push(["disabled"]);
  return [
    importLine([ICONS[set.icon].name], "@qeetrix/icons"),
    importLine(["IconButton"], "@qeetrix/react"),
    [],
    ...element("IconButton", props),
  ];
}

export default function Playground() {
  const [set, setSet] = useState<Set>({
    name: "Edit user",
    icon: "pencil",
    variant: "ghost",
    tone: "brand",
    size: "md",
    tip: "name",
    tipText: "Edit Priya Sharma",
    side: "top",
    loading: false,
    disabled: false,
  });
  const change =
    <K extends keyof Set>(key: K) =>
    (value: Set[K]) =>
      setSet((current) => ({ ...current, [key]: value }));
  const tooltip = set.tip === "off" ? false : set.tip === "text" ? set.tipText : undefined;

  return (
    <div className="qc-play">
      <div className="qc-play-stage">
        <IconButton
          icon={ICONS[set.icon].icon}
          aria-label={set.name}
          variant={set.variant}
          tone={set.tone}
          size={set.size}
          tooltip={tooltip}
          tooltipSide={set.side}
          loading={set.loading}
          disabled={set.disabled}
        />
      </div>
      <div className="qc-play-controls">
        <TextField label="Name (aria-label)" value={set.name} onValueChange={change("name")} />
        <IconChoice label="Icon" value={set.icon} onChange={change("icon")} icons={ICONS} />
        <Choice
          label="Variant"
          value={set.variant}
          onChange={change("variant")}
          options={[
            ["ghost", "Ghost"],
            ["soft", "Soft"],
            ["solid", "Solid"],
          ]}
        />
        <Choice
          label="Tone"
          value={set.tone}
          onChange={change("tone")}
          options={[
            ["brand", "Brand"],
            ["danger", "Danger"],
            ["neutral", "Neutral"],
          ]}
        />
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
        <Choice
          label="Tooltip"
          value={set.tip}
          onChange={change("tip")}
          options={[
            ["name", "Its name"],
            ["text", "Other text"],
            ["off", "Off"],
          ]}
        />
        {set.tip === "text" && (
          <TextField label="Tooltip text" value={set.tipText} onValueChange={change("tipText")} />
        )}
        {set.tip !== "off" && (
          <Choice
            label="Tooltip side"
            value={set.side}
            onChange={change("side")}
            options={[
              ["top", "Top"],
              ["bottom", "Bottom"],
              ["left", "Left"],
              ["right", "Right"],
            ]}
          />
        )}
        <div className="qc-play-switches">
          <Switch label="Loading" checked={set.loading} onCheckedChange={change("loading")} />
          <Switch label="Disabled" checked={set.disabled} onCheckedChange={change("disabled")} />
        </div>
      </div>
      <PlaygroundCode file="edit-user.tsx" lines={codeOf(set)} />
    </div>
  );
}
