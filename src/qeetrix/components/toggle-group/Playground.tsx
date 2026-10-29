// Components › Toggle group › Playground, in the browser: the real ToggleGroup beside a control for
// each of its props, and the code it takes, to copy. An island.
import { BoldIcon } from "@qeetrix/icons/icons/bold";
import { ItalicIcon } from "@qeetrix/icons/icons/italic";
import { UnderlineIcon } from "@qeetrix/icons/icons/underline";
import { Switch, Toggle, ToggleGroup } from "@qeetrix/react";
import { useState } from "react";
import Choice from "../PlaygroundChoice";
import PlaygroundCode, {
  element,
  importLine,
  indent,
  opening,
  type Piece,
} from "../PlaygroundCode";

type Size = "sm" | "md" | "lg";
type Content = "words" | "icons";

const WORDS = [
  ["7d", "7 days"],
  ["30d", "30 days"],
  ["90d", "90 days"],
] as const;
const TOOLS = [
  ["bold", "Bold", BoldIcon, "BoldIcon"],
  ["italic", "Italic", ItalicIcon, "ItalicIcon"],
  ["underline", "Underline", UnderlineIcon, "UnderlineIcon"],
] as const;

interface Set {
  content: Content;
  variant: "segmented" | "separate";
  multiple: boolean;
  size: Size;
  orientation: "horizontal" | "vertical";
  disabled: boolean;
}

function codeOf(set: Set): Piece[][] {
  const props: Array<[string, string?]> = [];
  if (set.variant !== "segmented") props.push(["variant", `"${set.variant}"`]);
  if (set.multiple) props.push(["multiple"]);
  if (set.size !== "md") props.push(["size", `"${set.size}"`]);
  if (set.orientation !== "horizontal") props.push(["orientation", `"${set.orientation}"`]);
  if (set.disabled) props.push(["disabled"]);
  if (!set.multiple)
    props.push(["defaultValue", set.content === "words" ? '{["30d"]}' : '{["bold"]}']);
  props.push(["aria-label", set.content === "words" ? '"Period"' : '"Formatting"']);
  const toggles: Piece[][] =
    set.content === "words"
      ? WORDS.flatMap(([value, label]) => element("Toggle", [["value", `"${value}"`]], label))
      : TOOLS.flatMap(([value, label, , name]) =>
          element("Toggle", [
            ["value", `"${value}"`],
            ["icon", `{${name}}`],
            ["aria-label", `"${label}"`],
          ]),
        );
  const lines: Piece[][] = [];
  if (set.content === "icons")
    lines.push(
      importLine(
        TOOLS.map(([, , , name]) => name),
        "@qeetrix/icons",
      ),
    );
  lines.push(importLine(["Toggle", "ToggleGroup"], "@qeetrix/react"), []);
  lines.push(...opening("ToggleGroup", props), ...indent(toggles), [
    ["</"],
    ["ToggleGroup"],
    [">"],
  ]);
  return lines;
}

export default function Playground() {
  const [set, setSet] = useState<Set>({
    content: "words",
    variant: "segmented",
    multiple: false,
    size: "md",
    orientation: "horizontal",
    disabled: false,
  });
  const change =
    <K extends keyof Set>(key: K) =>
    (value: Set[K]) =>
      setSet((current) => ({ ...current, [key]: value }));

  return (
    <div className="qc-play">
      <div className="qc-play-stage">
        <ToggleGroup
          key={`${set.content}-${set.multiple}`}
          variant={set.variant}
          multiple={set.multiple}
          size={set.size}
          orientation={set.orientation}
          disabled={set.disabled}
          defaultValue={set.multiple ? [] : [set.content === "words" ? "30d" : "bold"]}
          aria-label={set.content === "words" ? "Period" : "Formatting"}
        >
          {set.content === "words"
            ? WORDS.map(([value, label]) => (
                <Toggle key={value} value={value}>
                  {label}
                </Toggle>
              ))
            : TOOLS.map(([value, label, Icon]) => (
                <Toggle key={value} value={value} icon={Icon} aria-label={label} />
              ))}
        </ToggleGroup>
      </div>
      <div className="qc-play-controls">
        <Choice
          label="Content"
          value={set.content}
          onChange={change("content")}
          options={[
            ["words", "Words"],
            ["icons", "Icons"],
          ]}
        />
        <Choice
          label="Variant"
          value={set.variant}
          onChange={change("variant")}
          options={[
            ["segmented", "Segmented"],
            ["separate", "Separate"],
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
          label="Orientation"
          value={set.orientation}
          onChange={change("orientation")}
          options={[
            ["horizontal", "Horizontal"],
            ["vertical", "Vertical"],
          ]}
        />
        <div className="qc-play-switches">
          <Switch
            label="Several at once"
            checked={set.multiple}
            onCheckedChange={change("multiple")}
          />
          <Switch label="Disabled" checked={set.disabled} onCheckedChange={change("disabled")} />
        </div>
      </div>
      <PlaygroundCode file="period.tsx" lines={codeOf(set)} />
    </div>
  );
}
