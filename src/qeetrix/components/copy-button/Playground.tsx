// Components › Copy button › Playground, in the browser: the real CopyButton beside a control for
// each of its props, and the code it takes, to copy. It really copies. An island.
import { type ButtonTone, type ButtonVariant, Switch, TextField } from "@qeetrix/react";
import { CopyButton } from "@qeetrix/react/experimental";
import { useState } from "react";
import Choice from "../PlaygroundChoice";
import PlaygroundCode, { element, importLine, type Piece } from "../PlaygroundCode";

type Size = "sm" | "md" | "lg";

interface Set {
  value: string;
  label: string;
  text: string;
  variant: ButtonVariant;
  tone: ButtonTone;
  size: Size;
  disabled: boolean;
}

function codeOf(set: Set): Piece[][] {
  const props: Array<[string, string?]> = [["value", `"${set.value}"`]];
  if (set.label) props.push(["label", `"${set.label}"`]);
  if (set.variant !== "ghost") props.push(["variant", `"${set.variant}"`]);
  if (set.tone !== "neutral") props.push(["tone", `"${set.tone}"`]);
  if (set.size !== "md") props.push(["size", `"${set.size}"`]);
  if (set.disabled) props.push(["disabled"]);
  return [
    importLine(["CopyButton"], "@qeetrix/react/experimental"),
    [],
    ...element("CopyButton", props, set.text || undefined),
  ];
}

export default function Playground() {
  const [set, setSet] = useState<Set>({
    value: "qid_app_01J9ZK4T7B2R",
    label: "Copy client ID",
    text: "",
    variant: "ghost",
    tone: "neutral",
    size: "md",
    disabled: false,
  });
  const change =
    <K extends keyof Set>(key: K) =>
    (value: Set[K]) =>
      setSet((current) => ({ ...current, [key]: value }));

  return (
    <div className="qc-play">
      <div className="qc-play-stage">
        <CopyButton
          value={set.value}
          label={set.label || undefined}
          variant={set.variant}
          tone={set.tone}
          size={set.size}
          disabled={set.disabled}
        >
          {set.text || undefined}
        </CopyButton>
      </div>
      <div className="qc-play-controls">
        <TextField label="Value" value={set.value} onValueChange={change("value")} />
        <TextField label="Name (label)" value={set.label} onValueChange={change("label")} />
        <TextField
          label="Visible label (empty: icon only)"
          value={set.text}
          onValueChange={change("text")}
        />
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
            ["neutral", "Neutral"],
            ["brand", "Brand"],
            ["danger", "Danger"],
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
        <div className="qc-play-switches">
          <Switch label="Disabled" checked={set.disabled} onCheckedChange={change("disabled")} />
        </div>
      </div>
      <PlaygroundCode file="client-id.tsx" lines={codeOf(set)} />
    </div>
  );
}
