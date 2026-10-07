import tokens from "@qeetrix/ui/tokens.json";
import type { CSSProperties, ReactNode } from "react";
import generated from "@/lib/token-utilities.json";

/**
 * The Foundations pages' token views. Every value comes from `@qeetrix/ui/tokens.json` (resolved
 * per theme) at build time, and every utility from the installed stylesheet's theme (see
 * scripts/generate-tokens.mjs), so the pages show what the library ships. Swatches and shadows use
 * the literal value for each theme, so both are visible whichever theme the reader is in.
 */

type Tree = { [key: string]: string | Tree };
const { light, dark } = tokens as unknown as { light: Tree; dark: Tree };
const { utilities, theme } = generated as {
  utilities: Record<string, string[]>;
  theme: string[];
};

function at(tree: Tree, path: string): Tree {
  return path.split(".").reduce<Tree>((node, key) => node[key] as Tree, tree);
}

function leaves(tree: Tree): [string, string][] {
  return Object.entries(tree).filter(
    (entry): entry is [string, string] => typeof entry[1] === "string",
  );
}

/** Theme namespace → the Tailwind utility prefix that reads it. */
const PREFIX: Record<string, string> = {
  color: "bg",
  text: "text",
  shadow: "shadow",
  ease: "ease",
  duration: "duration",
  font: "font",
  radius: "rounded",
};

function utilitiesFor(variable: string): string[] {
  const names = (utilities[variable] ?? []).flatMap((name) => {
    const namespace = Object.keys(PREFIX).find((ns) =>
      name.startsWith(`${ns}-`),
    );
    return namespace
      ? [`${PREFIX[namespace]}-${name.slice(namespace.length + 1)}`]
      : [];
  });
  return [...new Set(names)];
}

function Utilities({ variable }: { variable: string }) {
  const names = utilitiesFor(variable);
  return names.length ? (
    <span className="flex flex-wrap gap-1">
      {names.map((name) => (
        <code key={name}>{name}</code>
      ))}
    </span>
  ) : (
    <span className="text-fd-muted-foreground">—</span>
  );
}

function Table({ head, children }: { head: string[]; children: ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table>
        <thead>
          <tr>
            {head.map((cell) => (
              <th key={cell}>{cell}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

function Swatch({ value }: { value: string }) {
  return (
    <span className="flex items-center gap-2 whitespace-nowrap">
      <span
        className="inline-block size-6 shrink-0 rounded-md border border-black/10 dark:border-white/15"
        style={{ background: value }}
      />
      <code className="text-xs">{value}</code>
    </span>
  );
}

// ---------------------------------------------------------------------------------------------
// Colour

/** One semantic colour group (`text`, `surface`, …): each role in both themes. */
export function ColorTokens({ group }: { group: string }) {
  const darkGroup = at(dark, `color.${group}`);
  return (
    <Table head={["Role", "Light", "Dark", "CSS variable", "Tailwind"]}>
      {leaves(at(light, `color.${group}`)).map(([role, value]) => {
        const variable = `qx-color-${group}-${role}`;
        return (
          <tr key={role}>
            <td>{role}</td>
            <td>
              <Swatch value={value} />
            </td>
            <td>
              <Swatch value={darkGroup[role] as string} />
            </td>
            <td>
              <code>{`--${variable}`}</code>
            </td>
            <td>
              <Utilities variable={variable} />
            </td>
          </tr>
        );
      })}
    </Table>
  );
}

/** Primitive colour ramps, step by step. */
export function Palette({ ramps }: { ramps: string[] }) {
  return (
    <div className="not-prose my-6 flex flex-col gap-4">
      {ramps.map((ramp) => (
        <div key={ramp}>
          <p className="mb-1.5 font-medium text-sm">{ramp}</p>
          <div className="flex overflow-hidden rounded-lg border">
            {leaves(at(light, `color.${ramp}`)).map(([step, value]) => (
              <div
                key={step}
                className="min-w-0 flex-1"
                title={`--qx-color-${ramp}-${step}: ${value}`}
              >
                <div className="h-10" style={{ background: value }} />
                <p className="py-1 text-center font-mono text-[10px] text-fd-muted-foreground">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------------------------
// Typography

const SAMPLE: Record<string, string> = {
  display: "Identity for every Qeet product",
  title: "Invite your team",
  heading: "Security settings",
  body: "Passkeys replace passwords on every device your team signs in from.",
  label: "Work email",
  "label-compact": "Region",
  caption: "Last signed in 2 hours ago from Mumbai",
  micro: "BETA",
  code: "qk_live_7Fd2…",
};

function cssProps(role: Tree): CSSProperties {
  return {
    fontFamily: role["font-family"] as string,
    fontSize: role["font-size"] as string,
    fontWeight: role["font-weight"] as string,
    lineHeight: role["line-height"] as string,
    letterSpacing: role["letter-spacing"] as string,
  };
}

/** The typography roles, each set in its own style. */
export function TypeRoles() {
  return (
    <div className="not-prose my-6 flex flex-col divide-y rounded-lg border">
      {Object.entries(at(light, "typography")).map(([name, value]) => {
        const role = value as Tree;
        return (
          <div key={name} className="flex flex-col gap-2 p-4">
            <p style={cssProps(role)} className="text-fd-foreground">
              {SAMPLE[name] ?? name}
            </p>
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-fd-muted-foreground text-xs">
              <span className="font-medium text-fd-foreground">{name}</span>
              <span>
                {role["font-size"] as string} / {role["line-height"] as string}{" "}
                · weight {role["font-weight"] as string}
              </span>
              <code>{`--qx-typography-${name}-*`}</code>
              {utilitiesFor(`qx-typography-${name}-font-size`).map(
                (utility) => (
                  <code key={utility}>{utility}</code>
                ),
              )}
            </p>
          </div>
        );
      })}
    </div>
  );
}

/** The font families, with their Tailwind utility where the theme defines one. */
export function FontFamilies() {
  return (
    <Table head={["Family", "Sample", "Stack", "Tailwind"]}>
      {leaves(at(light, "font.family")).map(([name, stack]) => (
        <tr key={name}>
          <td>{name}</td>
          <td>
            <span style={{ fontFamily: stack }} className="text-lg">
              Qeet ID
            </span>
          </td>
          <td>
            <code className="text-xs">{stack}</code>
          </td>
          <td>
            {theme.includes(`font-${name}`) ? (
              <code>{`font-${name}`}</code>
            ) : (
              <span className="text-fd-muted-foreground">—</span>
            )}
          </td>
        </tr>
      ))}
    </Table>
  );
}

// ---------------------------------------------------------------------------------------------
// Space and corners

/** The primitive spacing scale. */
export function SpaceScale() {
  return (
    <Table head={["Step", "Value", "", "Variable (tokens.css)"]}>
      {leaves(at(light, "space")).map(([step, value]) => (
        <tr key={step}>
          <td>{step}</td>
          <td>
            <code>{value}</code>
          </td>
          <td>
            <span
              className="block h-3 rounded-sm bg-fd-primary"
              style={{ width: value }}
            />
          </td>
          <td>
            <code>{`--qx-space-${step}`}</code>
          </td>
        </tr>
      ))}
    </Table>
  );
}

/** The corner roles, drawn with the live `--qx-corner-*` variable. */
export function CornerTokens() {
  return (
    <div className="not-prose my-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {leaves(at(light, "corner")).map(([role, value]) => (
        <div key={role} className="flex flex-col gap-2">
          <div
            className="h-16 border-2 border-fd-primary/60 bg-fd-primary/10"
            style={{ borderRadius: `var(--qx-corner-${role})` }}
          />
          <p className="font-medium text-sm">{role}</p>
          <p className="font-mono text-fd-muted-foreground text-xs">{`--qx-corner-${role}`}</p>
          <p className="font-mono text-fd-muted-foreground text-xs">{value}</p>
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------------------------
// Elevation

/** The elevation roles, on a light and a dark surface. */
export function ElevationTokens() {
  const darkElevation = at(dark, "elevation");
  const lightCanvas = at(light, "color.surface").canvas as string;
  const darkCanvas = at(dark, "color.surface").canvas as string;
  const lightCard = at(light, "color.surface").default as string;
  const darkCard = at(dark, "color.surface").default as string;
  return (
    <div className="not-prose my-6 flex flex-col gap-3">
      {leaves(at(light, "elevation")).map(([role, value]) => (
        <div
          key={role}
          className="grid items-center gap-3 sm:grid-cols-[10rem_1fr_1fr]"
        >
          <div className="flex flex-col gap-1">
            <p className="font-medium text-sm">{role}</p>
            <code className="text-fd-muted-foreground text-xs">{`--qx-elevation-${role}`}</code>
            <span className="text-xs">
              <Utilities variable={`qx-elevation-${role}`} />
            </span>
          </div>
          <div className="rounded-lg p-5" style={{ background: lightCanvas }}>
            <div
              className="h-12 rounded-md"
              style={{ background: lightCard, boxShadow: value }}
            />
          </div>
          <div className="rounded-lg p-5" style={{ background: darkCanvas }}>
            <div
              className="h-12 rounded-md"
              style={{
                background: darkCard,
                boxShadow: darkElevation[role] as string,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------------------------
// Motion

function EasingCurve({ value }: { value: string }) {
  const points = /cubic-bezier\(([^)]+)\)/
    .exec(value)?.[1]
    .split(",")
    .map(Number) ?? [0, 0, 1, 1];
  const [x1, y1, x2, y2] = points;
  return (
    <svg
      viewBox="-0.05 -0.05 1.1 1.1"
      className="size-10 shrink-0 overflow-visible"
      aria-hidden
    >
      <rect
        x="0"
        y="0"
        width="1"
        height="1"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.15"
        strokeWidth="0.02"
      />
      <path
        d={`M0,1 C${x1},${1 - y1} ${x2},${1 - y2} 1,0`}
        fill="none"
        stroke="var(--color-fd-primary)"
        strokeWidth="0.06"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Motion durations and easings. */
export function MotionTokens({ kind }: { kind: "duration" | "easing" }) {
  return (
    <Table
      head={
        kind === "duration"
          ? ["Role", "Value", "CSS variable", "Tailwind"]
          : ["Role", "Curve", "Value", "CSS variable", "Tailwind"]
      }
    >
      {leaves(at(light, `motion.${kind}`)).map(([role, value]) => {
        const variable = `qx-motion-${kind}-${role}`;
        return (
          <tr key={role}>
            <td>{role}</td>
            {kind === "easing" && (
              <td>
                <EasingCurve value={value} />
              </td>
            )}
            <td>
              <code>{value}</code>
            </td>
            <td>
              <code>{`--${variable}`}</code>
            </td>
            <td>
              <Utilities variable={variable} />
            </td>
          </tr>
        );
      })}
    </Table>
  );
}
