// Icons › Brand: what the server's sections (Brand.tsx) and the tenant island (TenantTheme.tsx)
// share — colour maths for brandTheme()'s oklch() values, and the brand roles as a table. No token
// data here: the server reads the DTCG and hands each row its values, so the island stays small.
// Ported from qeetrix-story (stories/foundations/brand.stories.tsx).
import { StarIcon } from "@qeetrix/icons/icons/star";
import { VisuallyHidden } from "@qeetrix/react";
import { CopyToken } from "../foundations/kit";

export type Scheme = "light" | "dark";
export const SCHEMES: Scheme[] = ["light", "dark"];

/* ── Colour maths: brandTheme() returns oklch(), the DTCG authors in it ───── */

const OKLCH = /^oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?/;

/** `oklch(l c h / a)` as sRGB channels from 0 to 1, linear or gamma-encoded, and its alpha. */
function channels(css: string, encoded = false): { rgb: number[]; alpha: number } {
  const match = OKLCH.exec(css);
  if (!match) return { rgb: [0, 0, 0], alpha: 1 };
  const [l, c, h] = [Number(match[1]), Number(match[2]), Number(match[3])];
  const a = c * Math.cos((h * Math.PI) / 180);
  const b = c * Math.sin((h * Math.PI) / 180);
  const l1 = (l + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m1 = (l - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s1 = (l - 0.0894841775 * a - 1.291485548 * b) ** 3;
  const linear = [
    4.0767416621 * l1 - 3.3077115913 * m1 + 0.2309699292 * s1,
    -1.2684380046 * l1 + 2.6097574011 * m1 - 0.3413193965 * s1,
    -0.0041960863 * l1 - 0.7034186147 * m1 + 1.707614701 * s1,
  ].map((u) => Math.min(1, Math.max(0, u)));
  const encode = (u: number) => (u <= 0.0031308 ? 12.92 * u : 1.055 * u ** (1 / 2.4) - 0.055);
  return {
    rgb: encoded ? linear.map(encode) : linear,
    alpha: match[4] === undefined ? 1 : Number(match[4]),
  };
}

/** The WCAG 2.2 contrast ratio of two opaque `oklch()` colours. */
export function ratio(a: string, b: string): number {
  const luminance = (css: string) => {
    const [r = 0, g = 0, bl = 0] = channels(css).rgb;
    return 0.2126 * r + 0.7152 * g + 0.0722 * bl;
  };
  const [high = 1, low = 1] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (high + 0.05) / (low + 0.05);
}

/** `#1a6fe0`, or `#1a6fe0 / 20%` for a translucent colour. */
export function hexOfCss(css: string): string {
  const { rgb, alpha } = channels(css, true);
  const hex = `#${rgb
    .map((u) =>
      Math.round(u * 255)
        .toString(16)
        .padStart(2, "0"),
    )
    .join("")}`;
  return alpha < 1 ? `${hex} / ${Math.round(alpha * 100)}%` : hex;
}

/** `#rgb` or `#rrggbb` as `#rrggbb`, or null. */
export function sixDigit(input: string): string | null {
  const hex = input.trim().replace(/^#/, "").toLowerCase();
  if (/^[0-9a-f]{3}$/.test(hex)) return `#${[...hex].map((digit) => digit + digit).join("")}`;
  return /^[0-9a-f]{6}$/.test(hex) ? `#${hex}` : null;
}

/* ── The roles ────────────────────────────────────────────────────────────── */

export type Kind = "fill" | "text" | "icon" | "border" | "overlay";

/** One value in one scheme: what to paint, what to print, and the exact value as its title. */
export interface Cell {
  css: string;
  label: string;
  title: string;
}

/** A brand role as the table shows it; `onBrand` roles are drawn on the brand fill. */
export interface Role {
  name: string;
  cssVar: string;
  kind: Kind;
  group: string;
  use?: string;
  onBrand: boolean;
}

export const BRAND_GROUPS: Array<{ label: string; match: RegExp }> = [
  { label: "Fills", match: /^bg\.brand\./ },
  { label: "Selection", match: /^(bg\.selected|selection)/ },
  { label: "Text", match: /^text\./ },
  { label: "Icons and edges", match: /^(icon|border)\./ },
];

export const kindOf = (name: string): Kind => {
  const group = name.split(".")[0];
  if (group === "text") return "text";
  if (group === "icon") return "icon";
  if (group === "border") return "border";
  if (group === "selection") return "overlay";
  return "fill";
};

/** One scheme's half of a preview: the role as it's used, painted with the colour given. */
function Half({
  kind,
  scheme,
  value,
  ground,
}: {
  kind: Kind;
  scheme: Scheme;
  value: string;
  ground?: string;
}) {
  if (kind === "text" || kind === "icon")
    return (
      <span
        data-qx-color-scheme={scheme}
        className="qf-brand-tone-half"
        style={{ color: value, background: ground }}
      >
        {kind === "text" ? "Aa" : <StarIcon size={16} aria-hidden />}
      </span>
    );
  if (kind === "border")
    return (
      <span data-qx-color-scheme={scheme} className="qf-brand-tone-half">
        <i className="qf-brand-tone-edge" style={{ borderColor: value }} />
      </span>
    );
  return (
    <span
      data-qx-color-scheme={scheme}
      className="qf-brand-tone-half"
      // A translucent colour is drawn over its scheme's default surface, as in product.
      style={{ background: `linear-gradient(${value}, ${value}), var(--qx-color-surface-default)` }}
    />
  );
}

/** A value's chip, pinned to its scheme: a translucent colour sits on that scheme's surface. */
function Chip({ css, scheme }: { css: string; scheme: Scheme }) {
  return (
    <i
      data-qx-color-scheme={scheme}
      style={{ background: `linear-gradient(${css}, ${css}), var(--qx-color-surface-default)` }}
    />
  );
}

/**
 * The brand roles as aligned rows: preview, name and token, what it's for, then its light and
 * dark values. `cells` gives each role's values; `fill` is the brand fill an on-brand role sits on.
 */
export function RoleList({
  caption,
  roles,
  cells,
  fill,
}: {
  caption: string;
  roles: Role[];
  cells: (role: Role, scheme: Scheme) => Cell;
  fill: (scheme: Scheme) => string;
}) {
  const usage = roles.some((role) => role.use);
  return (
    <div className="qf-brand-tokens-wrap">
      <table className="qf-brand-tokens">
        <caption>
          <VisuallyHidden>{caption}</VisuallyHidden>
        </caption>
        <thead>
          <tr>
            <th scope="col">
              <VisuallyHidden>Preview</VisuallyHidden>
            </th>
            <th scope="col">Token</th>
            {usage && (
              <th scope="col" className="qf-brand-tokens-usage">
                Use it for
              </th>
            )}
            <th scope="col">Light</th>
            <th scope="col">Dark</th>
          </tr>
        </thead>
        {BRAND_GROUPS.map(({ label }) => (
          <tbody key={label}>
            <tr className="qf-brand-tokens-group">
              <th scope="colgroup" colSpan={usage ? 5 : 4}>
                {label}
              </th>
            </tr>
            {roles
              .filter((role) => role.group === label)
              .map((role) => (
                <tr key={role.cssVar}>
                  <td>
                    <span className="qf-brand-tone" aria-hidden="true">
                      {SCHEMES.map((scheme) => (
                        <Half
                          key={scheme}
                          kind={role.kind}
                          scheme={scheme}
                          value={cells(role, scheme).css}
                          ground={role.onBrand ? fill(scheme) : undefined}
                        />
                      ))}
                    </span>
                  </td>
                  <th scope="row">
                    <span className="qf-brand-tokens-token">
                      <span className="qf-brand-tokens-name">{role.name}</span>
                      <CopyToken value={role.cssVar} />
                    </span>
                  </th>
                  {usage && <td className="qf-brand-tokens-usage">{role.use}</td>}
                  {SCHEMES.map((scheme) => {
                    const cell = cells(role, scheme);
                    return (
                      <td key={scheme}>
                        <span className="qf-brand-value" title={cell.title}>
                          <Chip css={cell.css} scheme={scheme} />
                          {cell.label}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
          </tbody>
        ))}
      </table>
    </div>
  );
}
