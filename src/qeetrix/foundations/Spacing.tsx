// Foundations › Spacing: space on a 4px grid, corners, control heights, the three densities, the
// window size classes and fixed component widths. Ported from qeetrix-story
// (stories/foundations/spacing.stories.tsx); each story is a section.
import { CheckIcon } from "@qeetrix/icons/icons/check";
import { LayoutGridIcon } from "@qeetrix/icons/icons/layout-grid";
import { ListIcon } from "@qeetrix/icons/icons/list";
import { SettingsIcon } from "@qeetrix/icons/icons/settings";
import { XIcon } from "@qeetrix/icons/icons/x";
import {
  Avatar,
  Badge,
  Button,
  Checkbox,
  type ControlSize,
  Field,
  Fieldset,
  Heading,
  IconButton,
  Input,
  Select,
  Table,
  TextField,
  Toggle,
  ToggleGroup,
} from "@qeetrix/react";
import { Kbd } from "@qeetrix/react/experimental";
import { BREAKPOINT, COMPONENT } from "@qeetrix/tokens";
import light from "@qeetrix/tokens/dtcg/light.tokens.json";
import type { ReactNode } from "react";
import {
  DENSITIES,
  type Density as DensityMode,
  type DtcgDimension,
  densityTokens,
  ordered,
  resolve,
  type Token,
  TokenTable,
  token,
  tokens,
} from "./data";
import { CopyToken, Group, type Section, Specimen, SpecimenRow, SpecimenRows } from "./kit";

/** Smallest first. */
const STEPS = ["xs", "sm", "md", "lg", "xl"];

/* ── Values ───────────────────────────────────────────────────────────────── */

const ROOT_FONT_SIZE = 16;

/** `1rem · 16px`, or `12px`. */
function dimension(value: unknown): string {
  const size = value as DtcgDimension | undefined;
  if (!size || typeof size !== "object") return "—";
  return size.unit === "rem"
    ? `${size.value}rem · ${size.value * ROOT_FONT_SIZE}px`
    : `${size.value}${size.unit}`;
}

/** What each density sets, keyed by CSS variable. */
const BY_DENSITY = new Map(densityTokens().map((item) => [item.cssVar, item.values]));

/** `1rem (16px)` from the density table, in this page's `1rem · 16px` form. */
const dense = (text: string) => text.replace(/ \((.+)\)$/, " · $1");

/**
 * A token's value: the density's own where it sets one (all three in the HTML; the page's density
 * switch, density.ts, shows the one in use), else the shared value.
 */
function DensityValue({ item }: { item: Token }) {
  const values = BY_DENSITY.get(item.cssVar);
  if (!values) return <>{dimension(item.light)}</>;
  return (
    <>
      {DENSITIES.map((density) => (
        <span key={density} className="qf-density-value" data-density={density}>
          {dense(values[density])}
        </span>
      ))}
    </>
  );
}

/* ── The 4px grid, checked ────────────────────────────────────────────────── */

/** Every space and size on this page in pixels, at each density where it varies. */
const px = (text: string) => Number(/([\d.]+)px/.exec(text)?.[1] ?? Number.NaN);
const SPACE_GROUP_NAMES = ["inset", "gap", "layout", "form"];
const CHECKED = [
  ...SPACE_GROUP_NAMES.flatMap((group) => tokens(`space.${group}`)),
  ...tokens("size.control"),
  ...tokens("size.row"),
].filter((item, index, all) => all.findIndex((other) => other.cssVar === item.cssVar) === index);
const OFF_GRID = CHECKED.filter((item) => {
  const values = BY_DENSITY.get(item.cssVar);
  const all = values
    ? DENSITIES.map((density) => px(values[density]))
    : [px(dimension(item.light))];
  return all.some((value) => value % 4 !== 0);
});

function GridCheck() {
  return (
    <p className="qf-check" data-fail={OFF_GRID.length ? "" : undefined}>
      <CheckIcon size={16} aria-hidden />
      {OFF_GRID.length
        ? `${CHECKED.length - OFF_GRID.length} of ${CHECKED.length} spaces and sizes sit on the 4px grid`
        : `All ${CHECKED.length} spaces and sizes sit on the 4px grid, at every density`}
    </p>
  );
}

/** A bar exactly as long as the token, drawn in cells (4px by default) so the grid shows. */
function Bar({ cssVar, cell }: { cssVar: string; cell?: "rem" }) {
  return (
    <span
      aria-hidden="true"
      className="qf-spacing-bar"
      data-cell={cell}
      style={{ inlineSize: `var(${cssVar})` }}
    />
  );
}

/** A dimension line exactly as tall as the token, set beside the controls it measures. */
function Gauge({ cssVar }: { cssVar: string }) {
  return (
    <span aria-hidden="true" className="qf-spacing-gauge" style={{ blockSize: `var(${cssVar})` }} />
  );
}

/* ── Space ────────────────────────────────────────────────────────────────── */

const SPACE_GROUPS = [
  { group: "inset", note: "Padding inside a container" },
  { group: "gap", note: "Between siblings in a stack or row" },
  { group: "layout", note: "Between page regions" },
  { group: "form", note: "Between form fields, by density" },
];

function SpaceSpecimen() {
  return (
    <Specimen>
      <GridCheck />
      <div className="qf-spacing-columns">
        {SPACE_GROUPS.map(({ group, note }) => (
          <Group key={group} label={group} aside={note}>
            <SpecimenRows>
              {ordered(tokens(`space.${group}`), STEPS).map((item) => (
                <SpecimenRow
                  key={item.path}
                  token={item.cssVar}
                  meta={<DensityValue item={item} />}
                >
                  <Bar cssVar={item.cssVar} />
                </SpecimenRow>
              ))}
            </SpecimenRows>
          </Group>
        ))}
      </div>
    </Specimen>
  );
}

const Space: Section = {
  id: "space",
  name: "Space",
  parameters: {
    docs: {
      description: {
        story: "Every padding and gap is a step on the 4px grid; each cell of a bar is 4px.",
      },
    },
  },
  render: () => <SpaceSpecimen />,
};

/* ── Scale ────────────────────────────────────────────────────────────────── */

/** Each step of the 4px scale, with every space token that resolves to it (at default density). */
const SCALE = tokens("primitive.space").map((step) => ({
  step,
  users: SPACE_GROUP_NAMES.flatMap((group) => ordered(tokens(`space.${group}`), STEPS)).filter(
    (item) => resolve("light", item.path).chain.includes(step.path),
  ),
}));

const Scale: Section = {
  id: "scale",
  name: "Scale",
  parameters: {
    docs: {
      description: {
        story:
          "One 4px scale under every name: each step, and the tokens that use it at default density.",
      },
    },
  },
  render: () => (
    <Specimen>
      <div className="qf-scale">
        <TokenTable
          caption="The space scale and the tokens on each step"
          columns={["Step", "Value", "To scale", "Tokens"]}
          rows={SCALE.map(({ step, users }) => {
            const size = step.light as DtcgDimension;
            return {
              token: step.name,
              cells: [
                dimension(step.light),
                <span
                  key="bar"
                  aria-hidden="true"
                  className="qf-spacing-bar"
                  style={{ inlineSize: `${size.value}${size.unit}` }}
                />,
                users.length ? (
                  <span key="users" className="qf-scale-users">
                    {users.map((item) => (
                      <CopyToken key={item.path} value={item.cssVar} />
                    ))}
                  </span>
                ) : (
                  "—"
                ),
              ],
            };
          })}
        />
      </div>
    </Specimen>
  ),
};

/* ── In use ───────────────────────────────────────────────────────────────── */

/** The tokens the form below is spaced with, each tinted as its redline. */
const IN_USE = [
  { path: "space.inset.lg", what: "Padding inside the card", tint: "pad" },
  { path: "space.form.gap", what: "Between the fields", tint: "form" },
  { path: "space.gap.sm", what: "Between the buttons", tint: "gap" },
] as const;

const Mark = ({ n }: { n: number }) => (
  <span className="qf-use-mark" data-tint={IN_USE[n - 1]?.tint}>
    {n}
  </span>
);

const InUse: Section = {
  id: "in-use",
  name: "In use",
  parameters: {
    docs: {
      description: {
        story:
          "A form as it ships, its space drawn as redlines. Switch the density above and the gaps follow.",
      },
    },
  },
  render: () => (
    <Specimen>
      <div className="qf-use">
        <div className="qf-use-stage" aria-hidden="true" inert>
          <div className="qf-use-card">
            <Mark n={1} />
            <div className="qf-use-content">
              <Heading level={3} size="title-md">
                Invite a user
              </Heading>
              <div className="qf-use-field">
                <TextField label="Work email" defaultValue="priya@acme.in" />
              </div>
              <div className="qf-use-field">
                <Mark n={2} />
                <TextField label="Display name" defaultValue="Priya Sharma" />
              </div>
              <div className="qf-use-actions">
                <Button>Invite</Button>
                <span className="qf-use-gapmark">
                  <Mark n={3} />
                </span>
                <Button variant="soft" tone="neutral">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
        <ol className="qf-use-key">
          {IN_USE.map(({ path, what, tint }, i) => {
            const item = token(path);
            return (
              <li key={path}>
                <span className="qf-use-mark" data-tint={tint}>
                  {i + 1}
                </span>
                <span className="qf-use-key-text">
                  <CopyToken value={item.cssVar} />
                  <span>
                    {what} · <DensityValue item={item} />
                  </span>
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </Specimen>
  ),
};

/* ── Radius ───────────────────────────────────────────────────────────────── */

const RADII = ["none", "sm", "tooltip", "control", "surface", "overlay", "modal", "chip", "full"];

interface DtcgEntry {
  $description?: string;
  [child: string]: unknown;
}

/** A token's `$description` in the DTCG document, if it has one. */
function describe(path: string): string | undefined {
  let node: unknown = light;
  for (const key of path.split(".")) node = (node as Record<string, unknown> | undefined)?.[key];
  return (node as DtcgEntry | undefined)?.$description;
}

/** What each corner value draws in product, at real size under its 4× tile. */
const RADIUS_USE: Record<string, ReactNode> = {
  "2px": (
    <>
      <Checkbox label="Remember" defaultChecked />
      <Kbd keys="Mod+K" />
    </>
  ),
  "4px": (
    <>
      <Button size="sm">Save</Button>
      <span className="qf-use-card-chip">Card</span>
    </>
  ),
  "9999px": (
    <>
      <Badge tone="success" variant="solid">
        Active
      </Badge>
      <Avatar name="Priya Sharma" size="sm" />
    </>
  ),
};

/** The radius tokens grouped by the corner they draw: roles that share a value share a tile. */
function corners(): Array<{ value: string; items: Token[] }> {
  const groups = new Map<string, Token[]>();
  for (const item of ordered(tokens("radius"), RADII)) {
    const value = dimension(item.light);
    groups.set(value, [...(groups.get(value) ?? []), item]);
  }
  return [...groups].map(([value, items]) => ({ value, items }));
}

const Radius: Section = {
  id: "radius",
  name: "Radius",
  parameters: {
    docs: {
      description: {
        story:
          "Four corner values, shared by role and drawn at 4×. Only people, choices and tags read round.",
      },
    },
  },
  render: () => (
    <Specimen>
      <div className="qf-spacing-corners">
        {corners().map(({ value, items }) => (
          <figure key={value} className="qf-spacing-corner">
            <div aria-hidden="true" className="qf-spacing-corner-frame">
              <span
                className="qf-spacing-corner-shape"
                style={{ borderRadius: `calc(var(${items[0]?.cssVar}) * 4)` }}
              />
              <span className="qf-spacing-corner-zoom">4×</span>
            </div>
            {/* Every corner keeps the row, so the captions line up across the tiles. */}
            <div className="qf-spacing-corner-use" aria-hidden="true" inert>
              {RADIUS_USE[value]}
            </div>
            <figcaption className="qf-spacing-corner-caption">
              <span className="qf-spacing-corner-value">{value}</span>
              <ul className="qf-spacing-corner-tokens">
                {items.map((item) => {
                  const note = describe(item.path);
                  return (
                    <li key={item.path}>
                      <CopyToken value={item.cssVar} />
                      {note && <span className="qf-spacing-note">{note}</span>}
                    </li>
                  );
                })}
              </ul>
            </figcaption>
          </figure>
        ))}
      </div>
    </Specimen>
  ),
};

/* ── Control sizes ────────────────────────────────────────────────────────── */

const VIEWS = [
  { value: "list", label: "List", icon: ListIcon },
  { value: "grid", label: "Grid", icon: LayoutGridIcon },
];

const PLANS = [
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
];

const MEMBERS = [
  { id: "u1", name: "Priya Sharma", role: "Owner" },
  { id: "u2", name: "Rahul Verma", role: "Admin" },
];

type Member = (typeof MEMBERS)[number];

const MEMBER_COLUMNS = [
  { id: "name", header: "Name", cell: (member: Member) => member.name },
  { id: "role", header: "Role", cell: (member: Member) => member.role },
];

/** One of each sized control at a size. */
function Controls({ size }: { size: ControlSize }) {
  return (
    <>
      <Button size={size}>Save</Button>
      <IconButton size={size} variant="soft" icon={SettingsIcon} aria-label="Settings" />
      <ToggleGroup size={size} defaultValue={["list"]} aria-label={`View, ${size}`}>
        {VIEWS.map((view) => (
          <Toggle key={view.value} value={view.value} icon={view.icon} aria-label={view.label} />
        ))}
      </ToggleGroup>
    </>
  );
}

function ControlSizesSpecimen() {
  const controls = ordered(tokens("size.control"), STEPS);
  const [row] = tokens("size.row");
  const [target] = tokens("size.target");
  return (
    <Specimen>
      <Group label="Controls" aside="Fields are always lg">
        <SpecimenRows>
          {controls.map((item) => (
            <SpecimenRow key={item.path} token={item.cssVar} meta={<DensityValue item={item} />}>
              <div className="qf-spacing-controls">
                <Gauge cssVar={item.cssVar} />
                <Controls size={item.name as ControlSize} />
                {item.name === "lg" && (
                  <>
                    <Input
                      aria-label="Workspace name"
                      placeholder="Workspace"
                      className="qf-spacing-field"
                    />
                    <Select
                      aria-label="Billing plan"
                      items={PLANS}
                      defaultValue="monthly"
                      className="qf-spacing-field"
                    />
                  </>
                )}
              </div>
            </SpecimenRow>
          ))}
        </SpecimenRows>
      </Group>
      <Group label="Rows and targets">
        <SpecimenRows>
          {row && (
            <SpecimenRow token={row.cssVar} meta={<DensityValue item={row} />}>
              <div className="qf-spacing-controls" data-align="end">
                <Gauge cssVar={row.cssVar} />
                <Table
                  label="Members"
                  className="qf-spacing-table"
                  rows={MEMBERS}
                  rowId={(member) => member.id}
                  rowLabel={(member) => member.name}
                  columns={MEMBER_COLUMNS}
                />
              </div>
            </SpecimenRow>
          )}
          {target && (
            <SpecimenRow token={target.cssVar} meta={`${dimension(target.light)} · WCAG 2.5.8`}>
              <div className="qf-spacing-controls">
                <span aria-hidden="true" className="qf-spacing-target">
                  <XIcon shape="sharp" size="var(--qx-size-icon-sm)" />
                </span>
                <span className="qf-spacing-note">
                  The smallest pointer target any control may have
                </span>
              </div>
            </SpecimenRow>
          )}
        </SpecimenRows>
      </Group>
    </Specimen>
  );
}

const ControlSizes: Section = {
  id: "control-sizes",
  name: "Control sizes",
  parameters: {
    docs: {
      description: {
        story: "Real controls at each height. Heights and values follow the Density toolbar.",
      },
    },
  },
  render: () => <ControlSizesSpecimen />,
};

/* ── Density ──────────────────────────────────────────────────────────────── */

const ROLES = [
  { value: "owner", label: "Owner" },
  { value: "admin", label: "Admin" },
  { value: "member", label: "Member" },
];

/** The same small form, pinned to one density. */
function DensityPanel({ density }: { density: DensityMode }) {
  return (
    <Group label={density}>
      <div className="qf-spacing-panel" data-qx-density={density}>
        <Fieldset legend="Profile">
          <TextField label="Display name" defaultValue="Priya Sharma" />
          <Field label="Role">
            <Select items={ROLES} defaultValue="owner" />
          </Field>
        </Fieldset>
        <div className="qf-spacing-actions">
          <Button>Save</Button>
          <Button variant="ghost">Cancel</Button>
        </div>
        <Table
          label={`Members, ${density}`}
          rows={MEMBERS}
          rowId={(member) => member.id}
          rowLabel={(member) => member.name}
          columns={MEMBER_COLUMNS}
        />
      </div>
    </Group>
  );
}

const Density: Section = {
  id: "density",
  name: "Density",
  parameters: {
    docs: {
      description: { story: "The same form at each density; each panel pins data-qx-density." },
    },
  },
  render: () => (
    <Specimen>
      <div className="qf-spacing-densities">
        {DENSITIES.map((density) => (
          <DensityPanel key={density} density={density} />
        ))}
      </div>
      <Group label="What each density sets">
        <TokenTable
          caption="The tokens each density sets"
          columns={["Token", ...DENSITIES]}
          rows={densityTokens().map((item) => ({
            token: item.cssVar,
            cells: DENSITIES.map((density) => dense(item.values[density])),
          }))}
        />
      </Group>
    </Specimen>
  ),
};

/* ── Breakpoints ──────────────────────────────────────────────────────────── */

type SizeClass = keyof typeof BREAKPOINT;

/** Window size classes from narrowest, each with the width it starts at. */
const CLASSES: Array<[SizeClass | "compact", number]> = [
  ["compact", 0],
  ...(Object.entries(BREAKPOINT) as Array<[SizeClass, number]>).sort((a, b) => a[1] - b[1]),
];

/** Where the ruler ends: past the widest threshold, so the last class has room. */
const RULER_END = 1920;

const share = (px: number) => `${(Math.min(px, RULER_END) / RULER_END) * 100}%`;

/** The size classes to scale. ruler.ts marks this window's class and moves its marker, live. */
function Ruler() {
  return (
    <div className="qf-spacing-ruler">
      <ol
        aria-label="Window size classes"
        className="qf-spacing-bands"
        style={{
          gridTemplateColumns: CLASSES.map(
            ([, min], index) => `minmax(0, ${(CLASSES[index + 1]?.[1] ?? RULER_END) - min}fr)`,
          ).join(" "),
        }}
      >
        {CLASSES.map(([name, min], index) => {
          const next = CLASSES[index + 1]?.[1];
          return (
            <li key={name} className="qf-spacing-band" data-min={min}>
              <span className="qf-spacing-band-name">{name}</span>
              <code className="qf-spacing-band-range">
                {next ? `${min}–${next - 1}px` : `${min}px and up`}
              </code>
            </li>
          );
        })}
      </ol>
      <div aria-hidden="true" className="qf-spacing-scale">
        {CLASSES.map(([name, min]) => (
          <span key={name} style={{ insetInlineStart: share(min) }}>
            {min}
          </span>
        ))}
      </div>
      <div className="qf-spacing-marker" data-ruler-end={RULER_END} hidden>
        <span />
      </div>
    </div>
  );
}

const Breakpoints: Section = {
  id: "breakpoints",
  name: "Breakpoints",
  parameters: {
    docs: {
      description: {
        story: "Window size classes, to scale. The marker shows this window's width.",
      },
    },
  },
  render: () => (
    <Specimen>
      <Ruler />
      <Group
        label="In code"
        aside={
          <CopyToken
            value={'@import "@qeetrix/tokens/custom-media.css";'}
            label="custom-media.css"
          />
        }
      >
        <TokenTable
          caption="Window size classes in CSS and JavaScript"
          columns={["Class", "CSS", "JavaScript", "Grid key"]}
          rows={CLASSES.map(([name]) =>
            name === "compact"
              ? { token: name, cells: ["—", "—", "base"] }
              : {
                  token: name,
                  cells: [`@media (--qx-viewport-${name})`, `BREAKPOINT.${name}`, name],
                },
          )}
        />
      </Group>
    </Specimen>
  ),
};

/* ── Component sizes ──────────────────────────────────────────────────────── */

const camel = (segment: string) =>
  segment.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase());

/** A component token's name in the COMPONENT export, if the export has it. */
function exportOf(path: string): string | undefined {
  const keys = path.split(".").slice(1).map(camel);
  let node: unknown = COMPONENT;
  for (const key of keys) node = (node as Record<string, unknown> | undefined)?.[key];
  return typeof node === "string" ? `COMPONENT.${keys.join(".")}` : undefined;
}

/** `command-palette` → `Command palette`. */
const title = (name: string) => (name.charAt(0).toUpperCase() + name.slice(1)).replace(/-/g, " ");

/** The component tokens under the component they size, in the package's order. */
function byComponent(): Array<{ name: string; items: Token[] }> {
  const groups = new Map<string, Token[]>();
  for (const item of tokens("component")) {
    const name = item.path.split(".")[1] ?? item.path;
    groups.set(name, [...(groups.get(name) ?? []), item]);
  }
  return [...groups].map(([name, items]) => ({ name: title(name), items }));
}

const ComponentSizes: Section = {
  id: "component-sizes",
  name: "Component sizes",
  parameters: {
    docs: {
      description: {
        story: "Fixed geometry for a few components, drawn to scale and exported as COMPONENT.",
      },
    },
  },
  render: () => (
    <Specimen>
      {byComponent().map(({ name, items }) => (
        <Group key={name} label={name}>
          <div className="qf-spacing-components">
            <SpecimenRows>
              {items.map((item) => {
                const exported = exportOf(item.path);
                return (
                  <SpecimenRow
                    key={item.path}
                    token={item.cssVar}
                    meta={
                      <span className="qf-spacing-meta">
                        <span>{dimension(item.light)}</span>
                        {exported && <span>{exported}</span>}
                      </span>
                    }
                  >
                    <Bar cssVar={item.cssVar} cell="rem" />
                  </SpecimenRow>
                );
              })}
            </SpecimenRows>
          </div>
        </Group>
      ))}
    </Specimen>
  ),
};

export const sections: Section[] = [
  Space,
  Scale,
  InUse,
  Radius,
  ControlSizes,
  Density,
  Breakpoints,
  ComponentSizes,
];
