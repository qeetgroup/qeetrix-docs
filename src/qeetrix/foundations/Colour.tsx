// Foundations › Colour: every colour role in @qeetrix/tokens, in light and dark, with the surface
// stack, the fills on their colours, data visualisation and measured contrast. Ported from
// qeetrix-story (stories/foundations/colour.stories.tsx); each story is a section.
import { StarIcon } from "@qeetrix/icons/icons/star";
import { Badge } from "@qeetrix/react";
import light from "@qeetrix/tokens/dtcg/light.tokens.json";
import {
  ColorValue,
  contrast,
  hexOf,
  ordered,
  ramp,
  type Scheme,
  sourceOf,
  type Token,
  TokenTable,
  tokens,
} from "./data";
import { CopyToken, Group, Ramp, type Section, Specimen } from "./kit";

/* ── What each role is for ────────────────────────────────────────────────── */

/** The package's own description wins; these say what the rest are for, in a few words. */
const DESCRIBED = (() => {
  const found = new Map<string, string>();
  const walk = (node: Record<string, unknown>, path: string[]) => {
    for (const [key, child] of Object.entries(node)) {
      if (key.startsWith("$") || typeof child !== "object" || child === null) continue;
      const next = [...path, key];
      const value = child as { $value?: unknown; $description?: string };
      if ("$value" in value) {
        if (value.$description) found.set(next.join("."), value.$description);
      } else walk(child as Record<string, unknown>, next);
    }
  };
  walk(light as unknown as Record<string, unknown>, []);
  return found;
})();

const ROLE_BOLD: Record<string, string> = {
  neutral: "secondary actions and toggles",
  brand: "the primary action",
  danger: "destructive actions",
  success: "positive status",
  warning: "caution status",
  info: "informational status",
};

const ROLE_SUBTLE: Record<string, string> = {
  neutral: "rows, chips and quiet hovers",
  brand: "brand highlights",
  danger: "error banners and badges",
  success: "success banners and badges",
  warning: "warning banners and badges",
  info: "info banners and badges",
};

const USAGE: Record<string, string> = {
  "color.surface.canvas": "The app background, behind every surface",
  "color.surface.default": "The page, and most content on it",
  "color.surface.raised": "Cards and panels that sit on the page",
  "color.surface.overlay": "Menus, popovers and dialogs",
  "color.surface.sunken": "Wells, code blocks and recessed areas",
  "color.surface.inverse": "Tooltips and inverse banners",
  "color.overlay.hover": "The hover tint over any surface",
  "color.overlay.pressed": "The pressed tint over any surface",
  "color.overlay.scrim": "Behind dialogs and drawers",
  "color.bg.selected": "Selected rows and items",
  "color.bg.selected-hover": "Hover on a selected row",
  "color.bg.disabled": "Disabled controls",
  "color.bg.input": "Text field backgrounds",
  "color.text.default": "Body text and headings",
  "color.text.subtle": "Secondary text and labels",
  "color.text.disabled": "Disabled text, exempt from contrast",
  "color.text.inverse": "Text on inverse surfaces",
  "color.text.brand": "Brand-coloured text",
  "color.text.link": "Links",
  "color.text.link-hover": "Links on hover",
  "color.icon.default": "Icons beside default text",
  "color.icon.subtle": "Quiet and decorative icons",
  "color.icon.brand": "Brand icons",
  "color.icon.inverse": "Icons on inverse surfaces",
  "color.icon.disabled": "Disabled icons",
  "color.icon.on-brand": "Icons on the brand fill",
  "color.icon.on-bold": "Icons on the danger, success and info fills",
  "color.border.default": "Control and card edges",
  "color.border.subtle": "Dividers and quiet edges",
  "color.border.strong": "Edges that must reach 3:1",
  "color.border.strong-hover": "Hover on a strong edge",
  "color.border.focus": "The focus frame",
  "color.border.brand": "Brand outlines",
  "color.border.selected": "Selected items",
  "color.border.disabled": "Disabled control edges",
  "color.dataviz.grid": "Chart grid lines",
  "color.dataviz.axis": "Chart axes",
  "color.dataviz.positive": "Gains and positive change",
  "color.dataviz.negative": "Losses and negative change",
  "color.dataviz.reference": "Reference and target lines",
  "color.dataviz.warning": "Thresholds a value is nearing",
};

const STATUS = ["danger", "success", "warning", "info"];

function usage(token: Token): string {
  const described = DESCRIBED.get(token.path) ?? USAGE[token.path];
  if (described) return described;
  const [, group, role, step] = token.path.split(".");
  if (group === "bg" && role && step) {
    if (step === "bold") return `Solid ${role} fill: ${ROLE_BOLD[role] ?? role}`;
    if (step === "subtle") return `Tinted ${role} background: ${ROLE_SUBTLE[role] ?? role}`;
    const state = step.endsWith("hover") ? "Hover" : "Pressed";
    return `${state} on the ${step.startsWith("bold") ? "bold" : "subtle"} ${role} fill`;
  }
  if ((group === "text" || group === "icon" || group === "border") && role && STATUS.includes(role))
    return `${role[0]?.toUpperCase()}${role.slice(1)} status ${group === "border" ? "outlines" : group}`;
  if (group === "code" && role) return `Code: ${role}`;
  if (group === "dataviz" && role === "categorical") return `Chart series ${step}`;
  return "";
}

/* ── The token list ───────────────────────────────────────────────────────── */

type Kind = "fill" | "text" | "icon" | "border" | "overlay";

const kindOf = (token: Token): Kind => {
  const group = token.path.split(".")[1];
  if (group === "text" || group === "code") return "text";
  if (group === "icon") return "icon";
  if (group === "border") return "border";
  if (group === "overlay" || group === "selection") return "overlay";
  return "fill";
};

/** Foreground made for another background is previewed on that background. */
const GROUND: Record<string, string> = {
  inverse: "var(--qx-color-surface-inverse)",
  "on-brand": "var(--qx-color-bg-brand-bold)",
  "on-bold": "var(--qx-color-bg-danger-bold)",
  "on-warning": "var(--qx-color-bg-warning-bold)",
};

/** One scheme's half of a preview, pinned with `data-qx-color-scheme`. */
function Half({ token, kind, scheme }: { token: Token; kind: Kind; scheme: Scheme }) {
  const value = `var(${token.cssVar})`;
  if (kind === "text" || kind === "icon")
    return (
      <span
        data-qx-color-scheme={scheme}
        className="qf-tone-half"
        data-sample={kind === "text" ? "" : undefined}
        style={{ color: value, background: GROUND[token.name] }}
      >
        {/* The sample is drawn by CSS: it's a picture of the colour, not text to read, and the
            Contrast section below measures every pair for real. */}
        {kind === "icon" && <StarIcon size={16} aria-hidden />}
      </span>
    );
  if (kind === "border")
    return (
      <span data-qx-color-scheme={scheme} className="qf-tone-half">
        <i className="qf-tone-edge" style={{ borderColor: value }} />
      </span>
    );
  return (
    <span
      data-qx-color-scheme={scheme}
      className="qf-tone-half"
      // A translucent token is drawn over its scheme's default surface, as in product.
      style={{
        background: `linear-gradient(${value}, ${value}), var(--qx-color-surface-default)`,
      }}
    />
  );
}

/** A token as it's used, in light and dark: a fill, "Aa" in the colour, an icon, or an edge. */
function Preview({ token }: { token: Token }) {
  const kind = kindOf(token);
  return (
    <span className="qf-tone" data-kind={kind} aria-hidden="true">
      <Half token={token} kind={kind} scheme="light" />
      <Half token={token} kind={kind} scheme="dark" />
    </span>
  );
}

/**
 * A family of colour tokens as aligned rows: preview, name and token, what it's for, and its light
 * and dark values. Every row has the same shape however many tokens a group has.
 */
function TokenList({
  caption,
  groups,
}: {
  caption: string;
  groups: Array<{ label?: string; items: Token[]; prefix?: string }>;
}) {
  return (
    <div className="qf-tokens-wrap">
      <table className="qf-tokens">
        <caption className="qf-sr-only">{caption}</caption>
        <thead>
          <tr>
            <th scope="col">
              <span className="qf-sr-only">Preview</span>
            </th>
            <th scope="col">Token</th>
            <th scope="col" className="qf-tokens-usage">
              Use it for
            </th>
            <th scope="col">Light</th>
            <th scope="col">Dark</th>
          </tr>
        </thead>
        {groups.map(({ label, items, prefix = "" }) => (
          <tbody key={label ?? items[0]?.path}>
            {label && (
              <tr className="qf-tokens-group">
                <th scope="colgroup" colSpan={5}>
                  {label}
                </th>
              </tr>
            )}
            {items.map((token) => (
              <tr key={token.path}>
                <td>
                  <Preview token={token} />
                </td>
                <th scope="row">
                  <span className="qf-tokens-token">
                    <span className="qf-tokens-name">
                      {prefix}
                      {token.name}
                      {token.tenant && (
                        <Badge tone="brand" size="sm">
                          Tenant
                        </Badge>
                      )}
                    </span>
                    <CopyToken value={token.cssVar} />
                  </span>
                </th>
                <td className="qf-tokens-usage">{usage(token)}</td>
                {(["light", "dark"] as const).map((scheme) => (
                  <td key={scheme}>
                    <ColorValue color={token[scheme]} />
                    {sourceOf(token.path, scheme) && (
                      <span className="qf-source">{sourceOf(token.path, scheme)}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </div>
  );
}

/* ── Surfaces ─────────────────────────────────────────────────────────────── */

const SURFACE_ORDER = ["canvas", "default", "raised", "overlay", "sunken", "inverse"];

/** Foreground and edges in reading order: the everyday roles first, then brand, status, on-colours. */
const FOREGROUND_ORDER = [
  "default",
  "subtle",
  "subtlest",
  "disabled",
  "brand",
  "link",
  "link-hover",
  "highlight",
  "danger",
  "warning",
  "success",
  "info",
  "inverse",
  "on-brand",
  "on-bold",
  "on-warning",
];

const BORDER_ORDER = [
  "default",
  "subtle",
  "strong",
  "strong-hover",
  "focus",
  "selected",
  "brand",
  "disabled",
  "danger",
  "warning",
  "success",
  "info",
];

/** How the surfaces stack in a console: canvas, then the page, a card on it, a menu over that. */
function SurfaceStack({ scheme }: { scheme: Scheme }) {
  return (
    <div className="qf-stack" data-qx-color-scheme={scheme}>
      <span className="qf-stack-label">{scheme === "light" ? "Light" : "Dark"} · canvas</span>
      <div className="qf-stack-page">
        <span className="qf-stack-label">default</span>
        <div className="qf-stack-card">
          <span className="qf-stack-label">raised</span>
          <div className="qf-stack-well">sunken</div>
        </div>
        <div className="qf-stack-menu">
          <span className="qf-stack-label">overlay</span>
        </div>
      </div>
    </div>
  );
}

const Surfaces: Section = {
  id: "surfaces",
  name: "Surfaces",
  parameters: {
    docs: {
      description: {
        story:
          "Where content sits: the page, cards, menus and wells, then the tints drawn over them.",
      },
    },
  },
  render: () => (
    <Specimen>
      <div className="qf-stacks">
        <SurfaceStack scheme="light" />
        <SurfaceStack scheme="dark" />
      </div>
      <TokenList
        caption="Surface and overlay colours"
        groups={[
          { label: "Surfaces", items: ordered(tokens("color.surface"), SURFACE_ORDER) },
          { label: "Overlays", items: [...tokens("color.overlay"), ...tokens("color.selection")] },
        ]}
      />
    </Specimen>
  ),
};

/* ── Fills ────────────────────────────────────────────────────────────────── */

const FILL_ROLES = ["neutral", "brand", "danger", "success", "warning", "info"] as const;

/** Each on-colour on the fill it is named for. */
const ON_FILLS: Array<[string, string, string]> = [
  ["bg-brand-bold", "text-on-brand", "Invite users"],
  ["bg-neutral-bold", "text-inverse", "Export"],
  ["bg-danger-bold", "text-on-bold", "Revoke key"],
  ["bg-success-bold", "text-on-bold", "Captured"],
  ["bg-info-bold", "text-on-bold", "Updated"],
  ["bg-warning-bold", "text-on-warning", "Expiring"],
];

const capital = (word: string) => `${word[0]?.toUpperCase()}${word.slice(1)}`;

const Fills: Section = {
  id: "fills",
  name: "Fills",
  parameters: {
    docs: {
      description: {
        story:
          "Backgrounds for controls and status: a bold and a subtle fill per role, each with hover and pressed.",
      },
    },
  },
  render: () => (
    <Specimen>
      <Group label="On their fills">
        <div className="qf-chip-row">
          {ON_FILLS.map(([fill, text, label]) => (
            <span
              key={fill}
              className="qf-oncolour"
              style={{ background: `var(--qx-color-${fill})`, color: `var(--qx-color-${text})` }}
            >
              {label}
            </span>
          ))}
        </div>
      </Group>
      <TokenList
        caption="Fill colours"
        groups={[
          ...FILL_ROLES.map((role) => ({
            label: capital(role),
            items: tokens(`color.bg.${role}`),
          })),
          {
            label: "Selected, disabled and input",
            items: tokens("color.bg").filter(
              (item) => !FILL_ROLES.some((role) => item.name.startsWith(`${role}.`)),
            ),
          },
        ]}
      />
    </Specimen>
  ),
};

/* ── Text and icons ───────────────────────────────────────────────────────── */

const TextAndIcons: Section = {
  id: "text-and-icons",
  name: "Text and icons",
  parameters: {
    docs: {
      description: {
        story:
          "Foreground roles, previewed as text and icons. Each meets its contrast minimum below.",
      },
    },
  },
  render: () => (
    <TokenList
      caption="Text, icon and code colours"
      groups={[
        { label: "Text", items: ordered(tokens("color.text"), FOREGROUND_ORDER) },
        { label: "Icons", items: ordered(tokens("color.icon"), FOREGROUND_ORDER) },
        { label: "Code", items: tokens("color.code") },
      ]}
    />
  ),
};

/* ── Borders ──────────────────────────────────────────────────────────────── */

const Borders: Section = {
  id: "borders",
  name: "Borders",
  parameters: {
    docs: {
      description: { story: "Dividers, control edges, the focus frame and status outlines." },
    },
  },
  render: () => (
    <TokenList
      caption="Border colours"
      groups={[{ items: ordered(tokens("color.border"), BORDER_ORDER) }]}
    />
  ),
};

/* ── Data visualisation ───────────────────────────────────────────────────── */

const CATEGORICAL = tokens("color.dataviz.categorical");

function Scale({ label, items }: { label: string; items: Token[] }) {
  return (
    <Group label={label} aside={`${items.length} steps`}>
      <div className="qf-scale">
        {items.map((item) => (
          <span key={item.path} title={item.cssVar} style={{ background: `var(${item.cssVar})` }} />
        ))}
      </div>
    </Group>
  );
}

/** Monthly sign-ins per product, for the specimen chart. */
const SIGN_INS = [92, 74, 61, 48, 40, 33, 25, 12];

const DataViz: Section = {
  id: "data-viz",
  name: "Data viz",
  parameters: {
    docs: {
      description: {
        story:
          "Categorical, sequential and diverging scales, and the chrome a chart draws around them.",
      },
    },
  },
  render: () => (
    <Specimen>
      <svg
        viewBox="0 0 320 112"
        className="qf-chart"
        role="img"
        aria-label="Monthly sign-ins for eight Qeet products, one categorical colour each"
      >
        {[30, 60, 90].map((y) => (
          <line
            key={y}
            x1="0"
            y1={110 - y}
            x2="320"
            y2={110 - y}
            stroke="var(--qx-color-dataviz-grid)"
          />
        ))}
        <line x1="0" y1="110" x2="320" y2="110" stroke="var(--qx-color-dataviz-axis)" />
        {SIGN_INS.map((value, index) => (
          <rect
            key={CATEGORICAL[index]?.path ?? index}
            x={8 + index * 39}
            y={110 - value}
            width="28"
            height={value}
            fill={`var(${CATEGORICAL[index]?.cssVar})`}
          />
        ))}
      </svg>
      <Scale label="Sequential" items={tokens("color.dataviz.sequential")} />
      <Scale label="Diverging" items={tokens("color.dataviz.diverging")} />
      <TokenList
        caption="Data visualisation colours"
        groups={[
          { label: "Categorical", items: CATEGORICAL, prefix: "categorical." },
          {
            label: "Marks and chrome",
            items: tokens("color.dataviz").filter(
              (item) => !/^(categorical|sequential|diverging)\./.test(item.name),
            ),
          },
        ]}
      />
    </Specimen>
  ),
};

/* ── Palette ──────────────────────────────────────────────────────────────── */

/** The primitive ramps, brand first: the values the roles above draw on. */
const RAMPS = [
  ["qeet", "Qeet orange"],
  ["graphite", "Graphite"],
  ["blue", "Blue"],
  ["green", "Green"],
  ["amber", "Amber"],
  ["red", "Red"],
] as const;

const Palette: Section = {
  id: "palette",
  name: "Palette",
  parameters: {
    docs: {
      description: {
        story:
          "The primitive ramps every role draws on. Reference only: in product, use the roles above.",
      },
    },
  },
  render: () => (
    <Specimen>
      {RAMPS.map(([name, label]) => {
        const steps = ramp(name);
        return (
          <Group key={name} label={label} aside={`${steps.length} steps`}>
            <Ramp name={name} steps={steps} />
          </Group>
        );
      })}
    </Specimen>
  ),
};

/* ── Contrast ─────────────────────────────────────────────────────────────── */

const SURFACES = [
  "color.surface.canvas",
  "color.surface.raised",
  "color.surface.overlay",
  "color.surface.sunken",
  "color.bg.neutral.subtle",
  "color.bg.neutral.subtle-hover",
] as const;

/** Text needs 4.5:1, control boundaries and the focus frame 3:1 (WCAG 1.4.3, 1.4.11). */
const MEASURED: Array<{ path: string; minimum: number; exempt?: boolean }> = [
  ...tokens("color.text")
    .filter((item) => !item.name.startsWith("on-") && item.name !== "inverse")
    .map((item) => ({ path: item.path, minimum: 4.5, exempt: item.name === "disabled" })),
  ...["strong", "focus", "brand", "danger", "success", "warning", "info"].map((name) => ({
    path: `color.border.${name}`,
    minimum: 3,
  })),
];

function Ratio({ ratio, minimum, exempt }: { ratio: number; minimum: number; exempt?: boolean }) {
  if (exempt)
    return (
      <span className="qf-ratio" data-exempt="">
        {ratio.toFixed(2)}
      </span>
    );
  return ratio < minimum ? (
    <span className="qf-ratio" data-fail="">
      {ratio.toFixed(2)} ✕
    </span>
  ) : (
    <span className="qf-ratio">{ratio.toFixed(2)}</span>
  );
}

/** How many required pairs pass in a scheme; disabled text is exempt (WCAG 1.4.3). */
function passing(scheme: Scheme): string {
  const required = MEASURED.filter((item) => !item.exempt).flatMap(({ path, minimum }) =>
    SURFACES.map((surface) => contrast(hexOf(path, scheme), hexOf(surface, scheme)) >= minimum),
  );
  const passed = required.filter(Boolean).length;
  return passed === required.length
    ? `All ${required.length} required pairs pass`
    : `${passed} of ${required.length} required pairs pass`;
}

function ContrastTable({ scheme }: { scheme: Scheme }) {
  return (
    <TokenTable
      caption={`Contrast against each surface, ${scheme} scheme`}
      columns={[
        "Token",
        "Min",
        ...SURFACES.map((path) => path.replace(/^color\.(surface|bg)\./, "")),
      ]}
      rows={MEASURED.map(({ path, minimum, exempt }) => ({
        token: path.replace(/^color\./, ""),
        cells: [
          exempt ? "Exempt" : `${minimum}`,
          ...SURFACES.map((surface) => (
            <Ratio
              key={surface}
              exempt={exempt}
              minimum={minimum}
              ratio={contrast(hexOf(path, scheme), hexOf(surface, scheme))}
            />
          )),
        ],
      }))}
    />
  );
}

const Contrast: Section = {
  id: "contrast",
  name: "Contrast",
  parameters: {
    docs: {
      description: {
        story:
          "WCAG 2.2 ratios, computed from the token values. A pair below its minimum shows in red; disabled text is exempt.",
      },
    },
  },
  render: () => (
    <Specimen>
      <Group label="Light" aside={passing("light")}>
        <ContrastTable scheme="light" />
      </Group>
      <Group label="Dark" aside={passing("dark")}>
        <ContrastTable scheme="dark" />
      </Group>
    </Specimen>
  ),
};

export const sections: Section[] = [
  Surfaces,
  Fills,
  TextAndIcons,
  Borders,
  DataViz,
  Palette,
  Contrast,
];
