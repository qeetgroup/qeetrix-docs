// A playground's code, in the browser: lines of pieces, coloured by Qeetrix's highlighter (the one
// the build's code blocks use, Code.astro) and drawn with their markup, and copied as text.
import { CopyButton, highlight } from "@qeetrix/react/experimental";
import { Logo } from "@/platform/components/Logo";

/** A piece of code: lines are built from pieces, then highlighted whole. */
export type Piece = [text: string];

/** `import { A, B } from "module";`. */
export function importLine(names: string[], module: string): Piece[] {
  return [
    ["import"],
    [" { "],
    ...names.flatMap((name, at): Piece[] => (at === 0 ? [[name]] : [[","], [` ${name}`]])),
    [" } "],
    ["from"],
    [` "${module}"`],
    [";"],
  ];
}

/**
 * A JSX element with its props (a string value, an expression in braces, or a bare flag), as lines:
 * on one line when it fits in `width`, else a prop to a line, as Prettier breaks it.
 */
export function element(
  name: string,
  props: Array<[prop: string, value?: string]>,
  children?: string,
  width = 80,
): Piece[][] {
  const attribute = ([prop, value]: [string, string?], lead: string): Piece[] => {
    if (value === undefined) return [[`${lead}${prop}`]];
    return [[`${lead}${prop}`], ["="], value.startsWith('"') ? [value] : [value]];
  };
  const close: Piece[] = children === undefined ? [] : [[name], [">"]];
  const line: Piece[] =
    children === undefined
      ? [["<"], [name], ...props.flatMap((prop) => attribute(prop, " ")), [" />"]]
      : [
          ["<"],
          [name],
          ...props.flatMap((prop) => attribute(prop, " ")),
          [`>${children}</`],
          ...close,
        ];
  if (line.map(([text]) => text).join("").length <= width || props.length === 0) return [line];
  const open: Piece[] = [["<"], [name]];
  const end: Piece[][] =
    children === undefined ? [[["/>"]]] : [[[">"]], [[`  ${children}`]], [["</"], ...close]];
  return [open, ...props.map((prop) => attribute(prop, "  ")), ...end];
}

/** An element's opening tag, for children on the lines that follow: one line when it fits. */
export function opening(
  name: string,
  props: Array<[prop: string, value?: string]>,
  width = 80,
): Piece[][] {
  const [first, ...rest] = element(name, props, "", width);
  if (!first) return [];
  // One line: drop the empty children and the closing tag, keep the ">".
  if (rest.length === 0) return [[...first.slice(0, -3), [">"]]];
  // A prop to a line: keep everything up to the ">" line.
  return [first, ...rest.slice(0, rest.findIndex((line) => line[0]?.[0] === ">") + 1)];
}

/** Lines moved in by two spaces: an element's children. */
export const indent = (lines: Piece[][]): Piece[][] =>
  lines.map((line) => (line.length ? [["  "], ...line] : line));

export const textOf = (lines: Piece[][]) =>
  lines.map((line) => line.map(([text]) => text).join("")).join("\n");

export default function PlaygroundCode({ file, lines }: { file: string; lines: Piece[][] }) {
  const text = textOf(lines);
  // Each line and token keyed by where it starts in the code.
  let offset = 0;
  const keyed = highlight(text, "tsx").map((line) => {
    const key = offset;
    const tokens = line.map((token) => {
      const piece = { key: offset, ...token };
      offset += token.text.length;
      return piece;
    });
    offset += 1;
    return { key, tokens };
  });
  return (
    <figure className="doc-code qc-play-code">
      <figcaption className="doc-code-bar">
        <span>
          <Logo name="react-light" className="only-light" />
          <Logo name="react-dark" className="only-dark" />
          {file}
        </span>
        <CopyButton value={text} size="sm" variant="ghost">
          Copy
        </CopyButton>
      </figcaption>
      <div className="site-code">
        <pre data-language="tsx">
          <code>
            {keyed.map((line, at) => (
              <span key={line.key}>
                {line.tokens.map((token) =>
                  token.kind === "plain" ? (
                    token.text
                  ) : (
                    <span
                      key={token.key}
                      data-token={token.kind}
                      style={{ color: `var(--qx-color-code-${token.kind})` }}
                    >
                      {token.text}
                    </span>
                  ),
                )}
                {at < keyed.length - 1 ? "\n" : null}
              </span>
            ))}
          </code>
        </pre>
      </div>
    </figure>
  );
}
