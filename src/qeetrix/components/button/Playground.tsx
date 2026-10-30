// Components › Button › Playground, in the browser: the real Button beside a control for each of
// its props, and the code it takes, coloured as the build colours code, to copy. An island.
import { ArrowRightIcon } from "@qeetrix/icons/icons/arrow-right";
import { DownloadIcon } from "@qeetrix/icons/icons/download";
import { PlusIcon } from "@qeetrix/icons/icons/plus";
import { XIcon } from "@qeetrix/icons/icons/x";
import {
  Button,
  type ButtonTone,
  type ButtonVariant,
  mirrorInRtl,
  Switch,
  TextField,
} from "@qeetrix/react";
import { useState } from "react";
import Choice, { IconChoice } from "../PlaygroundChoice";
import PlaygroundCode, { element, importLine, type Piece } from "../PlaygroundCode";

const Next = mirrorInRtl(ArrowRightIcon);

/** The icons to try: none, or one of three, each as the code names it. */
const ICONS = {
  none: { icon: undefined, name: "", label: "No icon", Glyph: XIcon },
  plus: { icon: PlusIcon, name: "PlusIcon", label: "Plus", Glyph: PlusIcon },
  next: {
    icon: Next,
    name: "ArrowRightIcon",
    label: "Arrow, mirrored in right to left",
    Glyph: ArrowRightIcon,
  },
  download: { icon: DownloadIcon, name: "DownloadIcon", label: "Download", Glyph: DownloadIcon },
} as const;
type IconKey = keyof typeof ICONS;
type Size = "sm" | "md" | "lg";

interface Set {
  label: string;
  variant: ButtonVariant;
  tone: ButtonTone;
  size: Size;
  icon: IconKey;
  loading: boolean;
  disabled: boolean;
  fullWidth: boolean;
}

/** The code for the button as set, line by line, each piece tagged with its token. */
function codeOf(set: Set): Piece[][] {
  const chosen = ICONS[set.icon];
  const next = set.icon === "next";
  const lines: Piece[][] = [];
  if (chosen.name) lines.push(importLine([chosen.name], "@qeetrix/icons"));
  lines.push(importLine(next ? ["Button", "mirrorInRtl"] : ["Button"], "@qeetrix/react"));
  if (next) lines.push([], [["const"], [" Next"], [" ="], [" mirrorInRtl"], ["(ArrowRightIcon);"]]);
  const props: Array<[string, string?]> = [];
  if (set.variant !== "solid") props.push(["variant", `"${set.variant}"`]);
  if (set.tone !== "brand") props.push(["tone", `"${set.tone}"`]);
  if (set.size !== "md") props.push(["size", `"${set.size}"`]);
  if (chosen.name) props.push(["icon", `{${next ? "Next" : chosen.name}}`]);
  if (set.loading) props.push(["loading"]);
  if (set.disabled) props.push(["disabled"]);
  if (set.fullWidth) props.push(["fullWidth"]);
  lines.push([], ...element("Button", props, set.label));
  return lines;
}

export default function Playground() {
  const [label, setLabel] = useState("Invite users");
  const [variant, setVariant] = useState<ButtonVariant>("solid");
  const [tone, setTone] = useState<ButtonTone>("brand");
  const [size, setSize] = useState<Size>("md");
  const [icon, setIcon] = useState<IconKey>("plus");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [fullWidth, setFullWidth] = useState(false);
  const chosen = ICONS[icon];

  return (
    <div className="qc-play">
      <div className="qc-play-stage" data-full={fullWidth ? "" : undefined}>
        <Button
          variant={variant}
          tone={tone}
          size={size}
          icon={chosen.icon}
          loading={loading}
          disabled={disabled}
          fullWidth={fullWidth}
        >
          {label}
        </Button>
      </div>
      <div className="qc-play-controls">
        <TextField label="Label" value={label} onValueChange={setLabel} />
        <Choice
          label="Variant"
          value={variant}
          onChange={setVariant}
          options={[
            ["solid", "Solid"],
            ["soft", "Soft"],
            ["ghost", "Ghost"],
          ]}
        />
        <Choice
          label="Tone"
          value={tone}
          onChange={setTone}
          options={[
            ["brand", "Brand"],
            ["danger", "Danger"],
            ["neutral", "Neutral"],
          ]}
        />
        <Choice
          label="Size"
          value={size}
          onChange={setSize}
          options={[
            ["sm", "sm"],
            ["md", "md"],
            ["lg", "lg"],
          ]}
        />
        <IconChoice label="Icon" value={icon} onChange={setIcon} icons={ICONS} />
        <div className="qc-play-switches">
          <Switch label="Loading" checked={loading} onCheckedChange={setLoading} />
          <Switch label="Disabled" checked={disabled} onCheckedChange={setDisabled} />
          <Switch label="Full width" checked={fullWidth} onCheckedChange={setFullWidth} />
        </div>
      </div>
      <PlaygroundCode
        file="invite.tsx"
        lines={codeOf({ label, variant, tone, size, icon, loading, disabled, fullWidth })}
      />
    </div>
  );
}
