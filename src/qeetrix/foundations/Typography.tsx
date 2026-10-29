// Foundations › Typography: the three faces, Qeet Sans's GEOM axis, and every type role. Ported
// from qeetrix-story (stories/foundations/typography.stories.tsx); each story is a section.
import { CheckIcon } from "@qeetrix/icons/icons/check";
import type { CSSProperties } from "react";
import { type DtcgTypography, format, formatType, ordered, type Token, tokens } from "./data";
import { CopyToken, Group, type Section, Specimen, SpecimenRow, SpecimenRows } from "./kit";

/** Custom properties for `_typography.css`: React's CSSProperties doesn't type them. */
const vars = (values: Record<string, string>) => values as CSSProperties;

/* ── Families ─────────────────────────────────────────────────────────────── */

/**
 * What the tokens can't say about each face, keyed by the first name in its stack. The axes are
 * the font files' own; Noto Sans isn't bundled, so its files are the app's or the system's.
 */
const FACES: Record<
  string,
  { glyph: string; use: string; sample: string; files: string; lang?: string }
> = {
  "Qeet Sans": {
    glyph: "Aa",
    use: "Interface text and headings",
    sample: "Priya Sharma signed in from Pune and paid ₹4,250",
    files: "Bundled · weight 400–700 · GEOM 0–100",
  },
  "Noto Sans": {
    glyph: "अआ",
    use: "Hindi and six more Indic scripts",
    sample: "पासकी से साइन इन करें",
    files: "Not bundled · the app or the system supplies it",
    lang: "hi",
  },
  "Fira Code": {
    glyph: "Aa",
    use: "Code, keys and identifiers",
    sample: "qid_live_8f2a · 0O 1lI",
    files: "Bundled · weight 300–700",
  },
};

/** The family tokens, one entry per stack: `sans` and `heading` share Qeet Sans's. */
const FAMILIES = Object.values(
  ordered(tokens("font.family"), ["sans", "heading", "indic", "mono"]).reduce<
    Record<string, { stack: string[]; items: Token[] }>
  >((byStack, item) => {
    const key = format(item.type, item.light);
    byStack[key] ??= { stack: item.light as string[], items: [] };
    byStack[key].items.push(item);
    return byStack;
  }, {}),
);

const Families: Section = {
  id: "families",
  name: "Families",
  parameters: {
    docs: {
      description: {
        story:
          "Three faces, one per job. Each token names a full stack, so text shows while fonts load.",
      },
    },
  },
  render: () => (
    <Specimen>
      <div className="qf-typo-families">
        {FAMILIES.map(({ stack, items }) => {
          const name = stack[0] ?? "";
          const face = FACES[name];
          const family = vars({ "--qx-typo-family": `var(${items[0]?.cssVar})` });
          return (
            <article key={name} className="qf-typo-family" aria-label={name}>
              <div className="qf-typo-family-glyph" lang={face?.lang} style={family} aria-hidden>
                <span>{face?.glyph ?? "Aa"}</span>
              </div>
              <div className="qf-typo-family-head">
                <span className="qf-typo-family-name">{name}</span>
                {face && <span className="qf-typo-family-use">{face.use}</span>}
              </div>
              <p className="qf-typo-family-sample" lang={face?.lang} style={family}>
                {face?.sample ?? name}
              </p>
              <div className="qf-typo-family-foot">
                <div className="qf-chip-row">
                  {items.map((item) => (
                    <CopyToken key={item.path} value={item.cssVar} />
                  ))}
                </div>
                <code className="qf-typo-family-stack">{stack.join(", ")}</code>
                {face && <span className="qf-typo-family-files">{face.files}</span>}
              </div>
            </article>
          );
        })}
      </div>
    </Specimen>
  ),
};

/* ── Geometry ─────────────────────────────────────────────────────────────── */

/** Each stop's name on the axis (the primitives' `base` and `geo`) and the roles that use it. */
const STOP: Record<string, { name: string; roles: string }> = {
  body: { name: "A11y", roles: "Body, label, code" },
  heading: { name: "Base", roles: "Heading, title" },
  display: { name: "Geo", roles: "Display" },
};

/** The geometry tokens along the axis, lowest first. */
const STOPS = tokens("font.geometry")
  .map((item) => ({ ...item, value: Number(item.light) }))
  .sort((a, b) => a.value - b.value);

/** The axis stops, for the geometry island (TypographyGeometry.tsx), which needs no token data. */
export const geometryStops = STOPS.map((stop) => ({
  name: stop.name,
  label: STOP[stop.name]?.name ?? stop.name,
  roles: STOP[stop.name]?.roles ?? "",
  value: stop.value,
  cssVar: stop.cssVar,
}));

const Geometry: Section = {
  id: "geometry",
  name: "Geometry",
  parameters: {
    docs: {
      description: {
        story:
          "GEOM moves Qeet Sans from its most legible letters (0) to geometric ones (100). Drag to compare.",
      },
    },
  },
  // Rendered by the page as an island (Sections' "geometry" slot).
  render: () => null,
};

/* ── Type scale ───────────────────────────────────────────────────────────── */

/** The geometry token a role uses. The `font` shorthand can't carry it. */
function geometryOf(role: string): "display" | "heading" | "body" {
  if (role.startsWith("display")) return "display";
  if (role.startsWith("heading") || role.startsWith("title")) return "heading";
  return "body";
}

const SAMPLE: Record<string, string> = {
  display: "Welcome to Qeet ID",
  heading: "Users and groups",
  title: "Security keys",
  body: "Priya Sharma signed in with a passkey from Pune. Her session ends in 12 hours.",
  label: "Invite users",
  code: "qid_live_8f2a",
};

/** Largest first, so the page reads like a specimen sheet; a role added later still shows. */
const ROLE_ORDER = ["display", "heading", "title", "body", "label", "code"];
const SIZE_ORDER = ["lg", "md", "sm", "caps"];

const rank = (order: string[], key: string) =>
  order.includes(key) ? order.indexOf(key) : order.length;

const GROUPS = Object.entries(
  tokens("typography").reduce<Record<string, Token[]>>((byRole, item) => {
    const role = item.name.split(".")[0] ?? item.name;
    byRole[role] ??= [];
    byRole[role].push(item);
    return byRole;
  }, {}),
)
  .sort(([a], [b]) => rank(ROLE_ORDER, a) - rank(ROLE_ORDER, b))
  .map(([role, items]) => ({
    role,
    items: [...items].sort(
      (a, b) =>
        rank(SIZE_ORDER, a.name.split(".")[1] ?? "") - rank(SIZE_ORDER, b.name.split(".")[1] ?? ""),
    ),
  }));

const GEOMETRY = Object.fromEntries(STOPS.map((stop) => [stop.name, stop.value]));

/** "56/64 · 600", with the tracking where a role has any. */
function metaOf(value: DtcgTypography): string {
  const tracking = value.letterSpacing.value;
  return [
    formatType(value),
    String(value.fontWeight),
    tracking ? `+${tracking}${value.letterSpacing.unit}` : "",
  ]
    .filter(Boolean)
    .join(" · ");
}

/** The group's face, and its GEOM where the face has the axis. */
function asideOf(role: string, items: Token[]): string {
  const face = (items[0]?.light as DtcgTypography | undefined)?.fontFamily[0] ?? "";
  return face === "Qeet Sans" ? `${face} · GEOM ${GEOMETRY[geometryOf(role)]}` : face;
}

const sentenceCase = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

/* ── The 4px grid, checked ────────────────────────────────────────────────── */

/** Every role's line height in pixels, from its size and ratio. */
const ROLES = GROUPS.flatMap(({ items }) => items);
const lineOf = (item: Token) => Number(formatType(item.light as DtcgTypography).split("/")[1]);
const OFF_GRID = ROLES.filter((item) => lineOf(item) % 4 !== 0);

function GridCheck() {
  return (
    <p className="qf-check" data-fail={OFF_GRID.length ? "" : undefined}>
      <CheckIcon size={16} aria-hidden />
      {OFF_GRID.length
        ? `${ROLES.length - OFF_GRID.length} of ${ROLES.length} line heights sit on the 4px grid`
        : `All ${ROLES.length} line heights sit on the 4px grid`}
    </p>
  );
}

/* ── Weights ──────────────────────────────────────────────────────────────── */

const WEIGHTS: Array<[number, string]> = [
  [400, "Regular"],
  [500, "Medium"],
  [600, "Semibold"],
  [700, "Bold"],
];

/** The roles at a weight: a whole family by name, or the family and its sizes where it mixes weights. */
function usedBy(weight: number): string {
  const names = GROUPS.flatMap(({ role, items }) => {
    const at = items.filter((item) => (item.light as DtcgTypography).fontWeight === weight);
    if (at.length === 0) return [];
    if (at.length === items.length) return [sentenceCase(role)];
    return [`${sentenceCase(role)} ${at.map((item) => item.name.split(".")[1]).join(", ")}`];
  });
  return names.length ? names.join(", ") : "Not used by a role";
}

const Weights: Section = {
  id: "weights",
  name: "Weights",
  parameters: {
    docs: {
      description: { story: "Qeet Sans from 400 to 700, and the roles that set each weight." },
    },
  },
  render: () => (
    <Specimen>
      <SpecimenRows>
        {WEIGHTS.map(([weight, name]) => (
          <div key={weight} className="qf-specimen-row">
            <div className="qf-specimen-row-meta">
              <span className="qf-typo-weight-name">
                {weight} · {name}
              </span>
              <span className="qf-specimen-row-numbers">{usedBy(weight)}</span>
            </div>
            <div className="qf-specimen-row-sample">
              <span className="qf-typo-weight-sample" style={{ fontWeight: weight }}>
                Priya Sharma signed in from Pune
              </span>
            </div>
          </div>
        ))}
      </SpecimenRows>
    </Specimen>
  ),
};

const TypeScale: Section = {
  id: "type-scale",
  name: "Type scale",
  parameters: {
    docs: {
      description: {
        story:
          "Every role with its size, line height and weight. Each line height sits on the 4px grid.",
      },
    },
  },
  render: () => (
    <Specimen>
      <GridCheck />
      {GROUPS.map(({ role, items }) => (
        <Group key={role} label={sentenceCase(role)} aside={asideOf(role, items)}>
          <SpecimenRows>
            {items.map((item) => (
              <SpecimenRow
                key={item.path}
                token={item.cssVar}
                meta={metaOf(item.light as DtcgTypography)}
              >
                <span
                  className="qf-typo-sample"
                  data-caps={item.name === "label.caps" ? "" : undefined}
                  style={vars({
                    "--qx-typo-role": `var(${item.cssVar})`,
                    "--qx-typo-tracking": `var(${item.cssVar}-letter-spacing)`,
                    "--qx-typo-geom": `var(--qx-font-geometry-${geometryOf(item.name)})`,
                  })}
                >
                  {item.name === "label.caps" ? "Directory" : (SAMPLE[role] ?? item.name)}
                </span>
              </SpecimenRow>
            ))}
          </SpecimenRows>
        </Group>
      ))}
    </Specimen>
  ),
};

export const sections: Section[] = [Families, Weights, Geometry, TypeScale];
