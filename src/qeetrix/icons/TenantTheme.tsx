// Icons › Brand › Tenant theme, in the browser: type or pick a tenant's colour and brandTheme() turns
// it into the 18 brand tokens for light and dark; a hosted sign-in re-themes in both, the contrast
// each pair guarantees is checked, and the stylesheet is there to copy. An island: the server hands
// it the roles and Qeet's own values (Brand.tsx), so the token data stays on the server. Ported from
// qeetrix-story (stories/foundations/brand.stories.tsx).
import { Badge, Button, Field, Link, Switch, Text, VisuallyHidden } from "@qeetrix/react";
import { ColorField, CopyButton } from "@qeetrix/react/experimental";
import { type BrandTheme, brandTheme, type TenantToken } from "@qeetrix/tokens";
import { type CSSProperties, useState } from "react";
import { Group, Specimen } from "../foundations/kit";
import {
  type Cell,
  hexOfCss,
  type Role,
  RoleList,
  ratio,
  SCHEMES,
  type Scheme,
  sixDigit,
} from "./brand-roles";

const DEFAULT_TENANT = "#1a73e8";

/** Brand colours a tenant might bring, covering each rule brandTheme() applies: domain data. */
const PRESETS = [
  { name: "Blue", hex: "#1a73e8" },
  { name: "Violet", hex: "#7c3aed" },
  { name: "Rose", hex: "#e11d48" },
  { name: "Teal", hex: "#0d9488" },
  { name: "Yellow", hex: "#facc15" },
];

interface Check {
  name: string;
  fg: TenantToken;
  /** A tenant token, or a surface: "surface.default" or "surface.canvas". */
  bg: string;
  minimum: number;
  kind: "text" | "ring";
}

/** Pairs brandTheme() guarantees, each with its WCAG minimum (1.4.3 text, 1.4.11 the ring). */
const CHECKS: Check[] = [
  {
    name: "Label on fill",
    fg: "--qx-color-text-on-brand",
    bg: "--qx-color-bg-brand-bold",
    minimum: 4.5,
    kind: "text",
  },
  {
    name: "Label on hover",
    fg: "--qx-color-text-on-brand",
    bg: "--qx-color-bg-brand-bold-hover",
    minimum: 4.5,
    kind: "text",
  },
  {
    name: "Brand text on tint",
    fg: "--qx-color-text-brand",
    bg: "--qx-color-bg-brand-subtle",
    minimum: 4.5,
    kind: "text",
  },
  {
    name: "Link on surface",
    fg: "--qx-color-text-link",
    bg: "surface.default",
    minimum: 4.5,
    kind: "text",
  },
  {
    name: "Focus on canvas",
    fg: "--qx-color-border-focus",
    bg: "surface.canvas",
    minimum: 3,
    kind: "ring",
  },
  {
    name: "Focus on selected",
    fg: "--qx-color-border-focus",
    bg: "--qx-color-bg-selected",
    minimum: 3,
    kind: "ring",
  },
];

const shortName = (name: string) => name.replace(/^(--qx-color-|color\.)/, "").replaceAll(".", "-");
const schemeName = (scheme: Scheme) => (scheme === "light" ? "Light" : "Dark");

/** Custom properties as a style object; React sets each with setProperty. */
const asStyle = (vars: Record<string, string>) => vars as unknown as CSSProperties;

function ContrastCheck({
  check,
  values,
  surfaces,
}: {
  check: Check;
  values: BrandTheme;
  surfaces: Surfaces;
}) {
  const pairs = SCHEMES.map((scheme) => {
    const fg = values[scheme][check.fg];
    const bg = check.bg.startsWith("--")
      ? values[scheme][check.bg as TenantToken]
      : surfaces[scheme][check.bg as keyof Surfaces[Scheme]];
    return { scheme, fg, bg, value: ratio(fg, bg) };
  });
  return (
    <div className="qf-brand-check">
      <div className="qf-brand-check-tile" aria-hidden="true">
        {pairs.map(({ scheme, fg, bg, value }) => (
          <span
            key={scheme}
            data-qx-color-scheme={scheme}
            data-fail={value < check.minimum ? "" : undefined}
            className="qf-brand-check-half"
            style={check.kind === "text" ? { background: bg, color: fg } : { background: bg }}
          >
            {check.kind === "text" ? (
              <span className="qf-brand-check-aa">Aa</span>
            ) : (
              <i className="qf-brand-check-ring" style={{ outlineColor: fg }} />
            )}
            <span className="qf-brand-check-ratio">
              {value.toFixed(2)}
              {value < check.minimum ? " ✕" : ""}
            </span>
          </span>
        ))}
      </div>
      <div className="qf-brand-check-meta">
        <span className="qf-brand-check-head">
          <span className="qf-brand-check-name">{check.name}</span>
          <span className="qf-brand-check-min">min {check.minimum}:1</span>
        </span>
        <code className="qf-brand-check-pair">
          {shortName(check.fg)} on {shortName(check.bg)}
        </code>
        <VisuallyHidden>
          {pairs.map(({ scheme, value }) => `${scheme} ${value.toFixed(2)}:1`).join(", ")}
        </VisuallyHidden>
      </div>
    </div>
  );
}

/** What brandTheme() did with the colour, in one line. */
function verdict(input: string, theme: BrandTheme | null): string {
  if (!theme) return "Not a colour yet, so Qeet's own brand stays.";
  if (theme.light["--qx-color-text-on-brand"] !== "oklch(1 0 0)")
    return "A light colour: labels on it turn near-black, as white would fall below 4.5:1.";
  const fill = hexOfCss(theme.light["--qx-color-bg-brand-bold"]);
  const given = sixDigit(input) ?? fill;
  const channel = (hex: string, at: number) => Number.parseInt(hex.slice(at, at + 2), 16);
  const moved = [1, 3, 5].some((at) => Math.abs(channel(fill, at) - channel(given, at)) > 1);
  return moved
    ? `White labels, on ${fill}: the colour darkened until white reaches 4.5:1.`
    : "White labels, on the colour as given.";
}

function themeFor(hex: string): { theme: BrandTheme | null; error?: string } {
  try {
    return { theme: brandTheme(hex.trim()) };
  } catch {
    return { theme: null, error: "Enter a colour as #rgb or #rrggbb, e.g. #1a73e8." };
  }
}

const declarations = (vars: Record<string, string>) =>
  Object.entries(vars)
    .map(([name, value]) => `  ${name}: ${value};`)
    .join("\n");

/** The stylesheet an app would render after tokens.css, as the tokens README shows. */
const cssFor = (theme: BrandTheme) =>
  `:root,\n[data-qx-color-scheme="light"] {\n${declarations(theme.light)}\n}\n\n[data-qx-color-scheme="dark"] {\n${declarations(theme.dark)}\n}\n`;

/** A hosted sign-in in one scheme, with the tenant's variables on its root. */
function TenantPane({ scheme, theme }: { scheme: Scheme; theme: BrandTheme | null }) {
  return (
    <div
      data-qx-color-scheme={scheme}
      data-tenant={scheme}
      style={theme ? asStyle(theme[scheme]) : undefined}
      className="qf-brand-pane"
    >
      <div className="qf-brand-pane-head">
        <span className="qf-brand-monogram" aria-hidden="true">
          A
        </span>
        <span className="qf-brand-pane-org">Acme Pvt Ltd</span>
        <span className="qf-brand-pane-scheme">{schemeName(scheme)}</span>
      </div>
      <span className="qf-brand-pane-title">
        <Text size="lg" weight="semibold">
          Sign in
        </Text>
        <Badge tone="brand">SSO</Badge>
      </span>
      <Switch label="Remember this device" defaultChecked />
      <Button fullWidth>Continue with a passkey</Button>
      <Link href="#recovery" onClick={(event) => event.preventDefault()}>
        Use a recovery code
      </Link>
    </div>
  );
}

type Surfaces = Record<Scheme, { "surface.default": string; "surface.canvas": string }>;

export default function TenantTheme({
  roles,
  qeet,
  surfaces,
}: {
  roles: Role[];
  qeet: BrandTheme;
  surfaces: Surfaces;
}) {
  const [hex, setHex] = useState(DEFAULT_TENANT);
  const { theme, error } = themeFor(hex);
  // Empty is Qeet's own brand, chosen with the field's reset: no error for it.
  const shown = hex.trim() === "" ? undefined : error;
  const values = theme ?? qeet;
  const cell = (role: Role, scheme: Scheme): Cell => {
    const css = values[scheme][role.cssVar as TenantToken];
    return { css, label: hexOfCss(css), title: css };
  };
  return (
    <Specimen>
      <div className="qf-brand-controls">
        <Field label="Tenant colour" error={shown} className="qf-brand-field">
          <ColorField
            value={hex}
            onValueChange={setHex}
            suggestions={PRESETS.map((item) => ({ value: item.hex, label: item.name }))}
            resetLabel="Use Qeet Ember"
            spellCheck={false}
          />
        </Field>
      </div>
      <Group label="Preview" aside={verdict(hex, theme)}>
        <div className="qf-brand-panes">
          {SCHEMES.map((scheme) => (
            <TenantPane key={scheme} scheme={scheme} theme={theme} />
          ))}
        </div>
      </Group>
      <Group label="Contrast it guarantees" aside="WCAG 2.2, computed from the values below">
        <div className="qf-brand-checks">
          {CHECKS.map((check) => (
            <ContrastCheck key={check.name} check={check} values={values} surfaces={surfaces} />
          ))}
        </div>
      </Group>
      <Group
        label={`The ${roles.length} tokens it returns`}
        aside={
          <CopyButton value={theme ? cssFor(theme) : ""} disabled={!theme} size="sm" variant="soft">
            Copy CSS
          </CopyButton>
        }
      >
        <RoleList
          caption="The tenant tokens brandTheme() returned, light and dark"
          roles={roles.map((role) => ({ ...role, use: undefined }))}
          cells={cell}
          fill={(scheme) => values[scheme]["--qx-color-bg-brand-bold"]}
        />
      </Group>
    </Specimen>
  );
}
