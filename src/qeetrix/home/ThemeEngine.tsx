// "One change. Every component.": the customer's colour, the 18 brand tokens brandTheme() returns
// for it, and the components that follow, side by side and live. The contrast figures are measured
// from the rendered tokens, not stated.
import { ArrowRightIcon } from "@qeetrix/icons/icons/arrow-right";
import { MoonIcon } from "@qeetrix/icons/icons/moon";
import { PipetteIcon } from "@qeetrix/icons/icons/pipette";
import { SunIcon } from "@qeetrix/icons/icons/sun";
import {
  Badge,
  Button,
  Checkbox,
  Heading,
  Link,
  mirrorInRtl,
  Progress,
  Radio,
  RadioGroup,
  Switch,
  Tab,
  Tabs,
  TabsList,
  Text,
  TextField,
  Toggle,
  ToggleGroup,
} from "@qeetrix/react";
import { brandTheme, TENANT_TOKENS } from "@qeetrix/tokens";
import { type CSSProperties, useEffect, useMemo, useRef, useState } from "react";

const Forward = mirrorInRtl(ArrowRightIcon);
const presets = [
  { id: "qeet", label: "Qeet Ember", hex: null },
  { id: "blue", label: "Blue", hex: "#1a73e8" },
  { id: "green", label: "Green", hex: "#0f7b5f" },
  { id: "violet", label: "Violet", hex: "#6d28d9" },
  { id: "teal", label: "Teal", hex: "#0e7490" },
  { id: "rose", label: "Rose", hex: "#be185d" },
] as const;

/** A colour the browser can paint, read back as sRGB through a one-pixel canvas. */
function rgb(color: string): [number, number, number] | null {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 1;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx || !color) return null;
  ctx.fillStyle = "#000";
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return [r, g, b];
}
const luminance = ([r, g, b]: [number, number, number]) => {
  const c = [r, g, b].map((v) => {
    const s = v / 255;
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const ratio = (a: string, b: string) => {
  const x = rgb(a);
  const y = rgb(b);
  if (!x || !y) return 0;
  const [l1, l2] = [luminance(x), luminance(y)].sort((m, n) => n - m);
  return (l1 + 0.05) / (l2 + 0.05);
};
const hexOf = (color: string) => {
  const c = rgb(color);
  return c ? `#${c.map((v) => v.toString(16).padStart(2, "0")).join("")}` : "";
};

/** A measured contrast ratio and its WCAG level; nothing is claimed before it's measured. */
function Contrast({ value }: { value: number }) {
  if (!value) return <code>—</code>;
  return (
    <>
      <code>{value.toFixed(1)}:1</code>
      <Badge tone={value >= 4.5 ? "success" : "warning"}>{value >= 4.5 ? "AA" : "Below AA"}</Badge>
    </>
  );
}

export default function ThemeEngine() {
  const [preset, setPreset] = useState<string>("blue");
  const [custom, setCustom] = useState("#c2410c");
  const [scheme, setScheme] = useState<"light" | "dark">("light");
  const [pulse, setPulse] = useState(0);
  const [read, setRead] = useState({ base: "", onBrand: 0, link: 0 });
  const scope = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const sync = () =>
      setScheme(root.getAttribute("data-qx-color-scheme") === "dark" ? "dark" : "light");
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["data-qx-color-scheme"] });
    return () => observer.disconnect();
  }, []);

  const hex = preset === "custom" ? custom : (presets.find((p) => p.id === preset)?.hex ?? null);
  const vars = useMemo(
    () => (hex ? (brandTheme(hex)[scheme] as Record<string, string>) : {}),
    [hex, scheme],
  );

  // Measure what the tokens resolve to, after they're painted: the effect reads them from the DOM,
  // so it runs again whenever the brand tokens change.
  // biome-ignore lint/correctness/useExhaustiveDependencies: vars changes what the DOM resolves.
  useEffect(() => {
    const el = scope.current;
    if (!el) return;
    const s = getComputedStyle(el);
    const v = (name: string) => s.getPropertyValue(name).trim();
    setRead({
      base: hex ?? hexOf(v("--qx-color-bg-brand-bold")),
      onBrand: ratio(v("--qx-color-text-on-brand"), v("--qx-color-bg-brand-bold")),
      link: ratio(v("--qx-color-text-link"), v("--qx-color-surface-default")),
    });
  }, [vars, hex]);

  const choose = (id: string) => {
    setPreset(id);
    setPulse((n) => n + 1);
  };
  const call = hex ? `brandTheme("${hex}")` : "// the Qeetrix default";

  return (
    <div
      className="home-engine"
      ref={scope}
      data-qx-color-scheme={scheme}
      style={vars as CSSProperties}
    >
      <section className="home-engine-col" aria-labelledby="engine-in">
        <header className="home-engine-head">
          <span className="home-engine-step">01</span>
          <span>
            <b id="engine-in">One colour</b>
            <span>The customer's brand colour.</span>
          </span>
        </header>
        <div
          className="home-engine-swatch"
          style={{ background: read.base || "var(--qx-color-bg-brand-bold)" }}
        >
          <span>{presets.find((p) => p.id === preset)?.label ?? "Custom"}</span>
          <code>{read.base}</code>
        </div>
        <fieldset className="home-engine-presets" aria-label="The customer's colour">
          {presets.map((p) => (
            <button
              key={p.id}
              type="button"
              className="home-engine-preset"
              aria-pressed={preset === p.id}
              aria-label={p.label}
              title={p.label}
              style={{ background: p.hex ?? "var(--home-ember)" }}
              onClick={() => choose(p.id)}
            />
          ))}
          <label
            className="home-engine-preset home-engine-custom"
            data-pressed={preset === "custom" ? "" : undefined}
            title="Pick any colour"
          >
            <input
              type="color"
              value={custom}
              aria-label="Pick any colour"
              onChange={(e) => {
                setCustom(e.target.value);
                choose("custom");
              }}
            />
            <PipetteIcon size={16} />
          </label>
        </fieldset>
        <pre className="home-engine-code">
          <span className="k">import</span>
          {" { brandTheme }\n  "}
          <span className="k">from</span> <span className="s">"@qeetrix/tokens"</span>
          {";\n\n"}
          {hex ? (
            <>
              {"brandTheme("}
              <span className="s">{`"${hex}"`}</span>
              {`).${scheme};`}
            </>
          ) : (
            <span className="c">{"// Qeet Ember is the default"}</span>
          )}
        </pre>
        <dl className="home-engine-checks">
          <div>
            <dt>Text on brand</dt>
            <dd>
              <Contrast value={read.onBrand} />
            </dd>
          </div>
          <div>
            <dt>Links on page</dt>
            <dd>
              <Contrast value={read.link} />
            </dd>
          </div>
        </dl>
      </section>

      <span className="home-engine-flow" aria-hidden="true">
        <i key={pulse} data-pulse={pulse ? "" : undefined} />
        <Forward size={16} />
      </span>

      <section className="home-engine-col" aria-labelledby="engine-tokens">
        <header className="home-engine-head">
          <span className="home-engine-step">02</span>
          <span>
            <b id="engine-tokens">18 brand tokens</b>
            <span>
              <code>{call}</code>
            </span>
          </span>
        </header>
        <ToggleGroup
          variant="segmented"
          size="sm"
          aria-label="Scheme of the tokens"
          value={[scheme]}
          onValueChange={(v) => v[0] && setScheme(v[0] as "light" | "dark")}
        >
          <Toggle value="light" icon={SunIcon}>
            Light
          </Toggle>
          <Toggle value="dark" icon={MoonIcon}>
            Dark
          </Toggle>
        </ToggleGroup>
        <ul className="home-engine-tokens">
          {TENANT_TOKENS.map((name, i) => (
            <li key={name} style={{ "--i": i } as CSSProperties}>
              <i style={{ background: `var(${name})` }} />
              <code>{name.replace("--qx-color-", "")}</code>
            </li>
          ))}
        </ul>
      </section>

      <span className="home-engine-flow" aria-hidden="true">
        <i key={pulse} data-pulse={pulse ? "" : undefined} style={{ animationDelay: "160ms" }} />
        <Forward size={16} />
      </span>

      <section className="home-engine-col home-engine-out" aria-labelledby="engine-out">
        <header className="home-engine-head">
          <span className="home-engine-step">03</span>
          <span>
            <b id="engine-out">Every component</b>
            <span>Buttons, fields, links and focus follow.</span>
          </span>
        </header>
        <div className="home-engine-preview">
          <div className="home-engine-card">
            <Badge tone="brand">Acme</Badge>
            <Heading level={3} size="title-lg">
              Sign in to Acme
            </Heading>
            <TextField label="Work email" type="email" defaultValue="priya@acme.in" />
            <Checkbox label="Remember this device" defaultChecked />
            <Button fullWidth icon={Forward}>
              Continue
            </Button>
            <Link href="#">Use a passkey instead</Link>
          </div>
          <div className="home-engine-parts">
            <Tabs defaultValue="members">
              <TabsList>
                <Tab value="members">Members</Tab>
                <Tab value="roles">Roles</Tab>
                <Tab value="audit">Audit</Tab>
              </TabsList>
            </Tabs>
            <Switch label="Require passkeys" defaultChecked />
            <RadioGroup label="Session length" orientation="horizontal" defaultValue="8h">
              <Radio value="8h" label="8 hours" />
              <Radio value="24h" label="24 hours" />
            </RadioGroup>
            <Progress label="Passkey adoption" value={72} showValue />
            <div className="home-engine-row">
              <Badge tone="brand">New</Badge>
              <Badge tone="brand" variant="solid">
                Owner
              </Badge>
              <Link href="#">View audit log</Link>
            </div>
            <Text size="sm" tone="subtle">
              Selected rows, focus rings and text selection follow too.
            </Text>
          </div>
        </div>
      </section>
    </div>
  );
}
