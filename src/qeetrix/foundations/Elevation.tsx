// Foundations › Elevation: shadows for floating layers, ruled borders, the stacking order, opacity and
// the focus ring. Ported from qeetrix-story (stories/foundations/elevation.stories.tsx); each story
// is a section.
import { CheckIcon } from "@qeetrix/icons/icons/check";
import {
  Button,
  Card,
  Checkbox,
  Inline,
  Input,
  Link,
  Stack,
  Switch,
  Tab,
  Tabs,
  TabsList,
  Text,
  TextField,
  Toggle,
  ToggleGroup,
} from "@qeetrix/react";
import { Alert } from "@qeetrix/react/experimental";
import type { CSSProperties, ReactNode } from "react";
import {
  type DtcgColor,
  type DtcgDimension,
  type DtcgShadowLayer,
  format,
  ordered,
  type Token,
  tokens,
} from "./data";
import { CopyToken, Group, type Section, Specimen, SpecimenRow, SpecimenRows } from "./kit";

/** Custom properties for a specimen's geometry, typed for React's style prop. */
const vars = (values: Record<string, string | number>) => values as CSSProperties;

/* ── Shadows ──────────────────────────────────────────────────────────────── */

const SHADOWS = ordered(tokens("shadow"), ["inset", "raised", "raised-hover", "overlay", "modal"]);

/** What each shadow is for (the @qeetrix/tokens README), and who reads it where a component does. */
const SHADOW_USE: Record<string, { use: string; note: string }> = {
  inset: { use: "Wells", note: "Sunken into the page" },
  raised: { use: "Cards", note: "At rest. Hover to lift" },
  "raised-hover": { use: "Cards", note: "Under the pointer" },
  overlay: { use: "Menus", note: "Popover, Select, Toast" },
  modal: { use: "Dialogs", note: "Dialog, Drawer" },
};

const px = (dimension: DtcgDimension) =>
  dimension.unit === "rem" ? dimension.value * 16 : dimension.value;

/** The layer that gives a shadow its height, the softest one: `y 12 · blur 24`. */
function lift(value: unknown): string {
  const layers = value as DtcgShadowLayer[];
  const main = layers.reduce((a, b) => (px(b.blur) > px(a.blur) ? b : a));
  return `${main.inset ? "inset · " : ""}y ${px(main.offsetY)} · blur ${px(main.blur)}`;
}

const Shadows: Section = {
  id: "shadows",
  name: "Shadows",
  parameters: {
    docs: {
      description: {
        story: "Floating layers only. Each pairs a tight contact shadow with a soft ambient one.",
      },
    },
  },
  render: () => (
    <Specimen>
      <Group label="Lowest to highest" aside="Each name copies its --qx-shadow-* variable">
        <div className="qf-elev-stage qf-elev-shadows">
          {SHADOWS.map((item) => (
            <figure key={item.path} className="qf-elev-shadow">
              <div
                className="qf-elev-shadow-tile"
                data-shadow={item.name}
                style={vars({ "--shadow": `var(${item.cssVar})` })}
              >
                <span className="qf-elev-shadow-use">
                  {SHADOW_USE[item.name]?.use ?? item.name}
                </span>
                <span className="qf-elev-shadow-note">{SHADOW_USE[item.name]?.note}</span>
              </div>
              <figcaption className="qf-elev-caption">
                <CopyToken value={item.cssVar} label={item.name} />
                {/* The numbers of the scheme on screen, like the shadow above them. */}
                <span className="qf-elev-numbers">
                  <span data-scheme="light">{lift(item.light)}</span>
                  <span data-scheme="dark">{lift(item.dark)}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Group>
    </Specimen>
  ),
};

/* ── Borders ──────────────────────────────────────────────────────────────── */

const BORDERS = ordered(tokens("border.width"), ["default", "strong", "accent"]);

/** Each width on the edges that use it, in real components. */
const BORDER_USE: Record<string, { use: string; sample: ReactNode }> = {
  default: {
    use: "Cards, fields, table rules",
    sample: (
      <Card
        className="qf-elev-sample"
        footer={
          <Button size="sm" variant="soft">
            Manage
          </Button>
        }
      >
        <Stack gap="xs">
          <Text weight="medium">Acme Pvt Ltd</Text>
          <Text size="sm" tone="subtle">
            48 members · 3 admins
          </Text>
        </Stack>
      </Card>
    ),
  },
  strong: {
    use: "Tab baselines, menu highlights",
    sample: (
      <Tabs defaultValue="users" className="qf-elev-sample">
        <TabsList>
          <Tab value="users">Users</Tab>
          <Tab value="groups">Groups</Tab>
          <Tab value="roles">Roles</Tab>
        </TabsList>
      </Tabs>
    ),
  },
  accent: {
    use: "Alerts, dialogs, the current item",
    sample: (
      <Alert className="qf-elev-sample" title="Directory sync paused">
        People added in Okta appear once it resumes.
      </Alert>
    ),
  },
};

const Borders: Section = {
  id: "borders",
  name: "Borders",
  parameters: {
    docs: {
      description: {
        story:
          "Three widths: hairline rules, emphasis lines, and the accent bar on the current item.",
      },
    },
  },
  render: () => (
    <Specimen>
      <SpecimenRows>
        {BORDERS.map((item) => (
          <SpecimenRow
            key={item.path}
            token={item.cssVar}
            meta={
              <>
                <span className="qf-elev-rule-meta">
                  <span className="qf-elev-rule" style={{ blockSize: `var(${item.cssVar})` }} />
                  {format(item.type, item.light)}
                </span>
                <span className="qf-elev-use">{BORDER_USE[item.name]?.use}</span>
              </>
            }
          >
            {BORDER_USE[item.name]?.sample}
          </SpecimenRow>
        ))}
      </SpecimenRows>
    </Specimen>
  ),
};

/* ── Layers ───────────────────────────────────────────────────────────────── */

/** Front to back, the way the stack reads from the top of the illustration. */
const LADDER = tokens("z").sort((a, b) => Number(b.light) - Number(a.light));

/** The @qeetrix/react components that read each rung, from the published stylesheet. */
const READ_BY: Record<string, string> = {
  "skip-link": "SkipLink",
  spotlight: "Guided tours",
  tooltip: "Tooltip",
  toast: "ToastProvider",
  popover: "Popover, Menu, Select, Combobox",
  modal: "Dialog, Drawer, CommandPalette",
  overlay: "Dialog and Drawer backdrops",
  dropdown: "No component yet",
  sticky: "Table header, AppShell",
  base: "Page content",
};

/**
 * One rung as a plane of a console screen, drawn in projection. Each plane stacks by its own
 * z-index token: the DOM lists them front to back, so z-index alone puts them in order.
 */
function Plane({ item, rung }: { item: Token; rung: number }) {
  return (
    <div
      className="qf-elev-plane"
      data-layer={item.name}
      style={{ ...vars({ "--rung": rung }), zIndex: `var(${item.cssVar})` }}
    >
      <span className="qf-elev-plane-el" />
      {item.name === "base" && (
        <>
          <span className="qf-elev-page-line" />
          <span className="qf-elev-page-line" />
          <span className="qf-elev-page-line" />
        </>
      )}
    </div>
  );
}

/** The stacking ladder, exploded or composed: layers.ts switches the view. */
function LayersSpecimen() {
  return (
    <Specimen>
      <LayerCheck />
      <div className="qf-elev-stage qf-elev-layers" data-view="exploded" data-qf-layers>
        <div className="qf-elev-layers-bar">
          <ToggleGroup aria-label="View" size="sm" defaultValue={["exploded"]}>
            <Toggle value="exploded" data-view-choice="exploded">
              Exploded
            </Toggle>
            <Toggle value="composed" data-view-choice="composed">
              Composed
            </Toggle>
          </ToggleGroup>
        </div>
        <div className="qf-elev-scene" style={vars({ "--rungs": LADDER.length })}>
          <ol className="qf-elev-legend" aria-label="Stacking order, front to back">
            {LADDER.map((item, index) => (
              <li key={item.path} style={vars({ "--rung": LADDER.length - 1 - index })}>
                <span className="qf-elev-legend-text">
                  <span className="qf-elev-legend-token">
                    <CopyToken value={item.cssVar} />
                    <code>{String(item.light)}</code>
                  </span>
                  <span className="qf-elev-legend-note">{READ_BY[item.name] ?? "—"}</span>
                </span>
              </li>
            ))}
          </ol>
          <div className="qf-elev-planes" aria-hidden="true">
            {LADDER.map((item, index) => (
              <Plane key={item.path} item={item} rung={LADDER.length - 1 - index} />
            ))}
          </div>
        </div>
      </div>
    </Specimen>
  );
}

const Layers: Section = {
  id: "layers",
  name: "Layers",
  parameters: {
    docs: {
      description: {
        story:
          "From the top layer down. Popovers sit above modals, so one opened from a dialog shows.",
      },
    },
  },
  render: () => <LayersSpecimen />,
};

/* ── Opacity ──────────────────────────────────────────────────────────────── */

/**
 * An illustration with no disabled colour of its own: what the opacity token is for. Painted with
 * dataviz roles, as a stand-in for a product image.
 */
function Illustration({ overlay }: { overlay?: string }) {
  return (
    <svg viewBox="0 0 160 72" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="160" height="72" fill="var(--qx-color-bg-info-subtle)" />
      <circle cx="44" cy="36" r="16" fill="var(--qx-color-dataviz-categorical-1)" />
      <rect x="72" y="26" width="52" height="7" fill="var(--qx-color-dataviz-categorical-3)" />
      <rect x="72" y="40" width="34" height="7" fill="var(--qx-color-dataviz-categorical-2)" />
      {overlay && <rect width="160" height="72" fill={`var(${overlay})`} />}
    </svg>
  );
}

function Tile({
  name,
  token,
  value,
  faded,
  children,
}: {
  name: string;
  token?: string;
  value: string;
  faded?: boolean;
  children: ReactNode;
}) {
  return (
    <figure className="qf-elev-tile">
      <div className="qf-elev-tile-sample" data-faded={faded ? "" : undefined}>
        {children}
      </div>
      <figcaption className="qf-elev-caption">
        <span className="qf-elev-tile-name">{name}</span>
        {token && <CopyToken value={token} />}
        <span className="qf-elev-numbers">{value}</span>
      </figcaption>
    </figure>
  );
}

const OPACITY = tokens("opacity");
const STATE_LAYERS = [...tokens("color.overlay"), ...tokens("color.selection")];

/** An alpha as a percentage: light, then dark when it differs. */
function alpha(item: Token): string {
  const percent = (color: unknown) => `${Math.round(((color as DtcgColor).alpha ?? 1) * 100)}%`;
  const [light, dark] = [percent(item.light), percent(item.dark)];
  return light === dark ? light : `${light} · ${dark}`;
}

const sentence = (name: string) => name.charAt(0).toUpperCase() + name.slice(1);

const Opacity: Section = {
  id: "opacity",
  name: "Opacity",
  parameters: {
    docs: {
      description: {
        story: "One opacity, for content with no disabled colour of its own, and the state layers.",
      },
    },
  },
  render: () => (
    <Specimen>
      <Group label="Opacity">
        <div className="qf-elev-tiles">
          <Tile name="At rest" value="100%">
            <Illustration />
          </Tile>
          {OPACITY.map((item) => (
            <Tile
              key={item.path}
              name={sentence(item.name)}
              token={item.cssVar}
              value={`${Math.round(Number(item.light) * 100)}%`}
              faded
            >
              <Illustration />
            </Tile>
          ))}
        </div>
      </Group>
      <Group label="State layers" aside="Light · dark">
        <div className="qf-elev-tiles">
          {STATE_LAYERS.map((item) => (
            <Tile
              key={item.path}
              name={sentence(item.name)}
              token={item.cssVar}
              value={alpha(item)}
            >
              {item.name === "selection" ? (
                <span className="qf-elev-selection">
                  Priya <mark>Sharma</mark>
                </span>
              ) : (
                <Illustration overlay={item.cssVar} />
              )}
            </Tile>
          ))}
        </div>
      </Group>
    </Specimen>
  ),
};

/* ── Focus ring ───────────────────────────────────────────────────────────── */

/**
 * One callout on the zoomed edge: the token, its value, and a bracket over the span it measures
 * (or a dot on the thing it names). `from` and `to` are positions across the figure.
 */
function Callout({
  token,
  value,
  from,
  to,
  top,
  point = false,
}: {
  token: string;
  value?: string;
  from: string;
  to: string;
  top: string;
  point?: boolean;
}) {
  return (
    <div
      className="qf-elev-callout"
      data-point={point ? "" : undefined}
      style={vars({ "--from": from, "--to": to, "--top": top })}
    >
      <span className="qf-elev-callout-label">
        <CopyToken value={token} />
        {value && <code>{value}</code>}
      </span>
      <span className="qf-elev-callout-lead" />
      <span className="qf-elev-callout-mark" />
    </div>
  );
}

const FOCUS_RING = tokens("focus.ring");
const RING = format("dimension", FOCUS_RING.find((item) => item.name === "width")?.light);
const OFFSET = format("dimension", FOCUS_RING.find((item) => item.name === "offset")?.light);

const FocusRing: Section = {
  id: "focus-ring",
  name: "Focus ring",
  parameters: {
    docs: {
      description: {
        story:
          "2px in the focus colour: inside the edge of filled controls, 2px outside small ones.",
      },
    },
  },
  render: () => (
    <Specimen>
      <div className="qf-elev-split">
        <Group label="Inside the edge" aside="Buttons, fields, tabs">
          <div className="qf-elev-zoom" data-ring="inside">
            <span className="qf-elev-zoom-control" />
            <Callout
              token="--qx-focus-ring-width"
              value={RING}
              from="var(--edge)"
              to="calc(var(--edge) + var(--ring))"
              top="4.75rem"
            />
            <Callout
              token="--qx-color-border-focus"
              from="calc(var(--edge) + var(--ring) / 2)"
              to="calc(var(--edge) + var(--ring) / 2)"
              top="7rem"
              point
            />
          </div>
          {/* A picture of focus: the rings are drawn statically, so the controls are inert. */}
          <div className="qf-elev-focus-live" data-ring="inside" inert>
            <Button>Invite users</Button>
            <Input aria-label="Search members" placeholder="Search members" />
          </div>
        </Group>
        <Group label="Outside the edge" aside="Checkboxes, links, switches">
          <div className="qf-elev-zoom" data-ring="outside">
            <span className="qf-elev-zoom-control" />
            <Callout
              token="--qx-focus-ring-offset"
              value={OFFSET}
              from="calc(var(--edge) - var(--gap))"
              to="var(--edge)"
              top="4.75rem"
            />
            <Callout
              token="--qx-focus-ring-width"
              value={RING}
              from="calc(var(--edge) - var(--gap) - var(--ring))"
              to="calc(var(--edge) - var(--gap))"
              top="7rem"
            />
          </div>
          <div className="qf-elev-focus-live" data-ring="outside" inert>
            <Checkbox label="Remember this device" defaultChecked />
            <Link href="#audit-log">View the audit log</Link>
          </div>
        </Group>
      </div>
    </Specimen>
  ),
};

/* ── The stacking order, checked ──────────────────────────────────────────── */

/** The order the layers must keep, bottom to top: what the components rely on. */
const ORDER = [
  "base",
  "sticky",
  "dropdown",
  "overlay",
  "modal",
  "popover",
  "toast",
  "tooltip",
  "spotlight",
  "skip-link",
];
const zOf = (name: string) => Number(LADDER.find((item) => item.name === name)?.light);
const OUT_OF_ORDER = ORDER.slice(1).filter((name, i) => !(zOf(name) > zOf(ORDER[i] ?? "")));
const UNPLACED = LADDER.filter((item) => !ORDER.includes(item.name));

function LayerCheck() {
  const fail = OUT_OF_ORDER.length > 0 || UNPLACED.length > 0;
  return (
    <p className="qf-check" data-fail={fail ? "" : undefined}>
      <CheckIcon size={16} aria-hidden />
      {fail
        ? `Out of order: ${[...OUT_OF_ORDER, ...UNPLACED.map((item) => item.name)].join(", ")}`
        : `All ${ORDER.length} layers in order: popovers above modals, tooltips above both, the skip link on top`}
    </p>
  );
}

/* ── Shadow anatomy ───────────────────────────────────────────────────────── */

/** The shadows that float, in rising order: each is built from two or three layers. */
const FLOATING = SHADOWS.filter((item) => item.name !== "inset");

/** One DTCG shadow layer as CSS, in the light colour it ships. */
function layerCss(layer: DtcgShadowLayer): string {
  const hex = layer.color.hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => Number.parseInt(hex.slice(i, i + 2), 16));
  return `${layer.inset ? "inset " : ""}${px(layer.offsetX)}px ${px(layer.offsetY)}px ${px(layer.blur)}px ${px(layer.spread)}px rgb(${r} ${g} ${b} / ${layer.color.alpha ?? 1})`;
}

/** What a layer does: a hairline edge (no blur), else the tight contact or the soft ambient one. */
function roleOf(layer: DtcgShadowLayer, layers: DtcgShadowLayer[]): string {
  if (px(layer.blur) === 0) return "Edge";
  const blurred = layers.filter((other) => px(other.blur) > 0);
  if (blurred.length < 2) return "Contact";
  return blurred.indexOf(layer) === 0 ? "Contact" : "Ambient";
}

/** Each floating shadow by where it's drawn. */
const ANATOMY_LABEL: Record<string, string> = {
  raised: "Cards at rest",
  "raised-hover": "Cards on hover",
  overlay: "Menus and popovers",
  modal: "Dialogs and drawers",
};

const numbers = (layer: DtcgShadowLayer) =>
  [
    px(layer.offsetY) ? `y ${px(layer.offsetY)}` : "",
    px(layer.blur) ? `blur ${px(layer.blur)}` : "",
    px(layer.spread) ? `spread ${px(layer.spread)}` : "",
    `${Math.round((layer.color.alpha ?? 1) * 100)}%`,
  ]
    .filter(Boolean)
    .join(" · ");

const Anatomy: Section = {
  id: "anatomy",
  name: "Anatomy",
  parameters: {
    docs: {
      description: {
        story:
          "Each shadow, layer by layer: a tight contact shadow, a soft ambient one, and a hairline edge.",
      },
    },
  },
  render: () => (
    <Specimen>
      {FLOATING.map((item) => {
        const layers = item.light as DtcgShadowLayer[];
        return (
          <Group
            key={item.path}
            label={ANATOMY_LABEL[item.name] ?? item.name}
            aside={<CopyToken value={item.cssVar} />}
          >
            <div className="qf-anatomy" style={vars({ "--qf-layers": layers.length })}>
              {layers.map((layer) => (
                <figure key={layerCss(layer)} className="qf-anatomy-tile">
                  <span className="qf-anatomy-surface" style={{ boxShadow: layerCss(layer) }} />
                  <figcaption>
                    <b>{roleOf(layer, layers)}</b>
                    <code>{numbers(layer)}</code>
                  </figcaption>
                </figure>
              ))}
              <span className="qf-anatomy-equals" aria-hidden="true">
                =
              </span>
              <figure className="qf-anatomy-tile" data-together="">
                <span className="qf-anatomy-surface" style={{ boxShadow: `var(${item.cssVar})` }} />
                <figcaption>
                  <b>Together</b>
                  <code>{item.name}</code>
                </figcaption>
              </figure>
            </div>
          </Group>
        );
      })}
    </Specimen>
  ),
};

/* ── In both schemes ──────────────────────────────────────────────────────── */

/** The surface each floating shadow is drawn on in product. */
const GROUND: Record<string, string> = {
  raised: "var(--qx-color-surface-raised)",
  "raised-hover": "var(--qx-color-surface-raised)",
  overlay: "var(--qx-color-surface-overlay)",
  modal: "var(--qx-color-surface-overlay)",
};

const Schemes: Section = {
  id: "schemes",
  name: "In both schemes",
  parameters: {
    docs: {
      description: {
        story:
          "The same shadows on a light and a dark canvas. In dark, each layer is also a step lighter, so height reads by tone as well.",
      },
    },
  },
  render: () => (
    <Specimen>
      <div className="qf-schemes">
        {(["light", "dark"] as const).map((scheme) => (
          <div key={scheme} className="qf-schemes-panel" data-qx-color-scheme={scheme}>
            <span className="qf-schemes-label">{scheme === "light" ? "Light" : "Dark"}</span>
            <div className="qf-schemes-tiles">
              {FLOATING.map((item) => (
                <span
                  key={item.path}
                  className="qf-schemes-tile"
                  style={{ boxShadow: `var(${item.cssVar})`, background: GROUND[item.name] }}
                >
                  {item.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Specimen>
  ),
};

export const sections: Section[] = [Shadows, Anatomy, Schemes, Borders, Layers, Opacity, FocusRing];
