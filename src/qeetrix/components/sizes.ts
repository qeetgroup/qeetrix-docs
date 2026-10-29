// Sizes a component page reads from the tokens, at build time: a control's height in each density.
import { densityTokens } from "../foundations/data";

/** A control height in each density, as px: "24 / 28 / 32" for compact / default / comfortable. */
export function controlHeights(size: string): string {
  const token = densityTokens().find((entry) => entry.cssVar === `--qx-size-control-${size}`);
  if (!token) return "—";
  const px = (value: string) => /\((\d+)px\)/.exec(value)?.[1] ?? value;
  return [token.values.compact, token.values.default, token.values.comfortable].map(px).join(" / ");
}
