// Icons › Brand: the Qeet logo and its files, how to use it, the brand orange and the roles it feeds,
// a tenant's own colour through brandTheme(), and the identity icons. Ported from qeetrix-story
// (stories/foundations/brand.stories.tsx); each story is a section, and the logo's files and its
// do-and-don't are the docs' own. Renders to HTML; the tenant theme is an island (TenantTheme.tsx),
// fed the roles and Qeet's own values from here.
import { QeetLogo, QeetWordmarkLogo } from "@qeetrix/icons";
import { BuildingComplexIcon } from "@qeetrix/icons/icons/building-complex";
import { CheckIcon } from "@qeetrix/icons/icons/check";
import { CircleCheckIcon } from "@qeetrix/icons/icons/circle-check";
import { CircleXIcon } from "@qeetrix/icons/icons/circle-x";
import { CopyIcon } from "@qeetrix/icons/icons/copy";
import { DownloadIcon } from "@qeetrix/icons/icons/download";
import { FingerprintPatternIcon } from "@qeetrix/icons/icons/fingerprint-pattern";
import { KeyRoundIcon } from "@qeetrix/icons/icons/key-round";
import { MonitorSmartphoneIcon } from "@qeetrix/icons/icons/monitor-smartphone";
import { PlugIcon } from "@qeetrix/icons/icons/plug";
import { RefreshCwIcon } from "@qeetrix/icons/icons/refresh-cw";
import { ScrollTextIcon } from "@qeetrix/icons/icons/scroll-text";
import { ShieldCheckIcon } from "@qeetrix/icons/icons/shield-check";
import { UserGroupIcon } from "@qeetrix/icons/icons/user-group";
import { WebhookIcon } from "@qeetrix/icons/icons/webhook";
import { Badge } from "@qeetrix/react";
import type { BrandTheme } from "@qeetrix/tokens";
import { TENANT_TOKENS } from "@qeetrix/tokens";
import type { CSSProperties, ReactNode } from "react";
import {
  contrast,
  type DtcgColor,
  hexOf,
  ramp,
  resolve,
  type Token,
  tokens,
} from "../foundations/data";
import {
  CopyToken,
  Group,
  Ramp,
  type Section,
  Specimen,
  SpecimenRow,
  SpecimenRows,
} from "../foundations/kit";
import {
  BRAND_GROUPS,
  type Cell,
  kindOf,
  type Role,
  RoleList,
  SCHEMES,
  type Scheme,
} from "./brand-roles";
import { fileOf } from "./logo-files";

/** Custom properties as a style object; React sets each with setProperty. */
const asStyle = (vars: Record<string, string>) => vars as unknown as CSSProperties;

/* ── Logo ─────────────────────────────────────────────────────────────────── */

/** Clear space on every side: a quarter of the logo's height. */
const clearOf = (height: number) => asStyle({ "--qf-brand-clear": `${height / 4}px` });

/** A logo file to take away: its SVG to copy (copy.ts fetches it), or the file itself. */
function FileActions({ logo, variant }: { logo: string; variant: string }) {
  const file = fileOf(logo, variant);
  if (!file) return null;
  return (
    <span className="qf-brand-files">
      <button
        type="button"
        className="qf-copy-token"
        data-copy-file={file.href}
        aria-label={`Copy ${file.file}.svg`}
        title={`Copy ${file.file}.svg`}
      >
        <CopyIcon size={12} aria-hidden />
        <code>SVG</code>
        <CheckIcon size={12} aria-hidden className="qf-copied-mark" />
      </button>
      <a
        className="qf-copy-token"
        href={file.href}
        download={`${file.file}.svg`}
        aria-label={`Download ${file.file}.svg`}
        title={`Download ${file.file}.svg`}
      >
        <DownloadIcon size={12} aria-hidden />
        <code>{file.file}.svg</code>
      </a>
    </span>
  );
}

function LogoTile({
  scheme,
  name,
  code,
  label,
  height,
  logo,
  variant,
  children,
}: {
  scheme: Scheme;
  name: string;
  /** The JSX to copy. */
  code: string;
  /** What the copy button shows. */
  label: string;
  height: number;
  logo: string;
  variant: string;
  children: ReactNode;
}) {
  return (
    <div className="qf-brand-logo">
      <div className="qf-brand-stage" data-qx-color-scheme={scheme}>
        <span className="qf-brand-clear" style={clearOf(height)}>
          {children}
        </span>
      </div>
      <div className="qf-brand-caption">
        <span className="qf-brand-caption-name">{name}</span>
        <CopyToken value={code} label={label} />
        <FileActions logo={logo} variant={variant} />
      </div>
    </div>
  );
}

const MARK = 80;
const WORDMARK = 36;

const WORDMARKS = [
  ["plain", "light", "Plain, on light"],
  ["plain-dark", "dark", "Plain, on dark"],
  ["default", "light", "Tile, on light"],
  ["dark", "dark", "Tile, on dark"],
] as const;

/** The logo at each size it may be drawn, the minimum first. */
function Ladder({ sizes, children }: { sizes: number[]; children: (height: number) => ReactNode }) {
  return (
    <div className="qf-brand-ladder">
      {sizes.map((size, index) => (
        <div key={size} className="qf-brand-rung" data-min={index === 0 ? "" : undefined}>
          {children(size)}
          <span className="qf-brand-rung-size">
            {size}px{index === 0 ? " · min" : ""}
          </span>
        </div>
      ))}
    </div>
  );
}

const Logo: Section = {
  id: "logo",
  name: "Logo",
  parameters: {
    docs: {
      description: {
        story:
          "QeetLogo and QeetWordmarkLogo, from @qeetrix/icons. Pick the file drawn for the background; copy its SVG or download it.",
      },
    },
  },
  render: () => (
    <Specimen>
      <Group label="Mark" aside="Hatched: clear space, a quarter of the logo's height">
        <div className="qf-brand-logos">
          <LogoTile
            scheme="light"
            name="On light"
            code="<QeetLogo />"
            label="<QeetLogo />"
            height={MARK}
            logo="QeetLogo"
            variant="default"
          >
            <QeetLogo height={MARK} />
          </LogoTile>
          <LogoTile
            scheme="dark"
            name="On dark"
            code={'<QeetLogo variant="dark" />'}
            label={'variant="dark"'}
            height={MARK}
            logo="QeetLogo"
            variant="dark"
          >
            <QeetLogo variant="dark" height={MARK} />
          </LogoTile>
        </div>
      </Group>
      <Group label="Wordmark">
        <div className="qf-brand-logos" data-columns="4">
          {WORDMARKS.map(([variant, scheme, name]) => (
            <LogoTile
              key={variant}
              scheme={scheme}
              name={name}
              code={`<QeetWordmarkLogo variant="${variant}" />`}
              label={`variant="${variant}"`}
              height={WORDMARK}
              logo="QeetWordmarkLogo"
              variant={variant}
            >
              <QeetWordmarkLogo variant={variant} height={WORDMARK} />
            </LogoTile>
          ))}
        </div>
      </Group>
      <Group label="Minimum size" aside="Below the wordmark's minimum, use the mark">
        <SpecimenRows>
          <SpecimenRow token="QeetLogo" meta="16px min · 24px default">
            <Ladder sizes={[16, 24, 32, 48]}>
              {(height) => (
                <>
                  <QeetLogo height={height} className="qf-brand-on-light" />
                  <QeetLogo variant="dark" height={height} className="qf-brand-on-dark" />
                </>
              )}
            </Ladder>
          </SpecimenRow>
          <SpecimenRow token="QeetWordmarkLogo" meta="20px min, plain">
            <Ladder sizes={[20, 24, 32, 48]}>
              {(height) => (
                <>
                  <QeetWordmarkLogo variant="plain" height={height} className="qf-brand-on-light" />
                  <QeetWordmarkLogo
                    variant="plain-dark"
                    height={height}
                    className="qf-brand-on-dark"
                  />
                </>
              )}
            </Ladder>
          </SpecimenRow>
        </SpecimenRows>
      </Group>
    </Specimen>
  ),
};

/* ── Do and don't: the logo as drawn, on its background, with its room ──── */

/** A stage in one scheme, for a rule's case: the logo on the background the rule is about. */
const OnScheme = ({ scheme, children }: { scheme: Scheme; children: ReactNode }) => (
  <span className="qf-brand-rule-stage" data-qx-color-scheme={scheme}>
    {children}
  </span>
);

const LOGO_RULES: Array<{
  title: string;
  doLine: string;
  dontLine: string;
  doIt: ReactNode;
  dontIt: ReactNode;
}> = [
  {
    title: "The file drawn for its background",
    doLine: "On dark, the dark file.",
    dontLine: "The light file on dark: its black bowl disappears.",
    doIt: (
      <OnScheme scheme="dark">
        <QeetLogo variant="dark" height={48} />
      </OnScheme>
    ),
    dontIt: (
      <OnScheme scheme="dark">
        <QeetLogo height={48} />
      </OnScheme>
    ),
  },
  {
    title: "Its own shape",
    doLine: "At its own proportions.",
    dontLine: "Stretched, squeezed or turned.",
    doIt: (
      <OnScheme scheme="light">
        <QeetWordmarkLogo variant="plain" height={32} />
      </OnScheme>
    ),
    dontIt: (
      <OnScheme scheme="light">
        <QeetWordmarkLogo variant="plain" height={32} className="qf-brand-wrong-stretch" />
      </OnScheme>
    ),
  },
  {
    title: "Its own colour",
    doLine: "Qeet orange, as the file draws it.",
    dontLine: "Recoloured, shadowed or outlined.",
    doIt: (
      <OnScheme scheme="light">
        <QeetLogo height={48} />
      </OnScheme>
    ),
    dontIt: (
      <OnScheme scheme="light">
        <QeetLogo height={48} className="qf-brand-wrong-colour" />
      </OnScheme>
    ),
  },
  {
    title: "Room around it",
    doLine: "Clear space of a quarter of its height, at least.",
    dontLine: "Crowded by the words next to it.",
    doIt: (
      <OnScheme scheme="light">
        <span className="qf-brand-lockup">
          <QeetWordmarkLogo variant="plain" height={24} />
          <span className="qf-brand-lockup-text">Console</span>
        </span>
      </OnScheme>
    ),
    dontIt: (
      <OnScheme scheme="light">
        <span className="qf-brand-lockup" data-crowded="">
          <QeetWordmarkLogo variant="plain" height={24} />
          <span className="qf-brand-lockup-text">Console</span>
        </span>
      </OnScheme>
    ),
  },
];

const LogoRules: Section = {
  id: "logo-rules",
  name: "Do and don't",
  parameters: {
    docs: {
      description: { story: "The logo as drawn: its file, its shape, its colour and its room." },
    },
  },
  render: () => (
    <Specimen>
      <div className="qf-rules">
        {LOGO_RULES.map((rule) => (
          <div key={rule.title} className="qf-rule">
            <b className="qf-rule-title">{rule.title}</b>
            <div className="qf-rule-pair">
              {(["do", "dont"] as const).map((kind) => (
                <figure key={kind} className="qf-rule-case" data-kind={kind}>
                  <div className="qf-rule-stage qf-brand-rule" aria-hidden="true" inert>
                    {kind === "do" ? rule.doIt : rule.dontIt}
                  </div>
                  <figcaption>
                    <span className="qf-rule-verdict">
                      {kind === "do" ? (
                        <CircleCheckIcon size={16} aria-hidden />
                      ) : (
                        <CircleXIcon size={16} aria-hidden />
                      )}
                      {kind === "do" ? "Do" : "Don't"}
                    </span>
                    <span>{kind === "do" ? rule.doLine : rule.dontLine}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Specimen>
  ),
};

/* ── Brand colour ─────────────────────────────────────────────────────────── */

/** A DTCG colour as CSS, in the space it is authored in. */
const cssOf = (color: DtcgColor) => {
  const [l, c, h] = color.components;
  const alpha = color.alpha ?? 1;
  return `oklch(${l} ${c} ${h}${alpha < 1 ? ` / ${alpha}` : ""})`;
};

const QEET = ramp("qeet");
const QEET_STEP = new Map(QEET.map(({ step, hex }) => [hex, `qeet.${step}`]));
/** qeet.500 is a primitive, not a CSS variable: painted from the DTCG hex, as reference. */
const QEET_ORANGE = QEET.find((step) => step.step === "500")?.hex ?? "";
const WHITE = hexOf("color.text.on-brand", "light");
const EMBER = hexOf("color.bg.brand.bold", "light");

/** The brand roles: exactly the tokens a tenant may override, in brandTheme()'s order. */
const COLOR = tokens("color");
const BRAND = TENANT_TOKENS.map((cssVar) => COLOR.find((token) => token.cssVar === cssVar)).filter(
  (token): token is Token => token !== undefined,
);

const USE: Record<string, string> = {
  "bg.brand.bold": "The primary action: buttons, switches, checkboxes",
  "bg.brand.bold-hover": "Hover on the brand fill",
  "bg.brand.bold-pressed": "Pressed on the brand fill",
  "bg.brand.subtle": "Brand badges and a ghost button's hover",
  "bg.brand.subtle-hover": "Hover on the brand tint",
  "bg.brand.subtle-pressed": "Pressed on the brand tint",
  "bg.selected": "Selected rows and items",
  "bg.selected-hover": "Hover on a selected row",
  selection: "Selected text: the brand colour at 20%",
  "text.brand": "Brand-coloured text",
  "text.link": "Links",
  "text.link-hover": "Links on hover",
  "text.on-brand": "Labels on the brand fill",
  "icon.brand": "Brand icons",
  "icon.on-brand": "Icons on the brand fill",
  "border.brand": "Brand outlines",
  "border.focus": "The focus frame",
  "border.selected": "The edge of a selected item",
};

/** The roles, as the table and the tenant island list them. */
export const brandRoles: Role[] = BRAND.map((token) => ({
  name: token.name,
  cssVar: token.cssVar,
  kind: kindOf(token.name),
  group: BRAND_GROUPS.find(({ match }) => match.test(token.name))?.label ?? "",
  use: USE[token.name],
  onBrand: token.name.endsWith("on-brand"),
}));

/** A Qeet value: the ramp step it takes, with the hex as its title; a value off the ramp shows its hex. */
function stepCell(role: Role, scheme: Scheme): Cell {
  const token = BRAND.find((entry) => entry.cssVar === role.cssVar);
  if (!token) return { css: "transparent", label: "", title: "" };
  const { value, chain } = resolve(scheme, token.path);
  const color = value as DtcgColor;
  const alias = chain.at(-1);
  const alpha = color.alpha ?? 1;
  const step = alias?.startsWith("primitive.color.")
    ? alias.slice("primitive.color.".length)
    : QEET_STEP.get(color.hex);
  return {
    css: cssOf(color),
    label: `${step ?? color.hex}${alpha < 1 ? ` / ${Math.round(alpha * 100)}%` : ""}`,
    title: color.hex,
  };
}

/** Qeet's own brand values, shaped like brandTheme()'s: what an invalid tenant colour leaves. */
export const qeetTheme = Object.fromEntries(
  SCHEMES.map((scheme) => [
    scheme,
    Object.fromEntries(BRAND.map((token) => [token.cssVar, cssOf(token[scheme] as DtcgColor)])),
  ]),
) as unknown as BrandTheme;

/** The surfaces the tenant's contrast is checked against. */
const surface = (path: string, scheme: Scheme) => cssOf(resolve(scheme, path).value as DtcgColor);
export const surfaces = Object.fromEntries(
  SCHEMES.map((scheme) => [
    scheme,
    {
      "surface.default": surface("color.surface.default", scheme),
      "surface.canvas": surface("color.surface.canvas", scheme),
    },
  ]),
) as Record<Scheme, { "surface.default": string; "surface.canvas": string }>;

function Orange({
  background,
  name,
  note,
  copy,
  label,
  verdict,
}: {
  background: string;
  name: string;
  note: string;
  copy: string;
  label: string;
  verdict: ReactNode;
}) {
  return (
    <figure className="qf-brand-hero">
      <div className="qf-brand-hero-tile" style={{ background }}>
        <span className="qf-brand-hero-aa" aria-hidden="true">
          Aa
        </span>
      </div>
      <figcaption className="qf-brand-hero-meta">
        <span className="qf-brand-hero-name">
          {name}
          {verdict}
        </span>
        <span className="qf-brand-hero-note">{note}</span>
        <CopyToken value={copy} label={label} />
      </figcaption>
    </figure>
  );
}

const onWhite = (hex: string) => `${contrast(WHITE, hex).toFixed(2)}:1`;

const BrandColour: Section = {
  id: "brand-colour",
  name: "Brand colour",
  parameters: {
    docs: {
      description: {
        story:
          "Qeet orange is the logo's colour; Ember, qeet.600, fills actions and feeds every brand role.",
      },
    },
  },
  render: () => (
    <Specimen>
      <div className="qf-brand-heroes">
        <Orange
          background={QEET_ORANGE}
          name="Qeet orange"
          note="The logo's colour. White on it is for large type and marks only."
          copy={QEET_ORANGE}
          label={`qeet.500 · ${QEET_ORANGE}`}
          verdict={
            <Badge tone="warning" size="sm">
              {onWhite(QEET_ORANGE)} large text
            </Badge>
          }
        />
        <Orange
          background="var(--qx-color-bg-brand-bold)"
          name="Ember"
          note="The action colour: buttons, switches, the selected item. Labels on it pass AA."
          copy="--qx-color-bg-brand-bold"
          label={`--qx-color-bg-brand-bold · qeet.600 · ${EMBER}`}
          verdict={
            <Badge tone="success" size="sm">
              {onWhite(EMBER)} AA
            </Badge>
          }
        />
      </div>
      <Group
        label="Qeet ramp"
        aside="primitive.color.qeet: in the DTCG files, never a CSS variable"
      >
        <Ramp name="qeet" steps={QEET} />
      </Group>
      <Group label="Brand roles" aside={`${BRAND.length} tokens, each on a step of the ramp`}>
        <RoleList
          caption="The brand roles and the qeet step each takes"
          roles={brandRoles}
          cells={stepCell}
          fill={() => "var(--qx-color-bg-brand-bold)"}
        />
      </Group>
    </Specimen>
  ),
};

/* ── Tenant theme: an island (TenantTheme.tsx) in the page's slot ────────── */

const TenantTheme: Section = {
  id: "tenant-theme",
  name: "Tenant theme",
  parameters: {
    docs: {
      description: {
        story:
          "brandTheme(hex) turns one colour into the 18 brand tokens for light and dark, each pair AA.",
      },
    },
  },
  // Rendered by the page as an island (Sections' "tenant-theme" slot).
  render: () => null,
};

/* ── Identity icons ───────────────────────────────────────────────────────── */

const ICONS = [
  [FingerprintPatternIcon, "FingerprintPatternIcon", "Passkey"],
  [ShieldCheckIcon, "ShieldCheckIcon", "MFA"],
  [PlugIcon, "PlugIcon", "SAML / OIDC"],
  [RefreshCwIcon, "RefreshCwIcon", "SCIM sync"],
  [UserGroupIcon, "UserGroupIcon", "Directory"],
  [BuildingComplexIcon, "BuildingComplexIcon", "Tenant"],
  [KeyRoundIcon, "KeyRoundIcon", "API key"],
  [WebhookIcon, "WebhookIcon", "Webhook"],
  [ScrollTextIcon, "ScrollTextIcon", "Audit log"],
  [MonitorSmartphoneIcon, "MonitorSmartphoneIcon", "Cross-device"],
] as const;

const IdentityIcons: Section = {
  id: "identity-icons",
  name: "Identity icons",
  parameters: {
    docs: {
      description: {
        story: "One icon per Qeet ID concept, in the sharp shape. Click a name to copy its import.",
      },
    },
  },
  render: () => (
    <Specimen>
      <div className="qf-brand-icons">
        {ICONS.map(([Icon, component, concept]) => (
          <div key={component} className="qf-brand-icon">
            <span className="qf-brand-icon-well">
              <Icon shape="sharp" size={24} aria-hidden />
            </span>
            <span className="qf-brand-icon-name">{concept}</span>
            <CopyToken
              value={`import { ${component} } from "@qeetrix/icons";`}
              label={component.replace(/Icon$/, "")}
            />
          </div>
        ))}
      </div>
    </Specimen>
  ),
};

export const sections: Section[] = [Logo, LogoRules, BrandColour, TenantTheme, IdentityIcons];
