// A playground from a spec, in the browser: a component's controls (text, a choice, a switch, a
// number), the component drawn from their values, and the code it takes, coloured and copied
// (PlaygroundCode). A component's Playground.tsx is its spec; this is the rest. An island.
import { Switch, TextField } from "@qeetrix/react";
import { type ReactNode, useState } from "react";
import Choice from "./PlaygroundChoice";
import PlaygroundCode, { element, importLine, indent, opening, type Piece } from "./PlaygroundCode";

type Value = string | boolean;
export type Values = Record<string, Value>;

/**
 * One control. `omit` is the value the code leaves out (the library's default); `code` writes the
 * prop another way, or `null` to leave it out; `when` shows the control only while it's true.
 */
export type Control = {
  prop: string;
  label: string;
  omit?: Value;
  code?: (value: Value, values: Values) => [string, string?] | null;
  when?: (values: Values) => boolean;
} & (
  | { kind: "text"; initial: string }
  | { kind: "number"; initial: string }
  | { kind: "choice"; initial: string; options: Array<[string, string]> }
  | { kind: "switch"; initial: boolean }
);

export interface Spec {
  /** The file name over the code. */
  file: string;
  /** What the code imports, module by module: an icon's import only while it's shown. */
  imports:
    | Array<[names: string[], module: string]>
    | ((values: Values) => Array<[names: string[], module: string]>);
  /** The element the code writes. */
  component: string;
  controls: Control[];
  /** The component, drawn from the values. */
  render: (values: Values) => ReactNode;
  /** Its children in the code, if any. */
  children?: (values: Values) => string | undefined;
  /** A wrapper in the code, such as a Field that labels it. */
  wrap?: (values: Values) => { component: string; props: Array<[string, string?]> } | undefined;
  /** Props the code always writes, before the controls'. */
  fixed?: (values: Values) => Array<[string, string?]>;
  /** Props the code always writes, after the controls'. */
  after?: (values: Values) => Array<[string, string?]>;
  /** The stage holds a field: give it a field's width. */
  field?: boolean;
  /** Lines between the imports and the element: the data it takes, as `const items = […];`. */
  preamble?: string[] | ((values: Values) => string[]);
  /** Its children in the code, as elements: a group's options. */
  inner?: (values: Values) => Piece[][];
}

const quote = (value: string) => `"${value.replaceAll('"', '\\"')}"`;

/** The prop a control writes into the code, or null when it's left out. */
function propOf(control: Control, values: Values): [string, string?] | null {
  const value = values[control.prop] ?? control.initial;
  if (control.when && !control.when(values)) return null;
  if (control.code) return control.code(value, values);
  if (value === control.omit) return null;
  if (control.kind === "switch") return value ? [control.prop] : null;
  if (value === "") return null;
  if (control.kind === "number") return [control.prop, `{${value}}`];
  return [control.prop, quote(String(value))];
}

export function codeOf(spec: Spec, values: Values): Piece[][] {
  const props = [
    ...(spec.fixed?.(values) ?? []),
    ...spec.controls
      .map((control) => propOf(control, values))
      .filter((prop): prop is [string, string?] => prop !== null),
    ...(spec.after?.(values) ?? []),
  ];
  const inner = spec.inner?.(values);
  const body = inner
    ? [
        ...opening(spec.component, props),
        ...indent(inner),
        [["</"], [spec.component], [">"]] as Piece[],
      ]
    : element(spec.component, props, spec.children?.(values));
  const wrap = spec.wrap?.(values);
  const imports = typeof spec.imports === "function" ? spec.imports(values) : spec.imports;
  const lines: Piece[][] = imports.map(([names, module]) => importLine(names, module));
  lines.push([]);
  const preamble = typeof spec.preamble === "function" ? spec.preamble(values) : spec.preamble;
  if (preamble?.length) lines.push(...preamble.map((line): Piece[] => [[line]]), []);
  if (wrap)
    lines.push(...opening(wrap.component, wrap.props), ...indent(body), [
      ["</"],
      [wrap.component],
      [">"],
    ]);
  else lines.push(...body);
  return lines;
}

export default function PlaygroundKit({ spec }: { spec: Spec }) {
  const [values, setValues] = useState<Values>(() =>
    Object.fromEntries(spec.controls.map((control) => [control.prop, control.initial])),
  );
  const set = (prop: string) => (value: Value) =>
    setValues((current) => ({ ...current, [prop]: value }));
  const shown = spec.controls.filter((control) => !control.when || control.when(values));
  const switches = shown.filter((control) => control.kind === "switch");

  return (
    <div className="qc-play">
      <div className="qc-play-stage" data-field={spec.field ? "" : undefined}>
        {spec.render(values)}
      </div>
      <div className="qc-play-controls">
        {shown.map((control) => {
          const value = values[control.prop] ?? control.initial;
          if (control.kind === "text" || control.kind === "number")
            return (
              <TextField
                key={control.prop}
                label={control.label}
                value={String(value)}
                onValueChange={set(control.prop)}
                inputMode={control.kind === "number" ? "numeric" : undefined}
              />
            );
          if (control.kind === "choice")
            return (
              <Choice
                key={control.prop}
                label={control.label}
                value={String(value)}
                options={control.options}
                onChange={set(control.prop)}
              />
            );
          return null;
        })}
        {switches.length > 0 && (
          <div className="qc-play-switches">
            {switches.map((control) => (
              <Switch
                key={control.prop}
                label={control.label}
                checked={Boolean(values[control.prop])}
                onCheckedChange={set(control.prop)}
              />
            ))}
          </div>
        )}
      </div>
      <PlaygroundCode file={spec.file} lines={codeOf(spec, values)} />
    </div>
  );
}
